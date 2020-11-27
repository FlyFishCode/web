<template>
	<div>
		<a-row class="rowStyle">
			<a-col :span="8" class="allBox">
				<a-col :span="12" class="firstClass">
					<img class="imgBg" :src="infoData.img" alt="" />
				</a-col>
				<a-col :span="12" class="firstClass FONT">
					<div class="teamName" @click="showTeamInfo">{{ infoData.teamName }}</div>
					<div class="disabledClass">{{ infoData.captainName }}</div>
					<div class="disabledClass">
						{{ infoData.place }}
						<span @click="showDetail" class="icon">
							<InfoCircleFilled />
						</span>
					</div>
					<div class="disabledClass">{{ infoData.country }}</div>
				</a-col>
			</a-col>
			<a-col :span="4" class="progressBox">
				<div class="title">{{ $t('default.184') }}</div>
				<a-progress type="circle" class="myYuan" :percent="75" />
			</a-col>
			<a-col :span="4" class="progressBox">
				<div class="title">{{ $t('default.185') }}</div>
				<a-progress type="circle" class="myYuan" :percent="75" />
			</a-col>
			<!-- // 左侧按钮 -->
			<a-col :span="8" class="carousel">
				<a-col :span="2" class="iconFont leftIcon">
					<LeftCircleOutlined @click="leftClick" />
				</a-col>
				<a-col class="center animate__backOutRight" id="myBox">
					<div v-for="item in infoData.resultList" :key="item.id" class="centerBox">
						<div class="matchBox">
							<div class="title">{{ item.name }}</div>
							<div class="fontStyle">
								<div class="left">
									<div>{{ '胜' }}</div>
									<div>{{ '败' }}</div>
									<div>{{ '和' }}</div>
									<div>{{ '胜率' }}</div>
								</div>
								<div class="right">
									<div>
										<a-progress :percent="item.win" strokeColor="red" />
									</div>
									<div>
										<a-progress :percent="item.draw" strokeColor="red" />
									</div>
									<div>
										<a-progress :percent="item.lost" strokeColor="red" />
									</div>
									<div>
										<a-progress :percent="item.probability" strokeColor="red" />
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
import { InfoCircleFilled, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
export default {
	name: 'rankingTeam',
	components: {
		InfoCircleFilled,
		LeftCircleOutlined,
		RightCircleOutlined
	},
	setup() {
		const route = useRoute();
		let currentPosition = 0;
		const currentIndex = ref(0);
		const data = reactive({
			infoData: {
				img: require('@/assets/1.jpg'),
				teamName: '上海市消防总队黄埔支队嵩山中队',
				captainName: '李逍遥',
				place: '李逍遥',
				country: '山东',
				allScore: '总分数',
				scoreNumber: 59,
				ppdNumber: 51,
				mprNumber: 65,
				resultList: [
					{
						id: 1,
						name: 'Set 结果',
						win: 15,
						draw: 20,
						lost: 25,
						probability: 80
					},
					{
						id: 1,
						name: 'Match 结果',
						win: 15,
						draw: 20,
						lost: 25,
						probability: 80
					}
				]
			},
			showTeamInfo: () => {
				console.log('111');
			},
			showDetail: () => {
				console.log('222');
			},
			leftClick: () => {
				const box = document.getElementById('myBox') as HTMLElement;
				if (currentIndex.value === 0) {
					currentIndex.value = 0;
				} else {
					currentIndex.value -= 1;
				}
				if (currentPosition === 0) {
					currentPosition = 0;
				} else {
					currentPosition += 320;
				}
				box.style.left = `${currentPosition}px`;
			},
			rightClick: () => {
				const box = document.getElementById('myBox') as HTMLElement;
				if (currentIndex.value === data.infoData.resultList.length - 1) {
					currentIndex.value = data.infoData.resultList.length - 1;
				} else {
					currentIndex.value += 1;
				}
				if (Math.abs(currentPosition) === (data.infoData.resultList.length - 1) * 320) {
					currentPosition = -(data.infoData.resultList.length - 1) * 320;
				} else {
					currentPosition -= 320;
				}
				box.style.left = `${currentPosition}px`;
			}
		});
		onMounted(() => {
			console.log(route.query);
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
	width: 80%;
	margin: 0 auto;
}
.allBox {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-right: 1px solid #fff;
}
.carousel {
	border-left: 1px solid #fff;
	display: flex;
	height: 180px;
	position: relative;
	overflow: hidden;
}
.firstClass {
	height: 140px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	text-align: left;
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
	cursor: pointer;
}
.icon {
	position: relative;
	top: 1px;
}
.title {
	font-size: 20px;
	font-weight: bold;
	color: #fff;
}
.matchBox {
	height: 90%;
	color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
.fontStyle {
	display: flex;
	width: 100%;
	justify-content: space-around;
}
.right {
	width: 60%;
}
.right >>> .ant-progress-text {
	color: #fff;
}
.iconFont {
	color: #fff;
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
}
.centerBox {
	width: 270px;
	margin: 0 25px;
}
.animate__backOutRight {
	transition: all 1s ease;
}
.myYuan >>> .ant-progress-inner {
	width: 100px !important;
	height: 100px !important;
}
.progressBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
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
	background: #fff;
}
.isActived {
	background: red;
}
</style>
