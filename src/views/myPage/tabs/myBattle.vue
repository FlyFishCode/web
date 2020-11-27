<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.107') }} </a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="year" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="leagueId" @change="leagueChange" class="selectBox">
					<a-select-option v-for="item in leagueList" :key="item.competitionId" :value="item.competitionId">{{ item.competitionName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="0" :xs="6">
				<a-select v-model:value="status" @change="statusChange" class="selectBox">
					<a-select-option v-for="item in statusList" :key="item.value" :value="item.value">{{ $t(item.label) }}</a-select-option>
				</a-select>
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
				<a-select v-model:value="status" @change="statusChange" class="selectBox">
					<a-select-option v-for="item in statusList" :key="item.value" :value="item.value">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3">
				<a-button>
					<template v-slot:icon> <CloudDownloadOutlined /> </template>{{ $t('default.111') }}
				</a-button>
			</a-col>
			<a-col :span="2">
				<a-button>
					<template v-slot:icon> <PrinterOutlined /> </template>{{ $t('default.69') }}
				</a-button>
			</a-col>
		</a-row>
		<!--  移动端显示 -->
		<a-row class="showPhoneTable">
			<a-col :span="12">
				<a-button @click="showList">
					<template v-slot:icon> <UnorderedListOutlined /> </template>{{ $t('default.87') }}
				</a-button>
			</a-col>
			<a-col :span="12">
				<a-button @click="showCalendar">
					<template v-slot:icon> <CalendarOutlined /> </template>{{ $t('default.228') }}
				</a-button>
			</a-col>
		</a-row>

		<a-row v-show="isList">
			<a-table class="inPhoneTableDisplay" :columns="columns" :data-source="dataList" :pagination="false" bordered>
				<template v-slot:home="{ text }">
					<a-button type="link" size="small">{{ text }}</a-button>
				</template>
				<template v-slot:type="{ text }">
					<div v-if="text === 1">{{ $t('default.63') }}</div>
					<div v-if="text === 2">{{ $t('default.142') }}</div>
				</template>
				<template v-slot:away="{ text }">
					<a-button type="link" size="small">{{ text }}</a-button>
				</template>
				<template v-slot:status="{ text }">
					<div class="stateBox">
						<div v-if="text === 1" class="inPlay" @click="goPlay">{{ $t('default.64') }}</div>
						<div v-if="text === 2">{{ $t('default.104') }}</div>
						<div v-if="text === 3">{{ $t('default.244') }}</div>
					</div>
				</template>
			</a-table>
			<a-table class="showPhoneTable" :columns="inPhoneColumns" :data-source="dataList" :pagination="false" bordered>
				<template v-slot:home="{ text }">
					<a-button type="link" size="small">{{ text }}</a-button>
				</template>
				<template v-slot:type="{ text }">
					<div v-if="text === 1">{{ $t('default.63') }}</div>
					<div v-if="text === 2">{{ $t('default.142') }}</div>
				</template>
				<template v-slot:away="{ text }">
					<a-button type="link" size="small">{{ text }}</a-button>
				</template>
				<template v-slot:status="{ text }">
					<div class="stateBox">
						<div v-if="text === 1" class="inPlay" @click="goPlay">{{ $t('default.64') }}</div>
						<div v-if="text === 2">{{ $t('default.104') }}</div>
						<div v-if="text === 3">{{ $t('default.244') }}</div>
					</div>
				</template>
			</a-table>
		</a-row>

		<a-row v-show="isCalendar">
			<a-calendar v-model:value="calendarValue" @panelChange="calendarlChange" @select="onSelect">
				<template #dateCellRender="{ current: value }">
					<div>
						<div v-for="item in getListData(value)" :key="item.id" class="every" @click="entryPage">
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
import { useRouter } from 'vue-router';
import { myBattleSelectHttp, myBattleDataListHttp, myBattleDateListHttp } from '@/axios/api';
import { UnorderedListOutlined, CalendarOutlined, CloudDownloadOutlined, PrinterOutlined, SettingFilled } from '@ant-design/icons-vue';
// interface TableRenderProps {
//   text: string;
//   index: number;
// }
export default defineComponent({
	name: 'myBattle',
	components: {
		UnorderedListOutlined,
		CalendarOutlined,
		CloudDownloadOutlined,
		PrinterOutlined,
		SettingFilled,
		entryList
	},
	setup() {
		const ROUTER = useRouter();
		const memberId = Number(sessionStorage.getItem('userId'));
		// let num = 0;
		// const getMergeRowNum = (colName: any, dataList: any, data: any) => {
		//   const temp: any = {};
		//   let n = 0;
		//   if (colName !== temp[colName]) {
		//     temp[colName] = data;
		//     // eslint-disable-next-line @typescript-eslint/no-use-before-define
		//     dataList.forEach((i: any) => {
		//       if (i.date === temp.date) {
		//         console.log(i.date, temp.date);
		//         n += 1;
		//       }
		//     });
		//   } else {
		//     n += 1;
		//   }
		//   // num = n;
		//   return n;
		// };
		const data = reactive({
			entryPath: '/myPage',
			colSpan: 5,
			isList: true,
			isCalendar: false,
			calendarValue: '',
			matchType: 2020,
			year: 2020,
			month: new Date().getMonth() + 1,
			leagueId: null,
			status: '',
			leagueList: [],
			statusList: [
				{ value: '', label: 'default.246' },
				{ value: 1, label: 'default.64' },
				{ value: 2, label: 'default.104' },
				{ value: 3, label: 'default.244' }
			],
			matchTypeList: [{ value: 2020, label: '2020' }],
			dataList: [],
			dateList: [],
			getListData: (value: any) => {
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
				current = `${month}-${day}`;
				const list = data.dateList.filter((i: any) => i.date === current);
				return list;
			},
			columns: [
				{
					title: '日期',
					width: 100,
					dataIndex: 'date'
					// customRender: (row: any) => {
					//   const obj: any = {
					//     children: row.text,
					//     props: {}
					//   };
					//   if (row.index) {
					//     debugger
					//     if (row.text == data.dataList[row.index - 1]["date"]) {
					//       obj.props.rowSpan = getMergeRowNum(
					//         "date",
					//         data.dataList,
					//         row.text
					//       );
					//     } else {
					//       // if(num){
					//       //   new Array(num).fill(num).forEach((i,index) =>{
					//       //     row.index + index
					//       //   });
					//       // }
					//     }
					//   } else {
					//     obj.props.rowSpan = 1;
					//   }
					//   return obj;
					// }
				},
				{
					title: '对战类型',
					width: 80,
					dataIndex: 'type',
					slots: { customRender: 'type' }
				},
				{
					title: 'HOME TEAM',
					children: [
						{
							title: '队名',
							width: 100,
							dataIndex: 'homeTeamName',
							slots: { customRender: 'home' }
						},
						{ title: 'Score', width: 100, dataIndex: 'homeTeamScore' }
					]
				},
				{
					title: 'AWAY TEAM',
					children: [
						{ title: 'Score', width: 100, dataIndex: 'visitingTeamScore' },
						{
							title: '队名',
							width: 100,
							dataIndex: 'visitingTeamName',
							slots: { customRender: 'away' }
						}
					]
				},
				{
					title: '状态',
					width: 100,
					dataIndex: 'status',
					slots: { customRender: 'status' }
				},
				{
					title: '移动',
					width: 50
				}
			],
			inPhoneColumns: [
				{
					title: '日期',
					width: 80,
					dataIndex: 'date'
				},
				{
					title: 'HOME TEAM',
					width: 190,
					dataIndex: 'homeTeamName',
					slots: { customRender: 'home' }
				},
				{
					title: 'VS',
					width: 60,
					dataIndex: 'homeTeamName'
				},
				{
					title: 'AWAY TEAM',
					width: 180,
					dataIndex: 'visitingTeamName',
					slots: { customRender: 'away' }
				}
			],
			getDate: () => {
				return '2020-10-17';
			},
			handleMenuClick: () => {
				console.log(11);
			},
			showList: () => {
				data.isCalendar = false;
				data.isList = true;
			},
			showCalendar: () => {
				data.isList = false;
				data.isCalendar = true;
			},
			calendarlChange: (date: any) => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getCalendarList(date._d.getFullYear(), date._d.getMonth() + 1);
			},
			onSelect: (value: string) => {
				console.log(value);
			},
			Gohistory: () => {
				ROUTER.push('/teamIndex');
			},
			goPlay: () => {
				ROUTER.push('/teamIndex');
			},
			matchTypeChange: (value: number) => {
				console.log(value);
			},
			entryPage: () => {
				ROUTER.push({
					path: 'calendar',
					query: { ismatchTablePage: 1 }
				});
			},
			statusChange: (value: any) => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDataList(data.leagueId, memberId, value);
			},
			leagueChange: (value: any) => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDataList(value, memberId, data.status);
			}
		});
		const getSelectList = () => {
			const obj = {
				memberId,
				countryId: sessionStorage.getItem('countryId'),
				year: data.year
			};
			myBattleSelectHttp(obj).then((res) => {
				if (res.data.data.length) {
					data.leagueList = res.data.data;
				}
			});
		};
		const getDataList = (competitionId = data.leagueId, memberId: any, status = data.status) => {
			const obj = {
				competitionId,
				memberId: memberId,
				status,
				pageIndex: 1,
				pageSize: 10
			};
			myBattleDataListHttp(obj).then((res) => {
				res.data.data.list.forEach((i: any, index: number) => {
					i.key = index;
				});
				data.dataList = res.data.data.list;
			});
		};
		const getCalendarList = (year = data.year, month = data.month) => {
			const obj = {
				competitionId: data.leagueId,
				status: data.status,
				year: year,
				month: month
			};
			myBattleDateListHttp(obj).then((res) => {
				data.dateList = res.data.data;
			});
		};
		onMounted(() => {
			getSelectList();
			getDataList(data.leagueId, memberId, data.status);
			getCalendarList();
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
}
.stateBox {
	text-align: center;
}
.inPlay {
	background: red;
	border-radius: 10px;
	color: #fff;
	cursor: pointer;
}
.tableBox {
	display: flex;
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
