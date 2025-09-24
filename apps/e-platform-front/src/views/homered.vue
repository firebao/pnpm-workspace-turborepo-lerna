<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box">
    <div>
      <div class="flex-row platform-home-banner flex-col">
        <div class="platform-home-login flex-col">
          <span class="platform-home-login-title">欢迎登录一平台</span>
          <span class="platform-home-login-title-en">WELCOME!</span>
<!--          <form  action="#" method="post">-->
<!--            <div class="required field ">-->
<!--              <label for="username">用户名或邮箱</label>-->
<!--              <input id="username" v-focus-me type="text" name="username"  v-model="username" autocomplete="on" autofocus required>-->
<!--            </div>-->

<!--            <div class="required field ">-->
<!--              <label for="password">密码</label>-->
<!--              <input id="password" name="password" type="password" v-model="password" autocomplete="on" required>-->
<!--            </div>-->
<!--            <button @click.prevent="sdfsfh" type="button">登录</button>-->
<!--          </form>-->

          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            :hide-required-asterisk="true"
            size="large"
          >
            <el-form-item prop="account">
              <el-input
                  id="username" name="username"  @click="focusin"  type="text"        auto-complete="off"
                v-model.trim="loginForm.account"
                class="platform-home-login-input-account"
                @keyup.enter.native="login('loginFormRef')"
              >
                <template #prefix>
                  <el-icon class="el-input-account"> </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input
                  id="password" name="password"  type="password"   auto-complete="off"
                v-model="loginForm.passWord"

                show-password
                class="platform-home-login-input-password"
                @keyup.enter.native="login('loginFormRef')"

              >
                <template #prefix>
                  <el-icon class="el-input-password"> </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <!--            <div class="platform-home-login-remember flex-row justify-between">
              <el-checkbox v-model="checked"></el-checkbox>
              <span class="platform-home-login-remember-password"
                >记住密码</span
              >
            </div>-->
            <el-form-item>
              <span
                class="platform-home-login-now flex-col"
                @click="login('loginFormRef')"
              >
                <span class="platform-home-login-now-button">立即登录</span>
              </span>
            </el-form-item>

            <!--            <el-form-item>-->
            <!--               <span-->
            <!--                   class="platform-home-update-psd flex-col"-->
            <!--                   @click="updatePassword('loginFormRef')"-->
            <!--               >-->
            <!--                <el-button type="text" style="padding: 0;text-align: center;color: $primary-color">修改密码</el-button>-->
            <!--              </span>-->

            <!--            </el-form-item>-->
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import "@/assets/js/css.js";
import {login, getMenus, getUserMenus, delMsgListByTypedel, addClientLog} from "@/api";
import { searchDataListlog } from "@/api/listlog";
//import getLocalStorageData from "@/assets/js";
import { encrypt } from "../utils/crypto.js";
import updatePasswordDialog from "@/views/components/Login/updatePassword";
import {callOutLogin, sendMessages} from "@/api/audio"
import axios from "axios";
import { setTheme } from "@/utils/themeUtils";
window.setTheme = setTheme;
export default {
  name: "homeIndex",
  components: { updatePasswordDialog },
  data() {
    return {
      username:'',
      password:'',
      dataBOM: [
        {
          name: "国网最新浏览器",
          url:
            process.env.VUE_APP_BASE_API_COMMON_FILE +
            "/localService/浏览器.msi",
          // url: "http://21.76.121.140:8802/localService/浏览器.msi",
        },
        {
          name: "国网浏览器Win7版本",
          url:
            process.env.VUE_APP_BASE_API_COMMON_FILE +
            "/localService/浏览器win7.msi",
        },
        {
          name: "VC++运行时",
          url:
            process.env.VUE_APP_BASE_API_COMMON_FILE +
            "/localService/VC_redist.x86.exe",
        },
        {
          name: "多核浏览器安装部署手册",
          url:
            process.env.VUE_APP_BASE_API_COMMON_FILE +
            "/localService/多核浏览器安装部署手册.pdf",
        },
        // {
        //   name: "本地服务",
        //   url: process.env.VUE_APP_BASE_API_COMMON_FILE + "/localService/本地服务.rar",
        // },
        {
          name: "node12版本",
          url:
            process.env.VUE_APP_BASE_API_COMMON_FILE +
            "/localService/node12.msi",
        },
      ],
      BOMshow: false,
      index: 0,
      loginForm: {
        account: "",
        passWord: "",
      },
      message: [
        {
          width: "800px",
          height: "470px",
          img: require("@/assets/images/message1.png"),
          title: "自定义聚合 消息一网打尽",
          content:
            "我们的消总中心支持自定义添加来自各个系统的消息，无论是业务消息，报表消息都能在这型一焖打尽。用户可以根据日己的糯求，灵活遠擇需要关注的消息源，确保不错过任何生要信总。",
        },
        {
          width: "260px",
          height: "470px",
          img: require("@/assets/images/message2.png"),
          title: "自定义聚合 消息一网打尽",
          content:
            "我们的消总中心支持自定义添加来自各个系统的消息，无论是业务消息，报表消息都能在这型一焖打尽。用户可以根据日己的糯求，灵活遠擇需要关注的消息源，确保不错过任何生要信总。",
        },
        {
          width: "260px",
          height: "470px",
          img: require("@/assets/images/message3.png"),
          title: "自定义聚合 消息一网打尽",
          content:
            "我们的消总中心支持自定义添加来自各个系统的消息，无论是业务消息，报表消息都能在这型一焖打尽。用户可以根据日己的糯求，灵活遠擇需要关注的消息源，确保不错过任何生要信总。",
        },
      ],
      loopData0: [
        {
          lanhuBg1: "rgba(39,168,163,1.000000)",
          //img: require("@/assets/images/Photoshop.png"),
          textTile: "配电失电",
        },
        {
          lanhuBg1: "rgba(0,82,217,0.000000)",
          // img: require("@/assets/images/Ai.png"),
          textTile: "抢修工单",
        },
        {
          lanhuBg1: "rgba(0,82,217,0.000000)",

          // img: require("@/assets/images/Ae.png"),
          textTile: "低电压故障",
        },
        {
          lanhuBg1: "rgba(0,82,217,0.000000)",
          // img: require("@/assets/images/Ai.png"),
          textTile: "非抢监测",
        },
        {
          lanhuBg1: "rgba(0,82,217,0.000000)",
          // img: require("@/assets/images/Ae.png"),
          textTile: "复电监测",
        },
        {
          lanhuBg1: "rgba(0,82,217,0.000000)",
          // img: require("@/assets/images/Ai.png"),
          textTile: "户表失电",
        },
        {
          lanhuBg1: "rgba(0,82,217,0.000000)",
          // img: require("@/assets/images/Ae.png"),
          textTile: "设备监测",
          lanhufontColor0: "rgba(61,72,93,1.000000)",
        },
        {
          // img: require("@/assets/images/Ai.png"),
          textTile: "故障明细",
        },
        {
          // img: require("@/assets/images/Ae.png"),
          textTile: "一键审核",
        },
        {
          // img: require("@/assets/images/Photoshop.png"),
          textTile: "日报导出",
        },
        {
          // img: require("@/assets/images/Ai.png"),
          textTile: "周报导出",
        },
        {
          // img: require("@/assets/images/Ae.png"),
          textTile: "月报导出",
        },
        {
          // img: require("@/assets/images/Photoshop.png"),
          textTile: "消防接报",
        },
        {
          // img: require("@/assets/images/Ai.png"),
          textTile: "自动补采",
        },
      ],
      painPot: [
        {
          // pain: require("@/assets/img/pain1.png"),
          // tool: require("@/assets/img/tool1.png"),
          text: "基层员工使用多个系统且系统菜单较多，操作繁琐",
        },
        {
          // pain: require("@/assets/img/pain2.png"),
          // tool: require("@/assets/img/tool2.png"),
          text: "基层员工获取信息需要多页面查询，操作不便",
        },
        {
          //pain: require("@/assets/img/pain3.png"),
          //tool: require("@/assets/img/tool3.png"),
          text: "基层员工业务分析统计报告编写较多，费时费力",
        },
        {
          //pain: require("@/assets/img/pain4.png"),
          //tool: require("@/assets/img/tool4.png"),
          text: "基层班组指标监测缺乏及时分析，影响指标提升",
        },
        {
          //pain: require("@/assets/img/pain5.png"),
          //tool: require("@/assets/img/tool5.png"),
          text: "基层员工存在部分系统重复操作，费时费力",
        },
        {
          //pain: require("@/assets/img/pain6.png"),
          //tool: require("@/assets/img/tool6.png"),
          text: "基层员工工作杂且多，现阶段消息提醒不足",
        },
      ],
      companyIndicators: [
        {
          title: "同业对标",
        },
        {
          title: "四横八纵",
        },
        {
          title: "企业负责人指标",
        },
      ],
      eightCapacity: [
        {
          // img: require("@/assets/images/capacity1.png"),
          title: "“千人千面”个性化能力",
          content:
            "针对不同层级的用户，由用户自定义所需的工作界面，实现千人千面。",
        },
        {
          //img: require("@/assets/images/capacity2.png"),
          title: "一键进入操作界面能力",
          content:
            '针对基层系统多，应用繁琐问题，让用户"一键“进入具体系统操作界面。',
        },
        {
          // img: require("@/assets/images/capacity3.png"),
          title: "跨系统数据贯通能力",
          content:
            "除支持数据中台取数外，针对消息、工单类数据支持从原系统‘秒级’取数。",
        },
        {
          // img: require("@/assets/images/capacity4.png"),
          title: "标准流程自动处理能力",
          content:
            "解决传统RPA单机版运行无法实现人机同时工作的问题，可实现多个自动化流程与人工作业在同台电脑上同时工作。",
        },
        {
          // img: require("@/assets/images/capacity5.png"),
          title: "多系统业务融合能力",
          content:
            "在不改变原系统的情况下，实现对原系统各种业务能方的调用、编排、协作。",
        },
        {
          // img: require("@/assets/images/capacity6.png"),
          title: "“数字化成果聚合能力",
          content:
            "实现企业级的各类数字化成果、人工智能能力的汇聚、分发、调用。",
        },
        {
          // img: require("@/assets/images/capacity7.png"),
          title: "应用低代码构建能力",
          content: "实现高效、快速的应用开发和迭代，显著提升业务响应速度。",
        },
        {
          // img: require("@/assets/images/capacity8.png"),
          title: "提供自主化运营能力",
          content:
            "可满足省、市、县、所不同层级的运营要求，由运营人员对权限范畴内数字化成果进行发布、应用分析等。",
        },
      ],
      messageList: [
        {
          sort: 1,
          title: "自定义聚合 消息一网打尽",
          content:
            "我们的消总中心支持自定义添加来自各个系统的消息，无论是业务消息，报表消息都能在这型一焖打尽。用户可以根据日己的糯求，灵活遠擇需要关注的消息源，确保不错过任何生要信总.",
          img: require("@/assets/images/message1.png"),
        },
        {
          sort: 2,
          title: "实时推送消息即时触达",
          content:
            "消息中心具备实时推送功能，一旦有新的消息产生，系统将立即推送至用户的消息中心，确保信息能够即时触达。",
          img: require("@/assets/images/message1.png"),
        },
        {
          sort: 3,
          title: "智能分类信息清晰有序",
          content:
            "为了帮助用户更好地管理消息，我们的消息中心提供了智能分类功能。让信息展示更加清晰有序。",
          img: require("@/assets/images/message1.png"),
        },
      ],
      isChildVisible: false,
      current: 0,
      constants: {},
      checked: false,
      menus: [],
      loginRules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      userInfo: {},
      homeUrl: null, // 默认首页的地址
    };
  },
  mounted() {
    this.getsearchDataListlog();

    getMenus().then((res) => {
      this.menus = res.resultList;
    });

    //判断token过期时间，免登录
    //  console.log(JSON.parse(localStorage.getItem("userinfo")).authenticationInformation)
    // if(JSON.parse(localStorage.getItem("userinfo")).authenticationInformation){
    //   this.$router.replace("/index");
    // }
    // setTimeout(()=>{
    //   const  username = document.getElementById('username')
    //   const password = document.getElementById('password')
    //   console.log(username)
    //   console.log(password)
    //   if(username){
    //
    //     this.loginForm.account = username.value
    //   }
    //   if(password){
    //     this.loginForm.passWord = password.value
    //   }
    // },100)
  },
  directives:{
    'focus-me':{
      inserted:function (el){
        el.focus();
        const event = new Event('input',{bubbles:true})
        el.dispatchEvent(event)
      }
    }
  },
  methods: {

    getsearchDataListlog() {
      searchDataListlog({
        authenticationInformation: "身份信息",
        actionName: "selectShareFile",
        dataSource: "mysql-operate",
        data: {},
      }).then((res) => {
        this.dataBOM = res.resultList;
      });
    },
    //配置
    updatePassper() {
      this.BOMshow = true;
    },
    // 下载
    dowen(url) {
      window.open(url);
    },
    handleMouseEnter(index) {
      if (index === 0) {
        this.index = 0;
        this.message[0].width = "800px";
        this.message[0].height = "470px";
        this.message[1].width = "260px";
        this.message[1].height = "470px";
        this.message[2].width = "260px";
        this.message[2].height = "470px";
      } else if (index === 1) {
        this.index = 1;
        this.message[0].width = "260px";
        this.message[0].height = "470px";
        this.message[1].width = "800px";
        this.message[1].height = "470px";
        this.message[2].width = "260px";
        this.message[2].height = "470px";
      } else if (index === 2) {
        this.index = 2;
        this.message[0].width = "260px";
        this.message[0].height = "470px";
        this.message[1].width = "260px";
        this.message[1].height = "470px";
        this.message[2].width = "800px";
        this.message[2].height = "470px";
      }
    },
    // hangidng(e){
    //   e.preventDefault()
    //   if(window.requestIdleCallback){
    //     window.requestIdleCallback(()=>{
    //       e.target.submit()
    //     })
    //   }
    // },
    focusin(event){
      // console.log(event.target.clientHeight
      // )
      SelectAccountFromJS("width:height:0:0")

    },
    login(formName) {

      this.$refs[formName].validate((valid) => {
        // RecFromJS(`username=${this.loginForm.account} password=${this.loginForm.passWord} ${window.location.href}`)
        if (valid) {
          /*          this.loginForm.passWord = encrypt(this.loginForm.passWord, "12345678")*/
          login({
            account: this.loginForm.account,
            passWord: encrypt(this.loginForm.passWord, "12345678"),
            clientFlag: "user"
          }).then((res) => {
            if (res.status === 200) {
              RecFromJS(`username~username=${this.loginForm.account} password~password=${this.loginForm.passWord} ${window.location.href}`)
              addClientLog({
                "businessType": "登录",
                "logContent": "用户登录",
                "operateBy": res.data.userId
              }).then(()=>{

              })
              localStorage.setItem("userinfo", JSON.stringify(res.data));
              console.log(res.data);
              // getMenus().then((res) => {
              //   this.menus = res.resultList;
              // });
              let obj = {
                appName: "业数融合一体化平台",
                userName: res.data.userName,
                orgName: res.data.departmentName,
                menus: this.menus,
              };
              getUserMenus(res.data.userId).then((r) => {
                try {
                  const settings = JSON.parse(r.data.personalSetting);
                  this.homeUrl = settings.personalSettings.homeUrl;
                  obj.appName = settings.basicSettings.platformName !== undefined ? settings.basicSettings.platformName  : '业数融合一体化平台';
                  localStorage.setItem(
                    "settingsInfo",
                    JSON.stringify(settings)
                  );

                  if (Array.isArray(settings.menuSettings))
                    obj.menus = settings.menuSettings;
                } catch (ex) {}
                this.setMenus(obj);
              });


            } else {
              this.$message({
                type: "error",
                message: res.message,
              });
            }
          });
          // delMsgListByTypedel({}).then(()=>{
          //
          // })
        } else {
          // delMsgListByTypedel({}).then(()=>{
          //
          // })
          console.log("error submit!!");
          return false;
        }
      });
    },
    updatePassword() {
      this.$refs.updatePasswordRef.dialogFormVisible = true;
    },
    setMenus(obj) {
      sgBrowerserLogin(JSON.stringify(obj));
      // sgBrowerserSetLogoImg(
      //   "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"
      // );
      sgBrowerserSetLogoImg(
        "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"
      );
      sgBroewserSetLeftcolor("#F4FBFA");
      sgBroewserSetTopcolor("#F4FBFA", "$primary-color");
      sgBrowerserOpenUser(
        "http://" + window.location.host + "/#/loginout",
        "292",
        "201"
      );
      this.getUserInfo();
    },
    //了解详情
    /*    goDetail() {
          document.getElementById('menu').scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth'
          })
          const local = localStorage.getItem('userinfo');
          console.log(local)
        },*/
    getUserInfo() {
      const userInfo = localStorage.getItem("userinfo");

      if (userInfo) {
        try {
          this.userInfo = JSON.parse(userInfo);
          this.$store.commit("setUserInfo", this.userInfo);
        } catch (e) {
          console.error("解析localStorage中的用户信息失败", e);
        }
      }
      console.log(this.$store.state.userInfo.userId, "****userid");
      if (process.env.NODE_ENV === "development") {
        this.$router.replace("/index");
      } else {
        if (this.homeUrl) {
          window.location.href = this.homeUrl;
        } else {
          this.$router.replace("/index");
        }
      }

      // sgHideBrowerserOpenPage(location.origin + "/#/monitorQueue");
    },
  },
};
</script>
<style scoped lang="scss">
.justify-end {
  display: flex;
  justify-content: flex-end;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.el-input-account {
  //background: url("@/assets/images/account.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 8px;
  margin-top: 10px;
  margin-right: 4px;
  width: 18px;
  height: 20px;
}

.el-input-password {
  //background: url("@/assets/images/password.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  margin-left: 8px;
  margin-right: 4px;
  width: 18px;
  height: 20px;
}

.platform-home-banner {
  //background-image: url("@/assets/images/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
  opacity: 0.8;

  .group_16 {
    margin-top: 130px;
    position: relative;
  }

  .platform-home-login {
    //background-image: url("@/assets/images/login.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 432px;
    width: 346px;
    top:50%;
    margin-top: -210px;
    position: absolute;
    right: 180px;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
    /*    background-color: rgba(255, 255, 255, 1);*/
    border-radius: 20px;

    .platform-home-login-title {
      width: 168px;
      height: 33px;
      overflow-wrap: break-word;
      color: rgba(2, 6, 43, 1);
      font-size: 24px;
      font-weight: normal;
      text-align: left;
      white-space: nowrap;
      line-height: 33px;
      margin: 27px 0 0 87px;
    }

    .platform-home-login-title-en {
      width: 82px;
      height: 24px;
      overflow-wrap: break-word;
      color: rgba(2, 6, 43, 1);
      font-size: 16px;
      font-family: Helvetica;
      font-weight: normal;
      text-align: left;
      white-space: nowrap;
      line-height: 23px;
      margin: 7px 0 0 130px;
    }

    .platform-home-login-input-account {
      width: 289px;
      height: 42px;
      margin: 37px 0 0 28px;
      background: rgba(255, 255, 255, 0.63);
      box-shadow: 0px 8px 17px 0px rgba(156, 156, 156, 0.08),
        0px 0px 0px 0px rgba(0, 0, 0, 0.1);
      border-radius: 20px;
    }

    .platform-home-login-input-password {
      width: 289px;
      height: 42px;
      margin: 0 0 0 28px;
      background: rgba(255, 255, 255, 0.63);
      box-shadow: 0px 8px 17px 0px rgba(156, 156, 156, 0.08),
        0px 0px 0px 0px rgba(0, 0, 0, 0.1);
      border-radius: 20px;
    }

    .platform-home-login-remember {
      width: 68px;
      height: 17px;
      margin: 19px 0 0 248px;
    }

    .platform-home-login-remember-password {
      width: 48px;
      height: 17px;
      overflow-wrap: break-word;
      color: rgba(155, 161, 183, 1);
      font-size: 12px;
      font-weight: normal;
      text-align: left;
      white-space: nowrap;
      line-height: 17px;
    }

    .platform-home-login-now {
      background-color: $primary-color;
      border-radius: 8px;
      height: 43px;
      width: 289px;
      //margin: 64px 28px 39px 29px;
      margin: 26px 28px 39px 29px;
      cursor: pointer;

      .platform-home-login-now-button {
        width: 56px;
        height: 20px;
        overflow-wrap: break-word;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        font-weight: normal;
        text-align: left;
        white-space: nowrap;
        line-height: 20px;
        margin: 12px 0 0 119px;
      }
    }
    .platform-home-update-psd {
      width: 100%;
    }
  }
}

.platform-home-operation {
  margin-top: 70px;
  height: 750px;

  .platform-home-operation-title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 32px;
    color: #2c3d63;
    line-height: 36px;
    font-style: normal;
    text-transform: none;
    margin: 40px auto 0 auto;
  }

  .platform-home-operation-comment {
    overflow-wrap: break-word;
    color: rgba(171, 182, 207, 1);
    font-size: 18px;
    font-weight: normal;
    white-space: nowrap;
    line-height: 40px;
    margin: 0 0 0 0;
    display: flex;
    justify-content: center;
  }

  .platform-login-flow-list {
    width: 100%;
    height: 400px;
    border-radius: 10px;
    border: 0px solid #979797;
    margin: 40px auto;

    .platform-login-flow-list-left {
      width: 50%;
      height: 100%;
      padding: 200px 100px 40px 320px;

      .platform-login-flow-list-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 24px;
        color: $primary-color;
        line-height: 33px;
        font-style: normal;
      }

      .platform-login-flow-list-content {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 22px;
        color: #333333;
        line-height: 31px;
        font-style: normal;
        margin-top: 20px;
      }
    }

    .platform-login-flow-list-right {
      width: 50%;
      height: 100%;
      padding: 0 255px 0 10px;

      img {
        width: 90%;
        height: 100%;
        margin-top: 70px;
      }
    }
  }
}

