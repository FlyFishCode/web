<template>
	<div class="content">
		<a-row>
			<a-col :lg="4" :xs="12" class="smallTitle"> <SettingFilled /> {{ `${$t('default.9')} (${teamList.length})` }} </a-col>
			<a-col :lg="{ span: 3, offset: 14 }" :xs="0" class="sortColBox">
				<div>
					<div class="linkIcon">
						<span v-if="sortTeam" @click="changeSortTeam(1)"> {{ $t('default.251') }}<DownOutlined /> </span>
						<span v-else @click="changeSortTeam(2)"> {{ $t('default.251') }}<UpOutlined /> </span>
					</div>
				</div>
			</a-col>
			<a-col :lg="3" :xs="0" class="sortColBox">
				<div>
					<div class="linkIcon">
						<span v-if="sortPlayer" @click="changeSortPlayer(3)"> {{ $t('default.190') }}<DownOutlined /> </span>
						<span v-else @click="changeSortPlayer(4)"> {{ $t('default.190') }}<UpOutlined /> </span>
					</div>
				</div>
			</a-col>
		</a-row>

		<a-row v-for="item in teamList" :key="item.id">
			<a-row class="eveyTeam">
				<a-col :lg="3" :xs="5" class="imgColStyle">
					<div>
						<img class="matchImg" :src="item.teamImg" alt="" />
					</div>
				</a-col>
				<a-col :lg="4" :xs="15" class="infoClass">
					<div class="teamStyle" @click="entryPage(item.teamId)">{{ item.teamName }}</div>
					<div class="placeStyle">
						<div class="overStyle">{{ item.countryName }}/</div>
						<div class="counyStyle">{{ item.areaName }}</div>
					</div>
					<div>{{ item.captainName }}</div>
				</a-col>
				<a-col :lg="{ span: 3, offset: 5 }" :xs="4" class="vipBox">
					<div>{{ $t('default.77') }}</div>
					<div><UserOutlined />{{ item.playerCount }}</div>
				</a-col>
				<a-col :lg="8" :xs="0" class="topBox">
					<div>{{ $t('default.178') }}</div>
					<div class="infoStyle">
						<div>{{ `Rating  ${item.rating}` }}</div>
						|
						<div>{{ `PPD  ${item.ppd}` }}</div>
						|
						<div>{{ `MPR  ${item.mpr}` }}</div>
					</div>
				</a-col>
			</a-row>
		</a-row>
		<a-row type="flex" justify="end">
			<a-pagination v-model:current="currentPage" v-model:pageSize="pageSize" :total="total" @showSizeChange="onShowSizeChange" />
		</a-row>
		<entryList :entryPath="entryPath" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import entryList from '@/components/common/entryList.vue';
import { shopTeamListHttp } from '@/axios/api';
import { useRoute, useRouter } from 'vue-router';
import { SettingFilled, UserOutlined, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
export default defineComponent({
	name: 'team',
	components: {
		SettingFilled,
		UserOutlined,
		DownOutlined,
		UpOutlined,
		entryList
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const data = reactive({
			entryPath: '/shop',
			currentPage: 1,
			current: 1,
			pageSize: 10,
			total: 1,
			sort: 1,
			colSpan: 4,
			sortTeam: true,
			sortPlayer: true,
			shopId: ROUTE.query.shopId,
			teamList: [],
			getDate: () => '220-10-16',
			entryPage: (id: number) => {
				ROUTER.push({
					path: '/teamInfo',
					query: {
						activeKey: '1',
						id
					}
				});
			},
			onShowSizeChange: () => {
				console.log(1);
			},
			changeSortTeam: (type: number) => {
				data.sort = type;
				data.sortTeam = !data.sortTeam;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTeamList();
			},
			changeSortPlayer: (type: number) => {
				data.sort = type;
				data.sortPlayer = !data.sortPlayer;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTeamList();
			}
		});
		const getTeamList = () => {
			const obj = {
				shopId: data.shopId,
				sort: data.sort,
				pageIndex: 1,
				pageSize: 10
			};
			shopTeamListHttp(obj).then((res) => {
				data.teamList = res.data.data.list;
				data.total = res.data.data.totalCount;
			});
		};
		onMounted(() => {
			getTeamList();
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
	justify-content: space-around;
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
