<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.231') }} </a-col>
		</a-row>
		<a-row class="rowStyle">
			<a-col :lg="3" :xs="12">
				<a-select v-model:value="year" @change="yearChange" class="selectBox">
					<a-select-option v-for="item in yearList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<!-- <a-col :lg="3" :xs="12">
				<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col> -->
		</a-row>

		<a-row class="inPhoneTableDisplay">
			<a-table :columns="columns" :data-source="tableList" :pagination="false" rowKey="competitionId" :scroll="{ x: 1200 }" bordered>
				<template #action="{ record }">
					<!-- <u class="tableMatch" @click="showMatchInfo(record)">{{ record.competitionName }}</u> -->
					{{ record.competitionName }}
				</template>
			</a-table>
		</a-row>
		<a-row class="showPhoneTable">
			<a-table :columns="inPhoneColumns" :data-source="tableList" :pagination="false" rowKey="competitionId" :scroll="{ x: 1200 }" bordered>
				<template #action="{ record }">
					<!-- <u class="tableMatch" @click="showMatchInfo(record)">{{ record.competitionName }}</u> -->
					{{ record.competitionName }}
				</template>
			</a-table>
		</a-row>
		<div class="pagination">
			<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" @change="pageChange" />
		</div>
		<entryList :entryPath="entryPath" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { historyResultHttp } from '@/axios/api';
import entryList from '@/components/common/entryList.vue';
import { SettingFilled } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { yearList } from '@/components/common/public/index';
export default defineComponent({
	name: 'beforeResult',
	components: {
		SettingFilled,
		entryList
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const data = reactive({
			entryPath: '/team',
			year: new Date().getFullYear(),
			pageNum: 1,
			pageSize: 10,
			total: 1,
			yearList,
			inPhoneColumns: [
				{
					title: '年',
					dataIndex: 'year',
					key: 1
				},
				{
					title: '比赛',
					dataIndex: 'competitionName',
					key: 2,
					slots: { customRender: 'action' }
				},
				{
					title: '排行',
					dataIndex: 'address',
					key: 3
				}
			],
			columns: [
				{
					title: '年',
					width: 80,
					dataIndex: 'year',
					key: 1,
					fixed: 'left'
				},
				{
					title: '比赛',
					dataIndex: 'competitionName',
					width: 200,
					key: 2,
					fixed: 'left',
					slots: { customRender: 'action' }
				},
				{
					title: '排行',
					dataIndex: 'address',
					key: 3,
					width: 65
				},
				{
					title: '队伍',
					dataIndex: 'address',
					key: 4,
					children: [
						{ title: 'Rating', dataIndex: 'teamRating.ranking', key: 9, width: 90 },
						{ title: 'PPD', dataIndex: 'teamRating.ppd', key: 10, width: 75 },
						{ title: 'MPR', dataIndex: 'teamRating.mpr', key: 11, width: 75 }
					]
				},
				{
					title: '总积分',
					dataIndex: 'address',
					key: 5,
					width: 90
				},
				{
					title: 'Match',
					dataIndex: 'address',
					key: 6,
					children: [
						{ title: '胜', dataIndex: 'matchResult.wins', key: 12, width: 40 },
						{ title: '败', dataIndex: 'matchResult.losses', key: 13, width: 40 },
						{ title: '和', dataIndex: 'matchResult.draws', key: 14, width: 40 },
						{ title: '胜率', dataIndex: 'matchResult.winProbability', key: 15, width: 100 }
					]
				},
				{
					title: 'Set',
					dataIndex: 'address',
					key: 7,
					children: [
						{ title: '胜', dataIndex: 'setResult.wins', key: '2', width: 40 },
						{ title: '败', dataIndex: 'setResult.losses', key: '2', width: 40 },
						{ title: '和', dataIndex: 'setResult.draws', key: '2', width: 40 },
						{ title: '胜率', dataIndex: 'setResult.winProbability', key: '2', width: 100 }
					]
				},
				{
					title: '罚分',
					dataIndex: 'address',
					key: 8,
					width: 65
				}
			],
			tableList: [],
			handleMenuClick: () => {
				console.log(1);
			},
			Gohistory: () => {
				ROUTER.push('/teamIndex');
			},
			showMatchInfo: (row: any) => {
				// 需要 divisitionId
				ROUTER.push({
					path: '/calendar',
					query: {
						// teamId: row.teamId,
						// divisionId: row.divisionId,
						competitionId: row.competitionId
						// confrontationInfoId: row.confrontationInfoId
					}
				});
			},
			yearChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getList();
			},
			pageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getList();
			}
		});
		const getList = () => {
			const obj = {
				year: data.year,
				teamId: ROUTE.query.teamId,
				pageIndex: data.pageNum,
				pageSize: data.pageSize
			};
			historyResultHttp(obj).then((res) => {
				data.tableList = res.data.data.list;
				data.total = res.data.data.totalPage;
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

<style scoped>
.tableMatch {
	cursor: pointer;
	color: #1890ff;
}
</style>
