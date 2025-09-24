<template>
  <div>
    <global-drawer
        :is-mark-show="isMarkShow"
        @update:is-drawer-show="handleDrawerVisibility"
    >
      <!-- 抽屉内容 -->
      <div class="drawer-content">
        <el-row :gutter="10" align="middle">
          <el-col :span="2">
            <titleBar text="添加监测项"></titleBar>
          </el-col>
          <el-col :span="20">
            <el-form
                ref="form"
                :model="viteData.searchDataList"
                label-width="90px"
            >
              <el-row :gutter="6">
                <el-col :span="4">
                  <el-form-item label="层级">
                    <el-select
                        v-model="viteData.searchDataList.layerId"
                        clearable
                        @change="handleSelectLayer"
                        placeholder="请选择"
                        size="small"
                    >
                      <el-option
                          v-for="(item, index) in viteData.level"
                          :key="index"
                          :label="item.layerName"
                          :value="item.layerId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="专业">
                    <el-select v-model="viteData.searchDataList.majorId" clearable @change="handleSelectMjor"
                               placeholder="请选择" size="small">
                      <el-option v-for="(item, index) in viteData.specialityList" :key="index" :label="item.majorName"
                                 :value="item.majorId"></el-option>
                    </el-select>
                    <!--                    <treeselect-->
                    <!--                      v-model="viteData.searchDataList.majorId"-->
                    <!--                      placeholder="请选择"-->
                    <!--                      :appendToBody="true"-->
                    <!--                      :normalizer="normalizerMajor"-->
                    <!--                      :options="viteData.specialityList"-->
                    <!--                      @select="handleSelect"-->
                    <!--                      noChildrenText="没有子选项"-->
                    <!--                      noOptionsText="没有可选项"-->
                    <!--                      noResultsText="没有匹配的结果"-->
                    <!--                      @input="handleInput"-->
                    <!--                    >-->
                    <!--                    </treeselect>-->
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="系统">
                    <el-select
                        v-model="viteData.searchDataList.system"
                        clearable
                        @change="handleSelectSystem"
                        placeholder="请选择"
                        size="small"
                    >
                      <el-option
                          v-for="(item, index) in viteData.systemList"
                          :key="index"
                          :label="item.systemName"
                          :value="item.systemId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <menu-select
                      v-model="viteData.searchDataList.state"
                      @input="handleSelect"
                      :options="viteData.status"
                      label="状态"
                  >
                  </menu-select>
                </el-col>
                <!--                <el-col :span="5">-->
                <!--                  <search-input style="margin-left: 22px" v-model="viteData.searchDataList.functionName"-->
                <!--                                @search="handleSelectSys"></search-input>-->
                <!--                </el-col>-->
                <el-col :span="5">
                  <el-form-item label="监测项名称">
                    <el-input
                        size="small"
                        v-model="viteData.searchDataList.functionName"
                        @input="handleChange"
                        style="width: 100%; color: #000"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" style="line-height: 0.375rem">
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
            <div
                class="platform-search-card-content"
                v-if="
                this.viteData.monitorDataList.resultList &&
                this.viteData.monitorDataList.resultList.length > 0
              "
            >
              <div
                  class="platform-search-card-item"
                  v-for="(item, index) in this.viteData.monitorDataList
                  .resultList"
                  :key="index"
              >
                <div
                    class="platform-search-card-top-add"
                    v-if="item.status == '1'"
                ></div>
                <div class="platform-search-card-top-remove" v-else></div>
                <div class="platform-search-card-item-top">
                  <span
                      class="platform-search-card-drop-add"
                      v-if="item.status == '1'"
                  ></span>
                  <span class="platform-search-card-drop-remove" v-else></span>
                  <span class="platform-search-card-top-title" :title="item.monitorName">{{
                      item.monitorName
                    }}</span>
                  <div
                      class="platform-search-card-top-title-icon-add"
                      v-if="item.status == '1'"
                  >
                    <span>已订阅</span>
                  </div>
                  <div
                      class="platform-search-card-top-title-icon-remove"
                      v-else
                  >
                    <span>未订阅</span>
                  </div>
                </div>
                <div class="platform-search-card-line"></div>
                <div class="platform-search-card-desc">
                  <!--                    <el-row :gutter="4">
                    <el-col :span="2" style="margin-top: 10px"><div class="platform-menu-card-label">
                      <img src="@/assets/images/monitorName.png" alt="专业图标">
                    </div></el-col>
                    <el-col :span="22"><div class="platform-menu-card-label">
                      <span class="platform-personal-panel-report-name">系统名称： {{item.systemName}}</span>
