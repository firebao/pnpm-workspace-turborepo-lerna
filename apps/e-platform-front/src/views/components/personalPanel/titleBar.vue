<template>
  <div class="container">
    <!-- <img class="image" src="@/assets/images/lineIcon.png" alt="lineIcon"> -->
    <span class="text">{{text}}</span>
  </div>
</template>

<script>

export default {
  name: 'titleBar',
  props:['text'],

}

</script>

<style scoped lang="scss">
.container {
  height: 30px;
  display: flex;
  /* 使用Flexbox布局 */
  align-items: center;

  /* 垂直居中对齐 */
  .image {
    height: 30px;
    /* 或者你需要的任何尺寸 */
    margin-right: 10px;
    /* 右边距，可根据需要调整 */
  }

  .text {
    flex-grow: 1;
    font-weight: 600;
    font-size: 20px;
    color: #000000;
  }
}
</style>

