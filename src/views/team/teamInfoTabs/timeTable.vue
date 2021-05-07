<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.229') }} </a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="year" @change="yearChange" class="selectBox">
					<a-select-option v-for="item in yearList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<!-- <a-col :lg="3" :xs="6">
				<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col> -->
			<a-col :lg="6" :xs="6">
				<a-select v-model:value="league" @change="leagueChange" class="selectBox">
					<a-select-option v-for="item in leagueList" :key="item.competitionId" :value="item.competitionId">{{ item.competitionName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="0" :xs="6">
				<a-select v-model:value="state" @change="stateChange" class="selectBox">
					<a-select-option v-for="item in stateList" :key="item.value" :value="item.value">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>

		<a-row>
			<a-col :lg="0" :xs="12">
				<a-button @click="showList">
					<template v-slot:icon> <UnorderedListOutlined /> </template>{{ $t('default.87') }}
				</a-button>
			</a-col>
			<a-col :lg="0" :xs="12">
				<a-button @click="showCalendar">
					<template v-slot:icon> <CalendarOutlined /> </template>{{ $t('default.228') }}
				</a-button>
			</a-col>
		</a-row>

		<a-row class="rowSearchBox inPhoneTableDisplay">
			<a-col :span="3">
				<a-button @click="showList">
					<template v-slot:icon> <UnorderedListOutlined /> </template>{{ $t('default.87') }}
				</a-button>
			</a-col>
			<a-col :span="3">
				<a-button @click="showCalendar">
					<template v-slot:icon> <CalendarOutlined /> </template>{{ $t('default.228') }}
				</a-button>
			</a-col>
			<a-col :span="3" :offset="10">
				<a-select v-model:value="state" @change="stateChange" class="selectBox">
					<a-select-option v-for="item in stateList" :key="item.value" :value="item.value">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
			<!-- <a-col :span="3">
				<a-button>
					<template v-slot:icon> <CloudDownloadOutlined /> </template>{{ $t('default.111') }}
				</a-button>
			</a-col> -->
			<!-- <a-col :span="2">
				<a-button>
					<template v-slot:icon> <PrinterOutlined /> </template>{{ $t('default.69') }}
				</a-button>
			</a-col> -->
		</a-row>

		<a-row v-show="isList">
			<a-table class="inPhoneTableDisplay" :columns="columns" :data-source="dataList" :pagination="false" rowKey="id" bordered>
				<template v-slot:type="{ text }">
					<div>{{ text === 1 ? $t('default.63') : $t('default.142') }}</div>
				</template>
				<template v-slot:homeTeam="{ record }">
					<div class="btnClass">
						<div v-if="record.status !== 1">
							<a-button type="link" size="small" @click="entryPage(record.id)">{{ record.homeTeamName }}</a-button>
						</div>
						<div v-else>
							{{ record.homeTeamName }}
						</div>
						<a-button type="link" size="small" @click="showDetail(1, record)">{{ record.homeTeamShopName }}</a-button>
					</div>
				</template>
				<template v-slot:awayTeam="{ record }">
					<div class="btnClass">
						<div v-if="record.status !== 1">
							<a-button type="link" size="small" @click="entryPage(record.id)">{{ record.visitingTeamName }}</a-button>
						</div>
						<div v-else>
							{{ record.visitingTeamName }}
						</div>
						<a-button type="link" size="small" @click="showDetail(2, record)">{{ record.visitingTeamShopName }}</a-button>
					</div>
				</template>
				<template v-slot:status="{ record }">
					<a-button v-if="record.status === 1" type="link" size="small" @click="entryCalendar(record, 1)">{{ $t('default.64') }}</a-button>
					<a-button v-if="record.status === 2" type="link" size="small">{{ $t('default.104') }}</a-button>
					<a-button v-if="record.status === 3" type="link" size="small" @click="entryCalendar(record, 2)">{{ $t('default.244') }}</a-button>
				</template>
			</a-table>
			<a-table class="showPhoneTable" :columns="inPhoneColumns" :data-source="dataList" :pagination="false" rowKey="id" bordered>
				<template v-slot:homeTeam="{ record }">
					<div class="inphoneBtnClass">
						<div v-if="record.status !== 1">
							<a-button type="link" size="small" @click="entryPage(record.id)">{{ record.homeTeamName }}</a-button>
						</div>
						<div v-else>
							{{ record.homeTeamName }}
						</div>
						<a-button type="link" size="small" @click="showDetail(1, record)">{{ record.homeTeamShop }}</a-button>
					</div>
				</template>
				<template v-slot:score="{ record }">
					<div>
						{{ `${record.homeTeamScore} : ${record.visitingTeamScore}` }}
					</div>
				</template>
				<template v-slot:awayTeam="{ record }">
					<div class="inphoneBtnClass">
						<div v-if="record.status !== 1">
							<a-button type="link" size="small" @click="entryPage(record.id)">{{ record.visitingTeamName }}</a-button>
						</div>
						<div v-else>
							{{ record.visitingTeamName }}
						</div>
						<a-button type="link" size="small" @click="showDetail(2, record)">{{ record.visitingTeamShop }}</a-button>
					</div>
				</template>
				<template v-slot:status="{ text }">
					<div v-if="text === 1">{{ $t('default.64') }}</div>
					<a-button v-if="text === 2" type="link" size="small">{{ $t('default.104') }}</a-button>
					<a-button v-if="text === 3" type="link" size="small">{{ $t('default.244') }}</a-button>
				</template>
			</a-table>
			<div class="pagination">
				<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" @change="pageChange" />
			</div>
		</a-row>
		<a-modal v-model:visible="visible" :title="dialogObj.title">
			<template v-slot:footer>
				<a-row class="rowStyle dialogBox">
					<a-col :span="8">
						<div class="imgBox">
							<img :src="dialogObj.img" alt="" />
						</div>
					</a-col>
					<a-col :span="16" class="dialog">
						<div>{{ `${$t('default.28')}：${dialogObj.shopName}` }}</div>
						<div>{{ `${$t('default.89')}：${dialogObj.phone}` }}</div>
						<div>{{ `${$t('default.125')}：${dialogObj.address}` }}</div>
					</a-col>
				</a-row>
				<div class="dialogBtn">
					<a-button type="primary" @click="handleOk">{{ $t('default.25') }}</a-button>
				</div>
			</template>
		</a-modal>
		<a-row v-show="isCalendar">
			<a-calendar @panelChange="calendarlChange" @select="onSelect">
				<template #dateCellRender="{ current: value }">
					<div>
						<div v-for="item in getListData(value)" :key="item.id" class="every" @click="entryPage(item.id)">
							<div class="type">{{ item.type === 1 ? $t('default.63') : $t('default.142') }}</div>
							<div>{{ item.homeTeamName }}</div>
							<div>{{ `${item.homeTeamScore} : ${item.visitingTeamScore}` }}</div>
							<div>{{ item.visitingTeamName }}</div>
						</div>
					</div>
				</template>
			</a-calendar>
		</a-row>
		<entryList :entryPath="entryPath" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import entryList from '@/components/common/entryList.vue';
import { useRoute, useRouter } from 'vue-router';
import { UnorderedListOutlined, CalendarOutlined, SettingFilled } from '@ant-design/icons-vue';
import { timePageSelectListHttp, timePageListHttp, calendarListHttp } from '@/axios/api';
import { yearList } from '@/components/common/public/index';
// interface TableRenderProps {
//   text: string;
//   index: number;
// }
export default defineComponent({
	name: 'calendar',
	components: {
		UnorderedListOutlined,
		CalendarOutlined,
		// CloudDownloadOutlined,
		// PrinterOutlined,
		SettingFilled,
		entryList
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const data = reactive({
			entryPath: '/team',
			pageNum: 1,
			pageSize: 10,
			total: 1,
			colSpan: 5,
			isList: true,
			isCalendar: false,
			visible: false,
			state: '',
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			league: '',
			teamId: ROUTE.query.teamId,
			yearList,
			leagueList: [],
			calendarList: [],
			stateList: [
				{ value: '', label: 'default.246' },
				{ value: 1, label: 'default.64' },
				{ value: 2, label: 'default.104' },
				{ value: 3, label: 'default.244' }
			],
			dialogObj: {
				title: '',
				img: '',
				shopName: '',
				phone: '',
				address: ''
			},
			columns: [
				{
					title: '日期',
					width: 100,
					dataIndex: 'date'
				},
				{
					title: '比赛时间',
					width: 100,
					dataIndex: 'time'
				},
				{
					title: '比赛类型',
					width: 100,
					dataIndex: 'type',
					slots: { customRender: 'type' }
				},
				{
					title: '比赛队伍',
					colSpan: 4,
					dataIndex: 'tel',
					slots: { customRender: 'homeTeam' }
				},
				{
					colSpan: 0,
					width: 50,
					dataIndex: 'homeTeamScore'
				},
				{
					colSpan: 0,
					width: 50,
					dataIndex: 'visitingTeamScore'
				},
				{
					colSpan: 0,
					dataIndex: 'tel',
					slots: { customRender: 'awayTeam' }
				},
				{
					title: '进行状态',
					width: 100,
					dataIndex: 'status',
					slots: { customRender: 'status' }
				}
			],
			inPhoneColumns: [
				{
					title: '日期',
					dataIndex: 'date'
				},
				{
					title: 'Home Team',
					dataIndex: 'key',
					slots: { customRender: 'homeTeam' }
				},
				{
					title: 'VS',
					dataIndex: 'key',
					slots: { customRender: 'score' }
				},
				{
					title: 'Away Team',
					dataIndex: 'key',
					slots: { customRender: 'awayTeam' }
				}
			],
			dataList: [],
			getDate: () => {
				return '2020-10-17';
			},
			showDetail: (type: number, item: any) => {
				if (type === 1) {
					data.dialogObj.title = item.homeTeamName;
					data.dialogObj.img = item.homeTeamImg;
					data.dialogObj.shopName = item.homeTeamShopName;
					data.dialogObj.phone = item.shopPhone;
					data.dialogObj.address = item.shopAddress;
				} else {
					data.dialogObj.title = item.visitingTeamName;
					data.dialogObj.img = item.visitingTeamImg;
					data.dialogObj.shopName = item.visitingTeamShopName;
					data.dialogObj.phone = item.shopPhone;
					data.dialogObj.address = item.shopAddress;
				}
				data.visible = true;
			},
			yearChange: (value: number) => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getSelectList(value);
			},
			handleOk: () => {
				console.log(1);
			},
			stateChange: () => {
				if (data.league) {
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getList();
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getCalendarList();
				}
			},
			showList: () => {
				data.isCalendar = false;
				data.isList = true;
			},
			showCalendar: () => {
				data.isList = false;
				data.isCalendar = true;
			},
			getListData: (value: any) => {
				const year = value.year();
				let month = '0';
				let day = '0';
				let current = '';
				if (value.month() + 1 < 10) {
					month = month + (value.month() + 1);
				} else {
					month = value.month() + 1;
				}
				if (value.date() < 10) {
					day = day + value.date();
				} else {
					day = value.date();
				}
				current = `${year}-${month}-${day}`;
				const list = data.calendarList.filter((i: any) => i.date.split('(')[0] === current);
				return list;
			},
			calendarlChange: (data: any) => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getCalendarList(data._d.getFullYear(), data._d.getMonth() + 1);
			},
			onSelect: (value: string) => {
				console.log(value);
			},
			pageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getList();
			},
			entryCalendar: (row: any, type: number) => {
				ROUTER.push({
					path: 'calendar',
					query: {
						ismatchTablePage: 1,
						activeKey: 2,
						competitionId: data.league,
						divisionId: row.divisionId,
						confrontationInfoId: row.confrontationInfoId,
						isResult: type === 2 ? 1 : 0,
						isMatchTable: type === 1 ? 1 : 0,
						currentKey: type === 1 ? 2 : 1
					}
				});
			},
			Gohistory: () => {
				ROUTER.push({
					path: 'teamIndex',
					query: { ismatchTablePage: 1 }
				});
			},
			leagueChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getList();
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getCalendarList();
			},
			entryPage: (row: any) => {
				console.log(row);
			}
		});
		const getList = () => {
			const obj = {
				competitionId: data.league,
				teamId: data.teamId,
				status: data.state,
				pageIndex: data.pageNum,
				pageSize: data.pageSize
			};
			timePageListHttp(obj).then((res) => {
				data.dataList = res.data.data.list;
				data.total = res.data.data.totalPage;
			});
		};
		const getCalendarList = (year = data.year, month = data.month) => {
			const obj = {
				competitionId: data.league,
				teamId: data.teamId,
				status: data.state,
				year: year,
				month
			};
			calendarListHttp(obj).then((res) => {
				data.calendarList = res.data.data;
			});
		};
		const getSelectList = (year = data.year) => {
			const obj = {
				countryId: sessionStorage.getItem('countryId'),
				teamId: data.teamId,
				year
			};
			timePageSelectListHttp(obj).then((res) => {
				data.leagueList = res.data.data;
				if (data.leagueList.length) {
					data.league = data.leagueList[0]['competitionId'];
					getList();
					getCalendarList();
				} else {
					data.league = '';
				}
			});
		};
		onMounted(() => {
			getSelectList();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.btnClass {
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	text-align: center;
}
.inphoneBtnClass {
	width: 100px;
	overflow: hidden;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	text-align: center;
}
.showPhoneTable {
	display: none;
}
.teamBox {
	text-align: center;
}
.dialogBox {
	height: 100px;
	color: #ff3202;
	border: 1px solid #eee;
}
.imgBox {
	height: 100px;
	width: 100px;
	margin: 0 auto;
}
.imgBox img {
	width: 100%;
	height: 100%;
}
.dialog {
	text-align: left;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.every {
	border: 2px solid #2f2f2f;
	margin: 2px 0;
	text-align: center;
	cursor: pointer;
}
.every:hover {
	border-color: #1890ff;
}
.type {
	color: #2f2f2f;
}
</style>
