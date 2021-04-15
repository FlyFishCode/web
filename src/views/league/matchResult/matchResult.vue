<template>
	<div class="content">
		<a-row>
			<a-col :span="4" class="smallTitle"> <SettingFilled /> {{ $t('default.62') }} </a-col>
			<a-col v-if="showBtn" :span="2" :offset="18">
				<a-button type="danger" @click="changeMatchTable">{{ $t('default.308') }}</a-button>
			</a-col>
		</a-row>
		<div v-if="tableList.length">
			<div v-for="(set, setIndex) in tableList" :key="setIndex">
				<a-row class="title">
					<a-col :span="3" class="winnerBox">
						<div v-if="set.homeIsWin" :class="{ winner: set.homeIsWin === 1, loseer: set.homeIsWin === 3 }">{{ set.homeIsWin === 1 ? 'win' : 'lose' }}</div>
					</a-col>
					<a-col :span="9" class="leftBox">
						<div class="left">{{ `SET ${setIndex + 1}` }}</div>
					</a-col>
					<a-col :span="9" class="rightBox">
						<div class="right">{{ getGameType(set.mode) }}</div>
					</a-col>
					<a-col :span="3" class="winnerBox">
						<div v-if="set.visitingIsWin" :class="{ winner: set.visitingIsWin === 1, loseer: set.visitingIsWin === 3 }">{{ set.visitingIsWin === 1 ? 'win' : 'lose' }}</div>
					</a-col>
				</a-row>
				<a-row v-for="(leg, legIndex) in set.legResultList" :key="legIndex" id="table">
					<a-table :columns="columns" :data-source="leg.playerResultList" rowkey="mode" :pagination="false" bordered>
						<template #gameNameTitle>
							<span>{{ `leg  ${legIndex + 1} (${getGameMode(leg.gameName)})` }}</span>
						</template>
						<template #homeTitle>
							<div>{{ getTableTitle(leg.gameName) }}</div>
						</template>
						<template #awayTitle>
							<div>{{ getTableTitle(leg.gameName) }}</div>
						</template>

						<template v-slot:homeContent="{ record }">
							<div>{{ getTableContent(leg, record, 1) }}</div>
						</template>
						<template v-slot:awayContent="{ record }">
							<div>{{ getTableContent(leg, record, 2) }}</div>
						</template>

						<template v-slot:homePlayerInfo="{ record }">
							<div class="playerbox">
								<div class="playerImgBox">
									<span v-if="record.homePlayerPortrait"><img :src="record.homePlayerPortrait" alt=""/></span>
									<span v-else><img :src="defaultTeamImg" alt=""/></span>
								</div>
								<div>{{ record.homePlayerName }}</div>
							</div>
						</template>
						<template v-slot:awayPlayerInfo="{ record }">
							<div class="playerbox">
								<div>{{ record.visitingPlayerName }}</div>
								<div class="playerImgBox">
									<span v-if="record.visitingPlayerPortrait"><img :src="record.visitingPlayerPortrait" alt=""/></span>
									<span v-else><img :src="defaultTeamImg" alt=""/></span>
								</div>
							</div>
						</template>
					</a-table>
				</a-row>
			</div>
		</div>
		<div v-else>
			<emptyList />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
