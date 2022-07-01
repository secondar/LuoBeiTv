import { ipcRenderer, shell } from "electron"; // script标签内，引入ipcRenderer
const state = {
};
const mutations = {

};
const actions = {
  /**
   * 
   * @param {*} param0 
   * @param {*} objOption = {WindowsControlName:"窗体唯一名称必须",WindowsName:"显示标题,必须",ruoter:"路由,必须"}
   */
  NewWindows({ commit }, objOption = { WindowsControlName: null, WindowsName: null, ruoter: null }) {
    ipcRenderer.send("NewWindows", objOption);
  },
  CommunicationTransfer({ commit }, Arg) {
    return new Promise((resolve, reject) => {
      if (Arg.ToWindow == undefined || Arg.ToWindow == null || Arg.ToWindow == "" || typeof (Arg.ToWindow) != "string") {
        reject("没有指定发送到哪个窗口")
      } else {
        resolve(ipcRenderer.send("CommunicationTransfer", Arg));
      }
    })
  },
  OpenExternal({ commit }, url) {
    shell.openExternal(url);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
