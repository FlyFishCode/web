<template>
	<div>
		<a-row class="rowStyle">
			<a-col :lg="12" :xs="24" class="allBox">
				<a-col :span="10" class="firstClass">
					<img class="imgBg" :src="infoData.teamImg" alt="" />
				</a-col>
				<a-col :span="14" class="firstClass">
					<div class="teamName" @click="showTeamInfo">{{ infoData.teamName }}</div>
					<div class="disabledClass">{{ infoData.captainName }}</div>
					<div class="disabledClass">{{ infoData.countryName }} > {{ infoData.areaName }}</div>
					<div class="disabledClass">
						{{ infoData.shopAddress }}
						<span @click="showDetail" class="icon">
							<EnvironmentOutlined />
						</span>
					</div>
					<div class="disabledClass">{{ infoData.createDate }}</div>
				</a-col>
			</a-col>
			<!-- // 左侧按钮 -->
			<a-col :lg="12" :xs="24" class="carousel">
				<a-col :span="2" class="iconFont leftIcon">
					<LeftCircleOutlined @click="leftClick" />
				</a-col>
				<a-col class="center animate__backOutRight" id="Box">
					<div v-for="item in infoData.resultList" :key="item.id" class="centerBox">
						<div class="progressStyle">
							<div class="title">{{ item.title }}</div>
							<a-progress type="circle" class="myYuan" :percent="75" />
						</div>
						<div class="matchBox">
							<div class="fontStyle">
								<div class="left">
									<div v-if="item.rating">
										{{ 'RATING' }}
										<a-progress :percent="item.rating" strokeColor="red" />
									</div>
									<div v-if="item.ppd">
										{{ 'PPD' }}
										<a-progress :percent="item.ppd" strokeColor="red" />
									</div>
									<div v-if="item.mpr">
										{{ 'MPR' }}
										<a-progress :percent="item.mpr" strokeColor="red" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</a-col>
				<!-- 右侧按钮 -->
				<a-col :span="2" class="iconFont rightIcon">
					<RightCircleOutlined @click="rightClick" />
				</a-col>
				<!-- 展示条 -->
				<div class="showIndex">
					<div v-for="(item, index) in infoData.resultList" :key="item.index" class="otherBox" :class="{ isActived: index === currentIndex }"></div>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { reactive, toRefs, onMounted, ref } from 'vue';
import { teamdetailsHttp } from '@/axios/api';
import { EnvironmentOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
export default {
	name: 'inTeamTopOne',
	components: {
		EnvironmentOutlined,
		LeftCircleOutlined,
		RightCircleOutlined
	},
	setup() {
		const ROUTE = useRoute();
		let currentPosition = 0;
		const currentIndex = ref(0);
		const data = reactive({
			infoData: {
				resultList: []
			},
			showTeamInfo: () => {
				console.log('111');
			},
			showDetail: () => {
				console.log('222');
			},
			leftClick: () => {
				const box = document.getElementById('Box') as HTMLElement;
				if (currentIndex.value === 0) {
					currentIndex.value = 0;
				} else {
					currentIndex.value -= 1;
				}
				if (currentPosition === 0) {
					currentPosition = 0;
				} else {
					currentPosition += 475;
				}
				box.style.left = `${currentPosition}px`;
			},
			rightClick: () => {
				const box = document.getElementById('Box') as HTMLElement;
				if (currentIndex.value === data.infoData.resultList.length - 1) {
					currentIndex.value = data.infoData.resultList.length - 1;
				} else {
					currentIndex.value += 1;
				}
				if (Math.abs(currentPosition) === (data.infoData.resultList.length - 1) * 475) {
					currentPosition = -(data.infoData.resultList.length - 1) * 475;
				} else {
					currentPosition -= 475;
				}
				box.style.left = `${currentPosition}px`;
			}
		});
		const getTeamDetails = () => {
			teamdetailsHttp({ teamId: 46 || ROUTE.query.teamId }).then((res) => {
				res.data.data.resultList = [];
				for (const [key, value] of Object.entries(res.data.data)) {
					switch (key) {
						case 'bestPlayer':
							res.data.data.resultList.push(Object.assign(value, { title: key }));
							break;
						case 'leagueRating':
							res.data.data.resultList.push(Object.assign(value, { title: key }));
							break;
						default:
							break;
					}
				}
				data.infoData = res.data.data;
			});
		};
		onMounted(() => {
			getTeamDetails();
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
	background: #555;
	box-sizing: border-box;
}
.imgBg {
	width: 60%;
}
.allBox {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-right: 1px solid #fff;
}
.carousel {
	display: flex;
	height: 180px;
	position: relative;
	overflow: hidden;
}
.firstClass {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	text-align: left;
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
.secondClass .bigFont {
	font-size: 25px;
	color: #fff;
	height: 100%;
}
.score {
	color: red;
	font-size: 50px;
}
.title {
	font-size: 20px;
	font-weight: bold;
	color: #000;
}
.matchBox {
	height: 90%;
	width: 100%;
	color: #fff;
}
.fontStyle {
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: space-around;
}
.iconFont {
	color: #000;
	font-size: 25px;
	display: flex;
	align-items: center;
	cursor: pointer;
}
.iconFont :hover {
	opacity: 0.7;
}
.center {
	display: flex;
	position: relative;
	justify-content: space-around;
	left: 0px;
}
.leftIcon {
	position: absolute;
	left: 0px;
	top: calc(50% - 10px);
	z-index: 1;
}
.rightIcon {
	position: absolute;
	right: 0px;
	top: calc(50% - 10px);
	z-index: 10;
}
.centerBox {
	width: 435px;
	margin: 0 20px;
	display: flex;
	justify-content: space-around;
}
.animate__backOutRight {
	transition: all 1s ease;
}
.myYuan >>> .ant-progress-inner {
	width: 100px !important;
	height: 100px !important;
}
.myProgress {
	display: flex;
	justify-content: space-around;
}
.myProgressBox {
	width: 40%;
}
.myProgressBox >>> .ant-progress-text {
	display: none;
}
.showIndex {
	display: flex;
	width: 100%;
	bottom: 5px;
	left: 0px;
	justify-content: center;
	position: absolute;
}
.otherBox {
	width: 20px;
	height: 5px;
	margin: 0 3px;
	background: #eee;
}
.isActived {
	background: red;
}
.progressStyle {
	height: 90%;
	/* width: 60%; */
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.left {
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	color: #000;
}
</style>
