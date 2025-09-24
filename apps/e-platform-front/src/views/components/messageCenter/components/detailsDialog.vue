<!--
弹窗
-->
<template>
  <el-dialog
      :visible.sync="showDialog"
      width="60%"
      height="90rem"
      @close="handleClose"
      append-to-body
  class="platform-dialog-index">

    <el-row :gutter="20">
      <el-col :span="12">
<!--        <div class="platform-dialog-img platform-dialog-min-height">-->
<!--&lt;!&ndash;          <img :src="sourceInfoData.sourceIcon" alt="dialogImg">&ndash;&gt;-->
<!--          <img :src="sourceInfoData.sourceIcon ? sourceInfoData.sourceIcon : defaultImg" alt="dialogImg">-->

<!--        </div>-->
        <div v-if="!isErrorImgShow" class="platform-dialog-img platform-dialog-min-height">
          <img :src="sourceInfoData.sourceIcon" alt="dialogImg" @error="handleImageError">
        </div>
        <div v-if="isErrorImgShow" class="platform-dialog-img platform-dialog-min-height">
          <no-data :title="'暂无图片'"></no-data>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="platform-dialog-text">
          <div class="menu-message-top">
            <div class="icon-line">
              <!-- <img src="@/assets/images/menuListIcons/lineIcon.png" alt="lineIcon"> -->
            </div>
            <div class="menu-name-current"> 消息详情 </div>
          </div>
          <el-form>
            <el-form-item prop="name">
              <template slot="label">
                <div class="platform-menu-card-label">
                  <div>
                    <!-- <img src="@/assets/images/messageCenter/speciality.png" alt="专业图标"> -->
                  </div>
                  <span style="white-space: nowrap;">消息名称：</span>
                </div>
              </template>
              <span>{{ sourceInfoData.sourceName}}</span>
            </el-form-item>
            <el-form-item prop="name">
              <template slot="label">
                <div class="platform-menu-card-label">
                  <div>
                    <!-- <img src="@/assets/images/messageCenter/speciality.png" alt="专业图标"> -->
                  </div>
                  <span style="white-space: nowrap;">层级：</span>
                </div>
              </template>
              <span>{{ sourceInfoData.layerName !== '' ? sourceInfoData.layerName : '--' }}</span>
            </el-form-item>
            <el-form-item prop="name">
              <template slot="label">
                <div class="platform-menu-card-label">
                  <div>
                    <!-- <img src="@/assets/images/messageCenter/speciality.png" alt="专业图标"> -->
                  </div>
                  <span style="white-space: nowrap;">专业：</span>
                </div>
              </template>
              <span>{{ sourceInfoData.majorName !== '' ? sourceInfoData.majorName : '--' }}</span>
            </el-form-item>
            <el-form-item prop="name">
              <template slot="label">
                <div class="platform-menu-card-label">
                  <div>
                    <!-- <img src="@/assets/images/messageCenter/speciality.png" alt="专业图标"> -->
                  </div>
                  <span style="white-space: nowrap;">系统名称：</span>
                </div>
              </template>
              <span>{{ sourceInfoData.systemName}}</span>
            </el-form-item>
<!--            <el-form-item prop="name">
              <template slot="label">
                <div class="platform-menu-card-label">
                  <div>
                    <img src="@/assets/images/messageCenter/fullPath.png" alt="全路径图标">
                  </div>
                  <span>全路径：</span>
                </div>
              </template>
              <div class="platform-content-card">
                <template v-for="(item,index) in viteDate.path">
                  <span>{{ item }}<img v-if="index < viteDate.path.length - 1" :src="viteDate.img"  alt="路径图标"/></span>
                </template>
              </div>
            </el-form-item>-->
