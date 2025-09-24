<template>
  <div>
    <!--    展开状态-->
    <div class="ppo" v-show="showin == 0">
      <div style="height: 80px">
        <div style="margin-top: 36px; float: left">
          <div>
            <div style="display: flex" class="nusudfi pointer">
              <div
                  @click="clicktab(index)"
                  v-for="(i, index) in list"
                  class="snduebe"
                  :class="{ active: index == indextab }"
              >
                {{ i.title }}
                <div class="nsidweywom" v-if="messageDynamicData.length > 0 && index == 2">
                  {{ messageDynamicData.length }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="float: left; margin-top: 16px; margin-left: 19px">
          <!-- <img src="../../assets/img/l.png"/> -->
        </div>
        <div
            class="pointer"
            @click="close"
            style="
            width: 80px;
            float: right;
            margin-top: 22px;
            margin-left: 19px;
            margin-right: 18px;
          "
        >
          <!-- 	<span class="busdin" style="float: right;">收起</span>
				<img style="float: right;" src="../../assets/img/s.png" > -->
          <!-- <img class="img" src="../../assets/img/s.png"/> -->
          <span class="texti">收起</span>
        </div>
      </div>
      <div class="nnianduw" v-if="indextab === 0">
        <div v-if="searchDataMaplist.length > 0">
          <div v-for="i in searchDataMaplist" class="pointer">
            <div
                class="nieuwett"
                :style="{ background: i.systemIconColor }"
                @click.stop="concentParent(i)"
            >
              {{ i.systemName }}
            </div>
            <div class="nauabw" style="display: flex; flex-wrap: wrap">
              <div
                  class="fsinmin"
                  v-for="itme in i.menuList"
                  @click.stop="concentSystem(itme, false, '0')"
              >
                {{ itme.menuName }}
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <!-- <img class="minuevvin" src="./infg.png"/> -->
          <div class="divety">暂无菜单</div>
        </div>
      </div>
      <div class="nnianduw" v-if="indextab === 1">
        <div
            class="nauabwi pointer"
            style="display: flex; flex-wrap: wrap"
            v-if="resultListtolol.length > 0"
        >
          <div
              @click="startTool(i)"
              class="fsinmininf"
              v-for="i in resultListtolol"
          >
            <div style="height: 67px; width: 67px; border-radius: 12px">
              <img
                  :src="i.toolIcon"
                  style="width: 100%; height: 100%; border-radius: 12px"
              />
            </div>
            <div class="niuwbwe">
              {{ i.toolName }}
            </div>
            <div class="nbusbt">
              {{ i.typeName }}
            </div>
          </div>
        </div>
        <div v-else>
          <!-- <img class="minuevvin" src="./infg.png"/> -->
          <div class="divety">暂无工具</div>
        </div>
      </div>
      <div class="nnianduwxe" v-if="indextab === 2">


        <el-tabs v-model="activeName">
          <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.label" :name="item.name">
            <ul v-if="item.items.length > 0">
              <li v-for="(e, i) in item.items" :key="i" class="message-dynamic-item"
                  @click="handleCheckMsgInfo(e)">
                <div class="message-dynamic-item-content">
                  <div v-if="e.isRead === '0'" class="message-dynamic-item-content-icon"></div>
                  <!--              <span class="message-dynamic-item-content-name" :title="item.topic">-->
                  <!--                {{ item.topic }}-->
                  <!--              </span>-->
                  <span class="message-dynamic-item-content-desc" :title="e.subject">
                {{ e.subject }}
              </span>
<!--                  <span class="message-dynamic-item-date">-->
<!--                {{ e.datetime }}-->
<!--              </span>-->
                </div>
                <!--            <div class="message-dynamic-item-date">-->
                <!--              {{ item.occurrenceTime }}-->
                <!--            </div>-->
              </li>
            </ul>
            <div v-else>
              <!-- <img class="minuevvin" src="./infg.png"/> -->
              <div class="divety">暂无消息</div>
            </div>
          </el-tab-pane>
        </el-tabs>

      </div>
      <div class="nnianduwxe" v-if="indextab === 3">
        <!--        <div class="process-display">-->
        <!--          <div v-for="(info, index) in processInfos" :key="index" class="process-info">-->
        <!--            <p>{{ info.title }} - {{ info.desc }}</p>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="chat-container">
          <div class="messages-container">
            <ul class="messages">
              <li
                  v-for="(message, index) in messages"
                  :key="index"
                  :class="{
                  'user-message': message.type === 'user',
                  'system-message': message.type === 'system',
                }"
              >
                <div class="message-container">
                  <img
                      v-if="message.avatar"
                      :src="message.avatar"
                      alt="Avatar"
                      class="avatar"
                  />
                  <div class="message-content">
                    <!--              <span class="username">{{ message.from }}</span>-->
                    <div class="message-bubble">
                      <p>{{ message.content }}</p>
                      <div v-if="message.type === 'system'" class="btn-list">
                        <img v-if="!loadingStatus" :src="message.audioUrl ? voiceing : voice" alt="" style="width: 18px;height: 18px" @click="startAudio(message,index)" />
                        <i v-else class="el-icon-loading"></i>
