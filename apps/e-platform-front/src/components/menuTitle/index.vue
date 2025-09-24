<!--大标题组件-->
<template>
  <div class="menu-title">
    <div class="title-content">
      <!-- <img class="title-img" src="@/assets/images/lineIcon.png"> -->
      <p>{{ title }}</p>
    </div>
    <slot name="system"></slot>
<!--    判断是否有多个操作-->
    <div class="action-btn-list" v-if="isActionBtnShow && actionList.length > 0" >
      <div class="action-btn" v-for="(item, index) in actionList" :key="index" @click="handleClick(index)">
        {{item.actionName }}
      </div>
    </div>
    <div class="action-btn" v-if="isActionBtnShow && actionList.length === 0" @click="handleClick">
      {{ actionName }}
    </div>


  </div>
</template>

<script>
export default {
  name: 'menuTitle',
  components: {},
  props: {
    title: {
      type: String,
      default: '默认标题'
    },
    actionName: {
      type: String,
      default: '默认标题'
    },
    isActionBtnShow: {
      type: Boolean,
      default: false
    },
    actionList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      hsdufdsh:false
    }
  },
  methods: {
    handleClick(index) {
      this.$emit('btn-click', index)
      this.hsdufdsh = false
    },
    handleClicksdf(){
      this.$emit('infoclick')
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-title {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //border-bottom: 2px solid #F5F6F7;
  //height: 48px !important;
}
.title-content{
  display: flex;
  align-items: center;
}

.title-img {
  height: 21px;
  margin-right: 10px;
}

p {
  padding: 0;
  margin: 0;
  display: inline-block;
  font-family: PingFangSCZH;
  font-weight: 500;
  font-size: 20px;
  //color: $primary-color;
  line-height: 28px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-right: 12px;
}
.action-btn-list{
  position: absolute;
  display: flex;
  justify-content: space-between;
  right: 0;
}
.action-btn{
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 10px;
  color: #fff;
  //background: $primary-color;
  border-radius: 12px;
  // border:1px solid $primary-color;
  line-height: 26px;
  padding: 0 16px;
  text-align: left;
  font-style: normal;
  z-index: 99;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 10px;
  }
}
</style>
