<template>
	<div class="content">
		<divTitle :msg="title" :span="colSpan" :lastDate="getDate()" />
		<a-tabs type="card" v-model:activeKey="activeKey" class="tabsBox">
			<a-tab-pane key="1" :tab="$t('default.67')">
				<teamRanking @team-key-change="teamKeyChange" />
			</a-tab-pane>
			<a-tab-pane key="2" :tab="$t('default.181')">
				<teamHistory :activeKey="activeKey" @team-clear="teamClear" :teamList="teamList" />
			</a-tab-pane>
			<a-tab-pane key="3" :tab="$t('default.68')">
				<plyaerRanking @player-key-change="playerKeyChange" />
			</a-tab-pane>
			<a-tab-pane key="4" :tab="$t('default.182')">
				<playerHistory :activeKey="activeKey" @player-clear="playerClear" :playerList="playerList" />
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import divTitle from '@/components/DividingLine.vue';
import teamRanking from '@/views/ranking/tabs/teamRanking.vue';
import teamHistory from '@/views/ranking/tabs/teamHistory.vue';
import plyaerRanking from '@/views/ranking/tabs/plyaerRanking.vue';
import playerHistory from '@/views/ranking/tabs/playerHistory.vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

interface DataProp {
	activeKey: string;
	teamList: any;
	playerList: any;
}

export default defineComponent({
	name: 'ranking',
	components: {
		divTitle,
		teamRanking,
		teamHistory,
		plyaerRanking,
		playerHistory
	},
	emits: ['team-key-change', 'player-key-change'],
	setup() {
		onBeforeRouteUpdate(async (to, from) => {
			// only fetch the user if the id changed as maybe only the query or the hash changed
			console.log(to, from);
		});
		const ROUTE = useRoute();
		const data: DataProp = reactive({
			activeKey: '1',
			title: 'default.180',
			colSpan: 10,
			teamList: [],
			playerList: [],
			getDate: () => {
				return '2020-10-17';
			},
			teamKeyChange: (key: string, list: Array<any>) => {
				data.activeKey = key;
				data.teamList = list;
			},
			playerKeyChange: (key: string, list: Array<any>) => {
				data.activeKey = key;
				data.playerList = list;
			},
			playerClear: (list: Array<any>) => {
				data.playerList = list;
			},
			teamClear: (list: Array<any>) => {
				data.teamList = list;
			}
		});
		onMounted(() => {
			data.activeKey = ROUTE.query.activeKey as string;
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.tabsBox >>> .ant-tabs-nav-scroll {
	display: flex;
}
</style>
