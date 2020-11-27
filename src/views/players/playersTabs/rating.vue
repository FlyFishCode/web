<template>
	<div class="content">
		<a-row>
			<a-col :lg="3" :xs="0" class="centerFont"> <SettingFilled /> {{ $t('default.254') }} </a-col>
		</a-row>
		<a-row>
			<a-col :lg="5" :xs="12" class="smallTitle"> <SettingFilled /> {{ $t('default.95') }} </a-col>
		</a-row>
		<a-row class="inPhoneTableDisplay">
			<a-table :columns="columns" :data-source="tableList" :pagination="false" bordered>
				<template v-slot:level="{ record }">
					<div class="btnBox">
						<a-button type="danger" size="small" @click="showInfo(record.key)">{{ $t('default.166') }}</a-button>
					</div>
				</template>
			</a-table>
		</a-row>

		<a-row class="inPhoneTableDisplay">
			<a-col :span="5" class="smallTitle"> <SettingFilled /> {{ $t('default.96') }} </a-col>
		</a-row>
		<a-row class="rowStyle inPhoneTableDisplay">
			<a-col :span="3" class="dropdown">
				<a-select v-model:value="year" class="selectBox" @change="yearChange">
					<a-select-option v-for="yaer in yearLiat" :key="yaer.value" :value="yaer.value">{{ yaer.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" class="dropdown">
				<a-select v-model:value="year" class="selectBox" @change="leagueChange">
					<a-select-option v-for="yaer in yearLiat" :key="yaer.value" :value="yaer.value">{{ yaer.label }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="inPhoneTableDisplay">
			<a-table :columns="levelColumns" :data-source="levelTableList" :pagination="false" bordered>
				<template v-slot:level="{ record }">
					<div class="btnBox">
						<a-button type="danger" size="small" @click="showInfo(record.key)">{{ $t('default.166') }}</a-button>
					</div>
				</template>
			</a-table>
		</a-row>

		<a-row class="rowStyle inPhoneTableDisplay">
			<div id="myEchars"></div>
		</a-row>

		<div class="showPhoneTable">
			<a-row v-for="item in inPhoneList" :key="item.index" type="flex" justify="space-around" align="middle" class="inPhoneRow">
				<a-col :span="8">{{ item.title }}</a-col>
				<a-col :span="16" class="contentBox">
					<a-col :span="8" class="scoreBox">
						<div>{{ 'Rating' }}</div>
						<div>{{ 'PPD' }}</div>
						<div>{{ 'MRP' }}</div>
					</a-col>
					<a-col :span="16">
						<a-progress :percent="item.Rating" />
						<a-progress :percent="item.PPD" />
						<a-progress :percent="item.MRP" />
					</a-col>
				</a-col>
			</a-row>
		</div>

		<entryList :entryPath="entryPath" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import entryList from '@/components/common/entryList.vue';
import { SettingFilled } from '@ant-design/icons-vue';
import Axios from 'axios';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'rating',
	components: {
		SettingFilled,
		entryList
	},
	setup() {
		const Router = useRouter();
		const echarsInit = (obj: { [key: string]: number[] }) => {
			const Echars = require('echarts');
			const myChart = Echars.init(document.getElementById('myEchars'));
			myChart.setOption({
				title: {
					text: '各周期的等级变化'
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					right: 20,
					data: ['累计', '周期']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '累计',
						type: 'line',
						data: obj.addUp
					},
					{
						name: '周期',
						type: 'line',
						data: obj.cycle
					}
				]
			});
		};
		const data = reactive({
			entryPath: '/players',
			year: 2000,
			yearLiat: [
				{ value: 1998, label: 1998 },
				{ value: 1999, label: 1999 },
				{ value: 2000, label: 2000 },
				{ value: 2001, label: 2001 }
			],
			inPhoneList: [
				{ title: 'League Rating', Rating: 12, PPD: 52, MRP: 29 },
				{ title: 'Adarts Rating', Rating: 62, PPD: 49, MRP: 5 }
			],
			echarsList: {
				addUp: [1, 35, 5, 64, 23, 76, 23, 98, 123, 56, 121, 21],
				cycle: [23, 43, 54, 56, 78, 12, 98, 45, 27, 84, 15, 63]
			},
			columns: [
				{
					title: '比赛类型',
					dataIndex: 'name'
				},
				{
					title: 'RATING',
					className: 'column-money',
					dataIndex: 'money'
				},
				{
					title: 'PPD',
					dataIndex: 'address'
				},
				{
					title: 'MPR',
					dataIndex: 'address'
				},
				{
					title: '根据周期评定之等级',
					dataIndex: 'address',
					slots: { customRender: 'level' },
					width: 200
				},
				{
					title: '已參加比賽',
					colSpan: 2,
					dataIndex: 'key'
				},
				{
					colSpan: 0,
					dataIndex: 'address'
				}
			],
			levelColumns: [
				{
					title: 'DIVISION',
					dataIndex: 'name'
				},
				{
					title: '月度总积分',
					dataIndex: 'money',
					children: [
						{
							title: 'RATING',
							dataIndex: 'name'
						},
						{
							title: 'PPD',
							dataIndex: 'name'
						},
						{
							title: 'MPR',
							dataIndex: 'name'
						}
					]
				},
				{
					title: '累计总积分',
					dataIndex: 'address',
					children: [
						{
							title: 'RATING',
							dataIndex: 'name'
						},
						{
							title: 'PPD',
							dataIndex: 'name'
						},
						{
							title: 'MPR',
							dataIndex: 'name'
						}
					]
				}
			],
			levelTableList: [
				{
					key: '1',
					name: 'John Brown',
					money: '￥300,000.00',
					address: 'New York No. 1 Lake Park'
				},
				{
					key: '2',
					name: 'Jim Green',
					money: '￥1,256,000.00',
					address: 'London No. 1 Lake Park'
				},
				{
					key: '3',
					name: 'Joe Black',
					money: '￥120,000.00',
					address: 'Sidney No. 1 Lake Park'
				}
			],
			tableList: [
				{
					key: '1',
					name: 'John Brown',
					money: '￥300,000.00',
					address: 'New York No. 1 Lake Park'
				},
				{
					key: '2',
					name: 'Jim Green',
					money: '￥1,256,000.00',
					address: 'London No. 1 Lake Park'
				},
				{
					key: '3',
					name: 'Joe Black',
					money: '￥120,000.00',
					address: 'Sidney No. 1 Lake Park'
				}
			],
			yearChange: (value: number) => {
				console.log(value);
			},
			leagueChange: (value: number) => {
				console.log(value);
			},
			showInfo: (key: number) => {
				console.log(key);
			},
			goHistory: () => {
				Router.push('/players');
			}
		});
		onMounted(() => {
			const list: { [key: string]: string } = {
				type: 'a'
			};
			Axios.post('/aaaaaaaaaaaaaaaaaaaaa', list).then((res) => {
				console.log(res);
			});
			echarsInit(data.echarsList);
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.btnBox {
	text-align: center;
}
#myEchars {
	height: 300px;
}
.showPhoneTable {
	display: none;
}
.inPhoneRow {
	margin: 5px 0;
	border: 1px solid #999;
	border-radius: 10px;
}
.contentBox {
	border-left: 1px solid #999;
}
.scoreBox {
	padding: 0 10px;
}
</style>
