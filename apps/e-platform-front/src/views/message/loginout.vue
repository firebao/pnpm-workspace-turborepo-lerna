<template>
  <div>
    <div class="ppo">
      <div style="display: flex;">
        <div
          style="
            width: 55px;
            height: 55px;
            background: red;
            border-radius: 55px;
            margin: 20px 0 0 12px;
          "
        >
          <img
            style="height: 100%; width: 100%; border-radius: 55px"
            src="https://img1.baidu.com/it/u=2183059761,1776490817&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
          />
        </div>
        <div class="nsdfhuwe">
          <div class="mnam">
            {{ userinfo.userName }}
          </div>
          <div class="gon">
            {{ userinfo.departmentName }}
          </div>
          <div class="gw">
            <span class="textii">{{
              userinfo.postList.length > 0
                ? userinfo.postList[0].postName
                : "暂无"
            }}</span>
            <!-- <img
              style="margin-left: 8px"
              class="imgi"
              src="../../assets/img/q.png"
            /> -->
          </div>
        </div>
      </div>
      <div class="close-btn" @click="closePpo">
        <i class="el-icon-close"></i>
      </div>
      <div class="sdniuevc"></div>
      <div class="nuuvsdn">
        <div>
          <!-- <img class="img" src="../../assets/img/g.png" /> -->
          <span class="texti">弹框开启</span>
        </div>
        <div class="nsduett pointer">
          <div
            @click="openin(0)"
            class="nueuer"
            :class="{ niactiev: avtiveing == 0 }"
          >
            开启
          </div>
          <div
            @click="openin(1)"
            class="nueuer"
            :class="{ niactiev: avtiveing == 1 }"
          >
            关闭
          </div>
        </div>
      </div>

      <div class="nuuvsdnij">
        <div @click="loginout()" class="pointer">
          <!-- <img class="img" src="../../assets/img/t.png" /> -->
          <span class="texti">退出登录</span>
        </div>

        <div @click="updatePassword" class="pointer">
          <i class="el-icon-edit"></i>
          <span type="text" class="texti">修改密码</span>
        </div>
      </div>
    </div>
    <!--    修改密码弹窗  -->
    <!--    <update-password-dialog ref="updatePasswordRef"></update-password-dialog>-->
  </div>
</template>

<script>
import updatePasswordDialog from "@/views/components/Login/updatePassword";
export default {
  components: { updatePasswordDialog },
  data() {
    return {
      avtiveing: 1,
      userinfo: {},
    };
  },
  created() {
    console.log(JSON.parse(localStorage.getItem("userinfo")));
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
  },
  methods: {
    updatePassword() {
      // this.$refs.updatePasswordRef.dialogFormVisible = true;
      // sgBrowerserOpenMessage(
      sgBrowerserDialog(
        "800",
        "300",
        "500",
        "500",
        "http://" + window.location.host + "/#/updatePassword",
        "dialogCallBack"
      );
    },
    openin(val) {
      this.avtiveing = val;
      if (val == 0) {
        sgBrowerserOpenMessage(
          "http://" + window.location.host + "/#/message",
          "590",
          "750"
        );
      } else {
        sgBrowerserMessageClose();
      }
    },
    closePpo(){
      sgBrowerserHideUser();
    },
    loginout() {
      window.closaPageHide = function (urls) {
        const urlList = urls.split(";");
        for (let i in urlList) {
          sgHideBrowerserClosePage(urlList[i]);
        }
      };
      window.closaPage = function (urls) {
        const urlList = urls.split(";");
        for (let i in urlList) {
          sgBrowserClosePage(urlList[i]);
        }
        console.log(1);
        sgHideBrowerserGetUrls("window.closaPageHide");
      };

      localStorage.clear();
      sgBrowerserMessageClose();
      sgBrowerserLogout();
      sgBrowerserGetUrls("window.closaPage");
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
  height: 201px;
  width: 292px;
  background: #ffffff;
  position: relative;
}

.close-btn{
  position: absolute;
  top: 11px;
  right: 10px;
  cursor: pointer;
  font-size: 22px;
  font-weight: bolder;
  //color: $primary-color;
  &:hover{
    color: $primary-color;
  }
}

.nsdfhuwe {
  width: 190px;
  margin-top: 11px;
  margin-left: 16px;
}

.mnam {
  height: 22px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  line-height: 22px;
  text-align: left;
  font-style: normal;
}

.gon {
  width: 95%;
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gw {
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  text-align: left;
  font-style: normal;
}

.sdniuevc {
  width: 267px;
  height: 23px;
  border-bottom: 2px solid rgba(151, 151, 151, 0.1);
  margin: 0 auto;
}

.nuuvsdn {
  height: 49px;
  width: 267px;
  border-bottom: 2px solid rgba(151, 151, 151, 0.1);
  margin: 0 auto;
  display: flex;
  margin-left: 18px;
  justify-content: space-between;
}

.nuuvsdnij {
  height: 49px;
  width: 267px;
  margin: 0 auto;
  display: flex;
  margin-left: 18px;
  justify-content: space-between;
}

.img,
.texti {
  font-size: 14px !important;
  display: inline-block;
  vertical-align: middle;
  /* 使图片和文本垂直居中 */
}

.texti {
  font-size: 14px !important;
  line-height: 49px;
  margin-left: 8px;
  cursor: pointer;
  &:hover {
    color: $primary-color;
  }
}

.imgt,
.textit {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px !important;
  /* 使图片和文本垂直居中 */
}

.textit {
  font-size: 14px !important;
  margin-left: 8px;
}

.nsduett {
  cursor: pointer;
  height: 23px;
  width: 105px;
  border-radius: 4px;
  border: 2px solid $primary-color;
  margin-top: 14px;
  display: flex;
}

.nueuer {
  width: 50%;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: $primary-color;
  line-height: 23px;
  text-align: center;
  font-style: normal;
}

.niactiev {
  background-color: $primary-color;
  color: #ffffff;
}
</style>
