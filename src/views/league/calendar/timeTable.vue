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
				<a-select v-model:value="stageId" @change="stageIdChange" class="selectBox">
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
				<inMatchTable :confrontationInfoId="confrontationInfoId" />
			</a-row>

			<a-row class="rowStyle">
				<a-tabs type="card" v-model:activeKey="currentKey">
					<a-tab-pane v-if="isResult" key="1" :tab="$t('default.62')">
						<matchResult :confrontationInfoId="confrontationInfoId" @enter-matchtable="changeStates" />
					</a-tab-pane>
					<a-tab-pane v-if="isMatchTable" key="2" :tab="$t('default.41')">
						<matchTable :confrontationInfoId="confrontationInfoId" :isHome="isHome" :teamId="playerListId" />
					</a-tab-pane>
					<a-tab-pane v-if="isAward" key="3" tab="AWARD">
						<award :confrontationInfoId="confrontationInfoId" />
					</a-tab-pane>
				</a-tabs>
			</a-row>
		</div>
		<!-- 对战表列表 -->
		<div v-else>
			<a-row class="inPhoneTableDisplay">
				<lunboGundong :stageId="stageId" @show-match="showMatch" @change-list="changelist" />
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
				<a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" bordered rowKey="confrontationInfoId" :customHeaderRow="customHeaderRow">
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
							<div v-if="getTypeBtn(record)" class="plan" @click="readyClick(record)">{{ $t('default.41') }}</div>
							<div v-if="record.status === 2">{{ $t('default.104') }}</div>
							<div v-if="record.status === 3" class="plan" @click="finishClick(record.confrontationInfoId)">{{ $t('default.244') }}</div>
						</div>
					</template>
				</a-table>
			</a-row>
			<!-- 移动端 -->
			<a-row class="showPhoneTable">
				<a-table :columns="inPhoneColumns" :data-source="tableList" :pagination="false" bordered rowKey="confrontationInfoId">
					<template v-slot:date>
						<div>{{ $t('default.52') }}</div>
					</template>
					<template v-slot:homeTeam>
						<div>{{ $t('default.56') }}</div>
					</template>
					<template v-slot:homeTeamName>
						<div>{{ $t('default.55') }}</div>
					</template>
					<template v-slot:VS="{ record }">
						<div v-if="record.homeTeamScore">{{ `${record.homeTeamScore}:${record.visitingTeamScore}` }}</div>
						<div v-if="getTypeBtn(record)" class="plan" @click="readyClick(record)">{{ $t('default.41') }}</div>
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
			<el-dialog v-model="visible" :title="$t('default.151')">
				<div v-for="(item, itemIndex) in dialogList" :key="itemIndex">
					<el-table border :data="item" class="tableClass">
						<el-table-column v-for="(header, index) in tableHeader" :key="index" :property="String(header.id)" :label="header.homeTeamName" align="center" min-width="110px">
							<template v-slot="scope">
								<template v-if="index === 0">
									<div>{{ scope.row.visitingTeamName }}</div>
								</template>
								<template v-if="index !== 0">
									<div>{{ showData(header.homeTeamId, scope.row.visitingTeamId, itemIndex).confrontationDate.split(' ')[0] }}</div>
									<div v-if="showData(header.homeTeamId, scope.row.visitingTeamId, itemIndex).state === 1">{{ $t('default.64') }}</div>
									<div v-if="showData(header.homeTeamId, scope.row.visitingTeamId, itemIndex).state === 2">{{ $t('default.104') }}</div>
									<div v-if="showData(header.homeTeamId, scope.row.visitingTeamId, itemIndex).state === 3" @click="entryPage(scope.row)">
										<div>{{ showData(header.homeTeamId, scope.row.visitingTeamId, itemIndex).homeTeamName }}</div>
										<div>{{ showData(header.homeTeamId, scope.row.visitingTeamId, itemIndex).visitingTeamName }}</div>
										<div>{{ showData(header.homeTeamId, scope.row.visitingTeamId, itemIndex).week }}</div>
									</div>
								</template>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, nextTick } from 'vue';
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
import { yearList } from '@/components/common/public';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

