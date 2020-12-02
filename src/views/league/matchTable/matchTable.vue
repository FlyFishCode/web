<template>
	<div class="content">
		<a-row>
			<a-col :span="2" class="smallTitle"> <SettingFilled /> {{ $t('default.41') }} </a-col>
			<a-col :span="3" :offset="14">
				<a-button>{{ $t('default.118') }}</a-button>
			</a-col>
			<a-col :span="3">
				<a-button @click="submitMatchTable(1)">{{ $t('default.143') }}</a-button>
			</a-col>
			<a-col :span="2">
				<a-button type="primary" @click="submitMatchTable(2)">{{ $t('default.144') }}</a-button>
			</a-col>
		</a-row>
		<a-row class="timeBox">
			<a-col :span="6">{{ `${$t('default.145')}：${matchTable.date}` }}</a-col>
			<a-col :span="6" :offset="2">
				<div class="surplusBox">
					<div>{{ $t('default.146') }}</div>
					<div class="timeStyle">{{ matchTable.day }}</div>
					<div>{{ $t('default.147') }}</div>
					<div class="timeStyle">{{ matchTable.hours }}</div>
					:
					<div class="timeStyle">{{ matchTable.minute }}</div>
					:
					<div class="timeStyle">{{ matchTable.second }}</div>
				</div>
			</a-col>
			<a-col :span="7" :offset="3">{{ `${$t('default.148')}：${matchTable.maxSet} / ${$t('default.149')}：${matchTable.maxMode}` }}</a-col>
		</a-row>
		<a-row class="rowStyle" v-if="matchTableList.length">
			<a-row v-for="(item, index) in matchTableList" :key="index">
				<a-row class="modeType">
					<div class="modeStyle">{{ `Set${index + 1} / ${getPlayerType(item.mode)}` }}</div>
					<div v-if="item.gender === 1" class="sexStyle">
						<i class="male ">&#xe793;</i>
						<div>{{ `${$t('default.150')} ${item.genderNum}` }}</div>
					</div>
					<div v-if="item.gender === 3" class="sexStyle">
						<i class="female">&#xe793;</i>
						<div>{{ `${$t('default.150')} ${item.genderNum}` }}</div>
					</div>
				</a-row>
				<a-row class="setStyle">
					<a-row class="setTitle">
						<a-col :span="4">{{ `Set ${index + 1}` }}</a-col>
						<a-col :span="5">{{ 'player 1' }}</a-col>
						<a-col :span="5">{{ 'player 2' }}</a-col>
						<a-col :span="5">{{ 'player 3' }}</a-col>
						<a-col :span="5">{{ 'player 4' }}</a-col>
					</a-row>
					<a-row v-for="(leg, index) in item.legGameList" :key="index" class="setBox">
						<a-col :span="4" class="legStyle">
							<div class="legBox">
								<div class="legIndexBox">{{ index + 1 }}</div>
							</div>
							<div class="legBox">{{ leg.gameNameStr }}</div>
						</a-col>
						<!-- <a-col :span="5" class="playerStyle" v-for="playerBox in new Array(leg.maxPlayer).fill(leg.maxPlayer)" :key="playerBox.index"> -->
						<a-col :span="5" class="playerStyle" v-for="playerBox in leg.playerList" :key="playerBox.index">
							<a-select v-model:value="playerBox.homePlayerId" class="playerBox">
								<a-select-option v-for="player in playerList" :key="player.playerId" :value="player.playerId">{{
									`[${player.playerGender ? $t('default.203') : $t('default.204')}]  ${player.playerName}`
								}}</a-select-option>
							</a-select>
						</a-col>
					</a-row>
				</a-row>
			</a-row>
		</a-row>
		<a-row class="rowStyle" v-else>
			<emptyList />
		</a-row>
	</div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { timeTableLineHttp, matchPlayerListHttp, submitMatchTableHttp } from '@/axios/api';