<!--                        <audio :id="`audioRef_${index}`"  :ref="`audioRef_${index}`" preload="auto" controls style="height: 18px;">-->
                        <audio v-if="message.audioUrl"  :ref="`audioRef_${index}`" @ended="endPlay(message)"  controls style="height: 18px;">
                          <source :src="message.audioUrl" type="audio/wav">
                        </audio>
<!--                        <i class="el-icon-microphone"></i>-->
                      </div>
                    </div>
                    <div style="clear: both"></div>
                  </div>
                </div>
              </li>
              <li v-if="isLoading" class="loading-message">
                <div class="message-container">
                  <div class="message-content">
                    <div class="message-bubble">
                      <p>分析问题中...</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="input-container">
            <textarea
                id="myTextarea"
                v-model="inputMessage"
                @keyup.enter="sendMessage"
                rows="5"
                cols="50"
                placeholder="输入消息..."
            ></textarea>
            <!--      <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" placeholder="输入消息...">-->

            <button :disabled="isTalking"  @click="sendMessage">发送</button>
          </div>
        </div>
      </div>
    </div>
    <!--    收起状态-->
    <div v-show="showin == 1" style="height: 38px; width: 152px">
      <div class="nsnieyett pointer">
        <!-- <img
            style="float: left; margin-left: 20px; margin-top: 4px"
            src="../../assets/img/xx.png"
        /> -->
        <div v-if="messageDynamicData.length > 0" class="nsidweyw">{{messageDynamicData.length}}</div>
      </div>
      <div class="nsnieyette pointer" @click="open">
        <!-- <img
            style="float: left; margin-left: 10px; margin-top: 4px"
            src="../../assets/img/da.png"
        /> -->
        <div class="nsidhuerfs">展开</div>
      </div>
    </div>
    <el-dialog
        width="90%"
        ref="dialogref"
        id="table"
        title="切换岗位"
        :visible.sync="dialogTableVisible"
        :close-on-click-modal="false"
        :show-close="false"
    >
      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item
                label="切换岗位"
                prop="layerId"
                :label-width="formLabelWidth"
            >
              <el-select
                  ref="layerIdSelect"
                  v-model="dutyDtoId"
                  value-key="dutyId"
                  placeholder="请选择岗位"
              >
                <el-option
                    v-for="item in dutyDtoList"
                    :key="item.dutyId"
                    :label="item.dutyName"
                    :value="item"
                >
                </el-option>
              </el-select>
              <el-button
                  style="margin-left: 10px"
                  @click="dialogTableVisible = false"
              >取 消
              </el-button>
              <el-button
                  style="background: $primary-color; color: #ffffff"
                  @click="addDutyDto"
              >确 定
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {searchToolsList, searchDataMap} from "@/api/message";
import {chat} from "@/api/chat";
// import {voiceURLin} from "../../../public/url";
// import {AIQuestions} from "../../../public/url";
import axios from "axios";
import localHostAxjos from "@/utils/localhostAxjos";
import moment from "moment/moment";
import {searchMessageByUser} from "@/api/messageCenter";
const decoder  =  new TextDecoder('utf-8');
// const userUrl = require("@/assets/user-avator.webp");
// const sysUrl = require("@/assets/sys-avatar.webp");
// const voice = require("@/assets/voice.png");
// const voiceing = require("@/assets/voiceing.png");
export default {
  data() {
    return {
      voice: voice,
      voiceing: voiceing,
      sdhfushfsuf: '',
      dialogTableVisible: false,
      loadingStatus: false,
      dutyDtoList: [],
      messageDynamicData: [],
      dutyDtoId: "",
      formLabelWidth: "110px",
      showin: 0,
      indextab: 0,
      loading: null,
      timeTing: null,
      tabList: [],
      messageGropData: [],
      systemMessages: [],
      activeName: "",
      searchValue: "",
      list: [
        {
          title: "常用菜单",
        },
        {
          title: "常用工具",
        },
        {
          title: "消息中心",
        },
        {
          title: "百事通",
        },
      ],
      messages: [
        // 初始消息，包含头像
        {
          type: "system",
          from: "系统",
          avatar: sysUrl,
          content: "欢迎使用百事通！",
          audioUrl: null,
        },
        // 可以添加更多带有头像的用户消息
      ],
      audioUrl: null,
      inputMessage: "",
      isTalking: false,
      // 假设当前用户有一个头像
      currentUserAvatar: userUrl,

      resultListtolol: [],
      searchDataMaplist: [],
      userinfo: {},
      isLoading: false,
      isPage: false,
      isPageMsg: true,
      socket: null,
      retryCount: 0,

    };
  },
  computed: {
    lastMessage() {
      return this.messages[this.messages.length - 1];
    },
  },
  created() {
    window.mac = this;
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
  },
  async mounted() {
    await this.GetsearchDataMap();
    // await this.getCoopWithMessageList();
    this.searchMessageByUsers()
    this.location();
  },
  methods: {
    startTool(i) {
      sgBrowerserOpenPage(`http://${location.hostname}:24224/tool/` + i.toolId);
    },
    GetsearchToolsList() {
      searchToolsList({
        authenticationInformation: "身份信息码",
        actionName: "searchUserYesDescriptionToolList",
        dataSource: "mysql-operate",
        data: {
          isAttention: "1", //1关注，0未关注
          userId: JSON.parse(localStorage.getItem("userinfo")).userId, //传入userId
        },
      }).then((res) => {
        this.resultListtolol = res.resultList;
      });
    },
    // 消息
    searchMessageByUsers() {
      this.checkMessageComponents = [];
      this.tabList = [];
      let params = {
        authenticationInformation: "身份信息码",
        actionName: "searchMessageByUser",
        dataSource: "mysql-operate",
        data: {
          // userId: "2e68a6281e6111ef818d00155d4a5a98",
          userId: this.$store.state.userInfo.userId,
          sourceName: this.searchValue,
        },
      };
      searchMessageByUser(params).then((res) => {
        if (res.status === 200) {
          this.systemMessages = [...res.resultList];
          this.systemMessages.forEach(item=> {
            let obj = {
              items: [],
              name: item.monitorName,
              label: item.monitorName,
            }
            this.tabList.push(obj)
          })
          this.getCoopWithMessageList();
        }
      });
    },
    async getCoopWithMessageList() {
      let sid;
      if (localStorage.getItem('isTokensNWYJObj')) {
        let localStr = localStorage.getItem('isTokensNWYJObj')
        localStr = JSON.parse(localStr);
        localStr = localStr.cookie;
        localStr = localStr.split(';');

        for (let a = 0; a < localStr.length; a++) {
          if (localStr[a].indexOf('returnurl') > -1) {
            sid = localStr[a];
            sid = sid.split('=');
            sid = sid[0].trim();
          }
        }
        sid = sid.substr(9, sid.length);
      }

      let getMsgList = localHostAxjos({
        url: "http://localhost:13313/MsgOfFileCenter/Msg/getMsgList",
        method: "POST",
        // data: {
        //   type: ""
        // }
      });
      await getMsgList.then((res) => {
        if (res.status === 200) {
          // this.messageDynamicData = res.data;
          res.data.map(item => {
            item.datetime = moment(item.datetime).format('YYYY_MM_DD HH:mm:ss').replace(/\_/g, '-');
            if (item.type === '邮件') {
              item.menuPath = item.menuPath + '?' + 'sid=' + sid + '&mid=' + item.id;
            } else if (item.type === '协同') {
              item.menuPath = item.menuPath + '&DocId=' + item.id + '&DocDatabase=' + item.otherInfo;

            }
          })
          res.data.sort((a, b) => {
            if (a.isRead === "0" && b.isRead === "0") {
              return 0;
            }

            if (a.isRead === "0") {
              return -1;
            }

            if (b.isRead === "0") {
              return 1;
            }
            return 0;
          });

          this.messageDynamicData = []
          res.data.forEach((x) => {
            const index = this.systemMessages.findIndex(
                (y) => y.monitorName == x.type
            );
            if (index > -1) {
              this.messageDynamicData.push(x)
            }
          });

          // this.messageDynamicData = this.systemMessages;
          this.messageGropData = this.handelGroupBy(this.messageDynamicData, 'type')
          let newObj = Object.keys(this.messageGropData)
          newObj.forEach(e=> {
            this.tabList.forEach(item=> {
              if(e === item.label){
                item.items = this.messageGropData[e]
              }
            })
          })
          this.activeName = this.tabList.length > 0 ? this.tabList[0].name : '';
        }
      });
      setTimeout(() => {
        this.getCoopWithMessageList();
      }, 60 * 1000);
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
    // 点击消息跳转
    handleCheckMsgInfo(data) {
      // data.SysID = "3bd2ba5052fb11ef8ff9fa163e5046d3"; // 文档中心的系统id
      if (data && data.type === "文档协作") {
        data.SysID = "3bd2ba5052fb11ef8ff9fa163e5046d3"; // 文档中心的系统id
      } else if (data && data.type === "邮件") {
        data.SysID = "74c9ecde639e11ef8ff9fa163e5046d3"; // 邮件的系统id
      }
      this.loadingTwxt();
      if (this.timeTing) {
        clearTimeout(this.timeTing);
        this.timeTing = null;
      }
      let list = JSON.stringify(data);
      let locationUrl = JSON.stringify(location.href);
      let isPage = JSON.stringify(this.isPageMsg);
      console.log(list, "********");

      if (data.menuPath) {
        sgBrowserExcuteJsCode(
            location.host + "/#/monitorQueue",
            `window.mac.getLogint(${isPage},${locationUrl},${list},false,'0')`
        );
      } else {
        this.loadingClose();
        this.$message.warning("登录系统失败,该地址为空!");
      }
    },

    async GetsearchDataMap() {
      await searchDataMap({
        authenticationInformation:
        this.$store.state.userInfo.authenticationInformation,
        actionName: "searchSystemMenuList",
        dataSource: "mysql-operate",
        data: {
          userId: this.userinfo.userId,
        },
      }).then((res) => {
        if(res.data){
          this.searchDataMaplist = JSON.parse(res.data.system_json);
        }
        this.searchDataMaplist.map((i) => {
          i.successURL = i.afterLoginAddress;
          i.loginURL = i.systemAddress;
          i.jsCode = i.loginCommand;
          i.SysID = i.systemId;
          i.isLine = i.isLine ? i.isLine : false;
          i.menuList.forEach((t) => {
            t.successURL = i.afterLoginAddress;
            t.loginURL = i.systemAddress;
            t.jsCode = i.loginCommand;
            t.SysID = i.systemId;
            t.isLine = t.isLine ? t.isLine : false;
          });
        });
      });
    },
    close() {
      sgBrowerserMessageResize("152", "38");
      this.showin = 1;
      // sgBrowerserOpenMessage('file:///D:/project/cehngy/index.html','152','38');
      // sgBrowerserMessageClose()
    },
    clicktab(index) {
      this.indextab = index;
      if (index == 0) {
        this.GetsearchDataMap();
      } else if (index == 1) {
        this.GetsearchToolsList();
      } else if (index == 2) {
      }
    },
    open() {
      sgBrowerserMessageResize("590", "750");
      this.showin = 0;
    },
    concentParent(row) {
      mac.concentSystem(row, true, "2");
    },
    async concentSystem(data, sysIdFlag, num) {
      console.log(data);
      data.SysID = data.systemId;
      this.loadingTwxt();
      if (this.timeTing) {
        clearTimeout(this.timeTing);
        this.timeTing = null;
      }
      let list = JSON.stringify(data);
      let locationUrl = JSON.stringify(location.href);
      console.log(list);
      sgBrowserExcuteJsCode(
          location.host + "/#/monitorQueue",
          `window.mac.getLogint(true,${locationUrl},${list},${sysIdFlag},${num})`
      );
    },

    //开启loading
    loadingTwxt() {
      this.loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: "连接中", //显示在加载图标下方的加载文案
        background: "rgba(0, 0, 0, 0.1)", //遮罩层颜色
        target: ".platform-my-menu-index",
      });
    },
    getDutyDto(row) {
      let loginUserInfo = row ? row : {};
      console.log(loginUserInfo);
      this.dutyDtoId = loginUserInfo.currentDuty;
      this.dutyDtoList = loginUserInfo.dutyDtoList;
      this.dialogTableVisible = true;
      if (this.loading) {
        this.loading.close();
        this.loading = null;
      }
    },
    addDutyDto() {
      let list = JSON.stringify(this.dutyDtoId);
      this.loadingTwXY(".platform-my-menu-index");
      // setStorageCallback
      sgBrowserExcuteJsCode(
          location.host + "/#/monitorQueue",
          `window.mac.setStorageCallback(${list})`
      );

      this.dialogTableVisible = false;
    },
    loadingTwXY(parms) {
      this.loadingYX = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: "切换岗位中", //显示在加载图标下方的加载文案
        background: "rgba(0, 0, 0, 0.1)", //遮罩层颜色
        target: parms,
      });
    },
    // 关闭loading
    loadingClose() {
      this.location();
    },
    loadingCloseTing(num) {
      console.log(num);
      if (num == "0") {
        this.$message.error("登录系统失败,请检查相关配置!");
      } else if (num == "1") {
        this.$message.error("本地服务未启动，请启动本地服务!");
      } else if (num == "2") {
        this.$message.error("未匹配对应系统，请先订阅相关系统 !");
      } else if (num == "3") {
        this.$message.error("登陆超时,请重新登陆!");
      } else if (num == "4") {
        this.$message.error("未检测到跳转地址，请联系管理员!");
      }
      if (this.loading) {
        this.loading.close();
        this.loading = null;
      }
    },
    loadingCloseUrl() {
      this.$message.error("跳转地址为空,请检查相关配置!");
      this.location();
    },
    locationUrlClose() {
      if (this.loading) {
        this.loading.close();
        this.loading = null;
      }
      this.$message.error("采集2.0暂不支持跳转系统!");
    },
    loadingCloseXY() {
      if (this.loadingYX) {
        this.loadingYX.close();
        this.loadingYX = null;
      }
    },
    //初始化查询系统状态
    location() {
      if (this.loading) {
        this.loading.close();
        this.loading = null;
      }
      let locationUrl = JSON.stringify(location.href);
      this.$nextTick(() => {
        sgBrowserExcuteJsCode(
            location.host + "/#/monitorQueue",
            `window.mac.loginStatusTing(${locationUrl})`
        );
      });
    },
    //系统状态查询完返回
    async loginStatusFlushed(objList) {
      console.log(objList, "objListobjList");
      //循环我的系统列表与刷新状态数据匹配判断状态
      this.searchDataMaplist = this.searchDataMaplist.map((item) => {
        const matchingChild = objList.find((i) => i.systemId === item.systemId);
        if (matchingChild) {
          item.isLine = matchingChild.isLine;
          item.menuList.forEach((t) => {
            t.isLine = matchingChild.isLine;
          });
        }
        return item;
      });
    },
    async fetchWithTimeout(url, options, timeout = 600 * 1000) {
      return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        fetch(url, {
          ...options,
          signal: controller.signal
        })
            .then(response => {
              clearTimeout(id);
              resolve(response);
            })
            .catch(error => {
              clearTimeout(id);
              if (error.name === 'AbortError') {
                reject(new Error('请求超时'));
              } else {
                reject(error);
              }
            });
      });
    },
    // 百事通发送消息
    async sendMessage() {
      if (this.inputMessage.trim() !== "") {
        let ids = new Date().getTime()
        // 发送消息到messages数组，包含当前用户的头像
        this.messages.push({
          type: "user",
          from: "你",
          avatar: this.currentUserAvatar, // 使用当前用户的头像
          content: this.inputMessage,
          index:ids
        });
        this.messages.push({
          type: "system",
          from: "系统",
          avatar: sysUrl, // 或者设置一个系统默认的头像
          content: '',
          audioUrl: null,
          index:ids
        });
        this.callApiFromSystemReply1(ids);

        // 清空输入框
        this.inputMessage = "";
      }
    },
    async callApiFromSystemReply() {
      try {
        const apiUrl = "http://21.76.121.229:7861/chat/kb_chat";
        const params = {
          "query": this.inputMessage.replace(/\n$/,''),
          "mode": "local_kb",
          "kb_name": "rule",
          "top_k": 3,
          "score_threshold": 2,
          "stream": true,
          "model": "qwen1.5-chat",
          "temperature": 0.7,
          "max_tokens": 0,
          "prompt_name": "default",
          "return_direct": false
        }
        this.isLoading = true;
        const response = await this.fetchWithTimeout(apiUrl, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        });
        let systemReply = ''; // 用于系统回复的消息接受
        if (!response.body) return;
        const reader = response.body.pipeThrough((new TextDecoderStream())).getReader();
        while (true) {
          let {value, done} = await reader.read();
          // console.log(value,'value@@@@@@@@')

          if (done) {
            this.isLoading = false
            if (systemReply.length === 0)
              systemReply = '未检索到数据！！！'
            break;
          }
          // 将返回的字符串开头的"data: "去掉
          // const jsonData = value.replace(/data: /g,'');

          // 测试
          let jsonData = value.replace(/data: /g,',');
          jsonData = jsonData.substr(1, jsonData.length)
          jsonData = '[' + jsonData + ']';

          console.log(jsonData,'处理完的json数组字符串')
          try {
            let parseData = JSON.parse(jsonData);
            console.log(parseData,'处理前的json数组')
            parseData = parseData.filter(item  => item.docs === null || item.docs === undefined);
            console.log(parseData,'处理完的json数组')
            parseData.forEach((item, index) => {
              if(item && item.choices){
                systemReply += item.choices[0].delta.content
                this.isLoading = false
              }
            })

          } catch (e) {
            console.log("解析JSON字符串发生异常")
          }
        }
        this.messages.push({
          type: "system",
          from: "系统",
          avatar: sysUrl, // 或者设置一个系统默认的头像
          content: systemReply,
          audioUrl: null,
        });
        this.addSystemMessageWithTypingEffect(systemReply);

      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    async callApiFromSystemReply1(ids) {
      try {
        this.isTalking = true;
        const {body, status} = await chat(this.inputMessage)
        console.log(body,'body======')
        if(body){
          const reader = body.getReader();
          // const reader = body.pipeThrough((new TextDecoderStream())).getReader();
          console.log(reader,'reader====')
         await  this.readStream(reader, status, ids);
        }

      } catch (e) {
        console.log(e);
      }
    },
    async readStream(reader,status,ids){

      let partialLine = '';
      while (true){
        const {value, done} =  await reader.read();
        if(done) break;
        const decodeText = decoder.decode(value,{stream: true});
        console.log(decodeText,'decodeText===')
        if(status!==200){
          const json = JSON.parse(decodeText);
          const content = json.error.message || decodeText;
          console.log(content,'content===')
          this.appendLastMessageContent(content);
          return;
        }

        const chunk = partialLine + decodeText;
        const newLines = chunk.split(/\r?\n/);
        partialLine = newLines.pop() || "";

        for (const line of newLines){
          if(line.length === 0) continue;
          if(line.startsWith(':')) continue;
          if(line === "data: [DONE]") return;

          const json = JSON.parse(line.substring(6));
          const content = status ===200
          ? json.choices[0].delta.content || ""
              : json.error.messages;
          console.log('输出中。。。。。。。。')
          this.appendLastMessageContent(content,ids)
          console.log(content,'content=====')
        }

      }
      console.log('输出结束=====')
      this.isTalking = false
    },
    appendLastMessageContent(content,ids){
      if((this.messages[this.messages.length-1].index) === ids) {
        this.messages.map(item=> {
          if(item.index === ids &&　item.type === 'system') {
            item.content += content
          }
        })

        // (this.messages[this.messages.length-1].content += content)
      }
      // this.messages.push({
      //   type: "system",
      //   from: "系统",
      //   avatar: sysUrl, // 或者设置一个系统默认的头像
      //   content: content,
      //   audioUrl: null,
      // });
    },
    removeChars(str,data,val){
      return str.replace(new RegExp(data,'g'),val)
    },
    // 文字转语音
   async startAudio(message,index) {
      this.loadingStatus = true;
     const that = this
     try{
       let params = {
         audioText: message.content
       }
       // const response = await axios.post('http://21.76.121.229:18000/generate-audio-from-text', JSON.stringify(params),{
         const response = await axios.post("/audioText/generate-audio-from-text",JSON.stringify(params),{
         headers: {
           'Content-Type': 'application/json'
         },
         responseType: 'blob'
       });
       message.audioUrl = URL.createObjectURL(response.data); // 将文件流转为音频地址
       console.log( message.audioUrl)
       this.loadingStatus = false;
       that.$nextTick(() => {
         that.$refs[`audioRef_${index}`][0].load();
         let a =that.$refs[`audioRef_${index}`];
         try {
           a[0].play();
         } catch (e) {
           console.log(e)
         }
       });
       that.$forceUpdate();
       // let audio = document.getElementById(`audioRef_${index}`)
       // audio.play();
       // a.play()
     } catch (error) {
       console.error('文字转语音播放失败：', error)
     }

      // 检查浏览器是否支持Web speech API
      // if ('speechSynthesis' in window) {
      //   let msg = new SpeechSynthesisUtterance(content);
      //   msg.volume = 5; // 音量
      //   msg.rate = 1; // 语速
      //   msg.text = content; // 文字
      //   speechSynthesis.speak(msg); // 播放语音
      //
      // } else {
      //   console.log('浏览器不支持Web speech API')
      // }


    },
    endPlay(message){
      message.audioUrl = null
    },
    // 文字逐渐出现
    addSystemMessageWithTypingEffect(text) {
      let index = 0;
      const intervalId = setInterval(() => {
        index++;
        this.messages[this.messages.length - 1].content =
            text.substring(0, index) + (index < text.length ? "|" : "");

        if (index >= text.length) {
          clearInterval(intervalId);
          // 滚动到最新消息
          this.$nextTick(() => {
            this.scrollToLatestMessage();
          });
        }
      }, 50);
    },
    scrollToLatestMessage() {
      const messageContainer = document.querySelector(".messages-container");
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    },
  },
};
</script>
<style scoped lang="scss">
*,
html,
body {
  padding: 0;
  margin: 0;
}

