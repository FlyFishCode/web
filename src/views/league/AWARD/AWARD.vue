<template>
	<div class="content">
		<a-row>
			<a-col :span="4" class="smallTitle"> <SettingFilled /> {{ $t('default.259') }} </a-col>
		</a-row>
		<a-row>
			<a-row class="awardTop">
				<a-row class="awardRow">
					<a-col :span="11">
						<span class="teamBox home">{{ awardData.homeName }}</span>
					</a-col>
					<a-col :span="2"></a-col>
					<a-col :span="11">
						<span class="teamBox away">{{ awardData.awayTean }}</span>
					</a-col>
				</a-row>
				<a-row class="awardRow">
					<a-col :span="11">
						<span class="home teamName" @click="showDialog(0)">{{ awardData.HomeCaptain }}</span>
					</a-col>
					<a-col :span="2"></a-col>
					<a-col :span="11">
						<span class="away teamName" @click="showDialog(1)">{{ awardData.awayCaptain }}</span>
					</a-col>
				</a-row>
				<a-row class="awardRow" id="awardProgress">
					<a-col :span="11">
						<a-col :span="8"><a-progress type="circle" status="exception" :format="(percent) => `Rating  ${percent}`" :percent="parseInt(awardData.homeRating)"/></a-col>
						<a-col :span="8"><a-progress type="circle" status="exception" :format="(percent) => `PPD  ${percent}`" :percent="parseInt(awardData.homePPD)"/></a-col>
						<a-col :span="8"><a-progress type="circle" status="exception" :format="(percent) => `MPR  ${percent}`" :percent="parseInt(awardData.homeMPR)"/></a-col>
					</a-col>
					<a-col :span="2" class="awardVs">{{ 'VS' }}</a-col>
					<a-col :span="11">
						<a-col :span="8"><a-progress type="circle" :format="(percent) => `Rating  ${percent}`" :percent="parseInt(awardData.awayRating)"/></a-col>
						<a-col :span="8"><a-progress type="circle" :format="(percent) => `PPD  ${percent}`" :percent="parseInt(awardData.awayPPD)"/></a-col>
						<a-col :span="8"><a-progress type="circle" :format="(percent) => `MPR  ${percent}`" :percent="parseInt(awardData.awayMPR)"/></a-col>
					</a-col>
				</a-row>
				<transition enter-active-class="animate__animated animate__fadeInUp">
					<a-row v-if="!isUp">
						<a-row v-for="every in awardData.list" :key="every.id">
							<a-col :span="11" class="progressBox">
								<div>{{ every.homeScore }}</div>
								<a-progress :percent="every.homeScore" status="exception" :show-info="false" />
							</a-col>
							<a-col :span="2">{{ every.title }}</a-col>
							<a-col :span="11" class="progressBox">
								<a-progress :percent="every.awayScore" :show-info="false" />
								<div>{{ every.awayScore }}</div>
							</a-col>
						</a-row>
					</a-row>
				</transition>
				<a-row>
					<a-col v-if="isUp">
						<span @click="changeIcon" class="awardIcon"><DownOutlined /></span>
					</a-col>
					<a-col v-else>
						<span @click="changeIcon" class="awardIcon"><UpOutlined /></span>
					</a-col>
				</a-row>
			</a-row>
		</a-row>
		<a-row class="awardRow">
			<a-col class="teamBox home" :span="3">{{ 'Home Team' }}</a-col>
			<a-col class="home teamName" :span="3" @click="showDialog(0)">{{ 'Home Team' }}</a-col>
		</a-row>
		<a-row class="awardTop">
			<a-table :columns="homeColumns" :data-source="homeList" :pagination="false" :scroll="{ x: 1300 }" bordered rowKey="playerId">
				<template #sort="{index}">
					<div>{{ index + 1 }}</div>
				</template>
				<template #player="{record}">
					<div class="playerInfoBox">
						<div class="imgBox"><img :src="record.playerImg" alt="" /></div>
						<div class="link" @click="showDialog(0)">{{ record.playerName }}</div>
					</div>
				</template>
			</a-table>
		</a-row>
		<a-row class="awardRow">
			<a-col class="teamBox home" :span="3">{{ 'Away Team' }}</a-col>
			<a-col class="home teamName" :span="3" @click="showDialog(1)">{{ 'Away Team' }}</a-col>
		</a-row>
		<a-row class="awardTop">
			<a-table :columns="homeColumns" :data-source="awayList" :pagination="false" :scroll="{ x: 1300 }" bordered rowKey="playerId">
				<template #sort="{index}">
					<div>{{ index + 1 }}</div>
				</template>
				<template #player="{record}">
					<div class="playerInfoBox">
						<div class="imgBox"><img :src="record.playerImg" alt="" /></div>
						<div class="link" @click="showDialog(1)">{{ record.playerName }}</div>
					</div>
				</template>
			</a-table>
		</a-row>
		<dialogVue :propsVisible="diaVisible" :teamId="teamId" :competitionId="competitionId" @dialogVisible="dialogVisible" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { SettingFilled, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { awardInfoHttp, awardHomeListHttp, awardAwayListHttp } from '@/axios/api';
import dialogVue from '@/components/common/dialogVue.vue';
import { useRoute } from 'vue-router';

interface DataProps {
	isUp: boolean;
	teamId: number;
	homeTeamId: number;
	awayTeamId: number;
	diaVisible: boolean;
	homeList: Array<any>;
	awayList: Array<any>;
	awardData: {
		list: Array<any>;
	};
}

export default defineComponent({
	name: 'templete',
	props: ['confrontationId'],
	components: {
		SettingFilled,
		DownOutlined,
		UpOutlined,
		dialogVue
	},
	setup(prop: any) {
		const ROUTE = useRoute();
		const data: DataProps = reactive({
			isUp: true,
			teamId: 0,
			homeTeamId: 0,
			awayTeamId: 0,
			diaVisible: false,
			competitionId: ROUTE.query.competitionId,
			showDialog: (type: number) => {
				if (type) {
					data.teamId = data.awayTeamId;
				} else {
					data.teamId = data.homeTeamId;
				}
				data.diaVisible = true;
			},
			lenguaColumns: [
				{
					title: '排行',
					dataIndex: 'name',
					slots: { customRender: 'name' }
				},
				{
					title: 'Total Point',
					dataIndex: 'money'
				},
				{
					title: 'Match',
					children: [
						{
							title: '胜',
							dataIndex: 'awayScore',
							key: 'awayScore'
						},
						{
							title: '败',
							dataIndex: 'awayName',
							key: 'awayName'
						},
						{
							title: '和',
							dataIndex: 'awayName',
							key: 'awayName'
						}
					]
				},
				{
					title: 'Set',
					children: [
						{
							title: '胜',
							dataIndex: 'awayScore',
							key: 'awayScore'
						},
						{
							title: '败',
							dataIndex: 'awayName',
							key: 'awayName'
						},
						{
							title: '和',
							dataIndex: 'awayName',
							key: 'awayName'
						}
					]
				},
				{
					title: '胜出分数',
					dataIndex: 'money'
				},
				{
					title: '罚分',
					dataIndex: 'money'
				}
			],
			homeList: [],
			awayList: [],
			historyColumns: [
				{
					title: '日期',
					dataIndex: 'dete',
					slots: { customRender: 'dete' }
				},
				{
					title: 'vs. Team',
					dataIndex: 'money'
				},
				{
					title: 'Win / Lose',
					dataIndex: 'money'
				},
				{
					title: '详情',
					dataIndex: 'money'
				}
			],
			lenguaData: [],
			historyData: [{ dete: '2020-5-12' }, { dete: '2020-6-12' }, { dete: '2020-7-12' }, { dete: '2020-8-12' }],
			awardData: {
				homeName: '',
				awayTean: '',
				HomeCaptain: '',
				awayCaptain: '',
				homeRating: '',
				homePPD: '',
				homeMPR: '',
				awayRating: '',
				awayPPD: '',
				awayMPR: '',
				list: []
			},
			homeColumns: [
				{
					title: '排行',
					width: 70,
					fixed: 'left',
					slots: { customRender: 'sort' }
				},
				{
					title: '玩家',
					width: 200,
					fixed: 'left',
					dataIndex: 'address',
					slots: { customRender: 'player' }
				},
				{
					title: 'Rating',
					width: 80,
					dataIndex: 'playerRating.rating'
				},
				{
					title: 'PPD',
					width: 70,
					dataIndex: 'playerRating.ppd'
				},
				{
					title: 'MPR',
					width: 70,
					dataIndex: 'playerRating.mpr'
				},
				{
					title: 'LT',
					width: 60,
					dataIndex: 'playerResultDetails.lowTon'
				},
				{
					title: 'HAT',
					width: 70,
					dataIndex: 'playerResultDetails.hatTrick'
				},
				{
					title: 'HT',
					width: 60,
					dataIndex: 'playerResultDetails.highTon'
				},
				{
					title: 'HT.OFF',
					width: 90,
					dataIndex: 'playerResultDetails.highTonOut'
				},
				{
					title: 'LT.OFF',
					width: 80,
					dataIndex: 'playerResultDetails.lowTonOut'
				},
				{
					title: 'BED',
					width: 70,
					dataIndex: 'playerResultDetails.threeInBed'
				},
				{
					title: '180',
					width: 70,
					dataIndex: 'playerResultDetails.ton80'
				},
				{
					title: 'EYE',
					width: 70,
					dataIndex: 'playerResultDetails.threeInBlack'
				},
				{
					title: '5M',
					key: 'Rating',
					width: 60,
					dataIndex: 'playerResultDetails.fiveMarks'
				},
				{
					title: '6M',
					width: 60,
					dataIndex: 'playerResultDetails.sixMarks'
				},
				{
					title: '7M',
					key: 'Rating',
					width: 60,
					dataIndex: 'playerResultDetails.sevenMarks'
				},
				{
					title: '8M',
					width: 60,
					dataIndex: 'playerResultDetails.eightMarks'
				},
				{
					title: '9M',
					width: 60,
					dataIndex: 'playerResultDetails.nineMarks'
				},
				{
					title: 'WH',
					width: 60,
					dataIndex: 'playerResultDetails.whiteHorse'
				}
			],
			homeData: [
				{ id: 1, img: require('@/assets/1.jpg'), playerName: '王富贵' },
				{ id: 2, img: require('@/assets/1.jpg'), playerName: '李逍遥' },
				{ id: 3, img: require('@/assets/1.jpg'), playerName: '刘长安' },
				{ id: 4, img: require('@/assets/1.jpg'), playerName: '张自然' }
			],
			changeIcon: () => {
				data.isUp = !data.isUp;
			},
			dialogVisible: (value: boolean) => {
				data.diaVisible = value;
			}
		});
		const getAwardData = () => {
			awardInfoHttp({ confrontationId: prop.confrontationId }).then((res) => {
				if (!res.data.data) return;
				const { homeTeam, visitingTeam } = res.data.data;
				const obj = {
					homeName: homeTeam.teamName,
					homeId: homeTeam.teamId,
					HomeCaptain: homeTeam.captainName,
					homeRating: homeTeam.competitionRating.rating,
					homePPD: homeTeam.competitionRating.ppd,
					homeMPR: homeTeam.competitionRating.mpr,
					awayTean: visitingTeam.teamName,
					awayId: homeTeam.teamId,
					awayCaptain: visitingTeam.captainName,
					awayRating: visitingTeam.competitionRating.ppd,
					awayPPD: visitingTeam.competitionRating.ppd,
					awayMPR: visitingTeam.competitionRating.ppd,
					list: [
						{ homeScore: homeTeam.teamResultDetails.lowTon, title: 'LT', awayScore: visitingTeam.teamResultDetails.lowTon },
						{ homeScore: homeTeam.teamResultDetails.highTon, title: 'HT', awayScore: visitingTeam.teamResultDetails.highTon },
						{ homeScore: homeTeam.teamResultDetails.highTonOut, title: 'HT.OFF', awayScore: visitingTeam.teamResultDetails.highTonOut },
						{ homeScore: homeTeam.teamResultDetails.lowTonOut, title: 'LT.OFF', awayScore: visitingTeam.teamResultDetails.lowTonOut },
						{ homeScore: homeTeam.teamResultDetails.hatTrick, title: 'HAT', awayScore: visitingTeam.teamResultDetails.hatTrick },
						{ homeScore: homeTeam.teamResultDetails.threeInBed, title: 'BED', awayScore: visitingTeam.teamResultDetails.threeInBed },
						{ homeScore: homeTeam.teamResultDetails.ton80, title: '180', awayScore: visitingTeam.teamResultDetails.ton80 },
						{ homeScore: homeTeam.teamResultDetails.threeInBlack, title: 'EYE', awayScore: visitingTeam.teamResultDetails.threeInBlack },
						{ homeScore: homeTeam.teamResultDetails.fiveMarks, title: '5M', awayScore: visitingTeam.teamResultDetails.fiveMarks },
						{ homeScore: homeTeam.teamResultDetails.sixMarks, title: '6M', awayScore: visitingTeam.teamResultDetails.sixMarks },
						{ homeScore: homeTeam.teamResultDetails.sevenMarks, title: '7M', awayScore: visitingTeam.teamResultDetails.sevenMarks },
						{ homeScore: homeTeam.teamResultDetails.eightMarks, title: '8M', awayScore: visitingTeam.teamResultDetails.eightMarks },
						{ homeScore: homeTeam.teamResultDetails.nineMarks, title: '9M', awayScore: visitingTeam.teamResultDetails.nineMarks },
						{ homeScore: homeTeam.teamResultDetails.whiteHorse, title: 'WH', awayScore: visitingTeam.teamResultDetails.whiteHorse }
					]
				};
				data.awardData = obj;
				data.homeTeamId = homeTeam.teamId;
				data.awayTeamId = visitingTeam.teamId;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getHomeList(homeTeam.teamId);
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAwayList(visitingTeam.teamId);
			});
		};
		const getHomeList = (teamId: number) => {
			const obj = {
				confrontationId: prop.confrontationId,
				sort: '',
				teamId
			};
			awardHomeListHttp(obj).then((res) => {
				data.homeList = res.data.data;
			});
		};
		const getAwayList = (teamId: number) => {
			const obj = {
				confrontationId: prop.confrontationId,
				sort: '',
				teamId
			};
			awardAwayListHttp(obj).then((res) => {
				data.awayList = res.data.data;
			});
		};
		onMounted(() => {
			getAwardData();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.awardRow {
	margin: 10px 0;
	display: flex;
	align-items: center;
}
.awardTop {
	border: 1px solid #dfdfdf;
}
.teamBox {
	border: 2px solid #f2f2f2;
	padding: 5px;
	border-radius: 15px;
}
.teamName {
	cursor: pointer;
	text-decoration: underline;
	font-weight: bold;
}
.home {
	color: #f5222d;
	border-color: #f5222d;
}
.away {
	color: #1890ff;
	border-color: #1890ff;
}
.awardVs {
	font-size: 30px;
	font-weight: bold;
}
#awardProgress >>> .ant-progress-circle .ant-progress-text {
	width: 60%;
}
.awardIcon {
	font-size: 30px;
	cursor: pointer;
}
.progressBox {
	display: flex;
}
.progressBox div {
	margin: 0 15px;
}
.animate__fadeInUp {
	transition: all 1s ease;
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
.dialogImgBox {
	height: 100px;
	width: 100px;
	border-radius: 50%;
	overflow: hidden;
}
.dialogImgBox img {
	width: 100%;
	width: 100%;
}
.personBox {
	display: flex;
	align-items: center;
}
.personInfo {
	padding-left: 20px;
}
.dialogRow {
	margin: 20px 0;
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
</style>
