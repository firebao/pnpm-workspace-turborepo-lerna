<!--最近使用菜单-->
<template>
  <div>
    <menuTitles
        :title="title"
        :actionName="''"
        :actionList="actionList"
        :isActionBtnShow="false"
        @btn-click="handleClick"
    >
    </menuTitles>
    <div  class="intelligent-tools-module">


      <div style="overflow-y: scroll;"  :style="[
        {
          height: styleon ? styleon -100 + 'px' : '',
        },
      ]">
        <div
            style="display: flex;flex-wrap: wrap"

        >
          <div
              style="width: 150px;margin: 10px;height: 63px; border-radius: 5px;background: rgba(165,180,203,0.2)"
              v-for="item in functionList"


          >
            <img :src="item.icon"  style="float: left;margin-top: 10px;margin-left: 10px;width: 42px;height: 38px">
            <div style="font-size: 16px;float: left;margin-left: 10px;line-height: 63px;cursor:pointer;" @click="openUrl(item)">{{ item.name }}</div>

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
// import xzxx from '@/assets/one@2x.png'
// import qwjs from '@/assets/two@2x.png'
// import wjdb from '@/assets/three@2x.png'
export default {
  name: "digitalizationAbility",
  components: { SystemSettingDialog },
  props: ["itmein", "styleon"],
  data() {
    return {
      title: "文档中心",
      // listdf:['协作消息','全文检索','推荐文档','文件对比'],
      functionList: [
        {
          name: '文档协作',
          url: 'http://25.215.132.105/co-web/OnlineCollaborationSystem?type=sharing&filePath=/&sharingType=1&teamShareType=1',
          //icon: xzxx
        },
        {
          name: '全文检索',
          url: 'http://25.215.132.105/co-web/OnlineCollaborationSystem?type=document&filePath=/&sharingType=1&teamShareType=1',
          //icon: qwjs
        },
        {
          name: '文件对比',
          url: 'http://25.215.132.105/co-web/docCompare',
          //icon: wjdb
        }
      ],
      mutableSystemList: [],
      systemSettingDialog: false,
      mutableSystemListChild: [],
      colorlist:['#E6A23C','#F56C6C','$primary-color','#67C23A',
        '#30A8A2','#E6A23C','#F56C6C','$primary-color',
        '#67C23A','#30A8A2','#E6A23C','#F56C6C',
        '$primary-color','#67C23A','#30A8A2',
        '#E6A23C','#F56C6C','$primary-color','#67C23A',
        '#30A8A2','#E6A23C','#F56C6C','$primary-color',
        '#67C23A','#30A8A2','#E6A23C','#F56C6C',
        '$primary-color','#67C23A','#30A8A2',
      ],
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
  },
  mounted() {
    this.searchSystemStatusList();
  },
  methods: {
    handleClick(index) {
      this.isMarkShow = true;
      if (index === 0) {
        // 系统设置
        this.$emit("systemSetting", this.mutableSystemList);
      } else {
        // 添加系统
        this.$emit("addSystemMenuReftoolin", true);
        this.$emit("get-draw-state", true);
      }
    },

    openUrl(data){
      if(localStorage["isTokensWDObj"]){
        sgBrowerserOpenPage(data.url)
      } else {
        this.$message.error("登录系统失败,请检查相关配置!");
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
          "====================================================="
        );
        if (res.status === 200) {
          this.mutableSystemList = res.resultList.map((item) => {
            item.SysID = item.systemId;
            item.isLine = false;
            item.loginURL = item.systemAddress;
            item.successURL = item.afterLoginAddress;
            item.jsCode = item.loginCommand;
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
      background: #01D09F;
      margin: 0 auto;
      cursor: pointer;
      z-index:0;

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
