<template>
	<div>
		<a-row type="flex" justify="end" class="lineBox inPhoneTableDisplay">
			<a-col :lg="{ span: 10, offset: 0 }">
				<div class="imgBox" @click="entryIndex"><img :src="img" alt="" /></div>
			</a-col>
			<a-col :lg="14" :xs="24" class="lineStyle">
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
							<!-- <a-row class="loginMore">
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
							</a-row> -->
						</template>
					</a-modal>
				</a-col>
				<a-col :lg="3" :xs="3" v-show="!isLogin">
					<a-button type="link" size="small" @click="register">{{ $t('default.1') }}</a-button>
				</a-col>
				<a-col :lg="3" :xs="3" v-show="isLogin">{{ userName }}</a-col>
				<a-col :lg="3" :xs="3" v-show="isLogin">
					<a-button type="link" size="small" @click="loginOut">{{ $t('default.126') }}</a-button>
				</a-col>
				<a-col :lg="5" :xs="4">{{ `${$t('default.3')}(${$t('default.260')})` }}</a-col>
				<a-col :lg="5" :xs="5">
					<a-select v-model:value="country" @change="countryChange" style="width: 100%" size="small">
						<a-select-option v-for="item in countryList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="4" :xs="4">{{ $t('default.4') }}</a-col>
				<a-col :lg="4" :xs="5">
					<a-select v-model:value="$i18n.locale" style="width: 100%" size="small">
						<a-select-option v-for="item in languageList" :key="item.key" :value="item.key">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
				<a-row class="searchLine">
					<a-col :lg="{ span: 16, offset: 8 }" :xs="{ span: 12 }">
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
			</a-col>
		</a-row>
		<a-row class="showPhoneTable">
			<div v-if="location === '/'">
				<a-col :span='3'>
					<div class="phoneButton">
						<a-button type="primary" @click="toggleCollapsed">
						<MenuUnfoldOutlined v-if="collapsed" />
						<MenuFoldOutlined v-else />
						</a-button>
					</div>
			</a-col>
			<a-col :span='21'>
				<div class="showPhoneLogoBox" @click="entryIndex"><img :src="img" alt=""></div>
			</a-col>
			</div>
			<div v-else class="goHistory">
				<div @click="goHistory"><LeftOutlined /></div>
				<div>{{ $t(getLocationName(location)) }}</div>
			</div>
		</a-row>
		<div class="transitionBox">
			<transition enter-active-class="animate__animated animate__fadeInLeft">
					<div v-if="showPhoneTabs" class="phoneTabsBg">
						<div v-for="item in phoneTabsList" :key="item.value" class="phoneTabsBox" @click="entryPage(item.value)">
							{{ $t(item.label) }}
						</div>
					</div>
				</transition>
		</div>
		<a-row class="rowStyle inPhoneTableDisplay">
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
									<div class="myMatchName" @click="infoPage(item.competitionId, item.divisionList[0].divisionId)">{{ item.competitionName }}</div>
									<div>{{ item.date }}</div>
								</div>
							</div>
							<div class="moreStyle" @click="entryMyPage"><PlusCircleOutlined twoToneColor="#ff5122" /> {{ $t('default.25') }}</div>
						</div>
						<div v-else>
							<a-select v-model:value="leagueId" style="width: 100%" @change="leagueIdChange">
								<a-select-option v-for="item in leagueList" :key="item.competitionId" :value="item.competitionId">{{ item.competitionName }}</a-select-option>
							</a-select>
							<div v-for="item in matchTimeTable" :key="item.index" class="centerBox" @click="entryMatchTablePage(item)">
								<div>
									<div>{{ 'Round' + item.type }}</div>
									<div>{{ item.homeTeamName }}</div>
									<div>{{ item.visitingTeamName }}</div>
								</div>
								<div>
									<div>{{ `${item.date} ${item.time}` }}</div>
									<div class="winbox" :class="{ lose: item.winOrLose !== 1 }">{{ item.winOrLose === 1 ? 'Win' : '-' }}</div>
									<div class="winbox" :class="{ lose: item.winOrLose !== 3 }">{{ item.winOrLose === 3 ? 'Win' : '-' }}</div>
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
							<div class="moreStyle" @click="entryMoPage"><PlusCircleOutlined twoToneColor="#ff5122" /> {{ $t('default.25') }}</div>
						</div>
					</div>
				</div>
			</div>
		</a-row>
		<a-modal id="loginBox" v-model:visible="registerVisible" :title="$t('default.1')" centered>
			<a-form ref="formRef" :model="otherObj" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
				<a-form-item label="ID" name="account">
					<a-input v-model:value="otherObj.account" />
				</a-form-item>
				<a-form-item :label="$t('default.313')" name="cardNo">
					<a-input v-model:value="otherObj.cardNo" />
				</a-form-item>
				<a-form-item :label="$t('default.314')" name="nickname">
					<a-input v-model:value="otherObj.nickname" />
				</a-form-item>
				<a-form-item :label="$t('default.3')" name="countryId">
					<a-select v-model:value="otherObj.countryId" placeholder="please select your country">
						<a-select-option v-for="item in countryList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item :label="$t('default.315')" name="password">
					<a-input v-model:value="otherObj.password" type="password" />
				</a-form-item>
				<a-form-item :label="$t('default.316')" name="confirmPassword">
					<a-input v-model:value="otherObj.confirmPassword" type="password" />
				</a-form-item>
			</a-form>
			<template v-slot:footer>
				<a-row type="flex" justify="center">
					<a-col :span="4" class="buttonBox">
						<a-button type="primary" @click="registerClick">{{ $t('default.317') }}</a-button>
					</a-col>
				</a-row>
			</template>
		</a-modal>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance, ref } from 'vue';