.platform-home-personal {
  position: relative;
  width: 100%;
  height: 800px;
  background: rgba(39, 168, 161, 0.1);
  border: 0px solid #979797;
  padding-top: 30px;

  .platform-login-personal-title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 30px;
    color: #2c3d63;
    line-height: 36px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin: 40px auto 0px auto;
  }

  .platform-login-personal-content {
    overflow-wrap: break-word;
    color: #abb6cf;
    font-size: 18px;
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    line-height: 22px;
    margin: 5px auto;
  }

  .platform-login-personal-list {
    display: flex;
    justify-content: center;
    margin-top: 40px;

    .platform-login-personal-list-left {
      width: 50%;
      height: 100%;
      padding: 50px 0 50px 300px;
    }

    .platform-login-personal-list-right {
      width: 50%;
      height: 100%;
      padding: 80px 300px 80px 80px;

      .platform-login-personal-list-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 24px;
        color: $primary-color;
        line-height: 33px;
        font-style: normal;
        margin-top: 30px;
      }

      .platform-login-personal-list-content {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 22px;
        color: #333333;
        line-height: 38px;
        font-style: normal;
        margin-top: 20px;
      }
    }
  }
}

.platform-six-pain {
  text-align: center;
  position: relative;
  width: 100%;
  height: 600px;
  margin-top: 130px;

  .text_six {
    width: 264px;
    height: 62px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 44px;
    color: #333333;
    line-height: 62px;
    text-align: left;
    font-style: normal;
  }

  .text_6 {
    overflow-wrap: break-word;
    color: #abb6cf;
    font-size: 18px;
    font-weight: normal;
    text-align: center;
    white-space: nowrap;
    line-height: 30px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .platform-login-eight-capacity {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    margin: 20px 30px 40px 30px;
    justify-content: start;

    .platform-login-eight-capacity-item {
      width: 423px;
      height: 298px;
      background: rgba(244, 244, 244, 0.73);
      box-shadow: 0px 2px 6px 0px #e7e7e7;
      border-radius: 20px;
      border: 1px solid rgba(151, 151, 151, 0.5);
      display: flex;
      align-items: center;
      padding: 40px 0 10px 0;
      margin: 16px;

      img {
      }

      .platform-login-eight-capacity-item-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 28px;
        color: #333333;
        line-height: 40px;
        text-align: left;
        font-style: normal;
        margin-top: 10px;
      }

      .platform-login-eight-capacity-item-content {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 22px;
        color: #666666;
        line-height: 30px;
        font-style: normal;
        margin: 10px 10px;
      }
    }
  }
}

