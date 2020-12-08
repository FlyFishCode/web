<template>
	<div>
		<a-modal v-model:visible="visible" :title="$t('default.261')" class="dialogBG" width="50%" centered :footer="null" @cancel="cancel">
			<a-row>
				<a-row class="dialogRow">
					<a-col>{{ 'Carlsberg Phoenix Double Up 2020' }}</a-col>
				</a-row>
				<a-row>
					<a-col class="personBox">
						<div class="dialogImgBox">
							<img :src="require('@/assets/1.jpg')" alt="" />
						</div>
						<div class="personInfo">
							<div>{{ 'CBRX' }}</div>
							<div>{{ 'Chop Bar' }}</div>
							<div>
								<span>{{ $t('default.76') }}</span>
								<span>{{ 'Gary Cheng K.' }}</span>
							</div>
						</div>
					</a-col>
				</a-row>
			</a-row>
			<a-row class="dialogRow">
				<div class="title">{{ $t('default.73') }}</div>
				<div>
					<a-table :columns="leagueColumns" :data-source="leagueList" rowkey="id" bordered></a-table>
				</div>
			</a-row>
			<a-row class="dialogRow">
				<div class="title">{{ 'Latest Result' }}</div>
				<a-row class="matchBox">
					<a-col class="matchTitle">{{ 'Match No.(5)' }}</a-col>
					<a-col :span="8" class="matchBoxDiv">
						<div>{{ 'Home Team' }}</div>
						<div class="matchImg"><img :src="require('@/assets/1.jpg')" alt="" /></div>
						<div>{{ 'CBRX' }}</div>
						<div>{{ 'Chop Bar' }}</div>
					</a-col>
					<a-col :span="8" class="matchBoxDiv">
						<div class="matchVS">
							<div>{{ '2020-11-12 (Thu.) 20:30' }}</div>
							<div class="matchScore">
								<span class="scoreBox">{{ 5 }}</span>
								<span>{{ 'VS' }}</span>
								<span class="scoreBox">{{ 7 }}</span>
							</div>
							<div>
								<a-button type="primary">{{ '详细资料' }}</a-button>
							</div>
						</div>
					</a-col>
					<a-col :span="8" class="matchBoxDiv">
						<div>{{ 'Away Team' }}</div>
						<div class="matchImg"><img :src="require('@/assets/1.jpg')" alt="" /></div>
						<div>{{ 'CBRX' }}</div>
						<div>{{ 'Chop Bar' }}</div>
					</a-col>
				</a-row>
			</a-row>
			<a-row class="dialogRow">
				<div class="title">{{ $t('default.262') }}</div>
				<div>
					<a-table :columns="playerColumns" :data-source="playerList" :scroll="{ x: 1650 }" :pagination="false" bordered rowKey="id">
						<template #player="{record}">
							<div class="playerInfoBox">
								<div class="imgBox"><img :src="record.img" alt="" /></div>
								<div class="link" @click="showDialog(record.id)">{{ record.playerName }}</div>
							</div>
						</template>
					</a-table>
				</div>
				<div class="pagination">
					<a-pagination v-model:current="playerPageNum" v-model:pageSize="playerPageSize" :total="playerTotal" @change="playerPageChange" />
				</div>
			</a-row>
			<a-row class="dialogRow">
				<div class="title">{{ $t('default.263') }}</div>
				<div>
					<a-table :columns="historyColumns" :data-source="historyList" :pagination="false" bordered rowKey="id">
						<template #info="{ record }">
							<div class="infoBtn" @click="infoClick(record)">{{ $t('default.272') }}</div>
						</template>
					</a-table>
				</div>
				<div class="pagination">
					<a-pagination v-model:current="historyPageNum" v-model:pageSize="historyPageSize" :total="historyTotal" @change="historyPageChange" />
				</div>
			</a-row>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue';