import { loginHttp, indexCountryHttp, myMatchInfoHttp, myPageInfoHttp, myBattleDataListHttp, myBattleSelectHttp, registerHttp } from '@/axios/api';
import { ProfileTwoTone, CloseOutlined, UserOutlined, LockOutlined, PlusCircleOutlined, MenuUnfoldOutlined, MenuFoldOutlined , LeftOutlined} from '@ant-design/icons-vue';
import { i18n } from '@/components/common/public/index';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
// import { useStore } from 'vuex';
export default defineComponent({
	name: 'hearder',
	components: {
		ProfileTwoTone,
		CloseOutlined,
		UserOutlined,
		LockOutlined,
		PlusCircleOutlined,
		MenuUnfoldOutlined,
		MenuFoldOutlined,
		LeftOutlined
	},
	setup() {
		const MD5 = require('blueimp-md5');
		const ROUTER = useRouter();
		const formRef = ref();
		// const STORE = useStore()
		const instance: any = getCurrentInstance();
		const passwordChange = async (rule: any, value: any) => {
			if (!value) {
				return Promise.reject(i18n('default.323'));
			}
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			if (data.otherObj.password !== value) {
				return Promise.reject(i18n('default.324'));
			} else {
				return Promise.resolve();
			}
		};
		const checkCountry = async (rule: any, value: number) => {
			if (!value) {
				return Promise.reject(i18n('default.321'));
			}
		};
		const data = reactive({
			showPhoneTabs: false,
			collapsed: true,
			isLogin: false,
			visible: false,
			registerVisible: false,
			showBox: false,
			autoLogin: false,
			isMyMatch: true,
			activeKey: 'league',
			location: '/',
			img: require('@/assets/logo.png'),
			leagueList: [{ competitionId: '', divisionList: [{ divisionId: 0 }] }],
			leagueId: '',
			imputValue: '',
			userId: '',
			loginUserId: 0,
			passWord: '',
			userName: '',
			country: '',
			registerObj: {
				account: '',
				cardNo: '',
				countryId: '',
				nickname: '',
				password: ''
			},
			otherObj: {
				account: '',
				cardNo: '',
				countryId: '',
				nickname: '',
				password: '',
				confirmPassword: ''
			},
			rules: {
				account: [{ required: true, message: i18n('default.318'), trigger: 'blur' }],
				cardNo: [{ required: true, message: i18n('default.319'), trigger: 'blur' }],
				countryId: [
					{
						required: true,
						message: i18n('default.321'),
						validator: checkCountry
					}
				],
				nickname: [{ required: true, message: i18n('default.320'), trigger: 'blur' }],
				password: [{ required: true, message: i18n('default.322'), trigger: 'blur' }],
				confirmPassword: [{ required: true, message: i18n('default.324'), validator: passwordChange }]
			},
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
				// { key: 'zh-cn', label: 'default.130' },
				// { key: 'zh-tw', label: 'default.131' },
				// { key: 'en-us', label: 'default.132' }
				{ key: 'zh-cn', label: '简体中文' },
				{ key: 'zh-tw', label: '繁体中文' },
				{ key: 'en-us', label: '英文' }
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
			countryChange: () => {
				sessionStorage.setItem('webCountryId', data.country);
				instance.appContext.config.globalProperties.$bus.emit('on-country-change', data.country);
			},
			register: () => {
				data.registerVisible = true;
			},
			registerClick: () => {
				formRef.value
					.validate()
					.then(() => {
						data.registerObj.account = data.otherObj.account;
						data.registerObj.cardNo = data.otherObj.cardNo;
						data.registerObj.countryId = data.otherObj.countryId;
						data.registerObj.nickname = data.otherObj.nickname;
						data.registerObj.password = MD5(data.otherObj.password + 'kitekey').toUpperCase();
						registerHttp(data.registerObj).then((res: any) => {
							if (res.data.code == 100) {
								message.info(res.data.msg);
								data.registerVisible = false;
							} else {
								message.warning(res.data.msg);
							}
						});
					})
					.catch((error: any) => {
						console.log('error', error);
					});
			},
			typeChange: (value: number) => {
				console.log(value);
			},
			onSearch: () => {
				data.activeKey = data.type;
				ROUTER.push({
					path: data.type,
					query: {
						searchValue: data.imputValue
					}
				});
			},
			getLocationName:(value: string) =>{
				let str = ''
				switch(value){
					case "league":
						str = 'default.8'
					break;
					case "team":
						str = 'default.9'
					break;
					case "players":
						str = 'default.10'
					break;
					case "shop":
						str = 'default.127'
					break;
					case "ranking":
						str = 'default.26'
					break;
					case "myPage":
						str = 'default.2'
					break;
				}
				return str
			},
			goHistory:() =>{
				ROUTER.back()
				setTimeout(() =>{
					data.location = location.hash.split('/')[1] || '/'
				},300)
			},
			infoPage: (competitionId: number, divisionId: number) => {
				data.showBox = false;
				ROUTER.push({
					path: 'calendar',
					query: {
						competitionId,
						divisionId
					}
				});
			},
			entryPage: (path: string) => {
				if (data.isLogin) {
					data.showPhoneTabs = false;
					data.location = path
					ROUTER.push(path);
				} else {
					data.visible = true;
				}
			},
			getPersonalInfo: (playerId: any) => {
				myPageInfoHttp({ playerId }).then((res) => {
					if (res.data.data) {
						data.myInfo = res.data.data;
						data.myInfo.name = sessionStorage.getItem('webUserName') || '';
					}
				});
			},
			showPersonBox: () => {
				if (data.isLogin) {
					const playerId = sessionStorage.getItem('webUserId');
					data.getPersonalInfo(playerId);
					data.showBox = true;
					if (data.matchTimeTable.length) {
						return false;
					}
					const obj = {
						sort: 1,
						playerId,
						date: new Date().getFullYear(),
						countryId: sessionStorage.getItem('webCountryId'),
						pageIndex: 1,
						pageSize: 5
					};
					myMatchInfoHttp(obj).then((res) => {
						if (res.data.data) {
							data.matchList = res.data.data.list;
						}
					});
					const first = new Promise((resolve) => {
						const obj = {
							playerId,
							year: new Date().getFullYear()
						};
						myBattleSelectHttp(obj).then((res) => {
							if (res.data.data) {
								resolve(res.data.data);
							}
						});
					});
					first.then((res: any) => {
						if (res.length) {
							data.leagueList = res;
							data.leagueId = res[0].competitionId;
							const obj = {
								competitionId: data.leagueId,
								playerId,
								pageIndex: 1,
								pageSize: 5
							};
							myBattleDataListHttp(obj).then((res) => {
								if (res.data.data) {
									data.matchTimeTable = res.data.data.list;
								}
							});
						}
					});
				} else {
					data.visible = true;
				}
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
				data.location = '/'
				ROUTER.push('/');
			},
			login: () => {
				const obj = {
					username: data.userId,
					password: MD5(data.passWord + 'kitekey').toUpperCase()
				};
				loginHttp(false, obj).then((res) => {
					if (res.data.code === 100) {
						message.success(res.data.msg);
						sessionStorage.setItem('webToken', res.data.data.token);
						sessionStorage.setItem('webUserId', res.data.data.memberId);
						sessionStorage.setItem('webUserName', res.data.data.username);
						sessionStorage.setItem('webTeamIds', res.data.data.teamIds);
						// 保存玩家id至vuex
						// Store.dispatch("changeMemberId", res.data.data.memberId);
						data.userName = res.data.data.username;
						data.isLogin = true;
						data.visible = false;
						// eslint-disable-next-line @typescript-eslint/no-use-before-define
						// onLoad();
						data.showPhoneTabs = false;
						ROUTER.push('myPage');
					} else {
						message.warning(res.data.msg);
					}
				});
			},
			loginOut: () => {
				data.isLogin = false;
				data.showBox = false;
				sessionStorage.removeItem('webToken');
				sessionStorage.removeItem('webUserId');
				sessionStorage.removeItem('webUserName');
				sessionStorage.removeItem('webCountryId');
				sessionStorage.removeItem('webTeamIds');
				ROUTER.push('/');
			},
			entryMatchTablePage: (item: any) => {
				const divisionId = data.leagueList[0].divisionList[0].divisionId;
				let teamId = '';
				let currentKey = 1;
				let isResult = 0;
				let isAward = 0;
				let isMatchTable = 0;
				if (item.status === 1) {
					isMatchTable = 1;
					currentKey = 2;
				} else {
					isResult = 1;
					isAward = 1;
				}
				if (item.homeCaptainId === data.loginUserId) {
					teamId = item.homeTeamId;
				}
				if (item.visitingTeamShopId === data.loginUserId) {
					teamId = item.visitingTeamId;
				}
				if (teamId && divisionId) {
					data.showBox = false;
					ROUTER.push({
						path: 'calendar',
						query: {
							ismatchTablePage: '1',
							divisionId,
							teamId: teamId,
							isResult,
							isAward,
							currentKey,
							isMatchTable,
							competitionId: data.leagueId,
							confrontationInfoId: item.confrontationInfoId
						}
					});
				}
			},
			leagueIdChange: () => {
				const obj = {
					competitionId: data.leagueId,
					playerId: data.loginUserId,
					pageIndex: 1,
					pageSize: 5
				};
				myBattleDataListHttp(obj).then((res) => {
					if (res.data.data) {
						data.matchTimeTable = res.data.data.list;
					}
				});
			},
			myMatchClick: () => {
				data.isMyMatch = true;
			},
			matchTableClick: () => {
				data.isMyMatch = false;
			},
			entryMyPage: () => {
				data.showBox = false;
				ROUTER.push('/myPage');
			},
			entryMoPage: () => {
				data.showBox = false;
				const list: any = data.leagueList.find((i) => i.competitionId == data.leagueId);
				const divisionId = list.divisionList[0].divisionId;
				ROUTER.push({
					path: '/calendar',
					query: {
						competitionId: data.leagueId,
						divisionId
					}
				});
			}
		});
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		// const onLoad = () => {
		// 	window.baiduLoad = (res) => {
		// 		console.log('当前地为：', res.address.split('|')[0]);
		// 	};
		// 	const url = 'http://api.map.baidu.com/location/ip?ak=Vw4wPMMRNNnuMVj1Woc4AAK8DIDHRIt5&ip=&coor=bd09ll&callback=baiduLoad';
		// 	const jsapi = document.createElement('script');
		// 	jsapi.charset = 'utf-8';
		// 	jsapi.src = url;
		// 	document.head.appendChild(jsapi);
		// };
		const init = () => {
			data.loginUserId = Number(sessionStorage.getItem('webUserId'));
			if (sessionStorage.getItem('webUserName')) {
				data.userName = sessionStorage.getItem('webUserName') as string;
				data.isLogin = true;
			}
			data.getPersonalInfo(data.loginUserId);
			indexCountryHttp().then((res) => {
				if (res.data.data) {
					let currentCountry = '';
					data.countryList = res.data.data;
					if (navigator.geolocation) {
						// 获取经纬度
						navigator.geolocation.getCurrentPosition((position) => {
							const latitude = position.coords.latitude.toFixed(5);
							const longitude = position.coords.longitude.toFixed(5);
							// baiduLoad = (res: any) => {
							// 	debugger;
							// 	console.log(res);
							// };
							// Axios.get(`https://restapi.amap.com/v3/assistant/coordinate/convert?key=a9cef5218eebe10876a9bedfe7207454&locations=${latitude},${longitude}`).then((res) => {
							// 	console.log(res);
							// });
							console.log('经度：', longitude);
							console.log('维度：', latitude);
						});
					} else {
						window.alert('当前浏览器不支持定位');
					}
					// 根据浏览器语言来确定国家区域
					switch (navigator.language) {
						case 'zh-CN':
							currentCountry = '中国';
							break;
						case 'en':
							currentCountry = 'USA';
							break;
						case 'zh-TW':
							currentCountry = 'HONG KONG';
							break;
						case 'ja':
							currentCountry = 'Japan';
							break;
						default:
							currentCountry = 'Malaysia';
							break;
					}
					data.countryList.forEach((i: any) => {
						if (i.countryName === currentCountry) {
							data.country = i.countryId;
						}
					});
					sessionStorage.setItem('webCountryId', data.country);
				}
			});
		};
		onMounted(() => {
			init();
		});
		return {
			...toRefs(data),
			formRef
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
.inPhoneTableDisplay {
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
.searchLine {
	margin-top: 50px;
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
.lose {
	visibility: hidden;
}
.showPhoneTable{
	background: #eee;
	line-height: 50px;
	display: none;
}
.showPhoneLogoBox{
	text-align: center;
	height: 50px;
}
.showPhoneLogoBox img{
	height: 100%;
}
.transitionBox{
	position: absolute;
	z-index: 10;
}
.goHistory{
	font-size: 25px;
	text-align: center;
	padding-left: 10px;
	display: flex;
}
.goHistory div:nth-child(2) {
  flex: 2;
}
</style>
