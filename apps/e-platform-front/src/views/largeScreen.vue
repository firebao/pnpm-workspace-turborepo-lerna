<template>
  <div class="main-index-new"  :class="themeClass" id="residf" v-on:contextmenu.prevent="onRightClick($event)">
    <div class="toipdfgdgdfg"  :class="themeClasstop">
      <el-row>
        <el-col :span="6">
          <img
              @click="backin"
              style="margin-top: 10px; margin-left: 20px; cursor: pointer"
              src="./largeScreen/img/back.png"
              alt=""
              srcset=""
          />
        </el-col>
        <el-col :span="12">
          <div
              style="
              font-size: 25px;
              height: 80px;
              line-height: 60px;
              font-weight: 600;
              text-align: center;
              color: rgba(179, 227, 225, 1);
            "
              @click="residf"
          >
            一体化平台
          </div>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="4">
<!--              <div style="font-size: 20px; color: #ffffff; line-height: 60px">-->
<!--                {{ tiemininsdf }}-->
<!--              </div>-->
            </el-col>
            <el-col :span="20">
<!--              <img-->
<!--                  @click="onRightClick"-->
<!--                  style="margin-top: 10px"-->
<!--                  src="./largeScreen/img/setting.png"-->
<!--                  alt=""-->
<!--                  srcset=""-->
<!--              />-->
              <div style="font-size: 20px; text-align: right; color: #ffffff; line-height: 60px">
                {{ tiemininsdf }}
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--    v-on:contextmenu.prevent="onRightClick($event)"-->
    <div id="content">
      <grid-layout
          @layout-created="layoutCreatedEvent"
          @layout-before-mount="layoutBeforeMountEvent"
          :is-draggable="isdraggable"
          @layout-mounted="layoutMountedEvent"
          @layout-ready="layoutReadyEvent"
          @layout-updated="layoutUpdatedEvent"
          @breakpoint-changed="breakpointChangedEvent"
          ref="gridlayout"
          :margin="[9, 9]"
          :layout.sync="layouts"
          :col-num="colNum"
          :row-height="30"
      >
        <!--	@resized="resizedEvent"   @resize="resizeEvent"  	@container-resized="containerResizedEvent"   @move="moveEvent" @moved="movedEvent"  :is-resizable="false" -->
        <grid-item
            v-for="item in layouts"
            @resized="resizedEvent"
            @resize="resizeEvent"
            @container-resized="containerResizedEvent"
            @move="moveEvent"
            @moved="movedEvent"
            :is-resizable="isresizable"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i"
            v-if="item.show"
        >
          <!--          :class="{ 'shduber':isresizable }"-->
          <div
              v-if="isresizable"
              style="
              position: absolute;
              height: 14px;
              width: 14px;
              right: 1px;
              bottom: 1px;
              border-right: 1px solid #ffffff;
              border-bottom: 1px solid #ffffff;
            "
          ></div>
          <div>


            <div >
<!--              v-if="item.i == '5' && item.show"-->
              <div class="messagebauf" :class="themeClasscard" :style="{ height: item.height + 'px' }">
                <div class="messagebaufsidfherer" :class="themeClasscardtop" >   <span>{{item.name}}</span> </div>
<!--                <span  style="cursor: pointer; font-size: 12px;top: -10px; position: fixed;right:10px">添加</span>-->
<!--                <span @click="addmodfg">添加</span>-->
                <!--                					<title-bar text="消息中心" styleonmessage></title-bar>-->
<!--                <iframe :style="{height: item.height-100+'px'}" src="http://localhost:8080/tool/dd.html"></iframe>-->
<!--              <component v-bind:is="commondgf"></component>-->
                <div v-if="item.vueCode" v-bind:is="sdfnuewhreu(item.vueCode)"></div>
              </div>
            </div>
          </div>
        </grid-item>
      </grid-layout>
    </div>

    <div v-if="menuShowin" class="anausbf" :style="{ ...rightMenuin }">
      <el-card class="box-card">
        <div class="nsfsfsdgg" @click="coloe">X</div>
        <!--        <menu-title  :title="title" style="margin: 18px 0"></menu-title>-->
        <div
            style="
            font-size: 20px;
            height: 40px;
            line-height: 40px;
            color: rgba(179, 227, 225, 1);
          "
        >
          组件模块添加
        </div>
        <div style="height: 100px;">
                  <div
                      class="tabing9" @click="addmodfg"
                  >
                    <img

                        style="height: 20px; width: 20px; margin: 4px 0 0 15px"
                        src="./largeScreen/img/xx.png"
                    />
                    <div style="margin-left: 20px">订阅组件</div>
                  </div>
