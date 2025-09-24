<template>
  <div id="app">
    <!--    <div @click="sdfcjsofdjsdof">sdfsofsodfsdj</div>-->
    <!--    <router-view/>-->
    <router-view v-if="isRouterAlive"></router-view>
<!--    <div style="z-index: 999999;position: fixed;top: 0px">aswfdweqrwrwerwer</div>-->
  </div>
</template>
<script>
import {callOutLogin} from "@/api/audio";
import { setTheme } from "@/utils/themeUtils";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      shoe:false,
      isRouterAlive: true,
      userInfo: {},
      /*      defaultUserInfo: {
        account: "ceshi002",
        authenticationInformation: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImRlcGFydG1lbnROYW1lIjoi6L-Q57u06YOoIiwicGhvbmVOdW1iZXIiOiIxMzI1NTIxMjM2NSIsImRlcGFydG1lbnRJZCI6MSwidXNlck5hbWUiOiLmtYvor5UwMDIiLCJ1c2VySWQiOiI0NjJiYzEzYzJiZjUxMWVmOTc4MjAwMTU1ZGU0ZjY0NSIsImFjY291bnQiOiJjZXNoaTAwMiJ9fQ.BeKhuFXZx6ivvmu5XojbkvJAYpLUXwgj2Q5b5Lx7rbc",
        departmentId: 1,
        departmentName: "运维部",
        phoneNumber: "13255212365",
        postList: [],
        roleList: [],
        systemList: [],
        userId: "462bc13c2bf511ef978200155de4f645",
        userName: "测试002",
      }*/
    };
  },
  mounted() {
    this.getUserInfo();
    window.setTheme = setTheme;
    const storedTheme = localStorage.getItem('theme')||'red';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme',storedTheme)
    // window.document.documentElement.setAttribute("data-theme","light")
  },
  methods: {
    toogleTheme(newtheme){
      setTheme(newtheme);
      document.documentElement.setAttribute('data-theme',storedTheme)
      localStorage.setItem('theme',newtheme)

    },
    // sdfcjsofdjsdof(){
    //   this.shoe = !this.shoe
    //   if(this.shoe){
    //     window.document.documentElement.setAttribute("data-theme","dark")
    //   }else {
    //     window.document.documentElement.setAttribute("data-theme","light")
    //   }
    // },
    //  获取用户登录信息
    getUserInfo() {
      const userInfo = localStorage.getItem("userinfo");
      // console.log(localStorage.getItem("userinfo"), "登錄信息");
      if (userInfo) {
        try {
          this.userInfo = JSON.parse(userInfo);
          this.$store.commit("setUserInfo", this.userInfo);
        } catch (e) {
          console.error("解析localStorage中的用户信息失败", e);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
//@import "assets/theme/handle.scss";
:root {
  --primary-color: #a72621; // 定义 CSS 变量
}
body,
html {
  background: #f7f9fa;
  margin: 0;
  padding: 0;
  height: 100%;
}
//@media (max-width: 1600px) {
//  body{
//    width: 1600px;
//  }
//}
p {
  padding: 0;
  margin: 0;
}
.pointer {
  cursor: pointer;
}
.el-button--success{
  // background-color: $primary-color;
  //   border-color: $primary-color;
}
</style>
