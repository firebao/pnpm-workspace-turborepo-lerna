<template>
  <div class="menu-toggle-drawer">
    <transition name="drawer">
      <div v-if="showDrawer" class="drawer-container">
        <div class="left-drawer-btn" @click="toggleMonitorDrawer">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="drawer-content">
          <el-row :gutter="10" align="middle">
            <el-col :span="2">
              <titleBar text="添加监测项"></titleBar>
            </el-col>
            <el-col :span="20">
              <el-form ref="form" :model="viteData.searchDataList" label-width="80px">
                <el-row :gutter="20">
                  <el-col :span="4.5">
                    <el-form-item label="层级">
                      <el-select v-model="viteData.searchDataList.layerId" clearable @change="handleSelect"
                        placeholder="请选择" size="small">
                        <el-option v-for="(item, index) in viteData.level" :key="index" :label="item.layerName"
                          :value="item.layerId"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="专业">
<!--                      <el-select v-model="viteData.searchDataList.majorId" clearable @change="handleSelect"
                        placeholder="请选择" size="small">
                        <el-option v-for="(item, index) in viteData.specialityList" :key="index" :label="item.majorName"
                          :value="item.majorId"></el-option>
                      </el-select>-->
                      <treeselect
                          v-model="viteData.searchDataList.majorId"
                          placeholder="请选择"
                          :appendToBody=true
                          :normalizer="normalizerMajor"
                          :options=" viteData.specialityList"
                          @select="handleSelect"
                          noChildrenText="没有子选项" noOptionsText="没有可选项" noResultsText="没有匹配的结果"
                          @input="handleInput"
                      >
                      </treeselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4.5">
                    <el-form-item label="系统">
                      <el-select v-model="viteData.searchDataList.system" clearable @change="handleSelect"
                        placeholder="请选择" size="small">
                        <el-option v-for="(item, index) in viteData.systemList" :key="index" :label="item.systemName"
                          :value="item.systemId"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4.5">
                    <menu-select v-model="viteData.searchDataList.isAttention" @input="handleSelect"
                      :options="viteData.status" label="状态">
                    </menu-select>
                  </el-col>
                  <el-col :span="5">
                    <search-input style="margin-left: 22px" v-model="viteData.searchDataList.functionName"
                      @search="handleSelectSys"></search-input>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="platform-search-card-content">
                <div class="platform-search-card-item" v-for="(item, index) in this.viteData.monitorDataList.resultList"
                  :key="index">
                  <div class="platform-search-card-top-add" v-if="item.isAttention == '1'"></div>
                  <div class="platform-search-card-top-remove" v-else></div>
                  <div class="platform-search-card-item-top">
                    <span class="platform-search-card-drop-add" v-if="item.isAttention == '1'"></span>
                    <span class="platform-search-card-drop-remove" v-else></span>
                    <span class="platform-search-card-top-title">{{ item.monitorName }}</span>
                    <div class="platform-search-card-top-title-icon-add" v-if="item.isAttention == '1'"><span>已添加</span>
                    </div>
                    <div class="platform-search-card-top-title-icon-remove" v-else><span>未添加</span></div>
                  </div>
                  <div class="platform-search-card-line"></div>
                  <div class="platform-search-card-desc">
                    <div class="platform-search-card-desc-content-item">
                      <div class="platform-menu-card-label">
                        <img src="@/assets/images/monitorName.png" alt="专业图标">
                      </div>
                      <span class="platform-personal-panel-report-name">系统名称：</span>
                      <span class="platform-personal-panel-report-name-content" :title="item.systemName">{{item.systemName}}</span>
                    </div>
                    <div class="platform-search-card-desc-content-item">
                      <div class="platform-personal-panel-report-des">
                        <span class="platform-menu-card-label">
                          <!-- <img src="@/assets/images/reportDes.png" alt="全路径图标"> -->
                        </span>监测项描述：<span class="platform-personal-panel-report-name-content-des" :title="item.description">{{ item.description }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="platform-content-card-button">
                    <el-button type="text" class="platform-content-card-button-Detail"
                      @click="showDialog(item)">查看详情</el-button>
                    <el-button type="text" class="platform-content-card-button-Add" @click="addMonitor(item)"
                      v-if="item.status == 0">添加监测项</el-button>
                    <el-button type="text" class="platform-content-card-button-Add" @click="updateMetric(item)"
                      v-if="item.status == 1 && item.isAttention != 1">添加监测项</el-button>

                    <el-button type="text" class="platform-content-card-button-Remove" @click="removeMonitor(item)"
                      v-if="item.status == 1 && item.isAttention == 1">移除监测项</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <div style="width: 100%; position: fixed;bottom: 20px; ">
            <el-row :gutter="4">
              <el-col :span="17">

                <div style="text-align: center;" v-if="viteData.total > 24">
                  <el-pagination @current-change="handleCurrentChange" :page-size=this.viteData.pageSize
                    :total=this.viteData.total layout="total, prev, pager, next">
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
            <monitorDialog :details="this.viteData.details" :addOrUpdateVisible="addOrUpdateVisible"
              @changeShow="showAddOrUpdate" @removeMonitor="removeMonitor" @addMonitor="addMonitor" @handelMonitor="handelMonitor"
              ref="addOrUpdateRef"></monitorDialog>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import titleBar from "@/views/components/personalPanel/titleBar.vue";
import MenuSelect from "@/views/components/personalPanel/menuSelect.vue";
import monitorDialog from "@/views/components/personalPanel/monitorDialog.vue";
import { eventBus } from "@/main.js";
import {
  batchAddMetric,
  addMetric,
  deleteMetric,
  batchDeleteMetric,
  searchList,
  searchMetricPage,
  searchDataTree, searchDataListSys
} from "@/api/personalPanel.js";
import { updateUserMetric } from "@/api/monitoringTasks.js"
import searchInput from "@/views/components/personalPanel/searchInput.vue";
//import getLocalStorageData from "@/assets/js";
export default {
  name: "addMonitorDrawer",
  components: { searchInput, MenuSelect, titleBar, monitorDialog },
  data() {
    return {
      addOrUpdateVisible: false,
      showDrawer: false,
      viteData: {
        monitor: {
          authenticationInformation: 'mal',
          actionName: 'searchMetricUpList',
          dataSource: 'mysql-operate',
          data: {
          },
          pageInfo: {
          }
        },
        userId: JSON.parse(localStorage.getItem('userinfo')).userId,
        details: {},
        status: [{
          value: '0',
          label: '非常用'
        }, {
          value: '1',
          label: '常用'
        }],
        monitorDataList: [],
        searchDataList: {
          functionName: null,
          system: null,
          layerId: null,
          majorId: null,
          isAttention: null,
        },
        systemList: [],
        level: [],
        specialityList: [],
        pageIndex: 1,
        pageSize: 24,
        total: 0,
      }
    }
  },
  props: ['systemList', 'level', 'specialityList'],

  methods: {
    //接受跳转参数
    handelMonitor(data) {
      let address = data.afterLoginAddress;
      data.SysID = data.systemId;
      console.log(data)
      this.$emit("use-monitor",data,address)
    },
    // 树形选择器数据格式化
    normalizerMajor(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.majorId,
        label: node.majorName,
        children: node.children,
      };
    },
    handleInput(value){
      if(!value) {
        this.viteData.searchDataList.majorId = null;
        this.getAllMonitorList()
      }
    },
    // 获取全部监测项列表
    getAllMonitorList() {
      const params = _.cloneDeep(this.viteData.monitor)
      params.pageInfo.pageSize = this.viteData.pageSize
      params.pageInfo.pageIndex = this.viteData.pageIndex
      params.actionName = 'searchRowLevelMetricUpList'
      params.data.userId = this.viteData.userId
      console.log(this.viteData.searchDataList.functionName)
      if (this.viteData.searchDataList) {
        params.data.monitorName = this.viteData.searchDataList.functionName
        params.data.layerId = this.viteData.searchDataList.layerId
        params.data.majorId = this.viteData.searchDataList.majorId
        params.data.systemId = this.viteData.searchDataList.system
        params.data.isAttention = this.viteData.searchDataList.isAttention
      }
      searchMetricPage(params).then(res => {
        this.viteData.monitorDataList = res
        if (res.pageInfo) {
          this.viteData.total = res.pageInfo.total
          this.viteData.pageIndex = res.pageInfo.pageIndex
          this.viteData.pageSize = res.pageInfo.pageSize
        } else {
          this.viteData.total = 0
          this.viteData.pageIndex = 1
          this.viteData.pageSize = 24
        }
      })
      this.getDataList()
    },
    //选择专业、层级
    handleSelect(value) {
      console.log(value)
      if (value.layerId) {
        this.viteData.searchDataList.layerId = value.layerId
      }
      if (value.majorId) {
        this.viteData.searchDataList.majorId = value.majorId
        this.viteData.searchDataList.system = null
      }
      if (value.value || value.value === '') {
        this.viteData.searchDataList.functionName = value.value
      }
      this.getAllMonitorList()
      this.getDataList()
    },
    //选择系统
    handleSelectSys(value) {
      console.log(value)
      if (value.layerId) {
        this.viteData.searchDataList.layerId = value.layerId
      }
      if (value.majorId) {
        this.viteData.searchDataList.majorId = value.majorId
      }
      if (value.value || value.value === '') {
        this.viteData.searchDataList.functionName = value.value
      }
      this.getAllMonitorList()
      this.getDataList()
    },
    // 监听分页
    handleCurrentChange(val) {
      console.log(val)
      this.viteData.pageIndex = val
      this.getAllMonitorList()
    },
    toggleMonitorDrawer() {
      this.showDrawer = !this.showDrawer;
      this.$emit('get-drawer-state', this.showDrawer)
    },
    showDialog(item) {
      this.addOrUpdateVisible = true
      this.viteData.details = item
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用
    showAddOrUpdate(data) {
      if (data === 'false') {
        this.addOrUpdateVisible = false
      } else {
        this.addOrUpdateVisible = true
      }
    },
    // 加入常用
    async addMonitor(item) {
      const params = _.cloneDeep(this.viteData.monitor)
      params.actionName = 'addUserMetric'
      params.data.userId = this.viteData.userId;
      params.data.monitorId = item.monitorId;
      params.data.isAttention = 1;
      await addMetric(params).then(res => {
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          this.$emit('searchList');
        } else {
          this.$message({
            showClose: true,
            message: '添加失败，联系管理员',
            type: 'error'
          });
        }
      })
      this.getAllMonitorList()
      eventBus.$emit('getAllList')
    },

    //订阅后关注
    async updateMetric(item) {
      const params = _.cloneDeep(this.viteData.monitor)
      await updateUserMetric(this.viteData.userId, item.monitorId, 1).then(res => {
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          this.$emit('searchList');
        } else {
          this.$message({
            showClose: true,
            message: '添加失败，联系管理员',
            type: 'error'
          });
        }
        this.getAllMonitorList()
        eventBus.$emit('getAllList')
      })
    },

    // 移除常用
    async removeMonitor(item) {
      const params = _.cloneDeep(this.viteData.monitor)
      await updateUserMetric(this.viteData.userId, item.monitorId, 0).then(res => {
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '移除成功',
            type: 'success'
          });
          this.$emit('searchList');
        } else {
          this.$message({
            showClose: true,
            message: '移除失败，联系管理员',
            type: 'error'
          });
        }
        this.getAllMonitorList()
        eventBus.$emit('getAllList')
      })
    },
    // 获取数据层级、专业、系统列表
    async getDataList() {
      const params = _.cloneDeep(this.viteData.monitor)
      params.actionName = 'searchLayerList'
      params.idAttribute = "layerId"
      params.parentIdAttribute = "parentId"
      await searchDataTree(params).then(res => {
        this.viteData.level = res.resultList
      })
      // 获取系统
      const param = _.cloneDeep(this.viteData.monitor)
      param.actionName = 'searchSystemList'
      param.data.majorId = this.viteData.searchDataList.majorId
      await searchDataListSys(param).then((res) => {
        this.viteData.systemList = res.resultList.map(item => ({ systemName: item.systemName, systemId: item.systemId }))
      })
      //获取专业树
      await searchDataTree({
        actionName: "searchMajorList",
        dataSource: 'mysql-operate',
        authenticationInformation: 'mal',
        idAttribute: "majorId",
        parentIdAttribute: "parentId",
      }).then((res) => {
        this.viteData.specialityList = res.resultList
      })
    },
  },

  created() {
    /*this.viteData.userId = getLocalStorageData('userInfo').userId*/
    this.getAllMonitorList()
  },
  computed: {},
  mounted() {
  },
  watch: {}
}
</script>
<style scoped lang="scss">
:deep(.el-form-item__label) {
  text-align: right !important;
  line-height: 30px !important;
}

.custom-select label {
  text-align: right !important;
  white-space: nowrap !important;

}
.vue-treeselect__control {
  padding-left: 5px;
  padding-right: 5px;
  display: table;
  table-layout: fixed;
  width: 120px!important;
  height: 32px!important;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
  transition-duration: 200ms;
  transition-property: border-color, box-shadow, width, height, background-color, opacity;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
:deep(.vue-treeselect__control) {
  width: 200px;
  height: 32px;
  line-height: 32px!important;
}

</style>
