<template>
  <div>
    <global-drawer
      :is-mark-show="isMarkShow"
      @update:is-drawer-show="handleDrawerVisibility"
    >
      <!-- 抽屉内容 -->
      <div class="drawer-content">
        <div class="drawer-top">
          <el-row :gutter="20">
            <el-col :span="11">
              <titleBar :title="'订阅系统'"></titleBar>
            </el-col>
            <el-col :span="13">
              <el-form
                :inline="true"
                :model="viteData.subscribeSystemForm"
                class="search-form"
                style="padding: 0"
              >
                <el-form-item label="专业" style="margin: 0 10px">
<!--                  <treeselect-->
<!--                    @input="handleMajorSelect"-->
<!--                    style="height: 30px; width: 160px"-->
<!--                    v-model="viteData.subscribeSystemForm.majorId"-->
<!--                    placeholder="请选择"-->
<!--                    :normalizer="normalizer"-->
<!--                    :options="viteData.majorOptions"-->
<!--                  >-->
<!--                  </treeselect>-->
                  <el-select v-model="viteData.subscribeSystemForm.majorId"  style="height: 30px; width: 160px" clearable @change="handleMajorSelect" size="small"
                             placeholder="请选择专业">
                    <el-option v-for="item in viteData.majorOptions" :label="item.majorName"
                               :value="item.majorId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否订阅" style="margin: 0 10px">
                  <el-select
                    v-model="viteData.subscribeSystemForm.isSubscribe"
                    clearable
                    placeholder="请选择"
                    size="small"
                    style="width: 160px"
                    @change="handleLayerSelect(viteData.subscribeSystemForm)"
                  >
                    <el-option label="已订阅" value="1"></el-option>
                    <el-option label="未订阅" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" style="margin: 0 10px">
                  <el-input
                    v-model="viteData.subscribeSystemForm.systemName"
                    placeholder="请输入你想要查找的系统名"
                    size="small"
                    style="width: 100%"
                    suffix-icon="el-icon-search"
                    @input="handleChange"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item style="margin: 0 10px">
                  <el-button
                    size="small"
                    style="background: $primary-color"
                    type="primary"
                    @click="handleSearch"
                    >搜索</el-button
                  >
                  <el-button plain size="small" @click="handleReset"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <div v-if="viteData.systemLists.length > 0">
          <div class="drawer-middle">
            <div
              class="flex-container"
              v-show="viteData.systemLists && viteData.systemLists.length > 0"
            >
              <div
                class="flex-item"
                v-for="item in viteData.systemLists"
                :key="item.systemId"
              >
                <div class="nunsdufs-sdiidnuf">
                  <div class="nsidnsf-mineir7 barcolor4">
                    {{ item.abbreviationName }}
                  </div>
                  <div>
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <div class="system-state-icon">
                          <img :src="item.systemIcon" alt="" />
                        </div>
                      </el-col>
                      <el-col :span="18">
                        <div class="ndiuds-yyuerer">
                          <div class="ijidrre-nssd" :title="item.systemName">
                            {{ item.systemName }}
                          </div>
                          <div style="line-height: 0">
                            <span class="shubds-byafs"> 专业: </span>
                            <span class="ndusbrr-nubfs">{{
                              item.majorName
                            }}</span>
                          </div>
                          <div style="line-height: 0">
                            <span class="shubds-byafs"> 系统介绍: </span>
                            <el-tooltip
                              v-if="true"
                              :content="item.systemDescription"
                              class="item"
                              effect="dark"
                              placement="top"
                            >
                            </el-tooltip>
                            <span class="ndusbrr-nubfs">{{
                              item.systemDescription
                            }}</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="nsdfhus-hutabbrt">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <div
                          class="ushdust-fsing"
                          @click="addSubscribeSystem(item)"
                          v-if="item.isSubscribe === 0"
                        >
                          立即订阅
                        </div>
                        <div
                          class="ushdust-fsing8"
                          @click="unsubscribe(item)"
                          v-if="item.isSubscribe === 1"
                        >
                          取消订阅
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="ushdust-fsing" @click="systemDetails(item)">
                          查看详情
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="system-bottom">
            <el-pagination
              :current-page="viteData.pageInfo.pageIndex"
              :page-size="viteData.pageInfo.pageSize"
              :total="viteData.pageInfo.total"
              layout="total,prev, pager, next, jumper"
              style="text-align: center"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
            <div class="system-button" v-if="viteData.pageInfo.total === 0">
              <el-button
                size="medium"
                style="background-color: $primary-color; color: white"
                type="success"
                @click="handleAddMenuAll"
                >全部订阅</el-button
              >
              <el-button
                plain
                size="medium"
                style="background-color: #ffffff; color: $primary-color"
                @click="handleRemoveMenuAll"
                >全部取消</el-button
              >
            </div>
          </div>
        </div>
        <no-data
          title="暂无数据"
          size="60%"
          v-else
          style="margin-top: 10%"
        ></no-data>
      </div>
    </global-drawer>
    <system-details-dialog
      :details="viteData.details"
      @changeShow="showAddOrUpdate"
      ref="addOrUpdateRef"
    ></system-details-dialog>
  </div>
