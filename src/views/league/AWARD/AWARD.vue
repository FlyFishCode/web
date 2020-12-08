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
						<span class="home teamName">{{ awardData.HomeCaptain }}</span>
					</a-col>
					<a-col :span="2"></a-col>
					<a-col :span="11">
						<span class="away teamName">{{ awardData.awayCaptain }}</span>
					</a-col>
				</a-row>
				<a-row class="awardRow" id="awardProgress">
					<a-col :span="11">
						<a-col :span="8"><a-progress type="circle" status="exception" :format="(percent) => `Rating  ${percent}`" :percent="awardData.homeRating"/></a-col>
						<a-col :span="8"><a-progress type="circle" status="exception" :format="(percent) => `PPD  ${percent}`" :percent="awardData.homePPD"/></a-col>
						<a-col :span="8"><a-progress type="circle" status="exception" :format="(percent) => `MPR  ${percent}`" :percent="awardData.homeMPR"/></a-col>
					</a-col>
					<a-col :span="2" class="awardVs">{{ 'VS' }}</a-col>
					<a-col :span="11">
						<a-col :span="8"><a-progress type="circle" :format="(percent) => `Rating  ${percent}`" :percent="awardData.awayRating"/></a-col>
						<a-col :span="8"><a-progress type="circle" :format="(percent) => `PPD  ${percent}`" :percent="awardData.awayPPD"/></a-col>
						<a-col :span="8"><a-progress type="circle" :format="(percent) => `MPR  ${percent}`" :percent="awardData.awayMPR"/></a-col>
					</a-col>
				</a-row>
				<transition enter-active-class="animate__animated animate__fadeInUp">
					<a-row v-if="!isUp">
						<a-row v-for="every in awardData.awardList" :key="every.id">
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
			<a-col class="home teamName" :span="3" @click="showDialog()">{{ 'Home Team' }}</a-col>
		</a-row>
		<a-row class="awardTop">
			<a-table :columns="homeColumns" :data-source="homeData" :scroll="{ x: 1300 }" bordered rowKey="id">
				<template #player="{record}">
					<div class="playerInfoBox">
						<div class="imgBox"><img :src="record.img" alt="" /></div>
						<div class="link" @click="showDialog(record.id)">{{ record.playerName }}</div>
					</div>
				</template>
			</a-table>
		</a-row>
		<a-row class="awardRow">
			<a-col class="teamBox home" :span="3">{{ 'Away Team' }}</a-col>
			<a-col class="home teamName" :span="3" @click="showDialog()">{{ 'Away Team' }}</a-col>
		</a-row>
		<a-row class="awardTop">
			<a-table :columns="homeColumns" :data-source="homeData" :scroll="{ x: 1300 }" bordered rowKey="id">
				<template #player="{record}">
					<div class="playerInfoBox">
						<div class="imgBox"><img :src="record.img" alt="" /></div>
						<div class="link" @click="showDialog(record.id)">{{ record.playerName }}</div>
					</div>
				</template>
			</a-table>
		</a-row>
		<div>
			<a-modal v-model:visible="visible" :title="$t('default.261')" class="dialogBG" @ok="handleOk" width="50%" centered :footer="null">
				<a-row>
					<a-row class="dialogRow">
						<a-col>{{ 'Carlsberg Phoenix Double Up 2020' }}</a-col>
					</a-row>
					<a-row>
						<a-col class="personBox">
							<div class="dialogImgBox">
								<img :src="require('@/assets/1.jpg')" alt="" />
							</div>
							<div class="personInfo">
								<div>{{ 'CBRX' }}</div>
								<div>{{ 'Chop Bar' }}</div>
								<div>
									<span>{{ $t('default.76') }}</span>
									<span>{{ 'Gary Cheng K.' }}</span>
								</div>
							</div>
						</a-col>
					</a-row>
				</a-row>
				<a-row class="dialogRow">
					<div>{{ $t('default.73') }}</div>
					<div>
						<a-table :columns="lenguaColumns" :data-source="lenguaData" bordered></a-table>
					</div>
				</a-row>
				<a-row class="dialogRow">
					<div>{{ 'Latest Result' }}</div>
					<a-row class="matchBox">
						<a-col class="matchTitle">{{ 'Match No.(5)' }}</a-col>
						<a-col :span="8" class="matchBoxDiv">
							<div>{{ 'Home Team' }}</div>
							<div class="matchImg"><img :src="require('@/assets/1.jpg')" alt="" /></div>
							<div>{{ 'CBRX' }}</div>
							<div>{{ 'Chop Bar' }}</div>
						</a-col>
						<a-col :span="8" class="matchBoxDiv">
							<div class="matchVS">
								<div>{{ '2020-11-12 (Thu.) 20:30' }}</div>
								<div class="matchScore">
									<span>{{ 5 }}</span>
									<span>{{ 'VS' }}</span>
									<span>{{ 7 }}</span>
								</div>
								<div>
									<a-button type="primary">{{ '详细资料' }}</a-button>
								</div>
							</div>
						</a-col>
						<a-col :span="8" class="matchBoxDiv">
							<div>{{ 'Away Team' }}</div>
							<div class="matchImg"><img :src="require('@/assets/1.jpg')" alt="" /></div>
							<div>{{ 'CBRX' }}</div>
							<div>{{ 'Chop Bar' }}</div>
						</a-col>
					</a-row>
				</a-row>
				<a-row class="dialogRow">
					<div>{{ $t('default.262') }}</div>
					<div>
						<a-table :columns="homeColumns" :data-source="homeData" :scroll="{ x: 1300 }" bordered rowKey="id">
							<template #player="{record}">
								<div class="playerInfoBox">
									<div class="imgBox"><img :src="record.img" alt="" /></div>
									<div class="link" @click="showDialog(record.id)">{{ record.playerName }}</div>
								</div>
							</template>
						</a-table>
					</div>
				</a-row>
				<a-row class="dialogRow">
					<div>{{ $t('default.263') }}</div>
					<div>
						<a-table :columns="historyColumns" :data-source="historyData" bordered rowKey="id">
							<template #dete="{ text }">
								<div>{{ text }}</div>
							</template>
						</a-table>
					</div>
				</a-row>
			</a-modal>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { SettingFilled, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
export default defineComponent({
	name: 'templete',
	components: {
		SettingFilled,
		DownOutlined,
		UpOutlined
	},
	setup() {
		const data = reactive({
			isUp: true,
			visible: false,
			memberCurrent: 1,
			memberTotal: 1,
			handleOk: () => {
				console.log(1);
			},
			showDialog: () => {
				data.visible = true;
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
			memberColumns: [{}],
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
				homeName: '张自然',
				awayTean: '李逍遥',
				HomeCaptain: '王富贵',
				awayCaptain: '刘长安',
				homeRating: 20.15,
				homePPD: 33.69,
				homeMPR: 3.79,
				awayRating: 16.88,
				awayPPD: 29.92,
				awayMPR: 3.23,
				awardList: [
					{ homeScore: 10, title: 'LT', awayScore: 100 },
					{ homeScore: 20, title: 'HT', awayScore: 90 },
					{ homeScore: 30, title: 'HT.OFF', awayScore: 80 },
					{ homeScore: 40, title: 'LT.OFF', awayScore: 70 },
					{ homeScore: 50, title: 'HAT', awayScore: 60 },
					{ homeScore: 60, title: 'BED', awayScore: 50 },
					{ homeScore: 70, title: '180', awayScore: 40 },
					{ homeScore: 80, title: 'EYE', awayScore: 30 },
					{ homeScore: 90, title: '5M', awayScore: 20 },
					{ homeScore: 100, title: '6M', awayScore: 10 },
					{ homeScore: 90, title: '7M', awayScore: 20 },
					{ homeScore: 80, title: '8M', awayScore: 30 },
					{ homeScore: 70, title: '9M', awayScore: 40 },
					{ homeScore: 60, title: 'WH', awayScore: 50 }
				]
			},
			homeColumns: [
				{
					title: '排行',
					key: '排行',
					width: 60,
					fixed: 'left',
					dataIndex: 'id'
				},
				{
					title: '玩家',
					key: '玩家',
					width: 200,
					fixed: 'left',
					dataIndex: 'address',
					slots: { customRender: 'player' }
				},
				{
					title: 'Rating',
					key: 'Rating',
					width: 80,
					dataIndex: 'address'
				},
				{
					title: 'PPD',
					key: 'Rating',
					width: 70,
					dataIndex: 'address'
				},
				{
					title: 'MPR',
					key: 'Rating',
					width: 70,
					dataIndex: 'address'
				},
				{
					title: 'LT',
					key: 'Rating',
					width: 60,
					dataIndex: 'address'
				},
				{
					title: 'HAT',
					key: 'Rating',
					width: 70,
					dataIndex: 'address'
				},
				{
					title: 'HT',
					key: 'Rating',
					width: 60,
					dataIndex: 'address'
				},
				{
					title: 'HT.OFF',
					key: 'Rating',
					width: 90,
					dataIndex: 'address'
				},
				{
					title: 'LT.OFF',
					key: 'Rating',
					width: 80,
					dataIndex: 'address'
				},
				{
					title: 'BED',
					key: 'Rating',
					width: 70,
					dataIndex: 'address'
				},
				{
					title: '180',
					key: 'Rating',
					width: 70,
					dataIndex: 'address'
				},
				{
					title: 'EYE',
					key: 'Rating',
					width: 70,
					dataIndex: 'address'
				},
				{
					title: '5M',
					key: 'Rating',
					width: 60,
					dataIndex: 'address'
				},
				{
					title: '6M',
					key: 'Rating',
					width: 60,
					dataIndex: 'address'
				},
				{
					title: '7M',
					key: 'Rating',
					width: 60,
					dataIndex: 'address'
				},
				{
					title: '8M',
					key: 'Rating',
					width: 60,
					dataIndex: 'address'
				},
				{
					title: '9M',
					key: 'Rating',
					width: 60,
					dataIndex: 'address'
				},
				{
					title: 'WH',
					key: 'Rating',
					width: 60,
					dataIndex: 'address'
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
			}
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
	width: 80%;
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
