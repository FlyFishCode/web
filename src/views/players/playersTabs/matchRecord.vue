<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="smallTitle"> <SettingFilled /> {{ $t('default.102') }} </a-col>
		</a-row>
		<a-row>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="year" class="selectBox" @change="yearChange">
					<a-select-option v-for="yaer in yearList" :key="yaer.value" :value="yaer.value">{{ yaer.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="{ span: 3, offset: 18 }" :xs="0" class="sortColBox">
				<div>
					<div class="linkIcon">
						<span v-if="sortTeam" @click="changeSortTeam(2)"> {{ $t('default.256') }}<DownOutlined /> </span>
						<span v-else @click="changeSortTeam(1)"> {{ $t('default.256') }}<UpOutlined /> </span>
					</div>
				</div>
			</a-col>
		</a-row>
		<div v-if="dataList.length">
			<a-row v-for="(item, index) in dataList" :key="index">
				<a-row class="matchBox">
					<a-col :lg="14" :xs="22">
						<a-col :span="5">
							<img class="matchImg" :src="item.competitionImg" />
						</a-col>
						<a-col :span="10">
							<div class="divBg">
								<div>{{ item.competitionName }}</div>
								<div class="divClass">
									<div v-for="div in item.divisionList" :key="div.divisionId">
										<a-button type="danger" size="small" @click="entryPage(item.competitionId, div.divisionId)">{{ div.divisionName }}</a-button>
									</div>
								</div>
							</div>
						</a-col>
					</a-col>
					<a-col :lg="2" :xs="0">
						<div class="fontDisplay">{{ $t('default.167') }}</div>
						<div>{{ item.areaName }}</div>
					</a-col>
					<a-col :lg="6" :xs="0">
						<div class="rightStyle">
							<div class="fontDisplay">{{ $t('default.17') }}</div>
							<div class="matchState I" v-if="item.status === 1">{{ '比赛中' }}</div>
							<div class="matchState R" v-if="item.status === 2">{{ '比赛结束' }}</div>
							<div class="matchState F" v-if="item.status === 3">{{ '比赛结束' }}</div>
						</div>
						<div>{{ item.date }}</div>
					</a-col>
					<a-col :lg="2" :xs="2" class="iconFont">
						<div v-if="item.matchHistory">
							<div v-if="item.flag" @click="changeFlag(index, item)">
								<DownCircleOutlined />
							</div>
							<div v-else @click="changeFlag(index, item)">
								<UpCircleOutlined />
							</div>
						</div>
					</a-col>
				</a-row>
				<transition enter-active-class="animate__animated animate__bounceInUp">
					<a-row v-show="item.flag" class="recordBox">
						<div class="inPhoneTableDisplay">
							<a-row class="title">
								<a-col :span="12">{{ $t('default.156') }}</a-col>
								<a-col :span="12">{{ $t('default.157') }}</a-col>
							</a-row>
							<a-row v-for="history in item.matchHistory" :key="history.index" class="msgBox">
								<a-col :span="12" class="teamBox">
									<div class="teamName">{{ history.teamName }}</div>
								</a-col>
								<a-col :span="12" class="countBox">
									<div class="tableBox Header">
										<div>{{ '排行' }}</div>
										<div>{{ 'Rating' }}</div>
										<div>{{ 'PPD' }}</div>
										<div>{{ 'MPR' }}</div>
										<div>{{ 'Set 胜' }}</div>
										<div>{{ 'Set 和' }}</div>
										<div>{{ 'Set 败' }}</div>
									</div>
									<div class="tableBox Content">
										<div>{{ history.sort }}</div>
										<div>{{ history.competitionRating.rating }}</div>
										<div>{{ history.competitionRating.ppd }}</div>
										<div>{{ history.competitionRating.mpr }}</div>
										<div>{{ history.setResult.wins }}</div>
										<div>{{ history.setResult.draws }}</div>
										<div>{{ history.setResult.losses }}</div>
									</div>
								</a-col>
							</a-row>
						</div>
						<div class="showPhoneTable">
							<div v-for="history in item.matchHistory" :key="history.index" class="marginBox">
								<a-row>
									<a-col class="borderBox" :span="6">{{ $t('default.156') }}</a-col>
									<a-col class="borderBox" :span="18">{{ 'history.matchName' }}</a-col>
								</a-row>
								<a-row>
									<a-col class="borderBox" :span="6">{{ $t('default.257') }}</a-col>
									<a-col class="borderBox" :span="18">{{ 'history.matchName' }}</a-col>
								</a-row>
								<a-row>
									<a-col :span="12" class="inPhoneCol">
										<div class="inphoneBg">{{ $t('default.157') }}</div>
										<div class="inPhoneCentent inphoneBg">
											<div>{{ 'Rating' }}</div>
											<div>{{ 'PPD' }}</div>
											<div>{{ 'MPR' }}</div>
										</div>
										<div class="inPhoneCentent">
											<div>1</div>
											<div>2</div>
											<div>3</div>
										</div>
									</a-col>
									<a-col :span="12" class="inPhoneCol">
										<div class="inphoneBg">{{ $t('default.258') }}</div>
										<div class="inPhoneCentent inphoneBg">
											<div>{{ $t('default.46') }}</div>
											<div>{{ $t('default.47') }}</div>
											<div>{{ $t('default.48') }}</div>
										</div>
										<div class="inPhoneCentent">
											<div>1</div>
											<div>2</div>
											<div>3</div>
										</div>
									</a-col>
								</a-row>
							</div>
						</div>
					</a-row>
				</transition>
			</a-row>
		</div>
		<div v-else>
			<emptyList />
		</div>
		<div class="pagination">
			<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" @change="pageChange" />
		</div>
		<entryList :entryPath="entryPath" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { playerHistoryHttp, playerRewardDropDownHttp } from '@/axios/api';
import entryList from '@/components/common/entryList.vue';
import emptyList from '@/components/common/emptyList.vue';
import { SettingFilled, DownCircleOutlined, UpCircleOutlined, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { yearList } from '@/components/common/public/index';
export default defineComponent({
	name: 'matchRecord',
	components: {
		SettingFilled,
		DownCircleOutlined,
		UpCircleOutlined,
		DownOutlined,
		UpOutlined,
		entryList,
		emptyList
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const data = reactive({
			entryPath: '/players',
			year: new Date().getFullYear(),
			sort: 1,
			total: 1,
			pageNum: 1,
			pageSize: 10,
			sortTeam: true,
			yearList,
			dataList: [
				{
					flag: false,
					matchHistory: [
						{
							competitionRating: {},
							setResult: {}
						}
					]
				}
			],
			changeFlag: (index: number, item: any) => {
				data.dataList[index].flag = !data.dataList[index].flag;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDropDownList(index, item);
			},
			yearChange: (value: number) => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDataList(value);
			},
			changeSortTeam: (value: number) => {
				data.sort = value;
				data.sortTeam = !data.sortTeam;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDataList();
			},
			goHistory: () => {
				ROUTER.push('/players');
			},
			entryPage: (competitionId: number, id: number) => {
				ROUTER.push({
					path: '/calendar',
					query: {
						activeKey: '2',
						competitionId,
						divisionId: id
					}
				});
			},
			pageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDataList();
			}
		});
		const getDataList = (value = data.year) => {
			const obj = {
				year: value,
				playerId: ROUTE.query.playerId,
				sort: data.sort,
				pageIndex: data.pageNum,
				pageSize: data.pageSize
			};
			playerHistoryHttp(obj).then((res) => {
				res.data.data.list.forEach((i: any) => {
					i.flag = false;
					i.matchHistory = [];
				});
				data.dataList = res.data.data.list;
			});
		};
		const getDropDownList = (index: number, item: any) => {
			const obj = {
				competitionId: item.competitionId,
				playerId: ROUTE.query.playerId
			};
			playerRewardDropDownHttp(obj).then((res: any) => {
				data.dataList[index].matchHistory = [res.data.data];
			});
		};
		onMounted(() => {
			getDataList();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.matchBox {
	height: 80px;
	border: 1px solid #d4d4d4;
	margin: 10px;
	display: flex;
	align-items: center;
}
.matchImg {
	height: 60px;
	width: 60px;
}
.divBg {
	cursor: pointer;
	text-align: left;
}
.divClass {
	display: flex;
	justify-content: flex-start;
}
.divClass div {
	margin: 0 2px;
}
.divsision {
	border: 1px solid #000;
	padding: 0 2px;
	margin: 0 4px;
	text-decoration: underline;
}
.fontDisplay {
	color: #999;
}
.rightStyle {
	display: flex;
	justify-content: space-around;
}
.matchState {
	width: 100px;
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
.iconFont {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 25px;
	cursor: pointer;
}
.iconFont:hover {
	color: #1890ff;
}
.title {
	text-align: left;
	color: #999;
}
.msgBox {
	margin: 10px 0;
	height: 80px;
	box-sizing: border-box;
	border-bottom: 1px solid #eee;
	display: flex;
}
.teamBox {
	display: flex;
	align-items: center;
}
.teamName {
	text-align: left;
	font-size: 20px;
	font-weight: bold;
}
.countBox {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.tableBox {
	display: flex;
	justify-content: space-between;
	text-align: center;
}
.tableBox div {
	width: 75px;
	border: 1px solid #000;
}
.Header {
	background: #f1f0ed;
	color: #5a5a5a;
}
.recordBox {
	margin: 10px;
	padding: 0 20px;
	border: 1px solid #d4d4d4;
}
.showPhoneTable {
	display: none;
}
.borderBox {
	border: 1px solid #eee;
}
.marginBox {
	margin-bottom: 10px;
}
.inPhoneCol {
	border: 1px solid #999;
}
.inphoneBg {
	background: #ededed;
	border-bottom: 1px solid #999;
}
.inPhoneCentent {
	display: flex;
	justify-content: space-around;
	align-content: center;
}
.inPhoneCentent div {
	flex-grow: 1;
}
</style>
