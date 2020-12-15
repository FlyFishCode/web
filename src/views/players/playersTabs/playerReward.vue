<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="smallTitle"> <SettingFilled /> {{ `${title}` }} </a-col>
		</a-row>
		<a-row>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="year" @change="yearChange" class="selectBox">
					<a-select-option v-for="item in yearList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :span="3" :xs="0">
				<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-table :columns="columns" :scroll="{ x: 600 }" :data-source="dataList" bordered rowKey="lowTon" :pagination="false">
			<template v-slot:index="{ index }">
				<div>{{ `${index + 1}` }}</div>
			</template>
		</a-table>
		<entryList :entryPath="entryPath" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { plauerRewardListHttp } from '@/axios/api';
import entryList from '@/components/common/entryList.vue';
import { SettingFilled } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
	name: 'playerReward',
	components: {
		SettingFilled,
		entryList
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const data = reactive({
			entryPath: '/players',
			title: '玩家奖励',
			year: 2020,
			matchType: 2020,
			yearList: [{ value: 2020, label: '2020' }],
			matchTypeList: [{ value: 2020, label: '2020' }],
			columns: [
				{
					title: 'MONTH',
					align: 'center',
					dataIndex: 'age',
					fixed: 'left',
					slots: { customRender: 'index' }
				},
				{
					title: 'LT',
					dataIndex: 'lowTon',
					key: 'address',
					width: 80
				},
				{
					title: 'HAT',
					dataIndex: 'hatTrick',
					key: 'address',
					width: 80
				},
				{
					title: 'HT',
					dataIndex: 'highTon',
					key: 'address',
					width: 80
				},
				{
					title: 'HT.OFF',
					dataIndex: 'highTonOut',
					key: 'address',
					width: 100
				},
				{
					title: 'LT.OFF',
					dataIndex: 'lowTonOut',
					key: 'address',
					width: 100
				},
				{
					title: 'BED',
					dataIndex: 'threeInBed',
					key: 'address',
					width: 80
				},
				{
					title: '180',
					dataIndex: 'ton80',
					key: 'address',
					width: 80
				},
				{
					title: 'LT',
					dataIndex: 'lowTon',
					key: 'address',
					width: 60
				},
				{
					title: 'EYE',
					dataIndex: 'threeInBlack',
					key: 'address',
					width: 80
				},
				{
					title: '5M',
					dataIndex: 'fiveMarks',
					key: 'address',
					width: 60
				},
				{
					title: '6M',
					dataIndex: 'sixMarks',
					key: 'address',
					width: 60
				},
				{
					title: '7M',
					dataIndex: 'sevenMarks',
					key: 'address',
					width: 60
				},
				{
					title: '8M',
					dataIndex: 'eightMarks',
					key: 'address',
					width: 60
				},
				{
					title: '9M',
					dataIndex: 'nineMarks',
					key: 'address',
					width: 60
				},
				{
					title: 'WH',
					dataIndex: 'whiteHorse',
					key: 'address',
					width: 60
				}
			],
			dataList: [],
			yearChange: (value: number) => {
				console.log(value);
			},
			matchTypeChange: (value: number) => {
				console.log(value);
			},
			goHistory: () => {
				ROUTER.push('/players');
			}
		});
		const getList = () => {
			const obj = {
				year: data.year,
				playerId: ROUTE.query.playerId
			};
			plauerRewardListHttp(obj).then((res) => {
				data.dataList = res.data.data;
			});
		};
		onMounted(() => {
			getList();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped></style>