&lt;!&ndash;                        <span class="platform-personal-panel-report-name-content">{{item.systemName}}</span>&ndash;&gt;
                    </div></el-col>
                  </el-row>
                  <el-row :gutter="4">
                    <el-col :span="2" style="margin-top: 10px" ><div class="platform-menu-card-label">
                      <img src="@/assets/images/reportDes.png" alt="全路径图标">
                    </div></el-col>
                    <el-col :span="21" style="display: inline-block;"><div class="platform-menu-card-label">
                      <span class="platform-personal-panel-report-des">监测项描述：</span>
                      <span class="platform-personal-panel-report-name-content">{{ item.description}}</span>
                    </div></el-col>
                  </el-row>-->
                  <div class="platform-search-card-desc-content-item">
                    <div class="platform-menu-card-label">
                      <img
                          src="@/assets/images/monitorName.png"
                          alt="专业图标"
                      />
                    </div>
                    <span class="platform-personal-panel-report-name"
                    >系统名称：</span
                    >
                    <span class="platform-personal-panel-report-name-content">{{
                        item.systemName
                      }}</span>
                  </div>
                  <div class="platform-search-card-desc-content-item">
                    <div class="platform-personal-panel-report-des">
                      <span class="platform-menu-card-label">
                        <!-- <img
                            src="@/assets/images/reportDes.png"
                            alt="全路径图标"
                        /> -->
                        </span
                      >监测项描述：<span
                        class="platform-personal-panel-report-name-content-des"
                    >{{ item.description }}</span
                    >
                    </div>
                  </div>
                </div>
                <div class="platform-content-card-button">
                  <el-button
                      type="text"
                      class="platform-content-card-button-Detail"
                      @click="showDialog(item)"
                  >查看详情
                  </el-button
                  >
                  <el-button
                      type="text"
                      class="platform-content-card-button-Add"
                      @click="addMonitor(item)"
                      v-if="item.status == '0'"
                  >加入监测项
                  </el-button
                  >
                  <el-button
                      type="text"
                      class="platform-content-card-button-Remove"
                      @click="removeMonitor(item)"
                      v-else
                  >移除监测项
                  </el-button
                  >
                </div>
              </div>
            </div>
            <div  v-else class="platform-search-card-content" style="position: relative">
              <no-data title="暂无数据" size="60%"/>
            </div>
          </el-col>
        </el-row>
        <div style="width: 100%; position: fixed; bottom: 20px">
          <el-row :gutter="4">
            <el-col :span="17">
              <div style="text-align: center">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="this.viteData.pageSize"
                    :total="this.viteData.total"
                    layout="total, prev, pager, next"
                >
                </el-pagination>
              </div>
            </el-col>
            <el-col :span="4" style="text-align: right">
              <div>
                <el-button
                    type="primary"
                    @click="addAllMonitor"
                    style="background: $primary-color"
                >全部加入
                </el-button
                >
                <el-button plain @click="removeAllMonitor">全部移除</el-button>
              </div>
            </el-col>
          </el-row>
          <monitorDialog
              :details="this.viteData.details"
              :addOrUpdateVisible="addOrUpdateVisible"
              @changeShow="showAddOrUpdate"
              @removeMonitor="removeMonitor"
              @addMonitor="addMonitor"
              @handelMonitor="handelMonitor"
              ref="addOrUpdateRef"
          ></monitorDialog>
        </div>
      </div>
    </global-drawer>
  </div>
</template>
<script>
import titleBar from "@/views/components/personalPanel/titleBar.vue";
import MenuSelect from "@/views/components/personalPanel/menuSelect.vue";
import monitorDialog from "@/views/components/personalPanel/monitorDialog.vue";
import {eventBus} from "@/main.js";
import {
  batchAddMetric,
  addMetric,
  deleteMetric,
  batchDeleteMetric,
  searchList,
  searchMetricPage,
  searchDataTree,
  searchDataListSys,
} from "@/api/personalPanel.js";
import {updateUserMetric} from "@/api/monitoringTasks.js";
import searchInput from "@/views/components/personalPanel/searchInput.vue";
//import getLocalStorageData from "@/assets/js";

