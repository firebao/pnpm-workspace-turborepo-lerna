/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-07-14 17:18:06
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-07-18 10:15:36
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import Treeselect from '@riophae/vue-treeselect'
// import component from './components/index'
import VueVideoPlayer from 'vue-video-player'
import axios from 'axios'

// import '@/assets/fonts/font.scss'
import 'element-ui/lib/theme-chalk/index.css'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
import '@/utils/tools'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export const eventBus = new Vue()

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.component('Treeselect', Treeselect)

const messages = ['success', 'warning', 'info', 'error']
messages.forEach((type) => {
  ElementUI.Message[type] = (options) => {
    if (typeof options === 'string') {
      options = {
        message: options,
      }
      options.duration = 1000
      options.showClose = true
      options.offset = 20
    }
    options.type = type
    return ElementUI.Message(options)
  }
})
Vue.use(ElementUI)
Vue.use(ElementUI)
// Vue.use(component)
Vue.use(VueVideoPlayer)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
