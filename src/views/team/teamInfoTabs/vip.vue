<template>
	<div class="content">
		<a-row>
			<a-col :span="11" class="centerFont"> <SettingFilled /> {{ $t('default.227') }} </a-col>
			<a-col :lg="4" :xs="0" class="sortColBox">
				<div>
					<a-button type="link" @click="changeIcon('general')">
						{{ 'General Rating' }}
						<span v-if="general">
							<DownOutlined />
						</span>
						<span v-else>
							<UpOutlined />
						</span>
					</a-button>
				</div>
			</a-col>
			<a-col :lg="4" :xs="0" class="sortColBox">
				<div>
					<a-button type="link" @click="changeIcon('league')">
						{{ 'League Rating' }}
						<span v-if="league">
							<DownOutlined />
						</span>
						<span v-else>
							<UpOutlined />
						</span>
					</a-button>
				</div>
			</a-col>
			<a-col :lg="5" :xs="0" class="sortColBox">
				<div>
					<a-button type="link" @click="changeIcon('quarter')">
						{{ 'League Rating (Quarter)' }}
						<span v-if="quarter">
							<DownOutlined />
						</span>
						<span v-else>
							<UpOutlined />
						</span>
					</a-button>
				</div>
			</a-col>
		</a-row>
		<a-row class="inPhoneTableDisplay">
			<a-table :columns="columns" :data-source="tableList" :pagination="false" rowkey="playerId" bordered>
				<template #player="{ record }">
					<div class="inPhoneTableBox">
						<div class="imgBox">
							<img :src="record.playerImg" alt="" />
						</div>
						<div class="tableMatch" @click="entryPage(1, record.playerId)">{{ record.playerName }}</div>
					</div>
				</template>
				<template #gender="{ text }">
					<div>{{ text ? $t('default.264') : $t('default.265') }}</div>
				</template>
			</a-table>
		</a-row>
		<a-row class="showPhoneTable">
			<a-table :columns="inPhoneColumns" :scroll="{ x: 600 }" :data-source="tableList" rowkey="playerId" :pagination="false" bordered>
				<template #index="{ index }">
					<div>{{ index + 1 }}</div>
				</template>
				<template #player="{ record }">
					<div class="inPhoneTableBox">
						<div class="imgBox">
							<img :src="record.playerImg" alt="" />
						</div>
						<div class="tableMatch" @click="entryPage(1, record.playerId)">{{ record.playerName }}</div>
					</div>
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
import { vipListHttp } from '@/axios/api';
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import entryList from '@/components/common/entryList.vue';
import { SettingFilled, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
interface DataProps {
	[x: string]: any;
	general: boolean;
	league: boolean;
	quarter: boolean;
}
export default defineComponent({
	name: 'vip',
	components: {
		SettingFilled,
		entryList,
		DownOutlined,
		UpOutlined
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const data: DataProps = reactive({
			pageNum: 1,
			pageSize: 10,
			total: 1,
			sort: 1,
			entryPath: '/team',
			general: true,
			league: true,
			quarter: true,
			columns: [
				{
					title: '玩家',
					width: 100,
					dataIndex: 'playerName',
					slots: { customRender: 'player' }
				},
				{
					title: '性别',
					dataIndex: 'gender',
					width: 10,
					slots: { customRender: 'gender' }
				},
				{
					title: '主店',
					dataIndex: 'shop.shopName',
					key: '2',
					width: 10
				},
				{
					title: 'General Rating',
					dataIndex: 'address',
					key: '3',
					children: [
						{ title: 'Rating', dataIndex: 'generalRating.rating', key: '2', width: 60 },
						{ title: 'PPD', dataIndex: 'generalRating.ppd', key: '2', width: 50 },
						{ title: 'MPR', dataIndex: 'generalRating.mpr', key: '2', width: 50 }
					]
				},
				{
					title: 'League Rating',
					dataIndex: 'address',
					key: '3',
					children: [
						{ title: 'Rating', dataIndex: 'playerRating.rating', key: '2', width: 60 },
						{ title: 'PPD', dataIndex: 'playerRating.ppd', key: '2', width: 50 },
						{ title: 'MPR', dataIndex: 'playerRating.mpr', key: '2', width: 50 }
					]
				},
				{
					title: 'League Rating ( 4Q )',
					dataIndex: 'address',
					key: '5',
					children: [
						{ title: 'Rating', dataIndex: 'quaterCompetitionRating.rating', key: '2', width: 30 },
						{ title: 'PPD', dataIndex: 'quaterCompetitionRating.ppd', key: '2', width: 30 },
						{ title: 'MPR', dataIndex: 'quaterCompetitionRating.mpr', key: '2', width: 30 }
					]
				}
			],
			inPhoneColumns: [
				{
					title: 'NO',
					width: 55,
					key: 'name',
					fixed: 'left',
					slots: { customRender: 'index' }
				},
				{
					title: '玩家',
					width: 130,
					fixed: 'left',
					dataIndex: 'playerName',
					key: 'name',
					slots: { customRender: 'player' }
				},
				{
					title: 'General Rating',
					dataIndex: 'name',
					key: 'name',
					children: [
						{
							title: 'Rating',
							width: 80,
							dataIndex: 'generalRating.rating',
							key: 'name'
						},
						{
							title: 'PPD',
							width: 80,
							dataIndex: 'generalRating.ppd',
							key: 'name'
						},
						{
							title: 'MPR',
							width: 80,
							dataIndex: 'generalRating.mpr',
							key: 'name'
						}
					]
				},
				{
					title: 'League Rating',
					dataIndex: 'name',
					key: 'name',
					children: [
						{
							title: 'Rating',
							width: 80,
							dataIndex: 'competitionRating.rating',
							key: 'name'
						},
						{
							title: 'PPD',
							width: 80,
							dataIndex: 'competitionRating.ppd',
							key: 'name'
						},
						{
							title: 'MPR',
							width: 80,
							dataIndex: 'competitionRating.mpr',
							key: 'name'
						}
					]
				},
				{
					title: 'League Rating ( 4Q )',
					dataIndex: 'name',
					key: 'name',
					children: [
						{
							title: 'Rating',
							width: 80,
							dataIndex: 'quaterCompetitionRating.rating',
							key: 'name'
						},
						{
							title: 'PPD',
							width: 80,
							dataIndex: 'quaterCompetitionRating.ppd',
							key: 'name'
						},
						{
							title: 'MPR',
							width: 80,
							dataIndex: 'quaterCompetitionRating.mpr',
							key: 'name'
						}
					]
				}
			],
			tableList: [],
			changeIcon: (type: keyof DataProps) => {
				data[type] = !data[type];
				if (type === 'general' && data[type]) {
					data.sort = 1;
				} else if (type === 'general' && !data[type]) {
					data.sort = 2;
				} else if (type === 'league' && data[type]) {
					data.sort = 3;
				} else if (type === 'league' && !data[type]) {
					data.sort = 4;
				} else if (type === 'quarter' && data[type]) {
					data.sort = 5;
				} else {
					data.sort = 6;
				}
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDataList();
			},
			handleMenuClick: () => {
				console.log(1);
			},
			Gohistory: () => {
				ROUTER.push('/teamIndex');
			},
			entryPage: (type: number, playerId: number) => {
				ROUTER.push({
					path: '/playerInfo',
					query: {
						activeKey: type,
						playerId
					}
				});
			},
			pageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDataList();
			}
		});
		const getDataList = () => {
			const obj = {
				teamId: ROUTE.query.teamId,
				sort: data.sort,
				pageIndex: data.pageNum,
				pageSize: data.pageSize
			};
			vipListHttp(obj).then((res) => {
				if (res.data.data) {
					data.tableList = res.data.data.list;
					data.total = res.data.data.totalPage;
				} else {
					message.error(res.data.msg);
				}
			});
		};
		onMounted(() => {
			getDataList();
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
.inPhoneTableBox {
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.imgBox {
	height: 50px;
	width: 50px;
}
.imgBox img {
	width: 100%;
}
</style>
