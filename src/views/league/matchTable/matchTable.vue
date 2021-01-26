<template>
	<div class="content">
		<a-row>
			<a-col :lg="{ span: 2 }" :xs="{ span: 0 }" class="smallTitle"> <SettingFilled /> {{ $t('default.41') }} </a-col>
			<a-col :lg="{ span: 4, offset: 12 }" :xs="{ span: 8 }">
				<a-button>{{ $t('default.118') }}</a-button>
			</a-col>
			<a-col :lg="{ span: 3 }" :xs="{ span: 8 }">
				<a-button @click="submitMatchTable(1)">{{ $t('default.143') }}</a-button>
			</a-col>
			<a-col :lg="{ span: 3 }" :xs="{ span: 8 }">
				<a-button type="primary" @click="submitMatchTable(2)">{{ $t('default.144') }}</a-button>
			</a-col>
		</a-row>
		<a-row class="timeBox">
			<a-col :lg="{ span: 6 }" :xs="{ span: 24 }">{{ `${$t('default.145')}：${matchTable.lineupDeadLine}` }}</a-col>
			<a-col :lg="{ span: 6, offset: 2 }" :xs="{ span: 24 }">
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
			<a-col :lg="{ span: 7, offset: 3 }" :xs="{ span: 24 }">{{ `${$t('default.148')}：${matchTable.maxSetCount} / ${$t('default.149')}：${matchTable.maxModeCount}` }}</a-col>
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
				<a-row class="setStyle inPhoneTableDisplay">
					<a-row class="setTitle">
						<a-col :span="4">{{ `Set ${setIndex + 1}` }}</a-col>
						<a-col :span="5">{{ 'player 1' }}</a-col>
						<a-col :span="5">{{ 'player 2' }}</a-col>
						<a-col :span="5">{{ 'player 3' }}</a-col>
						<a-col :span="5">{{ 'player 4' }}</a-col>
					</a-row>
					<a-row v-for="(leg, legIndex) in item.legGameList" :key="legIndex" class="setBox">
						<a-col :span="4" class="legStyle">
							<div class="legGameSet">
								<div class="legIndexBox">{{ legIndex + 1 }}</div>
								<div>{{ $t(getGameName(leg.gameName)) }}</div>
							</div>
							<div>
								<!-- {{ `(${getBeginGameSet(leg.gameName, leg.gameIn)} / ${getEndGameSet(leg.gameName, leg.gameOut)}) ` }} -->
								<span v-if="getBeginGameSet(leg.gameName, leg.gameIn)">{{ `(${getBeginGameSet(leg.gameName, leg.gameIn)}` }}</span>
								<span v-if="getEndGameSet(leg.gameName, leg.gameOut)">{{ ` / ${getEndGameSet(leg.gameName, leg.gameOut)})` }}</span>
								<div v-if="leg.gameName <= 4">{{ `(Bull:${leg.bull === 1?'25/50':'50/50'})` }}</div>
							</div>
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
				<!--  移动端显示 -->
				<div class="showPhoneTable">
					<a-row v-for="(leg, legIndex) in item.legGameList" :key="legIndex">
						<a-row class="inphoneTitle">
							<a-col :span="12">{{ `Set ${setIndex + 1}` }}</a-col>
							<a-col :span="12">{{ 'player' }}</a-col>
						</a-row>
						<a-row class="inphoneTitle inphoneBox">
							<a-col :span="12" class="inphoneSet">
								<div class="legBox">
									<div class="legIndexBox">{{ legIndex + 1 }}</div>
								</div>
								<div class="legBox">{{ $t(getGameName(leg.gameName)) }}</div>
							</a-col>
							<a-col :span="12" class="inphonePlayerClass">
								<div v-for="(playerBox, playerIndex) in leg.playerList" :key="playerBox.index">
									<a-select v-model:value="playerBox.playerId" class="playerBox" @change="playerChange($event, setIndex, legIndex, playerIndex)">
										<a-select-option v-for="player in playerList" :key="player.playerId" :value="player.playerId">{{
											`[${player.playerGender ? $t('default.203') : $t('default.204')}]  ${player.playerName}`
										}}</a-select-option>
									</a-select>
								</div>
							</a-col>
						</a-row>
					</a-row>
				</div>
			</a-row>
		</a-row>
		<a-row class="rowStyle" v-else>
			<emptyList />
		</a-row>
	</div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance, watch } from 'vue';
