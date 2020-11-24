<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.227') }} </a-col>
		</a-row>
		<a-row class="inPhoneTableDisplay">
			<a-table :columns="columns" :data-source="tableList" :pagination="false" bordered>
				<template #action="{ text,record }">
					<u class="tableMatch" @click="entryPage(1, record.age)">{{ text }}</u>
				</template>
			</a-table>
		</a-row>
		<a-row class="showPhoneTable">
			<a-table :columns="inPhoneColumns" :scroll="{ x: 600 }" :data-source="tableList" :pagination="false" bordered>
				<template #index="{ index }">
					<div>{{ index + 1 }}</div>
				</template>
				<template #player="{ record }">
					<div class="inPhoneTableBox">
						<div class="imgBox">
							<img :src="record.img" alt="" />
						</div>
						<div>
							<div>{{ record.name }}</div>
							<div>{{ record.address }}</div>
						</div>
					</div>
				</template>
			</a-table>
		</a-row>
		<entryList :entryPath="entryPath" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import entryList from '@/components/common/entryList.vue';
import { SettingFilled } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'vip',
	components: {
		SettingFilled,
		entryList
	},
	setup() {
		const Router = useRouter();
		const data = reactive({
			entryPath: '/team',
			columns: [
				{
					title: '玩家',
					width: 100,
					dataIndex: 'name',
					key: 'name',
					slots: { customRender: 'action' }
				},
				{
					title: '性别',
					dataIndex: 'address',
					width: 10,
					key: '1'
				},
				{
					title: '主店',
					dataIndex: 'address',
					key: '2',
					width: 10
				},
				{
					title: '一般等级',
					dataIndex: 'address',
					key: '3',
					children: [
						{ title: 'Rating', dataIndex: 'address', key: '2', width: 60 },
						{ title: 'PPD', dataIndex: 'address', key: '2', width: 50 },
						{ title: 'MPR', dataIndex: 'address', key: '2', width: 50 }
					]
				},
				{
					title: '比赛等级',
					dataIndex: 'address',
					key: '3',
					children: [
						{ title: 'Rating', dataIndex: 'address', key: '2', width: 60 },
						{ title: 'PPD', dataIndex: 'address', key: '2', width: 50 },
						{ title: 'MPR', dataIndex: 'address', key: '2', width: 50 }
					]
				},
				{
					title: '比赛等级 ( 4Q )',
					dataIndex: 'address',
					key: '5',
					children: [
						{ title: 'Rating', dataIndex: 'address', key: '2', width: 30 },
						{ title: 'PPD', dataIndex: 'address', key: '2', width: 30 },
						{ title: 'MPR', dataIndex: 'address', key: '2', width: 30 }
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
					width: 160,
					fixed: 'left',
					dataIndex: 'name',
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
							dataIndex: 'name',
							key: 'name'
						},
						{
							title: 'PPD',
							width: 80,
							dataIndex: 'name',
							key: 'name'
						},
						{
							title: 'MPR',
							width: 80,
							dataIndex: 'name',
							key: 'name'
						}
					]
				},
				{
					title: 'Competition Rating',
					dataIndex: 'name',
					key: 'name',
					children: [
						{
							title: 'Rating',
							width: 80,
							dataIndex: 'name',
							key: 'name'
						},
						{
							title: 'PPD',
							width: 80,
							dataIndex: 'name',
							key: 'name'
						},
						{
							title: 'MPR',
							width: 80,
							dataIndex: 'name',
							key: 'name'
						}
					]
				},
				{
					title: 'Competition Rating ( 4Q )',
					dataIndex: 'name',
					key: 'name',
					children: [
						{
							title: 'Rating',
							width: 80,
							dataIndex: 'name',
							key: 'name'
						},
						{
							title: 'PPD',
							width: 80,
							dataIndex: 'name',
							key: 'name'
						},
						{
							title: 'MPR',
							width: 80,
							dataIndex: 'name',
							key: 'name'
						}
					]
				}
			],
			tableList: [
				{
					key: '1',
					img: require('@/assets/1.jpg'),
					name: 'John Brown',
					age: 32,
					address: 'New York Park'
				},
				{
					key: '2',
					img: require('@/assets/1.jpg'),
					name: 'Jim Green',
					age: 40,
					address: 'London Park'
				}
			],
			handleMenuClick: () => {
				console.log(1);
			},
			Gohistory: () => {
				Router.push('/teamIndex');
			},
			entryPage: (type: number, id: number) => {
				Router.push({
					path: '/playerInfo',
					query: {
						whichPage: type,
						id
					}
				});
			}
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
