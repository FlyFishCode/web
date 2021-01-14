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
    publicPath: '/leaguefront/',
    outputDir: 'leaguefront',
    productionSourceMap: false,
    devServer: {
        port: 8011,
        proxy: {
            '/apw': {
                // target: 'http://adartstest.adarts-cn.com:9090/web', // 后端-曾
                // target: "http://192.168.2.105:9091/darts", // 后端-廖
                target: 'http://127.0.0.1:9090/web', // 部署地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '/apw': ''
                }
            }
        }
    },
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = 'A-League';
            return args;
        });
    }
};