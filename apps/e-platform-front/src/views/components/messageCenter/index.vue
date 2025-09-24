<!--公告动态-->
<template>
  <div class="message-dynamic-module">
    <menuTitles
        :title="title"
        :isActionBtnShow="true"
        :actionName="'添加消息订阅'"
        @btn-click="handleClick"
        @infoclick="openPersonalPanel"
    ></menuTitles>
    <div
        class="message-dynamic-module-container"
        :style="[
        {
          height: styleon - 80 + 'px',
        },
      ]"
    >
      <div v-if="tabList.length > 0">
        <el-tabs v-model="currentName">
          <el-tab-pane
              v-for="(item, index) in tabList"
              :key="index"
              :name="item.name"
          >
            <template #label>
              <el-badge v-if="item.items.length > 0 && item.name !== '协同'" :value="item.items.length">
                <span>{{ item.label }}</span>
              </el-badge>
              <el-badge v-if="item.items.length > 0 && item.name === '协同'" :value="item.items[0].otherInfo">
                <span>{{ item.label }}</span>
              </el-badge>
              <span v-if="item.items.length === 0">{{ item.label }}</span>
            </template>
            <div
              class="message-main"
              style="position: relative"
              :style="[
                { height: styleon - 130 + 'px', },
              ]">
              <div v-if="item.name !== '协同'">
                <ul
                  v-if="item.items.length > 0"
                  :style="[ { height: styleon - 130 + 'px', }, ]"
                >
                  <li
                    v-for="(e, i) in item.items"
                    :key="i"
                    class="message-dynamic-item"
                    @click="handleCheckMsgInfo(e)"
                  >
                    <div class="message-dynamic-item-content">
                      <div
                        v-if="e.isRead === '0'"
                        class="message-dynamic-item-content-icon"
                      >
                      </div>
                      <!--              <span class="message-dynamic-item-content-name" :title="item.topic">-->
                      <!--                {{ item.topic }}-->
                      <!--              </span>-->
                      <span
                        class="message-dynamic-item-content-desc"
                        :title="e.subject"
                      >
                    <i>{{ e.datetime }}</i>{{ e.subject }}
                  </span>
                    </div>
                    <!--                <p class="message-dynamic-item-date">-->
                    <!--                  {{ e.datetime }}-->
                    <!--                </p>-->
                    <!--                &lt;!&ndash;            <div class="message-dynamic-item-date">&ndash;&gt;-->
                    <!--              {{ item.occurrenceTime }}-->
                    <!--            </div>-->
                  </li>
                </ul>
                <no-data v-else title="暂无数据" size="25%"></no-data>
              </div>
              <div v-else>
                <ul
                  v-if="item.items.length > 0"
                  :style="[ { height: styleon - 140 + 'px', }, ]"
                >
                  <li
                    v-for="(e, i) in item.items"
                    :key="i"
                    class="message-dynamic-item"
                    @click="handleCheckMsgInfo(e)"
                  >
                    <div class="message-dynamic-item-content">
                      <div
                        v-if="e.isRead === '0'"
                        class="message-dynamic-item-content-icon"
                      ></div>
                      <span
                        class="message-dynamic-item-content-desc"
                        :title="e.subject"
                      >
                        <i>{{ e.datetime }}</i>{{ e.subject }}
                      </span>
                    </div>
                    <!--                <p class="message-dynamic-item-date">-->
                    <!--                  {{ e.datetime }}-->
                    <!--                </p>-->
                    <!--                &lt;!&ndash;            <div class="message-dynamic-item-date">&ndash;&gt;-->
                    <!--              {{ item.occurrenceTime }}-->
                    <!--            </div>-->
                  </li>
                  <li v-if="item.items.length> 0 && item.items[0].otherInfo > 7" style="text-align: center">
                    <a href="http://home1bj.ccoa.sgcc.com.cn:20001/coa-webapp//index.action" target="_blank" style="text-align: center;font-size: 14px;">点击查看更多消息</a>
                  </li>
                </ul>
                <no-data v-else title="暂无数据" size="25%"></no-data>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!--        <vue-seamless-scroll
            class="scroll_box"
            :data="messageDynamicData"
            :class-option="defineScroll">
          <ul>
            <li v-for="(item, index) in messageDynamicData" :key="index" class="message-dynamic-item"
                @click="handleCheckMsgInfo(item)">
              <div class="message-dynamic-item-content">
                <div v-if="item.isRead === '0'" class="message-dynamic-item-content-icon"></div>
                &lt;!&ndash;              <span class="message-dynamic-item-content-name" :title="item.topic">&ndash;&gt;
                &lt;!&ndash;                {{ item.topic }}&ndash;&gt;
                &lt;!&ndash;              </span>&ndash;&gt;
                <span class="message-dynamic-item-content-desc" :title="item.subject">
                {{ item.subject }}
              </span>
                <span class="message-dynamic-item-date">
                {{ item.datetime }}
              </span>
              </div>
              &lt;!&ndash;            <div class="message-dynamic-item-date">&ndash;&gt;
              &lt;!&ndash;              {{ item.occurrenceTime }}&ndash;&gt;
              &lt;!&ndash;            </div>&ndash;&gt;
            </li>
          </ul>
        </vue-seamless-scroll>-->
      </div>
      <no-data v-else title="暂无数据" size="30%"></no-data>
    </div>
    <!--    <div class="bottom-card-click" @click="openPersonalPanel">-->
    <!--      前往消息中心<i class="el-icon-arrow-right"></i>-->
    <!--    </div>-->
    <!-- <add-message-drawer style="height:3px;" ref="addMessageDrawer" @get-drawer-state="getDrawerState"></add-message-drawer> -->
    <el-dialog
      :visible.sync="showDialog"
      width="40%"
      height="90rem"
      @close="handleClose"
      append-to-body
      class="platform-dialog-index"
    >
      <el-row :gutter="20">
        <el-col>
          <div class="platform-dialog-text">
            <div class="menu-message-top">
              <div class="icon-line">
                <!-- <img
                    src="@/assets/images/menuListIcons/lineIcon.png"
                    alt="lineIcon"
                /> -->
              </div>
              <div class="menu-name-current">消息详情</div>
            </div>
            <el-form>
              <el-form-item prop="name">
                <template slot="label">
                  <div class="platform-menu-card-label">
                    <div>
                      <!-- <img
                          src="@/assets/images/messageCenter/speciality.png"
                          alt="专业图标"
                      /> -->
                    </div>
                    <span style="white-space: nowrap">消息名称：</span>
                  </div>
                </template>
                <span>{{ sourceInfoData.topic }}</span>
              </el-form-item>
              <el-form-item prop="name">
                <template slot="label">
                  <div class="platform-menu-card-label">
                    <div>
                      <!-- <img
                          src="@/assets/images/messageCenter/speciality.png"
                          alt="专业图标"
                      /> -->
                    </div>
                    <span style="white-space: nowrap">所属系统：</span>
                  </div>
                </template>
                <span>{{
                    sourceInfoData.SysName !== "" ? sourceInfoData.SysName : "--"
                  }}</span>
              </el-form-item>
              <el-form-item prop="name">
                <template slot="label">
                  <div class="platform-menu-card-label">
                    <div>
                      <!-- <img
                          src="@/assets/images/messageCenter/speciality.png"
                          alt="专业图标"
                      /> -->
                    </div>
                    <span style="white-space: nowrap">消息类型：</span>
                  </div>
                </template>
                <span>{{
                    sourceInfoData.messageTypeName !== ""
                        ? sourceInfoData.messageTypeName
                        : "--"
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
              <div class="platform-dialog-title">消息内容</div>
              <p class="platform-dialog-value-content">
                {{ sourceInfoData.content }}
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import addMessageDrawer from "@/views/components/messageCenter/components/addMessageDrawer";
import localHostAxjos from "@/utils/localhostAxjos";
import moment from "moment";
import {searchMessageByUser} from "@/api/messageCenter";

export default {
  name: "messageDynamic",
  components: {vueSeamlessScroll, addMessageDrawer},
  props: ["styleon", "systemMessages", "activeName", "tabList"],
  data() {
    return {
      title: "消息中心",
      showDialog: false,
      sourceInfoData: {},
      messageDynamicData: [],
      isMarkShow: false,
      messageGropData: [],
      // tabList: [],
      // systemMessages: [],
      currentName: '',
      searchValue: "",
    };
  },
  computed: {
    defineScroll() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: this.messageDynamicData.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  watch: {
    activeName: {
      handler(val) {
        this.currentName = val;
      },
      deep: true,
      immediate: true
    },
  },
  created() {
    this.$nextTick(() => {
      this.setRemPc();
      window.addEventListener("resize", this.setRemPc); //浏览器窗口大小改变时调用rem换算方法
    });
  },
  methods: {
    openPersonalPanel() {
      sgBrowerserOpenPage("http://" + window.location.host + "/messageCenter");
    },

    handleClick() {
      this.isMarkShow = true;
      this.$emit("addMessageDrawerMessage");
    },

    // 查看消息详情
    handleCheckMsgInfo(data) {
      this.sourceInfoData = data;
      setTimeout(() => {
        this.$emit("check-message", data);
      }, 300);
    },

    getDrawerState(val) {
      this.isMarkShow = val;
      this.$emit("get-draw-state", val);
      if (this.isMarkShow) {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "15px"; // 根据实际情况调整滚动条宽度
      } else {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    },
    setRemPc() {
      /**
       * @file: index.vue
       * @method: setRemPc
       * @param:
       * @return:
       * @description:计算rem大小
       * @date:
       */
      var whdef = 40 / 1920; // 表示1920的设计图,使用100PX的默认值
      var bodyWidth = document.body.clientWidth; // 当前窗口的宽度
      var rem = bodyWidth * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
      document.getElementsByTagName("html")[0].style.fontSize = rem + "px";
    },

    // 弹出框关闭后触发
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit("changeShow", "false");
    },
  },
  destroyed() {
    //document.getElementsByTagName("html")[0].style.fontSize = "unset";
  },
};
</script>
<style lang="scss" scoped>
.message-dynamic-module {
  //width: 100%;
  height: 98%;
  position: relative;

  .message-dynamic-module-container {
    padding: 0px 19px;
    box-sizing: border-box;
    width: 100%;
    height: 540px;
    overflow: hidden;
    position: relative;

    .message-main {
      position: relative;
    }

    .scroll_box {
      width: 100%;
      height: 100%;
    }

    ul {
      padding: 0;
      margin: 0;
      //height: 350px;
      overflow-y: auto;
    }

    .message-dynamic-item {
      width: 100%;
      height: 44px;
      display: flex;
      justify-content: space-between;
      justify-items: center;
      border-bottom: 1px dashed #eeeeee;
      cursor: pointer;

      &:hover {
        color: #2d97e6;
      }

      .message-dynamic-item-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        .message-dynamic-item-content-icon {
          width: 28px;
          height: 13px;
          //background: url("@/assets/images/newMessage.png") no-repeat;
          background-size: 100% 100%;
          line-height: 20px;
        }

        //.message-dynamic-item-content-name {
        //  margin-left: 10px;
        //  font-family: PingFangSC, PingFang SC;
        //  font-weight: 400;
        //  font-size: 14px;
        //  color: #21CEC8;
        //  line-height: 20px;
        //  text-align: left;
        //  font-style: normal;
        //  width: 25%;
        //  overflow: hidden;
        //  text-overflow: ellipsis;
        //  white-space: nowrap;
        //}

        .message-dynamic-item-content-desc {
          width: calc(100% - 32px);
          margin-left: 3px;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 14px;
          color: #333333;
          line-height: 20px;
          text-align: left;
          font-style: normal;
          //width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;

          i {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 14px;
            color: #666666;
            font-style: normal;
            margin-right: 5px;
          }
        }
      }

      p {
        padding: 0;
        margin: 0;
      }

      .message-dynamic-item-date {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #666666;
        font-style: normal;
        line-height: 44px;
        width: 38%;
        white-space: nowrap;
        text-align: right;
        display: inline-block;
        float: right;
      }
    }
  }
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

html {
  font-size: 40px;
}

/* 弹窗css样式 */
.platform-dialog-title {
  width: 100%;
  height: 0.55rem;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 0.45rem;
  color: $primary-color;
  line-height: 0.55rem;
  text-align: left;
  font-style: normal;
  margin-bottom: 0.375rem;
}

.plaform-dialog-content {
  width: 27.325rem;
  height: 4.35rem;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 0.35rem;
  color: #666666;
  line-height: 0.5rem;
  text-align: left;
  font-style: normal;
  text-indent: 2em;
}

.menu-message-top {
  display: flex;
  justify-content: space-between;

  .icon-line {
    width: 0.075rem;
    height: 0.525rem;
    margin-right: 0.25rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .menu-name-current {
    display: inline-block;
    width: 100%;
    height: 0.7rem;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 0.5rem;
    color: #000000;
    line-height: 0.55rem;
    letter-spacing: 0.025rem;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

.platform-menu-card-label {
  display: flex;
  align-items: center;

  height: 100%;

  div {
    img {
      margin-right: 0.2rem;
    }
  }

  span {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 0.4rem;
    color: #000000;
    line-height: 1rem;
    letter-spacing: 0.075rem;
    text-align: left;
    font-style: normal;
  }
}

.platform-content-card {
  display: flex;
  flex-wrap: wrap;
  /* 垂直居中 */
  span {
    display: flex;
    align-items: center;
  }

  img {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
}

.platform-dialog-img {
  position: relative;
  border-radius: 0.25rem;
  height: 100%;
  border: 0px solid #ecf0f2;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
  }
}

.platform-dialog-marin {
  margin-top: 1rem;
}

.platform-dialog-value-content {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  line-height: 0.5rem;
  text-align: left;
  font-style: normal;
  text-indent: 2em; /* 设置首行缩进的距离 */
}

.platform-dialog-min-height {
  height: 7.75rem;

  img {
    width: 100%;
    height: 100%;
  }
}

.platform-dialog-index {
  z-index: 9999999 !important;
}

:deep(.el-tabs__header) {
  line-height: 40px;
}

//:deep(.el-badge__content.is-fixed) {
//  top: 10px;
//  right: 0;
//}

</style>
