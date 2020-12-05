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
			<a-col :span="6">{{ `${$t('default.145')}：${matchTable.lineupDeadLine}` }}</a-col>
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
			<a-col :span="7" :offset="3">{{ `${$t('default.148')}：${matchTable.maxSetCount} / ${$t('default.149')}：${matchTable.maxModeCount}` }}</a-col>
		</a-row>
		<a-row class="rowStyle" v-if="matchTableList.length">
			<a-row v-for="(item, setIndex) in matchTableList" :key="setIndex">
				<a-row class="modeType">
					<div class="modeStyle">{{ `Set${setIndex + 1} / ${getPlayerType(item.mode)}` }}</div>
					<div v-if="item.gender === 1" class="sexStyle">
						<i class="male ">&#xe793;</i>
						<div>{{ `${$t('default.150')} ${item.genderNum}` }}</div>
					</div>
					<div v-if="item.gender === 2" class="sexStyle">
						<i class="female">&#xe793;</i>
						<div>{{ `${$t('default.150')} ${item.genderNum}` }}</div>
					</div>
				</a-row>
				<a-row class="setStyle">
					<a-row class="setTitle">
						<a-col :span="4">{{ `Set ${setIndex + 1}` }}</a-col>
						<a-col :span="5">{{ 'player 1' }}</a-col>
						<a-col :span="5">{{ 'player 2' }}</a-col>
						<a-col :span="5">{{ 'player 3' }}</a-col>
						<a-col :span="5">{{ 'player 4' }}</a-col>
					</a-row>
					<a-row v-for="(leg, legIndex) in item.legGameList" :key="legIndex" class="setBox">
						<a-col :span="4" class="legStyle">
							<div class="legBox">
								<div class="legIndexBox">{{ legIndex + 1 }}</div>
							</div>
							<div class="legBox">{{ leg.gameNameStr }}</div>
						</a-col>
						<!-- <a-col :span="5" class="playerStyle" v-for="playerBox in new Array(leg.maxPlayer).fill(leg.maxPlayer)" :key="playerBox.index"> -->
						<a-col :span="5" class="playerStyle" v-for="(playerBox, playerIndex) in leg.playerList" :key="playerBox.index">
							<a-select v-model:value="playerBox.playerId" class="playerBox" @change="playerChange($event, setIndex, legIndex, playerIndex)">
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
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { timeTableLineHttp, matchPlayerListHttp, submitMatchTableHttp, matchDateHttp } from '@/axios/api';
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
	setup() {
		const instance = getCurrentInstance();
		console.log(instance);
		const data = reactive({
			flag: false,
			playerList: [],
			matchTable: {
				lineupDeadLine: '',
				maxSetCount: 0,
				maxModeCount: 0,
				day: 0,
				hours: 0,
				minute: 0,
				second: 0
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
			playerChange: (value, setIndex, legIndex, playerIndex) => {
				// 1：校验Set玩家性别
				// 2：检验leg人员不能相同
				// 3：校验当前set玩家是否可以与上一Set玩家重复
				// 4：校验玩家Set的最大数/参加游戏类型的最大数

				// 当前Seg全部玩家
				const currentSetPlayerList = [];

				// 当前leg全部玩家
				const currentLegPlayerList = [];
				const playerObj = {};
				data.matchTableList[setIndex].legGameList.forEach((i) => {
					i.playerList.forEach((j) => {
						currentSetPlayerList.push(data.playerList.find((y) => y.playerId === j.playerId));
					});
				});
				data.matchTableList[setIndex].legGameList[legIndex].playerList.forEach((i) => {
					currentLegPlayerList.push(data.playerList.find((y) => y.playerId === i.playerId));
				});
				// 校验Set玩家性别
				if (data.matchTableList[setIndex].gender !== 3) {
					const gender = data.matchTableList[setIndex].gender;
					const genderNum = data.matchTableList[setIndex].genderNum;
					const flag = currentSetPlayerList.every((i) => i);
					if (flag) {
						if (gender === 1) {
							if (currentSetPlayerList.filter((i) => i.playerGender === 1).length < genderNum) {
								message.warning(`男性玩家需要${data.matchTableList[setIndex].genderNum}`);
							}
						} else {
							if (currentSetPlayerList.filter((i) => i.playerGender === 2).length < genderNum) {
								message.warning(`女性玩家需要${data.matchTableList[setIndex].genderNum}`);
							}
						}
						data.matchTableList[setIndex].legGameList[legIndex].playerList[playerIndex].playerId = '';
					}
				}
				// 校验leg人员不能相同
				currentLegPlayerList.forEach((i) => {
					if (i) {
						if (!playerObj[i.playerId]) {
							playerObj[i.playerId] = true;
						} else {
							message.warning(`玩家重复`);
							data.matchTableList[setIndex].legGameList[legIndex].playerList[playerIndex].playerId = '';
						}
					}
				});
				// 校验当前玩家不可与上下一Set玩家相同
				if (setIndex) {
					const prePlayerList = [];
					const nextPlayerList = [];
					// 获取上一Set玩家
					data.matchTableList[setIndex - 1].legGameList.forEach((i) => {
						i.playerList.forEach((j) => {
							prePlayerList.push(data.playerList.find((y) => y.playerId === j.playerId));
						});
					});
					// 获取下一Set玩家,最后一Set不获取
					if (setIndex !== data.matchTableList.length - 1) {
						data.matchTableList[setIndex + 1].legGameList.forEach((i) => {
							i.playerList.forEach((j) => {
								nextPlayerList.push(data.playerList.find((y) => y.playerId === j.playerId));
							});
						});
					}
					// 如果当前Set设置了，检查上下Set玩家设置
					if (data.matchTableList[setIndex].memberLimit === 1) {
						if (prePlayerList.find((i) => i && i.playerId === value)) {
							message.warning(instance.parent.ctx.$t('default.267'));
							data.matchTableList[setIndex].legGameList[legIndex].playerList[playerIndex].playerId = '';
						}
						if (nextPlayerList.find((i) => i && i.playerId === value)) {
							message.warning(instance.parent.ctx.$t('default.268'));
							data.matchTableList[setIndex].legGameList[legIndex].playerList[playerIndex].playerId = '';
						}
					}
				}
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
				if (data.flag) {
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
				} else {
					message.warning('选择玩家');
				}
			}
		});
		const reduce = (timer) => {
			if (!data.matchTable.minute) {
				if (!data.matchTable.hours) {
					if (!data.matchTable.day) {
						clearInterval(timer);
					} else {
						data.matchTable.day -= 1;
					}
				} else {
					data.matchTable.hours -= 1;
					data.matchTable.minute = 59;
				}
			} else {
				data.matchTable.minute -= 1;
				data.matchTable.second = 59;
			}
		};
		const init = () => {
			matchDateHttp({ confrontationInfoId: 17943 }).then((res) => {
				const date = new Date();
				let surplusDay = 0;
				let surplusHours = 0;
				let surplusMinutes = 0;
				const [oldDates, oldDays] = [res.data.data.lineupDeadLine.split(' ')[0], res.data.data.lineupDeadLine.split(' ')[1]];
				const [year, month, day, hours, minutes] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()];
				// eslint-disable-next-line prefer-const
				let [oldYear, oldMonth, oldDAay, oldHours, oldMinutes] = [
					oldDates.split('-')[0],
					parseInt(oldDates.split('-')[1]),
					parseInt(oldDates.split('-')[2]),
					parseInt(oldDays.split(':')[0]),
					parseInt(oldDays.split(':')[1]),
					parseInt(oldDays.split(':')[2])
				];
				if (oldYear - year > 0) {
					oldMonth += 12;
				}
				if (oldMonth - month > 0) {
					oldDAay += 30;
				}
				if (oldDAay - day > 0) {
					surplusDay = oldDAay - day;
				}
				if (oldHours - hours > 0) {
					surplusDay = oldHours - hours;
				} else {
					surplusDay -= 1;
					oldHours += 24;
					surplusHours = oldHours - hours;
				}
				if (oldMinutes - minutes > 0) {
					surplusDay = oldMinutes - minutes;
				} else {
					if (!oldHours) {
						surplusDay -= 1;
						oldHours += 24;
					}
					oldHours -= 1;
					oldMinutes += 60;
					surplusMinutes = oldMinutes - minutes;
				}
				res.data.data.day = surplusDay;
				res.data.data.hours = surplusHours;
				res.data.data.minute = surplusMinutes;
				res.data.data.second = 59;
				data.matchTable = res.data.data;
			});
			const timer = setInterval(() => {
				data.matchTable.second -= 1;
				if (!data.matchTable.second) {
					reduce(timer);
				}
			}, 1000);
		};
		const getTeamLineU = () => {
			const obj = {
				teamId: 49,
				confrontationInfoId: 17840
			};
			timeTableLineHttp(obj).then((res) => {
				res.data.data.forEach((i) => {
					i.legGameList.forEach((j) => {
						switch (i.mode) {
							case 1:
								i.mode = 1;
								break;
							case 2:
								i.mode = 2;
								break;
							case 3:
								i.mode = 3;
								break;
							case 4:
								i.mode = 4;
								break;
							case 5:
								i.mode = 2;
								break;
							default:
								i.mode = 4;
								break;
						}
						if (j.playerList.length < i.mode) {
							for (let index = 0; index < i.mode; index += 1) {
								j.playerList.push({
									playerId: '',
									playerName: ''
								});
							}
						}
					});
				});
				data.matchTableList = res.data.data || [];
			});
		};
		const getPlayerList = () => {
			const obj = {
				teamId: 79,
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
