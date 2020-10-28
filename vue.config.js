/*
 * @Author: your name
 * @Date: 2020-07-15 16:45:40
 * @LastEditTime: 2020-08-11 15:07:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_adarts_league\vue.config.js
 */
/* eslint-disable quotes */
/* eslint-disable indent */
// vue.config.js

module.exports = {
    publicPath: "./",
    outputDir: "Fish",
    devServer: {
        port: 8010,
        proxy: {
            "/aps": {
                target: "http://adartstest.adarts-cn.com:9090/web", // 后端
                // target: "192.168.2.198:9090/web", // 本地
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "/aps": ""
                }
            }
        }
    },
};