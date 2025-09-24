<template>
  <div>
    <global-drawer :is-mark-show="isMarkShow" @update:is-drawer-show="handleDrawerVisibility">
      <!-- 抽屉内容 -->
      <div class="drawer-content">
        <el-row :gutter="4">
          <el-col :span="6">
            <titleBar text="添加报告"></titleBar>
          </el-col>
          <el-col :span="18">
            <el-form ref="form" :model="viteData.searchDataList" label-width="100px" style="margin-left: 40px">
              <el-row :gutter="10">
                <el-col :span="4">
                  <el-form-item label="层级">
                    <el-select v-model="viteData.searchDataList.layerId" clearable @change="handleSelect" size="small"
                               placeholder="请选择">
                      <el-option v-for="item in viteData.level" :label="item.layerName"
                                 :value="item.layerId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="专业">
                    <!--                    <treeselect-->
                    <!--                        v-model="viteData.searchDataList.majorId"-->
                    <!--                        placeholder="请选择"-->
                    <!--                        :appendToBody=true-->
                    <!--                        :normalizer="normalizerMajor"-->
                    <!--                        :options=" viteData.specialityList"-->
                    <!--                        @select="handleSelect"-->
                    <!--                        noChildrenText="没有子选项" noOptionsText="没有可选项" noResultsText="没有匹配的结果"-->
                    <!--                        @input="handleInput"-->
                    <!--                    >-->
                    <!--                    </treeselect>-->
                    <el-select v-model="viteData.searchDataList.majorId" clearable @change="handleSelect" size="small"
                               placeholder="请选择专业">
                      <el-option v-for="item in viteData.specialityList" :label="item.majorName"
                                 :value="item.majorId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <menu-select v-model="viteData.searchDataList.state" @input="handleSelect" :options="viteData.status"
                               label="状态">
                  </menu-select>
                </el-col>
