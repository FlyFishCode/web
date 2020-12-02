<template>
	<a-row type="flex" justify="center">
		<div class="bg">
			<!-- <a-config-provider :locale="locale"> -->
			<hearder />
			<router-view />
			<afooter />
			<!-- </a-config-provider> -->
		</div>
	</a-row>
</template>

<script>
import hearder from '@/components/hearder.vue';
import afooter from '@/components/footer.vue';
import { defineComponent, reactive, toRefs } from 'vue';
import zhCN from 'ant-design-vue/es/locale/en_GB';
export default defineComponent({
	name: 'app',
	components: {
		hearder,
		afooter
	},
	setup() {
		const data = reactive({
			locale: zhCN
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style>
/* // 下载模块animate.css  是ts类型文件 报错 所以改全局引入 */
/* @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"; */
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.bg {
	border: 1px solid #eee;
	width: 100%;
	max-width: 1000px;
	overflow: hidden;
}
.titleCol {
	margin: 5px 0;
}
.rowStyle {
	margin: 15px 0;
}
#title-g {
	height: 50px;
	border-radius: 20px 20px 0 0;
	border: 1px solid #2b2b2b;
	margin: 10px 0;
	font-size: 20px;
	line-height: 50px;
}
/*  字体标题 */
.centerFont {
	font-size: 20px;
	font-weight: bold;
	color: red;
	margin: 5px 0;
	text-align: left;
}
/* 小标题 */
.smallTitle {
	text-align: left;
	font-size: 18px;
	margin: 5px 0;
}
/* // 按钮宽度 */
.buttonBox button {
	width: 100%;
}
.selectBox {
	width: 100%;
}
.fontIcon {
	font-size: 20px;
	position: relative;
	top: 1px;
}
/* 字体图表/选择框 一行的文字样式 */
.titleStyle {
	height: 32px;
	line-height: 32px;
}
.rowSearchBox {
	background: #f3f3f3;
	padding: 12px 0;
}
/*  分页样式 */
.pagination {
	display: flex;
	justify-content: flex-end;
	margin: 10px 0;
}
.content {
	margin: 5px;
}
/* 去掉高德水印 */
.amap-logo {
	display: none !important;
	visibility: hidden !important;
}
.amap-copyright {
	display: none !important;
	visibility: hidden !important;
}
.mapbox {
	background: #fff;
	height: 80px;
	padding: 10px;
}
.dialogInfo {
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
	font-weight: bold;
	text-align: left;
}
.closeInfo {
	cursor: pointer;
}
.infoCenterBox {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.infoDiv {
	text-align: left;
	white-space: nowrap;
}
.infoImg {
	width: 30px;
	height: 30px;
}
.infoImg img {
	width: 100%;
	height: 100%;
}
/*  修改日历样式 */
.ant-fullcalendar-date {
	height: 200px !important;
	overflow-y: auto;
	padding: 0;
}
.ant-fullcalendar-fullscreen .ant-fullcalendar-content {
	height: auto !important;
}
.tableDate {
	display: flex;
	justify-content: center;
}
/* 弹出框样式 */
.dialogBox {
	height: 100px !important;
	color: #ff3202;
	border: 1px solid #eee;
}
.dialog {
	text-align: left;
	height: 100%;
	display: flex !important;
	flex-direction: column;
	justify-content: space-around;
}
/* 排名统计页面表格队伍显示样式s */
.link {
	color: #1890ff;
	cursor: pointer;
}
.link:hover {
	text-decoration: underline;
}
.showPhoneTable {
	display: none !important;
}
/* 排序样式 */
.linkIcon {
	cursor: pointer;
	color: #1890ff;
}
.sortColBox {
	height: 40px;
	line-height: 40px;
}
.overStyle {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.dialogBG /deep/ .ant-modal-content {
	height: 800px;
	overflow-y: auto;
}
/* 测试环境店铺搜索框宽度 */
.selectBG {
	width: 50%;
}
</style>
