<template>
  <el-row :gutter="0">
    <el-col :span="8"
      ><div class="platform-container">
        <!-- <img class="image" src="@/assets/images/lineIcon.png" alt="lineIcon" /> -->
        <span class="text-title">{{ title }}</span>
        <div class="platform-title">
          <!-- <img class="image" src="@/assets/images/msgIcon.png" alt="lineIcon" /> -->
          <span class="text"
            >未送审单风华高科未送审单风华高科未送审单风华高科未送审单风华高科未送审单风华高科未送审单</span
          >
        </div>
      </div>
    </el-col>
    <el-col :span="11"
      ><div class="">
        <el-form>
          <el-row :gutter="2">
            <el-col :span="5">
              <el-form-item label="层级">
                <!--              <treeselect
                  v-model="viteData.searchDataList.layerId"
                  placeholder="请选择层级"
                  :normalizer="normalizer"
                  @select="handleSelect"
                  :options="viteData.level"
              >
              </treeselect>-->
                <el-select
                  v-model="viteData.searchDataList.layerId"
                  clearable
                  @change="handleSelect(viteData.searchDataList)"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option
                    v-for="item in viteData.level"
                    :label="item.layerName"
                    :value="item.layerId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="专业">
                <!--              <treeselect
                  v-model="viteData.searchDataList.majorId"
                  placeholder="请选择专业"
                  :normalizer="normalizerMajor"
                  :options="viteData.specialityList"
                  @select="handleSelect"
              >
              </treeselect>-->
                <el-select
                  v-model="viteData.searchDataList.majorId"
                  clearable
                  @change="handleSelect(viteData.searchDataList)"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option
                    v-for="item in viteData.specialityList"
                    :label="item.majorName"
                    :value="item.majorId"
                  ></el-option>
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="5">
              <el-form-item label="系统">
                <el-select
                  v-model="viteData.searchDataList.system"
                  clearable
                  @change="handleSelect(viteData.searchDataList)"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option
                    v-for="item in viteData.systemList"
                    :label="item.systemName"
                    :value="item.systemId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8"
              ><div class="" style="margin-left: 20px">
                <search-input
                  v-model="viteData.searchDataList.functionName"
                  @search="handleSelect"
                ></search-input></div
            ></el-col>
          </el-row>
        </el-form>
      </div>
    </el-col>
    <el-col :span="5"
      ><div>
        <el-row :gutter="1">
          <el-col :span="9"
            ><div class="platform-add-monitor-btn">
              <el-button
                type="success"
                @click="openDrawer"
                size="medium"
                style="background-color: $primary-color; color: white"
                >添加监测项</el-button
              >
            </div></el-col
          >
          <el-col :span="14"
            ><div class="platform-choose">
              <el-radio
                v-model="radio"
                label="1"
                class="platform-personal-panel"
                >打开弹窗</el-radio
              >
              <el-radio
                v-model="radio"
                label="2"
                class="platform-personal-panel"
                >打开标签页</el-radio
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <div class="platform-mark-toggle-drawer" v-if="addOrUpdateVisible"></div>
    <addMonitorDrawer
      hide-on-single-page
      @get-drawer-state="getDrawerState"
      :monitorData="this.viteData.monitorDataList"
      :systemList="this.viteData.systemList"
      :level="this.viteData.level"
      :specialityList="this.viteData.specialityList"
      ref="addMonitorRef"
    ></addMonitorDrawer>
  </el-row>
</template>
<script>
import addMonitorDrawer from "@/views/components/personalPanel/addMonitorDragwer.vue";
import searchInput from "@/views/components/personalPanel/searchInput.vue";
import { searchDataTree, searchDataListSys } from "@/api/personalPanel.js";
import { eventBus } from "@/main";
//import getLocalStorageData from "@/assets/js";

