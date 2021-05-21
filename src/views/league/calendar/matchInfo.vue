<template>
	<div>
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.24') }} </a-col>
		</a-row>
		<a-row>
			<a-col :span="12" class="smallTitle"> <SettingFilled /> {{ $t('default.135') }} </a-col>
		</a-row>
		<a-row class="tableStyle">
			<a-row>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.15') }}</div>
				</a-col>
				<a-col :lg="8" :xs="14" class="tableContentValue">
					<div>{{ infoData.title }}</div>
				</a-col>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.39') }}</div>
				</a-col>
				<a-col :lg="8" :xs="14" class="tableContentValue">
					<div
						class="overStyle"
						:title="
							infoData.operator
								.trim()
								.split(' ')
								.join('；')
						"
					>
						{{
							infoData.operator
								.trim()
								.split(' ')
								.join('；')
						}}
					</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.17') }}</div>
				</a-col>
				<a-col :lg="8" :xs="14" class="tableContentValue">
					<div class="overStyle">{{ `${$filters.filterDate(infoData.startSchedule)}~${$filters.filterDate(infoData.endSchedule)}` }}</div>
				</a-col>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.30') }}</div>
				</a-col>
				<a-col :lg="8" :xs="14" class="overStyle countryClass">
					<div v-for="item in infoData.hostingRegion" :key="item">
						<span>{{ item.countryName + '；' }}</span>
						<span v-if="item.areaName">{{ ` > ${item.areaName}；` }}</span>
					</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.29') }}</div>
				</a-col>
				<a-col :lg="8" :xs="14" class="tableContentValue">
					<div class="overStyle">{{ `${$filters.filterDate(infoData.startSignUpPeriod)}~${$filters.filterDate(infoData.endSignUpPeriod)}` }}</div>
				</a-col>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.31') }}</div>
				</a-col>
				<a-col :lg="8" :xs="14" class="tableContentValue">
					<div>{{ infoData.hostingShop }}</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.38') }}</div>
				</a-col>
				<a-col :lg="8" :xs="14" class="tableContentValue">
					<div>{{ $t(returnType(infoData.criteriaRating)) }}</div>
				</a-col>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.32') }}</div>
				</a-col>
				<a-col :lg="8" :xs="14" class="tableContentValue">
					<div>{{ infoData.entryFee }}</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.33') }}</div>
				</a-col>
				<a-col :lg="8" :xs="14" class="tableContentValue">
					<div>{{ `${infoData.switchingPlayers} times per match` }}</div>
				</a-col>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.34') }}</div>
				</a-col>
				<a-col :lg="8" :xs="14" class="tableContentValue">
					<div>{{ `${$t('default.277')} ${infoData.minimum}  ~  ${$t('default.278')} ${infoData.maximum}` }}</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.35') }}</div>
				</a-col>
				<a-col :lg="20" :xs="14" class="tableContentValue">
					<div>{{ infoData.eligibility }}</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.36') }}</div>
				</a-col>
				<a-col :lg="20" :xs="14" class="tableContentValue">
					<div>{{ infoData.rewardConditions }}</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="4" :xs="10" class="tableContent">
					<div>{{ $t('default.37') }}</div>
				</a-col>
				<a-col :lg="20" :xs="14" class="tableContentValue">
					<div>{{ infoData.gameTypeDescription }}</div>
				</a-col>
			</a-row>
		</a-row>
		<a-row class="rowStyle" type="flex" justify="space-around">
			<a-col :lg="7" :xs="24" class="sencend">
				<div class="titleWay"><SettingFilled /> {{ $t('default.40') }}</div>
				<div class="decision">
					<div class="decisionBox">
						<div class="rakingBox">{{ $t('default.43') }}</div>
						<div>{{ $t('default.46') }}</div>
						<div>{{ $t('default.47') }}</div>
						<div>{{ $t('default.48') }}</div>
					</div>
					<div class="decisionBox">
						<div class="rakingBox">{{ infoData.rankingDecision === 1 ? 'Set point' : 'Winning Point' }}</div>
						<div>{{ infoData.win }}</div>
						<div>{{ infoData.drawn }}</div>
						<div>{{ infoData.lose }}</div>
					</div>
				</div>
			</a-col>
			<a-col :lg="7" :xs="24" class="sencend">
				<div class="titleWay"><SettingFilled /> {{ $t('default.41') }}</div>
				<div class="decision">
					<div class="decisionBox">
						<div>{{ $t('default.136') }}</div>
						<div>{{ $t('default.45') }}</div>
					</div>
					<div class="decisionBox">
						<div>{{ $t(returnWay(infoData.lineUp)) }}</div>
						<div>{{ `开赛前 - ${infoData.deadline} Min` }}</div>
					</div>
				</div>
			</a-col>
			<a-col :lg="7" :xs="24" class="sencend">
				<div class="titleWay"><SettingFilled /> {{ $t('default.42') }}</div>
				<div class="decision">
					<div class="decisionBox">
						<div>{{ $t('default.137') }}</div>
						<div>{{ $t('default.138') }}</div>
					</div>
					<div class="decisionBox">
						<div>{{ $t(returnFirst(infoData.setFirst)) }}</div>
						<div>{{ $t('default.239') }}</div>
					</div>
				</div>
			</a-col>
		</a-row>
		<a-row class="rowStyle" id="dataListBox">
			<a-table :data-source="tableList" class="components-table-demo-nested inPhoneTableDisplay" rowkey="divisionId" :pagination="false">
				<a-table-column data-index="stageName" />
				<a-table-column key="other" class="dataTimeStyle">
					<template v-slot="{ text: data }">
						<a-button type="primary" shape="round" size="small" @click="showDetail(data)">{{ data.other }}</a-button>
					</template>
				</a-table-column>
				<template #expandedRowRender="{record}">
					<a-table :columns="innerColumns" :data-source="record.list" :pagination="false" rowkey="set" bordered></a-table>
				</template>
			</a-table>

			<a-table :data-source="tableList" class="components-table-demo-nested showPhoneTable" rowkey="divisionId" :pagination="false">
				<a-table-column data-index="stageName" />
				<a-table-column key="other" class="dataTimeStyle">
					<template v-slot="{ text: data }">
						<a-button type="primary" shape="round" size="small" @click="showDetail(data)">{{ data.other }}</a-button>
					</template>
				</a-table-column>
				<template #expandedRowRender="{record}">
					<a-table :columns="inPhoneColumns" :data-source="record.list" :pagination="false" rowkey="set" bordered></a-table>
				</template>
			</a-table>
		</a-row>
		<entryList :entryPath="entryPath" />
	</div>