<!--          <div @click="darkinfg">主题切换</div>-->
          <div >
            <el-row style="margin-top: 24px">
              <el-col :span="6">  <span style="color: #FFFFFF;font-size: 12px"> 主题切换:</span></el-col>
              <el-col :span="18"><span style="color: #FFFFFF"> <el-switch
                  v-model="isdarkTheme"
                  style="margin-top: 3px; color: #FFFFFF !important;"
                  active-color="$primary-color"
                  inactive-color="$primary-color"
                  @change="isdarkThemechange"
              ></el-switch></span></el-col>
            </el-row>


          </div>
        </div>
        <!--				<div class="tabing9" v-for="itme in layoutshow" @click="adding(itme)" :class={cvhudter:itme.show}>-->
<!--        <div-->
<!--            class="tabing9"-->
<!--            v-for="(itme, index) in layout"-->
<!--            @click="adding(itme)"-->
<!--            :class="{ cvhudter: itme.show }"-->
<!--            :key="index"-->
<!--        >-->
<!--          <img-->
<!--              v-if="itme.show"-->
<!--              style="height: 20px; width: 20px; margin: 4px 0 0 15px"-->
<!--              src="./largeScreen/img/xx.png"-->
<!--          />-->
<!--          <img-->
<!--              v-else-->
<!--              style="height: 20px; width: 20px; margin: 4px 0 0 15px"-->
<!--              src="./largeScreen/img/ww.png"-->
<!--          />-->
<!--          <div style="margin-left: 20px">{{ itme.name }}</div>-->
<!--        </div>-->

        <div style="text-align: center">
          <!-- <div class="ijsdithert" @click="eixt">编辑</div>
          <div class="ijsdithert" @click="eixt">保存</div> -->
          <el-button
              style="margin-left: 30px"
              type="danger"
              v-if="isdraggable"
              size="small"
              @click="eixton"
              round
          >取 消
          </el-button>
          <el-button
              style="margin-left: 30px"
              type="primary"
              v-else
              size="mini"
              @click="eixt"
              round
          >编 辑
          </el-button>
          <el-button type="primary" size="mini" @click="addsave" round
          >保 存
          </el-button>
        </div>
      </el-card>
    </div>

    <el-drawer   placement="left"  title="添加组件" :visible.sync="dialogTableVisibleshenheren"
                size="90%"  >
         <div style="padding:0 10px">
        <el-row :gutter="20">
          <el-col :span="4">
             <el-card >
                 <div style="height:80vh">
                      <div  :class="{ acvitong: index == indextabf }"   @click="tabing(itme,index)" style="cursor: pointer; border-radius: 6px;text-align: center; height: 40px;line-height: 40px;border: 1px solid #dcdfe6;margin-bottom: 6px" v-for="itme,index in resultListtype" :key="index">
                             {{itme.screenTypeName}}
                      </div>
                 </div>
             </el-card>
          </el-col>
          <el-col :span="20">
            <el-row :gutter="20">
              <el-col :span="6"  style="margin-bottom: 10px" v-for="itme,index in resultList" :key="index">
                <el-card :body-style="{padding:'10px'}">
                  <el-image style="height: 160px;width: 100%;border-radius: 6px;" :src="itme.screenMedium"></el-image>
                  <div style="height: 20px">
                    <div style="height: 20px;line-height: 20px">
                      <el-row :gutter="20">
                        <el-col :span="18">
                          <div style="height: 20px; font-size: 12px;overflow: hidden;text-overflow: ellipsis" >{{itme.screenName}}</div>
<!--                          <div style="text-align: center;font-size: 14px;color: #2D97E6;cursor: pointer">查看详情</div>-->
                        </el-col>
                        <el-col :span="6">
                          <div v-if="itme.subscribeStatus==0" @click="addminge(itme)" style="font-weight: 600; text-align: center;font-size: 12px;color: $primary-color;cursor: pointer">订阅组件</div>
                          <div v-if="itme.subscribeStatus==1" @click="delminge(itme)" style="font-weight: 600;text-align: center;font-size: 12px;color: red;cursor: pointer">移除组件</div>

                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>


         </div>

          <div slot="footer" class="drawer-footer">

            <!-- <el-button type="primary" @click="submitClick('ruleForm','待提交')" class="submitBtn">保存</el-button>
<el-button type="success" @click="submitClick('ruleForm','待审核')" class="submitBtn">提交</el-button> -->
             <el-button @click="dialogTableVisibleshenheren=false">取 消</el-button>

          </div>


    </el-drawer>
  </div>
