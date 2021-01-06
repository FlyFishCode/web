<template>
	<div class="content">
		<a-row>
			<a-col :lg="4" :xs="12" class="smallTitle"> <SettingFilled /> {{ $t('default.171') + '  ' + `(${leagueList.length})` }} </a-col>
		</a-row>
		<a-row class="centerStyle">
			<a-row>
				<a-col :lg="3" :xs="6">
					<a-select v-model:value="year" @change="yearChange" class="selectBox">
						<a-select-option v-for="item in yearList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
				<!-- <a-col :span="3">
					<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
						<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col> -->
			</a-row>
			<div>
				<a-row v-for="item in leagueList" :key="item.matchId" class="matchBox">
					<a-col :lg="14" :xs="24">
						<a-col :span="4" class="matchImgBox">
							<img class="matchImg" :src="item.competitionImg" />
						</a-col>
						<a-col :span="20" class="matchInfo">
							<div class="teamStyle" @click="showShopInfo(item.competitionId)">{{ item.competitionName }}</div>
							<div class="divBox">
								<div v-for="div in item.divisionList" :key="div.divisionId">
									<a-button type="danger" size="small" @click="entryPage(item.competitionId, div.divisionId)">{{ div.divisionName }}</a-button>
								</div>
							</div>
						</a-col>
					</a-col>
					<a-col :lg="4" :xs="0">
						<div class="fontDisplay">{{ $t('default.27') }}</div>
						<div>{{ item.countryName }}</div>
					</a-col>
					<a-col :lg="6" :xs="0">
						<div class="rightStyle">
							<div class="fontDisplay">{{ '比赛期间' }}</div>
							<div class="matchState I" v-if="item.status === 1">{{ '比赛中' }}</div>
							<div class="matchState R" v-if="item.status === 2">{{ '比赛结束' }}</div>
							<div class="matchState F" v-if="item.status === 3">{{ '比赛结束' }}</div>
						</div>
						<div>{{ item.date }}</div>
					</a-col>
				</a-row>
			</div>
		</a-row>
		<a-row type="flex" justify="end">
			<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" />
		</a-row>
		<entryList :entryPath="entryPath" />
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { historyListHttp } from '@/axios/api';
import entryList from '@/components/common/entryList.vue';
// import { useRouter } from "vue-router";
import { SettingFilled } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
interface HTMLInputEvent {
	value: HTMLInputElement & EventTarget;
}
interface DataProp {
	monthList: { id: number; value: number | string }[];
	leagueList: { key: string; value: number | string }[];
	myLeagueList: { key: string; value: number | string }[];
	showALLleague: () => void;
	showMyLengue: () => void;
}
export default defineComponent({
	name: 'historyMatch',
	components: { SettingFilled, entryList },
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const data = reactive({
			entryPath: '/shop',
			pageNum: 1,
			pageSize: 10,
			total: 1,
			value: '',
			year: 2020,
			shopId: '',
			yearList: [
				{ value: 2020, label: 2020 },
				{ value: 2021, label: 2021 }
			],
			leagueList: [],
			yearChange: (year = 2020) => {
				const obj = {
					shopId: data.shopId,
					year,
					pageIndex: 1,
					pageSize: 10
				};
				historyListHttp(obj).then((res) => {
					data.leagueList = res.data.data.list;
					data.total = res.data.data.totalPage;
				});
			},
			entryPage: (competitionId: number, divisionId: number) => {
				ROUTER.push({
					path: '/calendar',
					query: {
						competitionId,
						divisionId
					}
				});
			},
			showShopInfo: (competitionId: number) => {
				console.log(competitionId);
				// ROUTER.push({
				// 	path: '/calendar',
				// 	query: { activeKey: '1', competitionId }
				// });
			}
		});
		onMounted(() => {
			data.shopId = ROUTE.query.shopId as string;
			data.yearChange();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>
<style scoped>
.imgBox {
	height: 100px;
}
.imgBox img {
	height: 100%;
}
.centerStyle {
	line-height: 32px;
}
.matchBox {
	height: 80px;
	border: 1px solid #d4d4d4;
	margin: 10px;
	display: flex;
	align-items: center;
}
.matchImg {
	height: 40px;
}
.rightStyle {
	display: flex;
	justify-content: space-around;
}
.fontDisplay {
	color: #999;
}
.matchImgBox {
	height: 80px;
	line-height: 80px;
}
.matchState {
	width: 100px;
	height: 25px;
	line-height: 25px;
	color: #fff;
	border-radius: 10px;
}
.I {
	background: red;
}
.R {
	background: red;
}
.F {
	background: #d9d9d9;
	color: #797878;
}
.divBox {
	display: flex;
}
.teamStyle {
	text-align: left;
	cursor: pointer;
	font-weight: bold;
}
.teamStyle:hover {
	text-decoration: underline;
}
.matchInfo {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
</style>
