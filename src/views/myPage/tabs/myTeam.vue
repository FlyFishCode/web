<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ `${$t('default.110')} (${teamList.length})` }} </a-col>
		</a-row>

		<a-row v-for="(item, index) in teamList" :key="item.id">
			<a-row class="eveyTeam">
				<a-col :lg="3" :xs="4" class="imgColStyle">
					<div>
						<img class="matchImg" :src="item.teamImg" alt="" />
					</div>
				</a-col>
				<a-col :lg="4" :xs="10" class="infoClass">
					<div class="teamStyle" @click="entryPage(item.teamId)">{{ item.teamName }}</div>
					<div v-if="item.shop" class="placeStyle">
						<div>{{ item.shop.countryName }}</div>
						/
						<div class="counyStyle">{{ item.shop.areaName }}</div>
						<span @click="showDetail(item.shop)">
							<EnvironmentOutlined />
						</span>
					</div>
					<div>{{ item.captainName }}</div>
				</a-col>
				<a-col :lg="3" :xs="4" class="vipBox">
					<div>{{ $t('default.85') }}</div>
					<div class="showVipInfo" @click="entryVipPage"><UserOutlined />{{ item.playerCount }}</div>
				</a-col>
				<a-col :lg="8" :xs="0" class="topBox">
					<div>{{ topInfoTitle }}</div>
					<div v-if="item.top4CompetitionRating" class="infoStyle">
						<div>{{ `Rating  ${item.top4CompetitionRating.rating}` }}</div>
						|
						<div>{{ `PPD  ${item.top4CompetitionRating.ppd}` }}</div>
						|
						<div>{{ `MPR  ${item.top4CompetitionRating.mpr}` }}</div>
					</div>
				</a-col>
				<a-col :lg="3" :xs="0" class="vipBox">
					<div>{{ 'Entry' }}</div>
					<div>{{ item.competitionList.length }}</div>
				</a-col>
				<a-col :lg="{ span: 2, offset: 0 }" :xs="{ span: 3, offset: 2 }" class="iconFont">
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
					<div class="matchTitle">{{ $t('default.83') }}</div>
					<a-row v-for="info in item.competitionList" :key="info.index" class="msgBox">
						<a-col :span="4" class="imgColStyle">
							<div>
								<img class="matchImg" :src="info.competitionImg" alt="" />
							</div>
						</a-col>
						<a-col :span="20" class="countBox">
							<div class="recordInfoStyle">
								<div class="recordInfoFont">{{ `${info.competitionName}  /  ${info.date}` }}</div>
								<div>{{ info.countryName }}</div>
							</div>
							<div class="btnBox">
								<div v-for="div in info.divisionList" :key="div.divisionId">
									<a-button type="danger" size="small" @click="showInfo(info.competitionId, div.divisionId)">{{ div.divisionName }}</a-button>
								</div>
							</div>
						</a-col>
					</a-row>
				</a-row>
			</transition>
		</a-row>
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
import { useRouter } from 'vue-router';
import { myTeamListHttp } from '@/axios/api';
import { SettingFilled, EnvironmentOutlined, UserOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
	name: 'myTeam',
	components: {
		SettingFilled,
		EnvironmentOutlined,
		UserOutlined,
		UpCircleOutlined,
		DownCircleOutlined
	},
	setup() {
		const ROUTER = useRouter();
		const data = reactive({
			visible: false,
			dialogObj: {
				title: '',
				img: require('@/assets/3.jpg'),
				shopName: '',
				phone: '',
				address: ''
			},
			colSpan: 5,
			topInfoTitle: 'Top 4 平均 League Rating',
			teamList: [{ flag: false, competitionList: [] }],
			showDetail: (item: any) => {
				data.dialogObj.title = item.shopAddress;
				data.dialogObj.img = item.shopImg;
				data.dialogObj.shopName = item.shopName;
				data.dialogObj.phone = item.shopPhone;
				data.dialogObj.address = item.shopAddress;
				data.visible = true;
			},
			changeFlag: (index: number) => {
				data.teamList[index].flag = !data.teamList[index].flag;
			},
			handleOk: () => {
				console.log(1);
			},
			entryVipPage: () => {
				ROUTER.push('/');
			},
			showInfo: (competitionId: number, divisionId: number) => {
				ROUTER.push({
					path: '/calendar',
					query: {
						competitionId,
						divisionId
					}
				});
			},
			entryPage: (teamId: number) => {
				ROUTER.push({
					path: 'teamInfo',
					query: {
						teamId
					}
				});
			}
		});
		const getList = () => {
			const obj = {
				countryId: sessionStorage.getItem('countryId'),
				playerId: sessionStorage.getItem('userId'),
				pageIndex: 1,
				pageSize: 10
			};
			myTeamListHttp(obj).then((res) => {
				res.data.data.list.forEach((i: any) => {
					i.flag = false;
				});
				data.teamList = res.data.data.list;
			});
		};
		onMounted(() => {
			getList();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
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
.matchImg {
	height: 60px;
}
.infoClass {
	text-align: left;
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: space-around;
}
.teamStyle {
	cursor: pointer;
	font-weight: bold;
}
.teamStyle:hover {
	text-decoration: underline;
}
.placeStyle {
	display: flex;
	justify-content: flex-start;
}
.placeStyle span {
	cursor: pointer;
}
.counyStyle {
	color: #999;
	margin: 0 5px;
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
.countBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.recordInfoStyle {
	display: flex;
	justify-content: flex-start;
}
.msgBox {
	margin: 10px 0;
	min-height: 80px;
	box-sizing: border-box;
	border-bottom: 1px dashed #666;
}
.matchTitle {
	font-size: 20px;
	border-bottom: 1px dashed #000;
}
.recordBox {
	padding: 10px;
}
.showVipInfo {
	cursor: pointer;
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
.dialogBtn {
	text-align: center;
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
