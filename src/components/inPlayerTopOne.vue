<template>
	<div>
		<a-row class="rowStyle">
			<a-col :lg="10" :xs="24" class="allBox">
				<a-col :span="10" class="firstClass">
					<img class="imgBg" :src="playerInfo.playerImg" alt="" />
				</a-col>
				<a-col :span="14" class="firstClass FONT">
					<div class="teamName" @click="showTeamInfo">{{ playerInfo.playerName }}</div>
					<div v-if="playerInfo.team" class="disabledClass">{{ playerInfo.team.teamName }}</div>
					<div v-if="playerInfo.shop" class="disabledClass">
						{{ playerInfo.shop.shopAddress }}
						<span @click="showDetail" class="icon">
							<EnvironmentOutlined />
						</span>
					</div>
					<div v-if="playerInfo.shop" class="disabledClass">
						<span>{{ playerInfo.shop.countryName }}</span>
						<span v-if="playerInfo.shop.areaName">{{ ` > ${playerInfo.shop.areaName}` }}</span>
					</div>
				</a-col>
			</a-col>
			<a-col :lg="14" :xs="24" class="scoreBox">
				<a-col :span="7" :offset="1">
					<div class="scoreName">{{ $t('default.311') }}</div>
					<div v-if="playerInfo.generalRating" class="inPhonePlayer"><a-progress type="circle" strokeColor="red" :percent="playerInfo.generalRating.rating" /></div>
				</a-col>
				<a-col :span="7" :offset="1">
					<div class="scoreName">{{ $t('default.252') }}</div>
					<div v-if="playerInfo.playerRating" class="inPhonePlayer"><a-progress type="circle" strokeColor="red" :percent="playerInfo.playerRating.rating" /></div>
				</a-col>
				<a-col :span="7" :offset="1">
					<div class="scoreName">{{ $t('default.185') }}</div>
					<div v-if="playerInfo.setResult" class="inPhonePlayer"><a-progress type="circle" strokeColor="red" :percent="playerInfo.setResult.winProbabilityDouble" /></div>
				</a-col>
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { EnvironmentOutlined } from '@ant-design/icons-vue';
import { playerDetailsHttp } from '@/axios/api';
import { useRoute } from 'vue-router';

export default {
	name: 'inPlayerTopOne',
	components: {
		EnvironmentOutlined
	},
	setup() {
		const ROUTE = useRoute();
		const data = reactive({
			playerInfo: {
				resultList: [{}]
			},
			showTeamInfo: () => {
				console.log('111');
			},
			showDetail: () => {
				console.log('222');
			}
		});
		const getPlayerDetails = () => {
			playerDetailsHttp({ playerId: ROUTE.query.playerId }).then((res) => {
				data.playerInfo = res.data.data;
			});
		};
		onMounted(() => {
			getPlayerDetails();
		});
		return {
			...toRefs(data)
		};
	}
};
</script>
<style scoped>
.rowStyle {
	/* height: 190px; */
	margin: 10px 0;
	padding: 5px;
	background: #4b4b4b;
	box-sizing: border-box;
}
.imgBg {
	width: 100%;
	height: 100%;
}
.allBox {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-right: 1px solid #fff;
}
.firstClass {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	text-align: left;
	height: 100%;
	padding: 15px;
}
.FONT {
	padding-left: 10px;
}
.teamName {
	font-size: 15px;
	font-weight: bold;
	color: #fff;
	cursor: pointer;
}
.disabledClass {
	color: #eee;
}
.icon {
	position: relative;
	top: 1px;
}
.score {
	color: red;
	font-size: 50px;
}
.animate__backOutRight {
	transition: all 1s ease;
}
.scoreBox {
	padding: 15px;
	color: #8c8c8c;
}
.scoreBox > div {
	padding: 0 15px;
}
.currentScore {
	border-left: 1px solid #eee;
	border-right: 1px solid #eee;
}
.scoreName {
	text-align: left;
}
</style>
