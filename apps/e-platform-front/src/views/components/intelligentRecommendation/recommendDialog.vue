
<template>
  <el-dialog
    :visible.sync="detailDialog"
    width="46%"
    height="90rem"
    @close="handleClose"
    append-to-body
    class="platform-dialog-index"
  >
    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="24">
        <div>
          <titleBar :text="details.name"></titleBar>
        </div>
      </el-col>
    </el-row>
    <iframe
      v-if="details.suggestTypeName == '新闻'"
      :src="details.targetPath"
      frameborder="0"
      width="100%"
      height="500px"
    ></iframe>
    <div v-else>
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="24">
          <div
            v-if="details.systemName"
            class="platform-personal-panel-detail-name"
          >
            <img src="@/assets//images/monitorName.png" alt="" />
            <span>系统名称：{{ details.systemName }}</span>
          </div>
          <div class="platform-personal-panel-detail-name">
            <i
              class="el-icon-set-up"
              style="color: $primary-color; font-size: 18px; margin-left: -2px"
            ></i>
            <span>类型：{{ details.suggestTypeName }}</span>
          </div>
          <div class="platform-personal-panel-detail-name">
            <i
              class="el-icon-paperclip"
              style="color: $primary-color; font-size: 18px; margin-left: -2px"
            ></i>
            <span>单位：{{ details.fullName }}</span>
          </div>
          <div
            v-if="details.layerName"
            class="platform-personal-panel-detail-name"
          >
            <i
              class="el-icon-connection"
              style="color: $primary-color; font-size: 18px; margin-left: -2px"
            ></i>
            <span>层级：{{ details.layerName }}</span>
          </div>
          <div
            v-if="details.majorName"
            class="platform-personal-panel-detail-name"
          >
            <i
              class="el-icon-data-line"
              style="color: $primary-color; font-size: 18px; margin-left: -2px"
            ></i>
            <span>专业：{{ details.majorName }}</span>
          </div>
          <div
            v-if="details.commonPost"
            class="platform-personal-panel-detail-name"
          >
            <i
              class="el-icon-coin"
              style="color: $primary-color; font-size: 18px; margin-left: -2px"
            ></i>
            <span>常用岗位：{{ details.commonPost }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="details.filePath">
        <el-col :span="24">
          <div class="platform-dialog-video platform-dialog-min-height">
            <el-image
              class="el-img"
              :preview-src-list="img"
              :src="details.filePath"
              v-if="details.filePath"
              alt="dialogImg"
            >
            </el-image>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="platform-personal-panel-detail-description">
            <span>{{ details.suggestTypeName }}描述</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="platform-personal-panel-detail-description-content">
            {{ details.descriptions }}
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer"> </span>
    </div>
  </el-dialog>
</template>
  <script>
import titleBar from "@/views/components/personalPanel/titleBar.vue";
import test from "@/assets//images/img.png";
import videoPlayerMP4 from "@/views/components/personalPanel/video.vue";
export default {
  name: "recommendDialog",
  components: {
    titleBar,
    videoPlayerMP4,
  },
  data() {
    return {
      videoUrl:
        "https://storage.jd.com/about/big-final.mp4?Expires=3730193075&AccessKey=3LoYX1dQWa6ZXzQl&Signature=ViMFjz%2BOkBxS%2FY1rjtUVqbopbJI%3D",
      viteDate: {
        src: test,
      },
      img: [],
      detailDialog: false,
      monitorList: [],
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    details: {
      type: Object,
      default: {},
    },
  },
  watch: {
    showDialog(newval, oldval) {
      this.detailDialog = newval;
    },

    // styleon(newval,oldval){
    //   if(newval){
    //      this.styleon888 = newval
    //   }
    // },
  },
  methods: {
    handleClose() {
      // 子组件调用父组件方法，并传递参数
      this.$emit("changeShow");
    },
  },
  computed: {
    isImageFile(url) {
      console.log(url);
      // 获取文件扩展名
      const extension = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
      // 支持的图片扩展名列表
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
      // 判断当前文件扩展名是否为图片扩展名
      if (imageExtensions.includes(extension)) {
        this.img = [url];
        return true;
      }
      return false;
    },
  },
};
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
  border: 0px solid #ecf0f2;
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
  color: #fff;
  background-color: #27a7a2;
  border-color: $primary-color;
}
</style>
  