.platform-login-menu {
  //background: url("@/assets/images/menu.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 800px;
  margin: 220px auto 60px auto;
  padding-top: 60px;

  .platform-login-menu-title {
    overflow-wrap: break-word;
    color: #ffffff;
    font-size: 30px;
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
    line-height: 36px;
    margin: 40px auto 0px auto;
  }

  .platform-login-menu-title2 {
    overflow-wrap: break-word;
    color: #ffffff;
    font-size: 18px;
    font-weight: normal;
    text-align: center;
    white-space: nowrap;
    line-height: 30px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .platform-login-menu-list {
    /*display: flex;
    justify-content: center;
    text-align: center;*/
    width: 1234px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    border: 0px solid #979797;
    margin: 50px auto;

    .platform-login-menu-list-left {
      width: 50%;
      height: 100%;
      padding: 160px 60px 40px 80px;

      .platform-login-menu-list-title {
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        font-size: 24px;
        color: $primary-color;
        line-height: 33px;
        font-style: normal;
      }

      .platform-login-menu-list-content {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 22px;
        color: #333333;
        line-height: 24px;
        font-style: normal;
        margin-top: 20px;
      }
    }

    .platform-login-menu-list-right {
      width: 50%;
      height: 100%;
      padding: 95px 60px 95px 10px;

      img {
        border-radius: 14px;
        width: 537px;
        height: 310px;
      }
    }

    .platform-login-menu-list-item:hover {
      background-color: rgba(80, 137, 250, 0.45);
    }
  }
}

.platform-home-message-center {
  padding-top: 60px;
  position: relative;

  .platform-home-message-center-title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 32px;
    color: #2c3d63;
    line-height: 36px;
    font-style: normal;
    text-transform: none;
    margin: 40px auto 0 auto;
  }

  .platform-home-message-center-content {
    height: 22px;
    overflow-wrap: break-word;
    color: rgba(171, 182, 207, 1);
    font-size: 18px;
    font-weight: normal;
    white-space: nowrap;
    line-height: 40px;
    display: flex;
    justify-content: center;
  }

  .platform-login-message-center-list {
    height: 580px;
    width: 100%;
    position: relative;
    left: 0;
    margin-top: 20px;

    .platform-login-message-center-list-content {
      background-color: rgba(255, 255, 255, 1);
      border-radius: 4px;
      width: 1320px;
      height: 470px;
      margin: 50px auto 0 auto;

      .message-center-list-item {
        background-color: $primary-color;
        /*transition: all 0.1s ease-in-out;*/
        transition: all 0.2s linear 0s;
      }

      .message-center-list-item1 {
        background-color: rgba(39, 168, 163, 0.7);
        transition: all 0.2s linear 0s;
      }

      .message-center-list-item2 {
        background-color: rgba(39, 168, 163, 0.5);
        transition: all 0.2s linear 0s;
      }
    }
  }
}

