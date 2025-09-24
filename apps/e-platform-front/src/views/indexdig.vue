<template>
  <div class="main-index-new" v-on:contextmenu.prevent="onRightClick($event)">
    <!--    顶部个人信息面板-->
    <div class="top-panel-box">
      <div class="user-info">
        <div class="avatar">
          <!-- <img src="@/assets/worker.png" alt="" /> -->
        </div>
        <div class="dfgudgdfgd">{{ this.userInfo.departmentName }}</div>
        <div class="dfgudgdfgsadd">『 {{ this.userInfo.userName }} 』</div>
        <!--        <el-button-->
        <!--          class="dashboard-btn"-->
        <!--          size="medium"-->
        <!--          style="-->
        <!--            background-color: $primary-color;-->
        <!--            color: white;-->
        <!--            width: 100px;-->
        <!--            height: 38px;-->
        <!--            margin-top: 31px;-->
        <!--            margin-left: 12px;-->
        <!--          "-->
        <!--          type="success"-->
        <!--          @click="fallscreen"-->
        <!--          ><span>大屏看板</span></el-button-->
        <!--        >-->
      </div>

      <div class="local-server">
        <span @click="versionClick" style="cursor: pointer">版本记录</span>
        &nbsp;
        <span>
          <i class="el-icon-link"></i>
          本地服务状态：
        </span>
        <span class="status" v-if="!localServerStatus">
          <i style="width: 10px; height: 10px; border-radius: 50%; background-color: #817e7e; display: inline-block"></i>
          未启动
        </span>
        <span class="status" v-else>
          <i style="width: 10px; height: 10px; border-radius: 50%; background-color: #76c24e; display: inline-block"></i>
          已启动
        </span>
        <el-button class="close-link-btn" type="text" v-if="localServerStatus" @click="closeLink">
          <i class="el-icon-switch-button" style="color: #333; margin-right: 5px"></i>
          断开连接
        </el-button>
        <el-button class="close-link-btn" type="text" v-if="!localServerStatus" @click="openLink">
          <i style="color: #333; margin-right: 5px"></i>
          打开本地服务
        </el-button>
        <el-button
          size="medium"
          style="background-color: $primary-color; width: 100px; height: 38px; margin-top: 31px; margin-left: 12px"
          type="success"
          @click="savexuqiu"
        >
          <span style="color: #ffffff">需求填报</span>
        </el-button>
        <el-dropdown trigger="click" @command="toogleTheme">
          <span class="el-dropdown-link">
            <el-button
              size="medium"
              style="background-color: $primary-color; width: 100px; height: 38px; margin-top: 31px; margin-left: 12px"
              type="success"
            >
              <span style="color: #ffffff">切换主题</span>
            </el-button>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <!-- @click="toogleTheme"-->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="red" style="color: #a72621">党建红</el-dropdown-item>
            <el-dropdown-item command="green" style="color: rgb(39, 168, 163)">国网绿</el-dropdown-item>
            <el-dropdown-item command="blue" style="color: #1d72eb">天空蓝</el-dropdown-item>
            <el-dropdown-item command="gold" style="color: #b97216">翠英金</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div id="content" v-on:contextmenu.prevent="onRightClick($event)">
      <grid-layout
        @layout-created="layoutCreatedEvent"
        @layout-before-mount="layoutBeforeMountEvent"
        :is-draggable="isdraggable"
        @layout-mounted="layoutMountedEvent"
        @layout-ready="layoutReadyEvent"
        @layout-updated="layoutUpdatedEvent"
        @breakpoint-changed="breakpointChangedEvent"
        ref="gridlayout"
        :margin="[8, 8]"
        :layout.sync="layout"
        :col-num="24"
        :row-height="30"
      >
        <!--	@resized="resizedEvent"   @resize="resizeEvent"  	@container-resized="containerResizedEvent"   @move="moveEvent" @moved="movedEvent"  :is-resizable="false" -->
        <grid-item
          v-for="item in layout"
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
          <div>
            <!--					<title-bar text="业务监测-监测项"></title-bar>  styleontasks-->
            <div v-if="item.i == '0' && item.show">
              <monitoring-tasks
                :styleon="item.height"
                :itmein="itmeinMonitor"
                :monitorList="monitorList"
                @addMonitorRefMonitor="addMonitorRefMonitor"
                @get-draw-state="getDrawerState"
                @use-monitor="handelMonitor"
              ></monitoring-tasks>
            </div>

            <!--我的菜单 一键进入菜单 styleon-->
            <div v-if="item.i == '1' && item.show">
              <recently-used-menus
                :styleon="item.height"
                :itmein="itmeinmenu"
                :resultList="resultList"
                @addSystemMenuRefmenu="addSystemMenuRefmenu"
                @get-draw-state="getDrawerState"
                @used-menu="handleActiveUsedMenu"
              ></recently-used-menus>
            </div>
            <div v-if="item.i == '3' && item.show">
              <report-forms
                :styleon="item.height"
                :itmein="itmeinreport"
                @addOrUpdateRefreporting="addOrUpdateRefreport"
                @get-draw-state="getDrawerState"
              ></report-forms>
            </div>
            <!--					<title-bar text="智能工具" styleontools></title-bar>-->
            <div v-if="item.i == '4' && item.show">
              <intelligent-tools
                :styleon="item.height"
                :itmein="itmeintool"
                @addSystemMenuReftoolin="addSystemMenuReftoolin"
                @get-draw-state="getDrawerState"
              ></intelligent-tools>
            </div>

            <!--					<title-bar text="消息中心" styleonmessage></title-bar>-->
            <div v-if="item.i == '5' && item.show">
              <message-dynamic
                ref="messageDynamicRef"
                :styleon="item.height"
                :itmein="itmeinMessage"
                :tabList="tabList"
                :activeName="activeName"
                :system-messages="systemMessages"
                @addMessageDrawerMessage="addMessageDrawerMessage"
                @get-draw-state="getDrawerState"
                @check-message="handelMessage"
              ></message-dynamic>
            </div>
            <!--					<title-bar text="进入系统" styleonsys></title-bar>-->
            <div v-if="item.i == '6' && item.show">
              <digitalization-ability
                :layout="layout"
                :userInfo="userInfo"
                ref="systemRef"
                @shouelogind="loadingTwxt"
                @systemSetting="systemSetting"
                :itmein="itmeinability"
                :monitorList="monitorList"
                @addSystemMenuReftoolin="addSystemMenuReftoolinability"
                :styleon="item.height"
              ></digitalization-ability>
            </div>

            <!--            热门推荐-->
            <div v-if="item.i == '7'">
              <intelligent-recommendation :styleon="item.height"></intelligent-recommendation>
            </div>

            <!--            指标-->
            <div v-if="item.i == '8' && item.show">
              <key-points
                ref="keyPointRef"
                @openDraweruu="openDraweruu"
                @sdfsdfsdfger="sdfsdfsdfger"
                :itmein="itmein"
                :styleon="item.height"
                @get-draw-state="getDrawerState"
                @use-point="handelPoint"
              ></key-points>
            </div>

            <!--            文档中心-->
            <div v-if="item.i == '9' && item.show">
              <wordCenter :itmein="itmein" :styleon="item.height"></wordCenter>
            </div>

            <!--            数据服务-->
            <div v-if="item.i == '10' && item.show">
              <dataServer
                :itmein="itmeinServer"
                :styleon="item.height"
                @addSystemMenuRefmenu="addDataServerRef"
                @used-menu="handleActiveUsedMenu"
              ></dataServer>
            </div>

            <!--            自定义组件-->
            <div v-if="item.i.length > 20" class="zdyzj" style="position: relative">
              <menuTitles :title="item.name" style="margin-bottom: 14px"></menuTitles>
              <div style="padding: 0 10px; overflow-y: auto; overflow-x: hidden">
                <div
                  :style="[
                    {
                      height: item.height - 90 + 'px',
                    },
                  ]"
                  style="font-size: 16px"
                  v-if="item.vueCode"
                  v-bind:is="sdfnuewhreu(Getrhuoqu(item.screenId))"
                ></div>
              </div>
            </div>
          </div>
        </grid-item>
      </grid-layout>
    </div>

    <!-- 右键弹框自定义配置菜单 -->
    <div v-if="menuShowin" class="anausbf" :style="{ ...rightMenuin }">
      <el-card class="box-card">
        <div class="nsfsfsdgg" @click="coloe">X</div>
        <menu-title :title="title" style="margin: 18px 0"></menu-title>
        <!--				<div class="tabing9" v-for="itme in layoutshow" @click="adding(itme)" :class={cvhudter:itme.show}>-->
        <div class="tabing9" v-for="(itme, index) in layout" v-if="itme.i < 5000" @click="adding(itme)" :class="{ cvhudter: itme.show }" :key="index">
          <!-- <img v-if="itme.show" style="height: 20px; width: 20px; margin: 4px 0 0 15px" src="../assets/o.png" />
          <img v-else style="height: 20px; width: 20px; margin: 4px 0 0 15px" src="../assets/w.png" /> -->
          <div style="margin-left: 20px">{{ itme.name }}</div>
        </div>

        <div style="text-align: center">
          <el-button style="margin-left: 30px" type="danger" v-if="isdraggable" size="small" @click="eixton" round>取 消</el-button>
          <el-button style="margin-left: 30px" type="primary" v-else size="mini" @click="eixt" round>编 辑</el-button>
          <el-button type="primary" size="mini" @click="addsave" round>保 存</el-button>
        </div>
      </el-card>
    </div>

    <!--添加指标抽屉-->
    <add-system-menu style="height: 1px" @addData="addData" ref="addSystemMenuRef" @get-open-state="getOpenState"></add-system-menu>

    <!--指标查看详情-->
    <menu-toggle-drawer
      style="height: 1px; z-index: 111"
      :searchQuotaListlist="searchQuotaListlist"
      :searchQuotaMaplist="searchQuotaMaplist"
      :factorNamelist="factorNamelist"
      ref="menuToggleDrawer"
      @get-drawer-state="getDrawerState"
    ></menu-toggle-drawer>

    <!-- 添加工具抽屉 -->
    <addSystemMenutool
      style="height: 3px"
      @showDetail="showDetail"
      @showSubscr="showSubscr"
      ref="addSystemMenuReftool"
      @get-open-state="getOpenState"
    ></addSystemMenutool>

    <!-- 添加菜单抽屉 -->
    <addSystemMenuMenu style="height: 3px" ref="addSystemMenuRefMenu" @get-open-state="getOpenStatemenu" @add-menu="addMenu"></addSystemMenuMenu>
    <!-- 添加数据服务抽屉 -->
    <addDataServer style="height: 3px" ref="addDataServerRef" @get-open-state="getOpenStatemenu" @add-menu="addDataServer"></addDataServer>

    <!-- 报告 -->
    <!-- 	@searchData="searchData" @searchList="getReportList" :specialityList="specialityList"
        @get-drawer-state="getDrawerState" -->
    <!--    添加报告抽屉-->
    <addReportDrawer
      style="height: 3px"
      @searchData="searchData"
      @searchList="getReportList"
      @get-drawer-state="getDrawerState"
      :level="level"
      ref="addOrUpdateRef"
    ></addReportDrawer>

    <!-- 添加监测项抽屉 -->
    <addMonitorDrawer
      style="height: 3px"
      hide-on-single-page
      @get-drawer-state="getDrawerState"
      @searchList="getList"
      ref="addMonitorRef"
      @use-monitor="handelMonitor"
    ></addMonitorDrawer>

    <!-- 添加消息抽屉 -->
    <add-message-drawer
      style="height: 3px"
      ref="addMessageDrawer"
      @get-drawer-state="getDrawerStateubu"
      @add-message="addMessage"
    ></add-message-drawer>

    <!--    系统   this.$refs.subscribeSystemDrawer.toggleDrawer();-->
    <!--    系统订阅抽屉-->
    <subscribe-system-drawer
      ref="subscribeSystemDrawer"
      @getSystemList="getSystemList"
      @getSubscribeDrawerState="getSubscribeDrawerState"
    ></subscribe-system-drawer>

    <!-- 系统设置弹窗-->
    <systemSettingDialog
      ref="systemSettingDialogRef"
      @getSystemList="searchSystemStatus"
      @getSystemListIng="getSystemListIng"
      @updateSystemInfoOnLine="searchUserSystemInfo"
      @loadingAnd="loadingAnd"
      @loginCompletedLogin="loginCompletedLogin"
    ></systemSettingDialog>

    <div class="sjisjdfgs" v-if="menuShowin"></div>
    <!--    营销系统切换岗位弹窗-->
    <el-dialog
      width="30%"
      id="table"
      title="切换岗位"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :show-close="false"
      :append-to-body="true"
    >
      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item label="切换岗位" prop="layerId" :label-width="formLabelWidth">
              <el-select ref="layerIdSelect" v-model="dutyDtoId" value-key="dutyId" placeholder="请选择岗位">
                <el-option v-for="item in dutyDtoList" :key="item.dutyId" :label="item.dutyName" :value="item"></el-option>
              </el-select>
              <el-button style="margin-left: 10px" @click="dialogTableVisible = false">取 消</el-button>
              <el-button style="background: $primary-color; color: #ffffff" @click="addDutyDto">确 定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      width="50%"
      id="table"
      title="版本记录"
      :visible.sync="versionVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
      class="version-dialog"
    >
      <el-row>
        <el-col :span="8">
          <ul class="version-dialog-left">
            <li v-for="item in versionList" :key="item.id" :class="{ selectv: selectId === item.id }">
              <span @click="liClick(item)">{{ item.updateDate }}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="16">
          <div class="version-dialog-right">
            <span style="width: 75px; display: inline-block">版本描述：</span>
            <div style="flex: 1">
              {{ versionData }}
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <!--    <div style="z-index: 99999;position: fixed;right: 0; height:100px;width: 100px;background: $primary-color">-->
    <!--      <img style="height: 100%;width: 100%" src="@/assets/images/persoanl2.png"   />-->
    <!--    </div>-->
    <el-dialog
      width="40%"
      title="请填写您的专业岗位"
      :visible.sync="versionVisiblepost"
      :close-on-click-modal="false"
      :append-to-body="true"
      :show-close="false"
      class="version-dialog"
    >
      <el-form :model="ruleFormpost" :rules="rulespost" ref="ruleFormpost">
        <el-form-item label="专业岗位" prop="postId">
          <el-select
            filterable
            style="width: 100%"
            v-model="ruleFormpost.postId"
            autocomplete="off"
            no-data-text="请选择专业岗位"
            placeholder="请选择专业岗位"
          >
            <el-option v-for="item in MajorPostlist" :key="item.postId" :label="item.postName" :value="item.postId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForms('ruleFormpost')" class="submitBtn">确 定</el-button>
      </div>
    </el-dialog>
    <el-drawer placement="left" title="添加组件" style="font-size: 18px" :visible.sync="dialogTableVisibleshenheren" size="90%">
      <div style="padding: 0 10px">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-card>
              <div style="height: 80vh">
                <div
                  :class="{ acvitong: index == indextabf }"
                  @click="tabing(itme, index)"
                  style="
                    font-size: 18px;
                    cursor: pointer;
                    border-radius: 6px;
                    text-align: center;
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid #dcdfe6;
                    margin-bottom: 6px;
                  "
                  v-for="(itme, index) in resultListtype"
                  :key="index"
                >
                  {{ itme.screenTypeName }}
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="20">
            <div style="margin-bottom: 10px">
              <el-form ref="formA">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item>
                      <el-select size="mini" style="width: 100%" v-model="formA.majorId" clearable @change="handleSelect" placeholder="请选择专业">
                        <el-option v-for="item in specialityList" :label="item.majorName" :value="item.majorId"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item>
                      <el-input v-model="formA.screenName" size="mini" placeholder="请输入自定义组件名称"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="4">
                    <el-form-item>
                      <el-button size="mini" type="info" style="background: $primary-color !important" @click="serhand">搜索</el-button>
                      <el-button size="mini" type="info" @click="resetClick('formA')">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <el-row :gutter="20">
              <el-col v-if="resultListlidi.length > 0" :span="6" style="margin-bottom: 10px" v-for="(itme, index) in resultListlidi" :key="index">
                <el-card :body-style="{ padding: '10px' }">
                  <el-image style="height: 160px; width: 100%; border-radius: 6px" :src="itme.screenMedium"></el-image>
                  <div style="height: 20px">
                    <div style="height: 20px; line-height: 20px">
                      <el-row :gutter="20">
                        <el-col :span="18">
                          <div style="height: 20px; font-size: 12px; overflow: hidden; text-overflow: ellipsis">
                            {{ itme.screenName }}
                          </div>
                          <!--                          <div style="text-align: center;font-size: 14px;color: #2D97E6;cursor: pointer">查看详情</div>-->
                        </el-col>
                        <el-col :span="6">
                          <div
                            v-if="itme.subscribeStatus == 0"
                            @click="addminge(itme)"
                            style="font-weight: 600; text-align: center; font-size: 12px; color: black; cursor: pointer"
                          >
                            订阅组件
                          </div>
                          <div
                            v-if="itme.subscribeStatus == 1"
                            @click="delminge(itme)"
                            style="font-weight: 600; text-align: center; font-size: 12px; color: red; cursor: pointer"
                          >
                            移除组件
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-card>
              </el-col>
              <div v-if="resultListlidi.length == 0" style="height: 100%; line-height: 50%; margin-top: 20%">
                <no-data title="暂无数据" size="25%"></no-data>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <div slot="footer" class="drawer-footer">
        <!-- <el-button type="primary" @click="submitClick('ruleForm','待提交')" class="submitBtn">保存</el-button>
