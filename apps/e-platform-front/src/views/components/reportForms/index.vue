<!--公告动态-->
<template>
    <div>
      <menuTitles :title="title" :isActionBtnShow="true" :actionName="'添加报表'" @btn-click="showDrawer" @infoclick="openPersonalPanel"
      ></menuTitles>
      <div class="report-forms-module">

        <!--    style="margin: 18px 0;"-->
        <div class="report-forms-module-container"  :style="[
            {
              height:styleon-80 +'px',
            },
          ]">
          <ul v-if="reportFormsData.length > 0">
            <li v-for="(item, index) in reportFormsData" :key="index" class="report-forms-item">
              <div class="report-forms-item-content">
                <div class="report-forms-item-content-icon"></div>
                <!-- <div class="report-forms-item-content-icon"
                     :style="`background-image: url(${require('@/assets/images/home/' + item.reportType + '.png')})`"></div> -->

                <span class="report-forms-item-content-name" :title="item.reportName">
              {{ item.reportName }}
            </span>
              </div>
              <div @click="firing(item)" class="report-forms-item-action">
                <span>生成报告</span>
                <!-- <img src="@/assets/images/home/download.png"> -->
              </div>
            </li>
          </ul>
          <no-data v-else title="暂无数据" size="30%"></no-data>
        </div>
        <!--    <div class="bottom-card-click" @click="openPersonalPanel">-->
        <!--      前往个人面板<i class="el-icon-arrow-right"></i>-->
        <!--    </div>-->
        <!--   <addReportDrawer style="height:3px;" :level="level" @searchData="searchData" @searchList="getReportList" :specialityList="specialityList"
              @get-drawer-state="getDrawerState" ref="addOrUpdateRef"></addReportDrawer> -->

      </div>

    </div>
</template>

<script>
import topBar from "@/views/components/personalPanel/topBar.vue";
import addReportDrawer from "@/views/components/personalPanel/addReportDrawer.vue";
import { eventBus } from '@/main.js';
import { searchList } from "@/api/report";
import {addClientLog} from "@/api";
export default {
  name: 'messageDynamic',
  components: {  topBar, addReportDrawer },
  comments: { topBar },
  props:['itmein','styleon'],
  data() {
    return {
      addOrUpdateVisible: false,
      title: '生成报告',
      level: [],
      userId: JSON.parse(localStorage.getItem('userinfo')).userId,
      specialityList: [],
      btnColor: {
        pdf: "#106AFC",
        word: "#009994",
        excel: "#FC9610"
      },
      reportFormsData: [

      ]
    }
  },
  computed: {
    defineScroll() {
      return {
        step: 0.15, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
        isPage:true,
      };
    },
  },
  watch:{
  	   itmein(newval,oldval){

  		   if(newval){
			 
  			    this.getReportList();
  		   }
  	   }
  },
  mounted() {
    this.getReportList();
  },
  methods: {
    firing(item) {
      console.log(item)
      sgBrowerserOpenPage(
          `http://${location.hostname}:24224/report/` + item.reportId
      )
      // this.isPage
      //     ? sgBrowerserOpenPage(
      //         "http://21.76.121.140:24224/report/" + item.reportId
      //     )
      //     : sgBrowerserDialog(
      //         "40", //起始坐标 x
      //         "60", //起始坐标 y
      //         "1840", //对话框宽
      //         "960", //对话框高
      //         "http://21.76.121.140:24224/report/" + item.reportId,
      //         "" //返回方法
      //     );
      addClientLog({
        "businessId": item.reportId,
        "operateBy": this.$store.state.userInfo.userId,
        "systemType": item.systemId,
        "businessType":"生成报告",
        "secondBusinessType":item.reportName,
        "thirdBusinessType": "",
        "logContent": "生成报告-"+item.reportName
      }).then(()=>{

      })
    },
    openPersonalPanel(){
      sgBrowerserOpenPage("http://" +window.location.host+"/personalPanel");
    },
    getReportList() {
      searchList(this.userId, 1).then(res => {

        if (res.status == 200) {
          this.reportFormsData = res.resultList;
        }
      })
    },
    searchData(value) {
      this.level = value.level
      this.specialityList = value.specialityList
      this.getReportList();
    },
    getDrawerState(val) {
      this.addOrUpdateVisible = val
      this.$emit('get-draw-state', val)
    },
    showDrawer() {
      this.$emit('addOrUpdateRefreporting')
      // this.addOrUpdateVisible = true
      // this.$refs.addOrUpdateRef.toggleDrawer()
    },
  }
}
</script>
<style lang="scss" scoped>
// @use "@/assets/fonts/font.scss";
.report-forms-module {
  //width: 100%;
  height: 100%;
  position: relative;
  padding: 10px 22px;
  box-sizing: border-box;

  .report-forms-module-container {
    width: 100%;
    overflow-y: auto;
    height: 288px;


    .scroll_box {
      width: 100%;
      height: 100%;
    }

    ul {
      padding: 0;
      margin: 0;
    }

    .report-forms-item {
      width: 100%;
      height: 44px;
      display: flex;
      justify-content: space-between;
      justify-items: center;
      border-bottom: 1px dashed #eeeeee;
      align-items: center;

      .report-forms-item-content {
        width: 70%;
        display: flex;
        align-items: center;

        .report-forms-item-content-icon {
          width: 14px;
          height: 14.13px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .report-forms-item-content-name {
          width: 90%;
          margin-left: 4px;
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 14px;
          color: #666666;
          line-height: 20px;
          letter-spacing: 1px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

      }

      .report-forms-item-action {
        width: 71px;
        height: 24px;
        background: $primary-color;
        display: flex;
        justify-content: center;
        /* 水平居中 */
        align-items: center;
        /* 垂直居中 */
        text-align: center;
        /* 文字居中 */
        border-radius: 4px;
        cursor: pointer;
        
        span {
          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 10px;
          color: #FFFFFF;
          line-height: 18px;
          text-align: right;
          font-style: normal;
          display: inline-block;
        }

        img {
          width: 9px;
          height: 9px;
          display: inline-block;
          margin-left: 4px;
        }
      }
    }
  }

}

.bottom-card-click {
  position: absolute;
  right: 16px;
  bottom: -25px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: $primary-color;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  cursor: pointer;
}
</style>