.ppo {
  height: 730px;
  width: 590px;
  background: #fff;
  //background-image: url(../../assets/img/d.png);
  padding: 0 20px;
  box-sizing: border-box;
}

.snduebe {
  width: 64px;
  height: 36px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #828282;
  line-height: 36px;
  text-align: center;
  font-style: normal;
  margin-right: 26px;
}

.active {
  color: $primary-color;
  border-bottom: 3px solid $primary-color;
}

.nusudfi > div:nth-child(4) {
  margin-right: 0.0125rem !important;
}

.busdin {
  width: 30px;
  height: 17px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #333333;
  line-height: 17px;
  text-align: left;
  font-style: normal;
  padding-left: 11px;
}

.nnianduw {
  margin: 20px 34px;
  width: 530px;
  height: 630px;
  overflow: auto;
}

.nnianduwxe {
  /*margin: 20px 18px;*/
  width: 560px;
  height: 630px;
  overflow: auto;
  border-top: 2px solid rgba(151, 151, 151, 0.4);
}

.nieuwett {
  width: fit-content;
  border-radius: 5px;
  padding: 3px;
  color: #fff;
  text-align: center;
}

.nieuwettt {
  margin-top: 30px;
  width: 61px;
  height: 22px;
  background: #fc9610;
  border-radius: 5px;
  border: 1px solid #fc9610;
  color: #fff;
  text-align: center;
}