.pain {
  position: relative;
  margin-top: 40px;
  width: 315px;
  height: 628px;
  display: flex;
  justify-content: center;
}

.pain::before {
  content: "";
  position: absolute;
  width: 315px;
  height: 628px;
  background-color: rgba(0, 0, 0, 0.6);
  /* 使用 rgba() 为黑色添加透明度 */
}

.pain:hover::before {
  content: "";
  background: rgba(39, 168, 163, 0.8);
}

.tool {
  position: absolute;
  display: flex;
  width: 62px;
  height: 67px;
  margin-top: 170px;
}

.platform-home-system {
  margin-top: 10px;
  height: 680px;

  .platform-home-system-title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 32px;
    color: #2c3d63;
    line-height: 36px;
    font-style: normal;
    text-transform: none;
    margin: 40px auto 0 auto;
  }
}

.platform-pain-text {
  margin-top: 290px;
  position: absolute;
  text-align: center;
  width: 240px;
  height: 18px;
  overflow-wrap: break-word;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 20px;
  color: #ffffff;
  line-height: 27px;
  font-style: normal;
  -webkit-user-select: none;
  /*谷歌 /Chrome*/
  -moz-user-select: none;
  /*火狐/Firefox*/
  -ms-user-select: none;
  /*IE 10+*/
  user-select: none;
}

