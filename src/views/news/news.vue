<template>
	<div class="content">
		<a-row id="title-g">
			<a-col :span="3">{{ $t('default.12') }}</a-col>
		</a-row>
		<a-row>
			<a-col :span="3">
				<a-select v-model:value="type" style="width: 100%">
					<a-select-option v-for="item in selectList" :key="item.value" :value="item.value">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="10">
				<a-input-search v-model:value="typeValue" :enter-button="$t('default.16')" allow-clear @search="onSearch" />
			</a-col>
			<a-col :span="5" :offset="6" class="newTitle">
				{{ $t('default.233') }}
			</a-col>
		</a-row>
		<a-row class="rowStyle" type="flex" justify="space-between">
			<a-col class="colStyle" :span="18">
				<div v-for="news in newsList" :key="news.id" class="contentBox" @click="entryNewsInfo(news.id)">
					<div class="newsImgBox">
						<img :src="news.img" alt="" />
					</div>
					<div class="typeContentBox">
						<div class="typeTime">
							<div class="newsTypeBox">{{ $t(getNewsType(news.category)) }}</div>
							<div>{{ news.date }}</div>
						</div>
						<div class="newsTitle">{{ news.title }}</div>
						<div class="newsContent">{{ news.contents }}</div>
					</div>
				</div>
				<div v-if="total" class="pagination">
					<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" :show-total="(total) => `Total ${total} items`" @change="pageChange" />
				</div>
			</a-col>
			<a-col class="colStyle" :span="5">
				<div class="typeBox">
					<div v-for="news in typeList" :key="news.value" class="type" @click="showTypeNews(news.value)">{{ $t(news.title) }}</div>
				</div>
				<div>
					<div class="yearsTitle">{{ $t('default.234') }}</div>
					<a-menu id="menu" mode="inline" @click="handleClick">
						<a-sub-menu class="yearBox" v-for="year in yaersList" :key="year.id">
							<template v-slot:title>
								<div class="yearTitle">{{ year.title }}</div>
							</template>
							<a-menu-item v-for="month in year.children" :key="month.id">{{ month.title }}</a-menu-item>
						</a-sub-menu>
					</a-menu>
				</div>
			</a-col>
		</a-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { newsHttp } from '@/axios/api';
import { useRouter } from 'vue-router';
// import { DownOutlined } from "@ant-design/icons-vue";
interface HTMLInputEvent {
	value: HTMLInputElement & EventTarget;
}
export default defineComponent({
	name: 'news',
	components: {},
	setup() {
		const Router = useRouter();
		const data = reactive({
			type: 1,
			year: null,
			month: null,
			typeValue: '',
			pageNum: 1,
			pageSize: 10,
			total: 1,
			selectList: [
				{ value: 1, label: 'default.12' },
				{ value: 2, label: 'default.124' },
				{ value: 3, label: 'default.120' }
			],
			typeList: [
				{ value: 1, title: 'default.235' },
				{ value: 2, title: 'default.236' },
				{ value: 3, title: 'default.237' },
				{ value: 4, title: 'default.134' },
				{ value: 5, title: 'default.8' }
			],
			yaersList: [
				{
					id: 2020,
					title: 2020,
					children: [
						{ id: 1, title: 1 },
						{ id: 2, title: 2 },
						{ id: 3, title: 3 },
						{ id: 4, title: 4 },
						{ id: 5, title: 5 },
						{ id: 6, title: 6 },
						{ id: 7, title: 7 }
					]
				}
			],
			newsList: [],
			showTypeNews: (value: number) => {
				newsHttp({ category: value }).then((res) => {
					data.newsList = res.data.data.list;
					data.total = res.data.data.totalPage;
				});
			},
			handleClick: (e: any) => {
				[data.month, data.year] = e.keyPath;
				const obj = {
					year: data.year,
					month: data.month
				};
				newsHttp(obj).then((res) => {
					data.newsList = res.data.data.list;
					data.total = res.data.data.totalPage;
				});
			},
			getNewsType: (type: number) => {
				let str = '';
				switch (type) {
					case 1:
						str = 'default.235';
						break;
					case 2:
						str = 'default.236';
						break;
					case 3:
						str = 'default.237';
						break;
					case 4:
						str = 'default.134';
						break;
					default:
						str = 'default.8';
						break;
				}
				return str;
			},
			onSearch: () => {
				let str = '';
				switch (data.type) {
					case 1:
						str = 'contents';
						break;
					case 2:
						str = 'titleKeyword';
						break;
					default:
						str = 'allKeyword';
						break;
				}
				newsHttp({ [str]: data.typeValue }).then((res) => {
					if (res.data.data.list.length) {
						data.newsList = res.data.data.list;
						data.total = res.data.data.totalPage;
					}
				});
			},
			entryNewsInfo: (id: number) => {
				Router.push({
					path: '/newsInfo',
					query: { value: id }
				});
			},
			pageChange: () => {
				console.log(1);
			}
		});
		onMounted(() => {
			newsHttp({}).then((res) => {
				if (res.data.data.list.length) {
					data.newsList = res.data.data.list;
					data.total = res.data.data.totalPage;
				}
			});
		});
		return {
			...toRefs(data)
		};
	}
});
</script>
<style scoped>
.content {
	margin: 5px;
}
.colStyle {
	border-top: 2px solid #3a3a3a;
}
.newTitle {
	text-align: left;
	height: 32px;
	line-height: 32px;
}
.typeBox div {
	height: 40px;
	line-height: 40px;
	font-size: 24px;
	text-align: left;
	font-weight: bold;
	border-bottom: 1px solid #d4d4d4;
}
.yearsTitle {
	margin-top: 20px;
	padding: 0 0 20px 0;
	text-align: left;
	border-bottom: 2px solid #3a3a3a;
}
.type,
.year {
	cursor: pointer;
}
.type:hover {
	border-bottom-color: #333;
}
.year {
	height: 40px;
	line-height: 40px;
	font-size: 24px;
	text-align: left;
	font-weight: bold;
	border-bottom: 1px solid #d4d4d4;
}
.year:hover {
	border-bottom-color: #333;
}
.yearBox /deep/.ant-menu-submenu-title {
	padding-left: 0px !important;
	font-size: 24px;
	color: #000;
	text-align: left;
	font-weight: bold;
}
.yearBox /deep/.ant-menu-item {
	text-align: left;
	font-size: 18px;
	font-weight: bold;
}
.newsImgBox {
	width: 150px;
	height: 150px;
}
.newsImgBox img {
	width: 100%;
}
.contentBox {
	padding: 10px;
	margin: 10px;
	background: #eee;
	display: flex;
	cursor: pointer;
}
.contentBox:hover {
	opacity: 0.8;
}
.typeContentBox {
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-left: 20px;
	text-align: left;
}
.typeTime {
	display: flex;
	justify-content: space-between;
	color: #999;
}
.typeTime div {
	margin: 10px 20px 10px 0;
}
.newsTypeBox {
	background: #666;
	padding: 0 10px;
	color: #ffffff;
}
.newsTitle {
	font-size: 20px;
	font-weight: bold;
}
</style>
