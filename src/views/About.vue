<template>
  <div class="container Main" ref="container">
    <el-container>
      <el-header>
        <Header WindowsControlName="About" WindowsName="关于&说明" />
      </el-header>
      <el-container>
        <el-main class="video"> 11111111111111111 </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"; //标题栏
import ElementResizeDetectorMaker from "element-resize-detector";
export default {
  name: "About",
  components: {
    Header,
  },
  data() {
    return {};
  },
  mounted() {
    this.WatchSetVoidSize(); //元素尺寸改变监听
  },
  methods: {
    //监听窗体大小改变
    WatchSetVoidSize() {
      const _this = this;
      var erd = ElementResizeDetectorMaker();
      erd.listenTo(this.$refs.container, (element) => {
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        _this.$nextTick(() => {
          // _this.video.width(width - 200);
          // _this.video.height(height - 30);
        });
      });
    },
  },
};
</script>
