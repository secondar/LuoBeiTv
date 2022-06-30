<template>
  <div class="app-top-frame">
    <div class="left">
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="" />
      </div>
      <div class="appname">{{WindowsName}}</div>
    </div>
    <div class="right">
      <button @click="SetAppToMin(WindowsControlName)">
        <i class="el-icon-minus"></i>
      </button>
      <button @click="SetAppToMax(WindowsControlName)">
        <i class="el-icon-news"></i>
      </button>
      <button class="close_app" @click="QuitApp(WindowsControlName)">
        <i class="el-icon-close"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron"; // script标签内，引入ipcRenderer
export default {
  name: "Header",
  props: {
    WindowsControlName: String,
    WindowsName: String,
  },
  methods: {
    QuitApp(WindowsControlName) {
      ipcRenderer.send("AppExit", WindowsControlName);
    },
    SetAppToMin(WindowsControlName) {
      ipcRenderer.send("SetAppToMin", WindowsControlName);
    },
    SetAppToMax(WindowsControlName) {
      ipcRenderer.send("SetAppToMax", WindowsControlName);
    },
  },
};
</script>
<style>
.app-top-frame {
  background-color: #282d3b;
  width: 100%;
  height: 30px !important;
  line-height: 30px !important;
  color: #a2a2a2;
  display: flex;
  justify-content: flex-start;
}
.app-top-frame .right {
  width: 80px;
}
.app-top-frame .left {
  width: calc(100% - 80px);
  -webkit-app-region: drag;
  text-align: left;
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
}
.app-top-frame .left .logo img {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  line-height: 20px;
  margin-top: 5px;
}
.app-top-frame .left .appname {
  font-size: 15px;
  margin-left: 10px;
  cursor: pointer;
}
.app-top-frame .right {
  text-align: right;
}
.app-top-frame .right button {
  margin-right: 6px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  height: 30px;
  color: #a2a2a2;
  padding: 0;
}
.app-top-frame .right button :hover {
  background-color: #7a7a7a;
}
.app-top-frame .right .close_app :hover {
  background-color: #d30505;
}
</style>
