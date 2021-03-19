<template>
	<div class="content">
		<divTitle :msg="title" :span="colSpan" />
		<a-row class="rowStyle">
			<a-col :span="14" class="centerFont"> <SettingFilled /> {{ `${$t('default.80')}(${$t('default.8')})` }} </a-col>
		</a-row>
		<a-row class="winnerListStyle">
			<a-col class="fourBox" v-for="item in bestTeam" :key="item.id">
				<div class="centerBox">
					<div class="title infoTitle">{{ item.title }}</div>
					<div class="title teamName">{{ item.teamName }}</div>
					<div>
						<div class="title">{{ item.shopName }}</div>
						<div v-if="item.rating">
							<div v-if="item.title === 'bestRating'" class="dataInfo">
								<div class="infoScore contentLeft">{{ item.rating }}</div>
								<div class="infoScore contentRight">
									<div class="matchScore">
										<div>{{ $t('default.169') }}</div>
										<div>{{ item.ppd }}</div>
									</div>
									<div class="matchScore" style="borderTop:1px solid #fff">
										<div>{{ $t('default.170') }}</div>
										<div>{{ item.mpr }}</div>
									</div>
								</div>
							</div>
							<div v-if="item.title === 'bestPPD'" class="dataInfo">
								<div class="infoScore contentLeft">{{ item.ppd }}</div>
								<div class="infoScore contentRight">
									<div class="matchScore">
										<div>{{ $t('default.168') }}</div>
										<div>{{ item.rating }}</div>
									</div>
									<div class="matchScore" style="borderTop:1px solid #fff">
										<div>{{ $t('default.170') }}</div>
										<div>{{ item.mpr }}</div>
									</div>
								</div>
							</div>
							<div v-if="item.title === 'bestMPR'" class="dataInfo">
								<div class="infoScore contentLeft">{{ item.mpr }}</div>
								<div class="infoScore contentRight">
									<div class="matchScore">
										<div>{{ $t('default.168') }}</div>
										<div>{{ item.rating }}</div>
									</div>
									<div class="matchScore" style="borderTop:1px solid #fff">
										<div>{{ $t('default.169') }}</div>
										<div>{{ item.ppd }}</div>
									</div>
								</div>
							</div>
						</div>
						<div v-else>
							<div class="winBox">
								<div>
									<div>{{ $t('default.46') }}</div>
									<div>{{ item.wins }}</div>
								</div>
								<div class="winBg">
									<div>{{ $t('default.48') }}</div>
									<div>{{ item.losses }}</div>
								</div>
								<div>
									<div>{{ $t('default.47') }}</div>
									<div>{{ item.draws }}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="backBox">
						<u class="backFont" @click="showDetail(item.teamId)">{{ item.title }}</u>
					</div>
				</div>
			</a-col>
		</a-row>

		<a-row class="rowStyle rowSearchBox">
			<a-col :lg="2" :xs="6" class="titleStyle"> <BankFilled class="fontIcon" />{{ $t('default.27') }} </a-col>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="countryId" @change="countryChange" class="selectBox">
					<a-select-option v-for="item in areaList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="2" :xs="6" class="titleStyle">{{ $t('default.260') }}</a-col>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="areaId" @change="areaChange" class="selectBox">
					<a-select-option v-for="item in cityList" :key="item.areaId" :value="item.areaId">{{ item.areaName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="{ span: 2, offset: 4 }" :xs="6" class="titleStyle"> <SearchOutlined class="fontIcon" />{{ $t('default.165') }} </a-col>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="matchType" class="selectBox">
					<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="5" :xs="12">
				<a-input-search v-model:value="inputValue" :enter-button="$t('default.16')" size="default" @search="onSearch" />
			</a-col>
		</a-row>
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ `${$t('default.82')} (${teamList.length})` }} </a-col>
			<a-col :lg="3" :xs="0" class="sortColBox">{{ 'TEAM RATING' }}</a-col>
			<a-col :lg="5" :xs="0" class="sortColBox">
				<a-button size="small" :type="btnType === 1 ? 'primary' : ''" @click="changeType(1, 30)">{{ 'ALL' }}</a-button>
				<a-button size="small" :type="btnType === 2 ? 'primary' : ''" @click="changeType(2, 7)">{{ '~7' }}</a-button>
				<a-button size="small" :type="btnType === 3 ? 'primary' : ''" @click="changeType(3, 13)">{{ '~13' }}</a-button>
				<a-button size="small" :type="btnType === 4 ? 'primary' : ''" @click="changeType(4, 23)">{{ '~23' }}</a-button>
				<a-button size="small" :type="btnType === 5 ? 'primary' : ''" @click="changeType(5, 30)">{{ '~30' }}</a-button>
			</a-col>
			<a-col :lg="4" :xs="0" class="sortColBox">
				<div>
					<a-button type="link" @click="changeIcon">
						{{ 'Top 4 CR' }}
						<span v-if="isUp">
							<DownOutlined />
						</span>
						<span v-else>
							<UpOutlined />
						</span>
					</a-button>
				</div>
			</a-col>
		</a-row>

		<a-row v-for="(item, index) in teamList" :key="item.id">
			<a-row class="eveyTeam">
				<a-col :lg="3" :xs="4" class="imgColStyle">
					<img v-if="item.shopImg" class="matchImg" :src="item.shopImg" alt="" />
					<img v-else class="matchImg" :src="defaultImg" alt="" />
				</a-col>
				<a-col :lg="6" :xs="{ span: 14, offset: 1 }" class="infoClass">
					<div class="teamStyle" @click="entryPage(1, item.teamId)">{{ item.teamName }}</div>
					<div class="placeStyle">
						<div v-show="item.shopAddress" class="overStyle">{{ item.shopAddress }}/</div>
						<div v-show="item.countryName">{{ item.countryName }}/</div>
						<div class="counyStyle">{{ item.shop.shopName }}</div>
						<span @click="showDialog(item.shop)">
							<EnvironmentOutlined />
						</span>
					</div>
					<div>{{ item.captainName }}</div>
				</a-col>
				<a-col :lg="2" :xs="3" class="vipBox">
					<a-col>{{ $t('default.227') }}</a-col>
					<a-col class="vipPlayer" @click="entryPage(3, item.captainId)"> <UserOutlined />{{ item.playerCount }} </a-col>
				</a-col>
				<a-col :lg="8" :xs="0" class="topBox">
					<a-col>{{ $t('default.178') }}</a-col>
					<a-col v-if="item.top4CompetitionRating" class="infoStyle">
						<a-col>{{ `Rating  ${item.top4CompetitionRating.rating}` }}</a-col
						>| <a-col>{{ `PPD  ${item.top4CompetitionRating.ppd}` }}</a-col
						>|
						<a-col>{{ `MPR  ${item.top4CompetitionRating.mpr}` }}</a-col>
					</a-col>
				</a-col>
				<a-col :lg="2" :xs="0" class="vipBox">
					<div>{{ $t('default.226') }}</div>
					<div>{{ item.competitionList.length }}</div>
				</a-col>
				<a-col :lg="2" :xs="2" class="iconFont">
					<div v-if="item.competitionList.length">
						<div v-if="item.flag" @click="changeFlag(index)">
							<DownCircleOutlined />
						</div>
						<div v-else @click="changeFlag(index)">
							<UpCircleOutlined />
						</div>
					</div>
				</a-col>
			</a-row>
			<transition enter-active-class="animate__animated animate__bounceInUp">
				<a-row v-show="item.flag" class="recordBox">
					<div class="matchTitle">{{ $t('default.225') }}</div>
					<a-row v-for="recordInfo in item.competitionList" :key="recordInfo.index" class="msgBox">
						<a-col :span="4" class="imgColStyle">
							<img v-if="recordInfo.competitionImg" class="matchImg" :src="recordInfo.competitionImg" alt="" />
							<img v-else class="matchImg" :src="defaultImg" alt="" />
						</a-col>
						<a-col :span="20" class="countBox">
							<div class="recordInfoStyle inPhoneTableStyle">
								<div class="recordInfoFont" @click="entryCalendar(1, recordInfo.competitionId, recordInfo.divisionList[0].divisionId)">{{ recordInfo.competitionName }}</div>
								<div class="tableDate">
									<div>{{ recordInfo.date }}</div>
									<!-- <div>{{ recordInfo.place }}</div> -->
								</div>
							</div>
							<div class="btnBox">
								<div v-for="disition in recordInfo.divisionList" :key="disition.divisionId">
									<a-button type="danger" size="small" @click="entryCalendar(2, recordInfo.competitionId, disition.divisionId)">{{ disition.divisionName }}</a-button>
								</div>
							</div>
						</a-col>
					</a-row>
				</a-row>
			</transition>
		</a-row>
		<a-modal v-model:visible="visible" :title="dialogObj.title" centered>
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
		<a-row v-if="!teamList.length">
			<emptyList />
		</a-row>
		<a-row class="rowStyle">
			<a-col class="pagination">
				<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" @change="onPageChange" />
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { teamBestListHttp, teamListHttp, indexCityHttp, indexCountryHttp } from '@/axios/api';
import divTitle from '@/components/DividingLine.vue';
import emptyList from '@/components/common/emptyList.vue';
import { SettingFilled, BankFilled, SearchOutlined, EnvironmentOutlined, UserOutlined, DownCircleOutlined, UpCircleOutlined, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
interface DataProps {
	countryChange: (value: any) => void;
	total: any;
	areaList: any;
	pageNum: any;
	matchType: any;
	inputValue: any;
	bestTeam: any;
	areaId: any;
	cityList: any;
	visible: boolean;
	dialogObj: any;
	btnType: number;
	isUp: boolean;
	teamList: any;
	countryId: number | string;
}
export default defineComponent({
	name: 'team',
	components: {
		divTitle,
		BankFilled,
		SearchOutlined,
		SettingFilled,
		EnvironmentOutlined,
		UserOutlined,
		DownCircleOutlined,
		UpCircleOutlined,
		DownOutlined,
		UpOutlined,
		emptyList
	},
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const instance: any = getCurrentInstance();
		const data: DataProps = reactive({
			title: 'default.9',
			currentValue: 1,
			btnType: 1,
			isUp: true,
			visible: false,
			inputValue: '',
			pageNum: 1,
			pageSize: 1,
			total: 1,
			colSpan: 4,
			matchType: 1,
			countryId: '',
			areaId: '',
			monthList: [],
			stateList: [],
			areaList: [],
			cityList: [],
			defaultImg: require('@/assets/team.png'),
			matchTypeList: [
				{ value: 1, label: 'default.55' },
				{ value: 2, label: 'default.248' },
				{ value: 3, label: 'default.94' }
			],
			teamList: [{ flag: false, shop: {}, competitionList: [] }],
			bestTeam: [],
			dialogObj: {
				title: '',
				img: '',
				shopName: '',
				phone: '',
				address: ''
			},
			showDetail: (id: number) => {
				ROUTER.push({
					path: '/teamInfo',
					query: {
						teamId: id
					}
				});
			},
			onSearch: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTeamList();
			},
			changeFlag: (index: number) => {
				data.teamList[index].flag = !data.teamList[index].flag;
			},
			onPageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTeamList();
			},
			changeIcon: () => {
				data.isUp = !data.isUp;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTeamList();
			},
			changeType: (type: number, max: number) => {
				data.btnType = type;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTeamList(max);
			},
			handleOk: () => {
				console.log(1);
			},
			entryPage: (type: number, id: number) => {
				ROUTER.push({
					path: '/teamInfo',
					query: {
						activeKey: type,
						teamId: id
					}
				});
			},
			entryCalendar: (activeKey: string, competitionId: number, divisionId: number) => {
				ROUTER.push({
					path: '/calendar',
					query: {
						activeKey,
						competitionId,
						divisionId
					}
				});
			},
			showDialog: (item: any) => {
				data.dialogObj.title = item.areaName;
				data.dialogObj.img = item.shopImg;
				data.dialogObj.shopName = item.shopName;
				data.dialogObj.phone = item.shopPhone;
				data.dialogObj.address = item.shopAddress;
				data.visible = true;
			},
			countryChange: (value: number) => {
				indexCityHttp({ countryId: value }).then((res) => {
					data.cityList = res.data.data;
					if (data.cityList.length) {
						data.areaId = data.cityList[0]['areaId'];
					} else {
						data.areaId = '';
					}
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getBestTeamList();
				});
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTeamList();
			},
			areaChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTeamList();
			}
		});
		const getBestTeamList = () => {
			teamBestListHttp({ countryId: data.countryId }).then((res: any) => {
				const list: any = [];
				for (const item in res.data.data) {
					const obj: any = Object.assign(res.data.data[item], { title: item });
					list.push(obj);
					data.bestTeam = list;
				}
			});
		};
		const getTeamList = (max = 30, inputValue = data.inputValue) => {
			let str = '';
			switch (data.matchType) {
				case 1:
					str = 'teamName';
					break;
				case 2:
					str = 'captainName';
					break;
				default:
					str = 'shopName';
					break;
			}
			const obj = {
				countryId: data.countryId,
				areaId: data.areaId,
				[str]: inputValue,
				minRating: 0,
				maxRating: max,
				sort: data.isUp ? 1 : 2,
				pageIndex: data.pageNum,
				pageSize: 10
			};
			teamListHttp(obj).then((res) => {
				if (res.data.data.list.length) {
					res.data.data.list.forEach((i: any) => {
						i.flag = false;
					});
				}
				data.teamList = res.data.data.list;
				data.total = res.data.data.totalPage;
			});
		};
		const getCountry = (value: any) => {
			indexCountryHttp().then((res) => {
				if (res.data.data.length) {
					const id = Number(sessionStorage.getItem('countryId')) || data.areaList[0]['countryId'];
					data.areaList = res.data.data;
					data.countryId = id;
					data.countryChange(id);
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getTeamList(undefined, value);
					getBestTeamList();
				}
			});
		};
		onMounted(() => {
			getCountry(ROUTE.query.value);
			instance.appContext.config.globalProperties.$bus.on('on-country-change', (val: any) => {
				data.countryId = val;
				data.countryChange(val);
				getBestTeamList();
				getTeamList();
			});
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line {
	height: 50px;
	border-radius: 20px 20px 0 0;
	border: 1px solid #2b2b2b;
	margin: 10px 0;
}
.fontStyle {
	font-size: 30px;
}
.timeStyle {
	color: red;
	height: 50px;
	line-height: 50px;
}
.winnerListStyle {
	background: #999;
	display: flex;
	overflow: hidden;
	overflow-x: auto;
}
.fourBox {
	min-width: 200px;
	height: 190px;
	padding: 10px;
	opacity: 0.7;
}
.centerBox {
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #4b5154;
	overflow: hidden;
}
.dataInfo {
	display: flex;
	justify-content: space-around;
	border-top: 1px solid #fff;
	border-bottom: 1px solid #fff;
}
.contentLeft {
	width: 40%;
	color: red;
	font-size: 25px;
	border-right: 1px solid #fff;
}
.contentRight {
	width: 60%;
	color: #fff;
}
.infoScore {
	height: 70px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.infoScore div {
	height: 100%;
	line-height: 40px;
}
.matchScore {
	display: flex;
	justify-content: space-around;
}
.title {
	padding-left: 15px;
	text-align: left;
	color: #fff;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.infoTitle {
	font-size: 20px;
	color: #999;
	font-weight: bold;
}
.teamName {
	color: #fff;
	font-size: 20px;
	font-weight: bold;
}
.couny {
	font-size: 15px;
	color: #999;
}
.backBox {
	position: absolute;
	height: 100%;
	width: 100%;
	background: #333;
	top: 180px;
}
.centerBox:hover .backBox {
	top: 0px;
}
.backBox {
	transition: all 0.5s ease;
}
.backFont {
	font-size: 30px;
	color: #fff;
	font-weight: bold;
	cursor: pointer;
	word-break: break-all;
}
.winBox {
	display: flex;
	justify-content: space-around;
	height: 70px;
	border-top: 1px solid #fff;
	border-bottom: 1px solid #fff;
	color: #fff;
}
.winBg {
	border-left: 1px solid #fff;
	border-right: 1px solid #fff;
}
.winBox div {
	width: 100%;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
}
.matchImg {
	height: 60px;
}
.eveyTeam {
	height: 80px;
	margin: 15px 0;
	border: 1px solid #eee;
}
.imgColStyle {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.placeStyle {
	display: flex;
	justify-content: flex-start;
	white-space: nowrap;
	overflow: hidden;
}
.placeStyle span {
	cursor: pointer;
}
.infoClass {
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.counyStyle {
	color: #999;
	margin: 0 5px;
}
.teamStyle {
	cursor: pointer;
	font-weight: bold;
}
.teamStyle:hover {
	text-decoration: underline;
}
.vipBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.topBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.infoStyle {
	display: flex;
	justify-content: space-around;
}
.iconFont {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 25px;
	cursor: pointer;
}
.iconFont:hover {
	color: #1890ff;
}
.recordBox {
	padding: 10px;
}
.matchTitle {
	font-size: 20px;
	border-bottom: 1px dashed #000;
}
.msgBox {
	margin: 10px 0;
	padding: 0 0 0 10px;
	min-height: 60px;
	border-radius: 10px;
	box-sizing: border-box;
	border: 1px solid #2b2b2b;
}
.recordInfoStyle {
	display: flex;
	justify-content: flex-start;
}
.countBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.recordInfoFont {
	font-weight: bold;
	cursor: pointer;
}
.recordInfoFont:hover {
	text-decoration: underline;
}
.vipPlayer {
	cursor: pointer;
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
.dialogBtn {
	text-align: center;
}
</style>