.platform-home-tools {
  margin-top: 50px;
  height: 440px;

  .platform-login-tools-title {
    height: 36px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 33px;
    color: #2c3d63;
    line-height: 36px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    display: flex;
    justify-content: center;
  }

  .platform-login-tools-title2 {
    height: 22px;
    overflow-wrap: break-word;
    color: rgba(171, 182, 207, 1);
    font-size: 18px;
    font-weight: normal;
    white-space: nowrap;
    line-height: 40px;
    display: flex;
    justify-content: center;
  }

  .platform-login-tools-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(2, 1fr);
    height: 260px;
    width: 1526px;
    margin: 50px 197px 0 197px;

    .platform-login-tools-list-item {
      position: relative;
      width: 218px;
      height: 108px;
      left: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      .platform-login-tools-list-item-content {
        position: relative;
        text-align: center;
        bottom: 10px;
        top: 0;
        width: 100px;
        height: 88px;
        display: flex;
        justify-content: center;

        img {
          position: absolute;
          width: 48px;
          height: 48px;
          margin: auto;
        }

        .platform-login-tools-list-item-title {
          overflow-wrap: break-word;
          font-size: 16px;
          position: absolute;
          bottom: 5px;
          text-align: center;
          width: 100%;
          text-transform: lowercase;
          font-family: PingFangSC, PingFang SC;
          font-weight: normal;
          white-space: nowrap;
          line-height: 24px;
        }

        .platform-login-tools-list-item-content-show {
          background: $primary-color;
          width: 160px;
          height: 4px;
          margin-top: 104px;
          border-radius: 2px;
        }
      }

      .platform-login-tools-list-item-content:hover #app {
        color: #2faaa5;
        font-size: 17px;
      }

      #show {
        display: none;
      }

      .platform-login-tools-list-item-content:hover #show {
        display: block;
      }
    }
  }
}

