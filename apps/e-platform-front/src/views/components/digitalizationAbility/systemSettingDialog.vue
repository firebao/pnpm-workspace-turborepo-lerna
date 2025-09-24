<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="70%"
    height="80%"
    custom-class="cloundBadoy"
    :close-on-click-modal="false"
    :append-to-body="true"
    @close="handleClose"
  >
    <template #title>
      <span style="line-height: 24px; font-size: 18px; color: #303133"
        >系统信息配置</span
      >
      &emsp;&emsp;
      <span style="line-height: 24px; font-size: 18px; color: red"
        >请确保您订阅的系统账户密码设置正确，以保证系统贯通</span
      >
    </template>
    <div class="table-box">
      <el-table
        :data="systemDataList"
        style="width: 100%"
        :row-class-name="rowClassName"
        height="540"
      >
        <!-- <el-table-column label="单点登录" min-width="110" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.isUnifiedPermissionLogin"
              clearable
              placeholder="请选择"
              size="small"
              style="width: 80px"
              :disabled="!scope.row.isEditable"
            >
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column> -->
        <el-table-column
          label="系统名称"
          fixed
          min-width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <i class="el-icon-s-platform"></i>
            <span style="margin-left: 10px">{{ scope.row.systemName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否统一权限" min-width="110" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.isUnifiedPermissions === "1"
                ? "SSO统一权限"
                : scope.row.isUnifiedPermissions === "2"
                ? "ISCSSO统一权限"
                : "否"
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="系统描述"
          min-width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.systemDescription }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否掉线重连" min-width="110" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.IsRemind"
              clearable
              placeholder="请选择"
              size="small"
              style="width: 80px"
              :disabled="!scope.row.isEditable"
            >
              <el-option label="是" value="0"></el-option>
              <el-option label="否" value="1"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="系统账号"
          prop="systemAccount"
          min-width="160"
          align="center"
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-input
                v-model="scope.row.systemAccount"
                :disabled="!scope.row.isEditable"
                @blur="handleAccount(scope.row)"
                v-focus
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="password"
          label="系统密码"
          min-width="160"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              show-password
              v-model="scope.row.password"
              :disabled="!scope.row.isEditable"
              @blur="handleBlur(scope.row)"
              placeholder="关联密码请以 / 分割"
              v-focus
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="240" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              :disabled="!scope.row.systemAccount || !scope.row.password"
              @click="handleSave(scope.row)"
              >保存</el-button
            >
            <el-button
              size="mini"
              :disabled="!scope.row.isLine"
              @click="logOutAndLogin(scope.row)"
              >重新登录</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script>
import { saveSystemData, searchSystemData } from "@/api";
import { updateUserSystemInfo, searchDataMapsYS } from "@/api/Grid";
import { encrypt } from "@/utils/crypto";
export default {
  name: "systemSettingDialog",
  directives: {
    //注册一个局部的自定义指令 v-focus，输入框自动聚焦
    focus: {
      inserted: function (el) {
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      userId: this.$store.state.userInfo.userId,
      systemDataList: [],
      tabList: [],
    };
  },
  mounted() {
    window.mac = this;
    // this.searchUserSystemInfo()
  },
  methods: {
    //判断没有账户密码的系统class变更
    rowClassName({ row, rowIndex }) {
      if (!row.systemAccount || !row.password) return "red-row";
      return "";
    },
    //获取本地服务存储的账户密码
    getsystemData(data) {
      this.dialogVisible = true;
      console.log(data, "本地服务的数据=====");
      this.tabList = data;
      searchSystemData({
        UserID: mac.$store.state.userInfo.userId,
      }).then((res) => {
        if (res.status === 200) {
          //本地服务查询账户密码完成后与传入的系统账id匹配
          this.systemDataList = data.map((item) => {
            let result = res.data.find(
              (item1) => item1.SysID === item.systemId
            );
            // 给匹配成功的账户密码赋值
            if (result) {
              item.systemAccount = result.Account || result.systemAccount;
              item.password = result.Password || result.password;
              item.IsRemind = result.IsRemind || "0";
              item.isUnifiedPermissionLogin =
                item.isUnifiedPermissionLogin || "0";
            } else {
              item.systemAccount = "";
              item.password = "";
              item.IsRemind = "0";
              item.isUnifiedPermissionLogin = "0";
            }
            return {
              ...item,
              isEditable: false,
            };
          });
        } else {
          this.$message({
            showClose: true,
            message: "请开启本地服务",
            type: "warning",
          });
        }
      });
    },
    //编辑
    handleEdit(row) {
      // console.log(index, row, systemDataList);
      this.$set(row, "isEditable", true);
    },

    handleBlur(row) {
      row.setingFlag = false;
    },
    //保存
    handleSave(row) {
      // console.log(systemDataList,'systemDataList解密的账号信息')
      this.$set(row, "isEditable", false);
      let params = [
        {
          SysID: row.systemId,
          SysName: row.systemName,
          Account: row.systemAccount,
          Password: row.password,
          UserName: row.userName,
          UserID: row.userId,
          IsRemind: row.IsRemind,
        },
      ];
      saveSystemData(params).then((res) => {
        console.log(res, "ress");
      });
      let newArr = [];
      this.systemDataList.forEach((data) => {
        if (
          data.password !== "" &&
          data.password !== null &&
          data.password !== undefined &&
          data.systemAccount !== undefined &&
          data.systemAccount !== "" &&
          data.systemAccount !== null
        ) {
          newArr.push({
            SysID: data.systemId,
            SysName: data.systemName,
            Account: data.systemAccount,
            Password: data.password,
            UserName: data.userName,
            UserID: data.userId,
            IsRemind: data.IsRemind,
          });
        }
      });
      // console.log(newArr,'newArr解密的账号信息')
      // 对账号信息进行加密
      let str = encrypt(JSON.stringify(newArr), "12345678");
      this.updateUserSystemInfo(str);
      this.updataUserSystem(row);
    },

    // 将修改后的账号信息同步到服务器上
    updateUserSystemInfo(data) {
      // console.log(data,'加密后的信息')
      updateUserSystemInfo({
        userId: this.$store.state.userInfo.userId,
        systemInfo: data,
      })
        .then((res) => {
          if (res.status === 200) {
            // this.$message.success(res.message);
            console.log("同步系统信息成功");
            this.$emit("updateSystemInfoOnLine");
          }
        })
        .catch((error) => {
          console.error(error);
          this.$message.error("网络错误，请稍后再试");
        });
    },
    updataUserSystem(data) {
      searchDataMapsYS({
        data: {
          isUnifiedPermissionLogin: data.isUnifiedPermissionLogin,
          systemId: data.systemId,
          userId: this.$store.state.userInfo.userId,
        },
      }).then((res) => {
        console.log(res, "reeeeeeeeeee");
      });
    },
    logOutAndLogin(data) {
      this.$emit("loadingAnd", "cloundBadoy");
      let locationUrl = JSON.stringify(location.href);
      let list = JSON.stringify(data);
      sgBrowserExcuteJsCode(
        location.host + "/#/monitorQueue",
        `window.mac.logOutAndLogin(false,${locationUrl},${list},false,'1')`
      );
    },
    handleClose() {
      this.$emit("loginCompletedLogin");
      let loginCompleted = JSON.parse(localStorage.getItem("loginCompleted"));
      if (loginCompleted == false) localStorage.setItem("loginCompleted", true);
      sgBrowserExcuteJsCode(
        location.host + "/#/monitorQueue",
        "window.mac.getListIng()"
      );
    },
  },
};
</script>
<style scoped lang="scss">
.table-box {
  //max-height: 200px;
  //overflow-y: auto;
}
:deep(.el-input__inner) {
  border: 1px solid #e4e7ed !important;
  overflow: scroll;
}
:deep(.el-dialog__body) {
  padding: 10px 20px 24px 20px !important;
}
:deep(.cloundBadoy) {
  height: 70% !important;
  .el-dialog__body {
    height: 80%;
    overflow: scroll;
  }
}
:deep(.red-row) {
  color: red;
}
</style>
