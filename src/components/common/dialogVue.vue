<template>
	<div>
		<a-modal v-model:visible="visible" :title="$t('default.261')" class="dialogBG" width="50%" centered :footer="null" @cancel="cancel">
			<a-row>
				<a-row class="dialogRow">
					<a-col>{{ infoData.competitionName }}</a-col>
				</a-row>
				<a-row>
					<a-col class="personBox">
						<div class="dialogImgBox">
							<img :src="infoData.teamImg" alt="" />
						</div>
						<div class="personInfo">
							<div>{{ infoData.teamName }}</div>
							<div>{{ infoData.shop.shopName }}</div>
							<div>
								<span>{{ $t('default.76') + ' : ' }}</span>
								<span>{{ infoData.captainName }}</span>
							</div>
						</div>
					</a-col>
				</a-row>
			</a-row>
			<a-row class="dialogRow">
				<div class="title">{{ $t('default.73') }}</div>
				<div>
					<a-table :columns="leagueColumns" :data-source="leagueList" rowkey="sort" :pagination="false" bordered></a-table>
				</div>
			</a-row>
			<a-row class="dialogRow">
				<div class="title">{{ 'Latest Result' }}</div>
				<a-row class="matchBox">
					<a-col class="matchTitle">{{ `Match No.(${infoData.latestConfrontation.round})` }}</a-col>
					<a-col :span="8" class="matchBoxDiv">
						<div>{{ 'Home Team' }}</div>
						<div class="matchImg"><img :src="infoData.latestConfrontation.homeTeamImg" alt="" /></div>
						<div>{{ infoData.latestConfrontation.homeTeamName }}</div>
						<div>{{ infoData.latestConfrontation.homeTeamShopName }}</div>
					</a-col>
					<a-col :span="8" class="matchBoxDiv">
						<div class="matchVS">
							<div>{{ `${infoData.latestConfrontation.date}  ${infoData.latestConfrontation.time}` }}</div>
							<div class="matchScore">
								<span class="scoreBox">{{ infoData.latestConfrontation.homeTeamScore }}</span>
								<span>{{ 'VS' }}</span>
								<span class="scoreBox">{{ infoData.latestConfrontation.visitingTeamScore }}</span>
							</div>
							<div>
								<a-button type="primary">{{ '详细资料' }}</a-button>
							</div>
						</div>
					</a-col>
					<a-col :span="8" class="matchBoxDiv">
						<div>{{ 'Away Team' }}</div>
						<div class="matchImg"><img :src="infoData.latestConfrontation.visitingTeamImg" alt="" /></div>
						<div>{{ infoData.latestConfrontation.visitingTeamName }}</div>
						<div>{{ infoData.latestConfrontation.visitingTeamShopName }}</div>
					</a-col>
				</a-row>
			</a-row>
			<a-row class="dialogRow">
				<div class="title">{{ $t('default.262') }}</div>
				<div>
					<a-table :columns="playerColumns" :data-source="playerList" :scroll="{ x: 1650 }" :pagination="false" bordered rowKey="playerId">
						<template #player="{record}">
							<div class="playerInfoBox">
								<div class="imgBox">
									<span v-if="record.playerImg"><img :src="record.playerImg" alt=""/></span>
									<span v-else><img :src="defaultPlayerImg" alt=""/></span>
								</div>
								<div class="link" @click="showDialog(record.id)">{{ record.playerName }}</div>
							</div>
						</template>
					</a-table>
				</div>
				<div class="pagination">
					<a-pagination v-model:current="playerPageNum" v-model:pageSize="playerPageSize" :total="playerTotal" @change="playerPageChange" />
				</div>
			</a-row>
			<a-row class="dialogRow">
				<div class="title">{{ $t('default.263') }}</div>
				<div>
					<a-table :columns="historyColumns" :data-source="historyList" :pagination="false" bordered rowKey="confrontationId">
						<template #otherTeam="{ record }">
							<div>{{ getOtherTeam(record) }}</div>
						</template>
						<template #winner="{ record }">
							<div class="stateBox">
								<div v-if="record.status === 3 && record.homeTeamScore !== record.visitingTeamScore" class="stateDiv">{{ getState(record) }}</div>
								<div>{{ getScoreInfo(record) }}</div>
							</div>
						</template>
						<template #info="{ record }">
							<div class="infoBtn" @click="infoClick(record)">{{ $t('default.272') }}</div>
						</template>
					</a-table>
				</div>
				<div class="pagination">
					<a-pagination v-model:current="historyPageNum" v-model:pageSize="historyPageSize" :total="historyTotal" @change="historyPageChange" />
				</div>
			</a-row>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { dialogInfoHttp, dialogTeamListHttp, dialogHistoryListHttp } from '@/axios/api';
