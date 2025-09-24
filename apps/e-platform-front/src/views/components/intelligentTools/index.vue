<!--最近使用菜单-->
<template>
  <div>
    <menuTitles
        :title="title"
        :isActionBtnShow="true"
        :actionName="'添加工具'"
        @btn-click="handleClick"
        @infoclick="open"
    ></menuTitles>
    <div class="intelligent-tools-module">

      <div
          v-if="resultList.length > 0"
          style="margin-top: 10px;"
          class="intelligent-tools-module-container"
          :style="[
        {
          height: styleon - 80 + 'px',
        },
      ]"
      >
        <div
            class="intelligent-tools-module-item"
            v-for="(item, index) in resultList"
            :key="index"

        >
          <div class="tool-title">
            <div class="tool-name" :title="item.toolName">
              {{ item.toolName }}
            </div>
            <div class="tool-detail">
              <span @click="handleDetails(item)">查看详情</span>
            </div>
          </div>
          <div class="tool-desc">
            {{item.functionIntroduction}}

          </div>
         <div class="tool-bottom">
           <div class="tool-run">
             <div class="icon">
               <!-- <img src=./img/hj.png"" alt="">-->
             </div>
             <span  @click="firing(item)">运行</span>
           </div>
           <div class="tool-icon">
             <img :src="item.toolIcon" alt="">
           </div>
         </div>
