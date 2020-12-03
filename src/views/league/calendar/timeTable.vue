<template>
	<div>
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.13') }} </a-col>
		</a-row>
		<a-row>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="{ span: 3, offset: 15 }" :xs="0">
				<a-button type="danger" @click="showMatchTable">{{ $t('default.51') }}</a-button>
			</a-col>
			<a-col :lg="0" :xs="6">
				<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="0" :xs="6">
				<a-select v-model:value="month" @change="monthChange" class="selectBox">
					<a-select-option v-for="item in monthList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<!-- 对战表 排阵-->
		<div v-if="ismatchTablePage">
			<a-row>
				<inMatchTable />
			</a-row>

			<a-row class="rowStyle">
				<!-- <div v-if="state === 1"> -->
				<a-tabs type="card">
					<a-tab-pane key="1" :tab="$t('default.62')">
						<matchResult />
					</a-tab-pane>
					<a-tab-pane key="2" :tab="$t('default.41')">
						<matchTable />
					</a-tab-pane>
					<a-tab-pane v-if="AWARD" key="3" tab="AWARD">
						<award />
					</a-tab-pane>
				</a-tabs>
				<!-- </div> -->
				<!-- <div v-else>
        <a-tabs type="card">
          <a-tab-pane key="1" tab="比赛结果">
            Content of Tab Pane 1
          </a-tab-pane>
          <a-tab-pane key="2" tab="AWARD">
            Content of Tab Pane 2
          </a-tab-pane>
        </a-tabs>
      </div> -->
			</a-row>
		</div>
		<!-- 对战表列表 -->
		<div v-else>
			<a-row class="inPhoneTableDisplay">
				<lunboGundong :topList="gundongInfoList" @show-match="showMatch" />
			</a-row>

			<a-row>
				<a-col :lg="3" :xs="0">
					<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
						<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="3" :xs="0">
					<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
						<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
			</a-row>
			<a-row>
				<a-col :lg="2" :xs="0" class="titleStyle"> <PlusOutlined class="fontIcon" />{{ $t('default.140') }} </a-col>
				<a-col :lg="0" :xs="6" class="titleStyle">
					{{ $t('default.140') }}
				</a-col>
				<a-col :lg="3" :xs="6">
					<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
						<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="2" :xs="6" class="titleStyle">{{ $t('default.141') }}</a-col>
				<a-col :lg="3" :xs="6">
					<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
						<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="{ span: 2, offset: 5 }" :xs="0" class="titleStyle"> <SearchOutlined class="fontIcon" />{{ $t('default.16') }} </a-col>
				<a-col :lg="2" :xs="0">
					<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
						<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="5" :xs="0">
					<a-input-search v-model:value="currentValue" :enter-button="$t('default.16')" size="default" @search="onSearch" />
				</a-col>
			</a-row>
			<!-- 表格 -->
			<a-row class="inPhoneTableDisplay">
				<a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" bordered rowKey="key" :customHeaderRow="customHeaderRow">
					<template v-slot:date>
						<div>{{ $t('default.52') }}</div>
					</template>
					<template v-slot:time>
						<div>{{ $t('default.152') }}</div>
					</template>
					<template v-slot:type>
						<div>{{ $t('default.119') }}</div>
					</template>
					<template v-slot:homeTeam>
						<div>{{ $t('default.56') }}</div>
					</template>
					<template v-slot:homeTeamName>
						<div>{{ $t('default.55') }}</div>
					</template>
					<template v-slot:homeScore>
						<div>{{ $t('default.58') }}</div>
					</template>
					<template v-slot:awayScore>
						<div>{{ $t('default.58') }}</div>
					</template>
					<template v-slot:awayTeamName>
						<div>{{ $t('default.55') }}</div>
					</template>
					<template v-slot:awayTeam>
						<div>{{ $t('default.57') }}</div>
					</template>
					<template v-slot:inState>
						<div>{{ $t('default.59') }}</div>
					</template>
					<template v-slot:state="{ text }">
						<div class="tableState">
							<div v-if="text === 1" class="plan" @click="showPlan">{{ $t('default.41') }}</div>
							<div v-if="text === 2">{{ 'Ready' }}</div>
							<div v-if="text === 3">{{ 'Finished' }}</div>
						</div>
					</template>
				</a-table>
			</a-row>
			<!-- 移动端 -->
			<a-row class="showPhoneTable">
				<a-table :columns="inPhoneColumns" :data-source="tableList" :pagination="false" bordered rowKey="key">
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
				<a-row class="dialogRow" v-for="item in dialogList" :key="item.index">
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
				</a-row>
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
import { matchtableHttp } from '@/axios/api';
import { SettingFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons-vue';
import lunboGundong from '@/components/inCalendar.vue';
import inMatchTable from '@/components/inMatchTable.vue';
import entryList from '@/components/common/entryList.vue';
import { useRoute } from 'vue-router';

interface DataProps {
	dialogColumns: Array<any>;
	tableList: Array<any>;
	dialogList: Array<any>;
	visible: boolean;
	ismatchTablePage: boolean;
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
		const data: DataProps = reactive({
			entryPath: '/league',
			visible: false,
			AWARD: ROUTE.query.AWARD,
			stateList: [],
			currentValue: '',
			ismatchTablePage: false,
			matchType: 2020,
			month: 1,
			dialogColumns: [
				{
					dataIndex: 'homeTeamName',
					key: 'homeTeamName',
					width: 150,
					slots: { title: 'customTitle', customRender: 'homeTeamName' }
				}
			],
			dialogList: [],
			monthList: [
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
			matchTypeList: [{ value: 2020, label: '2020' }],
			// customRow: (record: any) => {
			//   return {
			//     click: () => {
			//       debugger;
			//       console.log(record);
			//     },
			//   };
			// },
			customHeaderRow: (column: any) => {
				return {
					// on: {
					click: (event: any) => {
						debugger;
						console.log(event, column);
					}
					// },
				};
			},
			gundongInfoList: [
				{
					matchId: 1,
					date: '2020-10-14',
					match: [
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '上海队',
							awayTeamName: '武汉队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '广州队',
							awayTeamName: '香港队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '青岛队',
							awayTeamName: '周口队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '重庆队',
							awayTeamName: '天津队',
							homeMatch: 3,
							awayMatch: '4'
						}
					]
				},
				{
					matchId: 2,
					date: '2020-10-14',
					match: [
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '上海队',
							awayTeamName: '武汉队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '青岛队',
							awayTeamName: '周口队',
							homeMatch: 3,
							awayMatch: '4'
						}
					]
				},
				{
					matchId: 3,
					img: require('@/assets/1.jpg'),
					homeTeamName: '上海队',
					homeMatch: 3,
					date: '2020-10-14',
					match: []
				},
				{
					matchId: 4,
					date: '2020-10-14',
					match: [
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '上海队',
							awayTeamName: '武汉队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '广州队',
							awayTeamName: '香港队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '青岛队',
							awayTeamName: '周口队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '重庆队',
							awayTeamName: '天津队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '1',
							awayTeamName: '4',
							homeMatch: 3,
							awayMatch: '4',
							match: []
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '2',
							awayTeamName: '5',
							homeMatch: 3,
							awayMatch: '4',
							match: []
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '3',
							awayTeamName: '6',
							homeMatch: 3,
							awayMatch: '4',
							match: []
						}
					]
				},
				{
					matchId: 5,
					img: require('@/assets/1.jpg'),
					homeTeamName: '上海队',
					homeMatch: 3,
					date: '2020-10-14',
					match: []
				},
				{
					matchId: 6,
					date: '2020-10-14',
					match: [
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '上海队',
							awayTeamName: '武汉队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '广州队',
							awayTeamName: '香港队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '青岛队',
							awayTeamName: '周口队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '重庆队',
							awayTeamName: '天津队',
							homeMatch: 3,
							awayMatch: '4'
						}
					]
				},
				{
					matchId: 7,
					date: '2020-10-14',
					match: [
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '上海队',
							awayTeamName: '武汉队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '广州队',
							awayTeamName: '香港队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '青岛队',
							awayTeamName: '周口队',
							homeMatch: 3,
							awayMatch: '4'
						},
						{
							img: require('@/assets/1.jpg'),
							homeTeamName: '重庆队',
							awayTeamName: '天津队',
							homeMatch: 3,
							awayMatch: '4'
						}
					]
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
			columns: [
				{
					dataIndex: 'data',
					key: 'name',
					slots: { title: 'date' }
				},
				{ dataIndex: 'data', key: 'time', slots: { title: 'time' } },
				{ dataIndex: 'data', key: 'type', slots: { title: 'type' } },
				{
					children: [
						{
							dataIndex: 'homaName',
							key: 'homaName',
							slots: { title: 'homeTeamName' }
						},
						{
							dataIndex: 'homeScore',
							key: 'homeScore',
							slots: { title: 'homeScore' }
						}
					],
					slots: { title: 'homeTeam' }
				},
				{
					children: [
						{
							dataIndex: 'awayScore',
							key: 'awayScore',
							slots: { title: 'awayScore' }
						},
						{
							dataIndex: 'awayName',
							key: 'awayName',
							slots: { title: 'awayTeamName' }
						}
					],
					slots: { title: 'awayTeam' }
				},
				{
					dataIndex: 'state',
					key: 'state',
					slots: { title: 'inState', customRender: 'state' }
				}
			],
			tableList: [
				{
					data: '2020-10-1',
					time: '18:25',
					state: 1,
					type: 1,
					homaName: '张自然',
					homeScore: 10,
					awayName: '李逍遥',
					awayScore: 5,
					key: 1,
					disabled: false
				},
				{
					data: '2020-10-2',
					time: '19:25',
					state: 2,
					type: 1,
					homaName: '张自然',
					homeScore: 10,
					awayName: '李逍遥',
					awayScore: 5,
					key: 2,
					disabled: false
				},
				{
					data: '2020-10-3',
					time: '17:25',
					state: 3,
					type: 1,
					homaName: '张自然',
					homeScore: 10,
					awayName: '李逍遥',
					awayScore: 5,
					key: 3,
					disabled: false
				},
				{
					data: '2020-10-3',
					time: '17:25',
					state: 3,
					type: 1,
					homaName: '张自然',
					homeScore: 10,
					awayName: '李逍遥',
					awayScore: 5,
					key: 4,
					disabled: false
				},
				{
					data: '2020-10-3',
					time: '17:25',
					state: 3,
					type: 1,
					homaName: '张自然',
					homeScore: 10,
					awayName: '李逍遥',
					awayScore: 5,
					key: 5,
					disabled: false
				}
			],
			showMatchTable: () => {
				data.visible = true;
			},
			handleMenuClick: () => {
				console.log('1');
			},
			onSearch: () => {
				console.log('1');
			},
			// changeDisabled:() =>{
			//   return {
			//     disabled
			//   }
			// },
			rowSelection: {
				columnWidth: 100,
				columnTitle: '排行',
				onChange: (selectedRowKeys: number[]) => {
					if (selectedRowKeys.length == 2) {
						selectedRowKeys.forEach((i) => {
							const index = data.tableList.findIndex((j) => j.key === i);
							data.tableList.forEach((k, kndex) => {
								if (index !== kndex) {
									k.disabled = true;
								} else {
									k.disabled = false;
								}
							});
							const list = data.tableList;
							data.tableList = [...list];
						});
					} else {
						data.tableList.forEach((i) => {
							i.disabled = false;
						});
						const list = data.tableList;
						data.tableList = [...list];
					}
				},
				getCheckboxProps: (record: { disabled: boolean }) => ({
					disabled: record.disabled // Column configuration not to be checked
				})
			},
			showMatch: (value: any) => {
				console.log(value);
				data.ismatchTablePage = true;
			},
			showPlan: () => {
				data.ismatchTablePage = true;
			},
			Gohistory: () => {
				console.log('111');
			},
			matchTypeChange: (value: number) => {
				console.log(value);
			},
			monthChange: () => {
				console.log(1);
			}
		});
		const getDialogList = () => {
			matchtableHttp({ confrontationId: 505 }).then((res) => {
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
		onMounted(() => {
			if (ROUTE.query.ismatchTablePage) {
				data.ismatchTablePage = true;
			}
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
</style>
