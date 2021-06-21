<template>
	<div>
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.26') }} </a-col>
		</a-row>
		<a-row>
			<a-tabs type="card" class="tabsBox">
				<a-tab-pane key="1" :tab="$t('default.67')">
					<a-row>
						<a-col :span="12" class="smallTitle"> <SettingFilled /> {{ $t('default.67') }} </a-col>
					</a-row>
					<a-row>
						<a-col :lg="3" :xs="12">
							<a-select v-model:value="divisiton" @change="divisitonChange" class="selectBox">
								<a-select-option v-for="item in divisitonList" :key="item.divisionId" :value="item.divisionId">{{ item.divisionName }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :lg="3" :xs="12">
							<a-select v-model:value="stageId" @change="stageChange" class="selectBox">
								<a-select-option v-for="item in stageList" :key="item.stageId" :value="item.stageId">{{ item.stageName }}</a-select-option>
							</a-select>
						</a-col>
					</a-row>

					<a-row class="inPhoneTableDisplay">
						<showTeam :teamObj="teamObj" />
					</a-row>

					<a-row class="rowStyle">
						<a-col :lg="2" :xs="8">
							<div><span class="iconRound"></span>{{ $t('default.73') }}</div>
						</a-col>
						<!-- <a-col :lg="{ span: 2, offset: 20 }" :xs="0">
							<a-button type="primary" size="small">{{ $t('default.69') }}</a-button>
						</a-col> -->
					</a-row>
					<a-row>
						<a-table class="inPhoneTableDisplay" :columns="leagueColumns" :data-source="leagueTableList" :pagination="false" rowkey="captainId" :scroll="{ x: 300 }" bordered>
							<template #sort="{ index }">
								<div>{{ index + 1 }}</div>
							</template>
							<template #team="{ record }">
								<div class="tableStyle">
									<img class="tableImg" :src="record.teamImg" alt="" />
									<div class="link" @click="showDialog(record.teamId)">{{ record.teamName }}</div>
								</div>
							</template>
						</a-table>
						<!-- 移动端显示 -->
						<a-table class="showPhoneTable" :pagination="false" :scroll="{ x: 400 }"  :columns="leagueColumns" :data-source="leagueTableList" rowkey="captainId" bordered>
							<template #sort="{ index }">
								<div>{{ index + 1 }}</div>
							</template>
							<template v-slot:team="{ record }">
								<div class="tableStyle">
									<img class="tableImg" :src="record.teamImg" alt="" />
									<div>{{ record.teamName }}</div>
								</div>
							</template>
						</a-table>
						<div class="pagination">
							<a-pagination v-model:current="leaguePageNum" v-model:pageSize="leaguePageSize" :total="leagueTotal" @change="leaguePageChange" />
						</div>
					</a-row>

					<a-row class="rowStyle">
						<a-col :lg="2" :xs="8">
							<div><span class="iconRound"></span>{{ $t('default.74') }}</div>
						</a-col>
					</a-row>
					<a-row>
						<a-table class="inPhoneTableDisplay" :pagination="false" :scroll="{ x: 1200 }" :columns="rewardColumns" :data-source="rewardTableList" rowkey="captainId" bordered>
							<template #sort="{ index }">
								<div>{{ index + 1 }}</div>
							</template>
							<template #team="{ record }">
								<div class="tableStyle">
									<img class="tableImg" :src="record.teamImg" alt="" :onerror='handleTeamImgError'/>
									<div class="link" @click="showDialog(record.teamId)">{{ record.teamName }}</div>
								</div>
							</template>
						</a-table>
						<!-- 移动端显示 -->
						<a-table class="showPhoneTable" :pagination="false" :scroll="{ x: 400 }" :columns="historyColumns" rowkey="captainId" :data-source="rewardTableList" bordered>
							<template #action="{ index }">
								<div>{{ index + 1 }}</div>
							</template>
							<template v-slot:teamName="{ record }">
								<div class="tableStyle">
									<img class="tableImg" :src="record.teamImg" alt="" />
									<div>{{ record.teamName }}</div>
								</div>
							</template>
						</a-table>
						<div class="pagination">
							<a-pagination v-model:current="rewardPageNum" v-model:pageSize="rewardPageSize" :total="rewardTotal" @change="rewardPageChange" />
						</div>
					</a-row>
				</a-tab-pane>
				<!-- // 玩家排名 -->
				<a-tab-pane key="2" :tab="$t('default.68')">
					<a-row>
						<a-col :span="12" class="smallTitle"> <SettingFilled /> {{ $t('default.68') }} </a-col>
					</a-row>
					<a-row>
						<a-col :lg="3" :xs="12">
							<a-select v-model:value="divisiton" @change="divisitonChange" class="selectBox">
								<a-select-option v-for="item in divisitonList" :key="item.divisionId" :value="item.divisionId">{{ item.divisionName }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :lg="3" :xs="12">
							<a-select v-model:value="stageId" @change="stageChange" class="selectBox">
								<a-select-option v-for="item in stageList" :key="item.stageId" :value="item.stageId">{{ item.stageName }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :lg="2" :offset="4" :xs="0" class="titleStyle"> <ClusterOutlined />{{ $t('default.140') }} </a-col>
						<a-col :lg="3" :xs="0">
							<a-select v-model:value="teamId" @change="teamChange" class="selectBox">
								<a-select-option v-for="item in teamList" :key="item.teamId" :value="item.teamId">{{ item.teamName }}</a-select-option>
							</a-select>
						</a-col>
					</a-row>
					<!-- 第一名展示信息 -->
					<a-row class="inPhoneTableDisplay">
						<showPersonal :playerObj="playerObj" />
					</a-row>
					<a-row class="rowStyle">
						<a-col :lg="2" :xs="8">
							<div><span class="iconRound"></span>{{ $t('default.68') }}</div>
						</a-col>
						<!-- <a-col :lg="2" :offset="20" :xs="0">
							<a-button type="primary" size="small">{{ $t('default.69') }}</a-button>
						</a-col> -->
					</a-row>

					<a-row>
						<a-table  class="inPhoneTableDisplay" :columns="playerColumns" :data-source="playerTableList" rowkey="playerId" :scroll="{ x: 1300 }" :pagination="false" bordered>
							<template #index="{ index }">
								<div>{{ index +1 }}</div>
							</template>
							<template #player="{ record }">
								<div class="tableStyle">
									<img class="tableImg" :src="record.playerImg" alt="" :onerror='handlePlayerImgError'/>
									<div>
										<div>{{ record.playerName }}</div>
										<div class="link" @click="showDialog(record.teamId)">{{ teamName }}</div>
									</div>
								</div>
							</template>
						</a-table>
						<!-- 移动端显示 -->
							<a-table class="showPhoneTable" :columns="playerColumns" :data-source="playerTableList" rowkey="playerId" :scroll="{ x: 1300 }" :pagination="false" bordered>
								<template #index="{ index }">
									<div>{{ index +1 }}</div>
								</template>
								<template #player="{ record }">
									<div class="tableStyle">
										<img class="tableImg" :src="record.playerImg" alt="" />
										<div>
											<div>{{ record.playerName }}</div>
											<div>{{ teamName }}</div>
										</div>
									</div>
								</template>
							</a-table>
					</a-row>
					<div class="pagination">
						<a-pagination v-model:current="playerPageNum" v-model:pageSize="playerPageSize" :total="playerTotal" @change="pageChange" />
					</div>
				</a-tab-pane>
			</a-tabs>
			<dialogVue :propsVisible="visible" :teamId="teamId" :competitionId="competitionId" @dialogVisible="dialogVisible" />
			<entryList :entryPath="entryPath" />
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { leagueSelectHttp, rankingPlayerHttp, rakingLeagueListHttp, rakingRewardListHttp } from '@/axios/api';
// import { rowType } from "@/type/interface.d.ts";
import { useRoute, useRouter } from 'vue-router';
import { SettingFilled, ClusterOutlined } from '@ant-design/icons-vue';
import showTeam from '@/components/showTeamTopOne.vue';
import showPersonal from '@/components/showPersonalTopOne.vue';
import entryList from '@/components/common/entryList.vue';
import dialogVue from '@/components/common/dialogVue.vue';
import { handlePlayerImgError, handleTeamImgError } from '@/components/common/public/index'
// eslint-disable-next-line @typescript-eslint/class-name-casing
interface rowType {
	[x: string]: string | number;
}
interface DataProps {
	stageId: string | number;
	league: string | number;
	stageList: [{ stageId: string; teamList: Array<any> }];
	teamList: [{ teamId: string }];
	divisitonList: [{ divisionId: string; stageList: Array<any> }];
}
export default defineComponent({
	name: 'ranking',
	components: {
		SettingFilled,
		ClusterOutlined,
		showTeam,
		dialogVue,
		showPersonal,
		entryList
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const data = reactive({
			entryPath: '/league',
			visible: false,
			isChange: false,
			teamId: '',
			teamName: '',
			leaguePageNum: 1,
			leaguePageSize: 10,
			leagueTotal: 1,
			rewardPageNum: 1,
			rewardPageSize: 10,
			rewardTotal: 1,
			playerTotal: 1,
			playerPageNum: 1,
			playerPageSize: 10,
			monthList: [],
			stateList: [],
			competitionId: ROUTE.query.competitionId,
			stageId: '',
			divisiton: '',
			handlePlayerImgError,
			handleTeamImgError,
			teamList: [{ teamId: '' }],
			stageList: [{ stageId: '', teamList: [] }],
			divisitonList: [{ divisionId: '', stageList: [] }],
			teamObj: { teamId: 0 },
			playerObj: { teamId: 0 },
			dialogObj: {
				img: require('@/assets/1.jpg')
			},
			leagueColumns: [
				{
					title: '排行',
					width: 65,
					fixed: 'left',
					slots: { customRender: 'sort' }
				},
				{
					title: '队伍',
					fixed: 'left',
					dataIndex: 'name',
					children: [
						{ title: '队名', dataIndex: 'address', width: 200, slots: { customRender: 'team' } },
						{ title: 'Rating', dataIndex: 'competitionRating.rating', width: 75 },
						{ title: 'PPD', dataIndex: 'competitionRating.ppd', width: 70 },
						{ title: 'MPR', dataIndex: 'competitionRating.mpr', width: 70 }
					]
				},
				{ title: '总积分', width: 80, dataIndex: 'score' },
				{
					title: 'Match',
					dataIndex: 'name',
					children: [
						{ title: '胜', dataIndex: 'matchResult.wins', width: 60 },
						{ title: '和', dataIndex: 'matchResult.draws', width: 60 },
						{ title: '败', dataIndex: 'matchResult.losses', width: 60 },
						{ title: '胜率', dataIndex: 'matchResult.winProbability', width: 100 }
					]
				},
				{
					title: 'Set',
					dataIndex: 'name',
					children: [
						{ title: '胜', dataIndex: 'setResult.wins', width: 60 },
						{ title: '和', dataIndex: 'setResult.draws', width: 60 },
						{ title: '败', dataIndex: 'setResult.losses', width: 60 },
						{ title: '胜率', dataIndex: 'setResult.winProbability', width: 100 }
					]
				},
				{ title: '罚分', dataIndex: 'penaltyPoint', width: 70 }
			],
			leagueTableList: [{ captainId: 0 }],
			rewardColumns: [
				{ title: '排行', dataIndex: 'homeScore', width: 65, fixed: 'left', slots: { customRender: 'sort' } },
				{
					title: '队伍',
					width: 200,
					fixed: 'left',
					slots: { customRender: 'team' }
				},
				{ title: 'LT', dataIndex: 'teamResultDetails.lowTon', width: 60 },
				{ title: 'HAT', dataIndex: 'teamResultDetails.hatTrick', width: 70 },
				{ title: 'HT', dataIndex: 'teamResultDetails.highTon', width: 60 },
				{ title: 'HT.OFF', dataIndex: 'teamResultDetails.highTonOut', width: 85 },
				{ title: 'LT.OFF', dataIndex: 'teamResultDetails.lowTonOut', width: 85 },
				{ title: 'BED', dataIndex: 'teamResultDetails.threeInBed', width: 70 },
				{ title: '180', dataIndex: 'teamResultDetails.ton80', width: 70 },
				{ title: '3 In the Black', dataIndex: 'teamResultDetails.threeInBlack', width: 80 },
				{ title: '5M', dataIndex: 'teamResultDetails.fiveMarks', width: 60 },
				{ title: '6M', dataIndex: 'teamResultDetails.sixMarks', width: 60 },
				{ title: '7M', dataIndex: 'teamResultDetails.sevenMarks', width: 60 },
				{ title: '8M', dataIndex: 'teamResultDetails.eightMarks', width: 60 },
				{ title: '9M', dataIndex: 'teamResultDetails.nineMarks', width: 60 },
				{ title: 'WH', dataIndex: 'teamResultDetails.whiteHorse', width: 60 }
			],
			rewardTableList: [{ captainId: 0 }],
			historyColumns: [
				{
					title: '排行',
					width: 65,
					dataIndex: 'name',
					fixed: 'left',
					slots: { customRender: 'action' }
				},
				{
					title: '队名',
					width: 200,
					dataIndex: 'name',
					fixed: 'left',
					slots: { customRender: 'teamName' }
				},
				{ title: 'LT', dataIndex: 'teamResultDetails.lowTon', width: 50 },
				{ title: 'HAT', dataIndex: 'teamResultDetails.hatTrick', width: 60 },
				{ title: 'HT', dataIndex: 'teamResultDetails.highTon', width: 60 },
				{ title: 'HT.OFF', dataIndex: 'teamResultDetails.highTonOut', width: 85 },
				{ title: 'LT.OFF', dataIndex: 'teamResultDetails.lowTonOut', width: 80 },
				{ title: 'BED', dataIndex: 'teamResultDetails.threeInBed', width: 70 },
				{ title: '180', dataIndex: 'teamResultDetails.ton80', width: 70 },
				{ title: '3 In the Black', dataIndex: 'teamResultDetails.threeInBlack', width: 70 },
				{ title: '5M', dataIndex: 'teamResultDetails.fiveMarks', width: 60 },
				{ title: '6M', dataIndex: 'teamResultDetails.sixMarks', width: 60 },
				{ title: '7M', dataIndex: 'teamResultDetails.sevenMarks', width: 60 },
				{ title: '8M', dataIndex: 'teamResultDetails.eightMarks', width: 60 },
				{ title: '9M', dataIndex: 'teamResultDetails.nineMarks', width: 60 },
				{ title: 'WH', dataIndex: 'teamResultDetails.whiteHorse', width: 60 }
			],
			playerColumns: [
				{
					title: '排行',
					width: 70,
					dataIndex: 'name',
					fixed: 'left',
					slots: { customRender: 'index' }
				},
				{
					title: '玩家',
					width: 200,
					dataIndex: 'playerName',
					fixed: 'left',
					slots: { customRender: 'player' }
				},
				{ title: 'Rating', dataIndex: 'playerRating.rating', width: 80 },
				{ title: 'PPD', dataIndex: 'playerRating.ppd', width: 70 },
				{ title: 'MPR', dataIndex: 'playerRating.mpr', width: 70 },
				{
					title: 'Set',
					key: '4',
					children: [
						{ title: 'Total', dataIndex: 'setResult.total', width: 70 },
						{ title: '胜率', dataIndex: 'setResult.winProbability', width: 85 },
						{ title: '胜', dataIndex: 'setResult.wins', width: 60 },
						{ title: '和', dataIndex: 'setResult.draws', width: 60 },
						{ title: '败', dataIndex: 'setResult.losses', width: 60 }
					]
				},
				{ title: 'LT', dataIndex: 'playerResultDetails.lowTon', width: 50 },
				{ title: 'HT', dataIndex: 'playerResultDetails.highTon', width: 65 },
				{ title: 'HAT', dataIndex: 'playerResultDetails.hatTrick', width: 70 },
				{ title: 'HT.OFF', dataIndex: 'playerResultDetails.highTonOut', width: 85 },
				{ title: 'LT.OFF', dataIndex: 'playerResultDetails.lowTonOut', width: 80 },
				{ title: 'BED', dataIndex: 'playerResultDetails.threeInBed', width: 65 },
				{ title: '180', dataIndex: 'playerResultDetails.ton80', width: 60 },
				{ title: '3 In the Black', dataIndex: 'playerResultDetails.threeInBlack', width: 80 },
				{ title: '5M', dataIndex: 'playerResultDetails.fiveMarks', width: 60 },
				{ title: '6M', dataIndex: 'playerResultDetails.sixMarks', width: 60 },
				{ title: '7M', dataIndex: 'playerResultDetails.sevenMarks', width: 60 },
				{ title: '8M', dataIndex: 'playerResultDetails.eightMarks', width: 60 },
				{ title: '9M', dataIndex: 'playerResultDetails.nineMarks', width: 60 },
				{ title: 'WH', dataIndex: 'playerResultDetails.whiteHorse', width: 60 }
			],
			playerTableList: [{ playerId: 0 }],
			tableList: [{ captainId: 0 }],
			showDialog: () => {
				data.visible = true;
			},
			dialogVisible: (value: boolean) => {
				data.visible = value;
			},
			handleMenuClick: () => {
				console.log('1');
			},
			Gohistory: () => {
				ROUTER.push('/result');
			},
			fastWay: (row: rowType) => {
				console.log(row);
			},
			divisitonChange: (value: any) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				data.stageList = data.divisitonList.find((i) => i.divisionId === value)!.stageList;
				if (data.stageList.length) {
					data.stageId = data.stageList[0].stageId;
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					data.teamList = data.stageList.find((i) => i.stageId === data.stageId)!.teamList;
					if (data.teamList.length) {
						data.teamId = data.teamList[0].teamId;
					}
				} else {
					data.stageId = '';
					data.teamList = [];
					data.teamId = '';
				}
			},
			stageChange: (value: any) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				data.teamList = data.stageList.find((i) => i.stageId === value)!.teamList;
				if (data.teamList.length) {
					data.teamId = data.teamList[0].teamId;
				} else {
					data.teamId = '';
				}
				data.teamChange();
			},
			teamChange: () => {
				data.isChange = true;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getPlayerList();
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getLeagueList();
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getRewardList();
			},
			pageChange: () => {
				console.log(1);
			},
			leaguePageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getLeagueList();
			},
			rewardPageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getRewardList();
			}
		});
		const getPlayerList = () => {
			const obj = {
				stageId: data.stageId,
				teamId: data.teamId,
				pageIndex: data.playerPageNum,
				pageSize: data.playerPageSize
			};
			rankingPlayerHttp(obj).then((res) => {
				data.playerTableList = res.data.data.list;
				data.playerTotal = res.data.data.totalCount;
				if (res.data.data.list.length) {
					data.isChange = false;
					data.playerObj = res.data.data.list[0];
					const obj: any = data.teamList.find((i) => data.teamId === i.teamId);
					data.teamName = obj.teamName;
				}
			});
		};
		const getLeagueList = () => {
			const obj = {
				stageId: data.stageId,
				sort: 12,
				pageIndex: data.leaguePageNum,
				pageSize: data.leaguePageSize
			};
			rakingLeagueListHttp(obj).then((res) => {
				data.leagueTableList = res.data.data.list;
				if (res.data.data.list.length) {
					data.isChange = false;
					data.teamObj = res.data.data.list[0];
				}
			});
		};
		const getRewardList = () => {
			const obj = {
				stageId: data.stageId,
				sort: 14,
				pageIndex: data.rewardPageNum,
				pageSize: data.rewardPageSize
			};
			rakingRewardListHttp(obj).then((res) => {
				data.rewardTableList = res.data.data.list;
				data.rewardTotal = res.data.data.totalCount;
				if (res.data.data.list.length) {
					data.isChange = false;
				}
			});
		};
		const getSelectList = () => {
			const obj = {
				competitionId: data.competitionId,
				teamFlag: true
			};
			leagueSelectHttp(obj).then((res) => {
				data.divisitonList = res.data.data;
				data.divisiton = res.data.data[0].divisionId;
				data.stageList = res.data.data[0].stageList;
				data.stageId = res.data.data[0].stageList[0].stageId;
				data.teamList = res.data.data[0].stageList[0].teamList;
				data.teamId = res.data.data[0].stageList[0].teamList[0].teamId;
				getPlayerList();
				getLeagueList();
				getRewardList();
			});
		};
		onMounted(() => {
			getSelectList();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.tableBtn {
	border-color: red;
	border-radius: 15px;
}
.tableImg {
	width: 50px;
	height: 50px;
}
.tableImg img {
	width: 100%;
	height: 100%;
}
.tabsBox >>> .ant-tabs-nav-scroll {
	display: flex;
}
.secondFont {
	font-size: 15px;
	color: red;
}
.iconRound {
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	margin: 0 5px 0 0;
	background: red;
}
.tableStyle {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.showPhoneTable {
	display: none;
}
.teamBox {
	display: flex;
	align-items: center;
}
</style>
