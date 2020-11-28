<template>
	<a-row>
		<a-col class="emptyBox">
			<div>
				<i class="empty">&#xe631;</i>
			</div>
			<div class="emptyFont">{{ 'No Data' }}</div>
		</a-col>
	</a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
	name: 'emptyList',
	setup() {
		const data = reactive({});
		return {
			...toRefs(data)
		};
	}
});
</script>
<style scoped>
.emptyBox {
	height: 170px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.emptyFont {
	color: rgba(0, 0, 0, 0.25);
}
@font-face {
	font-family: 'empty'; /* project id 1994758 */
	src: url('//at.alicdn.com/t/font_1994758_d1epz9qjpu.eot');
	src: url('//at.alicdn.com/t/font_1994758_d1epz9qjpu.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1994758_d1epz9qjpu.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1994758_d1epz9qjpu.woff') format('woff'), url('//at.alicdn.com/t/font_1994758_d1epz9qjpu.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1994758_d1epz9qjpu.svg#iconfont') format('svg');
}
.empty {
	font-family: 'empty' !important;
	font-size: 35px;
	color: #cdcdcd;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
</style>
