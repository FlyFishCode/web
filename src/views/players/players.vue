<template>
	<div class="content">
		<divTitle :msg="title" :span="colSpan" :lastDate="getDate()" />
		<a-row class="rowStyle">
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ `${$t('default.163')}(${$t('default.8')})` }} </a-col>
		</a-row>
		<a-row class="winnerListStyle">
			<a-col class="fourBox" v-for="item in bestPlayers" :key="item.id">
				<div class="centerBox">
					<div class="title infoTitle">{{ item.title }}</div>
					<div class="title teamName">{{ item.playerName }}</div>
					<div>
						<div class="title">{{ item.couny }}</div>
						<div v-if="!item.wins" class="dataInfo">
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
						<div v-else>
							<div class="winBox">
								<div>
									<div>{{ $t('default.46') }}</div>
									<div>{{ item.wins }}</div>
								</div>
								<div class="winBg">
									<div>{{ $t('default.47') }}</div>
									<div>{{ item.draws }}</div>
								</div>
								<div>
									<div>{{ $t('default.48') }}</div>
									<div>{{ item.losses }}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="backBox">
						<u class="backFont" @click="showDetail(item.id)">{{ item.title }}</u>
					</div>
				</div>
			</a-col>
		</a-row>

		<a-row class="rowStyle rowSearchBox">
			<a-col :lg="2" :xs="6" class="titleStyle"> <BankFilled class="fontIcon" />{{ $t('default.27') }} </a-col>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="countryId" @change="areaChange" class="selectBox">
					<a-select-option v-for="item in areaList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="2" :xs="6" class="titleStyle">{{ $t('default.164') }}</a-col>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="areaId" class="selectBox">
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
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ `${$t('default.92')} (${teamList.length})` }} </a-col>
			<a-col :lg="3" :xs="0" class="colBox">{{ $t('default.249') }}</a-col>
			<a-col :lg="5" :xs="0" class="colBox">
				<a-button size="small" :type="btnType === 1 ? 'primary' : ''" @click="changeType(1, 30)">{{ 'ALL' }}</a-button>
				<a-button size="small" :type="btnType === 2 ? 'primary' : ''" @click="changeType(2, 7)">{{ '~7' }}</a-button>
				<a-button size="small" :type="btnType === 3 ? 'primary' : ''" @click="changeType(3, 13)">{{ '~13' }}</a-button>
				<a-button size="small" :type="btnType === 4 ? 'primary' : ''" @click="changeType(4, 23)">{{ '~23' }}</a-button>
				<a-button size="small" :type="btnType === 5 ? 'primary' : ''" @click="changeType(5, 30)">{{ '~30' }}</a-button>
			</a-col>
			<a-col :lg="4" :xs="0" class="colBox">
				<div>
					<a-button type="link" @click="changeIcon">
						{{ 'Competition Rating' }}
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
					<div>
						<img class="matchImg" :src="item.img" alt="" />
					</div>
				</a-col>
				<a-col :lg="{ span: 4, offset: 0 }" :xs="{ span: 10, offset: 4 }" class="infoClass">
					<div class="teamStyle" @click="entryPage">{{ item.teamName }}</div>
					<div class="placeStyle">
						<div>{{ item.place }}</div>
						/
						<div class="counyStyle">{{ item.couny }}</div>
						<span @click="showDialog(item)">
							<EnvironmentOutlined />
						</span>
					</div>
				</a-col>
				<a-col :lg="3" :xs="4" class="vipBox">
					<div>{{ $t('default.55') }}</div>
					<div>{{ item.vipCount }}</div>
				</a-col>
				<a-col :span="8" class="topBox inPhoneTableDisplay">
					<div>{{ topInfoTitle }}</div>
					<div class="infoStyle">
						<div>{{ `Rating  ${item.ranting}` }}</div>
						|
						<div>{{ `PPD  ${item.PPD}` }}</div>
						|
						<div>{{ `MPR  ${item.MPR}` }}</div>
					</div>
				</a-col>
				<a-col :span="3" class="vipBox inPhoneTableDisplay">
					<div>{{ type }}</div>
					<div>{{ item.count }}</div>
				</a-col>
				<a-col :span="2" class="iconFont">
					<div v-if="item.record.length">
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
					<div class="matchTitle">{{ $t('default.83') }}</div>
					<a-row v-for="recordInfo in item.record" :key="recordInfo.index" class="msgBox">
						<a-col :span="4" class="imgColStyle">
							<img class="matchImg" :src="recordInfo.img" alt="" />
						</a-col>
						<a-col :span="20" class="countBox">
							<div class="recordInfoStyle inPhoneTableStyle">
								<div class="recordInfoFont">{{ recordInfo.matchName }}</div>
								<div class="tableDate">
									<div>{{ recordInfo.date }}</div>
									<div>{{ recordInfo.place }}</div>
								</div>
							</div>
							<div class="btnBox">
								<div v-for="disition in recordInfo.class" :key="disition.index">
									<a-button type="danger" size="small">{{ disition.className }}</a-button>
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

		<a-row class="rowStyle">
			<a-col class="pagination">
				<a-pagination v-model:current="current" v-model:pageSize="pageSize" :total="total" />
			</a-col>
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { playerBestListHttp, playerListHttp, indexCountryHttp, indexCityHttp } from '@/axios/api';
import divTitle from '@/components/DividingLine.vue';
import { SettingFilled, BankFilled, SearchOutlined, EnvironmentOutlined, DownCircleOutlined, UpCircleOutlined, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
export default defineComponent({
	name: 'players',
	components: {
		divTitle,
		BankFilled,
		SearchOutlined,
		SettingFilled,
		EnvironmentOutlined,
		DownCircleOutlined,
		UpCircleOutlined,
		DownOutlined,
		UpOutlined
	},
	setup() {
		const Router = useRouter();
		const data = reactive({
			title: 'default.10',
			currentValue: 1,
			btnType: 1,
			isUp: true,
			inputValue: '',
			type: 'Entry',
			topInfoTitle: 'Competition Rating',
			current: 1,
			pageSize: 1,
			total: 1,
			colSpan: 4,
			matchType: 1,
			visible: false,
			dialogObj: {
				title: '',
				img: require('@/assets/3.jpg'),
				shopName: '',
				phone: '',
				address: ''
			},
			matchTypeList: [
				{ value: 1, label: 'default.55' },
				{ value: 2, label: 'default.93' },
				{ value: 3, label: 'default.94' }
			],
			countryId: null,
			areaId: null,
			monthList: [],
			stateList: [],
			areaList: [],
			cityList: [],
			teamList: [
				{
					id: 1,
					img: require('@/assets/1.jpg'),
					teamName: '上海队',
					couny: '北京',
					place: '汉庭会所',
					vipCount: 8,
					ranting: 2.15,
					PPD: 25.0,
					MPR: 19.5,
					count: 0,
					enroll: 10,
					flag: false,
					record: [
						{
							matchName: '第三届DARTS WORLD（广州联赛）',
							img: require('@/assets/1.jpg'),
							date: '2020-5-40 ~ 2020-6-10',
							place: '广州',
							class: [{ className: 'class1' }, { className: 'class2' }, { className: 'class3' }]
						},
						{
							matchName: '第三届DARTS WORLD（广州联赛）',
							img: require('@/assets/1.jpg'),
							date: '2020-5-40 ~ 2020-6-10',
							place: '广州',
							class: [{ className: 'class1' }, { className: 'class2' }, { className: 'class3' }]
						}
					]
				},
				{
					id: 1,
					img: require('@/assets/1.jpg'),
					teamName: '上海队',
					couny: '北京',
					place: '汉庭会所',
					vipCount: 8,
					ranting: 2.15,
					PPD: 25.0,
					MPR: 19.5,
					count: 0,
					enroll: 10,
					flag: false,
					record: []
				},
				{
					id: 1,
					img: require('@/assets/1.jpg'),
					teamName: '上海队',
					couny: '北京',
					place: '汉庭会所',
					vipCount: 8,
					ranting: 2.15,
					PPD: 25.0,
					MPR: 19.5,
					count: 0,
					enroll: 10,
					flag: false,
					record: [
						{
							matchName: '第三届DARTS WORLD（广州联赛）',
							img: require('@/assets/1.jpg'),
							date: '2020-5-40 ~ 2020-6-10',
							place: '广州',
							class: [{ className: 'class1' }, { className: 'class2' }, { className: 'class3' }]
						},
						{
							matchName: '第三届DARTS WORLD（广州联赛）',
							img: require('@/assets/1.jpg'),
							date: '2020-5-40 ~ 2020-6-10',
							place: '广州',
							class: [{ className: 'class1' }, { className: 'class2' }, { className: 'class3' }]
						}
					]
				}
			],
			bestPlayers: [],
			getDate: () => '220-10-16',
			showDetail: (value: number) => {
				Router.push({
					path: '/playerInfo',
					query: { value }
				});
			},
			showDialog: (item: any) => {
				data.dialogObj.title = item.place;
				data.dialogObj.shopName = item.shopName;
				data.dialogObj.phone = item.phoneNumber;
				data.dialogObj.address = item.address;
				data.visible = true;
			},
			onSearch: () => {
				console.log('11');
			},
			changeFlag: (index: number) => {
				data.teamList[index].flag = !data.teamList[index].flag;
			},
			entryPage: () => {
				Router.push('playerInfo');
			},
			handleOk: () => {
				console.log(1);
			},
			areaChange: (value: number) => {
				indexCityHttp({ countryId: value }).then((res) => {
					data.cityList = res.data.data;
					if (data.cityList.length) {
						data.areaId = data.cityList[0]['areaId'];
					} else {
						data.areaId = null;
					}
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getPlayerList();
				});
			},
			changeType: (type: number, max: number) => {
				data.btnType = type;
				console.log(max);
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				// getPlayerList(undefined, max);
			},
			changeIcon: () => {
				data.isUp = !data.isUp;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				// getPlayerList(undefined, undefined, data.isUp ? 1 : 2);
			}
		});
		const getBestTeamList = () => {
			playerBestListHttp({
				countryId: sessionStorage.getItem('countryId')
			}).then((res: any) => {
				const list: any = [];
				for (const item in res.data.data) {
					const obj: any = Object.assign(res.data.data[item], { title: item });
					list.push(obj);
					data.bestPlayers = list;
				}
			});
		};
		const getPlayerList = (type = 1, max = 30, sort = 1) => {
			let str = '';
			switch (type) {
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
				[str]: data.inputValue,
				minRating: 0,
				maxRating: max,
				sort,
				pageIndex: 1,
				pageSize: 10
			};
			playerListHttp(obj).then((res: any) => {
				// if (res.data.data.list.length) {
				// 	res.data.data.list.forEach((i: any) => {
				// 		i.flag = false;
				// 	});
				// }
				// data.teamList = res.data.data.list;
				// data.total = res.data.data.totalCount;
				console.log(res);
			});
		};
		const getCountry = () => {
			indexCountryHttp().then((res) => {
				if (res.data.data.length) {
					data.areaList = res.data.data;
					data.countryId = data.areaList[0]['countryId'];
					data.areaChange(data.areaList[0]['countryId']);
				}
			});
		};
		onMounted(() => {
			getCountry();
			getBestTeamList();
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
	justify-content: space-around;
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
}
.placeStyle span {
	cursor: pointer;
}
.infoClass {
	height: 100%;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
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
.btnBox {
	display: flex;
	padding: 0 0 0 10px;
}
.btnBox div {
	margin-right: 15px;
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
	height: 80px;
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
.colBox {
	height: 40px;
	line-height: 40px;
}
</style>
