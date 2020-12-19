<template>
	<div class="content">
		<a-row>
			<a-col :lg="4" :xs="12" class="smallTitle"> <SettingFilled /> {{ `${$t('default.10')} (${playerList.length})` }} </a-col>
			<a-col :lg="{ span: 3, offset: 17 }" :xs="0" class="sortColBox">
				<div>
					<div class="linkIcon">
						<span v-if="sortTeam" @click="changeSortTeam(1)"> {{ $t('default.252') }}<DownOutlined /> </span>
						<span v-else @click="changeSortTeam(2)"> {{ $t('default.252') }}<UpOutlined /> </span>
					</div>
				</div>
			</a-col>
		</a-row>

		<a-row v-for="item in playerList" :key="item.id">
			<a-row class="eveyTeam">
				<a-col :lg="3" :xs="4" class="imgColStyle">
					<div>
						<img class="matchImg" :src="item.playerImg" alt="" />
					</div>
				</a-col>
				<a-col :lg="4" :xs="{ span: 7, offset: 1 }" class="infoClass">
					<div class="teamStyle" @click="entryPage(item.playerId)">{{ item.playerName }}</div>
					<div v-if="item.gender === 0">{{ $t('default.204') }}</div>
					<div v-else-if="item.gender === 1">{{ $t('default.203') }}</div>
					<div v-else>{{ $t('default.253') }}</div>
				</a-col>
				<a-col :lg="{ span: 3 }" :xs="0" class="vipBox">
					<div>{{ $t('default.55') }}</div>
					<div>{{ item.teamName }}</div>
				</a-col>
				<a-col :lg="8" :xs="12" class="topBox">
					<div>{{ $t('default.184') }}</div>
					<div v-if="item.playerRating" class="infoStyle">
						<div>{{ `Rating  ${item.playerRating.rating}` }}</div>
						|
						<div>{{ `PPD  ${item.playerRating.ppd}` }}</div>
						|
						<div>{{ `MPR  ${item.playerRating.mpr}` }}</div>
					</div>
				</a-col>
			</a-row>
		</a-row>
		<a-row type="flex" justify="end">
			<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" @showSizeChange="onShowSizeChange" />
		</a-row>
		<entryList :entryPath="entryPath" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { shopPlayerListHttp } from '@/axios/api';
import entryList from '@/components/common/entryList.vue';
import { useRoute, useRouter } from 'vue-router';
import { SettingFilled, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
export default defineComponent({
	name: 'player',
	components: {
		SettingFilled,
		DownOutlined,
		UpOutlined,
		entryList
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const data = reactive({
			entryPath: '/shop',
			pageNum: 1,
			value: 201,
			current: 1,
			pageSize: 10,
			total: 1,
			sort: 1,
			colSpan: 4,
			sortTeam: true,
			shopId: ROUTE.query.shopId,
			playerList: [],
			getDate: () => '220-10-16',
			entryPage: (id: number) => {
				ROUTER.push({
					path: '/playerInfo',
					query: {
						activeKey: '1',
						id
					}
				});
			},
			onShowSizeChange: () => {
				console.log(1);
			},
			changeSortTeam: (value: number) => {
				data.sort = value;
				data.sortTeam = !data.sortTeam;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getList();
			}
		});
		const getList = () => {
			const obj = {
				shopId: data.shopId,
				sort: data.sort,
				pageIndex: 1,
				pageSize: 10
			};
			shopPlayerListHttp(obj).then((res) => {
				data.playerList = res.data.data.list;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.teamName {
	color: #fff;
	font-size: 20px;
	font-weight: bold;
}
.couny {
	font-size: 15px;
	color: #999;
}
.matchImg {
	height: 60px;
}
.eveyTeam {
	height: 80px;
	margin: 15px 0;
	border: 1px solid #eee;
}
.imgColStyle {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.placeStyle {
	display: flex;
	justify-content: flex-start;
}
.placeStyle span {
	cursor: pointer;
}
.infoClass {
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
}
.counyStyle {
	color: #999;
	margin: 0 5px;
}
.teamStyle {
	cursor: pointer;
	font-weight: bold;
}
.teamStyle:hover {
	text-decoration: underline;
}
.vipBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.topBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.infoStyle {
	display: flex;
	justify-content: space-around;
}
</style>
