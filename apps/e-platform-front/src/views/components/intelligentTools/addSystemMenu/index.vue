<template>
  <div class="platform-menu-toggle-drawer" >
    <transition name="drawer">
      <div v-if="drawerOpen" class="drawer-container" >
        <div :style="{background:isOther === 'tree' ? 'rgb(241, 246, 253)' : '#fff'}" class="left-drawer-btn"
             @click="toggleDrawer">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <!-- 抽屉内容 -->
        <menu-system-select @showDetail="showDetail" @get-drawer-type="getDrawerType " @get-drawer-status="getDrawerStatus"></menu-system-select>
      </div>
    </transition>
  </div>
</template>

<script>
import menuSystemSelect from "@/views/components/intelligentTools/addSystemMenu/menuDrawerContent/menuSystemSelect";

export default {
  name: 'menuToggleDrawer',
  components: {
    menuSystemSelect
  },
  data() {
    return {
      drawerOpen: false,
      isOther: ''
    };
  },
  watch: {
    isOther: {
      handler(news) {
        this.isOther = news
      },
      immediate: true,
      deep: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
	  showDetail(){
		  this.$emit('showDetail')
	  },
    toggleDrawer() {
      // alert(0)
      this.drawerOpen = !this.drawerOpen;
      this.$emit('get-open-state', this.drawerOpen)
    },
    getDrawerStatus() {
      this.drawerOpen = false
      this.$emit('get-drawer-state', this.drawerOpen)
    },
    getDrawerType(data) {
      this.isOther = data
    }
  }
};
</script>

<style lang="scss" scoped>
body{
  :global(.vue-treeselect__label){
    //color: red !important;
  }
  :global(.vue-treeselect__menu-placeholder){
    display: block !important;
  }
  :global(.vue-treeselect__menu) {

    display: block;
    //position: absolute;
    //overflow-x: hidden;
    //overflow-y: auto;
    width: auto;
    //border: 1px solid #cfcfcf;
    background: #fff;
    font-size: 14px;
    //padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    //height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
    //text-align: center;
    box-shadow: 0px 2px 9px 0px rgba(39, 168, 163, 0.05), 0px 2px 4px 0px rgba(229, 229, 229, 0.5);
    border-radius: 6px;
    border: 1px solid rgba(39, 168, 163, 0.35) !important;
  }
  :global(.vue-treeselect__x-container:hover){
    color: #666;
  }
  :global(.vue-treeselect__control:hover){
    border: 1px solid rgba(39, 168, 163, 0.35) !important;
  }
  :global(.vue-treeselect__control.is-focus){
    border: $primary-color  !important;
  }
}
</style>
