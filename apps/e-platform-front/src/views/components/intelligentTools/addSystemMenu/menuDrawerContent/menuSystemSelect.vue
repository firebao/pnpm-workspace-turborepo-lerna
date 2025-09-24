<!--我的菜单筛选界面-->
<template>
  <div class="platform-menu-system-select">
    <!--顶部条件选择栏-->
    <div class="top-bar-select">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="专业" style="margin-left: 8px">
          <treeselect
            v-model="formInline.majorId"
            placeholder="请选择"
            :appendToBody="true"
            :normalizer="normalizerMajor"
            :clearable="true"
            :options="speciality"
            @select="getSearchList"
            :height="30"
            noChildrenText="没有子选项"
            noOptionsText="没有可选项"
            noResultsText="没有匹配的结果"
            @input="handleInput"
            class="treeselect-main"
          >
          </treeselect>
          <!--					<el-select v-model="formInline.majorId" clearable placeholder="请选择" size="small"
						style="width: 160px;" @change="handleLayerSelect(formInline)">
						<el-option v-for="item in speciality" :key="item.majorId" :label="item.majorName"
							:value="item.majorId">
						</el-option>
					</el-select>-->
        </el-form-item>
        <el-form-item label="层级" style="margin-left: 20px">
          <el-select
            v-model="formInline.layerId"
            clearable
            placeholder="请选择"
            size="small"
            style="width: 160px"
            @change="handleLayerSelect(formInline)"
          >
            <el-option
              v-for="item in level"
              :key="item.layerId"
              :label="item.layerName"
              :value="item.layerId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工具类型" style="margin-left: 20px">
          <el-select
            v-model="formInline.typeId"
            clearable
            placeholder="请选择"
            size="small"
            style="width: 160px"
            @change="handleLayerSelect(formInline)"
          >
            <el-option
              v-for="item in toolType"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 	<el-form-item label="">
					<el-input v-model="formInline.menuName" placeholder="请输入你想要查找的工具" size="small" style="width: 100%;"
						suffix-icon="el-icon-search" @input="handleInput(formInline)">
					</el-input>
				</el-form-item> -->
        <el-form-item style="margin-left: 20px">
          <el-button
            size="small"
            style="background: $primary-color"
            type="primary"
            @click="handleSearch"
            >搜索
          </el-button>
          <el-button plain size="small" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--菜单筛选主体内容-->
    <div>
      <div style="margin: 0 20px">
        <el-row :gutter="20">
          <el-col
            :span="4"
            v-for="(itme, index) in list"
            style="margin-top: 20px"
          >
            <card-list
              @showDetail="showDetail"
              @handel-details="handleDetails"
              :item="itme"
            ></card-list>
          </el-col>
        </el-row>
        <!--左侧系统菜单-->
      </div>
    </div>
    <div style="width: 100%; position: fixed; bottom: 20px">
      <!--      <el-pagination @current-change="handleCurrentChange" :page-size="viteData.pageSize || 30" layout="total, prev, pager, next" :total=this.viteData.total>
      </el-pagination>-->
    </div>
    <!--    <tools-details-dialog :key="datain" :details="detailsData" :addOrUpdateVisible="addOrUpdateVisible"-->
    <!--                           @changeShow="showAddOrUpdate"  ref="addOrUpdateRef"></tools-details-dialog>-->
    <el-dialog
      :visible.sync="addOrUpdateVisible"
      width="60%"
      height="90rem"
      @close="handleClose"
      append-to-body
    >
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="24">
          <div class="">
            <titleBar :text="detailsData.toolName"></titleBar>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="4">
          <div class="platform-personal-panel-detail-name">
            <img src="@/assets//images/monitorName.png" alt="" />
            <span>工具名称：</span>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="platform-personal-panel-detail-value-name">
            <span>{{ detailsData.toolName }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="4">
          <div class="platform-personal-panel-detail-name">
            <img src="@/assets//images/monitorName.png" alt="" />
            <span>所属公司：</span>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="platform-personal-panel-detail-value-name">
            <span>{{ detailsData.developBy }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="4">
          <div class="platform-personal-panel-detail-name">
            <img src="@/assets//images/monitorName.png" alt="" />
            <span>所属层级：</span>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="platform-personal-panel-detail-value-name">
            <span>{{ detailsData.layerName }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="4">
          <div class="platform-personal-panel-detail-name">
            <img src="@/assets//images/monitorName.png" alt="" />
            <span>所属专业：</span>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="platform-personal-panel-detail-value-name">
            <span>{{ detailsData.majorName }}</span>
          </div>
        </el-col>
      </el-row>
      <!--          <el-row :gutter="20">-->
      <!--            <video  width="100%" height="500px"  muted controls id="videoi">-->
      <!--              <source    :src="detailsData.toolVideo" />-->
      <!--            </video>-->
      <!--          </el-row>-->
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="platform-dialog-video platform-dialog-min-height">
            <!--          <el-image class="el-img" :preview-src-list="viteDate.img" :src="viteDate.src" alt="dialogImg">
                </el-image>-->
            <!--          <img :src=viteDate.src alt="dialogImg">-->
            <videoPlayerMP4
                v-if="addOrUpdateVisible"
              :video-url="detailsData.toolVideo"
              :key="detailsData.toolVideo"
              ref="dialogVideo"
            >
            </videoPlayerMP4>
          </div>
        </el-col>
        <!--      <el-col :span="10" style="display: flex;align-items: center;justify-content: center; height: 280px;">
              <div class="platform-personal-panel-detail-picture">
                {{ this.details.reportName }}
              </div>
            </el-col>-->
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="platform-personal-panel-detail-description">
            <span>工具描述</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="platform-personal-panel-detail-description-content">
            {{ detailsData.details }}
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import videoPlayerMP4 from "@/views/components/personalPanel/video.vue";
import titleBar from "@/views/components/personalPanel/titleBar.vue";
import {
  serachDataTree,
  searchToolsList,
  searchDataTree,
  searchToolsPage,
} from "@/api/api.js";
import cardList from "./cardList.vue";
import monitorDialog from "@/views/components/personalPanel/monitorDialog.vue";
import toolsDetailsDialog from "@/views/components/intelligentTools/addSystemMenu/menuDrawerContent/toolsDetailsDialog";
export default {
  name: "menuSystemSelect",
  components: {
    monitorDialog,
    cardList,
    toolsDetailsDialog,
    titleBar,
    videoPlayerMP4,
  },
  data() {
    return {
      formInline: {
        majorId: null, // 专业id
        layerId: "", // 层级id
        typeId: "", //typeid
      },
      layerListOptions: [], // 层级列表
      list: [],
      level: [],
      speciality: [],
      toolType: [],
      addOrUpdateVisible: false,
      detailsData: {},
      datain: "",
    };
  },
  computed: {},
  watch: {
    menuSearchType: {
      handler(news) {
        this.$emit("get-drawer-type", news);
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.searchLayerList();
  },
  mounted() {
    this.GetsearchToolsList();
    this.GetsearchDataTree();
  },
  methods: {
    handleClose() {
      var video = document.getElementById("videoi");
      video.pause();
      this.addOrUpdateVisible = false;
    },
    handleDetails(data) {
      this.datain = Date.now();
      this.$nextTick(() => {
        this.detailsData = data;
        this.addOrUpdateVisible = true;
        var video = document.getElementById("videoi");
        video.src = this.detailsData.toolVideo;
        video.load();
      });
    },
    showAddOrUpdate(data) {
      this.detailsData = data;
      if (data === false) {
        this.addOrUpdateVisible = false;
      } else {
        this.addOrUpdateVisible = true;
      }
    },
    handleInput(value) {
      if (!value) {
        this.formInline.majorId = null;
        this.showDetail();
      }
    },
    getSearchList(value) {
      if (value.layerId) {
        this.formInline.layerId = value.layerId;
      }
      if (value.majorId) {
        this.formInline.majorId = value.majorId;
      }
      this.showDetail();
    },
    handleLayerSelect(value){
      if (value.layerId) {
        this.formInline.layerId = value.layerId;
      }
      if (value.typeId) {
        this.formInline.typeId = value.typeId;
      }
      this.showDetail();
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

    GetsearchDataTree() {
      searchToolsList({
        authenticationInformation: "身份信息码",
        dataSource: "mysql-operate",
        actionName: "searchToolTypeList",
        data: {},
      }).then((res) => {
        this.toolType = res.resultList;
      });
      //获取层级树
      searchDataTree({
        authenticationInformation: "身份信息码",
        dataSource: "mysql-operate",
        actionName: "searchLayerList",
        idAttribute: "layerId",
        parentIdAttribute: "parentId",
        data: {},
      }).then((res) => {
        this.level = res.resultList;
      });
      //获取专业树
      searchDataTree({
        authenticationInformation: "身份信息码",
        dataSource: "mysql-operate",
        actionName: "searchMajorList",
        idAttribute: "majorId",
        parentIdAttribute: "parentId",
        data: {},
      }).then((res) => {
        this.speciality = res.resultList;
      });
    },
    showDetail() {
      this.GetsearchToolsList();
    },
    GetsearchToolsList() {
      searchToolsPage({
        authenticationInformation: "身份信息码",
        actionName: "searchNoDescriptionToolList",
        dataSource: "mysql-operate",
        data: {
          ...this.formInline,
          userId: JSON.parse(localStorage.getItem("userinfo")).userId, //必传
        },
        pageInfo: { pageSize: 30, pageIndex: 1 },
      }).then((res) => {
        console.log(res, "1233");
        this.list = res.resultList;
        this.$emit("showDetail");
      });
    },
    handleSearch() {
      this.GetsearchToolsList();
    },
    handleReset() {
      this.formInline = {
        majorId: "", // 专业id
        layerId: "", // 层级id
        typeId: "", //typeid
      };
      this.GetsearchToolsList();
    },
    searchLayerList() {
      // serachDataTree(
      // 		{
      // 		  "authenticationInformation":"身份信息码",
      // 		  "actionName": "searchLayerList",
      // 		  "dataSource":"mysql-operate",
      //  idAttribute: "layerId",
      //  parentIdAttribute: "parentId",
      // 		  "data": {
      // 		  }
      // 	}).then((res) => {
      //    if (res.status === 200) {
      //      this.layerListOptions = res.resultList
      //    }
      //  })
    },
  },
};
</script>

<style lang="scss" scoped>
.nsdufsuey {
  margin-right: 25px;
}

:deep(.el-switch__label.is-active) {
  width: 84px;
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
  text-align: left;
  font-style: normal;
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

:deep(.el-select .el-input.is-focus .el-input__inner) {
  border-color: $primary-color;
}

:deep(.el-select-dropdown__item) {
  color: $primary-color !important;
}

:deep(.el-select-dropdown__item, .selected) {
  color: $primary-color !important;
}

:deep(.el-select-dropdown__item.hover, .el-select-dropdown__item:hover) {
  background: rgba(39, 168, 163, 0.3);
}

:deep(.el-input__inner) {
  border-radius: 0.1rem !important;
}

:deep(.el-input__inner:focus) {
  //color: $primary-color !important;
  border-color: $primary-color !important;
}

:deep(.el-radio__inner:hover) {
  border-color: $primary-color !important;
}
:deep(.el-button--primary) {
  padding: 8px 20px !important;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-form--inline .el-form-item__label) {
  line-height: 32px !important;
}

:deep(.el-select-dropdown__item.hover, .el-select-dropdown__item:hover) {
  background-color: rgba(39, 168, 163, 0.2) !important;
}
:deep(.vue-treeselect__control) {
  width: 120px;
  height: 32px;
  line-height: 32px !important;
}
.platform-personal-panel-detail-name {
  margin-top: 16px;
  display: flex;
  align-items: center;
  height: 100%;

  img {
    padding-top: 1px;
  }

  span {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    line-height: 20px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
    margin-left: 10px;
  }
}

.platform-personal-panel-detail-value-name {
  padding-top: 16px;

  span {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    line-height: 20px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
  }
}

.platform-dialog-min-height {
  margin-bottom: 40px;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
  }
}

.platform-dialog-video {
  height: 350px;
  margin-top: 20px;
  position: relative;
  border-radius: 10px;
  border: 0px solid #ecf0f2;
  .el-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}

.platform-personal-panel-detail-picture {
  padding-top: 20px;
}

.platform-personal-panel-detail-description {
  margin-top: 20px;

  span {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: $primary-color;
    line-height: 22px;
    text-align: left;
    font-style: normal;
  }
}

.platform-personal-panel-detail-description-content {
  margin-top: 18px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-indent: 2em;
}
:deep(.el-dialog__body) {
  padding: 20px;
}
</style>