<!--            <el-form-item prop="name">-->
<!--              <template slot="label">-->
<!--                <div class="platform-menu-card-label">-->
<!--                  <span>常用岗位：</span>-->
<!--                </div>-->
<!--              </template>-->
<!--              <span class="platform-content-card">{{viteDate.post.join('、')}}</span>-->
<!--            </el-form-item>-->
          </el-form>
        </div>
      </el-col>
    </el-row>
    <div>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="platform-dialog-marin">
            <div class="platform-dialog-title">说明简介</div>
            <p class="platform-dialog-value-content"> {{sourceInfoData.sourceSummary}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
//import zhuanye from  '@/assets/images/messageCenter/speciality.png'
// import test from  '@/assets/images/messageCenter/test.png'
// import defaultImg from  '@/assets/images/messageCenter/defaultImg.png'
// import Path from  '@/assets/images/messageCenter/path.png'
export default {
  name: "detailsDialog",
  data() {
    return {
      // 控制弹出框显示隐藏
      showDialog: false,
      isErrorImgShow: false,
      //defaultImg: defaultImg,
      sourceInfoData: {
        sourceName: '',
        systemName: '',
      },
      viteDate: {
        // img: Path,
        path: ["营销", "活动", "活动管理","营销", "活动", "活动管理","营销", "活动", "活动管理","营销", "活动", "活动管理","营销", "活动", "活动管理","营销", "活动", "活动管理"],
        post:["营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0","营销2.0"],
        value:"是想看见啊哈那就是看出那数控机床你卡坚持是想看见啊哈那就是看出那数控机床你卡坚持是想看见啊哈那就是看出那数控机床你卡坚持是想看见啊哈那就是看出那数控机床你卡坚持是想看见啊哈那就是看出那数控机床你卡坚持是想看见啊哈那就是看出那数控机床你卡坚持是想看见啊哈那就是看出那数控机床你卡坚持是想看见啊哈那就是看出那数控机床你卡坚持",
        // src: test,
      }
    }
  },
  props: {
    addOrUpdateVisible: {
      type: Boolean,
      default: false
    }
  },
  created() {
  },
  methods: {
    // 设置暂无图片
    handleImageError() {
      this.isErrorImgShow = true
    },
    getDetailsDialogData(data){
      this.sourceInfoData = data
    },
    // 弹出框关闭后触发
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit('changeShow', 'false');
    }
  },
  watch: {
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible() {
      this.showDialog = this.addOrUpdateVisible;
    }
  }

}

</script>

<style scoped lang="scss">
/* 弹窗css样式 */
.platform-dialog-title {
  width: 100%;
  height: 0.55rem;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 0.45rem;
  color: $primary-color;
  line-height: 0.55rem;
  text-align: left;
  font-style: normal;
  margin-bottom: 0.375rem;
}

.plaform-dialog-content {
  width: 27.325rem;
  height: 4.35rem;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 0.35rem;
  color: #666666;
  line-height: 0.5rem;
  text-align: left;
  font-style: normal;
  text-indent: 2em;
}

.menu-message-top {
  display: flex;
  justify-content: space-between;

  .icon-line {
    width: 0.075rem;
    height: 0.525rem;
    margin-right: 0.25rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .menu-name-current {
    display: inline-block;
    width: 100%;
    height: 0.7rem;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 0.5rem;
    color: #000000;
    line-height: 0.55rem;
    letter-spacing: 0.025rem;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

.platform-menu-card-label {
  display: flex;
  align-items: center;

  height: 100%;
  div {
    img {
      margin-right: 0.2rem;
    }
  }

  span {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 0.4rem;
    color: #000000;
    line-height: 1rem;
    letter-spacing: 0.075rem;
    text-align: left;
    font-style: normal;
  }
}

.platform-content-card {
  display: flex;
  flex-wrap: wrap;
  /* 垂直居中 */
  span {
    display: flex;
    align-items: center;
  }

  img {
    margin-left: 0.25rem;
    margin-right: 0.25rem;

  }
}

.platform-dialog-img {
  position: relative;
  border-radius: 0.25rem;
  height: 100%;
  border: 0px solid #ECF0F2;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
  }
}

.platform-dialog-marin {
  margin-top: 1rem;
}

.platform-dialog-value-content {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  line-height: 0.5rem;
  text-align: left;
  font-style: normal;
  text-indent: 2em; /* 设置首行缩进的距离 */
}

.platform-dialog-min-height {
  height: 7.75rem;
  img{
    width: 100%;
    height: 100%;
  }
}

.platform-dialog-index {
  z-index: 9999999 !important;
}
</style>