import { timeTableLineHttp, matchPlayerListHttp, submitMatchTableHttp, matchDateHttp } from '@/axios/api';
import emptyList from '@/components/common/emptyList';
import { SettingFilled } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
// interface DataProps {
// 	matchTableList: [{ legGameList: Array<any> }];
// }
export default defineComponent({
	name: 'matchTable',
	props: ['teamId', 'isHome', 'confrontationInfoId'],
	components: {
		SettingFilled,
		emptyList
	},
	setup(prop) {
		const ROUTE = useRoute();
		const instance = getCurrentInstance();
		const data = reactive({
			playerList: [],
			competitionId: ROUTE.query.competitionId,
			matchTable: {
				lineupDeadLine: '',
				maxSetCount: 0,
				maxModeCount: 0,
				day: 0,
				hours: 0,
				minute: 0,
				second: 0
			},
			matchTableList: [],
			getGameName: (id) => {
				let str = '';
				switch (id) {
					case 0:
						str = 'default.201';
						break;
					case 1:
						str = '301 Game';
						break;
					case 2:
						str = '501 Game';
						break;
					case 3:
						str = '701 Game';
						break;
					case 4:
						str = '901 Game';
						break;
					case 5:
						str = 'Std.CR';
						break;
					case 6:
						str = 'Cut Throw';
						break;
					case 7:
						str = 'Std.CUP';
						break;
					case 8:
						str = 'Timing';
						break;
					case 9:
						str = 'Half It';
						break;
					case 10:
						str = 'Team.CR';
						break;
					case 11:
						str = 'Snow 301';
						break;
					case 12:
						str = 'Snow 501';
						break;
					case 13:
						str = 'Snow 701';
						break;
					case 14:
						str = 'Snow 701';
						break;
					case 20:
						str = "Eagle's Eye";
						break;
					case 21:
						str = 'Big Bull';
						break;
					case 22:
						str = 'CR.CUP';
						break;
					default:
						str = '';
						break;
				}
				return str;
			},
			getBeginGameSet: (mode, id) => {
				let str = '';
				if (mode <= 4) {
					switch (id) {
						case 1:
							str = 'Open In';
							break;
						case 2:
							str = 'Double In';
							break;
						case 3:
							str = 'Master In';
							break;
						case 4:
							str = 'Master No Bull In';
							break;
						default:
							str = 'Double No Bull In';
							break;
					}
				}
				return str;
			},
			getEndGameSet: (mode, id) => {
				let str = '';
				if (mode <= 4) {
					switch (id) {
						case 1:
							str = 'Open Out';
							break;
						case 2:
							str = 'Master Out';
							break;
						case 3:
							str = 'Double Out';
							break;
						case 4:
							str = 'Master No Bull Out';
							break;
						default:
							str = 'Double No Bull Out';
							break;
					}
				}
				return str;
			},
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

				// 当前排阵所有玩家
				const allPlayerList = [];
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
					const flag = currentLegPlayerList.every((i) => i);
					if (flag) {
						if (gender === 1) {
							if (currentLegPlayerList.filter((i) => i.playerGender === 1).length < genderNum) {
								message.warning(`男性玩家需要${data.matchTableList[setIndex].genderNum}`);
								data.matchTableList[setIndex].legGameList[legIndex].playerList[playerIndex].playerId = '';
								return;
							}
						} else {
							if (currentLegPlayerList.filter((i) => i.playerGender === 0).length < genderNum) {
								message.warning(`女性玩家需要${data.matchTableList[setIndex].genderNum}`);
								data.matchTableList[setIndex].legGameList[legIndex].playerList[playerIndex].playerId = '';
								return;
							}
						}
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
							return;
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
					if (data.matchTableList[setIndex].memberLimit === 2) {
						if (prePlayerList.find((i) => i && i.playerId === value)) {
							message.warning(instance.parent.ctx.$t('default.267'));
							data.matchTableList[setIndex].legGameList[legIndex].playerList[playerIndex].playerId = '';
						}
						if (nextPlayerList.find((i) => i && i.playerId === value)) {
							message.warning(instance.parent.ctx.$t('default.268'));
							data.matchTableList[setIndex].legGameList[legIndex].playerList[playerIndex].playerId = '';
							return;
						}
					}
				}
				// 玩家参加mode的最大数
				if (data.matchTableList[setIndex].entryTypeNum) {
					const legPlayerObj = {};
					let list = [];
					data.matchTableList.forEach((i) => {
						i.legGameList.forEach((j) => {
							j.playerList.forEach((k) => {
								if (k.playerId) {
									const obj = {
										playerId: k.playerId,
										setId: i.setId,
										mode: i.mode
									};
									allPlayerList.push(obj);
								} else {
									allPlayerList.push('');
								}
							});
						});
					});
					// 玩家参加单人或者多人限制
					if (data.matchTableList[setIndex].entryType === 1) {
						for (let i = 0; i < allPlayerList.length; i++) {
							if (i) {
								list = allPlayerList.filter((j) => allPlayerList[i].playerId === j.playerId && allPlayerList[i].mode === j.mode && allPlayerList[i].setId !== j.setId);
								if (list.length + 1 > data.matchTableList[setIndex].entryTypeNum) {
									message.warning(instance.parent.ctx.$t('default.269') + data.matchTableList[setIndex].entryTypeNum);
									data.matchTableList[setIndex].legGameList[legIndex].playerList[playerIndex].playerId = '';
									break;
								}
							}
						}
					}
					// 玩家参加最大leg限制
					if (data.matchTableList[setIndex].entryType === 2) {
						allPlayerList.forEach((i) => {
							if (i) {
								if (!legPlayerObj[i.playerId]) {
									legPlayerObj[i.playerId] = 1;
								} else {
									legPlayerObj[i.playerId] += 1;
								}
							}
						});
						for (const [key, value] of Object.entries(legPlayerObj)) {
							if (key && key!=='null' && value > data.matchTableList[setIndex].entryTypeNum) {
								message.warning(instance.parent.ctx.$t('default.270') + data.matchTableList[setIndex].entryTypeNum);
								data.matchTableList[setIndex].legGameList[legIndex].playerList[playerIndex].playerId = '';
								return;
							}
						}
					}
				}
			},
			submitMatchTable: (type) => {
				const list = [];
				data.matchTableList.forEach((i) => {
					i.legGameList.forEach((j) => {
						const obj = {
							confrontationInfoId: i.confrontationInfoId,
							mode: i.mode,
							setId: i.setId,
							legId: j.legId,
							status: type,
							playerList: j.playerList.map((k, kndex) => {
								return {
									isHome: prop.isHome,
									playerId: k.playerId,
									setModeNumber: kndex + 1
								};
							})
						};
						list.push(obj);
					});
				});
				submitMatchTableHttp(list).then((res) => {
					let str = '';
					if (res.data.data) {
						str = res.data.data;
					} else {
						str = res.data.msg;
						// eslint-disable-next-line @typescript-eslint/no-use-before-define
						getTeamLineU();
					}
					message.info(str);
				});
			}
		});
		const reduce = (timer) => {
			if (!data.matchTable.minute) {
				if (!data.matchTable.hours) {
					if (!data.matchTable.day) {
						clearInterval(timer);
					} else {
						data.matchTable.day -= 1;
						data.matchTable.hours = 23;
						data.matchTable.minute = 59;
						data.matchTable.second = 59;
						return false;
					}
				} else {
					data.matchTable.hours -= 1;
					data.matchTable.minute = 59;
					data.matchTable.second = 59;
					return false;
				}
			} else {
				data.matchTable.minute -= 1;
				data.matchTable.second = 59;
				return false;
			}
		};
		const init = () => {
			matchDateHttp({ confrontationInfoId: prop.confrontationInfoId || '' }).then((res) => {
				if (!res.data.data) return;
				data.matchTable = res.data.data;
				const getAllMonthDays = (year, month) => {
					return new Date(year, month, 0).getDate();
				};
				const date = new Date();
				let flag = true;
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
				} else if (oldYear - year < 0) {
					flag = false;
					return;
				}
				if (oldMonth - month > 0) {
					for (let currentMonth = month; currentMonth < oldMonth; currentMonth++) {
						oldDAay += getAllMonthDays(year, currentMonth);
					}
				} else if (oldMonth - month < 0) {
					flag = false;
					return;
				}
				if (oldDAay - day > 0) {
					surplusDay = oldDAay - day;
				} else if (oldDAay - day < 0) {
					flag = false;
					return;
				}
				if (oldHours - hours > 0) {
					surplusHours = oldHours - hours;
				} else if (oldDAay - day < 0) {
					if (surplusDay) {
						surplusDay -= 1;
						surplusHours = surplusHours + 24 - hours;
					} else {
						flag = false;
						return;
					}
				}
				if (oldMinutes - minutes > 0) {
					surplusMinutes = oldMinutes - minutes;
				} else if (oldMinutes - minutes < 0) {
					if (surplusHours) {
						surplusHours -= 1;
						surplusMinutes = 60 - Math.abs(oldMinutes - minutes);
					} else if (surplusDay) {
						surplusDay -= 1;
						surplusHours = 23;
						surplusMinutes = 60 - Math.abs(oldMinutes - minutes);
					}
				}
				res.data.data.day = surplusDay;
				res.data.data.hours = surplusHours;
				res.data.data.minute = surplusMinutes;

				if (res.data.data.day || res.data.data.hours || res.data.data.minute) {
					if (flag) {
						res.data.data.second = 59;
						const timer = setInterval(() => {
							data.matchTable.second--;
							if (!data.matchTable.second && !res.data.data.day && !res.data.data.hours && !res.data.data.minute) {
								clearInterval(timer);
							} else if (!data.matchTable.second) {
								reduce(timer);
							}
						}, 1000);
					} else {
						res.data.data.day = 0;
						res.data.data.hours = 0;
						res.data.data.minute = 0;
						res.data.data.second = 0;
					}
				}
			});
		};
		const getTeamLineU = (confrontationInfoId = prop.confrontationInfoId) => {
			const obj = {
				teamId: prop.teamId || '',
				confrontationInfoId
			};
			timeTableLineHttp(obj).then((res) => {
				if (!res.data.data) return;
				res.data.data.forEach((i) => {
					i.legGameList.forEach((j) => {
						switch (i.mode) {
							case 1:
								i.mode = 1;
								break;
							case 2:
							case 5:
								i.mode = 2;
								break;
							case 3:
								i.mode = 3;
								break;
							case 4:
								i.mode = 4;
								break;
							default:
								i.mode = 4;
								break;
						}
						for (let index = 0; index < i.mode; index += 1) {
							if (j.playerList.length < i.mode) {
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
				teamId: prop.teamId || '',
				competitionId: data.competitionId || ''
			};
			matchPlayerListHttp(obj).then((res) => {
				if (res.data.data) {
					data.playerList = res.data.data;
				}
			});
		};
		watch(
			() => prop.confrontationInfoId,
			(val) => {
				getTeamLineU(val);
			}
		);
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
.setTitle div {
	background: #f1f0ed;
	border: 1px solid #5a5a5a;
}
.setBox {
	display: flex;
	padding: 0 4px;
	margin: 4px 0;
}
.setBox div {
	background: #f1f0ed;
}
.legStyle {
	height: 106px;
	display: flex;
	flex-direction: column;
	text-align: center;
	border: 1px solid #5a5a5a;
}
.playerStyle {
	text-align: center;
	border: 1px solid #5a5a5a;
}
.legBox {
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.legGameSet {
	display: flex;
	align-items: center;
	justify-content: space-around;
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
.showPhoneTable {
	display: none;
}
.inphonePlayerClass {
	display: flex;
	flex-direction: column;
}
.inphoneTitle {
	border: 1px solid #666;
}
.inphoneSet {
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-right: 1px solid #666;
}
.inphoneBox {
	height: 130px;
}
</style>
