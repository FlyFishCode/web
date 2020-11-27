<template>
	<div class="content">
		<a-row>
			<divTitle :msg="title" :span="colSpan" />
		</a-row>
		<inPlayerTopOne />
		<a-row>
			<a-tabs type="card" v-model:activeKey="activeKey" class="tabsBox">
				<a-tab-pane key="1" :tab="$t('default.254')">
					<rating />
				</a-tab-pane>
				<a-tab-pane key="2" :tab="$t('default.102')">
					<matchRecord />
				</a-tab-pane>
				<a-tab-pane key="3" :tab="$t('default.103')">
					<playerReward />
				</a-tab-pane>
			</a-tabs>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import divTitle from '@/components/DividingLine.vue';
import inPlayerTopOne from '@/components/inPlayerTopOne.vue';
// tabs
import rating from './playersTabs/rating.vue';
import matchRecord from './playersTabs/matchRecord.vue';
import playerReward from './playersTabs/playerReward.vue';
import { useRoute } from 'vue-router';
export default defineComponent({
	name: 'playerInfo',
	components: {
		divTitle,
		inPlayerTopOne,
		rating,
		matchRecord,
		playerReward
	},
	setup() {
		const ROUTE = useRoute();
		const data = reactive({
			title: 'default.10',
			colSpan: 4,
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