// import { SettingFilled }'@ant-design/icons-vue';
export default defineComponent({
	name: 'dialogVue',
	props: ['propsVisible', 'teamId', 'competitionId'],
	setup(props, ctx) {
		const { emit } = ctx;
		const data = reactive({
			visible: props.propsVisible,
			teamId: props.teamId,
			competitionId: props.competitionId,
			defaultPlayerImg: require('@/assets/player.png'),
			infoData: {
				shop: {},
				latestConfrontation: {}
			},
			playerTotal: 1,
			playerPageNum: 1,
			playerPageSize: 10,
			historyTotal: 1,
			historyPageNum: 1,
			historyPageSize: 10,
			playerColumns: [
				{ title: '排行', dataIndex: 'sort', fixed: 'left' },
				{ title: '玩家', dataIndex: 'name', fixed: 'left', width: 200, slots: { customRender: 'player' } },
				{
					title: 'Match',
					children: [
						{ title: 'Rating', dataIndex: 'playerRating.rating', width: 80 },
						{ title: 'PPD', dataIndex: 'playerRating.ppd', width: 70 },
						{ title: 'MPR', dataIndex: 'playerRating.mpr', width: 70 }
					]
				},
				{
					title: 'Set',
					children: [
						{ title: 'Total', dataIndex: 'setResult.total', width: 70 },
						{ title: '胜', dataIndex: 'setResult.wins', width: 60 },
						{ title: '败', dataIndex: 'setResult.losses', width: 60 },
						{ title: '和', dataIndex: 'setResult.draws', width: 60 }
					]
				},
				{ title: 'LF', dataIndex: 'playerResultDetails.lowTon', width: 60 },
				{ title: 'HAT', dataIndex: 'playerResultDetails.hatTrick', width: 70 },
				{ title: 'HT', dataIndex: 'playerResultDetails.highTon', width: 60 },
				{ title: 'HT.OFF', dataIndex: 'playerResultDetails.highTonOut', width: 80 },
				{ title: 'LT.OFF', dataIndex: 'playerResultDetails.lowTonOut', width: 80 },
				{ title: 'BED', dataIndex: 'playerResultDetails.threeInBed', width: 70 },
				{ title: '180', dataIndex: 'playerResultDetails.ton80', width: 70 },
				{ title: 'EYE', dataIndex: 'playerResultDetails.threeInBlack', width: 70 },
				{ title: '5M', dataIndex: 'playerResultDetails.fiveMarks', width: 60 },
				{ title: '6M', dataIndex: 'playerResultDetails.sixMarks', width: 60 },
				{ title: '7M', dataIndex: 'playerResultDetails.sevenMarks', width: 60 },
				{ title: '8M', dataIndex: 'playerResultDetails.eightMarks', width: 60 },
				{ title: '9M', dataIndex: 'playerResultDetails.nineMarks', width: 60 },
				{ title: 'WH', dataIndex: 'playerResultDetails.whiteHorse', width: 60 }
			],
			historyColumns: [
				{ title: '日期', dataIndex: 'date', width: 200 },
				{ title: 'vs.Team', dataIndex: 'name', slots: { customRender: 'otherTeam' } },
				{ title: 'Win / Lose', dataIndex: 'name', width: 150, slots: { customRender: 'winner' } },
				{ title: '详情', dataIndex: 'name', width: 100, slots: { customRender: 'info' } }
			],
			leagueColumns: [
				{ title: '排行', dataIndex: 'sort' },
				{ title: 'Total Point', dataIndex: 'score' },
				{
					title: 'Match',
					children: [
						{ title: '胜', dataIndex: 'matchWin' },
						{ title: '败', dataIndex: 'matchLosse' },
						{ title: '和', dataIndex: 'matchDraw' }
					]
				},
				{
					title: 'Set',
					children: [
						{ title: '胜', dataIndex: 'setWin' },
						{ title: '败', dataIndex: 'setLosse' },
						{ title: '和', dataIndex: 'setDraw' }
					]
				},
				{ title: '胜出分数', dataIndex: 'winScore' },
				{ title: '罚分', dataIndex: 'penaltyPoint' }
			],
			leagueList: [{ sort: 0, score: 0, matchWin: 0, matchLosse: 0, matchDraw: 0, setWin: 0, setLosse: 0, setDraw: 0, winScore: 0, penaltyPoint: 0 }],
			playerList: [{ playerId: 1 }],
			historyList: [{ confrontationId: 1, date: '2020-10-1' }],
			playerPageChange: () => {
				console.log(1);
			},
			historyPageChange: () => {
				console.log(1);
			},
			infoClick: (row: any) => {
				console.log(row);
			},
			cancel: () => {
				emit('dialogVisible', false);
			},
			getOtherTeam: (row: any) => {
				let str = '';
				if (row.homeTeamId === data.teamId) {
					str = `${row.visitingTeamName}(${row.visitingTeamShopName})`;
				} else {
					str = `${row.homeTeamName}(${row.homeTeamShopName})`;
				}
				return str;
			},
			getState: (row: any) => {
				let str = '';
				if (row.homeTeamId === data.teamId && row.homeTeamScore > row.visitingTeamScore) {
					str = `win`;
				} else {
					str = `Lost`;
				}
				return str;
			},
			getScoreInfo: (row: any) => {
				let str = '';
				if (row.homeTeamId === data.teamId && row.homeTeamScore > row.visitingTeamScore) {
					str = `${row.visitingTeamScore} : ${row.homeTeamScore}`;
				} else {
					str = `${row.homeTeamScore} : ${row.visitingTeamScore}`;
				}
				return str;
			}
		});
		const getInfoData = () => {
			const obj = {
				competitionId: data.competitionId,
				teamId: data.teamId
			};
			dialogInfoHttp(obj).then((res) => {
				if (res.data.data) {
					data.infoData = res.data.data;
					data.leagueList = [
						{
							sort: res.data.data.sort,
							score: res.data.data.score,
							matchWin: res.data.data.matchResult && res.data.data.matchResult.wins,
							matchLosse: res.data.data.matchResult && res.data.data.matchResult.losses,
							matchDraw: res.data.data.matchResult && res.data.data.matchResult.draws,
							setWin: res.data.data.setResult && res.data.data.setResult.wins,
							setLosse: res.data.data.setResult && res.data.data.setResult.losses,
							setDraw: res.data.data.setResult && res.data.data.setResult.draws,
							winScore: res.data.data.winScore,
							penaltyPoint: res.data.data.penaltyPoint
						}
					];
				}
			});
		};
		const getTeamList = () => {
			const obj = {
				teamId: data.teamId,
				competitionId: data.competitionId,
				pageIndex: data.playerPageNum,
				pageSize: data.playerPageSize
			};
			dialogTeamListHttp(obj).then((res) => {
				data.playerList = res.data.data.list;
			});
		};
		const getHistoryList = () => {
			const obj = {
				teamId: data.teamId,
				competitionId: data.competitionId,
				pageIndex: data.historyPageNum,
				pageSize: data.historyPageSize
			};
			dialogHistoryListHttp(obj).then((res) => {
				data.historyList = res.data.data.list;
			});
		};
		// onMounted(() => {
		// 	getInfoData();
		// 	getTeamList();
		// 	getHistoryList();
		// });
		watch(
			() => [props.propsVisible, props.teamId, props.competitionId],
			([newPropsVisible, newTeamId, newCompetitionId]) => {
				data.visible = newPropsVisible;
				data.teamId = newTeamId;
				data.competitionId = newCompetitionId;
				getInfoData();
				getTeamList();
				getHistoryList();
			}
		);
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.dialogRow {
	margin: 20px 0;
}
.personBox {
	display: flex;
	align-items: center;
}
.dialogImgBox {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	overflow: hidden;
}
.dialogImgBox img {
	width: 100%;
}
.personInfo {
	padding-left: 20px;
}
.matchBox {
	border-top: 2px solid #4b4b4b;
	border-left: 1px solid #eee;
	border-right: 1px solid #eee;
	border-bottom: 1px solid #eee;
	text-align: center;
	height: 250px;
}
.matchBoxDiv {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	border: 1px solid #eee;
}
.matchTitle {
	color: #5a5a5a;
	background: #f1f0ed;
	padding: 10px 0;
}
.matchImg {
	height: 100px;
	width: 100px;
	margin: 0 auto;
}
.matchImg img {
	width: 100%;
}
.matchVS {
	height: 100%;
	display: flex;
	flex-direction: column;
}
.matchScore {
	display: flex;
	flex-grow: 2;
	align-items: center;
	font-size: 20px;
	justify-content: space-around;
}
.playerInfoBox {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.imgBox {
	width: 50px;
}
.imgBox img {
	width: 100%;
}
.title {
	margin: 10px 0;
	font-weight: bold;
}
.scoreBox {
	font-size: 60px;
	font-weight: bold;
}
.infoBtn {
	text-align: center;
	color: #fff;
	background: #ff5e00;
	cursor: pointer;
}
.stateBox {
	display: flex;
	justify-content: space-around;
}
.stateDiv {
	color: #fff;
	background: #ff5e00;
}
</style>
