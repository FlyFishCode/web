<template>
	<div class="content">
		<a-row class="titleBox">
			<a-col class="teamBox">
				<div class="hearder">
					<div class="pointBox">
						<div class="setPoint">{{ 'Set Point' }}</div>
						<div class="point">
							<div class="point">
								<div class="title">{{ 'W' }}</div>
								<div class="titleValue">{{ info.competitionSet.winPoint }}</div>
							</div>
							<div class="point">
								<div class="title">{{ 'D' }}</div>
								<div class="titleValue">{{ info.competitionSet.drawnPoint }}</div>
							</div>
							<div class="point">
								<div class="title">{{ 'L' }}</div>
								<div class="titleValue">{{ info.competitionSet.losePoint }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="teamContent">
					<div class="matchName">{{ info.competitionName }}</div>
					<div>{{ info.date }}</div>
				</div>
			</a-col>
		</a-row>
		<a-row>
			<a-tabs class="tabsBox" v-model:activeKey="activeKey">
				<a-tab-pane key="1" :tab="$t('default.24')">
					<matchInfo @change-activekey="changeActiveKey" />
				</a-tab-pane>
				<a-tab-pane key="2" :tab="$t('default.13')">
					<timeTable />
				</a-tab-pane>
				<a-tab-pane key="3" :tab="$t('default.26')">
					<ranking />
				</a-tab-pane>
				<a-tab-pane key="4" :tab="$t('default.9')">
					<matchTeam @change-activekey="changeActiveKey" />
				</a-tab-pane>
			</a-tabs>
		</a-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { leagueInfoHttp } from '@/axios/api';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import matchInfo from '@/views/league/calendar/matchInfo.vue';
import timeTable from '@/views/league/calendar/timeTable.vue';
import ranking from '@/views/league/calendar/ranking.vue';
import matchTeam from '@/views/league/calendar/matchTeam.vue';
export default defineComponent({
	name: 'LeagueIndex',
	components: { matchInfo, timeTable, matchTeam, ranking },
	emits: ['change-activekey'],
	setup() {
		const ROUTE = useRoute();
		const data = reactive({
			activeKey: '2',
			info: {
				date: '',
				competitionName: '',
				competitionSet: {
					winPoint: 0,
					drawnPoint: 0,
					losePoint: 0
				}
			},
			changeActiveKey: (key: string) => {
				data.activeKey = key;
			}
		});
		const getInfo = (competitionId = ROUTE.query.competitionId) => {
			leagueInfoHttp({ competitionId }).then((res) => {
				if (res.data.data) {
					data.info = res.data.data;
				} else {
					return;
				}
				if (!res.data.data.setResult) {
					res.data.data.setResult = {};
				}
			});
		};
		onBeforeRouteUpdate((to: any, from: any, next: any) => {
			getInfo(to.query.competitionId);
			next();
		});
		onMounted(() => {
			data.activeKey = ROUTE.query.activeKey as string;
			getInfo();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>
<style scoped>
.titleBox {
	background: #eee;
}
.tabsBox >>> .ant-tabs-nav-scroll {
	display: flex;
}
.hearder {
	display: flex;
	justify-content: flex-end;
}
.pointBox {
	display: flex;
	flex-direction: column;
	text-align: left;
	width: 200px;
}
.teamContent {
	height: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.setPoint {
	margin: 10px 0;
}
.matchName {
	font-size: 20px;
	font-weight: bold;
}
.point {
	display: flex;
	text-align: center;
}
.title {
	width: 30px;
	background: #231f20;
	color: #fff;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}
.titleValue {
	width: 30px;
	background: #fff;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}
</style>
