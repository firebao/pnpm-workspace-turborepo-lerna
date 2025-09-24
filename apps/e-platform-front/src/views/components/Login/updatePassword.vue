<template>
<!--  <el-dialog title="修改密码" :visible.sync="dialogFormVisible"-->
<!--  :modal-append-to-body="false">-->

<!--  </el-dialog>-->
  <div class="update-psd">
    <menu-title :title="'修改密码'"></menu-title>
    <el-form :model="form" ref="ruleForm" style="margin-top: 16px;" :rules="rules" >
      <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassWord">
<!--        <el-input type="password" v-model="form.oldPassWord" autocomplete="off"></el-input>-->
        <el-input
            v-model="form.oldPassWord"
            type="password"
            show-password
            autocomplete="new-password"
            class="platform-home-login-input-password"
            @keyup.enter.native="submitForm('ruleForm')"
            placeholder="请输入原密码"
        >
          <template #prefix>
            <el-icon class="el-input-password"></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassWord" style="margin-top: 20px;">
<!--        <el-input type="password" v-model="form.newPassWord" autocomplete="off"></el-input>-->
        <el-input
            v-model="form.newPassWord"
            type="password"
            show-password
            autocomplete="new-password"
            class="platform-home-login-input-password"
            @keyup.enter.native="submitForm('ruleForm')"
            placeholder="请输入新密码"
        >
          <template #prefix>
            <el-icon class="el-input-password"></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="confirmNewPassword" style="margin-top: 20px;">
<!--        <el-input type="password" v-model="form.confirmNewPassword" autocomplete="off"></el-input>-->
        <el-input
            v-model="form.confirmNewPassword"
            type="password"
            show-password
            autocomplete="new-password"
            class="platform-home-login-input-password"
            @keyup.enter.native="submitForm('ruleForm')"
            placeholder="请确认新密码"
        >
          <template #prefix>
            <el-icon class="el-input-password"></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
<!--      <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--      <el-button @click="handleCancel">取 消</el-button>-->
      <el-button type="primary" @click="submitForm('ruleForm')" style="background-color: $primary-color; color: white">确 定</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {encrypt} from "@/utils/crypto";
import {updataHomePageConfig, updatePassword} from "@/api/Grid"; // 假设你已经配置了axios

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        oldPassWord: '',
        newPassWord: '',
        confirmNewPassword: ''
      },
      formLabelWidth: '100px',
      rules: {
        oldPassWord: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPassWord: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        confirmNewPassword: [{ required: true, message: "请再次输入新密码", trigger: "blur" }],
      },
    }
  },
  methods: {
    openDialog() {
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.newPassWord !== this.form.confirmNewPassword) {
            this.$message.error('新密码与确认新密码不一致');
            return
          }
          const encryptedOldPassword = encrypt(this.form.oldPassWord, "12345678");
          const encryptedNewPassword = encrypt(this.form.newPassWord, "12345678");
          updatePassword({
            userId: this.$store.state.userInfo.userId,
            oldPassWord: encryptedOldPassword,
            newPassWord: encryptedNewPassword
          }).then(res => {
            if (res.status === 200 && res.data.status === 1) {
              this.$message.success(res.data.message)
              this.dialogFormVisible = false;
              sgBrowerserMessageClose();
            } else {
              this.$message.error(res.data.message || '密码修改失败')
            }
          }).catch(error => {
            console.error(error)
            this.$message.error('网络错误，请稍后再试')
          })
        }
      })

    }
  }
}
</script>
<style lang="scss" scoped>
.update-psd{
  padding: 20px;
  position: relative;
  height: 400px;
  box-sizing: border-box;
  .dialog-footer{
    text-align: right;
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
}
</style>