interface DataProps {
	handleState: (state: number, playerNumber: number) => void;
	showChangeBtn: boolean;
	cycleNum: any;
	allMatchTableData: Array<any>;
	tableHeader: Array<any>;
	confrontationId: any;
	competitionId: any;
	dialogColumns: Array<any>;
	tableList: Array<any>;
	dialogList: Array<any>;
	visible: boolean;
	isResult: boolean;
	isMatchTable: boolean;
	isAward: boolean;
	ismatchTablePage: boolean;
	stageId: string;
	divisiton: string;
	teamId: string;
	isHome: number;
	playerListId: number;
	year: any;
	month: string | number;
	pageNum: number;
	pageSize: number;
	pageTotal: number;
	confrontationInfoId: any;
	state: string;
	currentKey: string;
	secrchType: string;
	searchValue: string;
	stageList: Array<any>;
	divisitonList: Array<any>;
	teamList: Array<any>;
	tableDataList: Array<any>;
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
		const userId = Number(sessionStorage.getItem('userId'));
		let currentSelectList: Array<any> = [];
		const data: DataProps = reactive({
			entryPath: '/league',
			currentKey: '1',
			competitionId: ROUTE.query.competitionId,
			confrontationId: ROUTE.query.confrontationId,
			confrontationInfoId: ROUTE.query.confrontationInfoId,
			visible: false,
			showChangeBtn: false,
			isHome: 0,
			playerListId: 0,
			isResult: false,
			isMatchTable: false,
			isAward: false,
			searchValue: '',
			ismatchTablePage: false,
			tableDataList: [],
			tableHeader: [{ homeTeamName: 'cycle 1' }],
			cycleNum: 0,
			allMatchTableData: [],
			pageNum: 1,
			pageSize: 10,
			pageTotal: 1,
			stageId: '',
			divisiton: '',
			stageList: [{ stageId: '' }],
			divisitonList: [{ divisionId: 0, stageList: [] }],
			year: '',
			yearList,
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
					width: 150,
					slots: { title: 'customTitle', customRender: 'homeTeamName' }
				}
			],
			dialogList: [],
			entryPage: (row: any) => {
				data.visible = false;
				data.ismatchTablePage = true;
				data.isMatchTable = true;
				ROUTER.push({
					path: '/calendar',
					query: {
						competitionId: row.confrontationInfoId,
						divisionId: row.confrontationInfoId
					}
				});
			},
			changeStates: () => {
				data.isResult = false;
				data.isMatchTable = true;
				data.currentKey = '2';
			},
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
					dataIndex: 'date',
					title: '日期',
					width: 90
				},
				{
					dataIndex: 'homeTeamName',
					title: 'HomeTeam',
					width: 240
				},
				{
					title: 'VS',
					width: 90,
					slots: { customRender: 'VS' }
				},
				{
					dataIndex: 'visitingTeamName',
					title: 'AwayTeam',
					width: 240
				}
			],
			tableList: [{ confrontationInfoId: 1 }],
			showData(x: number, y: number, index: number) {
				// 横坐标，纵坐标，第几个数组
				let obj = {};
				obj = data.allMatchTableData[index].find((i: any) => i.homeTeamId === x && i.visitingTeamId === y);
				if (obj) {
					return obj;
				}
				return {
					confrontationDate: '',
					homeTeamName: '',
					visitingTeamName: '',
					state: '',
					week: '',
					id: ''
				};
			},
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
				nextTick(() => {
					document.querySelectorAll('.tableClass .el-table__header-wrapper .has-gutter tr th:first-child div').forEach((i: any, index: number) => {
						i.innerText = `cycle ${index + 1}`;
					});
				});
			},
			onSearch: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTimeTableList();
			},
			pageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTimeTableList();
			},
			showMatch: (row: any, playerChangeNumber: number) => {
				/*1.未登录，不可进入排阵页面。进去结果页面
				 *2.登录  如果是草稿或者未排阵或者可以更改玩家次数，则进入排阵页面。
				 *			  如果是已提交状态，进入结果页面
				 */
				if (row.state === 2) return;
				if (row.state === 1) {
					debugger;
					if (row.homeCaptainId === userId) {
						data.isHome = 1;
						data.playerListId = row.homeTeamId;
						data.handleState(row.homeManageStatus, playerChangeNumber);
						// if (row.homeManageStatus <= 1) {
						// 	data.isMatchTable = true;
						// 	data.currentKey = '2';
						// } else {
						// 	if (playerChangeNumber) {
						// 		data.showChangeBtn = true;
						// 	}
						// 	data.isResult = true;
						// 	data.currentKey = '1';
						// }
					}
					if (row.visitingCaptainId === userId) {
						data.isHome = 2;
						data.playerListId = row.visitingTeamId;
						data.handleState(row.visitingManageStatus, playerChangeNumber);
						// if (row.visitingManageStatus <= 1) {
						// 	data.isMatchTable = true;
						// 	data.currentKey = '2';
						// } else {
						// 	if (playerChangeNumber) {
						// 		data.showChangeBtn = true;
						// 	}
						// 	data.isResult = true;
						// 	data.currentKey = '1';
						// }
					}
					data.ismatchTablePage = true;
					data.confrontationInfoId = row.confrontationInfoId;
				}
				if (row.state === 3) {
					data.confrontationInfoId = row.confrontationInfoId;
					data.ismatchTablePage = true;
					data.isResult = true;
					data.isAward = true;
				}
			},
			changelist: (date: string) => {
				const [year, month] = date.split('-');
				const obj = {
					stageId: data.stageId,
					year: year,
					month: parseInt(month),
					teamId: '',
					status: data.state,
					[data.secrchType]: data.searchValue,
					pageIndex: data.pageNum,
					pageSize: data.pageSize
				};
				timeTableDataListHttp(obj).then((res) => {
					data.tableDataList = res.data.data.list;
					data.tableList = data.tableDataList.filter((i) => i.date.includes(date));
				});
			},
			readyClick: (row: any) => {
				if (row.homeCaptainId === userId) {
					data.isHome = 1;
					data.playerListId = row.homeTeamId;
					data.handleState(row.homeManageStatus, row.playerChangeNumber);
					// if (row.homeManageStatus <= 1) {
					// 	data.isMatchTable = true;
					// 	data.currentKey = '2';
					// } else {
					// 	if (row.playerChangeNumber) {
					// 		data.showChangeBtn = true;
					// 	}
					// 	data.isResult = true;
					// 	data.currentKey = '1';
					// }
				}
				if (row.visitingCaptainId === userId) {
					data.isHome = 2;
					data.playerListId = row.visitingTeamId;
					data.handleState(row.visitingManageStatus, row.playerChangeNumber);
					// if (row.visitingManageStatus <= 1) {
					// 	data.isMatchTable = true;
					// 	data.currentKey = '2';
					// } else {
					// 	if (row.playerChangeNumber) {
					// 		data.showChangeBtn = true;
					// 	}
					// 	data.isResult = true;
					// 	data.currentKey = '1';
					// }
				}
				data.ismatchTablePage = true;
				data.confrontationInfoId = row.confrontationInfoId;
			},
			finishClick: (confrontationInfoId: number) => {
				data.confrontationInfoId = confrontationInfoId;
				data.ismatchTablePage = true;
				data.isResult = true;
				data.isAward = true;
			},
			handleState: (state: number, playerChangeNumber: number) => {
				if (state <= 1) {
					data.isMatchTable = true;
					data.currentKey = '2';
				} else {
					if (playerChangeNumber) {
						data.showChangeBtn = true;
					}
					data.isResult = true;
					data.currentKey = '1';
				}
			},
			entryInfoPage: (row: any) => {
				console.log(row);
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
			stageIdChange: (value: number, option: any) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				data.teamList = data.stageList.find((i) => i.stageId === value)!.teamList;
				if (data.teamList.length) {
					data.teamId = data.teamList[0].teamId;
				} else {
					data.teamId = '';
				}
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDialogList(option);
			}
		});
		const getDialogList = (id: any) => {
			matchtableHttp({ confrontationId: id }).then((res) => {
				if (res.data.data) {
					const homeObj: any = {};
					const awayObj: any = {};
					const list: any = [];
					res.data.data.loopSurfaceList.forEach((i: any) => {
						const arr = Object.assign(i.matchTableList, []);
						i.matchTableList.forEach((j: any) => {
							if (!awayObj[j.homeTeamId]) {
								awayObj[j.homeTeamId] = true;
								data.tableHeader.push(j);
							}
							if (!homeObj[j.visitingTeamId]) {
								homeObj[j.visitingTeamId] = true;
								list.push(j);
							}
						});
						data.dialogList.push(list);
						data.allMatchTableData.push(arr);
					});
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
				data.divisiton = data.divisitonList.find((i) => i.divisionId === Number(ROUTE.query.divisionId)).divisionId;
				data.stageList = data.divisitonList[0].stageList;
				data.stageId = data.divisitonList[0].stageList[0].stageId;
				data.teamList = data.divisitonList[0].stageList[0].teamList;
				data.teamId = data.divisitonList[0].stageList[0].teamList[0].teamId;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTimeTableList();
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDialogList(data.stageList[0].confrontationId);
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
				data.tableDataList = res.data.data.list;
				// data.pageTotal = res.data.data.totalCount;
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
				data.isMatchTable = Boolean(queryObj.ready);
			}
			if (queryObj.teamId) {
				data.playerListId = queryObj.teamId;
			}
		};
		onBeforeRouteUpdate((to: any, from: any, next: any) => {
			data.competitionId = to.query.competitionId;
			if (to.query.confrontationInfoId) {
				data.confrontationInfoId = to.query.confrontationInfoId;
			}
			getSelectList();
			next();
		});
		onMounted(() => {
			init(ROUTE.query);
			getSelectList();
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
.showPhoneTable >>> .ant-table-tbody > tr > td {
	padding: 0;
	text-align: center;
}
.dialogRow {
	margin: 10px 0;
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
.infoClass {
	cursor: pointer;
}
</style>