<!--                <el-col :span="8" style="margin-left: 20px;">-->
<!--                  <search-input v-model="viteData.searchDataList.functionName" @search="handleSelect"></search-input>-->
<!--                </el-col>-->
                <el-col :span="6">
                  <el-form-item label="报告名称">
                    <el-input
                        size="small"
                        v-model="viteData.searchDataList.functionName"
                        @input="handleChange"
                        style="width: 100%; color: #000"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5" style="line-height: 0.375rem">
                  <el-button
                      size="small"
                      style="background: $primary-color"
                      type="primary"
                      @click="handleSearch"
                  >搜索
                  </el-button>
                  <el-button size="small" plain @click="handleReset"
                  >重置
                  </el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="platform-search-card-content" v-if="viteData.reportList && viteData.reportList.length>0">
              <div class="platform-search-card-item" v-for="(item,index) in viteData.reportList" :key="index">
                <div class="platform-search-card-top-add" v-if="item.status =='1'"></div>
                <div class="platform-search-card-top-remove" v-else></div>
                <div class="platform-search-card-item-top">
                  <span class="platform-search-card-drop-add" v-if="item.status =='1'"></span>
                  <span class="platform-search-card-drop-remove" v-else></span>
                  <span class="platform-search-card-top-title">{{ item.reportName }}</span>
                  <div class="platform-search-card-top-title-icon-add" v-if="item.status =='1'"><span>已添加</span>
                  </div>
                  <div class="platform-search-card-top-title-icon-remove" v-else><span>未添加</span></div>
                </div>
                <div class="platform-search-card-line"></div>
                <div class="platform-search-card-desc">
                  <!--                    <el-row :gutter="4" >
                                        <el-col :span="2" style="margin-top: 10px" ><div class="platform-menu-card-label">
                                          <img src="@/assets/images/reportName.png" alt="专业图标">
                                        </div></el-col>
                                        <el-col :span="22" ><div class="platform-menu-card-label">
                                          <span class="platform-personal-panel-report-name">报告名称： {{ item.reportName}}</span>
                  &lt;!&ndash;                        <span class="platform-personal-panel-report-name-content">{{item.reportName}}</span>&ndash;&gt;
                                        </div></el-col>
                                      </el-row>
                                      <el-row :gutter="4" style="display: inline-block;">
                                        <el-col :span="2" style="margin-top: 10px" ><div class="platform-menu-card-label">
                                          <img src="@/assets/images/reportName.png" alt="专业图标">
                                        </div></el-col>
                                        <el-col :span="21"><div class="platform-menu-card-label">
                                          <span class="platform-personal-panel-report-name">报告描述：&lt;!&ndash;{{ item.description}}&ndash;&gt;</span>
                                          <span class="platform-personal-panel-report-name-content">{{ item.reportName}}</span>
                                        </div></el-col>
                                      </el-row>-->
                  <div class="platform-search-card-desc-content-item">
                      <span class="platform-menu-card-label" style="margin-left: 2px">
                        <!-- <img src="@/assets/images/reportName.png" alt="专业图标"> -->
                      </span>
                    <span style="margin-left: 8px;" class="platform-personal-panel-report-name">报告名称：</span>
                    <span class="platform-personal-panel-report-name-content">{{ item.reportName }}</span>
                  </div>
                  <div class="platform-search-card-desc-content-item">
                    <div class="platform-personal-panel-report-des">
                        <span class="platform-menu-card-label">
                          <!-- <img src="@/assets/images/report-des.png" alt="全路径图标"> -->
                        </span>报告描述：<span
                        class="platform-personal-panel-report-name-content-des">{{ item.description }}</span>
                    </div>
                  </div>
                </div>
                <div class="platform-content-card-button">
                  <el-button type="text" class="platform-content-card-button-Detail" @click="previewReport(item)">
                    预览报告
                  </el-button>
                  <el-button type="text" class="platform-content-card-button-Add" @click="addReport(item)"
                             v-if="item.status =='0'">添加报告
                  </el-button>
                  <el-button type="text" class="platform-content-card-button-Remove" @click="removeReport(item)" v-else>
                    移除报告
                  </el-button>
                </div>
              </div>
            </div>
            <div v-else class="platform-search-card-content" style="position: relative">
              <no-data  title="暂无数据" size="60%"/>
            </div>
          </el-col>
        </el-row>
        <div style="width: 100%; position: fixed;bottom: 20px; ">
          <el-row :gutter="4">
            <el-col :span="17">

              <div style="text-align: center;">
                <el-pagination @current-change="handleCurrentChange" :page-size=this.viteData.report.pageInfo.pageSize
                               :total=this.viteData.report.pageInfo.total layout="total, prev, pager, next">
                </el-pagination>
              </div>
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <div>
                <el-button type="primary" @click="addAllReport" style="background: $primary-color;">全部加入</el-button>
                <el-button plain @click="removeAllReport">全部移除</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <reportDialog :details="this.viteData.detailsData" :addOrUpdateVisible="addOrUpdateVisible"
                      @changeShow="showAddOrUpdate" @removeMonitor="removeReport" @addMonitor="addReport"
                      ref="addOrUpdateRef"></reportDialog>
      </div>
    </global-drawer>
  </div>
</template>
<script>
import titleBar from "@/views/components/personalPanel/titleBar.vue"
import MenuSelect from "@/views/components/personalPanel/menuSelect.vue";
import {
  searchList,
  addMetric,
  deleteMetric,
  searchMetricPage,
  batchAddMetric,
  batchDeleteMetric,
  searchDataTree, searchDataListSys
} from "@/api/personalPanel.js";
import {updateUserReport} from "@/api/report";
import {eventBus} from "@/main.js";
import searchInput from "@/views/components/personalPanel/searchInput.vue";
//import getLocalStorageData from "@/assets/js";
import ReportDialog from "@/views/components/personalPanel/reportDialog.vue";
import monitorDialog from "@/views/components/personalPanel/monitorDialog.vue";

