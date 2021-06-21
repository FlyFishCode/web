<template>
	<div>
		<a-row class="rowStyle">
			<a-col :span="8" class="allBox">
				<a-col :span="12" class="firstClass">
					<img class="imgBg" :src="infoData.img" alt="" />
				</a-col>
				<a-col :span="12" class="firstClass FONT">
					<div class="teamName" @click="showTeamInfo">{{ infoData.playerName }}</div>
					<div class="disabledClass">{{ infoData.shopName }}</div>
					<div v-if="infoData.shopAddress" class="disabledClass">
						{{ infoData.shopAddress }}
						<span @click="showDetail" class="icon">
							<EnvironmentOutlined />
						</span>
					</div>
					<div class="disabledClass">{{ infoData.country }}</div>
				</a-col>
			</a-col>
			<a-col :span="9">
				<div class="title">{{ 'Rating' }}</div>
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

			<!-- // 左侧按钮 -->
			<a-col :span="7" class="carousel">
				<a-col :span="2" class="iconFont leftIcon">
					<LeftCircleOutlined @click="leftClick" />
				</a-col>
				<a-col class="center animate__backOutRight" id="Box">
					<div v-for="item in infoData.resultList" :key="item.id" class="centerBox">
						<div class="matchBox">
							<div class="title">{{ item.title }}</div>
							<div class="fontStyle">
								<div class="left">
									<div v-for="key of Object.keys(item)" :key="key">
										<div v-if="key !== 'title'">{{ key }}</div>
									</div>
								</div>
								<div class="right">
									<div v-for="value of Object.values(item)" :key="item[value]">
										<div v-if="typeof value !== 'string'"><a-progress :percent="value" strokeColor="red" :format="(percent) => `${percent}`" /></div>
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
import { reactive, toRefs, ref, watch, onMounted } from 'vue';
import { EnvironmentOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';

interface DataProps {
	infoData: {
		resultList: Array<any>;
	};
}

const getNewData = (obj: any) => {
	debugger
	const data = {
		img: obj.playerImg || '',
		playerName: obj.playerName || '',
		shopName: obj.shop && obj.shop.shopName || '',
		shopAddress: obj.shop && obj.shop.shopAddress || '',
		country: obj.shop && obj.shop.countryName || '',
		rating: obj.playerRating && obj.playerRating.rating || 0,
		ppd: obj.playerRating && obj.playerRating.ppd || 0,
		mpr: obj.playerRating && obj.playerRating.mpr || 0,
		resultList: [
			{
				title: 'Award 01',
				LT: obj.playerResultDetails && obj.playerResultDetails.lowTon || 0,
				HT: obj.playerResultDetails && obj.playerResultDetails.highTon || 0,
				'LT.OFF': obj.playerResultDetails && obj.playerResultDetails.lowTonOut || 0,
				'HT.OFF': obj.playerResultDetails && obj.playerResultDetails.highTonOut || 0
			},
			{
				title: 'Award 02',
				HAT: obj.playerResultDetails && obj.playerResultDetails.hatTrick || 0,
				BED: obj.playerResultDetails && obj.playerResultDetails.threeInBed || 0,
				180: obj.playerResultDetails && obj.playerResultDetails.ton80 || 0,
				Black: obj.playerResultDetails && obj.playerResultDetails.threeInBlack || 0
			},
			{
				title: 'Award 03',
				'5M': obj.playerResultDetails && obj.playerResultDetails.fiveMarks || 0,
				'6M': obj.playerResultDetails && obj.playerResultDetails.sixMarks || 0,
				'7M': obj.playerResultDetails && obj.playerResultDetails.sevenMarks || 0,
				'8M': obj.playerResultDetails && obj.playerResultDetails.eightMarks || 0
			},
			{
				title: 'Award 04',
				'9M': obj.playerResultDetails && obj.playerResultDetails.nineMarks || 0,
				WH: obj.playerResultDetails && obj.playerResultDetails.whiteHorse || 0
			}
		]
	};
	debugger;
	return data;
};

export default {
	name: 'showPersonalTopOne',
	components: {
		EnvironmentOutlined,
		LeftCircleOutlined,
		RightCircleOutlined
	},
	props: ['playerObj'],
	setup(prop: any) {
		let currentPosition = 0;
		const currentIndex = ref(0);
		const data: DataProps = reactive({
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
					currentPosition += 300;
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
				if (Math.abs(currentPosition) === (data.infoData.resultList.length - 1) * 300) {
					currentPosition = -(data.infoData.resultList.length - 1) * 300;
				} else {
					currentPosition -= 300;
				}
				box.style.left = `${currentPosition}px`;
			}
		});
		watch(
			() => prop.playerObj,
			(val) => {
				data.infoData = getNewData(val);
				console.log(data.infoData)
			}
		);
		onMounted(() => {
			data.infoData = getNewData(prop.playerObj);
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
.carousel {
	border-left: 1px solid #fff;
	display: flex;
	height: 180px;
	position: relative;
	overflow: hidden;
}
.firstClass {
	width: 100px;
	height: 100px;
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
	color: #fff;
}
.matchBox {
	height: 90%;
	color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
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
	right: 2px;
	top: calc(50% - 10px);
}
.centerBox {
	width: 280px;
	margin: 0 10px;
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
