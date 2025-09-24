<!--大标题组件-->
<template>
  <div class="menu-title">
    <div class="title-content">
<!--      <img class="title-img" src="@/assets/Button.png" />-->
      <svg   xmlns="http://www.w3.org/2000/svg" class="icons" width="18px" height="18px" viewBox="0 0 1024 1024" version="1.1"><path d="M981.314663 554.296783a681.276879 681.276879 0 0 1-46.986468 152.746388q-105.706098 230.734238-360.983096 242.19829a593.06288 593.06288 0 0 1-228.689008-33.853939v-1.022615l-31.808709 79.979258a55.759429 55.759429 0 0 1-20.506122 22.551352 40.043451 40.043451 0 0 1-21.04434 5.382184 51.076928 51.076928 0 0 1-19.483507-5.382184 95.210839 95.210839 0 0 1-13.347817-7.158305 52.314831 52.314831 0 0 1-5.382184-4.628679L71.671707 731.908862a57.427906 57.427906 0 0 1-7.158305-21.528737 46.932646 46.932646 0 0 1 1.022615-17.438277 35.952991 35.952991 0 0 1 7.158305-13.347816 74.435608 74.435608 0 0 1 10.279972-10.279972 60.495751 60.495751 0 0 1 11.248765-7.373593 50.431066 50.431066 0 0 1 8.18092-3.606063 6.189512 6.189512 0 0 0 3.067845-1.776121l281.003839-74.866183a91.497132 91.497132 0 0 1 35.899168-2.583448 122.337047 122.337047 0 0 1 22.174599 6.404799 21.528737 21.528737 0 0 1 12.325202 12.325202 76.157907 76.157907 0 0 1 4.628679 14.854829 47.63233 47.63233 0 0 1 0 14.370431 55.167388 55.167388 0 0 1-2.04523 10.764369 10.764368 10.764368 0 0 0-1.022615 3.606063l-32.831324 79.979258a677.50935 677.50935 0 0 0 164.264262 39.505232q77.395809 7.696523 131.809692-3.606063a358.507291 358.507291 0 0 0 101.023598-36.921784 381.27393 381.27393 0 0 0 73.951211-50.753997 352.64071 352.64071 0 0 0 48.708767-55.382676 410.391547 410.391547 0 0 0 26.910921-41.550462c3.767529-7.481236 6.673908-13.616926 8.719139-18.460892zM40.885614 449.667121a685.69027 685.69027 0 0 1 63.563595-176.427998q118.0313-212.273346 374.330913-207.160271a571.803252 571.803252 0 0 1 207.160271 39.989629l33.853939-78.956643A75.619688 75.619688 0 0 1 735.187378 9.189165a37.67529 37.67529 0 0 1 15.393047-8.234742 42.303968 42.303968 0 0 1 14.854829-0.538219 47.578509 47.578509 0 0 1 13.347817 3.606064 102.907362 102.907362 0 0 1 11.302586 6.13569 49.569917 49.569917 0 0 1 6.673909 4.628678l3.067845 3.067845 154.84544 276.913379a81.970666 81.970666 0 0 1 6.13569 22.712817 46.986468 46.986468 0 0 1-1.022615 17.438277 32.293105 32.293105 0 0 1-7.696523 13.347817 69.322533 69.322533 0 0 1-10.764369 9.741753 92.142994 92.142994 0 0 1-11.302587 6.673909l-8.18092 4.09046a7.104483 7.104483 0 0 1-3.067845 1.022615l-283.049068 67.546412a112.003254 112.003254 0 0 1-46.125319-1.022615c-11.571696-3.390776-19.160576-8.019454-22.551352-13.832214a41.173709 41.173709 0 0 1-5.382184-21.04434 97.256069 97.256069 0 0 1 1.291724-17.438277 24.381295 24.381295 0 0 1 3.067845-8.234742L600.632773 296.81309a663.730958 663.730958 0 0 0-164.102797-43.057474q-77.987849-9.203535-131.809692 0a348.227319 348.227319 0 0 0-101.292707 33.853938 368.571976 368.571976 0 0 0-75.350579 49.246986 383.31916 383.31916 0 0 0-50.269601 54.360061 408.507783 408.507783 0 0 0-28.740863 41.012244A113.025869 113.025869 0 0 0 40.885614 449.667121z m0 0"/></svg>

      <p>{{ title }}</p>
      <span class="sdfuishfve" v-if="title == '消息中心'"
        >【每5秒更新一次】

      </span
      >

      <span class="sdfuishfve" v-if="title == '业务监测'"
        >【每3秒更新一次】 </span>

      <span class="sdfuishfve" v-if="title == '重点关注指标'"
        >【每1天更新一次】</span
      >
