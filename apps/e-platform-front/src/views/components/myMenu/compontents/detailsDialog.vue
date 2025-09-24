<template>
  <el-dialog
    :visible.sync="showDialog"
    append-to-body
    class="platform-dialog-index"
    height="90rem"
    width="60%"
    @close="handleClose"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <div
          v-if="!isErrorImgShow"
          class="platform-dialog-img platform-dialog-min-height"
        >
          <img
            :src="infoMessageData.videoAddress"
            alt="dialogImg"
            @error="handleImageError"
          />
        </div>
        <div
          v-if="isErrorImgShow"
          class="platform-dialog-img platform-dialog-min-height"
        >
          <no-data :title="'暂无图片'"></no-data>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="platform-dialog-text">
          <div class="menu-message-top">
            <div class="icon-line">
              <!-- <img
                alt="lineIcon"
                src="@/assets/images/menuListIcons/lineIcon.png"
              /> -->
            </div>
            <div class="menu-name-current">功能</div>
          </div>
          <el-form>
            <el-form-item prop="name">
              <template slot="label">
                <div class="platform-menu-card-label-dialog">
                  <div>
                    <!-- <img
                      alt="专业图标"
                      src="@/assets/images/menuCardIcons/speciality.png"
                    /> -->
                  </div>
                  <span>菜单名称：</span>
                </div>
              </template>
              <span class="platform-content-card-dialog">{{
                infoMessageData.menuName
              }}</span>
            </el-form-item>
            <el-form-item prop="name">
              <template slot="label">
                <div class="platform-menu-card-label-dialog">
                  <!--                  <div>-->
                  <!--                    <img alt="专业图标" src="@/assets/images/menuCardIcons/speciality.png">-->
                  <!--                  </div>-->
                  <i class="el-icon-data-line"></i>
                  <span>专业：</span>
                </div>
              </template>
              <span class="platform-content-card-dialog">{{
                infoMessageData.majorName
              }}</span>
            </el-form-item>
            <el-form-item prop="name">
              <template slot="label">
                <div class="platform-menu-card-label-dialog">
                  <div>
                    <!-- <img
                      alt="全路径图标"
                      src="@/assets/images/menuCardIcons/fullPath.png"
                    /> -->
                  </div>
                  <span>全路径：</span>
                </div>
              </template>
              <div class="platform-content-card-dialog">
                <template
                  v-for="(
                    item, index
                  ) in infoMessageData.commonPositionNames.split(',')"
                >
                  <span
                    >{{ item
                    }}<img
                      v-if="
                        index <
                        infoMessageData.commonPositionNames.split(',').length -
                          1
                      "
                      :src="viteDate.img"
                      alt="路径图标"
                  /></span>
                </template>
              </div>
            </el-form-item>
            <el-form-item prop="name">
              <template slot="label">
                <div class="platform-menu-card-label-dialog">
                  <span>常用岗位：</span>
                </div>
              </template>
              <span class="platform-content-card-dialog">{{
                infoMessageData.commonPositionNames.replace(/,/g, " 、")
              }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="platform-dialog-marin">
            <div class="platform-dialog-title">功能作用价值</div>
            <p class="platform-dialog-value-content">
              {{ infoMessageData.menuDescription }}
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
<!--    <span slot="footer" class="dialog-footer">-->
<!--      <el-button-->
<!--        style="background-color: $primary-color; color: white"-->
<!--        type="primary"-->
<!--        @click="enterOriginalSystem"-->
<!--        >进入原系统</el-button-->
<!--      >-->
      <!--  <el-button v-if="infoMessageData.attentionStatus === 0" plain size="medium" style="background-color: #ffffff; color: $primary-color;"
                  @click="addMenuList(infoMessageData)">菜单关注</el-button>
      <el-button v-else plain size="medium" style="background-color: #ffffff; color: $primary-color;"
                 @click="removeMenuSubscription(infoMessageData)">取消关注</el-button> -->
<!--    </span>-->
  </el-dialog>
</template>

<script>
// import test from "@/assets/images/menuListIcons/test.png";
// import Path from "@/assets/images/menuCardIcons/path.png";
import {
  addMenuSubscription,
  deleteMenuSubscription,
  searchMenuList,
  searchParentMenuList,
} from "@/api/menu";

export default {
  name: "detailsDialog",
  data() {
    return {
      // 控制弹出框显示隐藏
      showDialog: false,
      isErrorImgShow: false,
      isAttentionStatus: 0,
      childrenNodeNew: [],
      treeDataNew: [],
      infoMessageData: {
        menuName: "",
        systemName: "",
        menuDescription: "",
        majorName: "",
        commonPositionNames: "",
      },
      viteDate: {
        // img: Path,
        path: [
          "营销",
          "活动",
          "活动管理",
          "营销",
          "活动",
          "活动管理",
          "营销",
          "活动",
          "活动管理",
          "营销",
          "活动",
          "活动管理",
          "营销",
          "活动",
          "活动管理",
          "营销",
          "活动",
          "活动管理",
        ],
        post: [
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
          "营销2.0",
        ],
        value:
          "营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0营销2.0",
        // src: test,
      },
    };
  },
  props: {
    addOrUpdateVisible: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  methods: {
    // 设置暂无图片
    handleImageError(event) {
      this.isErrorImgShow = true;
    },
    // 获取详情数据
    getInfoMessage(data) {
      if (data) {
        this.infoMessageData = data;
        this.isAttentionStatus = data.attentionStatus;
      }
    },
    // 弹出框关闭后触发
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit("change-show", "false");
    },
    // 菜单关注
    addMenuList(data) {
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "addMenuAttention",
        dataSource: "mysql-operate",
        data: [
          {
            menuId: data.menuId,
            userId: this.$store.state.userInfo.userId,
          },
        ],
      };
      addMenuSubscription(params).then((res) => {
        if (res.status === 200) {
          this.$nextTick(() => {
            this.$message.success("关注成功！");
            this.searchParentMenuList(this.infoMessageData);
            this.isAttentionStatus = 1;
            this.infoMessageData.attentionStatus = 1;
            console.log("关注成功后状态：", this.isAttentionStatus); // 调试信息
            setTimeout(() => {
              this.$emit("menu-select-tree", this.childrenNodeNew);
            }, 600);
            this.$forceUpdate();
            // EventBus.$emit('updateData');
          });
        }
      });
    },
    // 取消关注
    removeMenuSubscription(data) {
      let arr = [];
      arr.push({
        data: {
          menuId: data.menuId,
          userId: this.$store.state.userInfo.userId,
        },
        where: {
          menuId: data.menuId,
          userId: this.$store.state.userInfo.userId,
        },
      });
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "batchUpdateMenuAttention",
        dataSource: "mysql-operate",
        data: arr,
      };
      deleteMenuSubscription(params).then((res) => {
        if (res.status === 200) {
          this.$nextTick(() => {
            this.$message.success("已取消关注！");
            this.searchParentMenuList(this.infoMessageData);
            this.isAttentionStatus = 0;
            this.infoMessageData.attentionStatus = 0;
            console.log("取消关注后状态：", this.isAttentionStatus); // 调试信息
            setTimeout(() => {
              this.$emit("menu-select-tree", this.childrenNodeNew);
            }, 600);
          });
          this.$forceUpdate();
          // EventBus.$emit('updateData');
        }
      });
    },
    // 进入原系统
    // enterOriginalSystem() {
    //   this.showDialog = false;
    //   this.$emit("menu-select-tree");
    // },
    // 列表方式查询数据-查询菜单树形结构
    searchParentMenuList(data) {
      // debugger

      data.userId = null;
      // this.formInline.userId = null
      data.isLastlevel = null;
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "searchParentMenuList",
        dataSource: "mysql-operate",
        idAttribute: "menuId",
        parentIdAttribute: "parentMenuId",
        data: {
          userId: null,
          isLastlevel: null,
          menuSystemId: data.menuSystemId,
          menuId: data.menuId,
          menuMajorId: data.menuMajorId,
        },
        pageInfo: {
          pageIndex: 1,
          pageSize: 10,
        },
      };
      searchParentMenuList(params).then((res) => {
        if (res.status === 200) {
          this.treeDataNew = [...res.resultList];
          if (this.treeDataNew.length > 0) {
            this.$nextTick(() => {
              this.selectItem(0, this.treeDataNew[0], this.isAttentionStatus);
            });
          } else {
            this.$nextTick(() => {
              this.selectItem(
                0,
                { menuId: data.menuId },
                this.isAttentionStatus
              );
            });
          }
        }
      });
    },
    selectItem(index, rootNode, status) {
      // debugger
      // searchMenuList
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "searchMenuAttentionList",
        dataSource: "mysql-operate",
        idAttribute: "menuId",
        parentIdAttribute: "parentMenuId",
        data: {
          userId: this.$store.state.userInfo.userId,
          menuId: rootNode.menuId,
          attentionStatus: status,
        },
      };
      searchMenuList(params).then((res) => {
        if (res.status === 200) {
          this.$nextTick(() => {
            this.childrenNodeNew = res.resultList;
          });
        }
      });
    },
  },
  watch: {
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible() {
      this.showDialog = this.addOrUpdateVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-dialog__body) {
  padding: 20px;
}
:deep(.el-form-item__content) {
  line-height: 40px;
}
</style>
