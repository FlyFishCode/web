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
						<a-col :lg="{ span: 3, offset: 15 }" :xs="0">
							<a-button type="danger" @click="showMatchTable">{{ $t('default.151') }}</a-button>
						</a-col>
					</a-row>

					<a-row class="inPhoneTableDisplay">
						<showTeam :teamObj="teamObj" />
					</a-row>

					<a-row class="rowStyle">
						<a-col :lg="2" :xs="8">
							<div><span class="iconRound"></span>{{ $t('default.73') }}</div>
						</a-col>
						<a-col :lg="{ span: 2, offset: 20 }" :xs="0">
							<a-button type="primary" size="small">{{ $t('default.69') }}</a-button>
						</a-col>
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
						<a-table class="showPhoneTable" :columns="leagueColumns" :data-source="leagueTableList" rowkey="captainId" :pagination="false" :scroll="{ x: 300 }" bordered>
							<template v-slot:teamName="{ record }">
								<img class="tableImg" :src="record.img" alt="" />
								<div class="link">{{ record.teamName }}</div>
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
						<a-table class="inPhoneTableDisplay" :scroll="{ x: 1200 }" :columns="rewardColumns" :data-source="rewardTableList" :pagination="false" rowkey="captainId" bordered>
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
						<a-table class="showPhoneTable" :pagination="false" :scroll="{ x: 400 }" :columns="historyColumns" rowkey="captainId" :data-source="tableList" bordered>
							<template v-slot:teamName="{ record }">
								<img class="tableImg" :src="record.img" alt="" />
								<a @click="fastWay(row)">{{ record.address }}</a>
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
							<a-select v-model:value="leagueId" @change="leagueChange" class="selectBox">
								<a-select-option v-for="item in leagueList" :key="item.teamId" :value="item.teamId">{{ item.teamName }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :lg="3" :offset="6" :xs="0">
							<a-button type="danger" @click="showMatchTable">{{ $t('default.151') }}</a-button>
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
						<a-col :lg="2" :offset="20" :xs="0">
							<a-button type="primary" size="small">{{ $t('default.69') }}</a-button>
						</a-col>
					</a-row>

					<a-row>
						<a-table :columns="playerColumns" :data-source="playerTableList" rowkey="playerId" :scroll="{ x: 1300 }" :pagination="false" bordered>
							<template #index="{ index }">
								<div>{{ index + 1 }}</div>
							</template>
							<template #player="{ record }">
								<div class="tableStyle">
									<img class="tableImg" :src="record.playerImg" alt="" />
									<div>
										<div>{{ record.playerName }}</div>
										<div class="link" @click="showDialog(record.teamId)">{{ record.shop.shopName }}</div>
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
// eslint-disable-next-line @typescript-eslint/class-name-casing
interface rowType {
	[x: string]: string | number;
}
interface DataProps {
	stageId: string | number;
	league: string | number;
	stageList: [{ stageId: string; teamList: Array<any> }];
	leagueList: [{ teamId: string }];
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
			teamId: 1,
			competitionId: ROUTE.query.competitionId,
			stageId: '',
			divisiton: '',
			leagueId: '',
			leagueList: [{ teamId: '' }],
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
				{ title: 'EYE', dataIndex: 'teamResultDetails.threeInBlack', width: 70 },
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
					width: 140,
					dataIndex: 'name',
					fixed: 'left',
					slots: { customRender: 'teamName' }
				},
				{ title: 'LT', dataIndex: 'homeScore', width: 50 },
				{ title: 'HAT', dataIndex: 'homeScore', width: 60 },
				{ title: 'HT', dataIndex: 'homeScore', width: 60 },
				{ title: 'HT.OFF', dataIndex: 'homeScore', width: 85 },
				{ title: 'LT.OFF', dataIndex: 'homeScore', width: 80 },
				{ title: 'BED', dataIndex: 'homeScore', width: 70 },
				{ title: '180', dataIndex: 'homeScore', width: 70 },
				{ title: 'EYE', dataIndex: 'homeScore', width: 70 },
				{ title: '5M', dataIndex: 'homeScore', width: 60 },
				{ title: '6M', dataIndex: 'homeScore', width: 60 },
				{ title: '7M', dataIndex: 'homeScore', width: 60 },
				{ title: '8M', dataIndex: 'homeScore', width: 60 },
				{ title: '9M', dataIndex: 'homeScore', width: 60 },
				{ title: 'WH', dataIndex: 'homeScore', width: 60 }
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
				{ title: 'PPD', dataIndex: 'playerRating.ppd', width: 80 },
				{ title: 'MPR', dataIndex: 'playerRating.mpr', width: 80 },
				{
					title: 'Set',
					key: '4',
					children: [
						{ title: 'Total', dataIndex: 'setResult.total', width: 80 },
						{ title: '胜率', dataIndex: 'setResult.winProbability', width: 80 },
						{ title: '胜', dataIndex: 'setResult.wins', width: 80 },
						{ title: '和', dataIndex: 'setResult.draws', width: 80 },
						{ title: '败', dataIndex: 'setResult.losses', width: 80 }
					]
				},
				{ title: 'LT', dataIndex: 'playerResultDetails.lowTon', width: 80 },
				{ title: 'HAT', dataIndex: 'playerResultDetails.hatTrick', width: 80 },
				{ title: 'HT.OFF', dataIndex: 'playerResultDetails.highTonOut', width: 80 },
				{ title: 'LT.OFF', dataIndex: 'playerResultDetails.lowTonOut', width: 80 },
				{ title: 'BED', dataIndex: 'playerResultDetails.threeInBed', width: 60 },
				{ title: '180', dataIndex: 'playerResultDetails.ton80', width: 60 },
				{ title: 'EYE', dataIndex: 'playerResultDetails.threeInBlack	', width: 60 },
				{ title: '5M', dataIndex: 'playerResultDetails.fiveMarks', width: 60 },
				{ title: '6M', dataIndex: 'playerResultDetails.sixMarks', width: 60 },
				{ title: '7M', dataIndex: 'playerResultDetails.sevenMarks', width: 60 },
				{ title: '8M', dataIndex: 'playerResultDetails.eightMarks', width: 60 },
				{ title: '9M', dataIndex: 'playerResultDetails.nineMarks', width: 60 },
				{ title: 'WH', dataIndex: 'playerResultDetails.whiteHorse', width: 60 }
			],
			playerTableList: [{ playerId: 0 }],
			tableList: [{ captainId: 0 }],
			showDialog: (value: number) => {
				data.teamId = value;
				data.visible = true;
			},
			dialogVisible: (value: boolean) => {
				data.visible = value;
			},
			showMatchTable: () => {
				console.log('1111');
			},
			handleMenuClick: () => {
				console.log('1');
			},
			onSearch: () => {
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
					data.leagueList = data.stageList.find((i) => i.stageId === data.stageId)!.teamList;
					if (data.leagueList.length) {
						data.leagueId = data.leagueList[0].teamId;
					}
				} else {
					data.stageId = '';
					data.leagueList = [];
					data.leagueId = '';
				}
			},
			stageChange: (value: any) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				data.leagueList = data.stageList.find((i) => i.stageId === value)!.teamList;
				if (data.leagueList.length) {
					data.leagueId = data.leagueList[0].teamId;
				} else {
					data.leagueId = '';
				}
				data.leagueChange();
			},
			leagueChange: () => {
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
				teamId: data.leagueId,
				pageIndex: data.playerPageNum,
				pageSize: data.playerPageSize
			};
			rankingPlayerHttp(obj).then((res) => {
				data.playerTableList = res.data.data.list;
				data.playerTotal = res.data.data.totalCount;
				if (res.data.data.list.length) {
					data.isChange = false;
					data.playerObj = res.data.data.list[0];
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
				data.leagueList = res.data.data[0].stageList[0].teamList;
				data.leagueId = res.data.data[0].stageList[0].teamList[0].teamId;
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
	justify-content: space-around;
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