.fsinmin {
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #4f5470;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin: 2px 0 10px 0;
}

.nauabw > div {
  margin-right: 10px;
}

.fsinmininf {
  width: 69px;
  margin-bottom: 40px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #4f5470;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-right: 44px;
}

.nauabwi > div:nth-child(5n) {
  margin-right: 0px;
}

/* 自定义整个滚动条 */
::-webkit-scrollbar {
  width: 0px; /* 设置滚动条的宽度 */
}

/* 自定义滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* 设置轨道的背景颜色 */
}

/* 自定义滚动条的滑块（thumb） */
::-webkit-scrollbar-thumb {
  background: #21cec8; /* 设置滑块的背景颜色 */
}

/* 当滑块悬停或活动时，可以添加更多样式 */
::-webkit-scrollbar-thumb:hover {
  background: #555; /* 设置滑块在悬停状态下的背景颜色 */
}

.minuevvin {
  height: 314px;
  width: 299px;
  margin: 41px 100px 0 100px;
}

.divety {
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  text-align: center;
  font-style: normal;
}

.buting {
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 14px;
  color: $primary-color;
  line-height: 20px;
  text-align: center;
  font-style: normal;
}

.niuwbwe {
  width: 60px;
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  white-space: nowrap; /* 确保文本在一行内显示 */
  overflow: hidden; /* 隐藏超出容器的文本 */
}