export default {
  name: "addMonitorDrawer",
  components: {searchInput, MenuSelect, titleBar, monitorDialog},
  data() {
    return {
      addOrUpdateVisible: false,
      isMarkShow: false, // 抽屉状态
      showDrawer: false,
      viteData: {
        monitor: {
          authenticationInformation: "mal",
          actionName: "searchMetricUpList",
          dataSource: "mysql-operate",
          data: {},
          pageInfo: {},
        },
        userId: JSON.parse(localStorage.getItem("userinfo")).userId,
        details: {},
        status: [
          {
            value: "0",
            label: "未订阅",
          },
          {
            value: "1",
            label: "已订阅",
          },
        ],
        monitorDataList: [],
        searchDataList: {
          functionName: null,
          system: null,
          layerId: null,
          majorId: null,
          isAttention: null,
          state: null
        },
        systemList: [],
        level: [],
        majorId: null,
        specialityList: [],
        pageIndex: 1,
        pageSize: 24,
        total: 0,
      },
    };
  },
  props: ["systemList", "level", "specialityList"],

  methods: {
    handleDrawerVisibility(val) {
      console.log(val, "isMarkShowisMarkShow");
      this.viteData.pageIndex = 1;

      this.isMarkShow = val;
      if (val === false) {
        document.body.style.overflow = 'auto'

        this.$emit("searchList");
      } else {
        this.disableScroll()
      }
    },
    disableScroll() {
      document.body.style.overflow = 'hidden';
    },
    enableScroll() {
      document.body.style.overflow = '';
    },
    handelMonitor(data) {
      let address = data.afterLoginAddress;
      data.SysID = data.systemId;
      console.log(data);
      this.$emit("use-monitor", data, address);
    },

    handleInput(value) {
      if (!value) {
        this.viteData.searchDataList.majorId = null;
        this.getAllMonitorList();
      }
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
    // 获取全部监测项列表
    getAllMonitorList() {
      const params = _.cloneDeep(this.viteData.monitor);
      params.pageInfo.pageSize = this.viteData.pageSize;
      params.pageInfo.pageIndex = this.viteData.pageIndex;
      params.actionName = "searchRowLevelMetricUpList";
      params.data.userId = this.viteData.userId;
      console.log(this.viteData.searchDataList.functionName);
      if (this.viteData.searchDataList) {
        // params.data.monitorName = this.viteData.searchDataList.functionName;
        // params.data.layerId = this.viteData.searchDataList.layerId;
        // params.data.majorId = this.viteData.searchDataList.majorId;
        // params.data.systemId = this.viteData.searchDataList.system;
        // params.data.status = this.viteData.searchDataList.state;
        params.data.monitorName = this.viteData.searchDataList.functionName;
        params.data.layerId = this.viteData.searchDataList.layerId;
        params.data.majorId = this.viteData.searchDataList.majorId;
        params.data.systemId = this.viteData.searchDataList.system;
        params.data.status = this.viteData.searchDataList.state;
      }
      searchMetricPage(params).then((res) => {
        this.viteData.monitorDataList = res;
        if (res.pageInfo) {
          this.viteData.total = res.pageInfo.total;
          this.viteData.pageIndex = res.pageInfo.pageIndex;
          this.viteData.pageSize = res.pageInfo.pageSize;
        } else {
          this.viteData.total = 0;
          this.viteData.pageIndex = 1;
          this.viteData.pageSize = 24;
        }
      });
      this.getDataList();
    },
    // 选择专业
    handleSelectMjor(value){
      this.viteData.searchDataList.majorId = value;
      this.viteData.searchDataList.system = null;
      this.getAllMonitorList();
      this.getDataList();
    },
    // 选择层级
    handleSelectLayer(value){
      this.viteData.searchDataList.layerId = value;
      this.getAllMonitorList();
      this.getDataList();
    },
    // 选择系统
    handleSelectSystem(value){
      this.viteData.searchDataList.system = value;
      this.getAllMonitorList();
      this.getDataList();
    },
    // 选择状态
    handleSelect(value) {
      this.viteData.searchDataList.functionName = value.value;
      this.getAllMonitorList();
      this.getDataList();
    },
    // 监听分页
    handleCurrentChange(val) {
      console.log(val);
      this.viteData.pageIndex = val;
      this.getAllMonitorList();
    },
    toggleMonitorDrawer() {
      this.showDrawer = !this.showDrawer;
      this.$emit("get-drawer-state", this.showDrawer);
    },
    showDialog(item) {
      this.addOrUpdateVisible = true;
      this.viteData.details = item;
    },
    // 监听 子组件弹窗关闭后触发，有子组件调用
    showAddOrUpdate(data) {
      if (data === "false") {
        this.addOrUpdateVisible = false;
      } else {
        this.addOrUpdateVisible = true;
      }
    },
    // 全部加入
    async addAllMonitor(item) {
      const params = _.cloneDeep(this.viteData.monitor);
      params.actionName = "batchAddUserMetric";
      params.data = this.viteData.monitorDataList.resultList
          .filter((item) => !item.userId)
          .map((item) => ({
            monitorId: item.monitorId,
            userId: this.viteData.userId,
          }));
      console.log(params.data);
      if (params.data.length === 0) {
        this.$message({
          message: "暂无监测项可加入",
          type: "warning",
        });
      } else {
        await batchAddMetric(params).then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "新增成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "新增失败，请联系管理员",
              type: "error",
            });
          }
        });
      }
      this.getAllMonitorList();
      // eventBus.$emit("getAllList");
    },
    // 加入监测项
    async addMonitor(item) {




      this.$confirm('在订阅监测项的时候，确定自己是否有权限使用该监测项！', '订阅监测项说明', {
        confirmButtonText: '我已知晓并订阅',
        cancelButtonText:'关闭',
      }).then(async ()=>{
        const params = _.cloneDeep(this.viteData.monitor);
        params.actionName = "addUserMetric";
        params.data.userId = this.viteData.userId;
        params.data.monitorId = item.monitorId;
        await addMetric(params).then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "新增监测项成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "新增监测项失败，请联系管理员",
              type: "error",
            });
          }
        });
        this.getAllMonitorList();
      }).catch(()=>{

      })
      // eventBus.$emit("getAllList");
    },
    // 移除监测项
    async removeMonitor(item) {
      const params = await _.cloneDeep(this.viteData.monitor);
      params.actionName = "deleteUserMetric";
      params.data.monitorId = item.monitorId;
      params.data.userId = this.viteData.userId;

      await deleteMetric(params).then((res) => {
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: "成功移除监测项",
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: "移除监测项失败，请联系管理员",
            type: "error",
          });
        }
      });
      this.getAllMonitorList();
      // eventBus.$emit("getAllList");
    },
    // 全部移除
    async removeAllMonitor() {
      const params = _.cloneDeep(this.viteData.monitor);
      params.actionName = "batchDeleteUserMetric";
      params.data = this.viteData.monitorDataList.resultList
          .filter((item) => item.userId)
          .map((item) => ({
            monitorId: item.monitorId,
            userId: this.viteData.userId,
          }));
      if (params.data.length === 0) {
        this.$message({
          message: "暂无监测项可移除",
          type: "warning",
        });
      } else {
        await batchDeleteMetric(params).then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "移除成功",
              type: "success",
            });
            if (!res.resultList.length) {
              this.$message({
                message: "暂无监测项可移除",
                type: "warning",
              });
            }
          } else {
            this.$message({
              showClose: true,
              message: "移除失败，请联系管理员",
              type: "error",
            });
          }
        });
      }

      this.getAllMonitorList();
      // eventBus.$emit("getAllList");
    },
    // 获取数据层级、专业、系统列表
    async getDataList() {
      const params = _.cloneDeep(this.viteData.monitor);
      params.actionName = "searchLayerList";
      params.idAttribute = "layerId";
      params.parentIdAttribute = "parentId";
      await searchDataTree(params).then((res) => {
        this.viteData.level = res.resultList;
      });
      // 获取系统
      const param = _.cloneDeep(this.viteData.monitor);
      param.actionName = "searchSystemList";
      param.data.majorId = this.viteData.searchDataList.majorId;
      await searchDataListSys(param).then((res) => {
        this.viteData.systemList = res.resultList.map((item) => ({
          systemName: item.systemName,
          systemId: item.systemId,
        }));
      });
      //获取专业树
      await searchDataTree({
        actionName: "searchMajorList",
        dataSource: "mysql-operate",
        authenticationInformation: "mal",
        idAttribute: "majorId",
        parentIdAttribute: "parentId",
      }).then((res) => {
        this.viteData.specialityList = res.resultList;
      });
    },
    handleChange(data) {
      this.viteData.searchDataList.functionName = data;
      this.getAllMonitorList();
    },
    // 搜索
    handleSearch() {
      this.getAllMonitorList();
    },
    // 重置
    handleReset() {
      this.viteData.searchDataList = {
        functionName: null,
        system: null,
        layerId: null,
        majorId: null,
        isAttention: null,
      };
      this.viteData.pageIndex = 1;
      this.viteData.pageSize = 24;
      this.getAllMonitorList();
    },
  },

  created() {
    /*this.viteData.userId = getLocalStorageData('userInfo').userId*/
    this.getAllMonitorList();
  },
  computed: {},
  mounted() {
  },
  watch: {},
};
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

//.vue-treeselect__control {
//  padding-left: 5px;
//  padding-right: 5px;
//  display: table;
//  table-layout: fixed;
//  width: 120px!important;
//  height: 32px!important;
//  border: 1px solid #ddd;
//  border-radius: 5px;
//  background: #fff;
//  transition-duration: 200ms;
//  transition-property: border-color, box-shadow, width, height, background-color, opacity;
//  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
//}
:deep(.vue-treeselect__control) {
  //width: 200px;
  height: 32px;
  line-height: 32px !important;
}

:deep(.el-button--primary) {
  border-color: $primary-color !important;
  padding: 8px 20px !important;
}

:deep(.vue-treeselect__control) {
  line-height: 32px !important;
}

:deep(.vue-treeselect__menu) {
  z-index: 99999 !important;
  max-height: 300px;
  overflow-y: auto;
}
</style>
