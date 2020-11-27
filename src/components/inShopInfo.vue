<template>
	<div>
		<a-row class="rowStyle">
			<a-col :lg="12" :xs="24" class="allBox">
				<a-col :span="10" class="imgBox">
					<img class="imgBg" :src="shopDetail.shopImg" alt="" />
				</a-col>
				<a-col :span="14" class="firstClass FONT">
					<div class="teamName" @click="showTeamInfo">{{ shopDetail.shopName }}</div>
					<div class="disabledClass">
						{{ shopDetail.countryName }} > {{ shopDetail.areaName }}
						<span @click="showDetail" class="icon">
							<EnvironmentOutlined />
						</span>
					</div>
					<div class="disabledClass">{{ shopDetail.shopPhone }}</div>
					<div class="disabledClass">{{ shopDetail.shopAddress }}</div>
				</a-col>
			</a-col>
			<a-col :lg="12" :xs="0" class="scoreBox">
				<a-col :span="12" class="infoBox">
					<div class="imgBg">
						<img class="imgBg" :src="shopDetail.bestPlayer.playerImg" alt="" />
					</div>
					<div class="nameBox">{{ shopDetail.bestPlayer.playerName }}</div>
				</a-col>
				<a-col :span="12">
					<div>
						<div class="rightScore">
							<div>{{ $t('default.168') }}</div>
							<div>{{ shopDetail.bestPlayer.rating }}</div>
						</div>
						<div class="pregress">
							<a-progress :percent="shopDetail.bestPlayer.rating" />
						</div>
					</div>
					<div>
						<div class="rightScore">
							<div>{{ $t('default.169') }}</div>
							<div>{{ shopDetail.bestPlayer.ppd }}</div>
						</div>
						<div class="pregress">
							<a-progress :percent="shopDetail.bestPlayer.ppd" />
						</div>
					</div>
					<div>
						<div class="rightScore">
							<div>{{ $t('default.170') }}</div>
							<div>{{ shopDetail.bestPlayer.mpr }}</div>
						</div>
						<div class="pregress">
							<a-progress :percent="shopDetail.bestPlayer.mpr" />
						</div>
					</div>
				</a-col>
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { reactive, toRefs, onMounted, ref } from 'vue';
import { shopdetailsHttp } from '@/axios/api';
import { EnvironmentOutlined } from '@ant-design/icons-vue';
export default {
	name: 'inShopInfo',
	components: {
		EnvironmentOutlined
	},
	setup() {
		const ROUTE = useRoute();
		const currentIndex = ref(0);
		const data = reactive({
			shopId: ROUTE.query.shopId,
			shopDetail: {
				bestPlayer: {}
			},
			showTeamInfo: () => {
				console.log('111');
			},
			showDetail: () => {
				console.log('222');
			}
		});
		const getShopDetail = () => {
			shopdetailsHttp({ shopId: data.shopId }).then((res) => {
				data.shopDetail = res.data.data;
			});
		};
		onMounted(() => {
			getShopDetail();
		});
		return {
			...toRefs(data),
			currentIndex
		};
	}
};
</script>
<style scoped>
.rowStyle {
	height: 190px;
	margin: 10px 0;
	padding: 5px;
	box-sizing: border-box;
}
.imgBg {
	width: 70%;
	margin: 0 auto;
}
.allBox {
	height: 100%;
	display: flex;
	background: #272727;
	align-items: center;
	justify-content: center;
}
.imgBox {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	text-align: left;
	padding: 15px;
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
	cursor: pointer;
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
	height: 100%;
	background: #4b4b4b;
}
.scoreBox > div {
	padding: 0 15px;
}
.nameBox {
	font-size: 16px;
	color: #fff;
}
.currentScore {
	border-left: 1px solid #eee;
	border-right: 1px solid #eee;
}
.scoreName {
	text-align: left;
}
.infoBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.pregress >>> .ant-progress-text {
	display: none;
}
.rightScore {
	color: #8d8d8d;
	font-size: 16px;
	padding: 0 20px;
	font-weight: bold;
	display: flex;
	justify-content: space-between;
}
</style>
