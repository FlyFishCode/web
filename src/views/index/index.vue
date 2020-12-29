<template>
	<div>
		<div class="carouselBox">
			<h1>{{ $t('default.12') }}</h1>
			<a-carousel arrows :autoplay="true" dotsClass="dots">
				<template #prevArrow>
					<div class="custom-slick-arrow" style="left: 10px;zIndex: 1">
						<LeftCircleOutlined />
					</div>
				</template>
				<template #nextArrow>
					<div class="custom-slick-arrow" style="right: 10px">
						<RightCircleOutlined />
					</div>
				</template>
				<div v-for="item in mainList" :key="item.id" @click="intoPhoto(item.link)" class="photoLink"><img :src="item.image" /></div>
			</a-carousel>
		</div>
		<a-row class="rowStyle" type="flex" justify="space-between">
			<a-col :lg="14" :xs="24">
				<a-col class="newHeader">
					<a-col :lg="6" :xs="6" class="newSstyle">{{ $t('default.12') }}</a-col>
					<a-col :lg="12" :xs="12">{{ `${$t('default.19')}：${time}` }}</a-col>
					<a-col :lg="6" :xs="6" class="moreStyle" @click="infoNews">{{ $t('default.25') }}</a-col>
				</a-col>
				<a-col class="newsTable">
					<div v-for="news in newsList" :key="news.id" class="newBg" @click="entryInfo(news.id)">
						<div class="newBox">
							<img :src="news.img" alt="" />
						</div>
						<div class="newContentStyle">
							<div class="newTitle">{{ news.title }}</div>
							<div :title="news.contents" class="newContent" v-html="news.contents"></div>
							<div class="newIcon">
								<span> <ScheduleOutlined /> {{ news.date }} </span>
								<span> <EyeOutlined /> {{ news.visitCount }} </span>
							</div>
						</div>
					</div>
				</a-col>
			</a-col>
			<a-col :lg="8" :xs="24">
				<div class="newHeader">
					<div class="newSstyle">{{ 'PROMOTION' }}</div>
				</div>
				<div class="carouselBox">
					<a-carousel arrows :autoplay="true" dotsClass="dots">
						<template #prevArrow>
							<div class="custom-slick-arrow" style="left: 10px;zIndex: 1">
								<LeftCircleOutlined />
							</div>
						</template>
						<template #nextArrow>
							<div class="custom-slick-arrow" style="right: 10px">
								<RightCircleOutlined />
							</div>
						</template>
						<div v-for="item in viceList" :key="item.id" @click="intoPhoto(item.link)" class="photoLink"><img :src="item.image" /></div>
					</a-carousel>
				</div>
				<div class="otherSrcBox">
					<div>
						<QqOutlined />
					</div>
					<div>
						<WechatOutlined />
					</div>
					<div>
						<ZhihuOutlined />
					</div>
					<div>
						<AppleOutlined />
					</div>
				</div>
			</a-col>
		</a-row>

		<divTitle :msg="title" :span="colSpan" :showMore="true" :path="leaguePath" />

		<a-row class="bg">
			<a-col :lg="8" :xs="24" class="titleCol">
				<a-col :lg="2" :xs="3" class="titleStyle">
					<AimOutlined style="fontSize:20px" />
				</a-col>
				<a-col :lg="4" :xs="4" class="MlineStyle">{{ $t('default.27') }}</a-col>
				<a-col :lg="9" :xs="8">
					<a-select v-model:value="countryId" @change="countryChange" class="selectBox">
						<a-select-option v-for="item in countryList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="9" :xs="8">
					<a-select v-model:value="areaId" @change="areaChange" class="selectBox">
						<a-select-option v-for="item in areaList" :key="item.areaId" :value="item.areaId">{{ item.areaName }}</a-select-option>
					</a-select>
				</a-col>
			</a-col>

			<a-col :lg="{ span: 8, offset: 8 }" :xs="24" class="titleCol">
				<a-col :lg="3" :xs="3" class="titleStyle">
					<SearchOutlined style="fontSize:20px" />
				</a-col>
				<a-col :lg="6" :xs="4" class="MlineStyle">{{ $t('default.15') }}</a-col>
				<a-col :lg="15" :xs="16">
					<a-input-search v-model:value="leagueName" :enter-button="$t('default.16')" allowClear @search="onSearch" />
				</a-col>
			</a-col>
		</a-row>

		<div v-if="matchList.length">
			<a-row v-for="item in matchList" :key="item.matchId" class="matchBox">
				<a-col :lg="14" :xs="8">
					<a-col :span="4">
						<img class="matchImg" :src="item.competitionImg" />
					</a-col>
					<a-col :span="18">
						<div class="divBg">
							<div>{{ item.competitionName }}</div>
							<div class="divClass" v-for="div in item.divisionList" :key="div.divisionId">
								<a-button type="danger" size="small" @click="entryPage(item.competitionId, div.divisionId)">{{ div.divisionName }}</a-button>
							</div>
						</div>
					</a-col>
				</a-col>
				<a-col :lg="2" :xs="6">
					<div class="fontDisplay">{{ $t('default.27') }}</div>
					<div>{{ item.areaName }}</div>
				</a-col>
				<a-col :lg="8" :xs="10">
					<a-col class="rightStyle">
						<a-col :lg="18" :xs="16" class="fontDisplay">{{ $t('default.17') }}</a-col>
						<a-col :lg="4" :xs="8" class="matchState I" v-if="item.status === 1">{{ $t('default.243') }}</a-col>
						<a-col :lg="4" :xs="8" class="matchState R" v-if="item.status === 2">{{ $t('default.104') }}</a-col>
						<a-col :lg="4" :xs="8" class="matchState F" v-if="item.status === 3">{{ $t('default.244') }}</a-col>
					</a-col>
					<!-- <div>{{ $filters.filterDate(item) }}</div> -->
					<a-col>{{ item.date }}</a-col>
				</a-col>
			</a-row>
		</div>
		<div v-else>
			<emptyList />
		</div>

		<divTitle :msg="matchTitle" :span="colSpan" :showMore="true" :path="rankingPath" />

		<a-row class="rowStyle inPhoneTableDisplay">
			<a-tabs class="tabsBox" type="card">
				<a-tab-pane key="1" :tab="$t('default.9')" class="teamBG">
					<a-col :span="7" class="colStyle" v-for="every in teamList" :key="every.index">
						<div class="gameStyle">{{ every.title }}</div>
						<div v-for="(item, index) in every.list" :key="index" class="teamBox">
							<div :class="{ first: !index, noFirst: index }">
								<div class="teamImgBox">
									<img :src="item.teamImg" />
								</div>
								<div v-if="!index" class="detailStyle">
									<div class="teamName" @click="entryTeamPage(item.teamId)">{{ item.teamName }}</div>
									<div class="name">{{ item.captainName }}</div>
									<div class="area">
										{{ item.shopAddress }}
										<span @click="showDetail(item)">
											<EnvironmentOutlined />
										</span>
									</div>
									<div class="current">{{ every.type }}</div>
									<div class="number">{{ item.teamScore }}</div>
								</div>
								<div v-else class="detailStyle">
									<div class="name smallBox" @click="entryTeamPage(item.teamId)">{{ item.teamName }}</div>
									<div class="area">
										{{ item.shopAddress }}
										<span @click="showDetail(item)">
											<EnvironmentOutlined />
										</span>
									</div>
									<div class="current">
										<span>{{ every.type }}</span> <span>{{ item.teamScore }}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="more">
							<div @click="entryRanking('ranking', '1')">{{ `${$t('default.25')} +` }}</div>
						</div>
					</a-col>
				</a-tab-pane>
				<a-tab-pane key="2" :tab="$t('default.10')" class="teamBG">
					<a-col :span="7" class="colStyle" v-for="every in playerList" :key="every.index">
						<div class="gameStyle">{{ every.title }}</div>
						<div v-for="(item, index) in every.list" :key="index" class="teamBox">
							<div :class="{ first: !index, noFirst: index }">
								<div class="teamImgBox">
									<img :src="item.playerImg" alt="" />
								</div>
								<div v-if="!index" class="detailStyle">
									<div class="teamName" @click="entryPlayerPage(item.playerId)">{{ item.playerName }}</div>
									<div class="name">{{ item.name }}</div>
									<div class="area">
										{{ item.shopAddress }}
										<span @click="showDetail(item)">
											<EnvironmentOutlined />
										</span>
									</div>
									<div class="current">{{ every.type }}</div>
									<div class="number">{{ item.playerScore }}</div>
								</div>
								<div v-else class="detailStyle">
									<div class="name smallBox" @click="entryPlayerPage(item.playerId)">{{ item.playerName }}</div>
									<div class="area">
										{{ item.shopAddress }}
										<span @click="showDetail(item)">
											<EnvironmentOutlined />
										</span>
									</div>
									<div class="current">
										<span>{{ every.type }}</span> <span>{{ item.playerScore }}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="more">
							<div @click="entryRanking('ranking', '3')">{{ `${$t('default.25')} +` }}</div>
						</div>
					</a-col>
				</a-tab-pane>
			</a-tabs>
		</a-row>

		<div class="showPhoneTable">
			<a-row class="isPhone">
				<a-col :span="12" class="buttonBox">
					<a-button :type="isTeam ? 'primary' : ''" @click="showTeamBox">{{ $t('default.9') }}</a-button>
				</a-col>
				<a-col :span="12" class="buttonBox">
					<a-button :type="isTeam ? '' : 'primary'" @click="showPlayerBox">{{ $t('default.10') }}</a-button>
				</a-col>
			</a-row>

			<a-row v-show="isTeam" class="inPhone">
				<a-carousel arrows>
					<template #prevArrow>
						<div class="custom-slick-arrow" style="left: 10px;zIndex: 1">
							<left-circle-outlined />
						</div>
					</template>
					<template #nextArrow>
						<div class="custom-slick-arrow" style="right: 10px">
							<right-circle-outlined />
						</div>
					</template>
					<div :span="7" class="colStyle" v-for="every in teamList" :key="every.index">
						<div class="gameStyle">{{ every.title }}</div>
						<div v-for="(item, index) in every.list" :key="index" class="teamBox">
							<div :class="{ first: !index, noFirst: index }">
								<div class="teamImgBox">
									<img :src="item.teamImg" />
								</div>
								<div v-if="!index" class="detailStyle">
									<div class="teamName" @click="entryTeamPage(item.teamId)">{{ item.teamName }}</div>
									<div class="name">{{ item.captainName }}</div>
									<div class="area">
										{{ item.shopAddress }}
										<span @click="showDetail(item)">
											<EnvironmentOutlined />
										</span>
									</div>
									<div class="current">{{ every.type }}</div>
									<div class="number">{{ item.teamScore }}</div>
								</div>
								<div v-else class="detailStyle">
									<div class="name smallBox" @click="entryTeamPage(item.teamId)">{{ item.teamName }}</div>
									<div class="area">
										{{ item.shopAddress }}
										<span @click="showDetail(item)">
											<EnvironmentOutlined />
										</span>
									</div>
									<div class="current">
										<span>{{ every.type }}</span> <span>{{ item.teamScore }}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="more">
							<div @click="entryRanking('ranking', '1')">{{ `${$t('default.25')} +` }}</div>
						</div>
					</div>
				</a-carousel>
			</a-row>

			<a-row v-show="!isTeam" class="inPhone">
				<a-carousel arrows>
					<template #prevArrow>
						<div class="custom-slick-arrow" style="left: 10px;zIndex: 1">
							<left-circle-outlined />
						</div>
					</template>
					<template #nextArrow>
						<div class="custom-slick-arrow" style="right: 10px">
							<right-circle-outlined />
						</div>
					</template>
					<div :span="7" class="colStyle" v-for="every in playerList" :key="every.index">
						<div class="gameStyle">{{ every.title }}</div>
						<div v-for="(item, index) in every.list" :key="index" class="teamBox">
							<div :class="{ first: !index, noFirst: index }">
								<div class="teamImgBox">
									<img :src="item.playerImg" alt="" />
								</div>
								<div v-if="!index" class="detailStyle">
									<div class="teamName" @click="entryPlayerPage(item.playerId)">{{ item.playerName }}</div>
									<div class="name">{{ item.name }}</div>
									<div class="area">
										{{ item.shopAddress }}
										<span @click="showDetail(item)">
											<EnvironmentOutlined />
										</span>
									</div>
									<div class="current">{{ every.type }}</div>
									<div class="number">{{ item.playerScore }}</div>
								</div>
								<div v-else class="detailStyle">
									<div class="name smallBox" @click="entryPlayerPage(item.playerId)">{{ item.playerName }}</div>
									<div class="area">
										{{ item.shopAddress }}
										<span @click="showDetail(item)">
											<EnvironmentOutlined />
										</span>
									</div>
									<div class="current">
										<span>{{ every.type }}</span> <span>{{ item.playerScore }}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="more">
							<div @click="entryRanking('ranking', '3')">{{ `${$t('default.25')} +` }}</div>
						</div>
					</div>
				</a-carousel>
			</a-row>
		</div>

		<a-modal v-model:visible="visible" :title="dialogObj.title">
			<template v-slot:footer>
				<a-row class="rowStyle dialogBox">
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
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import {
	AimOutlined,
	SearchOutlined,
	EyeOutlined,
	ScheduleOutlined,
	EnvironmentOutlined,
	QqOutlined,
	WechatOutlined,
	ZhihuOutlined,
	AppleOutlined,
	LeftCircleOutlined,
	RightCircleOutlined
} from '@ant-design/icons-vue';
import divTitle from '@/components/DividingLine.vue';
import { indexTeamHttp, indexPlayerHttp, indexCountryHttp, indexCityHttp, indexNewsHttp, indexCarouselHttp, leagueListHttp } from '@/axios/api';
import emptyList from '@/components/common/emptyList.vue';
import { useRouter } from 'vue-router';
interface DataProps {
	click: () => void;
}
export default defineComponent({
	components: {
		AimOutlined,
		SearchOutlined,
		EyeOutlined,
		ScheduleOutlined,
		divTitle,
		EnvironmentOutlined,
		QqOutlined,
		WechatOutlined,
		ZhihuOutlined,
		AppleOutlined,
		LeftCircleOutlined,
		RightCircleOutlined,
		emptyList
	},
	name: 'index',
	setup() {
		const ROUTER = useRouter();
		const data = reactive({
			isTeam: true,
			leaguePath: 'league',
			rankingPath: 'ranking',
			img: require('@/assets/logo.png'),
			leagueName: '',
			title: 'default.134',
			matchTitle: 'default.18',
			lastDate: new Date(),
			time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
			colSpan: 4,
			visible: false,
			dialogObj: {
				title: '',
				img: '',
				shopName: '',
				phone: '',
				address: ''
			},
			countryId: null,
			areaId: null,
			newsList: [],
			countryList: [],
			areaList: [],
			mainList: [],
			viceList: [],
			matchList: [],
			teamList: [],
			playerList: [],
			getDate: () => {
				return data.time;
				// const year = new Date().getFullYear();
				// const month = new Date().getMonth() + 1;
				// const day = new Date().getDay();
				// return `${year}-${month}-${day}`;
			},
			entryRanking: (path: string, value: string) => {
				ROUTER.push({
					path,
					query: { value }
				});
			},
			onSearch: () => {
				const obj = {
					countryId: data.countryId,
					areaId: data.areaId,
					number: 5,
					competitionName: data.leagueName
				};
				leagueListHttp(obj).then((res) => {
					data.matchList = res.data.data;
				});
			},
			infoNews: () => {
				ROUTER.push('/news');
			},
			entryInfo: (id: number) => {
				ROUTER.push({
					path: '/newsInfo',
					query: { value: id }
				});
			},
			intoPhoto: (value: string) => {
				console.log(value);
			},
			showDetail: (item: any) => {
				data.dialogObj.title = item.shopAddress;
				data.dialogObj.shopName = item.shopName;
				data.dialogObj.phone = item.shopPhone;
				data.dialogObj.address = item.shopAddress;
				data.visible = true;
			},
			handleOk: () => {
				data.visible = false;
			},
			entryPlayerPage: (playerId: number) => {
				ROUTER.push({
					path: 'playerInfo',
					query: {
						playerId
					}
				});
			},
			entryTeamPage: (teamId: number) => {
				ROUTER.push({
					path: 'teamInfo',
					query: {
						teamId
					}
				});
			},
			entryPage: (competitionId: any, divisionId: number) => {
				ROUTER.push({
					path: '/calendar',
					query: {
						competitionId,
						divisionId
					}
				});
			},
			countryChange: (value: number) => {
				indexCityHttp({ countryId: value }).then((res) => {
					data.areaList = res.data.data;
					if (data.areaList.length) {
						data.areaId = data.areaList[0]['areaId'];
					} else {
						data.areaId = null;
					}
					data.onSearch();
				});
			},
			areaChange: () => {
				data.onSearch();
			},
			showTeamBox: () => {
				data.isTeam = true;
			},
			showPlayerBox: () => {
				data.isTeam = false;
			}
		});
		const getCarouselList = () => {
			indexCarouselHttp({
				countryId: sessionStorage.getItem('countryId')
			}).then((res) => {
				[data.mainList, data.viceList] = [res.data.data.main, res.data.data.vice];
			});
		};
		const getTeamList = () => {
			indexTeamHttp({ countryId: sessionStorage.getItem('countryId') }).then((res) => {
				data.teamList = res.data.data;
			});
		};
		const getPlayerList = () => {
			indexPlayerHttp({ countryId: sessionStorage.getItem('countryId') }).then((res) => {
				data.playerList = res.data.data;
			});
		};
		const getNewsList = () => {
			indexNewsHttp({ countryId: sessionStorage.getItem('countryId') }).then((res) => {
				data.newsList = res.data.data;
			});
		};
		const getCountryList = () => {
			indexCountryHttp().then((res) => {
				if (res.data.data.length) {
					data.countryList = res.data.data;
					data.countryId = data.countryList[0]['countryId'];
					data.countryChange(data.countryList[0]['countryId']);
				}
			});
		};
		const init = () => {
			getTeamList();
			getPlayerList();
			getNewsList();
			getCarouselList();
			getCountryList();
			// const pending = 'pending',
			// 	success = 'success',
			// 	failed = 'failed';
			// class Mypromise {
			// 	status = pending;
			// 	value: any;
			// 	errer: any;
			// 	constructor(C: any) {
			// 		const resolve = (value: any) => {
			// 			if (this.status === 'pending') {
			// 				this.status = success;
			// 				this.value = value;
			// 			}
			// 		};
			// 		const reject = (errer: any) => {
			// 			if (this.status === 'pending') {
			// 				this.status = failed;
			// 				this.errer = errer;
			// 			}
			// 		};
			// 		C(resolve, reject);
			// 	}
			// 	then(onSuccess: Function, onFailed: Function) {
			// 		if (this.status === 'success') {
			// 			onSuccess(this.value);
			// 		}
			// 		if (this.status === 'failed') {
			// 			onFailed(this.errer);
			// 		}
			// 	}
			// }
			// const promise = new Mypromise((resolve: any, reject: any) => {
			// 	console.log('This is MyPromise');
			// 	// resolve('成功');
			// 	reject('失败');
			// });
			// promise.then(
			// 	(res: string) => {
			// 		console.log(res);
			// 	},
			// 	(error: string) => {
			// 		console.log(error);
			// 	}
			// );
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>
<style scoped>
.SlineStyle {
	line-height: 24px;
	height: 24px;
}
.MlineStyle {
	line-height: 32px;
	height: 32px;
}
.newBg {
	padding: 0 1px;
	width: 50%;
	cursor: pointer;
}
.newBox {
	height: 250px;
	width: 100%;
}
.newBox img {
	height: 100%;
	width: 100%;
}
.bg {
	border: 1px solid #e5e5e5;
	box-sizing: border-box;
	background: #f3f3f3;
}
.dropBox {
	width: 100%;
}
.matchImg {
	height: 40px;
}
.matchBox {
	height: 80px;
	border: 1px solid #d4d4d4;
	margin: 10px;
	display: flex;
	align-items: center;
}
.rightStyle {
	display: flex;
	justify-content: space-around;
}
.fontDisplay {
	color: #999;
}
.matchState {
	color: #fff;
	border-radius: 10px;
}
.I {
	background: red;
}
.R {
	background: red;
}
.F {
	background: #d9d9d9;
	color: #797878;
}
.first .teamImgBox {
	height: 100px;
}
.noFirst .teamImgBox {
	height: 60px;
}
.teamImgBox img {
	height: 100%;
}
.first {
	height: 150px;
	display: flex;
	justify-content: space-around;
}
.first .detailStyle {
	text-align: left;
}
.first .teamName {
	font-size: 20px;
}
.first .name {
	font-weight: bold;
}
.first .current {
	width: 60px;
	text-align: center;
	font-weight: bold;
	color: #fff;
	background: #000;
	border-radius: 10px;
}
.first .number {
	font-size: 25px;
	color: red;
	font-weight: bold;
}
.colStyle {
	border: 1px solid #999;
}
.gameStyle {
	height: 30px;
	line-height: 30px;
	font-size: 20px;
	background: #000;
	color: #fff;
}
.noFirst {
	display: flex;
	min-height: 60px;
	padding-left: 25px;
}
.noFirst .current {
	color: red;
}
.noFirst .detailStyle {
	margin-left: 20px;
	text-align: left;
}
.teamBox {
	background: #eee;
	margin: 5px 0;
	padding: 5px;
	box-sizing: border-box;
}
.area span {
	cursor: pointer;
}
.more {
	height: 50px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.more div {
	width: 60px;
	height: 22px;
	border: 1px solid #000;
	margin: 0 5px;
	cursor: pointer;
}
.more div:hover {
	opacity: 0.5;
}
.teamBG {
	display: flex;
	justify-content: space-around;
}
.tabsBox >>> .ant-tabs-nav-scroll {
	display: flex;
}
.newContentStyle {
	text-align: left;
	margin: 5px 0;
}
.newTitle {
	font-size: 25px;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.dialogBtn {
	text-align: center;
}
.dialogBox {
	height: 100px;
	color: #ff3202;
	border: 1px solid #eee;
}
.dialog {
	text-align: left;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.info {
	width: 220px;
	text-align: left;
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
.teamName,
.smallBox {
	cursor: pointer;
}
.teamName:hover,
.smallBox:hover {
	text-decoration: underline;
}
.newHeader {
	display: flex;
	height: 40px;
	line-height: 40px;
	color: #fff;
	background: #2b2b2b;
	margin: 15px 0;
	font-size: 20px;
	font-weight: bold;
	justify-content: space-between;
}
.newSstyle {
	background: red;
}
.moreStyle {
	cursor: pointer;
}
.moreStyle:hover {
	color: #1890ff;
}
.newsTable {
	display: flex;
	justify-content: space-around;
}
.newIcon {
	display: flex;
	justify-content: space-around;
}
.otherSrcBox {
	display: flex;
	justify-content: space-around;
}
.otherSrcBox div {
	width: 80px;
	height: 80px;
	font-size: 50px;
	cursor: pointer;
	background: #eee;
	border-radius: 10px;
	margin-top: 5px;
}
.divisionBox {
	display: flex;
	height: 25px;
	line-height: 25px;
	margin-right: 3px;
}
.divsision {
	border: 1px solid #000;
	padding: 0 2px;
	margin: 0 4px;
	text-decoration: underline;
}
.divBg {
	text-align: left;
}
.carouselBox .ant-carousel ::v-deep(.slick-slide) {
	text-align: center;
	height: 250px;
	line-height: 250px;
	background: #364d79;
	overflow: hidden;
}

.carouselBox .ant-carousel ::v-deep(.slick-arrow.custom-slick-arrow) {
	width: 25px;
	height: 25px;
	font-size: 25px;
	color: #fff;
	background-color: rgba(31, 45, 61, 0.11);
	opacity: 0.3;
}
.inPhone .ant-carousel ::v-deep(.slick-slide) {
	text-align: center;
	background: #364d79;
	overflow: hidden;
}

.inPhone .ant-carousel ::v-deep(.slick-arrow.custom-slick-arrow) {
	width: 25px;
	height: 25px;
	font-size: 25px;
	color: #fff;
	background-color: rgba(31, 45, 61, 0.11);
	opacity: 0.3;
}
.ant-carousel ::v-deep(.custom-slick-arrow:before) {
	display: none;
}
.ant-carousel ::v-deep(.custom-slick-arrow:hover) {
	opacity: 0.5;
}

.ant-carousel ::v-deep(.slick-slide h3) {
	color: #fff;
}
.titleStyle {
	display: flex;
	justify-content: center;
	align-items: center;
}
.carouselBox img {
	height: 100%;
	width: 100%;
}
.photoLink {
	cursor: pointer;
}
.isPhone {
	margin: 5px 0;
}
.divClass {
	display: flex;
	justify-content: flex-start;
}
.divClass div {
	margin: 0 2px;
}
</style>
