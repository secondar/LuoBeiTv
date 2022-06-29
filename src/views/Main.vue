<template>
  <div class="container Main" ref="container">
    <el-container>
      <el-header>
        <Header WindowsControlName="MainWindows" WindowsName="萝北Tv" />
      </el-header>
      <el-container>
        <el-main class="video">
          <div class="tip">正在播放:贝爷的自助餐...</div>
          <video ref="DomVideo" class="video-js vjs-default-skin">
            <source
              src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
              type="application/x-mpegURL"
            />
          </video>
        </el-main>

        <el-aside width="200px">
          <Nav />
        </el-aside>

        <!-- <el-footer class="footer">Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue"; //导航
import "video.js/dist/video-js.css"; //播放器样式
import videojs from "video.js"; //播放器
import ElementResizeDetectorMaker from "element-resize-detector";
import Header from "@/components/Header.vue"; //标题栏

videojs.addLanguage("zh-CN", {
  //播放器
  Play: "播放",
  Pause: "暂停 ",
});
export default {
  name: "Main",
  components: {
    Nav,
    Header,
  },
  data() {
    return {
      WindowsName: "MainWindows",
      video: null,
      VideoSeting: {
        language: "zh-CN",
        autoplay: false, // true/false 播放器准备好之后，是否自动播放 【默认false】
        controls: true, // /false 是否拥有控制条
        muted: false, // /false 是否静音
        bigPlayButton: false,
      },
    };
  },
  mounted() {
    this.GetVideo(); //初始化播放器
    this.WatchSetVoidSize(); //元素尺寸改变监听
  },
  beforeDestroy() {
    if (this.video) {
      this.video.dispose();
    }
  },
  methods: {
    //初始化播放器
    GetVideo() {
      this.video = videojs(
        this.$refs.DomVideo,
        this.VideoSeting,
        function onPlayerReady() {
          this.play();
          this.on("ended", function () {
            // console.log("播放结束了!");
          });
          // console.log("播放器已经准备好了!");
        }
      );
    },
    //监听窗体大小改变
    WatchSetVoidSize() {
      const _this = this;
      var erd = ElementResizeDetectorMaker();
      erd.listenTo(this.$refs.container, (element) => {
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        _this.$nextTick(() => {
          _this.video.width(width - 200);
          _this.video.height(height - 30);
        });
      });
    },
  },
};
</script>
