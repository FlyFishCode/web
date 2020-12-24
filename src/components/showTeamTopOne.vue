<template>
	<div>
		<a-row class="teamRow">
			<a-col :span="6" class="allBox">
				<a-col :span="12" class="firstClass">
					<img class="imgBg" :src="infoData.img" alt="" />
				</a-col>
				<a-col :span="12" class="firstClass FONT">
					<div class="teamName" @click="showTeamInfo">{{ infoData.teamName }}</div>
					<div class="disabledClass">{{ infoData.captainName }}</div>
					<div v-if="infoData.address" class="disabledClass">
						{{ infoData.address }}
						<span @click="showDetail" class="icon">
							<EnvironmentOutlined />
						</span>
					</div>
					<div class="disabledClass">{{ infoData.country }}</div>
				</a-col>
			</a-col>
			<a-col :span="4" class="allBox">
				<div class="secondClass">
					<div class="bigFont">{{ '总积分' }}</div>
					<div class="score">{{ infoData.score }}</div>
				</div>
			</a-col>
			<!-- // 左侧按钮 -->
			<a-col :span="7" class="carousel">
				<a-col :span="2" class="iconFont leftIcon">
					<LeftCircleOutlined @click="leftClick" />
				</a-col>
				<a-col class="center animate__backOutRight" id="myBox">
					<div v-for="item in infoData.resultList" :key="item.id" class="centerBox">
						<div class="matchBox">
							<div class="title">{{ item.title }}</div>
							<div class="fontStyle">
								<div class="left">
									<div>{{ '胜' }}</div>
									<div>{{ '败' }}</div>
									<div>{{ '和' }}</div>
									<div>{{ '胜率' }}</div>
								</div>
								<div class="right">
									<div>
										<a-progress :percent="item.win" strokeColor="red" :format="(percent) => `${percent}`" />
									</div>
									<div>
										<a-progress :percent="item.draw" strokeColor="red" :format="(percent) => `${percent}`" />
									</div>
									<div>
										<a-progress :percent="item.lost" strokeColor="red" :format="(percent) => `${percent}`" />
									</div>
									<div>
										<a-progress :percent="item.probability" strokeColor="red">
											<template v-slot:format="percent">
												{{ percent }}
											</template>
										</a-progress>
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
			<a-col :span="7">
				<div class="title">{{ $t('default.183') }}</div>
				<a-progress type="circle" class="myYuan" :percent="infoData.rating" :format="(percent) => `${percent}`" />
				<div class="myProgress">
					<div class="myProgressBox">
						<div>
							<a-progress :percent="infoData.ppd" strokeColor="red" :format="(percent) => `${percent}`" />
						</div>
						<div>{{ `PPD    ${infoData.ppd}` }}</div>
					</div>
					<div class="myProgressBox">
						<div>
							<a-progress :percent="infoData.mpr" strokeColor="red" :format="(percent) => `${percent}`" />
						</div>
						<div>{{ `MPR    ${infoData.mpr}` }}</div>
					</div>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, ref, watch } from 'vue';
import { EnvironmentOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';

const getNewData = (obj: any) => {
	const data = {
		img: obj.teamImg,
		teamName: obj.teamName,
		captainName: obj.captainName,
		address: obj.shop && obj.shop.shopAddress,
		country: obj.shop && obj.shop.countryName,
		score: obj.score,
		rating: obj.competitionRating && obj.competitionRating.rating,
		ppd: obj.competitionRating && obj.competitionRating.ppd,
		mpr: obj.competitionRating && obj.competitionRating.mpr,
		resultList: [
			{
				title: 'Set 结果',
				win: obj.setResult.wins,
				draw: obj.setResult.draws,
				lost: obj.setResult.losses,
				probability: parseInt(obj.setResult.winProbability)
			},
			{
				title: 'Match 结果',
				win: obj.matchResult.wins,
				draw: obj.matchResult.draws,
				lost: obj.matchResult.losses,
				probability: parseInt(obj.matchResult.winProbability)
			}
		]
	};
	return data;
};

interface DataProps {
	infoData: {
		resultList: Array<any>;
	};
}

export default {
	name: 'showTeamTopOne',
	props: ['teamObj'],
	components: {
		EnvironmentOutlined,
		LeftCircleOutlined,
		RightCircleOutlined
	},
	setup(prop: any) {
		let currentPosition = 0;
		const currentIndex = ref(0);
		const data: DataProps = reactive({
			infoData: {
				resultList: [],
				rating: 0,
				ppd: 0,
				mpr: 0
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
					currentPosition += 300;
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
				if (Math.abs(currentPosition) === (data.infoData.resultList.length - 1) * 300) {
					currentPosition = -(data.infoData.resultList.length - 1) * 300;
				} else {
					currentPosition -= 300;
				}
				box.style.left = `${currentPosition}px`;
			}
		});
		watch(
			() => prop.teamObj,
			(val) => {
				data.infoData = getNewData(val);
			}
		);
		return {
			...toRefs(data),
			currentIndex
		};
	}
};
</script>
<style scoped>
.teamRow {
	height: 190px;
	margin: 10px 0;
	padding: 5px;
	background: #555;
	box-sizing: border-box;
}
.imgBg {
	width: 100%;
}
.allBox {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-right: 1px solid #fff;
}
.carousel {
	border-right: 1px solid #fff;
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
}
.icon {
	position: relative;
	top: 1px;
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
	justify-content: center;
}
.right {
	width: 70%;
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
	width: 280px;
	margin: 0 8px;
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
	background: #fff;
}
.isActived {
	background: red;
}
</style>