.nbusbt {
  width: 64px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  background: #27a7a3;
  border-radius: 5px;
  border: 0px solid #979797;
}

.nseuber-sudbfus {
  padding: 14px 5px 11px 5px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.4);
  /*height: 88px;*/
}

.message-icon {
  width: 28px;
  height: 13px;
  //background: url("@/assets/images/newMessage.png") no-repeat;
  background-size: 100% 100%;
}

.finet {
  padding-left: 8px;
  /*width: 169px;*/
  height: 22px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 14px;
  color: #333333;
  line-height: 22px;
  text-align: left;
  font-style: normal;
  float: left;
  display: inline-block;
}

.nsudfs {
  display: inline-block;
  width: 61px;
  height: 22px;
  background: #21cec8;
  font-weight: 400;
  line-height: 22px;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #21cec8;
  float: left;
}

.fswei {
  width: 24px;
  height: 17px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #ff0000;
  line-height: 17px;
  text-align: left;
  font-style: normal;
  float: right;
}

.neron {
  float: left;
  padding-top: 9px;
  height: 34px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #666666;
  line-height: 18px;
  text-align: left;
  font-style: normal;
}

.timein {
  //height: 35px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #666666;
  line-height: 35px;
  text-align: right;
  font-style: normal;

  img {
    display: inline-block;
    vertical-align: middle;
  }

  span {
    display: inline-block;
  }
}

