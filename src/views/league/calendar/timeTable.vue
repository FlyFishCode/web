<template>
	<div>
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.13') }} </a-col>
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
				<a-button type="danger" @click="showMatchTable">{{ $t('default.51') }}</a-button>
			</a-col>
		</a-row>
		<!-- 对战表 排阵-->
		<div v-if="ismatchTablePage">
			<a-row>
				<inMatchTable :confrontationId="objectionId" />
			</a-row>

			<a-row class="rowStyle">
				<a-tabs type="card" v-model:activeKey="currentKey">
					<a-tab-pane key="1" :tab="$t('default.62')">
						<matchResult :confrontationId="confrontationId" />
					</a-tab-pane>
					<a-tab-pane v-if="ready" key="2" :tab="$t('default.41')">
						<matchTable :confrontationId="objectionId" :isHome="isHome" :teamId="playerListId" />
					</a-tab-pane>
					<a-tab-pane v-else key="3" tab="AWARD">
						<award :confrontationId="confrontationId" />
					</a-tab-pane>
				</a-tabs>
			</a-row>
		</div>
		<!-- 对战表列表 -->
		<div v-else>
			<a-row class="inPhoneTableDisplay">
				<lunboGundong :stageId="stageId" @show-match="showMatch" />
			</a-row>

			<a-row>
				<a-col :lg="3" :xs="0">
					<a-select v-model:value="year" class="selectBox">
						<a-select-option v-for="item in yearList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="3" :xs="0">
					<a-select v-model:value="month" @change="monthChange" class="selectBox">
						<a-select-option v-for="item in monthList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="2" :xs="0" class="titleStyle"> <PlusOutlined class="fontIcon" />{{ $t('default.140') }} </a-col>
				<a-col :lg="0" :xs="6" class="titleStyle">
					{{ $t('default.140') }}
				</a-col>
				<a-col :lg="3" :xs="6">
					<a-select v-model:value="teamId" @change="teamChange" class="selectBox">
						<a-select-option v-for="item in teamList" :key="item.teamId" :value="item.teamId">{{ item.teamName }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="2" :xs="6" class="titleStyle">{{ $t('default.141') }}</a-col>
				<a-col :lg="3" :xs="6">
					<a-select v-model:value="state" @change="stateChange" class="selectBox">
						<a-select-option v-for="item in stateList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="{ span: 2, offset: 4 }" :xs="0" class="titleStyle"> <SearchOutlined class="fontIcon" />{{ $t('default.16') }} </a-col>
				<a-col :lg="3" :xs="0">
					<a-select v-model:value="secrchType" class="selectBox">
						<a-select-option v-for="item in secrchTypeList" :key="item.value" :value="item.value">{{ $t(item.label) }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="5" :xs="0">
					<a-input-search v-model:value="searchValue" :enter-button="$t('default.16')" size="default" @search="onSearch" />
				</a-col>
			</a-row>
			<!-- 表格 -->
			<a-row class="inPhoneTableDisplay">
				<a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" bordered rowKey="confrontationId" :customHeaderRow="customHeaderRow">
					<template v-slot:homeTeam="{ record }">
						<div class="winnerBox">
							<div v-if="record.winOrLose === 1" class="winnerTeam">{{ 'Win' }}</div>
							<div>{{ record.homeTeamName }}</div>
						</div>
					</template>
					<template v-slot:awayTeam="{ record }">
						<div class="winnerBox">
							<div>{{ record.visitingTeamName }}</div>
							<div v-if="record.winOrLose === 3" class="winnerTeam">{{ 'Win' }}</div>
						</div>
					</template>
					<template v-slot:type="{ text }">
						<div>{{ text === 1 ? $t('default.63') : $t('default.142') }}</div>
					</template>
					<template v-slot:status="{ record }">
						<div class="tableState">
							<div v-if="getTypeBtn(record)" class="plan" @click="readyClick(record.confrontationId, record)">{{ $t('default.41') }}</div>
							<div v-if="record.status === 2">{{ 'Ready' }}</div>
							<div v-if="record.status === 3" @click="finishClick(record.confrontationId)">{{ 'Finished' }}</div>
						</div>
					</template>
				</a-table>
			</a-row>
			<!-- 移动端 -->
			<a-row class="showPhoneTable">
				<a-table :columns="inPhoneColumns" :data-source="tableList" :pagination="false" bordered rowKey="confrontationId">
					<template v-slot:date>
						<div>{{ $t('default.52') }}</div>
					</template>
					<template v-slot:homeTeam>
						<div>{{ $t('default.56') }}</div>
					</template>
					<template v-slot:homeTeamName>
						<div>{{ $t('default.55') }}</div>
					</template>
					<template v-slot:awayTeamName>
						<div>{{ $t('default.55') }}</div>
					</template>
					<template v-slot:inState>
						<div>{{ $t('default.59') }}</div>
					</template>
				</a-table>
			</a-row>
			<div class="pagination">
				<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="pageTotal" @change="pageChange" />
			</div>
		</div>
		<entryList :entryPath="entryPath" />
		<div>
			<a-modal v-model:visible="visible" centered width="800px" :footer="null" :title="$t('default.157')">
				<a-row>
					<a-col :span="6">
						<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
							<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
						</a-select>
					</a-col>
					<a-col :span="6">
						<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
							<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
						</a-select>
					</a-col>
				</a-row>
				<!-- <a-row class="dialogRow" v-for="item in dialogList" :key="item.index">
					<a-table id="diaLogTable" :columns="dialogColumns" :data-source="item.matchTableList" :pagination="false" width="70%" bordered>
						<template #customTitle>
							<div class="columnsBox">
								<div class="awayClass">{{ 'Away' }}</div>
								<div class="homeClass">{{ 'Home' }}</div>
							</div>
						</template>
						<template #homeTeamName="{ text }">
							<div>{{ text }}</div>
						</template>
					</a-table>
				</a-row> -->
			</a-modal>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
// 排阵页面
import matchTable from '@/views/league/matchTable/matchTable.vue';
import matchResult from '@/views/league/matchResult/matchResult.vue';
import award from '@/views/league/award/award.vue';
// import { DOM } from "@/type/interface.d.ts";
import { matchtableHttp, leagueSelectHttp, timeTableDataListHttp } from '@/axios/api';
import { SettingFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons-vue';
import lunboGundong from '@/components/inCalendar.vue';
import inMatchTable from '@/components/inMatchTable.vue';
import entryList from '@/components/common/entryList.vue';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';

interface DataProps {
	objectionId: any;
	dialogColumns: Array<any>;
	tableList: Array<any>;
	dialogList: Array<any>;
	visible: boolean;
	ready: boolean;
	ismatchTablePage: boolean;
	stageId: string;
	divisiton: string;
	teamId: string;
	isHome: number;
	playerListId: number;
	year: number;
	month: string | number;
	pageNum: number;
	pageSize: number;
	pageTotal: number;
	confrontationId: any;
	state: string;
	currentKey: any;
	secrchType: string;
	searchValue: string;
	stageList: Array<any>;
	divisitonList: Array<any>;
	teamList: Array<any>;
}
export default defineComponent({
	name: 'timeTable',
	components: {
		SettingFilled,
		lunboGundong,
		PlusOutlined,
		inMatchTable,
		matchTable,
		award,
		matchResult,
		entryList,
		SearchOutlined
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const userId = sessionStorage.getItem('userId');
		let currentSelectList: Array<any> = [];
		// 因为后端id不统一，使用flag变量标注 传参id
		// 1:使用confrontationId 为对战详情id
		// 0:使用competitionId  为对战详情id
		const data: DataProps = reactive({
			entryPath: '/league',
			currentKey: '1',
			confrontationId: ROUTE.query.competitionId,
			objectionId: ROUTE.query.flag ? ROUTE.query.confrontationId : ROUTE.query.competitionId,
			visible: false,
			isHome: 0,
			playerListId: 0,
			ready: false,
			searchValue: '',
			ismatchTablePage: false,
			pageNum: 1,
			pageSize: 10,
			pageTotal: 1,
			stageId: '',
			divisiton: '',
			stageList: [{ stageId: '' }],
			divisitonList: [{ divisionId: 0, stageList: [] }],
			year: 2020,
			yearList: [{ value: 2020, label: 2020 }],
			state: '',
			stateList: [
				{ value: '', label: 'ALL' },
				{ value: 1, label: '准备中' },
				{ value: 2, label: '进行中' },
				{ value: 3, label: '已结束' }
			],
			teamId: '',
			teamList: [],
			month: '',
			monthList: [
				{ value: '', label: 'ALL' },
				{ value: 1, label: 1 },
				{ value: 2, label: 2 },
				{ value: 3, label: 3 },
				{ value: 4, label: 4 },
				{ value: 5, label: 5 },
				{ value: 6, label: 6 },
				{ value: 7, label: 7 },
				{ value: 8, label: 8 },
				{ value: 9, label: 9 },
				{ value: 10, label: 10 },
				{ value: 11, label: 11 },
				{ value: 12, label: 12 }
			],
			secrchType: 'teamName',
			secrchTypeList: [
				{ value: 'teamName', label: 'default.55' },
				{ value: 'captainName', label: 'default.248' },
				{ value: 'address', label: 'default.75' }
			],
			matchType: 1,
			matchTypeList: [
				{ value: 1, label: 'default.55' },
				{ value: 2, label: 'default.248' },
				{ value: 3, label: 'default.75' }
			],
			dialogColumns: [
				{
					dataIndex: 'homeTeamName',
					key: 'homeTeamName',
					width: 150,
					slots: { title: 'customTitle', customRender: 'homeTeamName' }
				}
			],
			dialogList: [],
			getTypeBtn: (row: any) => {
				if ((row.homeCaptainId === userId || row.visitingCaptainId === userId) && row.status === 1) {
					return true;
				} else {
					return false;
				}
			},
			customRow: (record: any) => {
				return {
					click: () => {
						debugger;
						console.log(record);
					}
				};
			},
			customHeaderRow: () => {
				return {
					className: 'selectBox',
					onClick: (e: any) => {
						if (e.target.className.includes('ant-table-column-title')) {
							if (currentSelectList.length === 2) {
								ROUTER.push({
									path: 'ranking',
									query: {
										activeKey: '2',
										teamList: `${currentSelectList[0]},${currentSelectList[1]}`
									}
								});
							} else {
								message.warning('请选择两支队伍');
							}
						}
					}
				};
			},
			rowSelection: {
				columnWidth: 80,
				columnTitle: '对比',
				onChange: (selectedRowKeys: number[]) => {
					if (selectedRowKeys.length === 2) {
						currentSelectList = selectedRowKeys;
						const selectIndex: number[] = [];
						selectedRowKeys.forEach((i) => {
							selectIndex.push(data.tableList.findIndex((j) => j.confrontationId === i));
						});
						data.tableList.forEach((i, index) => {
							if (index !== selectIndex[1]) {
								i.disabled = true;
							}
						});
						const list = data.tableList;
						data.tableList = [...list];
					} else {
						data.tableList.forEach((i) => {
							i.disabled = false;
						});
						const list = data.tableList;
						data.tableList = [...list];
						currentSelectList = [];
					}
				},
				getCheckboxProps: (record: { disabled: boolean }) => ({
					disabled: record.disabled // Column configuration not to be checked
				})
			},
			columns: [
				{
					title: '日期',
					dataIndex: 'date',
					key: 'name'
				},
				{ title: '对战时间', dataIndex: 'time', key: 'time' },
				{ title: '对战类型', dataIndex: 'type', key: 'type', slots: { customRender: 'type' } },
				{
					title: 'HOME TEAM',
					children: [
						{
							title: '队名',
							dataIndex: 'homeTeamName',
							key: 'homaName',
							slots: { customRender: 'homeTeam' }
						},
						{
							title: 'SCORES',
							dataIndex: 'homeTeamScore',
							key: 'homeScore'
						}
					]
				},
				{
					title: 'AWAY TEAM',
					children: [
						{
							title: 'SCORES',
							dataIndex: 'visitingTeamScore',
							key: 'awayScore'
						},
						{
							title: '队名',
							dataIndex: 'visitingTeamName',
							key: 'awayName',
							slots: { customRender: 'awayTeam' }
						}
					]
				},
				{
					title: '状态',
					dataIndex: 'status',
					key: 'state',
					width: 100,
					slots: { customRender: 'status' }
				}
			],
			inPhoneColumns: [
				{
					dataIndex: 'data',
					key: 'name',
					slots: { title: 'date' }
				},
				{
					dataIndex: 'homaName',
					key: 'homaName',
					slots: { title: 'homeTeamName' }
				},
				{
					title: 'VS',
					dataIndex: 'homaName',
					key: 'homaName'
				},
				{
					dataIndex: 'awayName',
					key: 'awayName',
					slots: { title: 'awayTeamName' }
				}
			],
			tableList: [{ confrontationId: 1 }],
			teamChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTimeTableList();
			},
			stateChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTimeTableList();
			},
			showMatchTable: () => {
				data.visible = true;
			},
			handleMenuClick: () => {
				console.log('1');
			},
			onSearch: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTimeTableList();
			},
			pageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTimeTableList();
			},
			showMatch: (value: any, state: number, isHome: number, teamId: number) => {
				data.confrontationId = value;
				data.objectionId = value;
				switch (state) {
					case 1:
						data.ready = true;
						break;
					case 2:
					default:
						data.ready = false;
						break;
				}
				data.isHome = isHome;
				data.playerListId = teamId;
				data.ismatchTablePage = true;
			},
			readyClick: (id: number, row: any) => {
				if (row.homeCaptainId === Number(userId)) {
					data.isHome = 1;
					data.playerListId = row.homeTeamId;
				}
				if (row.visitingCaptainId === Number(userId)) {
					data.isHome = 2;
					data.playerListId = row.visitingTeamId;
				}
				data.ismatchTablePage = true;
				data.ready = true;
				data.confrontationId = id;
				data.objectionId = id;
			},
			finishClick: (id: number) => {
				data.ismatchTablePage = true;
				data.ready = false;
				data.confrontationId = id;
				data.objectionId = id;
			},
			Gohistory: () => {
				console.log('111');
			},
			matchTypeChange: (value: number) => {
				console.log(value);
			},
			monthChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTimeTableList();
			},
			divisitonChange: (value: number) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				data.stageList = data.divisitonList.find((i) => i.divisionId === value)!.stageList;
				if (data.stageList.length) {
					data.stageId = data.stageList[0].stageId;
				} else {
					data.stageId = '';
				}
			},
			stageChange: (value: number) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				data.teamList = data.stageList.find((i) => i.stageId === value)!.teamList;
				if (data.teamList.length) {
					data.teamId = data.teamList[0].teamId;
				} else {
					data.teamId = '';
				}
			}
		});
		const getDialogList = () => {
			matchtableHttp({ confrontationId: data.confrontationId }).then((res) => {
				const teamObj: any = {};
				res.data.data.loopSurfaceList.forEach((i: any) => {
					i.matchTableList.forEach((j: any) => {
						if (!teamObj[j.visitingTeamName]) {
							teamObj[j.visitingTeamName] = true;
							const obj = {
								title: j.visitingTeamName,
								dataIndex: 'visitingTeamName'
							};
							data.dialogColumns.push(obj);
						}
					});
				});
				data.dialogList = res.data.data.loopSurfaceList;
			});
		};
		const getSelectList = () => {
			const obj = {
				competitionId: data.confrontationId,
				teamFlag: true
			};
			leagueSelectHttp(obj).then((res) => {
				data.divisitonList = res.data.data;
				data.divisiton = res.data.data[0].divisionId;
				data.stageList = res.data.data[0].stageList;
				data.stageId = res.data.data[0].stageList[0].stageId;
				data.teamList = res.data.data[0].stageList[0].teamList;
				data.teamId = res.data.data[0].stageList[0].teamList[0].teamId;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTimeTableList();
			});
		};
		const getTimeTableList = () => {
			const obj = {
				stageId: data.stageId,
				year: data.year,
				month: data.month,
				teamId: data.teamId,
				status: data.state,
				[data.secrchType]: data.searchValue,
				pageIndex: data.pageNum,
				pageSize: data.pageSize
			};
			timeTableDataListHttp(obj).then((res) => {
				data.tableList = res.data.data.list;
				data.pageTotal = res.data.data.totalCount;
			});
		};
		const init = (queryObj: any) => {
			if (queryObj.ismatchTablePage) {
				data.ismatchTablePage = true;
			}
			if (queryObj.currentKey) {
				data.currentKey = queryObj.currentKey;
			}
			if (queryObj.ready) {
				data.ready = Boolean(queryObj.ready);
			}
			if (queryObj.teamId) {
				data.playerListId = queryObj.teamId;
			}
		};
		onMounted(() => {
			init(ROUTE.query);
			getSelectList();
			getDialogList();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.tableState {
	text-align: center;
}
.plan {
	background: red;
	color: #fff;
	border-radius: 10px;
	cursor: pointer;
}
.showPhoneTable {
	display: none;
}
.dialogRow {
	margin: 10px 0;
}
.awayClass {
	text-align: right;
}
.winnerBox {
	display: flex;
	justify-content: space-around;
}
.winnerTeam {
	background: #ff4e00;
	color: #fff;
	padding: 0 3px;
}
</style>