export default {
  name: "topBar",
  components: { addMonitorDrawer, searchInput },
  data() {
    return {
      viteData: {
        monitorPageList: {
          authenticationInformation: "mal",
          actionName: "searchMetricUpList",
          dataSource: "mysql-operate",
          data: {},
          pageInfo: {},
        },
        userId: JSON.parse(localStorage.getItem("userinfo")).userId,
        systemList: [],
        level: [],
        specialityList: [],
        searchDataList: {
          functionName: null,
          system: null,
          layerId: null,
          majorId: null,
        },
        pageInfo: {
          pageIndex: 1,
          pageSize: 24,
        },
        monitorDataList: [],
      },
      addOrUpdateVisible: false,
      radio: "1",
      title: "我的监测项",
    };
  },
  props: [],
  mounted() {},
  methods: {
    async handleSelect(value) {
      console.log(value);
      if (value.layerId) {
        this.viteData.searchDataList.layerId = value.layerId;
      }
      if (value.majorId) {
        this.viteData.searchDataList.majorId = value.majorId;
      }
      if (value.value || value.value == "") {
        this.viteData.searchDataList.functionName = value.value;
      }
      await this.getDataList();
      await this.$emit("searchData", this.viteData.searchDataList);
      eventBus.$emit("getAllList");
    },
    openDrawer() {
      console.log("添加");
      this.addOrUpdateVisible = true;
      this.$refs.addMonitorRef.toggleMonitorDrawer();
      /*      this.getAllMonitorList()*/
      this.$refs.addMonitorRef.getAllMonitorList();
    },
    getDrawerState(val) {
      this.addOrUpdateVisible = val;
      this.$emit("get-drawer-state", this.addOrUpdateVisible);
    },
    // 获取数据层级、专业、系统列表
    async getDataList() {
      const params = _.cloneDeep(this.viteData.monitorPageList);
      params.actionName = "searchLayerList";
      params.idAttribute = "layerId";
      params.parentIdAttribute = "parentId";
      await searchDataTree(params).then((res) => {
        this.viteData.level = res.resultList;
      });
      // 获取系统
      const param = _.cloneDeep(this.viteData.monitorPageList);
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
  },
  created() {
    /*this.viteData.userId = getLocalStorageData('userInfo').userId*/
    this.getDataList();
  },
};
</script>
<style scoped lang="scss">
.platform-container {
  height: 30px;
  display: flex;
  /* 使用Flexbox布局 */
  align-items: center;
  /* 垂直居中对齐 */
  .image {
    height: 30px;
    /* 或者你需要的任何尺寸 */
    margin-right: 10px;
    /* 右边距，可根据需要调整 */
  }

  .text-title {
    font-weight: 600;
    font-size: 20px;
    color: #000000;
  }

  .platform-title {
    margin-left: 10px;
    height: 30px;
    display: flex;
    /* 使用Flexbox布局 */
    align-items: center;

    /* 垂直居中对齐 */
    .image {
      height: 20px;
      /* 或者你需要的任何尺寸 */
      margin-right: 10px;
      /* 右边距，可根据需要调整 */
    }

    .text {
      flex-grow: 1;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #0077b4;
      line-height: 17px;
      width: 420px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      /* 允许文本占据剩余空间 */
    }
  }
}

label {
  margin-right: 19px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  line-height: 22px;
  letter-spacing: 1px;
  text-shadow: 0px 2px 4px rgba(238, 238, 238, 0.5);
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.platform-add-monitor-btn {
  margin-left: 8px;
}

.platform-choose {
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e8ecef;
  width: 238px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  .platform-personal-panel {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    line-height: 20px;
    text-align: left;
    font-style: normal;
  }
}

:deep(.el-radio-button__inner) {
  padding: 5px 15px;
}

:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
  background-color: $primary-color;
  border-color: $primary-color;
  box-shadow: -1px 0 0 0 $primary-color;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  border-color: $primary-color;
  background: $primary-color;
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: $primary-color;
}

:deep(.el-switch__label.is-active) {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
  text-align: left;
  font-style: normal;
}
:deep(.vue-treeselect) {
  display: inline-block;
  position: relative;
}
:deep(.vue-treeselect__control) {
  width: 120px;
  height: 32px;
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
</style>