.nsnieyett {
  float: left;
  height: 24px;
  width: 71px;
  top: 8px;
  position: relative;
  border-right: 1px solid #979797;
}

.nsidweyw {
  margin-left: 7px;
  margin-top: 4px;
  float: left;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background: #ef1000;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 10px;
  color: #ffffff;
  line-height: 14px;
  text-align: center;
  font-style: normal;
}

.nsidweywom {
  position: relative;
  top: -35px;
  left: 61px;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background: #ef1000;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 10px;
  color: #ffffff;
  line-height: 14px;
  text-align: center;
  font-style: normal;
}

.nsnieyette {
  float: right;
  height: 24px;
  width: 71px;
  top: 8px;
  position: relative;
}

.nsidhuerfs {
  margin-top: 4px;
  margin-left: 8px;
  float: left;
  width: 24px;
  height: 17px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #333333;
  line-height: 17px;
  text-align: left;
  font-style: normal;
}

.img,
.texti {
  display: inline-block;
  vertical-align: middle; /* 使图片和文本垂直居中 */
}

.texti {
  font-size: 16px;
  line-height: 49px;
  margin-left: 8px;
}

/*百事通*/

.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 630px;
  padding: 10px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.message-content {
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
  max-width: 90%;
}

.message-content-me {
  align-self: flex-end;
  background-color: #00ff00;
}