<!--      <div class="sdjfiebnrer" v-if="title == '业务监测'">-->
<!--        <span style="padding-left: 10px;font-size: 12px">运维张工</span>-->
<!--        <span style="padding-left: 40px;font-size: 12px">18091766415</span>-->
<!--      </div>-->
      <div class="sdjfiebnrer" v-if="title == '业务监测'">
        <div class="left">运维张工</div>
        <div class="right">
          <svg xmlns="http://www.w3.org/2000/svg" class="phone-icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1"><path fill="#109823" d="M626.56 792.32a177.28 177.28 0 1 0 354.56 0 177.28 177.28 0 1 0-354.56 0zM94.72 231.68a177.28 177.28 0 1 0 354.56 0 177.28 177.28 0 1 0-354.56 0z"/><path fill="#109823" d="M776.96 786.56a1007.36 1007.36 0 0 1-515.84-554.88H94.72a946.56 946.56 0 0 0 682.24 736z"/></svg>
          18091766415
        </div>
      </div>
      <div class="sdjfiebnrer" v-if="title == '生成报告'">
        <div class="left">运维张工</div>
        <div class="right">
          <svg xmlns="http://www.w3.org/2000/svg" class="phone-icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1"><path fill="#109823" d="M626.56 792.32a177.28 177.28 0 1 0 354.56 0 177.28 177.28 0 1 0-354.56 0zM94.72 231.68a177.28 177.28 0 1 0 354.56 0 177.28 177.28 0 1 0-354.56 0z"/><path fill="#109823" d="M776.96 786.56a1007.36 1007.36 0 0 1-515.84-554.88H94.72a946.56 946.56 0 0 0 682.24 736z"/></svg>
          18091766415
        </div>
      </div>
      <div class="sdjfiebnrer" v-if="title == '数据服务'">
        <div class="left">运维马工</div>
        <div class="right">
          <svg xmlns="http://www.w3.org/2000/svg" class="phone-icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1"><path fill="#109823" d="M626.56 792.32a177.28 177.28 0 1 0 354.56 0 177.28 177.28 0 1 0-354.56 0zM94.72 231.68a177.28 177.28 0 1 0 354.56 0 177.28 177.28 0 1 0-354.56 0z"/><path fill="#109823" d="M776.96 786.56a1007.36 1007.36 0 0 1-515.84-554.88H94.72a946.56 946.56 0 0 0 682.24 736z"/></svg>
          18189439384
        </div>
      </div>
      <div class="sdjfiebnrer" v-if="title == '进入系统'">
        <div class="left">运维张工</div>
        <div class="right">
          <svg xmlns="http://www.w3.org/2000/svg" class="phone-icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1"><path fill="#109823" d="M626.56 792.32a177.28 177.28 0 1 0 354.56 0 177.28 177.28 0 1 0-354.56 0zM94.72 231.68a177.28 177.28 0 1 0 354.56 0 177.28 177.28 0 1 0-354.56 0z"/><path fill="#109823" d="M776.96 786.56a1007.36 1007.36 0 0 1-515.84-554.88H94.72a946.56 946.56 0 0 0 682.24 736z"/></svg>
          15071305934
        </div>
      </div>
      <div class="sdjfiebnrer" v-if="title == '智能工具'">
        <div class="left">运维张工</div>
        <div class="right">
          <svg xmlns="http://www.w3.org/2000/svg" class="phone-icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1"><path fill="#109823" d="M626.56 792.32a177.28 177.28 0 1 0 354.56 0 177.28 177.28 0 1 0-354.56 0zM94.72 231.68a177.28 177.28 0 1 0 354.56 0 177.28 177.28 0 1 0-354.56 0z"/><path fill="#109823" d="M776.96 786.56a1007.36 1007.36 0 0 1-515.84-554.88H94.72a946.56 946.56 0 0 0 682.24 736z"/></svg>
          18091766415
        </div>
      </div>