import emptyList from '@/components/common/emptyList';
import { SettingFilled } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
// interface DataProps {
// 	matchTableList: [{ legGameList: Array<any> }];
// }
export default defineComponent({
	name: 'matchTable',
	components: {
		SettingFilled,
		emptyList
	},
	props: {
		matchTable: {
			type: Array
		}
	},
	setup() {
		const data = reactive({
			playerList: [],
			matchTable: {
				date: '2020-8-9',
				day: 10,
				hours: 5,
				minute: 1,
				second: 10,
				maxSet: 2,
				maxMode: 1
			},
			matchTableList: [{ legGameList: [] }],
			getPlayerType: (type) => {
				let str = '';
				switch (type) {
					case 1:
						str = 'single';
						break;
					case 2:
						str = 'double';
						break;
					case 3:
						str = 'trios';
						break;
					case 4:
						str = 'gallon';
						break;
					case 5:
						str = 'team';
						break;
					default:
						str = 'team2';
						break;
				}
				return str;
			},
			submitMatchTable: (type) => {
				const list = [];
				data.matchTableList.forEach((i) => {
					i.legGameList.forEach((j) => {
						j.playerList.forEach((k, kndex) => {
							const player = {
								isHome: 1,
								playerId: k.homePlayerId,
								setModeNumber: kndex + 1
							};
							const obj = {
								confrontationInfoId: i.confrontationInfoId,
								mode: i.mode,
								setId: i.setId,
								legId: j.legId,
								status: type,
								playerList: [player]
							};
							list.push(obj);
						});
					});
				});
				submitMatchTableHttp(list).then((res) => {
					let str = '';
					if (res.data.data) {
						str = res.data.data;
					} else {
						str = res.data.msg;
					}
					message.info(str);
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getTeamLineU();
				});
			}
		});
		const reduce = (timer) => {
			data.matchTable.minute -= 1;
			if (!data.matchTable.minute) {
				data.matchTable.hours -= 1;
				data.matchTable.minute = 59;
				if (!data.matchTable.hours) {
					data.matchTable.day -= 1;
					if (!data.matchTable.day) {
						clearInterval(timer);
					}
				}
			}
			data.matchTable.second = 59;
		};
		const init = () => {
			const timer = setInterval(() => {
				data.matchTable.second -= 1;
				if (!data.matchTable.second) {
					reduce(timer);
				}
			}, 1000);
		};
		const getTeamLineU = () => {
			timeTableLineHttp({ confrontationInfoId: 17943 }).then((res) => {
				data.matchTableList = res.data.data || [];
			});
		};
		const getPlayerList = () => {
			const obj = {
				teamId: 78,
				competitionId: 472
			};
			matchPlayerListHttp(obj).then((res) => {
				data.playerList = res.data.data;
			});
		};
		onMounted(() => {
			init();
			getPlayerList();
			getTeamLineU();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.buttonBox {
	margin: 0 5px;
}
.surplusBox {
	display: flex;
	justify-content: space-around;
}
.timeBox {
	margin: 10px 0;
	background: #ff4e00;
	color: #fff;
	line-height: 24px;
	padding: 10px 0;
}
.timeStyle {
	width: 25px;
	height: 25px;
	background: #fff;
	color: #000;
	border-radius: 4px;
}
.modeType {
	color: #000;
	font-size: 20px;
	display: flex;
	background: #f1f0ed;
	margin: 5px 0;
	line-height: 31px;
}
/* 男人 */
@font-face {
	font-family: 'male'; /* project id 1994758 */
	src: url('//at.alicdn.com/t/font_1994758_t4i2y7cuag.eot');
	src: url('//at.alicdn.com/t/font_1994758_t4i2y7cuag.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1994758_t4i2y7cuag.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1994758_t4i2y7cuag.woff') format('woff'), url('//at.alicdn.com/t/font_1994758_t4i2y7cuag.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1994758_t4i2y7cuag.svg#iconfont') format('svg');
}
.male {
	font-family: 'male' !important;
	font-size: 25px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
/* 女人 */
@font-face {
	font-family: 'female'; /* project id 1994758 */
	src: url('//at.alicdn.com/t/font_1994758_hdp11mt3txj.eot');
	src: url('//at.alicdn.com/t/font_1994758_hdp11mt3txj.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1994758_hdp11mt3txj.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1994758_hdp11mt3txj.woff') format('woff'), url('//at.alicdn.com/t/font_1994758_hdp11mt3txj.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1994758_hdp11mt3txj.svg#iconfont') format('svg');
}
.female {
	font-family: 'female' !important;
	font-size: 25px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
.modeStyle {
	width: 53%;
	text-align: right;
}
.sexStyle {
	display: flex;
	width: 47%;
	justify-content: flex-end;
}
.setStyle {
	border: 1px solid #000;
}
.setTitle {
	display: flex;
	padding: 0 4px;
}
.setBox {
	display: flex;
	padding: 0 4px;
	margin: 4px 0;
}
.setBox div {
	background: #f1f0ed;
}
.setTitle div {
	background: #f1f0ed;
	border: 1px solid #5a5a5a;
}
.legStyle {
	height: 80px;
	display: flex;
	text-align: center;
	border: 1px solid #5a5a5a;
}
.playerStyle {
	height: 80px;
	text-align: center;
	border: 1px solid #5a5a5a;
}
.legBox {
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.legIndexBox {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	line-height: 60px;
	border: 1px solid #5a5a5a;
}
.playerBox {
	width: 100%;
}
</style>
