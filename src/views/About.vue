<template>
  <div class="container About" ref="container">
    <el-container>
      <el-header class="app-header">
        <Header WindowsControlName="About" WindowsName="关于&说明" />
      </el-header>
      <el-main>
        <div class="container">
          <div class="item">
            <div class="lable">作者：</div>
            <div class="content">secondar</div>
          </div>
          <div class="item">
            <div class="lable">博客：</div>
            <div class="content">
              <span
                @click="OpenExternal('https://www.bugquit.com')"
                class="link"
              >
                https://www.bugquit.com
              </span>
            </div>
          </div>
          <div class="item">
            <div class="lable">GITHUB：</div>
            <div class="content">
              <span
                @click="OpenExternal('https://github.com/secondar')"
                class="link"
              >
                https://github.com/secondar
              </span>
            </div>
          </div>
          <div class="item">
            <div class="lable">项目仓库：</div>
            <div class="content">
              <span
                @click="OpenExternal('https://github.com/secondar/LuoBeiTv')"
                class="link"
              >
                https://github.com/secondar/LuoBeiTv
              </span>
            </div>
          </div>
          <div class="item">
            <div class="lable">另一个项目：</div>
            <div class="content">
              <span
                @click="OpenExternal('https://www.imoecg.com')"
                class="link"
              >
                https://www.imoecg.com
              </span>
            </div>
          </div>
          <div class="item">
            <div class="lable">邮箱：</div>
            <div class="content">mail@bugquit.com</div>
          </div>
          <div class="item">
            <div class="lable">音视频类型支持：</div>
            <div class="content">
              <ul>
                <li>支持在线/本地文件播放</li>
                <li>m3u8,mp4,avi等格式</li>
                <li>
                  更多请查看
                  <span
                    @click="OpenExternal('https://videojs.com')"
                    class="link"
                  >
                    https://videojs.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="item">
            <div class="lable">依赖&插件：</div>
            <div class="content">
              <ul>
                <li>1 . @riophae/vue-treeselect</li>
                <li>2 . core-js</li>
                <li>3 . element-resize-detector</li>
                <li>4 . element-ui</li>
                <li>5 . nedb</li>
                <li>6 . video.js</li>
                <li>7 . vuex</li>
                <li>8 . Vue V2</li>
                <li>9 . Electron</li>
              </ul>
            </div>
          </div>
          <div class="item">
            <div class="lable">免责声明：</div>
            <div class="content">
              <p>本项目为开源项目，不提供任何播放源，音视频存储、</p>
              <p>流媒体服务，所有存储能力均通过集成的nedb嵌入式</p>
              <p>数据库实现的本地数据存储。本项目开源协议为Apache，</p>
              <p>非本项目官方发行与由用户使用过程中产生的法律问题，</p>
              <p>本项目均不负任何法律责任。</p>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"; //标题栏
import { ipcRenderer } from "electron";
export default {
  name: "About",
  components: {
    Header,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    OpenExternal(url) {
      this.$store.dispatch("electron/OpenExternal", url);
    },
  },
};
</script>
