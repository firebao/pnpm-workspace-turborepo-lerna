<!--
缺省组件
使用方法
  <no-data title="暂无数据" size="30%" />
-->
<template>
  <div class="no-data-page">
    <div class="no-data-main">
      <div class="no-data-img">
        <img src="@/assets/images/menuListIcons/detailImgSkip.png" alt="">
      </div>
      <div class="no-data-text">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noData',
  props: {
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '50%'
    },
    // imageSrc: {
    //   type: String,
    //   default: '@/assets/images/menuListIcons/detailImgSkip.png'
    // }
  },
  data() {
    return {
      skipText: '暂无图片'
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data-page {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
}
.no-data-main {
  margin: 20px;
}

.no-data-img img {
  width: v-bind(size); /* 使用动态的 size 属性 */
  margin: 0 auto;
  display: block;
}

.no-data-text {
  text-align: center; /* 文字水平居中 */
  margin-top: 16px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  line-height: 20px;
  font-style: normal;
}
</style>