<!--      <img v-if="title == '业务监测'" style="height: 30px;width: 200px;" src="@/assets/php1.jpg"/>-->
<!--      <img v-if="title == '生成报告'" style="height: 30px;width: 200px;" src="@/assets/php2.jpg"/>-->
    </div>
    <slot name="system"></slot>
    <!--    判断是否有多个操作 -->
    <!--    <div class="action-btn-list" v-if="isActionBtnShow && actionList.length > 0" >-->
    <!--      <div class="action-btn" v-for="(item, index) in actionList" :key="index" @click="handleClick(index)">-->
    <!--        {{item.actionName }}-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="action-btn" v-if="isActionBtnShow && actionList.length === 0" @click="handleClick">-->
    <!--      {{ actionName }}-->
    <!--    </div>-->
    <el-popover placement="bottom" trigger="click" v-model="hsdufdsh">
      <div
        class="action-btn-list"
        v-if="isActionBtnShow && actionList.length > 0"
      >
        <div
          class="action-btn"
          v-for="(item, index) in actionList"
          :key="index"
          @click="handleClick(index)"
        >
          {{ item.actionName }}
        </div>
      </div>
      <div
        class="action-btn"
        v-if="isActionBtnShow && actionList.length === 0"
        @click="handleClick"
      >
        {{ actionName }}
      </div>
      <div
        class="action-btn"
        v-if="title == '业务监测'"
        @click="handleClicksdf"
      >
        前往个人面板
      </div>
      <div
        class="action-btn"
        v-if="title == '一键进入菜单'"
        @click="handleClicksdf"
      >
        前往我的菜单
      </div>
      <div
        class="action-btn"
        v-if="title == '生成报告'"
        @click="handleClicksdf"
      >
        前往个人面板
      </div>
      <div
        class="action-btn"
        v-if="title == '智能工具'"
        @click="handleClicksdf"
      >
        前往智能工具
      </div>
      <div
        class="action-btn"
        v-if="title == '消息中心'"
        @click="handleClicksdf"
      >
        前往消息中心
      </div>

<!--      <img-->
<!--        style="-->
<!--          height: 26px;-->
<!--          margin-right: 10px;-->
<!--          margin-top: 6px;-->
<!--          cursor: pointer;-->
<!--        "-->
<!--       -->
<!--        src="@/assets/button2.png"-->
<!--      />-->
       <svg v-if="
          title == '业务监测' ||
          title == '一键进入菜单' ||
          title == '生成报告' ||
          title == '智能工具' ||
          title == '消息中心' ||
          title == '重点关注指标' ||
          title == '进入系统' ||
          title == '数据服务'
        "
           slot="reference" xmlns="http://www.w3.org/2000/svg" class="icon" width="18px" height="18px" viewBox="0 0 1026 1024" version="1.1"><path d="M371.732817 94.172314q25.773475 0 44.112294 17.843175t18.338819 43.616651l0 247.821878q0 25.773475-18.338819 44.112294t-44.112294 18.338819l-247.821878 0q-25.773475 0-43.616651-18.338819t-17.843175-44.112294l0-247.821878q0-25.773475 17.843175-43.616651t43.616651-17.843175l247.821878 0zM371.732817 589.81607q25.773475 0 44.112294 17.843175t18.338819 43.616651l0 248.813166q0 25.773475-18.338819 43.616651t-44.112294 17.843175l-247.821878 0q-25.773475 0-43.616651-17.843175t-17.843175-43.616651l0-248.813166q0-25.773475 17.843175-43.616651t43.616651-17.843175l247.821878 0zM868.367861 589.81607q25.773475 0 43.616651 17.843175t17.843175 43.616651l0 248.813166q0 25.773475-17.843175 43.616651t-43.616651 17.843175l-247.821878 0q-25.773475 0-44.112294-17.843175t-18.338819-43.616651l0-248.813166q0-25.773475 18.338819-43.616651t44.112294-17.843175l247.821878 0zM1006.156825 203.21394q19.82575 19.82575 19.82575 46.590513t-19.82575 45.599226l-184.379477 184.379477q-19.82575 19.82575-46.094869 19.82575t-46.094869-19.82575l-184.379477-184.379477q-18.834463-18.834463-18.834463-45.599226t18.834463-46.590513l184.379477-184.379477q19.82575-18.834463 46.094869-18.834463t46.094869 18.834463z"/></svg>

    </el-popover>
    <span @click="handleClicks"  style="color: $primary-color;font-size: 13px; cursor: pointer;padding-right: 16px" v-if="title == '制度标准智能推荐'"> <span v-if="lengthre>0">更多</span>  </span>
  </div>
