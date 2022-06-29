module.exports = {
  // "dev": "vue-cli-service serve --mode development --port 8085 --dashboard",

  devServer: {
    port: 8085,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  // 第三方插件配置
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
}