'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
let WindowsDefaultConf = {
  width: 815,
  height: 600,
  minWidth: 815,
  minHeight: 600,
}
const winURL = isDevelopment ? process.env.WEBPACK_DEV_SERVER_URL ? process.env.WEBPACK_DEV_SERVER_URL : 'app://./index.html' : `app://./index.html`
let objWindowsList = {
};
let MainWindows;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
async function createWindow() {
  // Create the browser window.
  MainWindows = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    title: "萝北Tv",
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await MainWindows.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) MainWindows.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    MainWindows.loadURL('app://./index.html')
  }
}
// 主窗口
// 最小化
ipcMain.on('SetAppToMin', function (event, arg) {
  if (arg == null || arg == undefined || arg == "" || typeof (arg) != "string") {
    dialog.showMessageBox({
      type: "error",
      title: "错误",
      message: "事件传递数据非法",
    })
    return;
  }
  if ("MainWindows" == arg) {
    MainWindows.minimize();
  } else {
    objWindowsList[arg].minimize();
  }
})
//窗口 最大化、恢复
ipcMain.on('SetAppToMax', function (event, arg) {
  if (arg == null || arg == undefined || arg == "" || typeof (arg) != "string") {
    dialog.showMessageBox({
      type: "error",
      title: "错误",
      message: "事件传递数据非法",
    })
    return;
  }
  if ("MainWindows" == arg) {
    if (MainWindows.isMaximized()) { // 为true表示窗口已最大化
      MainWindows.restore();// 将窗口恢复为之前的状态.
    } else {
      MainWindows.maximize();
    }
  } else {
    if (objWindowsList[arg].isMaximized()) { // 为true表示窗口已最大化
      objWindowsList[arg].restore();// 将窗口恢复为之前的状态.
    } else {
      objWindowsList[arg].maximize();
    }
  }
})

//关闭窗口
ipcMain.on('AppExit', function (event, arg) {
  if (arg == null || arg == undefined || arg == "" || typeof (arg) != "string") {
    dialog.showMessageBox({
      type: "error",
      title: "错误",
      message: "事件传递数据非法",
    })
    return;
  }
  if ("MainWindows" == arg) {
    for (let i in objWindowsList) {
      if (objWindowsList[i] != null) {
        objWindowsList[i].destroy();
      }
    }
    MainWindows.destroy();
    MainWindows = null;
    app.exit() // 直接退出应用程序
  } else {
    objWindowsList[arg].destroy();
    objWindowsList[arg] = null
  }
})
// 新建窗口
ipcMain.on('NewWindows', function (event, objParam) {
  if (objParam.WindowsControlName == undefined || objParam.WindowsControlName == null || objParam.WindowsControlName == "" || typeof (objParam.WindowsControlName) != "string") {
    dialog.showMessageBox({
      type: "error",
      title: "错误",
      message: "窗体名称非法",
    })
    return;
  }
  if (objWindowsList[objParam.WindowsControlName]) {
    objWindowsList[objParam.WindowsControlName].focus() // 存在 则聚焦
    return
  }

  if (objParam.WindowsName == undefined || objParam.WindowsName == null || objParam.WindowsName == "" || typeof (objParam.WindowsName) != "string") {
    dialog.showMessageBox({
      type: "error",
      title: "错误",
      message: "窗体标题非法",
    })
    return;
  }
  if (objParam.ruoter == undefined || objParam.ruoter == null || objParam.ruoter == "" || typeof (objParam.ruoter) != "string") {
    dialog.showMessageBox({
      type: "error",
      title: "错误",
      message: "路由非法",
    })
    return;
  }
  objWindowsList[objParam.WindowsControlName] = new BrowserWindow({
    width: objParam.width != undefined && objParam.width > 200 ? objParam.width : WindowsDefaultConf.width,
    height: objParam.height != undefined && objParam.height > 200 ? objParam.height : WindowsDefaultConf.height,
    minWidth: objParam.minWidth != undefined && objParam.minWidth > 200 ? objParam.minWidth : WindowsDefaultConf.minWidth,
    minHeight: objParam.minHeight != undefined && objParam.minHeight > 200 ? objParam.minHeight : WindowsDefaultConf.minHeight,
    frame: objParam.fullscreen ? objParam.fullscreen : false,//是否显示边缘框
    fullscreen: objParam.fullscreen ? objParam.fullscreen : false, //是否全屏显示
    title: objParam.WindowsName,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  objWindowsList[objParam.WindowsControlName].loadURL(winURL + '#/' + objParam.ruoter)  // 此处写 你要打开的路由地址
  // if (!process.env.IS_TEST) objWindowsList[objParam.WindowsControlName].webContents.openDevTools()
  objWindowsList[objParam.WindowsControlName].on('close', () => {
    // objWindowsList[objParam.WindowsControlName].destroy();
    objWindowsList[objParam.WindowsControlName] = null
  })
})

// 进程(窗体)之间通信转发
// 发送使用 使用 store 发送 electron/CommunicationTransfer
// 参数为 {ToWindow:"All为全部发送,其他为窗体/进程名称"}
// 在进程(窗体)使用 created 内 使用ipcRenderer.on("CommunicationTransfer", (event, arg) => {}); 接收
// 同时需要在进程(窗体)内 beforeDestoryed() {ipcRenderer.removeAllListeners("CommunicationTransfer");}
ipcMain.on('CommunicationTransfer', (event, Arg) => {
  if (Arg == undefined || Arg == null || Arg == "") {
    return
  }
  if (Arg.ToWindow == undefined) {
    return
  }
  switch (Arg.ToWindow) {
    case 'All':
      MainWindows.webContents.send('CommunicationTransfer', Arg);

      for (let key in objWindowsList) {
        let element = objWindowsList[key]
        if (element != undefined && element != null) {
          try {
            element.webContents.send('CommunicationTransfer', Arg);
          } catch { }
        }
      }
      break
    case 'MainWindows':
      MainWindows.webContents.send('CommunicationTransfer', Arg);
      break;
    default:
      try {
        if (objWindowsList[Arg.ToWindow] != undefined && objWindowsList[Arg.ToWindow] != null) {
          objWindowsList[Arg.ToWindow].webContents.send('CommunicationTransfer', Arg);
        }
      } catch { }
      break
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
  app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
// 子窗口配置
