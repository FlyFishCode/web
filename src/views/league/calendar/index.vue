<template>
	<div class="content">
		<a-row class="imgBox">
			<img :src="img" alt="" />
		</a-row>
		<a-row>
			<a-tabs class="tabsBox" v-model:activeKey="activeKey">
				<a-tab-pane key="1" :tab="$t('default.24')">
					<matchInfo />
				</a-tab-pane>
				<a-tab-pane key="2" :tab="$t('default.13')">
					<timeTable />
				</a-tab-pane>
				<a-tab-pane key="3" :tab="$t('default.26')">
					<ranking />
				</a-tab-pane>
				<a-tab-pane key="4" :tab="$t('default.9')">
					<matchTeam />
				</a-tab-pane>
			</a-tabs>
		</a-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import matchInfo from '@/views/league/calendar/matchInfo.vue';
import timeTable from '@/views/league/calendar/timeTable.vue';
import ranking from '@/views/league/calendar/ranking.vue';
import matchTeam from '@/views/league/calendar/matchTeam.vue';
export default defineComponent({
	name: 'LeagueIndex',
	components: { matchInfo, timeTable, matchTeam, ranking },
	setup() {
		const route = useRoute();
		const data = reactive({
			img: require('@/assets/21.jpg'),
			activeKey: '2'
		});
		onMounted(() => {
			data.activeKey = route.query.activeKey as string;
			console.log(route.query);
		});
		return {
			...toRefs(data)
		};
	}
});
</script>
<style scoped>
.imgBox {
	height: 160px;
}
.imgBox img {
	height: 100%;
	width: 100%;
}
.tabsBox >>> .ant-tabs-nav-scroll {
	display: flex;
}
</style>