.input-container {
  display: flex;
  margin-top: 10px;
  //height: 140px;
  #myTextarea{
    //caret-color: $primary-color;
    outline-color: #a9d3c8;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
  }
}

input {
  flex: 1;
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

button {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  background-color: $primary-color;
  color: white;
  cursor: pointer;
}

button:disabled {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  background-color: #ccc7c7;
  //color: white;
  cursor: not-allowed;
}

.message-content {
  display: inline-block; /* 允许内容并排显示 */
  vertical-align: middle; /* 与头像垂直居中 */
}

.messages-container {
  flex: 1; /* 占据剩余空间 */
  overflow-y: auto; /* 允许滚动 */
  /*height: 500px;*/
}

.messages li {
  width: 99%;
  padding: 5px;
  /*border-bottom: 1px solid #eee;*/
}

.user-message {
  color: $primary-color; /* 蓝色表示用户消息 */
}

.system-message {
  color: #000000; /* 黄色表示系统消息 */
}

.input-container {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa; /* 浅灰色背景 */
}

.input-container #myTextarea {
  flex: 1; /* 占据大部分空间 */
  margin-right: 10px;
  border: none; /* 移除边框 */
  resize: none; /* 禁止用户调整大小，可选 */
  /* 可以添加更多样式，如背景色、内边距等 */
  background-color: #f0f0f0; /* 示例背景色 */
  padding: 10px; /* 示例内边距 */
  font-size: 14px;
}