// import { SettingFilled }'@ant-design/icons-vue';
export default defineComponent({
	name: 'dialogVue',
	props: ['propsVisible', 'teamId'],
	setup(props, ctx) {
		const { emit } = ctx;
		const data = reactive({
			visible: props.propsVisible,
			teamId: props.teamId,
			infoData: {},
			playerTotal: 1,
			playerPageNum: 1,
			playerPageSize: 10,
			historyTotal: 1,
			historyPageNum: 1,
			historyPageSize: 10,
			leagueColumns: [
				{ title: '排行', dataIndex: 'name' },
				{ title: 'Total Point', dataIndex: 'name' },
				{
					title: 'Match',
					children: [
						{ title: '胜', dataIndex: 'name' },
						{ title: '败', dataIndex: 'name' },
						{ title: '和', dataIndex: 'name' }
					]
				},
				{
					title: 'Set',
					children: [
						{ title: '胜', dataIndex: 'name' },
						{ title: '败', dataIndex: 'name' },
						{ title: '和', dataIndex: 'name' }
					]
				},
				{ title: '胜出分数', dataIndex: 'name' },
				{ title: '罚分', dataIndex: 'name' }
			],
			playerColumns: [
				{ title: '排行', dataIndex: 'name', fixed: 'left' },
				{ title: '玩家', dataIndex: 'name', fixed: 'left', width: 200, slots: { customRender: 'player' } },
				{
					title: 'Match',
					children: [
						{ title: 'Rating', dataIndex: 'name', width: 80 },
						{ title: 'PPD', dataIndex: 'name', width: 70 },
						{ title: 'MPR', dataIndex: 'name', width: 70 }
					]
				},
				{
					title: 'Set',
					children: [
						{ title: 'Total', dataIndex: 'name', width: 70 },
						{ title: '胜', dataIndex: 'name', width: 60 },
						{ title: '败', dataIndex: 'name', width: 60 },
						{ title: '和', dataIndex: 'name', width: 60 }
					]
				},
				{ title: 'LF', dataIndex: 'name', width: 60 },
				{ title: 'HAT', dataIndex: 'name', width: 70 },
				{ title: 'HT', dataIndex: 'name', width: 60 },
				{ title: 'HT.OFF', dataIndex: 'name', width: 80 },
				{ title: 'LT.OFF', dataIndex: 'name', width: 80 },
				{ title: 'BED', dataIndex: 'name', width: 70 },
				{ title: '180', dataIndex: 'name', width: 70 },
				{ title: 'EYE', dataIndex: 'name', width: 70 },
				{ title: '5M', dataIndex: 'name', width: 60 },
				{ title: '6M', dataIndex: 'name', width: 60 },
				{ title: '7M', dataIndex: 'name', width: 60 },
				{ title: '8M', dataIndex: 'name', width: 60 },
				{ title: '9M', dataIndex: 'name', width: 60 },
				{ title: 'WH', dataIndex: 'name', width: 60 }
			],
			historyColumns: [
				{ title: '日期', dataIndex: 'date', width: 100 },
				{ title: 'vs.Team', dataIndex: 'name' },
				{ title: 'Win / Lose', dataIndex: 'name', width: 150 },
				{ title: '详情', dataIndex: 'name', width: 100, slots: { customRender: 'info' } }
			],
			leagueList: [{ id: 1 }],
			playerList: [{ id: 1 }],
			historyList: [{ id: 1, date: '2020-10-1' }],
			playerPageChange: () => {
				console.log(1);
			},
			historyPageChange: () => {
				console.log(1);
			},
			infoClick: (row: any) => {
				console.log(row);
			},
			cancel: () => {
				emit('dialogVisible', false);
			}
		});
		const getData = () => {
			console.log(1);
		};
		onMounted(() => {
			getData();
		});
		watch(
			() => [props.propsVisible, props.teamId],
			([newPropsVisible, newTeamId]) => {
				data.visible = newPropsVisible;
				data.teamId = newTeamId;
				console.log(data.teamId);
			}
		);
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.dialogRow {
	margin: 20px 0;
}
.personBox {
	display: flex;
	align-items: center;
}
.dialogImgBox {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	overflow: hidden;
}
.dialogImgBox img {
	width: 100%;
}
.personInfo {
	padding-left: 20px;
}
.matchBox {
	border-top: 2px solid #4b4b4b;
	border-left: 1px solid #eee;
	border-right: 1px solid #eee;
	border-bottom: 1px solid #eee;
	text-align: center;
	height: 250px;
}
.matchBoxDiv {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	border: 1px solid #eee;
}
.matchTitle {
	color: #5a5a5a;
	background: #f1f0ed;
	padding: 10px 0;
}
.matchImg {
	height: 100px;
	width: 100px;
	margin: 0 auto;
}
.matchImg img {
	width: 100%;
}
.matchVS {
	height: 100%;
	display: flex;
	flex-direction: column;
}
.matchScore {
	display: flex;
	flex-grow: 2;
	align-items: center;
	font-size: 20px;
	justify-content: space-around;
}
.playerInfoBox {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.imgBox {
	width: 50px;
}
.imgBox img {
	width: 100%;
}
.title {
	margin: 10px 0;
	font-weight: bold;
}
.scoreBox {
	font-size: 60px;
	font-weight: bold;
}
.infoBtn {
	text-align: center;
	color: #fff;
	background: #ff5e00;
	cursor: pointer;
}
</style>