export default {
  name: "addReportDrawer",
  components: {
    monitorDialog,
    ReportDialog,
    searchInput,
    MenuSelect,
    titleBar,
  },
  props: {
    /*addOrUpdateVisible: {
      type: Boolean,
      default: false
    },*/
    level: {},
    specialityList: {},
  },
  data() {
    return {
      showDialog: false,
      isMarkShow: false, // 抽屉状态
      addOrUpdateVisible: false,
      viteData: {
        report: {
          authenticationInformation: 'mal',
          actionName: 'searchUserMetricList',
          dataSource: 'mysql-operate',
          data: {},
          pageInfo: {
            pageIndex: 1,
            pageSize: 24,
          },
        },
        userId: JSON.parse(localStorage.getItem('userinfo')).userId,
        searchDataList: {
          functionName: null,
          layerId: null,
          majorId: null,
          state: null,
        },
        dataList: this.data,
        reportList: [],
        status: [{
          value: '1',
          label: '已订阅'
        }, {
          value: '0',
          label: '未订阅'
        }],
        systemList: [],
        level: [],
        specialityList: [],
        pageIndex: 1,
        pageSize: 30,
        total: 0,
        detailsData: {},
      },
      userId: this.$store.state.userInfo.userId,
    }
  },
  methods: {
    handleDrawerVisibility(val) {
      this.isMarkShow = val;
      this.disableScroll();
      this.handleReset();
      if (val === false) {
        this.enableScroll();
        this.$emit('searchList');
      }
    },
    disableScroll() {
      document.body.style.overflow = 'hidden';
    },
    enableScroll() {
      document.body.style.overflow = '';
    },
    handleChange(data) {
      this.viteData.searchDataList.functionName = data
      this.allReport();
    },
    // 搜索
    handleSearch() {
      this.allReport();
    },
    // 重置
    handleReset() {
      this.viteData.searchDataList = {
        functionName: null,
        layerId: null,
        majorId: null,
        state: null
      }
      this.allReport()

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
    handleInput(value) {
      if (!value) {
        this.viteData.searchDataList.majorId = null;
        this.allReport()
      }
    },
    async handleSelect(value) {
      if (value.layerId) {
        this.viteData.searchDataList.layerId = value.layerId
      }
      if (value.majorId) {
        this.viteData.searchDataList.majorId = value.majorId
      }
      if (value.value || value.value === '') {
        this.viteData.searchDataList.functionName = value.value
      }
      await this.allReport()
    },
    //分页参数
    handleCurrentChange(val) {
      this.viteData.report.pageInfo.pageIndex = val
      this.allReport()
    },
    toggleDrawer() {
      this.showDialog = !this.showDialog;
      this.$emit('get-drawer-state', this.showDialog)
    },
    //查询添加所有报告
    async allReport() {
      const params = _.cloneDeep(this.viteData.report)
      params.actionName = 'searchReportUpList'
      params.data.userId = this.viteData.userId
      params.data.reportName = this.viteData.searchDataList.functionName
      params.data.layerId = this.viteData.searchDataList.layerId
      params.data.majorId = this.viteData.searchDataList.majorId
      params.data.status = this.viteData.searchDataList.state
      await searchMetricPage(params).then(res => {
        this.viteData.reportList = res.resultList
        if (res.pageInfo) {
          this.viteData.report.pageInfo.pageIndex = res.pageInfo.pageIndex || '1'
          this.viteData.report.pageInfo.pageSize = res.pageInfo.pageSize || '24'
          this.viteData.report.pageInfo.total = res.pageInfo.total
        } else {
          this.viteData.report.pageInfo.pageIndex = 1
          this.viteData.report.pageInfo.pageSize = 24
          this.viteData.report.pageInfo.total = 0
        }
      })
      await this.getDataList()
    },
    //添加报告
    async addReport(item) {
      const params = _.cloneDeep(this.viteData.report)
      params.actionName = 'addUserReport'
      params.data.userId = this.viteData.userId
      params.data.reportId = item.reportId
      await addMetric(params).then(res => {
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '新增报告成功',
            type: 'success'
          });
        } else {
          this.$message({
            showClose: true,
            message: '新增报告失败，请联系管理员',
            type: 'error'
          });
        }
        this.allReport()
        eventBus.$emit('getAllList')
      })
    },
    //预览报告
    previewReport(item) {
      this.addOrUpdateVisible = true
      console.log(this.addOrUpdateVisible)
      this.viteData.detailsData = item
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用
    showAddOrUpdate(data) {
      if (data === 'false') {
        this.addOrUpdateVisible = false
      } else {
        this.addOrUpdateVisible = true
      }
    },
    // 添加所有报告
    async addAllReport() {
      const params = _.cloneDeep(this.viteData.report)
      params.actionName = 'batchAddUserReport'
      params.data = this.viteData.reportList.filter(item => !item.userId).map(item => ({
        reportId: item.reportId,
        userId: this.viteData.userId
      }))
      if (params.data.length === 0) {
        this.$message({
          message: '暂无报告可添加',
          type: 'warning'
        });
      } else {
        await batchAddMetric(params).then(res => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: '添加失败，请联系管理员',
              type: 'error'
            });
          }
        })
      }
      await this.allReport()
      eventBus.$emit('getAllList')
    },
    //移除报告
    async removeReport(item) {
      const params = _.cloneDeep(this.viteData.report)
      params.actionName = 'deleteUserReport'
      params.data.reportId = item.reportId
      params.data.userId = this.userId
      await deleteMetric(params).then(res => {
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: '成功移除报告',
            type: 'success'
          });
        } else {
          this.$message({
            showClose: true,
            message: '移除报告失败，请联系管理员',
            type: 'error'
          });
        }
      })
      this.allReport()
      eventBus.$emit('getAllList')
    },
    // 移除所有报告
    async removeAllReport() {
      const params = _.cloneDeep(this.viteData.report)
      params.actionName = 'batchDeleteUserReport'
      params.data = this.viteData.reportList.filter(item => item.userId).map(item => ({
        monitorId: item.monitorId,
        userId: this.viteData.userId
      }))
      if (params.data.length === 0) {
        this.$message({
          message: '暂无报告可移除',
          type: 'warning'
        });
      } else {
        await batchDeleteMetric(params).then(res => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: '移除成功',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: '移除失败，请联系管理员',
              type: 'error'
            });
          }
        })
      }
      await this.allReport()
      eventBus.$emit('getAllList')
    },
    // 获取数据层级、专业、系统列表
    async getDataList() {
      const params = _.cloneDeep(this.viteData.report)
      params.actionName = 'searchLayerList'
      params.idAttribute = "layerId"
      params.parentIdAttribute = "parentId"
      await searchDataTree(params).then(res => {
        this.viteData.level = res.resultList
      })
      // 获取系统
      const param = _.cloneDeep(this.viteData.report)
      param.actionName = 'searchSystemList'
      param.data.majorId = this.viteData.searchDataList.majorId
      await searchDataListSys(param).then((res) => {
        this.viteData.systemList = res.resultList.map(item => ({systemName: item.systemName, systemId: item.systemId}))
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
    this.allReport()
    /*this.viteData.userId = getLocalStorageData('userInfo').userId*/
  },
  beforeDestroy() {
    eventBus.$off('specialityData')
  },
  mounted() {
  },
  computed: {}
}
</script>
<style scoped lang="scss">
:deep(.vue-treeselect) {
  display: inline-block;
  position: relative;
}

:deep(.vue-treeselect__control) {
  width: 120px;
  height: 32px;
  line-height: 32px !important;
}

:deep(.el-form-item__content) {
  line-height: 30px;
  font-size: 13px;

}

:deep(.el-form-item__label) {
  line-height: 32px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

:deep(.vue-treeselect__placeholder, .vue-treeselect__single-value) {
  line-height: 32px;
}

:deep(.el-input, ) {
  width: 120px;
}

:deep(.el-form-item__label) {
  text-align: right !important;
  white-space: nowrap;
  line-height: 30px !important;
}

.custom-select label {
  text-align: right !important;
  white-space: nowrap !important;
}

.cjshdufyer {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.el-form-item__label) {
  line-height: 32px !important;
}

:deep(.el-button--primary) {
  border-color: $primary-color !important;
  padding: 8px 20px !important;
}

:deep(.vue-treeselect__control) {
  line-height: 32px !important;
}

</style>
