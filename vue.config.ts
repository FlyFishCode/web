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
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = ["js", "css"];
// 引入path模块
function resolve(dir) {
    return path.join(__dirname, dir); // path.join(__dirname)设置绝对路径
}

module.exports = {
    publicPath: "/Fish",
    outputDir: "Fish",
    devServer: {
        port: 8010,
        proxy: {
            "/aps": {
                target: "http://192.168.2.105:9091/darts", // 后端
                // target: "http://47.113.88.23:9091/darts", // 远程
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "/aps": ""
                }
            }
        }
    },
};