<el-button type="success" @click="submitClick('ruleForm','待审核')" class="submitBtn">提交</el-button> -->
        <el-button @click="dialogTableVisibleshenheren = false">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import SystemSettingDialog from '@/views/components/digitalizationAbility/systemSettingDialog.vue';
import Vue from 'vue/dist/vue.esm.browser';
import axios from 'axios';
import { setTheme } from '@/utils/themeUtils';
import moment from 'moment';

Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;
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
import {
  getSystemList,
  searchHomePageConfig,
  updataHomePageConfig,
  getIp,
  updatePassword,
  updateUserSystemInfo,
  closeIp,
  searchUserSystemInfo,
} from '@/api/Grid';
import { searchVersionList } from '@/api/version';
import { GridLayout, GridItem } from 'vue-grid-layout';
import titleBar from '../components/menuTitle/index.vue';
import recentlyUsedMenus from './components/myMenu/index';
import messageDynamic from './components/messageCenter/index';
import keyPoints from './components/keyPoints/index';
import intelligentTools from '@/views/components/intelligentTools';
import reportForms from '@/views/components/reportForms';
import monitoringTasks from '@/views/components/monitoringTasks/index';
import digitalizationAbility from '@/views/components/digitalizationAbility';
import intelligentRecommendation from '@/views/components/intelligentRecommendation';
import wordCenter from '@/views/components/wordCenter';
import dataServer from '@/views/components/dataServer';
// 指标===========================================
// import addSystemMenu from "@/views/modules/keyPoints/addSystemMenu";
import addSystemMenu from '@/views/components/keyPoints/addSystemMenu/indexNew';

