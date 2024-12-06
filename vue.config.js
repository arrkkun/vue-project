const { defineConfig } = require('@vue/cli-service')
module.exports = {
  // 开启代理
  devServer: {
    // host:'0.0.0.0',
    // public: '0.0.0.0:8888', // 本地的ip:端口号
    port: 8000,
    client: {
      overlay: false
    },
    // open: true,
    // disableHostCheck:true,
    // hot:true,//自动保存
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 将请求代理到后端的地址
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 重写路径，后端接受到的将不带/api
        },
      },
    },
  },
};