</template>
<script>
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { matchInfoHttp, matchInfoTableListHttp } from '@/axios/api';
import entryList from '@/components/common/entryList.vue';
import { useRoute, useRouter } from 'vue-router';
import { SettingFilled } from '@ant-design/icons-vue';
export default defineComponent({
	name: 'matchInfo',
	components: { SettingFilled, entryList },
	setup(prop, ctx) {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const instance = getCurrentInstance();
		const data = reactive({
			entryPath: '/league',
			infoData: {
				title: '',
				operator: '',
				startSchedule: '',
				endSchedule: '',
				startSignUpPeriod: '',
				endSignUpPeriod: '',
				hostingRegion: [],
				hostingShop: '',
				criteriaRating: '',
				entryFee: '',
				switchingPlayers: '',
				minimum: '',
				maximum: '',
				eligibility: '',
				rewardConditions: '',
				gameTypeDescription: '',
				rankingDecision: '',
				win: '',
				lose: '',
				drawn: '',
				lineUp: '',
				deadline: '',
				setFirst: ''
			},
			matchName: '1',
			innerData: [],
			innerColumns: [
				{
					title: 'Set',
					dataIndex: 'set',
					key: 'name',
					width: 70,
					customRender: (text) => {
						const obj = {
							children: text.text !== null ? text.text : '',
							attrs: {
								rowSpan: 0
							}
						};
						// eslint-disable-next-line @typescript-eslint/no-use-before-define
						obj.attrs.rowSpan = mergeCells(text.text, text.record.dataIndex, 'set', text.index);
						return obj;
					}
				},
				{
					title: 'Set Point',
					dataIndex: 'setPoint',
					key: 'name',
					width: 90,
					customRender: (text) => {
						const obj = {
							children: text.text !== null ? text.text : '',
							attrs: {
								rowSpan: 0
							}
						};
						// eslint-disable-next-line @typescript-eslint/no-use-before-define
						obj.attrs.rowSpan = mergeCells(text.text, text.record.dataIndex, 'setPoint', text.index);
						return obj;
					}
				},
				{ title: 'Leg', dataIndex: 'leg', key: 'name', width: 80 },
				{ title: 'Game', dataIndex: 'game', key: 'name', width: 100, slots: { customRender: 'game' } },
				{
					title: 'Game Mode',
					dataIndex: 'gameMode',
					key: 'name',
					width: 100
				},
				{ title: 'Round', dataIndex: 'round', key: 'name', width: 110 },
				{ title: 'IN', dataIndex: 'in', key: 'IN', width: 90 },
				{ title: 'OUT', dataIndex: 'out', key: 'OUT', width: 90 },
				{ title: 'Bull', dataIndex: 'bull', key: '牛眼', width: 100 },
				{ title: 'Team Freeze', dataIndex: 'freeze', key: 'Team Freeze', width: 110 },
				{
					title: 'Freeze Option',
					dataIndex: 'option',
					key: 'Freeze Option',
					width: 110
				},
				{ title: 'Overkill', dataIndex: 'overKill', key: 'Overkill', width: 115 },
				{
					title: 'Team Cricket',
					dataIndex: 'cricket',
					key: 'Team Cricket',
					width: 110
				}
			],
			inPhoneColumns: [
				{ title: 'Set', dataIndex: 'name', key: 'name', width: 10 },
				{ title: 'Leg', dataIndex: 'name', key: 'name', width: 100 },
				{ title: '游戏', dataIndex: 'name', key: 'name', width: 100 },
				{ title: '游戏模式', dataIndex: 'name', key: 'name', width: 100 },
				{ title: 'Round', dataIndex: 'name', key: 'name', width: 100 },
				{ title: 'IN', dataIndex: 'name', key: 'IN', width: 100 },
				{ title: 'OUT', dataIndex: 'name', key: 'OUT', width: 10 }
			],
			tableList: [
				{
					divisionId: 0,
					list: [
						{
							set: '',
							setPoint: '',
							game: '',
							gameMode: '',
							round: '',
							in: '',
							out: '',
							bull: '',
							freeze: '',
							option: '',
							overKill: '',
							cricket: ''
						}
					]
				}
			],
			returnType: (type) => {
				let str = '';
				switch (type) {
					case 1:
						str = 'default.273';
						break;
					case 2:
						str = 'default.274';
						break;
					case 3:
						str = 'default.275';
						break;
					default:
						str = 'default.276';
						break;
				}
				return str;
			},
			returnWay: (type) => {
				let str = '';
				switch (type) {
					case 1:
						str = 'default.281';
						break;
					case 2:
						str = 'default.282';
						break;
					default:
						str = 'default.283';
						break;
				}
				return str;
			},
			returnFirst: (type) => {
				let str = '';
				switch (type) {
					case 1:
						str = 'default.284';
						break;
					case 2:
						str = 'default.285';
						break;
					default:
						str = 'default.286';
						break;
				}
				return str;
			},
			showDetail: (e) => {
				ctx.emit('change-activekey', '2', e);
			},
			Gohistory: () => {
				ROUTER.push('/');
			}
		});
		const mergeCells = (text, dataIndex, key, index) => {
			// 上一行该列数据是否一样
			if (index !== 0 && text === data.tableList[dataIndex]['list'][index - 1][key]) {
				return 0;
			}
			let rowSpan = 1;
			// 判断下一行是否相等
			for (let i = index + 1; i < data.tableList[dataIndex]['list'].length; i++) {
				if (text !== data.tableList[dataIndex]['list'][i][key]) {
					break;
				}
				rowSpan++;
			}
			return rowSpan;
		};
		const getMatchInfo = () => {
			matchInfoHttp({ competitionId: ROUTE.query.competitionId || '' }).then((res) => {
				if (res.data.data) {
					data.infoData = res.data.data;
				}
			});
		};
		const getGameName = (type) => {
			let str = '';
			switch (type) {
				case 1:
					str = 'default.290';
					break;
				case 2:
					str = 'default.291';
					break;
				case 3:
					str = 'default.292';
					break;
				case 4:
					str = 'default.293';
					break;
				case 5:
					str = 'default.294';
					break;
				case 6:
					str = 'default.295';
					break;
				case 7:
					str = 'default.296';
					break;
				case 8:
					str = 'default.297';
					break;
				case 9:
					str = 'default.298';
					break;
				case 10:
					str = 'default.299';
					break;
				case 11:
					str = 'default.300';
					break;
				case 12:
					str = 'default.301';
					break;
				case 13:
					str = 'default.302';
					break;
				case 14:
					str = 'default.303';
					break;
				case 20:
					str = 'default.304';
					break;
				case 21:
					str = 'default.305';
					break;
				case 22:
					str = 'default.306';
					break;
				default:
					str = 'choice';
					break;
			}
			return instance.parent.ctx.$t(str);
		};
		const getMode = (type) => {
			let str = '';
			switch (type) {
				case 1:
					str = 'Single';
					break;
				case 2:
					str = 'Double';
					break;
				case 3:
					str = 'Trios';
					break;
				case 4:
					str = 'Gallon';
					break;
				case 5:
					str = 'Team';
					break;
				default:
					str = 'Team2';
					break;
			}
			return str;
		};
		const getBull = (type) => {
			let str = '';
			switch (type) {
				case 1:
					str = '25/50';
					break;
				case 2:
					str = '50/50';
					break;
				default:
					str = '0';
					break;
			}
			return str;
		};
		const getGameIn = (type) => {
			let str = '';
			switch (type) {
				case 1:
					str = 'None';
					break;
				case 2:
					str = 'DOUBLEIN';
					break;
				case 3:
					str = 'MASTERIN';
					break;
				case 4:
					str = 'MASTER NO BULLIN';
					break;
				default:
					str = 'DOUBLE NO BULLIN';
					break;
			}
			return str;
		};
		const getGameOut = (type) => {
			let str = '';
			switch (type) {
				case 1:
					str = 'None';
					break;
				case 2:
					str = 'MASTEROUT';
					break;
				case 3:
					str = 'DOUBLEOUT';
					break;
				case 4:
					str = 'MASTER NO BULLOUT';
					break;
				default:
					str = 'DOUBLE NO BULLOUT ';
					break;
			}
			return str;
		};
		const getMatchTableList = () => {
			matchInfoTableListHttp({ competitionId: ROUTE.query.competitionId || '' }).then((res) => {
				res.data.data.forEach((i, index) => {
					i.list = [];
					i.stageName = i.divisionName;
					i.other = '日程表视图';
					i.stageList.forEach((y) => {
						y.setList.forEach((j) => {
							j.legList.forEach((k) => {
								i.list.push({
									dataIndex: index,
									set: j.setNumber,
									setPoint: j.setPoint,
									leg: k.legNumber,
									game: getGameName(k.gameName),
									gameMode: getMode(j.mode),
									round: k.round,
									in: getGameIn(k.gameIn),
									out: getGameOut(k.gameOut),
									bull: getBull(k.bull),
									freeze: k.teamFreeze,
									option: k.freezeOption,
									overKill: k.overkill,
									cricket: k.teamCricket
								});
							});
						});
					});
				});
				data.tableList = res.data.data;
			});
		};
		onMounted(() => {
			getMatchInfo();
			getMatchTableList();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>
<style scoped>
.sencend {
	font-weight: bold;
	color: red;
	margin: 5px 0;
}
.tableStyle {
	border: 1px solid #333;
}
.tableContent div {
	height: 40px;
	line-height: 40px;
	border: 1px solid #d5d5d5;
	background: #eee;
	color: #000;
}
.tableContentValue div {
	height: 40px;
	line-height: 40px;
	border: 0.5px solid #d5d5d5;
}
.countryClass {
	height: 40px;
	line-height: 40px;
	display: flex;
	justify-content: center;
}
.decision {
	display: flex;
	flex-direction: column;
	border-top: 1px solid #000;
}
.rakingBox {
	flex-grow: 2 !important;
}
.decisionBox {
	display: flex;
	justify-content: space-between;
}
.decisionBox div {
	border: 1px solid #eee;
	width: 0;
	flex-grow: 1;
}
#dataListBox >>> .dataTimeStyle {
	text-align: right;
}
.titleWay {
	text-align: left;
}
.showPhoneTable {
	display: none;
}
</style>
