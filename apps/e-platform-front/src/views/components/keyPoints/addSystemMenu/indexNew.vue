<template>
  <div>
    <global-drawer :is-mark-show="isMarkShow" @update:is-drawer-show="handleDrawerVisibility">
      <!-- 抽屉内容 -->
      <menu-system-select @addData="addData" @get-drawer-type="getDrawerType " :form="form" @get-drawer-status="getDrawerStatus"></menu-system-select>
    </global-drawer>
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
      isMarkShow: false, // 抽屉状态
      drawerOpen: false,
      isOther: '',
      form: {
        region: null,
        userId:null,
        setupId: null
      }

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
    handleDrawerVisibility(val) {
      this.isMarkShow = val;
      // if()
      this.form = {
        region: null,
        userId:null,
        setupId: null
      }
    },
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
