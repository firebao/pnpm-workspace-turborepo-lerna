<!--最近使用菜单-->
<template>
  <div>
    <menuTitles
        :title="title"
        :isActionBtnShow="true"
        :actionName="'添加菜单'"
        @btn-click="handleClick"
        @infoclick="toAddMenu"
    ></menuTitles>
    <div class="recently-used-menus-module"      style="overflow-y: scroll; margin-top: 10px"
         :style="[
        {
          height: styleon - 80 + 'px',
        },
      ]">

      <div
          v-if="menuList.length > 0"

      >
        <div class="menu-container">
          <div
              v-for="(element, index) in menuList"
              :key="index"
              class="menu-container-item"
              v-show="(element.menuList.length ? element.menuList.length : 0) > 0"
          >
            <div class="menu-title">
              <div class="icon">
                <img alt="" :src="element.systemIcon" />
              </div>
              <span>{{ element.systemName }}</span>
            </div>
            <div class="menu-list">
              <div v-for="sub in element.menuList" class="menu-item" :key="sub.menuId">
              <span
                  class="menu-dot"
              ></span>
                <span class="menu-item-text" @click="handleUsedMenu(sub)">{{
                    sub.menuName
                  }}</span>
              </div>
            </div>
          </div>
        </div>
<!--        <div
            v-for="(element, index) in menuList"
            :key="index"
            class="menu-item-container"
            v-show="(element.menuList.length ? element.menuList.length : 0) > 0"
        >

          <div class="menu-item-content">
            <div class="left-container">
              <div
                  :style="{ background: element.systemIconColor }"
                  class="system-icon"
              >
                <img alt="" :src="element.systemIcon" />
              </div>
              <p :title="element.systemName">{{ element.systemName }}</p>
            </div>
            <div class="right-container" ref="rightItem">
              <div v-for="sub in element.menuList" class="menu-item" :key="sub.menuId">
              <span
                  :style="{ background: element.systemIconColor }"
                  class="menu-dot"
              ></span>
                <span class="menu-item-text" @click="handleUsedMenu(sub)">{{
                    sub.menuName
                  }}</span>
              </div>
            </div>
          </div>
        </div>-->
      </div>
      <no-data v-else title="暂无数据" size="30%"></no-data>
    </div>
  </div>
</template>

<script>
import { hexToRgbMixin } from "@/utils/tools";
import addSystemMenu from "@/views/components/myMenu/addSystemMenu";
// import { searchToolsList } from "./api.js";
import {addClientLog} from "@/api";

export default {
  name: "recentlyUsedMenus",
  mixins: [hexToRgbMixin],
  components: {
    addSystemMenu,
  },
  props: ["itmein", "styleon", "resultList"],
  data() {
    return {
      title: "一键进入菜单",
      // resultList: [],
      menuList: [],
      isMarkShow: false,
    };
  },
  created() {
    // this.getlist();
  },
  mounted() {
    // setTimeout(() => {
    //   this.menuList = this.resultList;
    //   console.log('测试', this.menuList)
    // }, 500);
  },
  watch: {
    itmein(newval, oldval) {
      if (newval) {
        this.menuList = this.resultList;
      }
    },

    resultList(newval,oldval){
      if(newval){
        this.menuList = this.resultList;
      }
    },
  },
  methods: {
    // 跳转我的菜单
    toAddMenu() {
      sgBrowerserOpenPage("http://" + window.location.host + "/myMenu");
    },
    // 抽屉开启状态
    handleClick() {
      this.isMarkShow = true;
      this.$emit("get-draw-state", true);
      this.$emit("addSystemMenuRefmenu", true);
      // this.$refs.addSystemMenuRef.toggleDrawer();
    },

    getOpenState(val) {
      this.isMarkShow = val;
      this.$emit("get-draw-state", val);
      // this.getlist();
      this.$forceUpdate();
      // this.combineSystemList()
    },

    //  点击菜单跳转页面
    //   handleUsedMenu(data) {
    //     // debugger
    //     console.log(data,'caidan');
    //     data.SysID = data.systemId;
    //     this.loadingTwxt(".main-index-new");
    //     let list = JSON.stringify(data);
    //     let locationUrl = JSON.stringify(location.href);
    //     let isPage = JSON.stringify(this.isPage);
    //     sgBrowserExcuteJsCode(
    //         location.host + "/#/monitorQueue",
    //         `window.mac.getLogint(${isPage},${locationUrl},${list},false,'0')`
    //     );
    //   },

    async handleUsedMenu(data) {
      console.log(data, "caidan");
      this.$emit("used-menu", data);
      addClientLog({
        "businessId": data.menuId,
        "operateBy": this.$store.state.userInfo.userId,
        "systemType": data.systemId,
        "businessType":"一键进入菜单",
        "secondBusinessType":data.menuName,
        "thirdBusinessType": "",
        "logContent": "一键进入菜单-"+data.menuName
      }).then(()=>{

      })
    },
  },
};
</script>
<style lang="scss" scoped>
// @use "@/assets/fonts/font.scss";
.recently-used-menus-module {
  position: relative;
  //width: 100%;
  height: 100%;
  padding: 0 16px;
  box-sizing: border-box;

  .recently-used-menus-module-container {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(184px, 1fr));
    /*    grid-template-rows: repeat(5, 1fr);*/
    grid-row-gap: 16px;
    grid-column-gap: 12px;

    //height: 205px;

    .recently-used-menus-item {
      display: flex;
      vertical-align: middle;
      align-items: center;
      //width: 24%;

      /*
				&:nth-child(n + 5) {
					margin-top: 20px;
				}
        */

      .system-name {
        display: inline-block;
        min-width: 60px;
        max-width: 70px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 12px !important;
        line-height: 16px;
        letter-spacing: 1px;
        text-align: center;
        font-style: normal;
        text-transform: none;
        //padding: 3px 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        //white-space: nowrap;
      }

      .menu-name {
        display: inline-block;
        margin-left: 8px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #4f5470;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        //white-space: nowrap;
        width: 113px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
      }
    }

    .recently-used-menus-item-empty {
      height: 0;
    }
  }

  //::-webkit-scrollbar {
  //  width: 2px;
  //  /* 滚动条宽度 */
  //  height: 0;
  //  background-color: #f9f9f9;
  //  /* 滚动条背景色 */
  //}
  //
  ///* 自定义滚动条滑块样式 */
  //::-webkit-scrollbar-thumb {
  //  background-color: #d7f5f4;
  //  /* 滑块背景色 */
  //  border-radius: 0;
  //  /* 滑块圆角 */
  //}
}