</template>

<script>
export default {
  name: "menuTitle",
  components: {},
  props: {
    title: {
      type: String,
      default: "默认标题",
    },
    actionName: {
      type: String,
      default: "默认标题",
    },
    isActionBtnShow: {
      type: Boolean,
      default: false,
    },
    actionList: {
      type: Array,
      default: () => [],
    },
    lengthre: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      hsdufdsh: false,
    };
  },
  methods: {
    handleClick(index) {
      this.$emit("btn-click", index);
      this.hsdufdsh = false;
    },
    handleClicks(){
      this.$emit("btn-click", '');
      this.hsdufdsh = false;
    },
    handleClicksdf() {
      this.$emit("infoclick");
    },
  },
};
</script>
<style lang="scss" scoped>
.icon{
  margin-right: 10px;
  margin-top: 10px;
  path{

    fill: $icon-color;
  }
}
.icons{
  margin-left:6px;
  margin-right: 6px;
  path{

    fill: $icon-color;
  }
}

//.sdjfiebnrer{
//  background-image: url("@/assets/php2.jpg");
//  background-repeat: no-repeat;
//  background-size:  200px 24px;
//  width: 200px;
//  height: 24px;
//  line-height: 24px;
//  font-size: 12px;
//  color: $primary-color;
//}
.sdjfiebnrer{

  width: 200px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  //color:$primary-color;
  margin:2px 0 0 6px ;
}
.sdjfiebnrer .left{
  font-size: 12px;
  background-color:$background-color-bg;
  -webkit-clip-path: polygon(0 0, 80% 0, 100% 100%, 0% 100%);
  clip-path: polygon(0 0, 80% 0, 100% 100%, 0% 100%);
  width: 70px;
  padding-left: 5px;
}
.sdjfiebnrer .right{
  position: relative;
  left:-5px;
  width: 160px;
  padding-left: 20px;
  font-size: 12px;
  background-color:$background-color-bg;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
  display: flex;
  flex-direction: row;
  align-items: center;
}
.phone-icon{
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.phone-icon path{
  fill:$phone-background;
}

.sdfuishfve {
  font-size: 12px;
}
.menu-title {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #f5f6f7;
  height: 40px !important;
  line-height: 40px;
}
.title-content {
  display: flex;
  align-items: center;
}

.title-img {
  height: 34px;
  margin-right: 10px;
  margin-left: 10px;
}

p {
  display: inline-block;
  font-family: PingFangSCZH;
  font-weight: 500;
  font-size: 16px;
  // color: $primary-color;
  line-height: 28px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-right: 12px;
}
.action-btn-list {
  //position: absolute;
  //display: flex;
  //justify-content: space-between;
  //right: 0;
}
.action-btn {
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  //font-family: PingFangSC, PingFang SC;
  //font-weight: 400;
  //font-size: 10px;
  //color: #fff;
  //background: $primary-color;
  //border-radius: 12px;
  //border:1px solid $primary-color;
  //line-height: 26px;
  //padding: 0 16px;
  //text-align: left;
  //font-style: normal;
  //z-index: 99;
  //cursor: pointer;
  //&:not(:first-child) {
  //  margin-left: 10px;
  //}
}
</style>
