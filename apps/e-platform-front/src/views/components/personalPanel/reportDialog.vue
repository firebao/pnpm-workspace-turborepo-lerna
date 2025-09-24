<template>
  <el-dialog :visible.sync="showDialog" width="46%" height="90rem" @close="handleClose" append-to-body>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="24">
        <div class="">
          <titleBar :text="this.details.reportName"></titleBar>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="4">
        <div class="platform-personal-panel-detail-name">

          <img src="@/assets//images/monitorName.png" alt="">
          <span>报告名称：</span>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="platform-personal-panel-detail-value-name">
          <span>{{ this.details.reportName }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="platform-dialog-video platform-dialog-min-height">
          <!--          <el-image class="el-img" :preview-src-list="viteDate.img" :src="viteDate.src" alt="dialogImg">
          </el-image>-->
          <!--          <img :src=viteDate.src alt="dialogImg">-->
          <videoPlayerMP4 :video-url="this.details.reportVideo" :key="this.details.reportVideo" ref="dialogVideo">
          </videoPlayerMP4>
        </div>
      </el-col>
<!--      <el-col :span="10" style="display: flex;align-items: center;justify-content: center; height: 280px;">
        <div class="platform-personal-panel-detail-picture">
          {{ this.details.reportName }}
        </div>
      </el-col>-->
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="platform-personal-panel-detail-description">
          <span>报告描述</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="platform-personal-panel-detail-description-content">
          {{ this.details.description }}
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <!--      <el-button type="primary" @click="showDialog = false" style="margin-right: 70px;margin-top: 20px">进入原系统</el-button>-->
      <el-button @click="addReport" v-if="this.details.status === 0">添加常用</el-button>
      <el-button @click="updateReport" v-if="this.details.status === 1 && this.details.isAttention == 0">添加常用</el-button>
      <el-button @click="removeReport" v-if="this.details.status === 1&& this.details.isAttention == 1">移除常用</el-button>
    </span>
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
// @use "@/assets/fonts/font.scss";
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
  height: 310px;

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