// import menuToggleDrawer from "./modules/keyPoints/addSystemMenu/menuDrawerContent/modules/menuToggleDrawer.vue";
import menuToggleDrawer from './components/keyPoints/addSystemMenu/menuDrawerContent/components/menuToggleDrawerNew.vue';
// import {searchToolsList} from "./modules/keyPoints/api.js";
import { searchToolsList } from '@/api/api.js';
import {
  serachDataTree,
  searchDataListcompanyIndicators,
  companyIndicatorssearchDataTree,
  searchImpactFactorList,
  searchQuotaMap,
} from './components/keyPoints/api/index.js';
//===========================================

//工具=====================================
import addSystemMenutool from '@/views/components/intelligentTools/addSystemMenu/indexNew';
//=========================================

// 菜单======================================
// import addSystemMenuMenu from "@/views/modules/myMenu/addSystemMenu";
import addSystemMenuMenu from '@/views/components/myMenu/addSystemMenu/indexNew';
import addDataServer from '@/views/components/dataServer/addSystemMenu/indexNew';
//=========================================
//报告=========================================
// import addReportDrawer from "@/views/modules/personalPanel/addReportDrawer.vue";
import addReportDrawer from '@/views/components/personalPanel/addReportDrawerNew';
//======================
//监测=============================
// import addMonitorDrawer from "@/views/modules/personalPanel/addMonitorDragwer.vue";
import addMonitorDrawer from '@/views/components/personalPanel/addMonitorDragwerNew';
//================================
//消息=============================
// import addMessageDrawer from "@/views/modules/messageCenter/modules/addMessageDrawer";
import addMessageDrawer from '@/views/components/messageCenter/components/addMessageDrawerNew';

//系统
// import subscribeSystemDrawer from "@/views/modules/digitalizationAbility/subscribeSystemDrawer";
import subscribeSystemDrawer from '@/views/components/digitalizationAbility/subscribeSystemDrawerNew';
import { searchDataTree, searchSubscribeSystemList } from '@/api/personalPanel';
import { searchMessageByUser } from '@/api/messageCenter';
import localHostAxjos from '@/utils/localhostAxjos';

import { addClientLog, heartbeat, saveSystemData, searchSystemData } from '@/api';
import { encrypt, listdecrypt } from '@/utils/crypto';
import { postaddUserMajorPost, postsearchAllowPopup, postsearchUserMajorPostList } from '@/api/newpost';