</template>

<script>
// import "@/assets/css/subscriptionTool.scss";
import titleBar from "@/components/menuTitle/index.vue";
import systemDetailsDialog from "@/views/components/digitalizationAbility/systemDetailsDialog";
// import systemDialog from "@/modules/rightToggleDrawer/systemDialog.vue";
import {
  searchLayerList,
  searchMajorList,
  searchSystemList,
  searchSubscribeSystemList,
  searchUserSubscribeSystem,
  SubscribeSystem,
  DeleteSubscribeSystem,
} from "@/api/Grid";
import {removeDuplicateById} from "@/tools/CommonTool";

export default {
  name: "subscribeSystemDrawer",
  components: {
    titleBar,
    systemDetailsDialog,
  },
  props:['layout'],
  data() {
    return {
      isMarkShow: false, // 抽屉状态
      viteData: {
        tools: {
          authenticationInformation: "mal",
          actionName: "searchUserDescriptionToolList",
          dataSource: "mysql-operate",
          data: {},
          pageInfo: {},
        },
        userId: this.$store.state.userInfo.userId,
        systemLists: [], //系统列表
        searchList: {
          toolTypeValue: null,
          layerId: null,
          majorId: null,
          toolName: null,
        },
        subscribeSystemForm: {
          majorName: null,
          majorId: null,
          isSubscribe: "",
          systemName: "",
        },
        pageInfo: {
          pageIndex: 1,
          pageSize: 25,
          total: 0,
        },
        noSubscriptionList: [],
        majorOptions: [], // 专业列表
        pageIndex: 1,
        pageSize: 30,
        total: 0,
        details: {},
      },
      drawerOpen: false,
      addOrUpdateVisible: false,
      sysTypeSelected: []
    };
  },
  created() {
    this.getSystemDescription();
    this.getSystemList();
  },
  methods: {
    handleDrawerVisibility(val) {
      this.isMarkShow = val;
      this.disableScroll();
      if (val === false) {
        this.handleReset();
        this.enableScroll();
        this.$emit("getSubscribeDrawerState");
      }
    },
    disableScroll() {
      document.body.style.overflow = 'hidden';
    },
    enableScroll() {
      document.body.style.overflow = '';
    },
    toggleDrawer() {
      console.log("折叠/开启");
      this.drawerOpen = !this.drawerOpen;
      // 更新抽屉状态，刷新数据
      this.$emit("getSubscribeDrawerState", this.drawerOpen);
    },
    // 树形选择器数据格式化
    normalizer(node) {
      if (node.children === null && !node.children.length) {
        // if (node.children === null || node.children === 'null') {
        delete node.children;
      }
      return {
        id: node.majorId,
        label: node.majorName,
        children: node.children,
      };
    },

    // 获取专业列表
    async getSystemDescription() {
      let params = {
        data: {},
        parentIdAttribute: "parentId",
        idAttribute: "majorId",
      };
      await searchMajorList(params).then((res) => {
        if (res.status === 200) {
          this.viteData.majorOptions = res.resultList;
        }
      });
    },
    isSubscriptionByType(){
      this.viteData.systemLists.forEach(item=>{

      })
      this.subSysList = this.viteData.systemLists.filter()
    },
    // 添加订阅系统
    addSubscribeSystem(item) {
      let params = {
        data: [
          {
            systemId: item.systemId,
            userId: this.viteData.userId,
          },
        ],
      };
      let uniCodes = ['b0cd4ba9596111ef8ff9fa163e5046d3', 'd117ad557a0b11ef9020fa163e03d482'];
      if(uniCodes.includes(item.uniqueCode)){
        this.sysTypeSelected.push(item.uniqueCode)
      }
      this.sysTypeSelected = [...new Set(this.sysTypeSelected)]
      if( this.sysTypeSelected.length === uniCodes.length ){
        this.sysTypeSelected =this.sysTypeSelected.filter(e=>e!==item.uniqueCode)
        this.$message({
          showClose: true,
          message: "个人与机构不能同时订阅，如有需要请先取消后再重新订阅！",
          type: "warning",
        });
        return
      } else {
        SubscribeSystem(params).then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "订阅成功",
              type: "success",
            });
            this.getSystemList();
            this.$emit("getSystemList");
          } else {
            this.$message({
              showClose: true,
              message: "订阅失败",
              type: "error",
            });
          }
        });
      }



    },
    // 删除订阅系统
    unsubscribe(item) {
      // for (let i = 0; i < this.layout.length; i++) {
      //   if(this.layout[i].i==7){
      //     if(this.layout[i].show){
      //       var systemIdp = {
      //         data: [
      //           {
      //             systemId: "29764f1fe91411ef9020fa163e03d482",
      //             userId: this.userInfo.userId
      //           },
      //         ],
      //       }
      //       SubscribeSystem(systemIdp).then((res)=>{
      //         this.searchSystemStatusList();
      //       })
      //     }
      //   }
      // }
      // var index =  this.mutableSystemList.findIndex(item=>item.SysID==="29764f1fe91411ef9020fa163e03d482")
      if(item.systemId=='29764f1fe91411ef9020fa163e03d482'&&this.layout){
        this.$message({
          showClose: true,
          message:"制度标准智能推荐已订阅该系统，不可取消订阅",
          type: "error",
        });
        return
      }
      this.sysTypeSelected =this.sysTypeSelected.filter(e=>e!==item.uniqueCode);
      let params = {
        data: {
          list: [
            {
              systemId: item.systemId,
              userId: this.$store.state.userInfo.userId,
            },
          ],
        },
      };
      DeleteSubscribeSystem(params).then((res) => {
        if (res.status === 200) {
          if (res.data.status === 1) {
            this.$message({
              showClose: true,
              message: "取消订阅成功",
              type: "success",
            });
            this.getSystemList();
            this.$emit("getSystemList");
          } else {
            this.$message({
              showClose: true,
              message: res.data.message ? res.data.message : "取消订阅失败",
              type: "error",
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: "取消订阅失败",
            type: "error",
          });
        }
      });
    },
    //详情弹窗
    systemDetails(item) {
      this.$nextTick(() => {
        this.viteData.details = item;
        this.$refs.addOrUpdateRef.showDialog = true;
        this.addOrUpdateVisible = true;
      });
    },
    showAddOrUpdate(data) {
      if (data === false) {
        this.addOrUpdateVisible = false;
      } else {
        this.addOrUpdateVisible = true;
      }
    },
    //获取系统列表
    async getSystemList() {
      const params = {
        data: {
          userId: this.viteData.userId,
          majorId: this.viteData.subscribeSystemForm.majorId,
          isSubscribe: this.viteData.subscribeSystemForm.isSubscribe,
          systemName: this.viteData.subscribeSystemForm.systemName,
        },
        pageInfo: this.viteData.pageInfo,
      };
      await searchUserSubscribeSystem(params).then((res) => {
        if (res.status === 200) {
          this.viteData.systemLists = res.resultList;
          this.viteData.pageInfo.total = res.pageInfo.total
            ? res.pageInfo.total
            : 0;
          console.log(this.viteData.systemLists, "this.viteData.systemLists");
          /*          this.systemLists = removeDuplicateById(this.systemLists, 'systemId');*/
        }
      });
    },
    // 选择层级
    handleLayerSelect(val) {
      this.getSystemList();
    },
    // 选择专业
    handleMajorSelect(val) {
      // 查询系统
      this.getSystemList(val);
    },
    // 搜索系统
    handleInput(data) {
      this.getSystemList(data);
    },
    handleChange(data) {
      this.viteData.subscribeSystemForm.systemName = data;
      this.getSystemList();
    },
    // 搜索
    handleSearch() {
      this.getSystemList();
    },
    // 全部订阅
    handleAddMenuAll() {
      if (
        this.viteData.systemLists.filter((item) => item.isSubscribe === 0)
          .length === 0
      ) {
        console.log(
          this.viteData.systemLists.filter((item) => item.isSubscribe === 0)
        );
        this.$message({
          showClose: true,
          message: "已全部订阅！",
          type: "warning",
        });
      } else {
        let params = {
          data: this.viteData.systemLists.map((item) => {
            return {
              systemId: item.systemId,
              userId: this.viteData.userId,
            };
          }),
        };
        SubscribeSystem(params).then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "订阅成功",
              type: "success",
            });
            this.getSystemList();
            this.$emit("getSystemList");
          }
        });
      }
    },
    handleRemoveMenuAll() {
      if (
        this.viteData.systemLists.filter((item) => item.isSubscribe === 1)
          .length === 0
      ) {
        console.log(
          this.viteData.systemLists.filter((item) => item.isSubscribe === 0)
        );
        this.$message({
          showClose: true,
          message: "已全部取消订阅！",
          type: "warning",
        });
      } else {
        let params = {
          data: this.viteData.systemLists.map((item) => {
            return {
              systemId: item.systemId,
              userId: this.viteData.userId,
            };
          }),
        };
        DeleteSubscribeSystem(params).then((res) => {
          if (res.status === 200) {
            this.$message({
              showClose: true,
              message: "取消订阅成功",
              type: "success",
            });
            this.getSystemList();
            this.$emit("getSystemList");
          }
        });
      }
    },
    handleSizeChange(val) {
      this.viteData.pageInfo.pageSize = val;
      this.getSystemList();
    },
    handleCurrentChange(val) {
      this.viteData.pageInfo.pageIndex = val;
      this.getSystemList();
    },
    // 重置
    handleReset() {
      this.viteData.subscribeSystemForm = {
        majorName: null,
        majorId: null,
        isSubscribe: "",
        systemName: "",
      };
      this.getSystemList();
    },
  },
  watch: {
    isShowTooltip: {
      handler(news) {
        this.isShowTooltip = news;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.system-bottom {
  position: relative;
}
.system-button {
  position: absolute;
  right: 2%;
  top: 1%;
}

.drawer-content {
  padding: 20px;
  .drawer-top {
    line-height: 0;
    //height: 80px;
    //border-bottom: 1px solid #cccccc;
  }
  .drawer-middle {
    width: 100%;
    .flex-container {
      height: 740px;
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(5, 1fr);
      overflow-y: scroll;
      /* 允许元素换行 */
      align-items: flex-start;
      /* 垂直对齐方式，这里设为顶部对齐，也可以根据需要设置为 center 或其他值 */
    }

    .flex-item {
      //flex: 0 0 calc(20% - 20px);
      width: 300px;
      /* 根据需要设置宽度，这里假设每个元素占据 20% 的宽度，减去一些间隔 */
      margin-right: 20px;
      /* 元素之间的间隔 */
      margin-bottom: 16px;
      /* 如果需要，可以添加底部间隔以在换行时形成间距 */
      /* 其他样式，如 padding、border 等 */
    }

    /* 去除每行最后一个元素的右边距 */
    .flex-container>.flex-item:nth-child(5n) {
      margin-right: 0;
    }

    .nunsdufs-sdiidnuf {
      position: relative;
      height: 130px;
      background: #FFFFFF;
      box-shadow: 0px 2px 4px 0px rgba(228, 228, 228, 0.4);
      border-radius: 16px;
      border: 1px solid #ECF0F2;
    }



    .ijidrre-nssd {
      width: 100px;
      height: 20px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      letter-spacing: 1px;
      text-shadow: 0px 2px 4px rgba(228, 228, 228, 0.4);
      text-align: left;
      font-style: normal;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

    }

    .shubds-byafs {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #8D8D8D;
      line-height: 20px;
      text-shadow: 0px 2px 4px rgba(228,228,228,0.4);
      text-align: left;
      font-style: normal;
      text-overflow: ellipsis;
      overflow: hidden;
      position: relative;
      white-space: nowrap;
      display: inline-block;
      //vertical-align: bottom;
    }

    .ndusbrr-nubfs {
      width: 66%;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #666666;
      line-height: 18px;
      text-shadow: 0px 2px 4px rgba(228,228,228,0.4);
      text-align: left;
      font-style: normal;
      text-overflow: ellipsis;
      overflow: hidden;
      position: relative;
      white-space: nowrap;
      display: inline-block;
      //vertical-align: bottom;
      //width: 66%;
    }

    .ndiuds-yyuerer {
      margin-top: 16px;
    }

    .nsdfhus-hutabbrt {
      border-top: 1px solid #ECF0F2;
      margin: 8px 8px 0 8px;
    }
    .ushdust-fsing{
      height: 40px;
      line-height: 40px;
      font-weight: 400;
      font-size: 14px;
      color: #333333;
      text-align: center;
      letter-spacing: 1px;
      text-shadow: 0px 2px 4px rgba(228,228,228,0.4);
      cursor: pointer;
      &:hover{
        color: #27a7a2;
      };
    }
  }
}
.system-state-icon {
  width: 55px;
  height: 55px;
  background-color: #106afc;
  text-align: center;
  border-radius: 8px;
  margin: 20px 0px 0px 12px;

  img {
    width: 40px;
    height: 40px;
    margin-top: 6px;
    //margin-left: 19px;
  }
}
.menu-title {
  border-bottom: none;
}

.dvnsdmarin-top {
  margin-bottom: 17px;
}
:deep(.el-input--small .el-input__icon) {
  line-height: 40px !important;
}
:deep(.el-form-item__content) {
  line-height: 36px !important;
}
body {
  :global(.vue-treeselect__label) {
    //color: red !important;
  }
  :global(.vue-treeselect__menu-placeholder) {
    display: block !important;
  }
  :global(.vue-treeselect__menu) {
    display: block;
    //position: absolute;
    //overflow-x: hidden;
    //overflow-y: auto;
    width: auto;
    //border: 1px solid #cfcfcf;
    background: #fff;
    font-size: 14px;
    //padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    //height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
    //text-align: center;
    box-shadow: 0px 2px 9px 0px rgba(39, 168, 163, 0.05),
      0px 2px 4px 0px rgba(229, 229, 229, 0.5);
    border-radius: 6px;
    border: 1px solid rgba(39, 168, 163, 0.35) !important;
  }
  :global(.vue-treeselect__x-container:hover) {
    color: #666;
  }
  :global(.vue-treeselect__control:hover) {
    border: 1px solid rgba(39, 168, 163, 0.35) !important;
  }
  :global(.vue-treeselect__control.is-focus) {
    border: $primary-color !important;
  }
}
</style>
