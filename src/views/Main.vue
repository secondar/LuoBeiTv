<template>
  <div class="container Main" ref="container">
    <el-container>
      <el-header class="app-header">
        <Header WindowsControlName="MainWindows" WindowsName="萝北Tv" />
      </el-header>
      <el-container>
        <el-main class="video">
          <div class="tip">正在播放:{{PlayTitle}}...</div>
          <video ref="DomVideo" class="video-js vjs-default-skin">
            <!-- <source
              src="http://gcksc.v.kcdnvip.com/gc/tyhjtynl_1/index.m3u8"
              type="application/x-mpegURL"
            /> -->
          </video>
        </el-main>

        <el-aside width="200px">
          <Nav :MenuList="MenuList" @ClickCallback="NavClickCallback" />
        </el-aside>

        <!-- <el-footer class="footer">Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from "@/components/Nav/Nav.vue"; //导航
import "video.js/dist/video-js.css"; //播放器样式
import videojs from "video.js"; //播放器
import ElementResizeDetectorMaker from "element-resize-detector";
import Header from "@/components/Header.vue"; //标题栏
import { ToTree } from "@/utils/common";
import { ipcRenderer } from "electron";
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
      objLoading: null,
      MenuList: [],
      WindowsName: "MainWindows",
      PlayTitle:"",
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
  created() {
    ipcRenderer.on(
      "CommunicationTransfer",
      this.handleAsynchronousCommunication
    );
  },
  beforeDestoryed() {
    ipcRenderer.removeAllListeners("CommunicationTransfer");
  },
  mounted() {
    this.GetVideo(); //初始化播放器
    this.WatchSetVoidSize(); //元素尺寸改变监听
    this.GetMenu();
  },
  beforeDestroy() {
    if (this.video) {
      this.video.dispose();
    }
  },
  methods: {
    //初始化播放器
    GetVideo() {
      let that = this;
      this.video = videojs(
        this.$refs.DomVideo,
        this.VideoSeting,
        function onPlayerReady() {
          // this.play();
          that.GetLastPlayInfo();
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
    GetMenu() {
      this.ShowLoading();
      this.$store
        .dispatch("playlistModel/Select", {})
        .then((res) => {
          this.MenuList = ToTree(res, "_id", "pid", "children");
          this.CloseLoading();
        })
        .catch((err) => {
          this.CloseLoading();
          this.$message({
            message: "列表获取失败",
            type: "error",
          });
        });
    },
    ShowLoading() {
      if (this.objLoading == null) {
        this.objLoading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
      }
    },
    CloseLoading() {
      if (this.objLoading != null) {
        this.objLoading.close();
        this.objLoading = null;
      }
    },
    GetLastPlayInfo() {
      this.ShowLoading();
      this.$store
        .dispatch("lastPlayInfoModel/Select", { _id: "0" })
        .then((res) => {
          this.CloseLoading();
          if (res[0] != undefined || res[0].source != undefined) {
            let el = res[0];
            this.Play(el.source, el.title);
          }
        })
        .catch((err) => {
          this.CloseLoading();
        });
    },
    NavClickCallback(el) {
      this.Play(el.source, el.title);
      this.$store
        .dispatch("lastPlayInfoModel/Delete", {
          _id: "0",
          title: el.title,
          source: el.source,
        })
        .then((res) => {
          this.$store
            .dispatch("lastPlayInfoModel/Add", {
              _id: "0",
              title: el.title,
              source: el.source,
            })
            .then((res) => {})
            .catch((err) => {});
        })
        .catch((err) => {
          this.$store
            .dispatch("lastPlayInfoModel/Add", {
              _id: "0",
              title: el.title,
              source: el.source,
            })
            .then((res) => {})
            .catch((err) => {});
        });
    },
    handleAsynchronousCommunication(event, Arg) {
      if (Arg.Action != undefined && Arg.Action == "ResetMenuList") {
        this.MenuList = Arg.MenuList;
      }
    },
    Play(url, title) {
      try {
        this.PlayTitle = title
        this.video.src([{ src: url }]);
        this.video.play();
      } catch {}
    },
  },
};
</script>
