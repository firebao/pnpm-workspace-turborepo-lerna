<template>
  <div class="platform-menu-toggle-drawer" >
    <transition name="drawer">
      <div v-if="drawerOpen" class="drawer-container" >
        <div :style="{background:isOther === 'tree' ? 'rgb(241, 246, 253)' : '#fff'}" class="left-drawer-btn"
             @click="toggleDrawer">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <!-- 抽屉内容 -->
        <menu-system-select @addData="addData" @get-drawer-type="getDrawerType " @get-drawer-status="getDrawerStatus"></menu-system-select>
      </div>
    </transition>
  </div>
</template>

<script>
import menuSystemSelect from "@/views/components/keyPoints/addSystemMenu/menuDrawerContent/menuSystemSelect";

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
	  addData(){
		
		  this.$emit('addData','')
	  },
    toggleDrawer() {
      // alert(0
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

<style lang="scss">
</style>
