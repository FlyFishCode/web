/* eslint-disable quotes */
/* eslint-disable indent */
// vue.config.js
const VersionTime = new Date().getTime();
module.exports = {
    publicPath: '/leaguefront/',
    outputDir: 'leaguefront',
    productionSourceMap: false,
    devServer: {
        // 本地 测试
        port: 8011,
        // beta 环境
        // port: 8021,
        proxy: {
            '/apw': {
                // target: 'http://adartstest.adarts-cn.com:9090/web', // 后端-曾
                // target: "http://192.168.2.105:9091/darts", // 后端-廖
                target: 'http://127.0.0.1:9090/web', // test:部署地址
                // target: 'http://127.0.0.1:9203/web', // production:部署地址
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
        config.output.filename(`[name].${VersionTime}.js`);
    }
};