export default {
  components: {
    SystemSettingDialog,
    GridLayout,
    GridItem,
    titleBar,
    recentlyUsedMenus,
    messageDynamic,
    keyPoints,
    intelligentTools,
    reportForms,
    monitoringTasks,
    digitalizationAbility,
    addSystemMenu,
    menuToggleDrawer,
    addSystemMenutool,
    addSystemMenuMenu,
    addDataServer,
    addReportDrawer,
    addMonitorDrawer,
    addMessageDrawer,
    subscribeSystemDrawer,
    intelligentRecommendation,
    wordCenter,
    dataServer,
  },
  data() {
    return {
      sdfhsu: '',
      resultListlidi: [],
      commondgf: null,
      dynamicComponentStr: '',
      resultListtype: [],
      indextabf: 0,
      isdarkTheme: false,
      urling: '',
      dialogTableVisibleshenheren: false,

      versionVisible: false,
      localServerStatus: false, // 本地服务启动状态
      messMid: '',
      isPage: false,
      isPageMsg: true,
      isMsg: false,
      timerMsg: [],
      loading: null,
      loadingTime: null,
      loadingYX: null,
      timeTing: null,
      timer: null,
      timer1: null,
      //岗位弹窗
      dialogTableVisible: false,
      dutyDtoList: [],
      dutyDtoId: '',
      formLabelWidth: '110px',
      resultList: [],
      monitorList: [],
      systemSettingDialog: false,
      sysListTem: false,
      mutableSystemListChild: [],
      dialogMutable: [],
      factorNamelist: [],
      searchQuotaMaplist: [],
      searchQuotaListlist: [],
      isMarkShow: false,
      isdraggable: false,
      userInfo: {},
      title: '个人主页展示设置',
      list: [
        {
          name: '个人面板',
        },
        {
          name: '报告生成',
        },
        {
          name: '公司指标',
        },
        {
          name: '菜单系统',
        },
      ],
      menuShowin: false,
      rightMenuin: {},
      layout: [],
      layouts: [
        {
          h: 17,
          i: '0',
          w: 14,
          x: 5,
          y: 6,
          name: '业务监测',
          show: true,
          moved: false,
          height: 638,
        },
        {
          h: 9,
          i: '1',
          w: 5,
          x: 0,
          y: 7,
          name: '进入菜单',
          show: true,
          moved: false,
          height: 334,
        },
        {
          h: 7,
          i: '3',
          w: 5,
          x: 19,
          y: 0,
          name: '生成报告',
          show: true,
          moved: false,
          height: 258,
        },
        {
          h: 9,
          i: '4',
          w: 5,
          x: 19,
          y: 7,
          name: '智能工具',
          show: true,
          moved: false,
          height: 334,
        },
        {
          h: 7,
          i: '5',
          w: 5,
          x: 0,
          y: 0,
          name: '消息中心',
          show: true,
          moved: false,
          height: 258,
        },
        {
          h: 7,
          i: '6',
          w: 5,
          x: 19,
          y: 16,
          name: '进入系统',
          show: true,
          moved: false,
          height: 258,
        },
        {
          h: 14,
          i: '7',
          w: 5,
          x: 19,
          y: 23,
          name: '制度标准智能推荐',
          show: false,
          moved: false,
          height: 550,
        },
        {
          h: 6,
          i: '8',
          w: 14,
          x: 5,
          y: 0,
          name: '关注指标',
          show: true,
          moved: false,
          height: 220,
        },
        {
          h: 7,
          i: '9',
          w: 5,
          x: 19,
          y: 37,
          name: '文档中心',
          show: false,
          moved: false,
          height: 270,
        },
        {
          h: 7,
          i: '10',
          w: 5,
          x: 0,
          y: 16,
          name: '数据服务',
          show: true,
          moved: false,
          height: 270,
        },
        {
          h: '',
          i: 121,
          w: '',
          x: '',
          y: '',
          name: '自定义组件',
          show: true,
          moved: false,
          height: 270,
        },
      ],
      layoutshow: [
        {
          h: 17,
          i: '0',
          w: 14,
          x: 5,
          y: 6,
          name: '业务监测',
          show: true,
          moved: false,
          height: 638,
        },
        {
          h: 9,
          i: '1',
          w: 5,
          x: 0,
          y: 7,
          name: '进入菜单',
          show: true,
          moved: false,
          height: 334,
        },
        {
          h: 7,
          i: '3',
          w: 5,
          x: 19,
          y: 0,
          name: '生成报告',
          show: true,
          moved: false,
          height: 258,
        },
        {
          h: 9,
          i: '4',
          w: 5,
          x: 19,
          y: 7,
          name: '智能工具',
          show: true,
          moved: false,
          height: 334,
        },
        {
          h: 7,
          i: '5',
          w: 5,
          x: 0,
          y: 0,
          name: '消息中心',
          show: true,
          moved: false,
          height: 258,
        },
        {
          h: 7,
          i: '6',
          w: 5,
          x: 19,
          y: 16,
          name: '进入系统',
          show: true,
          moved: false,
          height: 258,
        },
        {
          h: 14,
          i: '7',
          w: 5,
          x: 19,
          y: 23,
          name: '制度标准智能推荐',
          show: false,
          moved: false,
          height: 550,
        },
        {
          h: 6,
          i: '8',
          w: 14,
          x: 5,
          y: 0,
          name: '关注指标',
          show: true,
          moved: false,
          height: 220,
        },
        {
          h: 7,
          i: '9',
          w: 5,
          x: 19,
          y: 37,
          name: '文档中心',
          show: false,
          moved: false,
          height: 270,
        },
        {
          h: 7,
          i: '10',
          w: 5,
          x: 0,
          y: 16,
          name: '数据服务',
          show: true,
          moved: false,
          height: 270,
        },
        {
          h: 7,
          i: '10',
          w: 5,
          x: 0,
          y: 16,
          name: '数据服务',
          show: true,
          moved: false,
          height: 270,
        },
        {
          h: '',
          i: 121,
          w: '',
          x: '',
          y: '',
          name: '自定义组件',
          show: true,
          moved: false,
          height: 270,
        },
      ],
      quboje: {},

      level: [],
      itmein: '',
      itmeinServer: '',
      itmeintool: '',
      itmeinmenu: '',
      itmeinreport: '',
      itmeinMonitor: '',
      itmeinMessage: '',
      styleon: '',
      styleontasks: '',
      styleonreport: '',
      styleonmessage: '',
      styleontools: '',
      styleonsys: '',
      itmeinability: '',
      isresizable: false,
      layoutUpdatedEventlist: [],
      mutableSystemList: [],
      tabList: [],
      subTabList: [],
      systemMessages: [],
      messageGropData: [],
      messageDynamicData: [],
      activeName: '',
      timerList: null,
      versionList: [],
      versionData: '',
      selectId: '',
      versionVisiblepost: false,
      ruleFormpost: {
        postId: '',
      },
      MajorPostlist: [],
      rulespost: {
        postId: [
          {
            required: true,
            message: '请选择专业岗位',
            trigger: 'blur',
          },
        ],
        postName: [
          {
            required: true,
            message: '请输入专业岗位',
            trigger: 'blur',
          },
        ],
      },
      laylist: [],
      locafcodess: null,
      specialityList: [],
      formA: {},
    };
  },

  async mounted() {
    // // this.urling = 'http://21.76.121.248:8080'   //测试
    // this.urling   = location.protocol + '//' + location.hostname +':8080'
    if (process.env.NODE_ENV == 'development') {
      this.urling = 'http://21.76.121.248:8080'; //测试
    } else {
      this.urling = location.protocol + '//' + location.hostname + ':8080';
    }
    // axios.get('http://21.76.121.174:8081/api/file/preview/278aa799eb7911ef8487fa163e6492a4/erteter/asds.html').then((res)=>{
    //   console.log(res.data,'888888888888888888')
    //   this.sdfhsu = res.data
    // })
    window.mac = this;
    this.getUserInfo();
    await this.getLocalServerState();
    this.searchUserSystemInfo();

    this.getIpByRealTime();
    this.getIpByRealTimes();
    // setTimeout(()=> {
    //   if(!localStorage.getItem("creatTableState")){
    //     this.createTable();
    //   } else {
    //     console.log("数据表已存在");
    //   }
    // },3000)
    this.checkTable();
    this.Getloistlsu();
    this.getMenuList();
    this.searchMessageByUsers();

    this.searchSystemStatus();
    //用来判定是否是否弹出账户密码弹窗，刷新首页初始化
    localStorage.setItem('showFlag', false);
    // sgBrowerserOpenPage(location.origin + "/#/monitorQueue");
    sgHideBrowerserOpenPage(location.origin + '/#/monitorQueue');

    document.addEventListener(
      'dragover',
      function (e) {
        mouseXY.x = e.clientX;
        mouseXY.y = e.clientY;
      },
      false,
    );
  },
  methods: {
    toogleTheme(val) {
      console.log(val);
      // const storedTheme = localStorage.getItem('theme')||'red';
      let newtheme = val;
      setTheme(newtheme);
      document.documentElement.setAttribute('data-theme', newtheme);
      localStorage.setItem('theme', newtheme);
    },
    resetClick(formName) {
      this.formA = {};
      this.comonoflist();
    },
    serhand() {
      this.comonoflist();
    },
    handleSelect() {
      this.comonoflist();
    },
    sdfnuewhreu(str) {
      try {
        const templateMatch = str.match(/<template>([\s\S]*?)<\/template>/i);
        const scriptMatch = str.match(/<script>([\s\S]*?)<\/script>/i);
        const styleMatch = str.match(/<style scoped>([\s\S]*?)<\/style>/i);
        const template = templateMatch ? templateMatch[1] : '';
        const script = scriptMatch ? scriptMatch[1] : '';
        const style = styleMatch ? styleMatch[1] : '';
        const scripts = script.replace(/export\s+default\s+/g, '');
        const scriptModule = new Function('return (' + scripts + ')')();
        const { render, staticRenderFns } = Vue.compile(template);
        const componentDefinition = {
          template,
          render,
          staticRenderFns,
          ...scriptModule,
        };

        const styleElement = document.createElement('style');
        styleElement.textContent = style;
        document.head.appendChild(styleElement);
        return Vue.extend(componentDefinition);
      } catch (e) {}
    },
    locafcode(code) {
      console.log(code);
      try {
        const com = defineAsyncComponent((code) => {
          return new Promise((resolve) => {
            const func = new Function('return' + code)();
            resolve(func);
          });
        });
        this.locafcodess = com;
      } catch (e) {}
    },

    //订阅
    addminge(itme) {
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
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem('userinfo')).authenticationInformation;
      axios
        .post(this.urling + '/finance/mysql/addDataList', {
          dataSource: 'mysql-operate',
          actionName: 'user_bacthAddUserScreen',
          data: [
            {
              userId: this.userInfo.userId,
              screenId: itme.screenId,
              x: (this.layout.length * 2) % (this.colNum || 2),
              y: this.layout.length + (this.colNum || 2), // puts it at the bottom
              w: 8,
              h: 8,
              i: itme.screenId,
              show: true,
              moved: false,
              height: 303,
              screenHeight: 303,
            },
          ],
        })
        .then((res) => {
          console.log(res);
          axios
            .post(this.urling + '/finance/mysql/searchDataList', {
              dataSource: 'mysql-operate',
              actionName: 'user_searchUserScreenList',
              data: {
                userId: this.userInfo.userId,
                subscribeStatus: 1,
                screenId: itme.screenId,
              },
            })
            .then((res) => {
              if (res.data.resultList.length > 0) {
                const infdg = this.layout.findIndex((item) => item.screenId === res.data.resultList[0].screenId);
                if (infdg === -1) {
                  this.layout.push(res.data.resultList[0]);
                  updataHomePageConfig({
                    userId: this.userInfo.userId,
                    jsonC: JSON.stringify(this.layout),
                  }).then((res) => {});
                }
              }

              this.comonoflist();
              this.Getloistlsu();
            });
          // this.addmodfg()
          // this.Getrhuoqu()

          // this.resultList = res.data.resultList
        });
    },
    Getloistlsu() {
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem('userinfo')).authenticationInformation;
      axios
        .post(this.urling + '/finance/mysql/searchDataList', {
          dataSource: 'mysql-operate',
          actionName: 'user_searchUserScreenList',
          data: {
            userId: this.userInfo.userId,
            subscribeStatus: 1,
          },
        })
        .then((res) => {
          this.laylist = res.data.resultList;
        });
    },
    Getrhuoqu(screenId) {
      var sdff = {};
      for (let i = 0; i < this.laylist.length; i++) {
        if (screenId == this.laylist[i].screenId) {
          sdff = this.laylist[i];
        }
      }
      return sdff.vueCode;
      //  axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      // var res = await  axios.post(this.urling+'/finance/mysql/searchDataList', {  "dataSource": "mysql-operate",
      //    "actionName": "user_searchUserScreenList",
      //    "data": {
      //      "userId":this.userInfo.userId,
      //      "subscribeStatus":1
      //    },
      //
      //  })
      //  sdgfs = res.data.resultList[0]
      // console.log(res.data.resultList[0],'=====')
      //  return sdgfs
      // .then((res) => {
      //   // alert(88)
      //   console.log(res.data,5555555555)
      //
      //   // this.resultList = res.data.resultList
      //   // this.layoutss  = res.data.resultList
      //   // this.index = this.layoutss.length + 1
      //   // this.layout = [ ...this.layout,...this.layoutss]
      //
      // })
    },
    //移除
    delminge(itme) {
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem('userinfo')).authenticationInformation;
      axios
        .post(this.urling + '/finance/mysql/deleteDataList', {
          dataSource: 'mysql-operate',
          actionName: 'user_bacthDeleteUserScreen',
          data: [
            {
              userId: this.userInfo.userId,
              screenId: itme.screenId,
            },
          ],
        })
        .then((res) => {
          // this.addmodfg()
          // this.Getrhuoqu()
          this.comonoflist();
          // this.layout.push(res.data.resultList[0])
          const infdg = this.layout.findIndex((item) => item.screenId === itme.screenId);
          if (infdg !== -1) {
            this.layout.splice(infdg, 1);
          }
          updataHomePageConfig({
            userId: this.userInfo.userId,
            jsonC: JSON.stringify(this.layout),
          }).then((res) => {});
          this.Getloistlsu();
        });
    },
    //组件添加弹框
    addmodfg() {
      this.dialogTableVisibleshenheren = true;
      this.indextabf = 0;
      this.Gettypeing();
      this.comonoflist();
    },
    tabing(itme, index) {
      this.indextabf = index;
      this.comonoflist(itme.screenTypeId);
    },
    //类型
    Gettypeing() {
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem('userinfo')).authenticationInformation;
      axios
        .post(this.urling + '/finance/mysql/searchDataList', {
          dataSource: 'mysql-operate',
          actionName: 'user_searchScreenTypeList',
          data: {},
        })
        .then((res) => {
          this.resultListtype = res.data.resultList;
          this.comonoflist();
        });
    },
    //组件列表
    comonoflist() {
      axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem('userinfo')).authenticationInformation;
      axios
        .post(this.urling + '/finance/mysql/searchDataList', {
          dataSource: 'mysql-operate',
          actionName: 'user_searchUserScreenList',
          data: {
            userId: this.userInfo.userId,
            screenTypeId: this.resultListtype[this.indextabf].screenTypeId,
            ...this.formA,
          },
        })
        .then((res) => {
          this.menuShowin = false; // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
          this.resultListlidi = res.data.resultList;
        });
      searchDataTree({
        actionName: 'searchMajorList',
        dataSource: 'mysql-operate',
        authenticationInformation: 'mal',
        idAttribute: 'majorId',
        parentIdAttribute: 'parentId',
      }).then((res) => {
        this.specialityList = res.resultList;
      });
    },
    //添加岗位
    GetUseridPost(userId) {
      postsearchAllowPopup(userId).then((res) => {
        // 如果需要弹出，并且县公司Id不为null
        if (res.data.flag === 1 && this.userInfo.countryId !== null) {
          this.versionVisiblepost = true;
        } else {
          this.versionVisiblepost = false;
        }
      });
    },
    //查询部门下面岗位
    GetpostaddUserMajorPost(xgsid) {
      postsearchUserMajorPostList(xgsid).then((res) => {
        console.log(res, '------------------------');
        this.MajorPostlist = res.resultList;
      });
    },
    //需求填报
    savexuqiu() {
      window.open('/tool/index.html');
      addClientLog({
        businessId: '',
        operateBy: this.$store.state.userInfo.userId,
        systemType: '',
        businessType: '需求填报',
        secondBusinessType: '需求填报',
        thirdBusinessType: '',
        logContent: '进入需求填报',
      }).then(() => {});
    },

    //提交岗位
    submitForms(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postaddUserMajorPost({
            ...this.ruleFormpost,
            userId: this.userInfo.userId,
          }).then(() => {
            this.GetUseridPost(this.userInfo.userId);
          });
        } else {
        }
      });
    },
    showMessage() {
      this.searchSystemStatus();
    },
    liClick(item) {
      this.versionData = item.description;
      this.selectId = item.id;
    },
    versionClick() {
      this.versionVisible = true;
      searchVersionList().then((res) => {
        this.versionList = res.resultList;
        if (this.versionList.length > 0) {
          this.versionData = this.versionList[0].description;
          this.selectId = this.versionList[0].id;
        }
        console.log(res, '版本列表');
      });
    },
    fallscreen() {
      let locationUrl = JSON.stringify(location.host);
      sgBrowerserOpenPage('http://' + location.host + '/#/largeScreen');
      addClientLog({
        businessType: '大屏看板',
        logContent: '大屏看板',
        operateBy: this.$store.state.userInfo.userId,
      }).then(() => {});
    },
    // 查询线上存储的用户订阅系统账号信息
    async searchUserSystemInfo() {
      searchUserSystemInfo({
        userId: this.$store.state.userInfo.userId,
      })
        .then((res) => {
          if (res.status === 200) {
            let systemList = res.data.systemInfo ? JSON.parse(listdecrypt(res.data.systemInfo, '12345678')) : [];
            // console.log('线上存储的用户订阅系统账号信息',systemList,'解密systemList')
            if (systemList.length > 0) {
              //  将线上同步到本地
              let arr = [];
              let arrNew = systemList.filter(
                (e) =>
                  e.Password !== '' &&
                  e.Password !== null &&
                  e.Password !== undefined &&
                  e.Account !== undefined &&
                  e.Account !== '' &&
                  e.Account !== null,
              );
              arrNew.forEach((item) => {
                arr.push({
                  SysID: item.systemId ? item.systemId : item.SysID,
                  SysName: item.systemName ? item.systemName : item.SysName,
                  Account: item.systemAccount ? item.systemAccount : item.Account,
                  Password: item.password ? item.password : item.Password,
                  UserName: item.userName ? item.userName : item.UserName,
                  UserID: item.userId ? item.userId : item.UserID,
                  IsRemind: item.IsRemind,
                });
              });

              // console.log(arr, "Account&&&&&&&&&&&&&");
              if (arr.length > 0) {
                saveSystemData(arr).then((res) => {
                  if (res.status === 200) {
                    this.$message.success('同步成功');
                    // 当本地启动的时候，开始执行自动登录
                    if (this.localServerStatus) {
                      console.log('开始自动登录');
                      let automaticLogon = JSON.parse(localStorage.getItem('automaticLogon'));
                      // console.log(automaticLogon, "automaticLogon");
                      if (automaticLogon == true) {
                        sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', `window.mac.getListIng('')`);
                      } else {
                        localStorage.setItem('automaticLogon', false);
                      }
                    } else {
                      let automaticLogon = JSON.parse(localStorage.getItem('automaticLogon'));
                      if (automaticLogon != true) localStorage.setItem('automaticLogon', false);
                    }
                  }
                });
              }
            } else {
              let automaticLogon = JSON.parse(localStorage.getItem('automaticLogon'));
              if (!automaticLogon) {
                localStorage.setItem('automaticLogon', false);
              } else {
                sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', `window.mac.getListIng('')`);
              }
            }
          }
        })
        .catch((error) => {
          console.error(error);
          this.$message.error('网络错误，请稍后再试');
        });
    },
    // 获取本地服务状态
    async getLocalServerState() {
      await getIp()
        .then((res) => {
          if (res.status === 200) {
            this.localServerStatus = true;
            // this.getsystemDataIndex();
          } else {
            this.localServerStatus = false;
            mac.isMessFlag();
          }
        })
        .catch(() => {
          this.localServerStatus = false;
          mac.isMessFlag();
        });
    },

    // 本地服务打开后执行建表语句
    // 创建短信日志 方法1
    async createTable1() {
      try {
        let str = 'CREATE TABLE message_logs(uuid TEXT PRIMARY KEY,time TEXT,type TEXT,content TEXT,status  TEXT);';
        let result = await exeSQL({
          sqlStr: str,
        });
        console.log(result, 'result====');
        localStorage.setItem('creatTableState', true);
      } catch (error) {
        console.log(error, '异常');
      }
    },
    // 这个方法用于判断表是否创建
    checkTable() {
      const creatTableState = localStorage.getItem('creatTableState');
      if (creatTableState) {
        console.log('数据表已存在');
      } else {
        this.createTable();
      }
    },
    // 动态建表
    createTable() {
      const params = {
        sqlStr: 'CREATE TABLE message_logs(uuid TEXT PRIMARY KEY,time TEXT,type TEXT,content TEXT,status  TEXT);',
      };
      axios
        .post('http://localhost:13313/configServices/exeSql', JSON.stringify(params), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res.data, '短信日志表创建成功====');
          localStorage.setItem('creatTableState', true);
        })
        .catch((err) => {
          console.log(err, '创建数据表失败');
        });
    },

    // 获取本地服务状态
    async closeLink() {
      if (this.localServerStatus == false) return;

      await closeIp()
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.localServerStatus = false;
          } else {
            this.localServerStatus = false;
          }
        })
        .catch(() => {
          // console.log(123);
          mac.isMessFlag();
          this.localServerStatus = false;
        });
    },

    //打开
    async openLink() {
      window.cas = function (path) {
        sgBrowerserOpenEXE(path);
        setTimeout(() => {
          sgHideBrowserRefreshPage(location.host + '/#/monitorQueue');
        }, 1000);
      };
      sgGetLocalServicePath('window.cas');
    },

    isMessFlag() {
      sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', 'window.mac.isMessFlag=false;mac.isMessage()');
    },
    async getLocalServerStateNew() {
      await getIp()
        .then((res) => {
          if (res.status === 200) {
            if (this.localServerStatus == false) {
              this.loadingClose();
            }
            this.localServerStatus = true;
            sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', 'mac.isMessageClose()');
          } else {
            if (this.localServerStatus == true) {
              mac.isMessFlag();
            }
            this.localServerStatus = false;
          }
        })
        .catch(() => {
          if (this.localServerStatus == false) {
            console.log('88');
          } else if (this.localServerStatus == true) {
            mac.isMessFlag();
          }
          this.localServerStatus = false;
        });
    },
    // 从本地服务获取系统账号信息
    async getsystemDataIndex() {
      await searchSystemData({
        UserID: mac.$store.state.userInfo.userId,
      }).then((res) => {
        // console.log(123123);
        if (res.status === 200) {
          if (res.data.length > 0) {
            let str = encrypt(JSON.stringify(res.data), '12345678');
            // console.log(str, "ffffffffffffffffffffffffffff");
            this.updateUserSystemInfo(str);
          }
        } else {
          mac.isMessFlag();
          this.$message({
            showClose: true,
            message: '请开启本地服务',
            type: 'warning',
          });
        }
      });
    },
    updateUserSystemInfo(data) {
      updateUserSystemInfo({
        userId: this.$store.state.userInfo.userId,
        systemInfo: data,
      })
        .then((res) => {
          if (res.status === 200) {
            console.log('存储本地服务系统信息成功');
            this.location();
          }
        })
        .catch((error) => {
          console.error(error);
          this.$message.error('网络错误，请稍后再试');
        });
    },
    getIpByRealTime() {
      this.timer = setInterval(() => {
        this.getLocalServerStateNew();
      }, 3000);
    },
    getIpByRealTimes() {
      this.timer = setInterval(() => {
        localHostAxjos({
          url: '/common/auth/heartbeat/' + JSON.parse(localStorage.getItem('userinfo')).userId,
          method: 'GET',
        });
      }, 30000);
    },

    clearPolling() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    clearPolling1() {
      if (this.timer1) {
        clearInterval(this.timer1);
        this.timer1 = null;
      }
    },
    dufgndurn(itme) {
      console.log(this.layout);
      var bel = false;
      for (let i = 0; this.layout.length > i; i++) {
        console.log(i);
        if (this.layout[i].i == itme.i) {
          bel = true;
          console.log(itme, 99999);
        }
      }
      return bel;
    },
    //一键进入菜单
    handleActiveUsedMenu(data, type) {
      let isPage = JSON.stringify(this.isPage);
      // if (type == 1) {
      //   isPage = true;
      // } else {
      //   isPage = false;
      // }
      isPage = true;
      console.log(data);
      data.SysID = data.systemId;
      data.actionName = 'updateMenuSubscriptionPost';
      this.loadingTwxt('.main-index-new');
      if (this.timeTing) {
        clearTimeout(this.timeTing);
        this.timeTing = null;
      }
      let list = JSON.stringify(data);
      let locationUrl = JSON.stringify(location.href);

      console.log(list);
      sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', `window.mac.getLogint(${isPage},${locationUrl},${list},false,'0')`);
    },
    //监测跳转
    handelMonitor(list, address) {
      let data = JSON.parse(list);
      console.log(data);
      data.actionName = 'updateUserMetric';
      list = JSON.stringify(data);
      this.loadingTwxt('.main-index-new');
      let sysIdFlag = false;
      let num = '0';
      let locationUrl = JSON.stringify(location.href);
      let isPages = true;
      let isPage = JSON.stringify(isPages);
      if (address) {
        sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', `window.mac.getLogint(${isPage},${locationUrl},${list},${sysIdFlag},${num})`);
      } else {
        this.loadingClose();
        this.$message.warning('登录系统失败,该地址为空!');
      }
    },
    //指标跳转
    handelPoint(data) {
      data.SysID = data.systemId;
      data.menuPath = data.path;
      let list = JSON.stringify(data);
      console.log(data);
      this.loadingTwxt('.main-index-new');
      let sysIdFlag = false;
      let num = '0';
      let locationUrl = JSON.stringify(location.href);
      let isPage = JSON.stringify(this.isPage);
      if (data.path) {
        sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', `window.mac.getLogint(${isPage},${locationUrl},${list},${sysIdFlag},${num})`);
      } else {
        this.loadingClose();
        this.$message.warning('登录系统失败,该地址为空!');
      }
    },
    // 获取邮件地址
    getEmailMessage(data) {
      data.mid = mac.messMid;
      let idDtat = JSON.stringify(data);
      sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', `window.mac.getEmailInfo(false,${idDtat})`);
    },
    // 点击消息跳转链接
    handelMessage(data) {
      mac.messMid = data.id;
      this.loadingTwxt('.main-index-new');
      if (this.timeTing) {
        clearTimeout(this.timeTing);
        this.timeTing = null;
      }
      let list = JSON.stringify(data);
      let locationUrl = JSON.stringify(location.href);
      let isPage = JSON.stringify(this.isPageMsg);
      // console.log(list, "********");
      // data.menuPath = data.menuPath
      if (data.menuPath) {
        sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', `window.mac.getLogint(${isPage},${locationUrl},${list},false,'0')`);
      } else {
        this.loadingClose();
        this.$message.warning('登录系统失败,该地址为空!');
      }
    },
    //切换岗位打开弹窗
    getDutyDto(row) {
      let loginUserInfo = row ? row : {};
      this.dutyDtoId = loginUserInfo.currentDuty;
      this.dutyDtoList = loginUserInfo.dutyDtoList;
      this.dialogTableVisible = true;
      this.loadClose();
    },
    // 切换岗位确认
    addDutyDto() {
      let list = JSON.stringify(this.dutyDtoId);
      this.loadingTwXY('.main-index-new');
      // setStorageCallback
      sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', `window.mac.setStorageCallback(${list})`);

      this.dialogTableVisible = false;
    },
    locationUrlClose(SysName) {
      let name = '【' + `${SysName}` + '】' + '正在自动登录，请稍等!';
      this.$message.success(name);
    },
    //开启loading
    loadingTwxt(params) {
      this.loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: '连接中', //显示在加载图标下方的加载文案
        background: 'rgba(0, 0, 0, 0.1)', //遮罩层颜色
        target: params,
      });
      mac.loadingTime = setTimeout(() => {
        this.$message.error('操作失败，请重新尝试!');
        sgHideBrowserRefreshPage(location.host + '/#/monitorQueue');
        mac.loadClose();
      }, 1000 * 40);
    },
    // 营销
    loadingTwXY(params) {
      this.loadingYX = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: '切换岗位中', //显示在加载图标下方的加载文案
        background: 'rgba(0, 0, 0, 0.1)', //遮罩层颜色
        target: params,
      });
    },
    loadClose() {
      if (this.loading) {
        this.loading.close();
        this.loading = null;
      }
      if (mac.loadingTime) {
        clearInterval(mac.loadingTime);
        mac.loadingTime = null;
      }
    },
    // 关闭loading
    loadingClose() {
      this.loadClose();
      this.location();
    },
    //营销岗位选择回调
    loadingCloseXY() {
      if (this.loadingYX) {
        this.loadingYX.close();
        this.loadingYX = null;
      }
      this.getMenuList();
      this.itmeinMonitor = new Date().getTime();
      this.itmeinability = new Date().getTime();
      this.location(false);
      this.getEmitUpdata();
      // this.getList();
    },
    loadingCloseTing(num) {
      console.log(num);
      if (num == '0') {
        this.$message.error('登录系统失败,请检查相关配置!');
      } else if (num == '1') {
        this.$message.error('本地服务未启动，请启动本地服务!');
      } else if (num == '2') {
        this.$message.error('登录系统失败,请检查系统配置!');
      } else if (num == '3') {
        this.$message.error('登陆超时,请重新登陆!');
      } else if (num == '4') {
        this.$message.error('未检测到跳转地址，请联系管理员!');
      } else if (num == '5') {
        this.$message.error('未监测到原系统TOKAN');
      }
      this.loadClose();
    },
    loadingCloseUrl() {
      this.$message.error('跳转地址为空,请检查相关配置!');
      this.location();
    },
    //初始化查询系统状态
    location(flag = false) {
      this.loadClose();
      let locationUrl = JSON.stringify(location.href);
      sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', `window.mac.getListIng(${locationUrl},${flag})`);
    },
    // 获取菜单数据
    getMenuList() {
      searchToolsList({
        authenticationInformation: '身份信息码',
        actionName: 'searchIndexMenuAtttentionList',
        dataSource: 'mysql-operate',
        data: {
          userId: JSON.parse(localStorage.getItem('userinfo')).userId,
        },
      }).then((res) => {
        if (res.status === 200) {
          if (res.data !== null) {
            // 检查res.data是否存在且res.data.system_json是否存在
            this.resultList = res.data.system_json ? JSON.parse(res.data.system_json) : [];

            if (this.resultList && this.resultList.length > 0) {
              this.resultList = this.resultList.filter((item) => item.systemId !== '1bd837b87cb011ef9020fa163e03d482');
              setTimeout(() => {
                this.getOpenStatemenu();
              });
            }
            console.log(this.resultList, '菜单');
          } else {
            this.resultList = [];
          }
        }
      });
    },

    // 获取消息数据
    searchMessageByUsers() {
      console.log('获取订阅的消息组件========');
      this.checkMessageComponents = [];
      this.tabList = [];
      this.subTabList = [];
      let params = {
        authenticationInformation: '身份信息码',
        actionName: 'searchMessageByUser',
        dataSource: 'mysql-operate',
        data: {
          // userId: "2e68a6281e6111ef818d00155d4a5a98",
          userId: this.$store.state.userInfo.userId,
          sourceName: this.searchValue,
        },
      };
      searchMessageByUser(params).then((res) => {
        if (res.status === 200) {
          this.systemMessages = [...res.resultList];
          this.systemMessages.forEach((item) => {
            let obj = {
              items: [],
              name: item.monitorName,
              label: item.monitorName,
            };
            this.tabList.push(obj);
            this.subTabList.push({
              items: [],
              name: item.monitorName,
              label: item.monitorName,
            });
            this.activeName = this.tabList.length > 0 ? this.tabList[0].name : '';
          });

          // 如果有订阅消息组件，则调用消息监测方法
          if (this.tabList.length > 0) {
            let arr = this.tabList.map((item) => item.name);
            if (this.isMsg) {
              // this.getCoopWithMessageList(arr);
              // this.getCoopWithMessageList();
            } else {
              return;
            }
          }
        }
      });
    },

    // 获取消息监测数据
    async getCoopWithMessageList(arrayType) {
      if (mac.timerList) {
        clearTimeout(mac.timerList);
        mac.timerList = null;
      }
      this.timerMsg = [];

      let sid;

      if (localStorage.getItem('isTokensNWYJObj')) {
        let localStr = localStorage.getItem('isTokensNWYJObj');
        localStr = JSON.parse(localStr);
        localStr = localStr.cookie;
        localStr = localStr.split(';');
        // 处理邮件信息地址
        for (let a = 0; a < localStr.length; a++) {
          if (localStr[a].indexOf('returnurl') > -1) {
            sid = localStr[a];
            sid = sid.split('=');
            sid = sid[0].trim();
          }
        }
        sid = sid.substr(9, sid.length);
      }
      for (let x of arrayType) {
        let getMsgList = localHostAxjos({
          url: 'http://localhost:13313/MsgOfFileCenter/Msg/getMsgListByType',
          method: 'POST',
          data: {
            type: x,
            userId: this.userInfo.userId,
          },
        });
        await getMsgList.then((res) => {
          if (res.status === 200) {
            console.log(res.data.length);
            res.data.map((item) => {
              item.datetime = moment(item.datetime).format('YYYY_MM_DD').replace(/\_/g, '-');
              if (item.type === '邮件') {
                item.menuPath = item.menuPath + '?' + 'sid=' + sid + '&mid=' + item.id;
              }
            });
            res.data.sort((a, b) => {
              if (a.isRead === '0' && b.isRead === '0') {
                return 0;
              }

              if (a.isRead === '0') {
                return -1;
              }

              if (b.isRead === '0') {
                return 1;
              }
              return 0;
            });
            this.messageDynamicData = [];
            res.data.forEach((x) => {
              const index = this.systemMessages.findIndex((y) => y.monitorName == x.type);
              if (index > -1) {
                this.messageDynamicData.push(x);
              }
            });

            // this.messageDynamicData = this.systemMessages;
            this.messageGropData = this.handelGroupBy(this.messageDynamicData, 'type');
            let newObj = Object.keys(this.messageGropData);
            let key = newObj.map((key) => {
              return key;
            });
            newObj.forEach((e) => {
              this.tabList.forEach((item) => {
                if (e === item.label) {
                  item.items = this.messageGropData[e];
                }
              });
            });
          }
        });
      }
      this.getDrawerStateubu();

      mac.timerList = setTimeout(() => {
        this.getCoopWithMessageList(arrayType);
      }, 5 * 1000);

      this.isMsg = false;
    },
    handelGroupBy(array, key) {
      return array.reduce((acc, item) => {
        if (!acc[item[key]]) {
          acc[item[key]] = [];
        }
        acc[item[key]].push(item);
        return acc;
      }, {});
    },
    //系统状态查询完返回

    loginStatusFlushObj(objList) {
      this.loadClose();
      this.monitorList = objList;
    },

    async loginStatusFlushed(objList) {
      console.log(objList, '系统状态查询完返回');

      if (objList && objList.length > 0) {
        this.loadClose();
        this.monitorList = objList;
        localStorage.setItem('subSystemList', JSON.stringify(objList));
        if (!this.monitorList) {
          this.isMsg = false;
          this.tabList = this.subTabList;
        } else {
          if (this.tabList.length > 0) {
            await this.searchMsg();
          } else {
            clearTimeout(mac.timerList);
            mac.timerList = null;
          }
        }
      }
    },
    searchMsg() {
      this.isMsg = true;
      let arr = [];
      let arr1 = [];
      let arr2 = [];
      // 判断协同是否登录 如果登录则查询监测到的协同消息
      arr = this.monitorList.filter((item) => item.systemId === 'da2bce3e645711ef8ff9fa163e5046d3' && item.isLine === true);
      console.log(arr);
      // 判断邮件是否登录 如果登录则查询监测到的协邮件消息
      arr1 = this.monitorList.filter((item) => item.systemId === '74c9ecde639e11ef8ff9fa163e5046d3' && item.isLine === true);
      console.log(arr1);
      // 判断文档中心是否登录 如果登录则查询监测到的文档件消息
      arr2 = this.monitorList.filter((item) => item.systemId === '3bd2ba5052fb11ef8ff9fa163e5046d3' && item.isLine === true);
      console.log(arr2);
      let arrayList = [];
      let tabs = this.tabList.map((item) => item.name);

      if (arr.length > 0 && tabs.includes('协同')) {
        arrayList.push('协同');
      } else {
        this.tabList = this.subTabList;
      }
      if (arr1.length > 0 && tabs.includes('邮件')) {
        arrayList.push('邮件');
      } else {
        this.tabList = this.subTabList;
      }
      if (arr2.length > 0 && tabs.includes('文档消息')) {
        arrayList.push('文档消息');
      } else {
        this.tabList = this.subTabList;
      }
      if (arrayList.length > 0) {
        this.getCoopWithMessageList(arrayList);
      }
    },

    GetsearchHomePageConfig() {
      searchHomePageConfig({
        userId: this.userInfo.userId,
      }).then((res) => {
        if (res.data != null) {
          this.layout = JSON.parse(res.data.jsonC).length > 0 ? JSON.parse(res.data.jsonC) : this.layouts;

          // for (let i = 0; i < this.layout.length; i++) {
          //   for (let j = 0; j < this.layoutshow.length; j++) {
          //     if (this.layoutshow[j].i == this.layout[i].i) {
          //       this.layoutshow[j].show = true;
          //     } else {
          //     }
          //   }
          // }
          // var djfig = false
          // for (let i = 0; i <  this.layout.length>i; i++) {
          //   if( this.layout[i].name!='数据服务'){
          //     djfig = true
          //   }
          // }
          const indedf = this.layout.some((element) => element.i == 121);
          if (!indedf) {
            this.layout.push({
              h: '',
              i: 121,
              w: '',
              x: '',
              y: '',
              name: '自定义组件',
              show: true,
              moved: false,
              height: 270,
            });
          }

          // {"h":7,"i":"10","w":5,"x":0,"y":16,"name":"数据服务","show":true,"moved":false,"height":270}
          if (this.valueObject(this.layout, '数据服务')) {
          } else {
            this.layout.push({
              h: 7,
              i: '10',
              w: 5,
              x: 0,
              y: 16,
              name: '数据服务',
              show: false,
              moved: false,
              height: 270,
            });
          }
        } else {
          this.layout = this.layouts;

          // for (let i = 0; i < this.layout.length; i++) {
          //   for (let j = 0; j < this.layoutshow.length; j++) {
          //     if (this.layoutshow[j].i == this.layout[i].i) {
          //       this.layoutshow[j].show = true;
          //     } else {
          //     }
          //   }
          // }
        }
        this.comonoflist();
        // this.Getrhuoqu()
      });
    },
    valueObject(arr, name) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == name) {
          return true;
        }
      }
      return false;
    },
    addData() {
      this.itmein = new Date().getTime();
      this.$refs.keyPointRef.getsearchToolsList();
    },
    getOpenState(val) {
      this.isMarkShow = val;
      this.$emit('get-draw-state', val);
    },
    // 打开指标详情弹窗
    openDraweruu(val) {
      this.isMarkShow = true;
      searchImpactFactorList({
        actionName: 'searchImpactFactorList',
        data: {
          quotaId: val.quotaId,
        },
      }).then((res) => {
        this.factorNamelist = {
          value: val,
          list: res.resultList,
        };
        this.$refs.menuToggleDrawer.handleDrawerVisibility(true);
      });

      searchQuotaMap({
        actionName: 'searchQuotaMap',
        data: {
          quotaId: val.quotaId,
        },
      }).then((res) => {
        this.searchQuotaMaplist = [res.data];
        this.searchQuotaMaplist.map((item) => {
          item.fs = val.fs;
        });
      });
      searchDataListcompanyIndicators({
        actionName: 'searchQuotaTaskList',
        data: {
          quotaId: val.quotaId,
        },
      }).then((res) => {
        this.searchQuotaListlist = res.resultList;
      });
    },

    //关闭
    coloe() {
      this.menuShowin = false;
      mac.getMenuList();
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
      let index = this.layout.findIndex((item) => item.name === '进入菜单' && item.show === true);
      if (index > -1) {
        this.getMenuList();
      }
      // localStorage.setItem("Grid", JSON.stringify(this.layoutUpdatedEventlist));
      // axios.post('http://localhost:13313/MonitorServices/addGridList',{
      //   id:this.userInfo.userId,
      //   json:JSON.stringify(this.layoutUpdatedEventlist)
      // }).then((res)=>{
      //   this.layout = JSON.parse(res.data[0].json)
      // })
      // var latout = []
      // var latouts = []
      // for (let i = 0; i < this.layoutUpdatedEventlist.length; i++) {
      //   if(this.layoutUpdatedEventlist[i].i>50000){
      //     latout.push({
      //       data: this.laylayoutUpdatedEventlistout[i],
      //       where:{
      //         userId:this.userInfo.userId,
      //         screenId: this.layoutUpdatedEventlist[i].screenId
      //       }
      //     })
      //   }else {
      //     latouts.push(this.layoutUpdatedEventlist[i])
      //   }
      // }
      updataHomePageConfig({
        userId: this.userInfo.userId,
        jsonC: JSON.stringify(this.layoutUpdatedEventlist),
      }).then((res) => {});

      // axios.defaults.headers.authenticationInformation = JSON.parse(localStorage.getItem("userinfo")).authenticationInformation
      // axios.post(this.urling+'/finance/mysql/updateDataList', {  "dataSource": "mysql-operate",
      //   "actionName": "user_bacthUpdateUserScreen",
      //   "data":latout,
      //
      // }).then((res) => {
      //   // this.resultList = res.data.resultList
      //
      // })
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
      const userInfo = localStorage.getItem('userinfo');
      if (userInfo) {
        try {
          this.userInfo = JSON.parse(userInfo);
          this.GetsearchHomePageConfig();
          this.$store.commit('setUserInfo', this.userInfo);
          this.GetUseridPost(this.userInfo.userId);
          if (this.userInfo.countryId !== null) this.GetpostaddUserMajorPost(this.userInfo.countryId);
        } catch (e) {
          console.error('解析localStorage中的用户信息失败', e);
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
      if (itme.i != 121) {
        for (var i = 0; this.layout.length > i; i++) {
          if (itme.i == this.layout[i].i) {
            this.layout[i].show = !itme.show;
          }
        }
      } else {
        this.dialogTableVisibleshenheren = true;
        this.indextabf = 0;
        this.Gettypeing();
        this.comonoflist();
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
        top: '30%',
        left: '40%',
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
    fooin() {
      // 取消鼠标监听事件 菜单栏
      this.menuShowin = false;
      document.removeEventListener('click', this.fooin); // 关掉监听，
    },
    //删除单元格
    removeItem: function (val) {
      const index = this.layout1.map((item) => item.i).indexOf(val);
      this.layout1.splice(index, 1);
    },
    drag: function (e) {
      let parentRect = document.getElementById('content').getBoundingClientRect();
      let mouseInGrid = false;
      if (mouseXY.x > parentRect.left && mouseXY.x < parentRect.right && mouseXY.y > parentRect.top && mouseXY.y < parentRect.bottom) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true && this.layout.findIndex((item) => item.i === 'drop') === -1) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.colNum || 12),
          y: this.layout.length + (this.colNum || 12), // puts it at the bottom
          w: 1,
          h: 1,
          i: 'drop',
        });
      }
      let index = this.layout.findIndex((item) => item.i === 'drop');
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'none';
        } catch {}
        let el = this.$refs.gridlayout.$children[index];
        el.dragging = {
          top: mouseXY.y - parentRect.top,
          left: mouseXY.x - parentRect.left,
        };
        let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
          DragPos.i = String(index);
          DragPos.x = this.layout[index].x;
          DragPos.y = this.layout[index].y;
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
          this.layout = this.layout.filter((obj) => obj.i !== 'drop');
        }
      }
    },
    dragend: function (e) {
      let parentRect = document.getElementById('content').getBoundingClientRect();
      let mouseInGrid = false;
      if (mouseXY.x > parentRect.left && mouseXY.x < parentRect.right && mouseXY.y > parentRect.top && mouseXY.y < parentRect.bottom) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true) {
        // alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
        this.layout = this.layout.filter((obj) => obj.i !== 'drop');
        //************ 添加到拖动的目标位置
        this.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: 1,
          h: 1,
          i: DragPos.i,
        });
        this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 1, 1);
        try {
          this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display = 'block';
        } catch {}
      }
    },
    //****************** GridLayout ************************
    //对应Vue生命周期的created
    layoutCreatedEvent: function (newLayout) {
      console.log('Created layout: ', newLayout);
    },
    //对应Vue生命周期的beforeMount
    layoutBeforeMountEvent: function (newLayout) {
      console.log('beforeMount layout: ', newLayout);
    },
    //对应Vue生命周期的mounted
    layoutMountedEvent: function (newLayout) {
      console.log('Mounted layout: ', newLayout);
    },
    //当完成mount中的所有操作时生成的事件
    layoutReadyEvent: function (newLayout) {
      console.log('Ready layout: ', newLayout);
    },
    //更新事件（布局更新或栅格元素的位置重新计算）
    layoutUpdatedEvent: function (newLayout) {
      console.log('Updated layout: ', newLayout);

      this.layoutUpdatedEventlist = newLayout;
    },
    //每次断点值由于窗口调整大小而改变
    breakpointChangedEvent: function (newBreakpoint, newLayout) {
      console.log('断点=', newBreakpoint, ', layout: ', newLayout);
    },
    //****************** GridItem ************************
    //单元格移动时的事件
    moveEvent: function (i, newX, newY) {
      console.log('移动中 i=' + i + ', X=' + newX + ', Y=' + newY);
    },
    //单元格调整大小时的事件
    resizeEvent: function (i, newH, newW, newHPx, newWPx) {
      console.log('调整大小中 i=' + i);
    },
    //单元格移动后的事件
    movedEvent: function (i, newX, newY) {
      console.log('移动完成 i=' + i);
    },
    //单元格调整大小后的事件
    resizedEvent: function (it, newH, newW, newHPx, newWPx) {
      console.log('调整大小完成 i=' + i, newH, newW, newHPx, newWPx);
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
      // console.log("容器大小改变了 i=" + i);
    },
    // 刷新订阅系统
    refreshSystem() {
      this.getSystemList();
    },
    // 工具
    addSystemMenuReftoolin() {
      this.$refs.addSystemMenuReftool.handleDrawerVisibility(true);
      this.refreshSystem();
    },
    //工具抽屉开关
    showDetail() {
      this.itmeintool = new Date().getTime();
      this.refreshSystem();
    },
    showSubscr() {
      this.getSubscribeDrawerState();
    },

    // 菜单
    addSystemMenuRefmenu() {
      this.$refs.addSystemMenuRefMenu.handleDrawerVisibility(true);
    },
    // 数据服务
    addDataServerRef() {
      this.$refs.addDataServerRef.handleDrawerVisibility(true);
    },
    getOpenStatemenu() {
      this.itmeinmenu = new Date().getTime();
      // this.getMenuList();
      // this.refreshSystem();
      // this.getSubscribeDrawerState();
    },
    // 添加、取消订阅时刷新数据
    addMenu() {
      this.getMenuList();
      this.getOpenStatemenu();
      // 刷新系统
      this.refreshSystem();
      this.getSubscribeDrawerState();
    },
    // 添加、取消订阅时刷新数据
    addDataServer() {
      this.itmeinServer = new Date().getTime();

      this.getMenuList();
      this.getOpenStatemenu();
      // 刷新系统
      this.refreshSystem();
      this.getSubscribeDrawerState();
    },
    // 消息抽屉关闭时刷新数据
    addMessage() {
      this.$nextTick(() => {
        this.searchMessageByUsers();
        this.getSystemList();
        this.refreshSystem();
        this.getSubscribeDrawerState();
      });
    },
    //报告
    addOrUpdateRefreport() {
      this.$refs.addOrUpdateRef.handleDrawerVisibility(true);
      this.refreshSystem();
    },
    //报告抽屉关闭时刷新状态
    getReportList() {
      this.itmeinreport = new Date().getTime();
      this.refreshSystem();
      this.getSubscribeDrawerState();
    },

    // 监测
    addMonitorRefMonitor() {
      this.isMarkShow = true;
      this.$refs.addMonitorRef.handleDrawerVisibility(true);
      this.$refs.addMonitorRef.getAllMonitorList();
      this.refreshSystem();
    },
    getList() {
      this.itmeinMonitor = new Date().getTime();
      this.refreshSystem();
      this.getSubscribeDrawerState();
    },

    //消息
    addMessageDrawerMessage() {
      this.$refs.addMessageDrawer.handleDrawerVisibility(true);
      this.refreshSystem();
    },
    getDrawerStateubu() {
      console.log('刷新消息');
      this.itmeinMessage = new Date().getTime();
    },

    // 系统
    addSystemMenuReftoolinability() {
      this.$emit('get-draw-state', true);
      this.$refs.subscribeSystemDrawer.handleDrawerVisibility(true);
    },
    getSystemList() {
      console.log('订阅');
      this.itmeinability = new Date().getTime();
    },
    // 系统登录池刷新
    getSubscribeDrawerState() {
      this.location(true);
      this.getEmitUpdata();
    },
    //添加检测项出发队列查询
    getEmitUpdata() {
      // isFlag true位消息监测查询 false为监测查询
      sgBrowserExcuteJsCode(location.host + '/#/monitorQueue', `window.mac.getMseeageList(true)`);
    },
    // 报告
    searchData() {},
    // 打开系统设置弹窗
    systemSetting(row) {
      let array = row;
      console.log(row, '已订阅的系统列表1');
      this.systemSettingDialog = true;
      // 查询本地服务
      this.$refs.systemSettingDialogRef.getsystemData(array);
    },
    // 获取系统
    searchSystemStatus() {
      let params = {
        authenticationInformation: '',
        actionName: 'searchAllSubscribeSystem',
        dataSource: 'mysql-operate',
        data: {
          userId: this.$store.state.userInfo.userId,
        },
      };
      searchSubscribeSystemList(params).then((res) => {
        if (res.status === 200) {
          this.mutableSystemList = res.resultList.map((item) => {
            item.SysID = item.systemId;
            item.isLine = false;
            item.loginURL = item.systemAddress;
            item.successURL = item.afterLoginAddress;
            item.jsCode = item.loginCommand;
            return item;
          });
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
      mac.loadingTwxt(parms);
    },
    loginCompletedLogin() {
      this.getSystemList();
    },
  },
  watch: {
    localServerStatus: {
      handler(val) {
        if (val) {
          sgBrowserCloseTextMessage('9f78dcf886e511ef9020fa163e03d482');
        }
      },
      deep: true,
    },
  },
  beforeDestroy() {
    this.clearPolling();
    this.clearPolling1();
  },
};
</script>

<style lang="scss" scoped>
// @use "@/assets/fonts/font.scss";
.selectv {
  color: $primary-color;
}

.version-dialog {
  ::v-deep .el-dialog__header {
    font-size: 20px !important;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      cursor: pointer;
    }
  }

  ::v-deep .el-dialog__body {
    padding-top: 0 !important;
  }

  .version-dialog-left {
    height: 500px;
    overflow-y: scroll;
  }

  .version-dialog-right {
    padding: 12px;
    display: flex;
  }
}

