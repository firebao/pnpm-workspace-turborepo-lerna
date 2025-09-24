
<template>
  <el-dialog
      :visible.sync="showDialog"
      width="46%"
      height="90rem"
      @close="handleClose"
      append-to-body
      class="platform-dialog-index">
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="24">
        <div class="">
          <titleBar :text="this.details.monitorName"></titleBar>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="4">
        <div class="platform-personal-panel-detail-name">

          <img src="@/assets//images/monitorName.png" alt="">
          <span>系统名称：</span>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="platform-personal-panel-detail-value-name">
          <span>{{this.details.systemName}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="platform-dialog-video platform-dialog-min-height">
      <el-image class="el-img" v-if="this.details.monitorVideo"  :src="this.details.monitorVideo" alt="dialogImg">
          </el-image>
          <el-empty v-else description="暂无图片"></el-empty>
<!--          <videoPlayerMP4 :video-url="this.details.monitorVideo" :key="this.details.monitorVideo"  ref="dialogVideo"></videoPlayerMP4>-->
        </div>
      </el-col>
<!--      <el-col :span="10" style="display: flex;align-items: center;justify-content: center; height: 280px;">
        <div class="platform-personal-panel-detail-picture">
          {{this.details.monitorName}}
        </div>
      </el-col>-->
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="platform-personal-panel-detail-description">
          <span>监测项描述</span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="platform-personal-panel-detail-description-content">
          {{this.details.description}}
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
<!--      <el-button type="primary" @click="enterSystem(details)" style="margin-right: 70px;margin-top: 20px">进入原系统</el-button>-->
<!--      <el-button @click="addMonitor" v-if="details.monitorId === '0'">加入检测项</el-button>-->
<!--      <el-button @click="removeMonitor" v-else>移除检测项</el-button>-->
    </span>
  </el-dialog>
</template>
<script>
import titleBar from "@/views/components/personalPanel/titleBar.vue";
import test from "@/assets//images/img.png"
import videoPlayerMP4 from "@/views/components/personalPanel/video.vue";
export default {
  name: "monitorDialog",
  components: {
    titleBar,
    videoPlayerMP4
  },
  data() {
    return {
      videoUrl: "https://storage.jd.com/about/big-final.mp4?Expires=3730193075&AccessKey=3LoYX1dQWa6ZXzQl&Signature=ViMFjz%2BOkBxS%2FY1rjtUVqbopbJI%3D",
      showDialog: false,
      viteDate: {
        src: test
      },
      img:[]
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

    enterSystem(item) {
      console.log(item)
      this.$emit("handelMonitor",item)
      this.showDialog = false
    },


    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit('changeShow', 'false')
    },
    addMonitor () {
      this.showDialog = false
      this.$emit('addMonitor', this.details)
    },
    removeMonitor () {
      this.showDialog = false
      this.$emit('removeMonitor', this.details)
    }
  },
  computed: {
    isImageFile(url) {
      console.log(url)
      // 获取文件扩展名
      const extension = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
      // 支持的图片扩展名列表
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
      // 判断当前文件扩展名是否为图片扩展名
      if (imageExtensions.includes(extension)) {
        this.img = [url]
        return true;
      }
      return false;
    },

  },

  watch: {
    // 监听 addOrUpdateVisible 改变
    addOrUpdateVisible() {
      this.showDialog = this.addOrUpdateVisible
      console.log(this.details)
    }
  },
}
</script>

<style scoped lang="scss">
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
  height: 280px;

  img {
    width: 100%;
    height: 100%;
  }
}
.platform-dialog-video {
  height: 350px;
  margin-top: 16px;
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
:deep(.el-button--primary) {
  color: #FFF;
  background-color: #27a7a2;
  border-color: $primary-color;
}

</style>
