<!--消息订阅-->
<template>
  <div v-if="isDrawerShow" class="drawer-mask"  v-loading.fullscreen.lock="isLoading">
    <div class="platform-menu-toggle-drawer">
      <transition name="drawer">
        <div v-if="isDrawerShow" class="drawer-container">
<!--          <div class="left-drawer-btn" style="background-color: #fff;" :cl @click="toggleDrawer">-->
          <div class="left-drawer-btn" :style="{background:newStyle  ? 'rgb(239,244,253)' : '#fff'}" @click="toggleDrawer">
            <i class="el-icon-d-arrow-right"></i>
          </div>
        </div>
      </transition>
      <div :class="newStyle ? 'drawer-content-new': 'drawer-content'">
        <slot></slot>
      </div>

      <!--查看详情-->
    </div>
<!--    <div v-if="isLoading" class="loading-mask">-->
<!--      <div class="loading-spinner"></div>-->
<!--    </div>-->
  </div>
</template>

<script>

export default {
  name: 'GlobalDrawer',
  components: {
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    isMarkShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Drawer'
    },
    newStyle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDrawerShow: false
    };
  },
  created() {

  },
   mounted() {

  },
  methods: {
    toggleDrawer(){
      if (!this.isLoading) {
        this.isDrawerShow = false;
        this.$emit('update:is-drawer-show', false);
      }
    }

  },
  watch: {
    isMarkShow: {
      handler(val){
        this.isDrawerShow = val
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.platform-menu-toggle-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;

  .drawer-container {
    position: fixed;
    top: 0;
    height: 100%;
    transition: transform 0.3s;
    z-index: 100;
    right: 0;
    width: 92%;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 0px rgba(242, 242, 242, 0.5);
    border-radius: 20px 0px 0px 20px;

    .left-drawer-btn {
      width: 120px;
      height: 120px;
      //background: #FFFFFF;
      border: 0px solid #FFFFFF;
      border-radius: 50%;
      position: absolute;
      top: 45%;
      left: 0%;
      clip-path: inset(0 60px 0 0);
      transform: translate(-25%, -50%);
      cursor: pointer;
      filter: brightness(95%);

      i {
        position: absolute;
        font-size: 24px;
        color: #21CEC8;
        text-align: center;
        top: 48%;
        left: 15%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .drawer-content{
    position: fixed;
    top: 0;
    height: 100%;
    transition: transform 0.3s;
    z-index: 100;
    right: 0;
    width: 92%;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 0px rgba(242, 242, 242, 0.5);
    border-radius: 20px 0px 0px 20px;
    padding: 16px;
    box-sizing: border-box;
  }
  .drawer-content-new{
    position: fixed;
    top: 0;
    height: 100%;
    transition: transform 0.3s;
    z-index: 100;
    right: 0;
    width: 92%;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 0px rgba(242, 242, 242, 0.5);
    border-radius: 20px 0px 0px 20px;
    padding: 0px !important;
    box-sizing: border-box;
  }
}
.loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
