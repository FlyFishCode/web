<template>
	<div>
		<a-row class="rowStyle">
			<a-col :span="8" class="allBox">
				<a-col :span="12" class="firstClass">
					<img class="imgBg" :src="infoData.playerImg" alt="" />
				</a-col>
				<a-col :span="12" class="firstClass FONT">
					<div class="teamName" @click="showTeamInfo">{{ infoData.playerName }}</div>
					<div v-if="infoData.shopName" class="disabledClass">
						<span>{{ infoData.shopName }}</span>
						<span @click="showDetail(infoData)" class="icon">
							<EnvironmentOutlined />
						</span>
					</div>
				</a-col>
			</a-col>
			<a-col :span="3" class="progressBox">
				<div class="title">{{ $t('default.184') }}</div>
				<a-progress type="circle" class="myYuan" :percent="infoData.rating" :format="(percent) => `${percent}`" />
			</a-col>
			<a-col :span="3" class="progressBox">
				<div class="title">{{ $t('default.169') }}</div>
				<a-progress type="circle" class="myYuan" :percent="infoData.ppd" :format="(percent) => `${percent}`" />
			</a-col>
			<a-col :span="3" class="progressBox">
				<div class="title">{{ $t('default.170') }}</div>
				<a-progress type="circle" class="myYuan" :percent="infoData.mpr" :format="(percent) => `${percent}`" />
			</a-col>
			<!-- // 左侧按钮 -->
			<a-col :span="7" class="carousel">
				<a-col :span="2" class="iconFont leftIcon">
					<LeftCircleOutlined @click="leftClick" />
				</a-col>
				<a-col class="center animate__backOutRight" id="playerBox">
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
		</a-row>
		<a-modal v-model:visible="visible" :title="dialogObj.title" centered>
			<template v-slot:footer>
				<a-row class="dialogBox">
					<a-col :span="8">
						<div class="imgBox">
							<img :src="dialogObj.img" alt="" />
						</div>
					</a-col>
					<a-col :span="16" class="dialog">
						<div>{{ `${$t('default.28')}：${dialogObj.shopName}` }}</div>
						<div>{{ `${$t('default.89')}：${dialogObj.phone}` }}</div>
						<div>{{ `${$t('default.125')}：${dialogObj.address}` }}</div>
					</a-col>
				</a-row>
				<div class="dialogBtn">
					<a-button type="primary" @click="handleOk">{{ $t('default.25') }}</a-button>
				</div>
			</template>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { reactive, toRefs, onMounted, ref, watch } from 'vue';
import { EnvironmentOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';

const getNewData = (obj: any) => {
	const data = {
		playerImg: obj.playerImg,
		playerName: obj.playerName,
		shopName: obj.shop && obj.shop.shopName,
		shopImg: obj.shop && obj.shop.shopImg,
		phone: obj.shop && obj.shop.shopPhone,
		address: obj.shop && obj.shop.shopAddress,
		rating: obj.playerRating && obj.playerRating.rating,
		ppd: obj.playerRating && obj.playerRating.ppd,
		mpr: obj.playerRating && obj.playerRating.mpr,
		resultList: [
			{
				title: 'setResult',
				win: obj.setResult && obj.setResult.wins,
				draw: obj.setResult && obj.setResult.draws,
				lost: obj.setResult && obj.setResult.losses,
				winProbability: obj.setResult && Number(obj.setResult.winProbability)
			}
			// {
			// 	title: 'setResult',
			// 	win: obj.setResult.wins,
			// 	draw: obj.setResult.draws,
			// 	lost: obj.setResult.losses,
			// 	winProbability: Number(obj.setResult.winProbability)
			// }
		]
	};
	return data;
};
interface DataProps {
	visible: boolean;
	dialogObj: {
		title: string;
		img: string;
		shopName: string;
		phone: null | string;
		address: string;
	};
	infoData: {
		resultList: Array<any>;
	};
}
export default {
	name: 'rankingPlayer',
	components: {
		EnvironmentOutlined,
		LeftCircleOutlined,
		RightCircleOutlined
	},
	props: ['dataObj'],
	setup(props: any) {
		const route = useRoute();
		let currentPosition = 0;
		const currentIndex = ref(0);
		const data: DataProps = reactive({
			visible: false,
			dialogObj: {
				title: '',
				img: '',
				shopName: '',
				phone: '',
				address: ''
			},
			infoData: {
				resultList: []
			},
			showTeamInfo: () => {
				console.log('111');
			},
			handleOk: () => {
				console.log(1);
			},
			showDetail: (obj: any) => {
				debugger;
				data.dialogObj.title = obj.shopName;
				data.dialogObj.img = obj.playerImg;
				data.dialogObj.shopName = obj.shopName;
				data.dialogObj.phone = obj.phone;
				data.dialogObj.address = obj.address;
				data.visible = true;
			},
			leftClick: () => {
				const box = document.getElementById('playerBox') as HTMLElement;
				if (currentIndex.value === 0) {
					currentIndex.value = 0;
				} else {
					currentIndex.value -= 1;
				}
				if (currentPosition === 0) {
					currentPosition = 0;
				} else {
					currentPosition += 280;
				}
				box.style.left = `${currentPosition}px`;
			},
			rightClick: () => {
				const box = document.getElementById('playerBox') as HTMLElement;
				if (currentIndex.value === data.infoData.resultList.length - 1) {
					currentIndex.value = data.infoData.resultList.length - 1;
				} else {
					currentIndex.value += 1;
				}
				if (Math.abs(currentPosition) === (data.infoData.resultList.length - 1) * 280) {
					currentPosition = -(data.infoData.resultList.length - 1) * 280;
				} else {
					currentPosition -= 280;
				}
				box.style.left = `${currentPosition}px`;
			}
		});
		onMounted(() => {
			console.log(route.query);
		});
		watch(
			() => props.dataObj,
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
	display: flex;
	flex-direction: column;
	justify-content: center;
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
	right: 2px;
	top: calc(50% - 10px);
}
.centerBox {
	width: 240px;
	margin: 0 20px;
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
.imgBox {
	height: 100px;
	width: 100px;
	margin: 0 auto;
}
.imgBox img {
	width: 100%;
	height: 100%;
}
</style>
