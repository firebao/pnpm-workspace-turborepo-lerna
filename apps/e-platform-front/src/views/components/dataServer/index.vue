<!--最近使用菜单-->
<template>
  <div>
    <menuTitles
      :title="title"
      :isActionBtnShow="true"
      :actionName="'添加数据服务'"
      @btn-click="handleClick"
      style="margin-bottom: 14px"
    ></menuTitles>
    <div class="intelligent-tools-module">

      <div
        style="overflow-y: scroll"
        :style="[
          {
            height: styleon ? styleon - 100 + 'px' : '',
          },
        ]"
      > 
        <div v-if="dataServerList.length > 0" class="data-server-container">
          <div
            v-for="(item, index) in dataServerList"
            :key="index"
            class="data-server-item"
          >
            <div class="server" @click="handleUsedMenu(item)">
              <img
                style="padding: 3px; border-radius: 4px"
                :src="item.systemIcon"
                alt=""
              />
              <span> {{ item.menuName }}</span>
            </div>
          </div>
        </div>
        <no-data v-else size="30%" title="暂无数据"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
import {
  searchSubscribeSystemList,
  searchSubscribeSystemListliii,
} from "@/api/personalPanel";
import SystemSettingDialog from "@/views/components/digitalizationAbility/systemSettingDialog.vue";
//import xzxx from "@/assets/one@2x.png";
//import qwjs from "@/assets/two@2x.png";
//import wjdb from "@/assets/three@2x.png";
import { searchToolsList } from "@/api/api";
import { addClientLog } from "@/api";
export default {
  name: "digitalizationAbility",
  components: { SystemSettingDialog },
  props: ["itmein", "styleon"],
  data() {
    return {
      title: "数据服务",
      dataServerList: [],
      colorlist: [
        "#E6A23C",
        "#F56C6C",
        "$primary-color",
        "#67C23A",
        "#30A8A2",
        "#E6A23C",
        "#F56C6C",
        "$primary-color",
        "#67C23A",
        "#30A8A2",
        "#E6A23C",
        "#F56C6C",
        "$primary-color",
        "#67C23A",
        "#30A8A2",
        "#E6A23C",
        "#F56C6C",
        "$primary-color",
        "#67C23A",
        "#30A8A2",
        "#E6A23C",
        "#F56C6C",
        "$primary-color",
        "#67C23A",
        "#30A8A2",
        "#E6A23C",
        "#F56C6C",
        "$primary-color",
        "#67C23A",
        "#30A8A2",
      ],
      actionList: [
        {
          actionName: "添加数据服务",
        },
      ],
    };
  },
  watch: {
    itmein(newval, oldval) {
      
      if (newval) {
        this.searchSystemStatusList();
        this.getMenuList();
      }
    },
  },
  mounted() {
    this.searchSystemStatusList();
    this.getMenuList();
  },
  methods: {
    async handleUsedMenu(data) {
      console.log(data, "caidan");
      this.$emit("used-menu", data, 1);
      addClientLog({
        businessId: data.menuId,
        operateBy: this.$store.state.userInfo.userId,
        systemType: data.systemId,
        businessType: "数据服务",
        secondBusinessType: data.menuName,
        thirdBusinessType: "",
        logContent: "数据服务-" + data.menuName,
      }).then(() => {});
    },
    // 获取菜单数据
    getMenuList() {
      searchToolsList({
        authenticationInformation: "身份信息码",
        actionName: "searchIndexMenuAtttentionList",
        dataSource: "mysql-operate",
        data: {
          userId: JSON.parse(localStorage.getItem("userinfo")).userId,
          systemId: "1bd837b87cb011ef9020fa163e03d482",
        },
      }).then((res) => {
        if (res.status === 200) {
          if (res.data !== null) {
            // 检查res.data是否存在且res.data.system_json是否存在
            let resultList = res.data.system_json
              ? JSON.parse(res.data.system_json)
              : [];
            if (resultList && resultList.length > 0) {
              resultList = resultList.filter(
                (item) => item.systemId === "1bd837b87cb011ef9020fa163e03d482"
              );
              this.dataServerList =
                resultList.length > 0 ? resultList[0].menuList : [];
              console.log(this.dataServerList, "dataServerList=====");
              this.dataServerList.forEach((item) => {
                item.systemIcon = resultList[0].systemIcon;
              });
            }
          } else {
            this.dataServerList = [];
          }
        }
      });
    },
    handleClick(index) {
      this.isMarkShow = true;
      // this.$emit("get-draw-state", true);
      this.$emit("addSystemMenuRefmenu", true);
    },

    openUrl(data) {
      if (localStorage["isTokensWDObj"]) {
        sgBrowerserOpenPage(data.url);
      } else {
        this.$message.error("登录系统失败,请检查相关配置!");
      }
    },

    // 连接系统
    async concentParent(data) {
      //清除定时状态刷新
      // console.log(data);
      data.SysID = data.systemId;
      if (this.timeTing) {
        clearTimeout(this.timeTing);
        this.timeTing = null;
      }
      let list = JSON.stringify(data);
      let locationUrl = JSON.stringify(location.href);
      let isPage = JSON.stringify(true);
      // console.log("denglu", list, locationUrl, isPage);
      this.$emit("shouelogind", ".main-index-new");
      sgBrowserExcuteJsCode(
        location.host + "/#/monitorQueue",
        `window.mac.getLogint(${isPage},${locationUrl},${list},true,'2')`
      );
    },
    async searchSystemStatus() {
      let params = {
        data: {
          userId: this.$store.state.userInfo.userId,
        },
      };
      await searchSubscribeSystemList(params).then((res) => {
        console.log(res, "res");
        if (res.status === 200) {
          this.mutableSystemList = res.resultList.map((item) => {
            item.SysID = item.systemId;
            item.isLine = false;
            item.loginURL = item.systemAddress;
            item.successURL = item.afterLoginAddress;
            item.jsCode = item.loginCommand;
            item.isUnifiedPermissionLogin = item.isUnifiedPermissionLogin;

            return item;
          });
          // this.checkedList = this.systemList.map((item) => ({
          //   ...item,
          // }));
          // this.checkedIds = this.checkedList.map((item) => item.systemId);
        }
      });
    },

    //系统
    async searchSystemStatusList() {
      let params = {
        data: {
          userId: this.$store.state.userInfo.userId,
        },
      };
      await searchSubscribeSystemListliii(
        this.$store.state.userInfo.userId
      ).then((res) => {
        console.log(
          res,
          "11111====================================================="
        );

        if (res.status === 200) {
          this.mutableSystemList = res.resultList.map((item) => {
            item.SysID = item.systemId;
            item.isLine = false;
            item.loginURL = item.systemAddress;
            item.successURL = item.afterLoginAddress;
            item.jsCode = item.loginCommand;
            item.isUnifiedPermissionLogin = item.isUnifiedPermissionLogin;
            return item;
          });

          // this.checkedList = this.systemList.map((item) => ({
          //   ...item,
          // }));
          // this.checkedIds = this.checkedList.map((item) => item.systemId);
        }
      });
    },

    //获取系统登录信息数据
    async getSystemListIng() {
      await getSystemList({
        UserID: this.$store.state.userInfo.userId,
      })
        .then((res) => {
          if (res.status === 200) {
            this.obj = res.data;
          }
        })
        .catch((err) => {
          console.log(123);
        });
    },
    loadingAnd(parms) {
      this.$emit("loadingTwxt", parms);
    },
  },
};
</script>
<style lang="scss" scoped>
.digitalization-ability-module {
  padding: 0 19px;
}
.data-server-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 10px;
}
.data-server-item {
  height: 40px;
  line-height: 40px;
  min-width: 140px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(38, 51, 77, 0.03);
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  margin: 0 5px;
  border: 2px solid #f5f6f7;
  padding: 0 8px;
  .server {
    cursor: pointer;
    img {
      line-height: 40px;
      width: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: middle;
      background: $primary-color;
    }
    span {
      margin-left: 10px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.intelligent-tools-module {
  //width: 100%;
  height: 100%;
  position: relative;
  //padding: 0 22px;
  box-sizing: border-box;
  .action-btn {
    margin-left: 200px;
  }

  .intelligent-tools-module-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(86px, 1fr));
    grid-row-gap: 6px;
    grid-column-gap: 2px;

    //height: 400px;

    .intelligent-tools-module-item {
      background: #01d09f;
      margin: 0 auto;
      cursor: pointer;
      z-index: 0;

      .intelligent-tools-module-item-img {
        margin-left: 23px;
        width: 55px;
        height: 55px;

        border-radius: 14px;
        // background: url("@/assets/images/home/bird1.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        /* 垂直居中 */
        justify-content: center;

        /* 水平居中，如果需要的话 */
        img {
          width: 40px;
          height: 40px;
          display: inline-block;
          align-items: center;
          vertical-align: middle;
        }
      }

      .intelligent-tools-module-item-name {
        margin-top: 6px;
        width: 100px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        letter-spacing: 1px;
        text-align: center;
        font-style: normal;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0px auto;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }

    .recently-used-menus-item-empty {
      height: 0;
    }
  }

  ::-webkit-scrollbar {
    width: 2px;
    /* 滚动条宽度 */
    height: 0;
    background-color: #f9f9f9;
    /* 滚动条背景色 */
  }

  /* 自定义滚动条滑块样式 */
  ::-webkit-scrollbar-thumb {
    background-color: #d7f5f4;
    /* 滑块背景色 */
    border-radius: 0;
    /* 滑块圆角 */
  }
}

.bottom-card-click {
  position: absolute;
  right: 16px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: $primary-color;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  cursor: pointer;
}
:deep(.el-message) {
  height: 10xp !important;
}
</style>
