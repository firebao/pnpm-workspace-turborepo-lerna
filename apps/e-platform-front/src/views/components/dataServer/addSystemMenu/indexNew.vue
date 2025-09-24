<template>
  <div>
    <global-drawer
      :is-mark-show="isMarkShow"
      @update:is-drawer-show="handleDrawerVisibility"
      :new-style="newStyle"
    >
      <!-- 抽屉内容 -->
      <menu-system-select
        @get-drawer-type="getDrawerType"
        @get-drawer-status="getDrawerStatus"
      ></menu-system-select>
    </global-drawer>
  </div>
</template>

<script>
import menuSystemSelect from "@/views/components/dataServer/addSystemMenu/menuDrawerContent/menuSystemSelect";

export default {
  name: "menuToggleDrawer",
  components: {
    menuSystemSelect,
  },
  data() {
    return {
      drawerOpen: false,
      isMarkShow: false, // 抽屉状态
      newStyle: true, // 特殊样式
      isOther: "",
    };
  },
  watch: {
    isOther: {
      handler(news) {
        this.isOther = news;
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleDrawerVisibility(val) {
      this.isMarkShow = val;
      if (val === false) {
        this.$emit("add-menu");
        // let locationUrl = JSON.stringify(location.href);
        // sgBrowserExcuteJsCode(
        //     location.host + "/#/monitorQueue",
        //     `window.mac.getListIng(${locationUrl})`
        // );
      }
    },
    toggleDrawer() {
      // alert(0)
      this.drawerOpen = !this.drawerOpen;
      this.$emit("get-open-state", this.drawerOpen);
    },
    getDrawerStatus() {
      this.drawerOpen = false;
      this.$emit("get-drawer-state", this.drawerOpen);
    },
    getDrawerType(data) {
      this.isOther = data;
    },
  },
};
</script>

<style lang="scss"></style>
