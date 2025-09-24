/*
 * @Author      : wwj 318348750@qq.com
 * @Date        : 2025-07-14 18:13:18
 * @LastEditors : wwj 318348750@qq.com
 * @LastEditTime: 2025-07-15 10:41:14
 * @Description :
 * Copyright (c) 2025 by xxx email: 318348750@qq.com, All Rights Reserved.
 */
const port = process.env.VUE_APP_PORT || 8080
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    open: true,
    port: port,
    https: false,
    hotOnly: true,

    proxy: {
      '': {
        target: 'http://172.16.7.242:28188/',
        changeOrigin: true,
        rewrite: (p) => p.replace('', ''),
      },
    }
  },
  configureWebpack: {
    cache: false,
    externals: {
      AMap: "AMap",
    },
  },

  css: {
    extract: false,
    sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: `
          @use "@/assets/fonts/font.scss";
          $primary-color: #a72621;
          $icon-color: #a72621;
          $phone-background: #a72621;
          $background-color-bg: #feeeee;
          $card-header-bg: #a72621;
          $BOM-top-color: #a72621;
          $BOM-left-color: #fbf7f6;
          $BOM-top-font-color: #ffffff;
        `,

      },
    }
  },
}