.main-index {
  padding: 20px;
  display: flex;
  height: 103vh;
  box-sizing: border-box;

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
  background: #e5faff;
  border: 1px solid #4ddbff;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
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
  height: 30px;
  line-height: 30px;
  width: 310px;
  font-size: 12px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 6px;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #fff;
  box-shadow: 0 2px 9px 1px hsla(0, 0%, 90%, 0.5);
  border-radius: 16px;
  border: 1px solid #e8e8e8;
}

.monitoring-tasks-module {
  .bottom-card-click {
    bottom: -30px !important;
  }
}

.cvhudter {
  border: 1px solid #21cec8;
  color: #21cec8;
}

.ijsdithert {
  height: 30px;
  line-height: 30px;
  width: 100px;
  text-align: center;
}

.nsfsfsdgg {
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
  //height: 122%;
  //width: 117%;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.mark-toggle-drawer {
  width: 100%;
  //height: 122%;
  background: #000000;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.2;
}

.main-index-new {
  background: #fff;
  height: 107vh;
  overflow-y: auto;

  .top-panel-box {
    width: 100%;
    height: 100px;
    //background: url("@/assets/banner.png") no-repeat;
    background: $background-color-bg;
    background-size: 100% 100px;
    margin: -3px 10px 3px 3px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    padding: 0 12px;

    .user-info {
      width: 55%;
      display: flex;
      justify-content: start;
      justify-items: center;
      vertical-align: middle;
      line-height: 120px;
      box-sizing: border-box;

      .avatar {
        width: 60px;
        height: 60px;

        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }

      .dfgudgdfgd {
        max-width: 45%;
        font-size: 28px;
        line-height: 100px;
        padding: 0 10px;
        color: $primary-color;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .dfgudgdfgsadd {
        max-width: 30%;
        font-size: 28px;
        line-height: 100px;
        padding: 0 10px;
        color: $primary-color;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .dashboard-btn {
        border-radius: 10px;

        span {
          display: inline-block;
          width: 100%;
          font-family:
            PingFangSC,
            PingFang SC;
          font-weight: 500;
          font-size: 14px;
          color: #ffffff;
          //text-align: center;
        }
      }

      .message {
        display: flex;
        line-height: 100px;

        span {
          display: inline-block;
        }

        .dfgudgdfgd {
          font-size: 28px;
          padding: 0 10px;
          color: $primary-color;
        }

        .dfgudgdfgsadd {
          font-size: 28px;
          padding: 0 10px;
          color: #333;
        }

        .dashboard-btn {
          border-radius: 10px;

          span {
            display: inline-block;
            width: 100%;
            font-family:
              PingFangSC,
              PingFang SC;
            font-weight: 500;
            font-size: 14px;
            color: #ffffff;
            //text-align: center;
          }
        }
      }
    }

    .local-server {
      width: 45%;
      line-height: 90px;
      text-align: center;

      span {
        font-family:
          PingFangSC,
          PingFang SC;
        font-weight: 500;
        font-size: 16px;
        color: #333333;
      }

      .close-link-btn {
        font-family:
          PingFangSC,
          PingFang SC;
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
  }
}

.acvitong {
  font-weight: 600;
  color: #ffffff;
  border: 1px solid #21cec8;
  background: #21cec8;
}

.el-switch__label {
  color: #ffffff !important;
}
</style>