<!--          <div class="intelligent-tools-module-item-img">-->
<!--            <img :src="item.toolIcon" />-->
<!--          </div>-->
<!--          <div class="intelligent-tools-module-item-name">-->
<!--            {{ item.toolName }}-->
<!--          </div>-->
        </div>
      </div>
      <div v-else  class="intelligent-tools-module-container">
        <no-data title="暂无数据" size="30%"></no-data>
      </div>
    </div>
    <el-dialog
        :visible.sync="addOrUpdateVisible"
        width="60%"
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
import { searchToolsList, startTool } from "@/api/api.js";
import addSystemMenu from "@/views/components/intelligentTools/addSystemMenu";
import videoPlayerMP4 from "@/views/components/personalPanel/video.vue";
import titleBar from "@/views/components/personalPanel/titleBar.vue";
import {addClientLog} from "@/api";
export default {
  name: "intelligentTools",
  components: {
    addSystemMenu,videoPlayerMP4,titleBar
  },
  props: ["itmein", "styleon"],
  data() {
    return {
      title: "智能工具",
      resultList: [],
      viteDate: {
        id: "",
        userId: this.$store.state.userInfo.userId,
        toolId: "",
        AddSubscriptionTool: {
          authenticationInformation: "mal",
          actionName: "addDescriptionTool",
          dataSource: "mysql-operate",
          data: {},
          where: {},
        },
      },
      addOrUpdateVisible: false,
      detailsData: {},
      datain: "",
    };
  },
  created() {
    this.GetsearchToolsList();
  },
  watch: {
    itmein(newval, oldval) {
      if (newval) {
        this.showDetail();
      }
    },
  },
  methods: {
    handleClose() {
      var video = document.getElementById("videoi");
      video.pause();
    },
    // 查看工具详情
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
    showDetail() {
      this.GetsearchToolsList();
    },
    hexToRgb(hex, rate) {
      let sanitizedHex = hex.replace('#', '');
      let r = parseInt(sanitizedHex.substring(0, 2), 16);
      let g = parseInt(sanitizedHex.substring(2, 4), 16);
      let b = parseInt(sanitizedHex.substring(4, 6), 16);
      let a = rate;
      return `rgb(${r}, ${g}, ${b}, ${a})`;
    },
    // 获取已订阅的工具列表
    GetsearchToolsList() {
      searchToolsList({
        authenticationInformation:
          this.$store.state.userInfo.authenticationInformation,
        actionName: "searchUserYesDescriptionToolList",
        dataSource: "mysql-operate",
        data: {
          userId: JSON.parse(localStorage.getItem("userinfo")).userId, //传入userId
        },
      }).then((res) => {
        if(res.status === 200){
          this.resultList = res.resultList;
        }
      });
    },
    handleClick() {
      this.isMarkShow = true;
      this.$emit("addSystemMenuReftoolin", true);
      this.$emit("get-draw-state", true);
      // this.$refs.addSystemMenuRef.toggleDrawer()
    },
    toAddMenu() {},
    getOpenState(val) {
      this.isMarkShow = val;
      this.$emit("get-draw-state", val);
      // this.combineSystemList()
    },

    open() {
      sgBrowerserOpenPage(
        "http://" + window.location.host + "/intelligentTools"
      );
    },

    // 启动工具
    async firing(item) {
      console.log(item);
      const param = _.cloneDeep(this.viteDate.AddSubscriptionTool);
      param.actionName = "updateStartTime";
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 月份从0开始，需要加1，然后用padStart补足两位
      let day = currentDate.getDate().toString().padStart(2, "0"); // 日期需要用padStart补足两位
      let hours = currentDate.getHours().toString().padStart(2, "0");
      let minutes = currentDate.getMinutes().toString().padStart(2, "0");
      let seconds = currentDate.getSeconds().toString().padStart(2, "0");
      param.data.startTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      param.where.id = item.id;
      await startTool(param).then((res) => {
        if (res.status === 200) {
          this.$message({
            showClose: true,
            message: "启动成功",
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: "启动失败，请联系管理员",
            type: "error",
          });
        }
      });
      sgBrowerserOpenPage(
          "http://" + window.location.hostname + ":24224/tool/" + item.toolId
      );
      addClientLog({
        "businessId": item.toolId,
        "operateBy": this.$store.state.userInfo.userId,
        "systemType": '',
        "businessType":"智能工具",
        "secondBusinessType":item.toolName,
        "thirdBusinessType": "",
        "logContent": "智能工具-"+item.toolName
      }).then(()=>{

      })
      // sgBrowerserDialog(
      //   "40", //起始坐标 x
      //   "60", //起始坐标 y
      //   "1840", //对话框宽
      //   "960", //对话框高
      //   "http://21.76.121.140:24224/tool/" + item.toolId,
      //   "" //返回方法
      // );
    },
  },
};
</script>
<style lang="scss" scoped>
.intelligent-tools-module {
  //width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 22px;

  .intelligent-tools-module-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(174px, 1fr));
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    overflow-y: scroll;
    height: 300px;
    position: relative;

    .intelligent-tools-module-item {
      //width: 174px;
      height: 120px;
      border-radius: 8px;
      z-index:0;
      border:1px solid $primary-color;
      background: linear-gradient(to top left,#e6f7e9 0%,transparent 30%, #fff 60%);
      //background:url("./img/zdbc.png") no-repeat;
      //background-size: 100% 100%;
      //margin: 0 auto;
      //cursor: pointer;
      padding: 12px 5px;
      box-sizing: border-box;
      position: relative;

      .tool-title{
        display: flex;
        justify-content: space-between;
        justify-items: center;
        .tool-name{
          font-family: PingFangSCZH;
          font-weight: 500;
          font-size: 14px;
          color: #333333;
          line-height: 20px;
          letter-spacing: 1px;
          text-align: left;
          font-style: normal;
          width: 65%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .tool-detail{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 12px;
          color: $primary-color;
          line-height: 20px;
          letter-spacing: 1px;
          text-align: center;
          font-style: normal;
          span{
            cursor: pointer;
            text-decoration: underline;
          }
        }

      }

      .tool-desc{
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #999999;
        line-height: 17px;
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }
      .tool-bottom{
        display: flex;
        justify-content: space-between;
        justify-items: center;
      }
      .tool-run{
        align-items: center;
        vertical-align: middle;
        display: flex;
        position: absolute;
        left: 10px;
        bottom: 12px;
        .icon{
          width: 25px;
          height: 25px;
          text-align: center;
          background:$primary-color;
          //border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        img{
          width: 16px;
          height: 16px;
          align-items: center;
          display: inline-block;
          vertical-align: middle;
        }
        span{
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 12px;
          color: #4EC754;
          line-height: 17px;
          align-items: center;
          display: inline-block;
          vertical-align: middle;
          margin-left: 5px;
          cursor: pointer;
          color:$primary-color;
          text-decoration: underline;

        }
      }

      .tool-icon{
        position: absolute;
        right: 10px;
        bottom: 0px;
        img{
          width: 48px;
          height: 40px;
          display: inline-block;
          margin-top: 6px;
        }
      }



      .intelligent-tools-module-item-img {
        margin-left: 23px;
        width: 55px;
        height: 55px;
        // background: #1DA1F2;
        border-radius: 14px;
        // background: url("@/assets/images/home/bird1.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        /* 垂直居中 */
        justify-content: center;

        /* 水平居中，如果需要的话 */
        img {
          width: 55px;
          height: 55px;
          display: inline-block;
          align-items: center;
          vertical-align: middle;
        }
      }

      .intelligent-tools-module-item-name {
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
  //
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
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: $primary-color;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  cursor: pointer;
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
:deep(.el-message) {
  height: 10px !important;
}
:deep(.el-dialog){
  margin-top: 8vh !important;
}
</style>
