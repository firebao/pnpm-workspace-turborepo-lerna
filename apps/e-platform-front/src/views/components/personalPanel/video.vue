<template>
  <div class='videomp4' @dblclick="clickFun()">
    <video-player class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
                  @pause="onPlayerPause($event)"
                  @play="onPlayerPlay($event)"
                  @ended="onPlayerEnded($event)"
                  @timeupdate="onPlayerTimeupdate($event)"
                  @dblclick="clickFun()"
                  @canplay="onPlayerCanplay($event)"
                  @fullscreenchange="onPlayerFullscreenChange($event)"
                  @dblclick.middle= "ondbclick($event)"
                  @error.once= "onPlayerError($event)"
    >
    </video-player>
  </div>
</template>

<script>
export default {
  name: "videoPlayerMP4",
  components: {

  },
  props:{
    videoUrl: "",
  },
  data() {
    return {
      poster: '',
      isPlay: false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false,  // 如果为true,浏览器准备好时开始回放
        muted: false,     // 默认情况下将会消除任何音频。
        loop: false,      // 是否视频一结束就重新开始。
        playsinline: false,
        progressBar: false,
        preload: 'auto',  // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9',  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true,  // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          /*type: "application/x-mpegURL",*/
          src: this.videoUrl // url地址
          /*          src: 'https://storage.jd.com/about/big-final.mp4'*/
          // url地址
        }],
        poster: '',  // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,           // 当前时间和持续时间的分隔符
          durationDisplay: false,       // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true,       // 是否显示全屏按钮
          currentTimeDisplay: false,   // 当前时间
          playToggle: true,       // 播放按钮
          volumePanel: false       // 静音按钮
        }
      }
    }
  },
  created() {
    // this.onUpdateAspectRatio()
  },
  computed:{
    // player () { return this.$refs.videoPlayer.player },
    playsinline () {
      let ua = navigator.userAgent.toLocaleLowerCase()
      // x5内核
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null)
      { return false }
      else {
        // ios端
        return true
      }
    }
  },
  methods: {
    onPlayerTimeupdate(player) {
      // this.onUpdateAspectRatio();
      //判断移动端还是pc端
      if ("cordova" in window) {
        if (player.player_.isFullscreen_ == true) {
          screen.orientation.lock('landscape');
        } else {
          screen.orientation.lock('portrait');
        }
      }
    },

    onPlayerFullscreenChange($event){
      console.log("FullscreenChange")
    },

    /*全屏播放*/
    playfullscreen(){
      // this.$refs.videoPlayer.player.fullscreen()
      this.$refs.videoPlayer.player.requestFullscreen()
    },
    /*退出全屏播放*/
    outfullscreen(){

    },
    onPlayerCanplay (player) {
      var ua = navigator.userAgent.toLocaleLowerCase()
      if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
        $('body').find('video').attr('x-webkit-airplay', true).attr('x5-playsinline', true).attr('webkit-playsinline', true).attr('playsinline', true)
      } else {
        $('body').find('video').attr('webkit-playsinline', 'true').attr('playsinline', 'true')
      }
    },

    onUpdateAspectRatio(){
      const pin = this.$getViewportSize()
      this.playerOptions.aspectRatio =
          pin.width+
          ':' +
          pin.height;
    },
    onPlayerPause($event) {
      // console.log("暂停了.....")
      this.isPlay = false;
    },
    onPlayerPlay($event) {
      // console.log("播放了.....")
      this.isPlay = true;
    },
    onPlayerEnded($event) {},
    // 暂停
    stopVieo(){
      // console.log("暂停视频")
      this.$refs.videoPlayer.player.pause();
      this.isPlay = false;
    },
    onPlayerError(){
      console.log("视频出错")
    },
    ondbclick() {
      this.onPlayerClick()
    },
    onPlayerClick() {
      if (this.isPlay) {
        this.$refs.videoPlayer.player.pause();
        this.isPlay = false;
      } else {
        this.$refs.videoPlayer.player.play();
        this.isPlay = true;
      }
    },

    clickFun(){
      var clickid = 1;
      var timer = null;
      function a() {
        console.log('点击');
      }
      function b() {
        console.log('双击');
      }
      let startTime = new Date().getTime();

      if(clickid === 1) {
        clickid++;
        timer = setTimeout(function () {
          a(); // 单击事件触发
          clickid = 1;
        }, 300)
      }

      if(clickid === 2) {
        clickid ++ ;
      } else {
        var endTime = new Date().getTime();
        if ((endTime - startTime) < 300) {
          b(); // 双击事件
          clickid = 1;
          clearTimeout(timer);
        }
      }
    }
  },

  watch: {
    url(val){
      console.log("视屏地址")
      this.playerOptions.sources[0].src = val;
    }
  }
}
</script>

<style lang="scss" scoped>

.videomp4{
  width: 68%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}

/*播放按钮*/
::v-deep .vjs-play-control{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

::v-deep .video-js .vjs-play-control .vjs-icon-placeholder:before{
  order:1;
  position:(static !important);
}

::v-deep .vjs-play-control:focus-visible {
  outline: -webkit-focus-ring-color auto 0px;
}

/* 全屏*/
::v-deep .vjs-fullscreen-control{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

::v-deep .video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
  order:1;
  position:(static !important);
}

.video-js .vjs-big-play-button .vjs-icon-placeholder:before, .vjs-button > .vjs-icon-placeholder:before, .video-js .vjs-modal-dialog, .vjs-modal-dialog .vjs-modal-dialog-content{

}

/*进度条圆圈 ● */
//::v-deep .video-js .vjs-play-progress:before{
//  font-size:2.5em;
//}


//::v-deep .vjs-custom-skin > .video-js .vjs-play-progress:before{
//  top: -0.4em;
//}

</style>

