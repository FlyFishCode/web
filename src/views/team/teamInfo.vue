<template>
	<div class="content">
		<a-row>
			<divTitle :msg="title" :span="colSpan" />
		</a-row>
		<a-row>
			<inTeamTopOne />
		</a-row>
		<a-row>
			<a-tabs type="card" v-model:activeKey="activeKey" class="tabsBox">
				<a-tab-pane key="1" :tab="$t('default.13')">
					<timeTable />
				</a-tab-pane>
				<a-tab-pane key="2" :tab="$t('default.231')">
					<beforeResult />
				</a-tab-pane>
				<a-tab-pane key="3" :tab="$t('default.227')">
					<vip />
				</a-tab-pane>
			</a-tabs>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import divTitle from '@/components/DividingLine.vue';
import inTeamTopOne from '@/components/inTeamTopOne.vue';
// tabs
import timeTable from './teamInfoTabs/timeTable.vue';
import beforeResult from './teamInfoTabs/beforeResult.vue';
import vip from './teamInfoTabs/vip.vue';
import { useRoute } from 'vue-router';
export default defineComponent({
	name: 'teamInfo',
	components: {
		divTitle,
		inTeamTopOne,
		timeTable,
		beforeResult,
		vip
	},
	setup() {
		const ROUTE = useRoute();
		const data = reactive({
			title: 'default.9',
			colSpan: 5,
			activeKey: '1'
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
.rowStyle {
	margin: 10px;
}
.tabsBox >>> .ant-tabs-nav-scroll {
	display: flex;
}
</style>
