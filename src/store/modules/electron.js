import { ipcRenderer } from "electron"; // script标签内，引入ipcRenderer
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
    let strOption = "";
    for (let i in objOption) {
      strOption += `${i}_${objOption[i]}_`;
    }
    console.log(strOption);
    console.log(objOption);
    ipcRenderer.send("NewWindows", strOption);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
