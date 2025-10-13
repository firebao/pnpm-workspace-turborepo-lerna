<!--
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-06-11 11:48:28
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-09-24 14:29:04
 * @Description : 登录页面
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
-->
<template>
  <div class="page-login">
    <canvas id="canvas-webgl" ref="canvasRef"></canvas>
    <div class="login-container col row">
      <q-form
        greedy
        class="form-login"
        @submit="onSubmit"
        @reset="onReset"
      >
        <div class="text-h5 text-teal-10 text-weight-bold text-center q-my-md full-width font-pingfang1 login-title">
          孪生场景管理平台登录
        </div>

        <q-input
          v-model="form.username"
          outlined
          color="teal-10"
          label-color="teal-10"
          label="用户名"
          lazy-rules
          class="q-mb-md"
          :rules="rules.username"
        >
          <template #prepend>
            <q-icon class="icon" name="perm_identity" color="teal-10" />
          </template>
        </q-input>

        <q-input
          v-model="form.password"
          outlined
          color="teal-10"
          label-color="teal-10"
          label="密码"
          lazy-rules
          type="password"
          class="q-mb-md"
          :rules="rules.password"
        >
          <template #prepend>
            <q-icon class="icon" name="lock" color="teal-10" />
          </template>
        </q-input>

        <div class="q-pb-lg">
          <q-btn
            class="btn-submit full-width no-outline text-h6"
            color="teal-10"
            label="登录"
            type="submit"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from 'src/stores/index'
import initThreeScene from 'src/common/three/init'
import type { ThemeConfig } from 'src/types/theme'

const $router = useRouter()
const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (canvasRef.value) {
    initThreeScene(canvasRef.value)
  } else {
    console.error('没有canvas容器用于ThreeJs渲染')
  }
  getCode().then(() => {
    console.log('验证码获取成功')
  }).catch(e => {
    console.error('验证码获取失败', e)
  })
})

const form = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    (val: string) => (val && val.length > 0) || '请输入用户名'
  ],
  password: [
    (val: string) => (val && val.length > 0) || '请输入密码'
  ],
}

const theme = computed<ThemeConfig>(() => {
  const themeStore = store.system.useThemeStore()
  const activeName = themeStore.activeName
  if (activeName in themeStore.themeConfig) {
    return themeStore.themeConfig[activeName as keyof typeof themeStore.themeConfig]
  }
  return themeStore.themeConfig.classic
})

const onSubmit = () => {
  store.system.useAccountStore()
    .login(form.value)
    .then(() => {
      $router.replace(
        ($router.currentRoute.value.query.redirect as string)
        || import.meta.env.VITE_VUE_DEFAULT_PATH
      ).catch(e => {
        throw new Error(e)
      })
    }).catch((e: Error) => {
      throw e
    })
}

const onReset = () => {
  form.value = { username: '', password: '' }
}

const getCode = async () => {
  const res = await getCodeImg()
  const { data } = res
  captchaImg.value = data.captchaEnabled === undefined ? true : data.img
  if (captchaEnabled.value) {
    codeUrl.value = 'data:image/gif;base64,' + data.img;
    loginForm.value.uuid = data.uuid;
  }
}

</script>

<style lang="scss" scoped>
.page-login {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .login-container {
    width: 30%;
    position: absolute;
    right: 10%;
    max-width: 1080px;
    z-index: 1;
    .form-login {
      background: v-bind('theme.pageLogin.themePageLoginBackground');
      color: v-bind('theme.pageLogin.themePageLoginColor');
      padding: 0;
      width: 100%;
      border-radius: 10px;
      padding: 1rem 2rem;
      margin: 0 auto;
      .login-title {
        letter-spacing: 0.2em;
        text-shadow: 5px 5px 4px rgba(0, 0, 0, .2);
        -webkit-text-stroke: 1px rgba(255, 255, 255, .2);
      }
    }
    .q-checkbox {
      margin-top: 0px;
      user-select: none;
    }
    .btn-submit {
      height: 56px;
      background: v-bind('theme.global.themeColorAlpha');
      &::before {
        border-color: rgba(0, 0, 0, 0.24);
      }
    }
  }

  #canvas-webgl {
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}
</style>