.input-container button {
  padding: 8px 16px;
}

.messages {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column; /* 垂直布局 */
  align-items: flex-start; /* 默认左对齐，但会根据子项样式调整 */
  overflow-x: hidden;
}

.message-container {
  display: flex;
  align-items: flex-start; /* 垂直居中对齐头像和消息内容 */
  margin-bottom: 10px;
}

.user-message .message-container {
  justify-content: flex-end; /* 用户消息右对齐 */
}

.system-message .message-container {
  justify-content: flex-start; /* 系统消息左对齐（其实是默认，但明确写出更好） */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 4px; /* 用户消息时头像在左边，需要右边距 */
  background-color: #ffffff;
}

.user-message .avatar {
  order: 2; /* 将头像移动到消息内容的右侧 */
  margin-right: 0;
  margin-left: 10px; /* 用户消息时头像在右边，需要左边距 */
}

.message-bubble {
  position: relative; /* 为伪元素定位提供基础 */
  padding: 10px;
  border-radius: 10px;
  max-width: 100% !important;
  word-wrap: break-word;
  /* 去除默认的底部外边距，因为我们有margin-bottom在.message-container上 */
  margin: 0;
  .btn-list{
    margin-top: 8px;
    display: flex;
    img{
      cursor: pointer;
    }

  }
}

.user-message .message-bubble {
  background-color: $primary-color;
  color: #ffffff;
  border: 1px solid #e4e4e4;
  margin-left: 22px; /* 留出箭头的空间 */
  float: right;
  margin-right: 4px;
}

.user-message .message-bubble::before {
  content: "";
  position: absolute;
  top: 10px; /* 箭头的顶部位置 */
  right: -8px; /* 箭头向右偏移，从气泡框外部开始 */
  width: 0;
  height: 0;
  border-top: 10px solid transparent; /* 箭头上部透明 */
  border-bottom: 10px solid transparent; /* 箭头下部透明 */
  border-left: 10px solid $primary-color; /* 箭头颜色与气泡框背景相同 */
}

.system-message .message-bubble {
  background-color: #FFFFFF;
  //border: 1px solid #f0f0f0;
  margin-right: 22px; /* 留出箭头的空间 */
}

.system-message .message-bubble::before {
  content: "";
  position: absolute;
  top: 10px; /* 箭头的顶部位置 */
  left: -8px; /* 箭头向左偏移，从气泡框外部开始 */
  width: 0;
  height: 0;
  border-top: 10px solid transparent; /* 箭头上部透明 */
  border-bottom: 10px solid transparent; /* 箭头下部透明 */
  border-right: 10px solid #FFFFFF; /* 箭头颜色与气泡框背景相同 */

}

ul {
  padding: 0;
  margin: 0;
}

.message-dynamic-item {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  border-bottom: 1px dashed #ccc7c7;

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
      margin-left: 4px;
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

      &:hover {
        color: #2d97e6;
      }
    }
  }

  .message-dynamic-item-date {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 12px;
    color: #666666;
    font-style: normal;
    line-height: 44px;
    width: 36%;
    white-space: nowrap;
    text-align: right;
    display: inline-block;
    float: right;
  }
}

:deep(.el-tabs__item) {
  //color: $primary-color !important;
  &:hover {
    color: $primary-color !important;
  }

}

:deep(.el-tabs__item.is-active) {
  color: $primary-color !important;
}

:deep(.el-tabs__active-bar) {
  background-color: $primary-color !important;
}
</style>
