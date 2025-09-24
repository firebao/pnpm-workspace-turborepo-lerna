<template>
  <div class="search-input-container">
    <input
        v-model="searchQuery.value"
        class="search-input"
        placeholder="请输入你想要查找的功能"
        size="small"
        type="text"
        style="position: absolute"
    />
    <span @click="searchFunction" class="search-icon">
      <!-- <img alt="搜索图标" src="@/assets/images/search-icon.png"> -->
    </span>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchQuery:{
        value: null
      }
    };
  },
  methods: {
    searchFunction() {
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-input-container {
  position: relative;
}

.search-input {
  width: 100%;
  //padding: 9px;
  padding-left: 9px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 0px rgba(238, 238, 238, 0.5);
  border-radius: 4px;
  border: 1px solid #E8ECEF;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 11px;
  color: #999999;
  line-height: 30px;
  text-shadow: 0px 2px 4px rgba(238, 238, 238, 0.5);
  text-align: left;
  font-style: normal;
}

.search-icon {
  position: absolute;
  right: 0px;
  top: 50%;
  font-size: 18px;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-items: center;
  padding-left: 9px;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    line-height: 38px;
    position: absolute;
    left: 25%;
    top: 50%;
    transform: translateY(-50%);
  }
}

input:focus {
  background-color: #fdfbfb; /* 被选中时的背景颜色 */
  color: #000; /* 被选中时的文本颜色 */
  border-color: #fdf5e1; /* 边框颜色 */
  outline: none; /* 去除默认的轮廓线 */
  box-shadow: 0 0 5px $primary-color;
}

</style>
