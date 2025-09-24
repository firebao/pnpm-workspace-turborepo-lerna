<template>
  <el-dialog :visible.sync="showDialog" width="40%" height="90rem" @close="handleClose" append-to-body>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="24">
        <div class="">
          <titleBar :text="details.systemName"></titleBar>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="4">
        <div class="platform-personal-panel-detail-name">

<!--          <img src="@/assets//images/monitorName.png" alt="">-->
          <span>系统名称：</span>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="platform-personal-panel-detail-value-name">
          <span>{{ details.systemName }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="4">
        <div class="platform-personal-panel-detail-name">

          <!--          <img src="@/assets//images/monitorName.png" alt="">-->
          <span>所属专业：</span>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="platform-personal-panel-detail-value-name">
          <span>{{ details.majorName }}</span>
        </div>
      </el-col>
    </el-row>
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="24">-->
<!--        <div class="platform-dialog-video platform-dialog-min-height">-->
<!--          &lt;!&ndash;          <el-image class="el-img" :preview-src-list="viteDate.img" :src="viteDate.src" alt="dialogImg">-->
<!--          </el-image>&ndash;&gt;-->
<!--          &lt;!&ndash;          <img :src=viteDate.src alt="dialogImg">&ndash;&gt;-->
<!--&lt;!&ndash;          <videoPlayerMP4 :video-url="this.details." :key="this.details.reportVideo" ref="dialogVideo">&ndash;&gt;-->
<!--&lt;!&ndash;          </videoPlayerMP4>&ndash;&gt;-->
<!--        </div>-->
<!--      </el-col>-->
<!--&lt;!&ndash;      <el-col :span="10" style="display: flex;align-items: center;justify-content: center; height: 280px;">-->
<!--        <div class="platform-personal-panel-detail-picture">-->
<!--          {{ this.details.reportName }}-->
<!--        </div>-->
<!--      </el-col>&ndash;&gt;-->
<!--    </el-row>-->
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="platform-personal-panel-detail-description">
          <span>系统描述</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="platform-personal-panel-detail-description-content">
          {{ details.systemDescription }}
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import titleBar from "@/views/components/personalPanel/titleBar.vue";
import test from "@/assets/images/img.png";
import videoPlayerMP4 from "@/views/components/personalPanel/video.vue";

export default {
  name: "reportDialog",
  components: { videoPlayerMP4, titleBar },
  data() {
    return {
      showDialog: false,
      viteDate: {
        src: test,
        img: [test]
      }
    }
  },
  props: {
    addOrUpdateVisible: {
      type: Boolean,
      default: false
    },
    details: {
    }
  },
  methods: {
    handleClose() {
      this.showDialog = false;
      // 子组件调用父组件方法，并传递参数
      this.$emit('changeShow', 'false')
    },
    addReport() {
      this.showDialog = false
      this.$emit('addMonitor', this.details)
    },
    updateReport() {
      this.showDialog = false
      this.$emit('updateMonitor', this.details)
    },
    removeReport() {
      this.showDialog = false
      this.$emit('removeMonitor', this.details)
    }
  },
  watch: {
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible() {
      console.log(this.addOrUpdateVisible)
      this.showDialog = this.addOrUpdateVisible
      console.log(this.details)
    }
  }
}
</script>


<style scoped lang="scss">
//@use "@/assets/fonts/font.scss";
.platform-personal-panel-detail-name {
  margin-top: 16px;
  display: flex;
  align-items: center;
  height: 100%;

  img {
    padding-top: 1px;
  }

  span {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    line-height: 20px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
    margin-left: 10px;
  }
}

.platform-personal-panel-detail-value-name {
  padding-top: 16px;

  span {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    line-height: 20px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
  }

}

.platform-dialog-min-height {
  height: 200px;

  img {
    width: 100%;
    height: 100%;
  }
}

.platform-dialog-video {
  height: 350px;
  margin-top: 20px;
  position: relative;
  border-radius: 10px;
  border: 0px solid #ECF0F2;
  .el-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}

.platform-personal-panel-detail-picture {
  padding-top: 20px;
}

.platform-personal-panel-detail-description {
  margin-top: 20px;

  span {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: $primary-color;
    line-height: 22px;
    text-align: left;
    font-style: normal;

  }
}

.platform-personal-panel-detail-description-content {
  margin-top: 18px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-indent: 2em;
}
:deep(.el-dialog__body) {
  padding: 20px;
}
</style>
