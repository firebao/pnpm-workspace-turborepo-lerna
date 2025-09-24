<!--最近使用菜单-->
<template>
  <div>
    <menuTitles
      :title="title"
      :actionName="'添加系统'"
      :actionList="actionList"
      :isActionBtnShow="true"
      @btn-click="handleClick"
    >
      <!--        <template v-slot:system>-->
      <!--          <div class="action-btn"  @click="systemSetting">-->
      <!--            系统设置-->
      <!--          </div>-->
      <!--        </template>-->
    </menuTitles>
    <div class="intelligent-tools-module">
      <div
        style="overflow-y: scroll"
        :style="[
          {
            height: styleon ? styleon - 100 + 'px' : '',
          },
        ]"
      >
        <div class="intelligent-tools-module-container">
          <div
            class="intelligent-tools-module-item"
            v-for="(item, index) in mutableSystemList"
            :key="index"
            @click="concentParent(item)"
          >
            <div
              class="intelligent-tools-module-item-img"
              :class="!item.isLine ? 'breathing-border' : ''"

            >
              <img :src="item.systemIcon" />
            </div>
            <div
              class="intelligent-tools-module-item-name"
              :title="item.systemDescription"
              :class="item.isLine ? 'activesys':''"
            >

              {{ item.abbreviationName }}
            </div>
          </div>
        </div>
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
import { addClientLog } from "@/api";
import {SubscribeSystem} from "@/api/Grid";
export default {
  name: "digitalizationAbility",
  components: { SystemSettingDialog },
  props: ["itmein", "styleon", "monitorList","layout","userInfo"],
  data() {
    return {
      title: "进入系统",
      mutableSystemList: [],
      systemSettingDialog: false,
      mutableSystemListChild: [],
      colorlist: ["$primary-color"],
      actionList: [
        {
          actionName: "系统设置",
        },
        {
          actionName: "添加系统",
        },
      ],
    };
  },
  watch: {
    itmein(newval, oldval) {
      if (newval) {
        this.searchSystemStatusList();
      }
    },
    monitorList(newval, oldval) {
      if (newval) {
        // console.log(newval, "系统数据11");
        // console.log(this.mutableSystemList);
        this.mutableSystemList = this.mutableSystemList.map((item) => {
          newval.find((i) => {
            if (i.SysID === item.SysID) {
              item.isLine = i.isLine;
              item.Account = i.Account;
              item.Password = i.Password;
              item.isUnifiedPermissionLogin = i.isUnifiedPermissionLogin
                ? i.isUnifiedPermissionLogin
                : "0";
            }
          });
          return item;
        });


      }
    },
  },
  mounted() {
    this.searchSystemStatusList();

  },
  methods: {
    handleClick(index) {
      this.isMarkShow = true;
      if (index === 0) {
        // console.log(this.mutableSystemList, "系统设置");
        // 系统设置
        this.$emit("systemSetting", this.mutableSystemList);
      } else {
        // 添加系统
        this.$emit("addSystemMenuReftoolin", true);
        this.$emit("get-draw-state", true);
      }
    },

    // 连接系统
    async concentParent(data) {
      //清除定时状态刷新
      console.log(data);
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
      addClientLog({
        businessId: data.systemId,
        operateBy: this.$store.state.userInfo.userId,
        systemType: data.systemId,
        businessType: "进入系统",
        secondBusinessType: data.systemName,
        thirdBusinessType: "",
        logContent: "进入系统-" + data.systemName,
      }).then(() => {});
    },
    async searchSystemStatus() {
      let params = {
        data: {
          userId: this.$store.state.userInfo.userId,
        },
      };
      await searchSubscribeSystemList(params).then((res) => {
        if (res.status === 200) {
          this.mutableSystemList = res.resultList.map((item) => {
            item.SysID = item.systemId;
            item.isLine = false;
            item.loginURL = item.systemAddress;
            item.successURL = item.afterLoginAddress;
            item.jsCode = item.loginCommand;
            item.isUnifiedPermissionLogin = item.isUnifiedPermissionLogin
              ? item.isUnifiedPermissionLogin
              : "0";
            return item;
          });
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
        if (res.status === 200) {
          this.mutableSystemList = res.resultList.map((item) => {
            item.SysID = item.systemId;
            item.isLine = false;
            item.loginURL = item.systemAddress;
            item.successURL = item.afterLoginAddress;
            item.jsCode = item.loginCommand;
            item.isUnifiedPermissionLogin = item.isUnifiedPermissionLogin
              ? item.isUnifiedPermissionLogin
              : "0";
            return item;
          });

         var index =  this.mutableSystemList.findIndex(item=>item.SysID==="29764f1fe91411ef9020fa163e03d482")
          if(index===-1){
            for (let i = 0; i < this.layout.length; i++) {
              if(this.layout[i].i==7){
                if(this.layout[i].show){
                  var systemIdp = {
                    data: [
                      {
                        systemId: "29764f1fe91411ef9020fa163e03d482",
                        userId: this.userInfo.userId
                      },
                    ],
                  }
                  SubscribeSystem(systemIdp).then((res)=>{
                    this.searchSystemStatusList();
                  })
                }
              }
            }
          }

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
.activesys{
  color: $primary-color !important;
}
.digitalization-ability-module {
  padding: 0 19px;
}
.sjayusdgave {
  height: 379px;
  width: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 15px;
  grid-column-gap: 15px;
}
.jsdfhubysd {
  height: 87px;
  font-size: 14px;
  width: 87px;
  // margin:10px 10px;
}
.jsdifsdysd {
  text-align: center;
}
.intelligent-tools-module {
  //width: 100%;
  height: 100%;
  position: relative;
  padding: 10px 22px;
  box-sizing: border-box;
  .action-btn {
    margin-left: 200px;
  }

  .intelligent-tools-module-container {
    margin-top: 10px;
    width: 100%;
    //display: flex;
    //flex-wrap: wrap;
    // justify-content: space-between;
    display: grid;
    //grid-template-columns: repeat(auto-fill, minmax(22%, 1fr));
    //grid-template-rows: repeat(auto-fill, minmax(86px, 1fr));
    grid-template-columns: repeat(auto-fill, minmax(86px, 1fr));
    grid-row-gap: 6px;
    grid-column-gap: 2px;

    //height: 400px;

    .intelligent-tools-module-item {
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
        background:$primary-color;
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
        font-size: 12px;
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

@keyframes breathingBorder {
  0%,
  100% {
    box-shadow: 0 0 6px 3px rgb(234, 81, 81);
  }
  50% {
    box-shadow: 0 0 6px 3px rgba(190, 46, 46, 0.3);
  }
}
</style>
