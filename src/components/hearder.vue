<template>
	<div>
		<a-row type="flex" justify="end">
			<a-col :lg="12" :xs="24" class="lineStyle">
				<a-col :lg="3" :xs="3" v-show="!isLogin">
					<a-button type="link" size="small" @click="showLoginBox">{{ $t('default.0') }}</a-button>
					<a-modal id="loginBox" v-model:visible="visible" :title="$t('default.0')" centered>
						<div>
							<a-input v-model:value="userId">
								<template v-slot:prefix>
									<user-outlined type="user" />
								</template>
							</a-input>
							<br />
							<br />
							<a-input v-model:value="passWord" type="passWord">
								<template v-slot:prefix>
									<LockOutlined />
								</template>
							</a-input>
							<br />
							<br />
							<a-checkbox v-model="autoLogin" @change="onChange">{{ $t('default.5') }}</a-checkbox>
						</div>
						<template v-slot:footer>
							<a-row>
								<a-col :span="24" class="buttonBox">
									<a-button type="primary" @click="login">{{ $t('default.0') }}</a-button>
								</a-col>
							</a-row>
							<a-row class="loginMore">
								<a-col :span="4">
									<a-button type="link">
										{{ $t('default.1') }}
									</a-button> </a-col
								>|
								<a-col :span="4">
									<a-button type="link">
										{{ $t('default.6') }}
									</a-button> </a-col
								>|
								<a-col :span="4">
									<a-button type="link">
										{{ $t('default.7') }}
									</a-button>
								</a-col>
							</a-row>
						</template>
					</a-modal>
				</a-col>
				<a-col :lg="3" :xs="3" v-show="!isLogin">
					<a-button type="link" size="small">{{ $t('default.1') }}</a-button>
				</a-col>
				<a-col :lg="3" :xs="3" v-show="isLogin">{{ userName }}</a-col>
				<a-col :lg="3" :xs="3" v-show="isLogin">
					<a-button type="link" size="small" @click="loginOut">{{ $t('default.126') }}</a-button>
				</a-col>
				<a-col :lg="4" :xs="4">{{ $t('default.3') }}</a-col>
				<a-col :lg="5" :xs="5">
					<a-select v-model:value="country" style="width: 100%" size="small">
						<a-select-option v-for="item in countryList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="4" :xs="4">{{ $t('default.4') }}</a-col>
				<a-col :lg="5" :xs="5">
					<a-select v-model:value="$i18n.locale" style="width: 100%" size="small">
						<a-select-option v-for="item in languageList" :key="item.key" :value="item.key">{{ $t(item.label) }}</a-select-option>
					</a-select>
				</a-col>
			</a-col>
		</a-row>
		<a-row class="lineBox">
			<a-col :lg="{ span: 8, offset: 0 }" :xs="{ span: 8, offset: 4 }">
				<div class="imgBox" @click="entryIndex"><img :src="img" alt="" /></div>
			</a-col>
			<a-col :lg="{ span: 8, offset: 8 }" :xs="{ span: 12 }">
				<a-col :lg="6" :xs="10">
					<a-select v-model:value="type" style="width: 100%" @change="typeChange">
						<a-select-option v-for="item in typeList" :key="item.key" :value="item.key">{{ $t(item.label) }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="18" :xs="14">
					<a-input-search v-model:value="imputValue" style="width: 100%" @search="onSearch" />
				</a-col>
			</a-col>
		</a-row>
		<a-row class="rowStyle boxBG">
			<a-tabs class="tabsBox" type="card" @tabClick="tabClick" v-model:activeKey="activeKey">
				<a-tab-pane key="league" :tab="$t('default.8')"></a-tab-pane>
				<a-tab-pane key="team" :tab="$t('default.9')"></a-tab-pane>
				<a-tab-pane key="players" :tab="$t('default.10')"></a-tab-pane>
				<a-tab-pane key="shop" :tab="$t('default.127')"></a-tab-pane>
				<a-tab-pane key="ranking" :tab="$t('default.26')"></a-tab-pane>
				<template v-slot:tabBarExtraContent>
					<a-button @click="entryPage('myPage')">{{ $t('default.2') }}</a-button>
					<a-button @click="showPersonBox">
						<template v-slot:icon>
							<ProfileTwoTone />
						</template>
					</a-button>
				</template>
			</a-tabs>
			<div v-show="showBox" class="showBox animate__animated animate__fadeInRight animate__faster">
				<div class="hearder">
					<div>{{ $t('default.128') }}</div>
					<div class="closeStyle" @click="closeBox">
						<CloseOutlined />
					</div>
				</div>
				<div class="content">
					<div class="personalMsg">
						<div class="contentImgBox">
							<img :src="myInfo.memberImg" alt="" />
						</div>
						<div class="contentRight">
							<div class="contentName">{{ myInfo.memberName }}</div>
							<div>{{ myInfo.name }}</div>
							<div>
								<a-button type="danger">{{ 'Profile' }}</a-button>
							</div>
						</div>
					</div>
					<div id="myMsgCard">
						<div class="Mytabs">
							<a-button :type="isMyMatch ? 'primary' : ''" @click="myMatchClick">{{ $t('default.129') }}</a-button>
							<a-button :type="isMyMatch ? '' : 'primary'" @click="matchTableClick">{{ $t('default.79') }}</a-button>
						</div>
						<div v-if="isMyMatch">
							<div v-for="item in matchList" :key="item.index" class="match">
								<div class="myMatchImgBox">
									<img :src="item.competitionImg" alt="" />
								</div>
								<div class="myMatchRight">
									<div class="myMatchName" @click="infoPage(item.competitionId)">{{ item.competitionName }}</div>
									<div>{{ item.date }}</div>
								</div>
							</div>
							<div class="moreStyle" @click="entryMaPage"><PlusCircleOutlined twoToneColor="#ff5122" /> {{ $t('default.25') }}</div>
						</div>
						<div v-else>
							<a-select v-model:value="leagueId" style="width: 100%" @change="leagueIdChange">
								<a-select-option v-for="item in leagueList" :key="item.competitionId" :value="item.competitionId">{{ $t(item.competitionName) }}</a-select-option>
							</a-select>
							<div v-for="item in matchTimeTable" :key="item.index" class="centerBox">
								<div>
									<div>{{ 'Round' + item.type }}</div>
									<div>{{ item.homeTeamName }}</div>
									<div>{{ item.visitingTeamName }}</div>
								</div>
								<div>
									<div>{{ `${item.date} ${item.time}` }}</div>
									<div v-if="item.winOrLose === 0" class="winbox">{{ 'Win' }}</div>
									<div v-if="item.winOrLose === 3" class="winbox">{{ 'Win' }}</div>
								</div>
								<div>
									<div>
										<div v-if="item.status === 1">{{ $t('default.64') }}</div>
										<div v-if="item.status === 2">{{ $t('default.104') }}</div>
										<div v-if="item.status === 3">{{ $t('default.244') }}</div>
									</div>
									<div>{{ item.homeTeamScore }}</div>
									<div>{{ item.visitingTeamScore }}</div>
								</div>
							</div>
							<div class="moreStyle"><PlusCircleOutlined twoToneColor="#ff5122" /> {{ $t('default.25') }}</div>
						</div>
					</div>
				</div>
			</div>
		</a-row>
		<div id="isPhoneTabs">
			<transition enter-active-class="animate__animated animate__fadeInLeft">
				<div v-if="showPhoneTabs" class="phoneTabsBg">
					<div v-for="item in phoneTabsList" :key="item.value" class="phoneTabsBox" @click="entryPage(item.value)">
						{{ $t(item.label) }}
					</div>
				</div>
			</transition>
			<div class="phoneButton">
				<a-button type="primary" @click="toggleCollapsed">
					<MenuUnfoldOutlined v-if="collapsed" />
					<MenuFoldOutlined v-else />
				</a-button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
// import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { loginHttp, indexCountryHttp, myMatchInfoHttp, myPageInfoHttp, myBattleDataListHttp, myBattleSelectHttp } from '@/axios/api';
import { ProfileTwoTone, CloseOutlined, UserOutlined, LockOutlined, PlusCircleOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'hearder',
	components: {
		ProfileTwoTone,
		CloseOutlined,
		UserOutlined,
		LockOutlined,
		PlusCircleOutlined,
		MenuUnfoldOutlined,
		MenuFoldOutlined
	},
	setup() {
		const ROUTER = useRouter();
		// const Store = useStore();
		const data = reactive({
			showPhoneTabs: false,
			collapsed: true,
			activeKey: 'league',
			leagueId: '',
			leagueList: [],
			isLogin: false,
			imputValue: '',
			visible: false,
			showBox: false,
			autoLogin: false,
			userId: '',
			passWord: '',
			userName: '',
			country: '',
			img: require('@/assets/logo.png'),
			isMyMatch: true,
			phoneTabsList: [
				{ value: 'league', label: 'default.8' },
				{ value: 'team', label: 'default.9' },
				{ value: 'players', label: 'default.10' },
				{ value: 'shop', label: 'default.127' },
				{ value: 'ranking', label: 'default.26' },
				{ value: 'myPage', label: 'default.2' }
			],
			myInfo: {
				name: ''
			},
			matchList: [],
			matchTimeTable: [],
			countryList: [],
			languageList: [
				{ key: 'zh-cn', label: 'default.130' },
				{ key: 'zh-tw', label: 'default.131' },
				{ key: 'en-us', label: 'default.132' }
			],
			type: 'league',
			typeList: [
				{ key: 'league', label: 'default.8' },
				{ key: 'team', label: 'default.9' },
				{ key: 'players', label: 'default.10' },
				{ key: 'shop', label: 'default.127' }
			],
			toggleCollapsed: () => {
				data.collapsed = !data.collapsed;
				data.showPhoneTabs = !data.showPhoneTabs;
			},
			typeChange: (value: number) => {
				console.log(value);
			},
			onSearch: () => {
				data.activeKey = data.type;
				ROUTER.push({
					path: data.type
				});
			},
			infoPage: (id: number) => {
				data.showBox = false;
				ROUTER.push({
					path: 'calendar',
					query: {
						stageId: id
					}
				});
			},
			showPersonBox: () => {
				data.showBox = true;
				myPageInfoHttp({ memberId: sessionStorage.getItem('userId') }).then((res) => {
					if (res.data.data) {
						data.myInfo = res.data.data;
						data.myInfo.name = sessionStorage.getItem('userName') || '';
					}
				});
				const obj = {
					memberId: sessionStorage.getItem('userId'),
					countryId: 617,
					sort: 1,
					date: 2020,
					pageIndex: 1,
					pageSize: 5
				};
				myMatchInfoHttp(obj).then((res) => {
					if (res.data.data) {
						data.matchList = res.data.data.list;
					}
				});
			},
			tabClick: (e: string) => {
				ROUTER.push(e);
			},
			closeBox: () => {
				data.showBox = false;
			},
			showLoginBox: () => {
				data.visible = true;
			},
			handleOk: () => {
				console.log(1);
			},
			onChange: (e: DOM) => {
				console.log(e);
			},
			entryIndex: () => {
				ROUTER.push('/');
			},
			login: () => {
				const obj = {
					username: data.userId,
					password: data.passWord
				};
				loginHttp(false, obj).then((res) => {
					if (res.data.code === 100) {
						message.success(res.data.msg);
						sessionStorage.setItem('token', res.data.data.token);
						sessionStorage.setItem('userId', res.data.data.memberId);
						sessionStorage.setItem('userName', res.data.data.username);
						// 保存玩家id至vuex
						// Store.dispatch("changeMemberId", res.data.data.memberId);
						data.userName = res.data.data.username;
						data.isLogin = true;
						data.visible = false;
						ROUTER.push('myPage');
					} else {
						message.warning(res.data.msg);
					}
				});
			},
			loginOut: () => {
				data.isLogin = false;
				sessionStorage.removeItem('token');
				sessionStorage.removeItem('userId');
				sessionStorage.removeItem('userName');
				ROUTER.push('/');
			},
			entryPage: (path: string) => {
				data.showPhoneTabs = false;
				ROUTER.push(path);
			},
			myMatchClick: () => {
				data.isMyMatch = true;
			},
			leagueIdChange: () => {
				console.log(1);
			},
			matchTableClick: () => {
				data.isMyMatch = false;
				const first = new Promise((resolve) => {
					const obj = {
						memberId: 75408,
						countryId: sessionStorage.getItem('countryId'),
						year: 2020
					};
					myBattleSelectHttp(obj).then((res) => {
						if (res.data.data) {
							resolve(res.data.data);
						}
					});
				});
				first.then((res: any) => {
					data.leagueList = res;
					data.leagueId = res[0].competitionId;
					const obj = {
						competitionId: data.leagueId,
						memberId: 75408,
						pageIndex: 1,
						pageSize: 5
					};
					myBattleDataListHttp(obj).then((res) => {
						if (res.data.data) {
							data.matchTimeTable = res.data.data.list;
						}
					});
				});
			},
			entryMaPage: () => {
				data.showBox = false;
				ROUTER.push('/myPage');
			}
		});
		onMounted(() => {
			if (sessionStorage.getItem('userId')) {
				data.isLogin = true;
				data.userName = sessionStorage.getItem('userName') as string;
			}
			indexCountryHttp().then((res) => {
				data.countryList = res.data.data;
				data.country = res.data.data[0]['countryId'];
				// 保存玩家国家id至vuex
				// Store.dispatch("chanageCountry", data.country);
				sessionStorage.setItem('countryId', data.country);
			});
		});
		return {
			...toRefs(data)
		};
	}
});
</script>
<style scoped>
.imgBox {
	height: 100px;
}
.imgBox img {
	height: 100%;
}
.tabsBox >>> .ant-tabs-nav-scroll {
	display: flex;
}
.boxBG {
	position: relative;
}
.showBox {
	position: absolute;
	top: 0px;
	right: 0px;
	width: 400px;
	height: 800px;
	background: #eee;
	z-index: 10;
	border: 1px solid #000;
}
.hearder {
	background: #4d4d4d;
	height: 50px;
	line-height: 50px;
	font-size: 20px;
	color: #ffffff;
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
}
.closeStyle {
	border: 1px solid #fff;
	width: 30px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	margin-top: 10px;
	cursor: pointer;
}
#loginBox > .ant-modal-footer {
	text-align: center;
}
.loginMore {
	display: flex;
	justify-content: center;
	text-align: center;
	line-height: 32px;
}
.dropdown >>> button {
	margin-left: 0px !important;
}
.lineStyle {
	line-height: 24px;
	/* display: flex; */
}
.moreStyle {
	height: 35px;
	line-height: 35px;
	border: 1px solid #d2d2d2;
	color: #ff5122;
	cursor: pointer;
	margin: 10px 0;
}
.personalMsg {
	display: flex;
}
.contentImgBox {
	height: 140px;
	width: 140px;
	padding: 20px;
}
.contentImgBox img {
	width: 100%;
}
.contentRight {
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	text-align: left;
}
.contentName {
	font-size: 20px;
}
.Mytabs button {
	width: 50%;
}
.myMatchImgBox {
	width: 50px;
	height: 50px;
}
.myMatchImgBox img {
	width: 100%;
}
.match {
	display: flex;
	padding: 10px;
	border: 1px solid #ff5122;
	margin: 4px 0;
}
.myMatchRight {
	padding-left: 15px;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.myMatchName:hover {
	text-decoration: underline;
	cursor: pointer;
}
.lineBox {
	padding: 15px 0;
	border-bottom: 2px solid #4b4b4b;
}
.phoneTabsBg {
	width: 200px;
	background: #fff;
	transition: all 0.5s ease;
}
.phoneTabsBox {
	width: 100%;
	background: #001529;
}
.phoneTabsBox {
	height: 40px;
	line-height: 30px;
	margin: 2px 0;
	padding: 5px 0;
	color: #fff;
}
.phoneTabsBox:hover {
	background: #1890ff;
	color: #000;
}
.phoneButton {
	width: 50px;
	margin: 2px 0;
}
#isPhoneTabs {
	display: flex;
	position: absolute;
	z-index: 10;
	top: 38px;
	display: none;
}
.inPlay {
	background: red;
	border-radius: 10px;
	color: #fff;
	cursor: pointer;
}
.centerBox {
	width: 100%;
	display: flex;
	border: 1px solid #ff5122;
	margin: 4px 0;
	justify-content: space-around;
	cursor: pointer;
}
.centerBox:hover {
	border: 1px solid #fff;
}
.winbox {
	background: #ff5e00;
	color: #fff;
}
</style>