import { matchResultHttp } from '@/axios/api';
import { SettingFilled } from '@ant-design/icons-vue';
import emptyList from '@/components/common/emptyList.vue';
// import { DOM } from '@/type/interface';
export default defineComponent({
	name: 'matchResult',
	props: ['confrontationInfoId', 'showBtn'],
	components: {
		SettingFilled,
		emptyList
	},
	setup(prop: any, ctx: any) {
		const data = reactive({
			isShowMatchTableBtn: true,
			tableList: [{ legResultList: [{ playerResultList: [] }] }],
			defaultTeamImg: require('@/assets/icon.png'),
			columns: [
				{
					title: '玩家',
					dataIndex: 'homePlayerName',
					slots: { customRender: 'homePlayerInfo' }
				},
				{
					slots: { title: 'homeTitle', customRender: 'homeContent' }
				},
				{
					title: '分数',
					dataIndex: 'homeScore'
				},
				{
					colSpan: 2,
					slots: { title: 'gameNameTitle' },
					customRender: (text: any) => {
						const obj = {
							// eslint-disable-next-line @typescript-eslint/no-use-before-define
							children: getMatchResult(text.text.homeIsWin, 1),
							attrs: {
								rowSpan: 0
							}
						};
						// eslint-disable-next-line @typescript-eslint/no-use-before-define
						obj.attrs.rowSpan = mergeCells(text.text.homeIsWin, text.record.dataIndex, 'homeIsWin', text.index, text.record.legIndex);
						return obj;
					}
				},
				{
					colSpan: 0,
					customRender: (text: any) => {
						const obj = {
							// eslint-disable-next-line @typescript-eslint/no-use-before-define
							children: getMatchResult(text.text.homeIsWin, 2),
							attrs: {
								rowSpan: 0
							}
						};
						// eslint-disable-next-line @typescript-eslint/no-use-before-define
						obj.attrs.rowSpan = mergeCells(text.text.homeIsWin, text.record.dataIndex, 'homeIsWin', text.index, text.record.legIndex);
						return obj;
					}
				},
				{
					title: '分数',
					dataIndex: 'visitingScore'
				},
				{
					slots: { title: 'awayTitle', customRender: 'awayContent' }
				},
				{
					title: '玩家',
					dataIndex: 'visitingPlayerName',
					slots: { customRender: 'awayPlayerInfo' }
				}
			],
			changeMatchTable: () => {
				ctx.emit('enter-matchtable');
			},
			getTableTitle: (mode: number) => {
				let str = '';
				switch (mode) {
					case 1:
					case 2:
					case 3:
					case 4:
						str = 'PPD';
						break;
					default:
						str = 'MPR';
						break;
				}
				return str;
			},
			getTableContent: (data: any, row: any, type: number) => {
				let str = '-';
				if (data.gameName) {
					if (data.gameName <= 4 || data.gameName === 7 || data.gameName === 8) {
						if (type === 1) {
							str = row.homePpd;
						} else {
							str = row.visitingPpd;
						}
					} else {
						if (type === 1) {
							str = row.homeMpr;
						} else {
							str = row.visitingMpr;
						}
					}
				}
				return str;
			},
			getGameMode: (mode: number) => {
				if (!mode) {
					return '';
				}
				let str = '';
				switch (mode) {
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
				}
				return str;
			},
			getGameType: (value: number) => {
				let str = '';
				switch (value) {
					case 1:
						str = 'Singles';
						break;
					case 2:
						str = 'Doubles';
						break;
					case 3:
						str = 'Team';
						break;
					default:
						str = 'Gallon';
						break;
				}
				return str;
			}
		});
		const getMatchResult = (status: number, type: number) => {
			if (!status) return '-';
			if (type === 1) {
				if (status === 1) {
					return 'win';
				} else {
					return 'lose';
				}
			} else {
				if (status === 3) {
					return 'win';
				} else {
					return 'lose';
				}
			}
		};
		const mergeCells = (text: any, dataIndex: any, key: any, index: number, jndex: number) => {
			// 上一行该列数据是否一样
			if (index !== 0 && text === data.tableList[dataIndex]['legResultList'][jndex]['playerResultList'][index - 1][key]) {
				return 0;
			}
			let rowSpan = 1;
			// 判断下一行是否相等
			for (let i = index + 1; i < data.tableList[dataIndex]['legResultList'][jndex]['playerResultList'].length; i++) {
				if (text !== data.tableList[dataIndex]['legResultList'][jndex]['playerResultList'][i][key]) {
					break;
				}
				rowSpan++;
			}
			return rowSpan;
		};
		const getMatchResultList = (confrontationInfoId: any = '') => {
			matchResultHttp({ confrontationInfoId, memberId: sessionStorage.getItem('userId') || 0 }).then((res) => {
				if (res.data.data) {
					res.data.data.forEach((i: any, index: number) => {
						i.legResultList.forEach((j: any, jndex: number) => {
							j.playerResultList.forEach((k: any) => {
								k.dataIndex = index;
								k.legIndex = jndex;
								k.homeIsWin = j.homeIsWin;
							});
						});
					});
					data.tableList = res.data.data;
				}
			});
		};
		onMounted(() => {
			getMatchResultList(prop.confrontationInfoId);
		});
		watch(
			() => prop.confrontationInfoId,
			(val) => {
				getMatchResultList(val);
			}
		);
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.winnerBox {
	display: flex;
	justify-content: center;
	align-items: center;
}
.winner {
	background: #ff4e00;
	width: 60px;
	height: 30px;
	line-height: 30px;
	border-radius: 5px;
}
.loseer {
	background: #303032;
	width: 60px;
	height: 30px;
	line-height: 30px;
	border-radius: 5px;
}
.leftBox {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.left {
	width: 90px;
	height: 30px;
	line-height: 30px;
	border: 1px solid #fff;
	border-radius: 10px;
	text-align: center;
}
.rightBox {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.right {
	width: 90px;
	height: 30px;
	line-height: 30px;
}
.title {
	height: 50px;
	line-height: 50px;
	display: flex;
	background: #b1b1b1;
	font-size: 25px;
	color: #fff;
}
.legBox {
	background: #ededed;
}
.legBox .ant-col {
	border: 1px solid #999;
}
.playerbox {
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.playerImgBox {
	width: 50px;
	height: 50px;
	padding: 5px;
	display: flex;
}
.playerImgBox img {
	width: 100%;
}
.playerBox .ant-col {
	border: 1px solid #999;
}
.playerBox {
	height: 50px;
	line-height: 50px;
}
.playerImg {
	display: flex;
}
.playerName {
	cursor: pointer;
}
.playerName:hover {
	text-decoration: underline;
}
.winStyle {
	display: flex;
	color: #ff4e00;
	font-weight: bold;
	font-size: 20px;
}
.winStyle div {
	width: 50%;
}
.WinBox {
	border-right: 1px solid #999;
}
#table >>> .ant-table-thead > tr > th {
	text-align: center;
}
#table >>> .ant-table-tbody > tr > td {
	text-align: center;
}
</style>