.bottom-card-click {
  position: absolute;
  right: 16px;
  bottom: -28px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: $primary-color;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  cursor: pointer;
}

.menu-item-container {
  position: relative;
  width: 99.5%;
  min-height: 98px;
  max-height: 98px;

  background: linear-gradient(
    131deg,
    #ffffff 0%,
    rgba(238, 245, 246, 0.7) 100%
  );
  box-shadow: 0px 0px 15px 0px rgba(231, 236, 239, 0.1);
  border-radius: 6px;
  border: 1px solid #e8ecef;

  &:not(:first-child) {
    margin-top: 10px;
  }

  .menu-item-content {
    min-height: 60px;
    display: flex;
    //column-gap: 20px;
    align-items: center;
    justify-items: center;
    margin: 0 auto;
    padding: 0 6px;

    .left-container {
      border-right: 1px dashed #cccccc;
      display: flex;
      padding-right: 10px;
      box-sizing: border-box;
      align-items: center;
      justify-items: center;
      margin: 0 auto;
      width: 120px;
    }

    .system-icon {
      width: 34px;
      height: 34px;
      background-color: #106afc;
      text-align: center;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      //margin: 19px;
    }

    img {
      width: 21px;
      height: 21px;
      //margin-top: 6px;
      //margin-left: 19px;
    }

    p {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 12px;
      //color: #FFFFFF;
      line-height: 18px;
      text-align: center;
      font-style: normal;
      //white-space: nowrap;
      margin-left: 8px;
      width: 60px;
    }

    .right-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      row-gap: 3px;
      width: calc(100% - 120px);
      overflow-y: auto;
      height: 98px;
    }

    .menu-item {
      margin: 4px 0 4px 0;
      position: relative;
      padding-left: 20px;
      width: auto;
      display: flex;
      align-items: center;
      column-gap: 2px;
      cursor: pointer;

      &:hover {
        .menu-item-text {
          color: #21cec8;
          //font-size: 16px;
          //border-bottom: 2px solid #21CEC8;
        }

        .menu-dot {
          //width: 10px;
          //height: 10px;
        }
      }

      .menu-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: $primary-color;
      }

      .menu-item-text {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        margin-left: 13px;
      }
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
.menu-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.menu-container-item{
  flex: 1 0 auto;
  width: 292px;
  margin: 3px;
  border: 1px solid rgba(220,220,220,0.5);
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(238,238,238,0.5);
  //min-height: 50px;
  padding: 9px 7px;
  //box-sizing: border-box;
  //overflow-y: auto;
  .menu-title{
    display: flex;
    vertical-align: middle;
    align-items: center;
    line-height: 1;
    .icon{
      width: 30px;
      height: 30px;
      background-color: $primary-color;
      text-align: center;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img{
      width: 20px;
      height: 20px;
    }
    span{
      margin-left: 6px;
      font-family: PingFangSCZH;
      font-weight: 500;
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      display: inline-block;
      vertical-align: middle;
      align-items: center;
    }
  }
  .menu-list{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 3px;
    overflow-y: auto;
    max-height: 90px;
    .menu-item {
      margin: 4px 0 4px 0;
      position: relative;
      padding-left: 8px;
      width: auto;
      display: flex;
      align-items: center;
      column-gap: 2px;
      cursor: pointer;

      &:hover {
        .menu-item-text {
          color: #21cec8;
          //font-size: 16px;
          //border-bottom: 2px solid #21CEC8;
        }

        .menu-dot {
          //width: 10px;
          //height: 10px;
        }
      }

      .menu-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: $primary-color;
      }

      .menu-item-text {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        margin-left: 5px;
      }
    }
  }
}
</style>
