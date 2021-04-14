<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="centerFont inPhoneTableDisplay"> <SettingFilled /> {{ $t('default.109') }} </a-col>
		</a-row>
		<a-row class="inPhoneTableDisplay">
			<a-table :columns="columns" :data-source="tableList" :pagination="false" rowKey="rating" bordered>
				<template v-slot:count="{ record }">
					<div class="countBox">
						<div>{{ record.count }}</div>
						<a-button type="danger" size="small" @click="showInfo(record.key)">{{ $t('default.166') }}</a-button>
					</div>
				</template>
			</a-table>
		</a-row>

		<a-row class="inPhoneTableDisplay">
			<a-col :span="14" class="centerFont"> <SettingFilled /> {{ $t('default.96') }} </a-col>
		</a-row>
		<a-row class="rowStyle inPhoneTableDisplay">
			<a-col :span="3">
				<a-select v-model:value="year" class="selectBox" @change="yearChange">
					<a-select-option v-for="year in yearList" :key="year.value" :value="year.value">{{ year.label }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="inPhoneTableDisplay">
			<a-table :columns="levelColumns" :data-source="levelTableList" :pagination="false" rowKey="month" bordered>
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

		<a-row class="showPhoneTable">
			<a-col :span="6">
				<a-select v-model:value="year" @change="yearChange" class="selectBox">
					<a-select-option v-for="item in yearList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<div class="showPhoneTable">
			<a-row v-for="item in inPhoneList" class="inPhoneRow" :key="item.index" type="flex" justify="space-around" align="middle">
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
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { SettingFilled } from '@ant-design/icons-vue';
import { playerInfoHttp } from '@/axios/api';
import { yearList } from '@/components/common/public/index';
export default defineComponent({
	name: 'myLevel',
	components: {
		SettingFilled
	},
	setup() {
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
					data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: '累计',
						type: 'line',
						data: obj.monthRating
					},
					{
						name: '周期',
						type: 'line',
						data: obj.totalRating
					}
				]
			});
		};
		const data = reactive({
			year: new Date().getFullYear(),
			yearList,
			echarsList: {
				monthRating: [],
				totalRating: []
			},
			inPhoneList: [
				{ title: 'League Rating', Rating: 12, PPD: 52, MRP: 29 },
				{ title: 'Adarts Rating', Rating: 62, PPD: 49, MRP: 5 }
			],
			columns: [
				{
					title: '比赛类型',
					dataIndex: 'league'
				},
				{
					title: 'RATING',
					dataIndex: 'rating'
				},
				{
					title: 'PPD',
					dataIndex: 'ppd'
				},
				{
					title: 'MPR',
					dataIndex: 'mpr'
				},
				{
					title: '已參加比賽',
					dataIndex: 'count',
					slots: { customRender: 'count' }
				}
			],
			levelColumns: [
				{
					title: 'DIVISION',
					dataIndex: 'month'
				},
				{
					title: '月度总积分',
					dataIndex: 'money',
					children: [
						{
							title: 'RATING',
							dataIndex: 'monthPlayerRating.rating'
						},
						{
							title: 'PPD',
							dataIndex: 'monthPlayerRating.ppd'
						},
						{
							title: 'MPR',
							dataIndex: 'monthPlayerRating.mpr'
						}
					]
				},
				{
					title: '累计总积分',
					dataIndex: 'address',
					children: [
						{
							title: 'RATING',
							dataIndex: 'totalPlayerRating.rating'
						},
						{
							title: 'PPD',
							dataIndex: 'totalPlayerRating.ppd'
						},
						{
							title: 'MPR',
							dataIndex: 'totalPlayerRating.mpr'
						}
					]
				}
			],
			levelTableList: [{ month: 0 }],
			tableList: [{ rating: 0 }],
			yearChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDataInfo();
			},
			showInfo: (key: number) => {
				console.log(key);
			}
		});
		const getDataInfo = () => {
			const obj = {
				playerId: sessionStorage.getItem('userId'),
				year: data.year
			};
			playerInfoHttp(obj).then((res) => {
				const dataObj = res.data.data;
				const obj = {
					league: 'League',
					rating: dataObj.playerRating.rating,
					ppd: dataObj.playerRating.ppd,
					mpr: dataObj.playerRating.mpr,
					count: dataObj.competitionCount
				};
				data.tableList = [obj];
				dataObj.ratingPeridoList.forEach((i: any) => {
					if (!i.monthPlayerRating) {
						i.monthPlayerRating = {
							rating: '-',
							ppd: '-',
							mpr: '-'
						};
					}
					if (!i.totalPlayerRating) {
						i.totalPlayerRating = {
							rating: '-',
							ppd: '-',
							mpr: '-'
						};
					}
				});
				data.levelTableList = dataObj.ratingPeridoList;
				data.echarsList.monthRating = dataObj.monthRating;
				data.echarsList.totalRating = dataObj.totalRating;
				echarsInit(data.echarsList);
			});
		};
		onMounted(() => {
			getDataInfo();
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
.countBox {
	display: flex;
	justify-content: space-around;
}
</style>