</template>

<script>


let mouseXY = {
  x: null,
  y: null,
};
let DragPos = {
  x: null,
  y: null,
  w: 1,
  h: 1,
  i: null,
};
import Vue from 'vue/dist/vue.esm.browser'
import { GridLayout, GridItem } from "vue-grid-layout";
import axios from "axios";
import  {searchDataMapsa} from "@/api/largeScreen"
// import Vue from 'vue'
export default {
  components: {
    GridLayout,
    GridItem,

  },
  data() {
    return {
      dialogTableVisibleshenheren:false,
      title: "个人主页展示设置",
      list: [
        {
          name: "个人面板",
        },
        {
          name: "报告生成",
        },
        {
          name: "公司指标",
        },
        {
          name: "菜单系统",
        },
      ],
      menuShowin: false,
      rightMenuin: {},
      layout: [],
      layouts: [],
      layoutshow: [

        // {
        //   h: 10,
        //   i: 1,
        //   w: 8,
        //   x: 0,
        //   y: 0,
        //   name: "消息中心",
        //   show: true,
        //   moved: false,
        //   height: 381,
        // }
      ],
      index:0,
      colNum: 36,
      quboje: {},

      level: [],
      itmein: "",
      itmeintool: "",
      itmeinmenu: "",
      itmeinreport: "",
      itmeinMonitor: "",
      itmeinMessage: "",
      styleon: "",
      styleontasks: "",
      styleonreport: "",
      styleonmessage: "",
      styleontools: "",
      styleonsys: "",
      itmeinability: "",
      isresizable: false,
      isdraggable:false,
      layoutUpdatedEventlist: [],
      mutableSystemList: [],
      tabList: [],
      systemMessages: [],
      messageGropData: [],
      messageDynamicData: [],
      activeName: "",
      tiemininsdf: "",

      commondgf:null,
      dynamicComponentStr:'',
      resultList:[],
      resultListtype:[],
      indextabf:0,
      isdarkTheme:false,
      urling:''
    };
  },

  mounted() {
    // this.urling= 'http://21.76.121.248:8080'   //测试
    console.log(window.location.origin)
    this.urling = window.location.origin  //生产
    sgBrowserShowFullScreen(true);
    sgHideBrowerserOpenPage(window.location.origin + "/#/monitorQueue");
    window.mac = this;
    this.getUserInfo();
    this.Getrhuoqu()
    // this.getLocalServerState();
    // this.getIpByRealTime();
    // this.getMenuList();
    // this.searchMessageByUsers();
    // this.location();
    // this.searchSystemStatus();

    // sgBrowerserOpenPage(location.origin + "/#/monitorQueue");
    // this.commondgf = Vue.extend({
    //   // data(){
    //   //   return{
    //   //     dsyd:'fsdjfskfdds'
    //   //   }
    //   // },
    //   // methods:{
    //   //   addee(){
    //   //     alert(1)
    //   //   }
    //   // },
    //   template:` <div @click="addee">sdfsjkfskfs</div>`
    // })

    document.addEventListener(
        "dragover",
        function (e) {
          mouseXY.x = e.clientX;
          mouseXY.y = e.clientY;
        },
        false
    );
    console.log(this.getCurrentTime());
    setInterval(() => {
      this.tiemininsdf = this.getCurrentTime();
    }, 1000);
    // this.index = this.layouts.length + 1
    // axios.get('http://localhost:30001').then((res) => {
    //   this.layouts =res.data
    //   this.index = this.layouts.length + 1
    // })






},
  computed: {
    themeClass() {
      return this.isdarkTheme ? 'light-theme' : 'dark-theme'
    },
    themeClasscard() {
      return this.isdarkTheme ? 'light-theme-card' : 'dark-theme-card'
    },
    themeClasscardtop() {
      return this.isdarkTheme ? 'light-theme-cardtop' : 'dark-theme-cardtop'
    },
    themeClasstop() {
      return this.isdarkTheme ? 'light-theme-top' : 'dark-theme-top'
    },
  },
  methods: {
    //主题切换
    isdarkThemechange(val){
      this.isdarkTheme = val
      var  isdarkTheme = {
        isdarkTheme:val
      }
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      axios.post(this.urling+'/finance/mysql/searchDataMap', {  "dataSource": "mysql-operate",
        "actionName": "user_updateUserScreenConfig",
        "data": {
          "userId": this.userInfo.userId,
          screenConfig: JSON.stringify(isdarkTheme),
        }

      }).then((res) => {


      })
    },
    Getrhuoqu(){
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      axios.post(this.urling+'/finance/mysql/searchDataMap', {  "dataSource": "mysql-operate",
        "actionName": "user_searchUserScreenConfig",
        "data": {
          "userId": this.userInfo.userId
        }

      }).then((res) => {
          this.isdarkTheme = JSON.parse(res.data.data.screenConfig).isdarkTheme
      })
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      axios.post(this.urling+'/finance/mysql/searchDataList', {  "dataSource": "mysql-operate",
        "actionName": "user_searchUserScreenList",
        "data": {
          "userId":this.userInfo.userId,
          "subscribeStatus":1
        },

      }).then((res) => {
        // this.resultList = res.data.resultList
        this.layouts  = res.data.resultList
        this.index = this.layouts.length + 1

      })
    },
    sdfnuewhreu(str) {
      console.log(str)
      const templateMatch = str.match(/<template>([\s\S]*?)<\/template>/);
      const scriptMatch = str.match(/<script>([\s\S]*?)<\/script>/);
      const styleMatch = str.match(/<style scoped>([\s\S]*?)<\/style>/);
      const template = templateMatch ? templateMatch[1] : '';
      const script = scriptMatch ? scriptMatch[1] : '';
      const style = styleMatch ? styleMatch[1] : '';
      const  scripts = script.replace(/export\s+default\s+/g,'')
      const scriptModule =new Function('return (' + scripts + ')')();
      const {render, staticRenderFns} = Vue.compile(template);
      const componentDefinition = {
        // template,
        render,
        staticRenderFns,
        ...scriptModule,
      };
      const styleElement = document.createElement('style');
      styleElement.textContent = style;
      document.head.appendChild(styleElement);
       return Vue.extend(componentDefinition)



    },

    backin() {
      sgBrowerserOpenPage(window.location.origin + "/#/index");
      sgBrowserShowFullScreen(false);
      sgBrowserClosePage(window.location.href);
    },
    residf() {
      sgBrowserMaxShow();
      // alert(8)

    },

    getCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const weekDays = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      const dayOfWeek = weekDays[now.getDay()];
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${dayOfWeek}`;
    },



    //关闭
    coloe() {
      this.menuShowin = false;
    },
    //编辑
    eixt() {
      this.isdraggable = true;
      this.isresizable = true;
      this.menuShowin = false;
    },
    //取消
    eixton() {
      this.isdraggable = false;
      this.isresizable = false;
      this.menuShowin = false;
    },
    //保存类型
    addsave() {
      this.isdraggable = false;
      this.isresizable = false;
      this.menuShowin = false;
      // localStorage.setItem("Grid", JSON.stringify(this.layoutUpdatedEventlist));
      // axios.post('http://localhost:13313/MonitorServices/addGridList',{
      //   id:this.userInfo.userId,
      //   json:JSON.stringify(this.layoutUpdatedEventlist)
      // }).then((res)=>{
      //   this.layout = JSON.parse(res.data[0].json)
      // })
      // updataHomePageConfig({
      //   userId: this.userInfo.userId,
      //   jsonB: JSON.stringify(this.layoutUpdatedEventlist),
      // }).then((res) => {});
      var  isdarkTheme = {
        isdarkTheme:this.isdarkTheme
      }
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      axios.post(this.urling+'/finance/mysql/searchDataMap', {  "dataSource": "mysql-operate",
        "actionName": "user_updateUserScreenConfig",
        "data": {
          "userId": this.userInfo.userId,
          screenConfig: JSON.stringify(isdarkTheme),
        }

      }).then((res) => {


      })
      var latout = []
      for (let i = 0; i < this.layout.length; i++) {
        latout.push({
           data: this.layout[i],
          where:{
             userId:this.userInfo.userId,
            screenId: this.layout[i].screenId
          }
        })
      }

      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      axios.post(this.urling+'/finance/mysql/updateDataList', {  "dataSource": "mysql-operate",
        "actionName": "user_bacthUpdateUserScreen",
        "data":latout,

      }).then((res) => {
        // this.resultList = res.data.resultList

      })
    },
    sdfsdfsdfger() {
      this.isMarkShow = true;
      // this.$refs.addSystemMenuRef.toggleDrawer();
      this.$refs.addSystemMenuRef.handleDrawerVisibility(true);
    },
    getDrawerState(val) {
      this.getMenuList();
    },
    getUserInfo() {
      const userInfo = localStorage.getItem("userinfo");
      if (userInfo) {
        try {
          this.userInfo = JSON.parse(userInfo);
          // this.GetsearchHomePageConfig();
          this.$store.commit("setUserInfo", this.userInfo);
        } catch (e) {
          console.error("解析localStorage中的用户信息失败", e);
        }
      }
    },

    // 使用示例
    //插入
    adding(itme) {
      console.log(itme);
      // for (var i = 0; this.layoutshow.length > i; i++) {
      //   if (itme.i == this.layoutshow[i].i) {
      //     this.layoutshow[i].show = !itme.show;
      //   }
      // }
      // var hier = [];
      // for (var j = 0; j < this.layoutshow.length; j++) {
      //   if (this.layoutshow[j].show) {
      //     this.layoutshow[j].show = true;
      //     hier.push(this.layoutshow[j]);
      //   }
      // }
      for (var i = 0; this.layout.length > i; i++) {
        if (itme.i == this.layout[i].i) {
          this.layout[i].show = !itme.show;
        }
      }
      // for (var i = 0; this.layouts.length > i; i++) {
      //   if (itme.i == this.layouts[i].i) {
      //     this.layouts[i].show = !itme.show;
      //   }
      // }
      // this.layout = hier;
    },
    //右键事件
    onRightClick(e, item) {
      this.menuShowin = true; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
      e.preventDefault(); //关闭浏览器右键默认事件
      this.rightMenuin = {
        // top: e.pageY + "px",
        // left: e.pageX + "px",
        top: "40%",
        right: "40%",
      };

      // document.addEventListener("click", (ev) => {
      // 	// ev.stopImmediatePropagation()
      // 	if (ev.target !== document.querySelector(".anausbf")) {
      // 		//	this.fooin();
      // 	}
      // });
      // document.addEventListener("click", (ev) => {
      //   // ev.stopImmediatePropagation()
      //   if (ev.target !== document.querySelector(".el-menu-item.is-active")) {
      //     this.fooin();
      //   }
      // });
      // 可以在这里展示自定义菜单
    },
    //订阅
    addminge(itme){
      // this.layouts.push({
      //   x: (this.layouts.length * 2) % (this.colNum ||6),
      //   y: this.layouts.length + (this.colNum || 6), // puts it at the bottom
      //   w: 8,
      //   h: 8,
      //   i: this.index,
      //   name: "",
      //   show: true,
      //   moved: false,
      //   height: 381,
      // });
      // this.index++;
      // console.log(this.layouts)
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      axios.post(this.urling+'/finance/mysql/addDataList', {  "dataSource": "mysql-operate",
        "actionName": "user_bacthAddUserScreen",
        "data": [{
          "userId":this.userInfo.userId,
          "screenId":itme.screenId,
          "sorts": 1,
            x: (this.layouts.length * 2) % (this.colNum ||4),
            y: this.layouts.length + (this.colNum || 4), // puts it at the bottom
            w: 8,
            h: 8,
            i:Date.now(),
            show: true,
            moved: false,
            height: 303,
            screenHeight:303
        }]

      }).then((res) => {
        // this.addmodfg()
        this.Getrhuoqu()
        this.comonoflist()
        // this.resultList = res.data.resultList

      })
    },
    //移除
    delminge(itme){

      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      axios.post(this.urling+'/finance/mysql/deleteDataList', {  "dataSource": "mysql-operate",
        "actionName": "user_bacthDeleteUserScreen",
        "data": [{
          "userId": this.userInfo.userId,
          "screenId": itme.screenId
        }]

      }).then((res) => {
        // this.addmodfg()
        this.Getrhuoqu()
        this.comonoflist()

      })
    },
    //组件添加弹框
    addmodfg(){
      this.dialogTableVisibleshenheren = true
      this.indextabf = 0
      this.Gettypeing()
      this.comonoflist()

    },
    tabing(itme,index){

       this.indextabf = index
      this.comonoflist(itme.screenTypeId)
    },
    //类型
    Gettypeing(){
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      axios.post(this.urling+'/finance/mysql/searchDataList', {  "dataSource": "mysql-operate",
        "actionName": "user_searchScreenTypeList",
        "data": {},

      }).then((res) => {
        this.resultListtype = res.data.resultList
        this.comonoflist()
      })
    },
    //组件列表
    comonoflist(){
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      axios.post(this.urling+'/finance/mysql/searchDataList', {  "dataSource": "mysql-operate",
        "actionName": "user_searchUserScreenList",
        "data": {
          "userId":this.userInfo.userId,
          "screenTypeId":this.resultListtype[this.indextabf].screenTypeId
        },

      }).then((res) => {
        this.menuShowin = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
        this.resultList = res.data.resultList

      })
    },
    fooin() {
      // 取消鼠标监听事件 菜单栏
      this.menuShowin = false;
      document.removeEventListener("click", this.fooin); // 关掉监听，
    },
    //删除单元格
    removeItem: function (val) {
      const index = this.layout1.map((item) => item.i).indexOf(val);
      this.layout1.splice(index, 1);
    },
    drag: function (e) {
      let parentRect = document
          .getElementById("content")
          .getBoundingClientRect();
      let mouseInGrid = false;
      if (
          mouseXY.x > parentRect.left &&
          mouseXY.x < parentRect.right &&
          mouseXY.y > parentRect.top &&
          mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (
          mouseInGrid === true &&
          this.layout.findIndex((item) => item.i === "drop") === -1
      ) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.colNum || 12),
          y: this.layout.length + (this.colNum || 12), // puts it at the bottom
          w: 1,
          h: 1,
          i: "drop",
        });
      }
      let index = this.layout.findIndex((item) => item.i === "drop");
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[
              this.layout.length
              ].$refs.item.style.display = "none";
        } catch {}
        let el = this.$refs.gridlayout.$children[index];
        el.dragging = {
          top: mouseXY.y - parentRect.top,
          left: mouseXY.x - parentRect.left,
        };
        let new_pos = el.calcXY(
            mouseXY.y - parentRect.top,
            mouseXY.x - parentRect.left
        );
        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent(
              "dragstart",
              "drop",
              new_pos.x,
              new_pos.y,
              1,
              1
          );
          DragPos.i = String(index);
          DragPos.x = this.layout[index].x;
          DragPos.y = this.layout[index].y;
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent(
              "dragend",
              "drop",
              new_pos.x,
              new_pos.y,
              1,
              1
          );
          this.layout = this.layout.filter((obj) => obj.i !== "drop");
        }
      }
    },
    dragend: function (e) {
      let parentRect = document
          .getElementById("content")
          .getBoundingClientRect();
      let mouseInGrid = false;
      if (
          mouseXY.x > parentRect.left &&
          mouseXY.x < parentRect.right &&
          mouseXY.y > parentRect.top &&
          mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true) {
        // alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
        this.layout = this.layout.filter((obj) => obj.i !== "drop");
        //************ 添加到拖动的目标位置
        this.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: 1,
          h: 1,
          i: DragPos.i,
        });
        this.$refs.gridLayout.dragEvent(
            "dragend",
            DragPos.i,
            DragPos.x,
            DragPos.y,
            1,
            1
        );
        try {
          this.$refs.gridLayout.$children[
              this.layout.length
              ].$refs.item.style.display = "block";
        } catch {}
      }
    },
    //****************** GridLayout ************************
    //对应Vue生命周期的created
    layoutCreatedEvent: function (newLayout) {
      console.log("Created layout: ", newLayout);
    },
    //对应Vue生命周期的beforeMount
    layoutBeforeMountEvent: function (newLayout) {
      console.log("beforeMount layout: ", newLayout);
    },
    //对应Vue生命周期的mounted
    layoutMountedEvent: function (newLayout) {
      console.log("Mounted layout: ", newLayout);
    },
    //当完成mount中的所有操作时生成的事件
    layoutReadyEvent: function (newLayout) {
      console.log("Ready layout: ", newLayout);
    },
    //更新事件（布局更新或栅格元素的位置重新计算）
    layoutUpdatedEvent: function (newLayout) {
      console.log("Updated layout: ", newLayout);

      // this.layoutUpdatedEventlist = newLayout;
      this.layout = newLayout
    },

    //每次断点值由于窗口调整大小而改变
    breakpointChangedEvent: function (newBreakpoint, newLayout) {
      console.log("断点=", newBreakpoint, ", layout: ", newLayout);
    },
    //****************** GridItem ************************
    //单元格移动时的事件
    moveEvent: function (i, newX, newY) {
      console.log("移动中 i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    //单元格调整大小时的事件
    resizeEvent: function (i, newH, newW, newHPx, newWPx) {
      console.log("调整大小中 i=" + i);
    },
    //单元格移动后的事件
    movedEvent: function (i, newX, newY) {
      console.log("移动完成 i=" + i);
    },
    //单元格调整大小后的事件
    resizedEvent: function (it, newH, newW, newHPx, newWPx) {
      console.log("调整大小完成 i=" + i, newH, newW, newHPx, newWPx);
      for (var i = 0; this.layoutshow.length > i; i++) {
        if (it == this.layoutshow[i].i) {
          this.layoutshow[i].height = newHPx;
        }
      }
      for (var i = 0; this.layout.length > i; i++) {
        if (it == this.layout[i].i) {
          this.layout[i].height = newHPx;
        }
      }
    },
    //单元格或单元格容器更改大小的事件（浏览器窗口或其他）
    containerResizedEvent: function (i, newH, newW, newHPx, newWPx) {
      console.log("容器大小改变了 i=" + i);
    },

  },
  beforeDestroy() {
    this.clearPolling();
  },
};
</script>

<style lang="scss" scoped>
// .light-theme{
//   background: url("./largeScreen/theme/blue/bg.png");
// }
// .dark-theme{
//   background: url("./largeScreen/theme/green/bg.png");
// }


// .light-theme-card {
//   background: url("./largeScreen/theme/blue/xiaoxi.png");
// }
// .dark-theme-card{
//   background: url("./largeScreen/theme/green/xiaoxi.png");
// }
// .light-theme-cardtop {
//   background: url("./largeScreen/theme/blue/xiaotop.png");
// }
// .dark-theme-cardtop{
//   background: url("./largeScreen/theme/green/xiaotop.png");
// }

//.toipdfgdgdfg {
//  background: url("./largeScreen/img/top.png");
//  //height: 80px;
//}

// .light-theme-top {
//   background: url("./largeScreen/theme/blue/top.png");
// }
// .dark-theme-top{
//   background: url("./largeScreen/theme/green/top.png");
// }



.messagebauf {
  //background: url("./largeScreen/img/xiaoxi.png");
}
.messagebaufsidfherer {
  //background: url("./largeScreen/img/xiaotop.png");
  background-size: 100% 30px;
  height: 30px;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  color: rgba(179, 227, 225, 1);
  font-weight: bold;
}
//.main-index-new {
//  background: url("./largeScreen/img/dd.png");
//
//  height: 100vh;
//}
.shduber {
  border: 2px solid rgba(179, 227, 225, 1);
}
//.asdashsdbzxc{
//  .vue-resizable-handle{
//    background: $primary-color !important;
//  }
//}
//.vue-resizable{
//  .vue-resizable-handle{
//    background: $primary-color !important;
//  }
//}
.main-index-new {
  //background: url("./largeScreen/img/dd.png");

  height: 100vh;
}

.sdfisfyrettnan {
  //background: url("./largeScreen/img/b.png");
  //background-size: 500px 100px;
  //height:300px;
}

.messagebaufxtop {
  // background: url("./largeScreen/img/xitong.png");
  background-repeat: no-repeat;
  background-size: 100% 50%;
  background-position: left bottom;
}
.messagebaufzhibiao {
  //background: url("./largeScreen/img/zhibiao.png");
  background-repeat: no-repeat;
  background-size: 100% 50%;
  background-position: left bottom;
}

.box-card {
  //background-image: url("./largeScreen/img/xuan.png");
  background-size: 100% 100%;
  border: none !important;
  background-color: transparent;
}
.meirigognzuo {
  //background: url("./largeScreen/img/gognzuo.png");
  background-repeat: no-repeat;
  background-size: 100% 30px;
  height: 30px;
  font-size: 21px;
  text-align: center;
  width: 750px;
  margin: 0 auto;
  line-height: 30px;
  color: rgba(179, 227, 225, 1);
  font-weight: bold;
}
.main-index {
  padding: 20px;
  display: flex;
  height: 103vh;
  box-sizing: border-box;

  //justify-content: space-around;
  //justify-items: center;
  //width: 100%;
  //overflow: hidden;
  .main-left {
    width: 76%;
    height: 100%;
    margin-right: 19px;
    //border: 1px solid #666;
  }

  .main-right {
    width: calc(24% - 19px);
    height: 100%;
    /*    z-index: 999;*/
    //width: 22%;
    //border: 1px solid #666;
  }
}

.zhi-lingiegn {
  width: 100%;
  margin-bottom: 9px;
  //height: 360px;
}

.busdbf-inmain {
  display: flex;
  margin: 10px 0;
  width: 100%;
  justify-content: space-around;
  justify-items: center;
}

.nmbu-main1 {
  //width: 457px;
  width: 38%;
  height: 271px;
  background: #ffffff;
  box-shadow: 0px 2px 9px 1px rgba(229, 229, 229, 0.5);
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  /*margin: 0 10px 0 0;*/
  /*margin-left: 19px;*/
  //padding: 0 22px;
}

.nmbu-main2 {
  //width: 806px;
  width: calc(62% - 20px);
  height: 271px;
  background: #ffffff;
  box-shadow: 0px 2px 9px 1px rgba(229, 229, 229, 0.5);
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  margin-left: 19px;
  //padding: 0 22px;
  overflow: hidden;
}

.busdbf-inmain1 {
  display: flex;
  margin-top: 19px;
}

.nmbu-main11 {
  //width: 457px;
  width: 38%;
  height: 384px;
  background: #ffffff;
  box-shadow: 0px 2px 9px 1px rgba(229, 229, 229, 0.5);
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  /*margin: 0 10px 0 0;*/
  //padding: 0 22px;
}

.nmbu-main22 {
  //width: 806px;
  width: calc(62% - 20px);
  height: 384px;
  background: #ffffff;
  box-shadow: 0px 2px 9px 1px rgba(229, 229, 229, 0.5);
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  margin-left: 19px;
  //padding: 0 22px;
}

.nmbu-main3 {
  //width: 374px;
  width: 100%;
  height: 422px;
  background: #ffffff;
}

.nmbu-main33 {
  //width: 374px;
  width: 100%;
  height: 454px;
  background: #ffffff;
  box-shadow: 0px 2px 9px 1px rgba(229, 229, 229, 0.5);
  border-radius: 16px;
  border: 1px solid #e8e8e8;
  margin-top: 18px;
}

.platform-mark-toggle-drawer {
  width: 100%;
  height: 113vh;
  background: #000000;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.2;
  z-index: 100;
}

.droppable-element {
  width: 4%;
  float: left;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}

#content {
  float: right;
  width: 100%;
  //height: 100vh;
  background: #fff;
}

.vue-grid-layout {
  background: #fff;
  height: 100% !important;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  //span{
  //  background: $primary-color !important;
  //}
  //background: #e5faff;
  //border: 1px solid #4ddbff;
}
.vue-grid-item > span {
  background: #ffffff !important;
}

.vue-grid-item .resizing {
  //opacity: 0.9;
}

.vue-grid-item .static {
  //background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.anausbf {
  position: fixed;
  min-width: 200px;
  /* background-color: #F0F0F0; */
  height: 300px;
  /* border: 1px solid rgba(0, 0, 0, 0.15);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175); */
  z-index: 100000;
}

.tabing9 {
  display: flex;
  margin-bottom: 10px;
  margin-top: 40px;
  height: 30px;
  line-height: 30px;
  width: 310px;
  font-size: 12px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 6px;
  color: #ffffff;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  //background: #fff;
  //box-shadow: 0 2px 9px 1px hsla(0, 0%, 90%, 0.5);
  //border-radius: 16px;
  //border: 1px solid #e8e8e8;
}

.monitoring-tasks-module {
  .bottom-card-click {
    bottom: -30px !important;
  }
}

.cvhudter {
  border: 1px solid rgba(179, 227, 225, 1);
  color: rgba(179, 227, 225, 1);
}

.ijsdithert {
  height: 30px;
  line-height: 30px;
  width: 100px;
  text-align: center;
}

.nsfsfsdgg {
  color: #ffffff;
  height: 20px;
  width: 30px;
  float: right;
  font-size: 16px;
  margin-right: -20px;
  cursor: pointer;
}

.sjisjdfgs {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.mark-toggle-drawer {
  width: 100%;
  background: #000000;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.2;
}

.sdfjisfjier {
  height: 100px;
  background: url("@/assets/banner.png") no-repeat;
  background-size: 100% 100px;
  margin: -3px 10px 3px 10px;
  border-radius: 10px;
}

.dfgudgdfgd {
  font-size: 28px;
  padding: 0 15px;
  color: $primary-color;
}

.dfgudgdfgsadd {
  font-size: 28px;
  padding: 0 15px;
  color: #333;
}

.local-server {
  width: 50%;
  line-height: 50px;
  text-align: center;

  span {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #333333;
  }
  .close-link-btn {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    //color: #3c6ade;
    margin-left: 16px;
    &:hover {
      //color: $primary-color;
    }
  }

  .status {
    margin-left: 12px;

    i {
      margin-right: 10px;
    }
  }
}
.el-drawer rtl{
  background: #1DA1F2 !important;
}
.acvitong{
  font-weight: 600;
  color: #FFFFFF;
  border: 1px solid  #21CEC8;
  background: #21CEC8;
}
.el-switch__label{
  color: #FFFFFF !important;
}
</style>