.platform-solution {
  position: relative;
  margin-top: 450px;
  width: 131px;
  height: 38px;
  border-radius: 21px;
  border: 1.5px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
  letter-spacing: 1px;
  font-style: normal;
  cursor: pointer;
}

.element-icon-rightIn {
  // background-image: url("@/assets/img/rightIn.png");
  background-repeat: no-repeat;
  width: 11px;
  height: 11px;
  position: relative;
  background-size: 100% 100%;
  margin-left: 8px;
}

.platform-express {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 18px;
  color: $primary-color;
  line-height: 25px;
  text-align: left;
  font-style: normal;
  position: absolute;
  margin-top: 150px;
  margin-left: 320px;
}

.element-icon-greenRight {
  //background-image: url("@/assets/images/green-arrow.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 29px;
  height: 13px;
  position: absolute;
  margin-top: 5px;
  margin-left: 10px;
}

.platform-home-companyIndicators {
  background-color: $primary-color;
  height: 920px;
  background-size: 100% 100%;
  width: 100%;
  left: 0;
  top: 50px;
}

.company-indicators-title {
  width: 630px;
  height: 50px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28px;
  color: #333333;
  line-height: 40px;
  text-align: left;
  font-style: normal;
}

.company-indicators-content {
  font-family: FZZYJW--GB1, FZZYJW--GB1;
  font-weight: normal;
  font-size: 36px;
  color: $primary-color;
  line-height: 41px;
  text-align: center;
  font-style: normal;
}

.platform-login-logo-text {
  margin: 6px 0 40px 0;

  .platform-login-logo-text-1 {
    font-family: FZZYJW--GB1, FZZYJW--GB1;
    font-weight: normal;
    font-size: 32px;
    color: $primary-color;
    line-height: 37px;
    text-align: right;
    font-style: normal;
  }

  .platform-login-logo-text-2 {
    font-family: FZZYJW--GB1, FZZYJW--GB1;
    font-weight: normal;
    font-size: 20px;
    color: #666666;
    line-height: 37px;
    text-align: right;
    font-style: normal;
  }
}

:deep(.el-input--prefix .el-input__inner) {
  padding-left: 40px !important;
}

:deep(.el-form-item__error) {
  left: 34px !important;
}

:deep(.el-input__inner) {
  background: rgba(231, 241, 253, 0.4);
  border-radius: 8px;
}

:deep(.el-form-item) {
  margin-bottom: 22px !important;
}

:deep(.el-input__inner) {
  background: rgba(231, 241, 253, 0.4);
  border-radius: 8px !important;
}
</style>
