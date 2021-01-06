<template>
	<div class="content">
		<a-row id="title-g">
			<a-col :lg="{ span: 4, offset: 0 }" :xs="{ span: 4, offset: 1 }">{{ $t('default.13') }}</a-col>
			<a-col :lg="{ span: 3, offset: 5 }" :xs="{ span: 6, offset: 2 }" class="btnBox">
				<a-select v-model:value="year" class="selectBox">
					<a-select-option v-for="item in yearList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="3" :xs="6" class="btnBox">
				<a-select v-model:value="month" @change="monthChange" class="selectBox">
					<a-select-option v-for="item in monthList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>
		<a-row class="centerStyle">
			<a-row class="rowSearchBox">
				<a-col :lg="2" :xs="6"> <EnvironmentOutlined class="fontIcon" />{{ $t('default.27') }} </a-col>
				<a-col :lg="3" :xs="9">
					<a-select v-model:value="countryId" @change="areaChange" class="selectBox">
						<a-select-option v-for="item in countryList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="3" :xs="9">
					<a-select v-model:value="areaId" @change="cityChange" class="selectBox">
						<a-select-option v-for="item in areaList" :key="item.areaId" :value="item.areaId">{{ item.areaName }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="3" :xs="6">{{ $t('default.14') }}</a-col>
				<a-col :lg="3" :xs="18">
					<a-select v-model:value="status" @change="stateChange" class="selectBox">
						<a-select-option v-for="item in stateList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="{ span: 4, offset: 0 }" :xs="6"> <SearchOutlined class="fontIcon" />{{ $t('default.15') }} </a-col>
				<a-col :lg="6" :xs="18">
					<a-input-search v-model:value="inputValue" allowClear :enter-button="$t('default.16')" size="default" @search="onSearch" />
				</a-col>
			</a-row>

			<a-row>
				<a-col :lg="5" :xs="14" class="centerFont"> <SettingFilled /> {{ $t('default.224') + `(${matchTotal})` }} </a-col>
			</a-row>
			<a-row class="rowStyle inPhoneBtnBox">
				<a-col :span="3" @click="showALLleague" class="buttonBox">
					<a-button :type="allLeague ? 'primary' : ''">{{ all }}</a-button>
				</a-col>
				<a-col :span="3" @click="showMyLengue" class="buttonBox">
					<a-button :type="myLeague ? 'primary' : ''">{{ my }}</a-button>
				</a-col>
				<a-col :lg="{ span: 4, offset: 14 }" :xs="0" class="sortColBox">
					<div>
						<a-button type="link" @click="changeIcon">
							{{ $t('default.256') }}
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
			<div v-show="allLeague">
				<div v-if="allLeagueList.length">
					<a-row v-for="item in allLeagueList" :key="item.matchId" class="matchBox">
						<a-col :lg="14" :xs="24">
							<a-col :span="4" class="matchImgBox">
								<img class="matchImg" :src="item.competitionImg" />
							</a-col>
							<a-col :span="18">
								<div>
									<div>{{ item.competitionName }}</div>
									<div class="divClass">
										<div v-for="div in item.divisionList" :key="div.divisionId">
											<a-button type="danger" size="small" @click="entryPage(item.competitionId, div.divisionId)">{{ div.divisionName }}</a-button>
										</div>
									</div>
								</div>
							</a-col>
						</a-col>
						<a-col :lg="2" :xs="0">
							<div class="fontDisplay">{{ $t('default.167') }}</div>
							<div>{{ item.areaName }}</div>
						</a-col>
						<a-col :lg="8" :xs="0">
							<div class="rightStyle">
								<div class="fontDisplay">{{ '比赛期间' }}</div>
								<div class="matchState I" v-if="item.status === 1">{{ '未开始' }}</div>
								<div class="matchState R" v-if="item.status === 2">{{ '进行中' }}</div>
								<div class="matchState F" v-if="item.status === 3">{{ '已结束' }}</div>
							</div>
							<div>{{ item.date }}</div>
						</a-col>
					</a-row>
					<div class="pagination">
						<a-pagination v-model:current="AllPageNum" v-model:pageSize="AllPageSize" :total="AllTotal" @change="AllPageChange" />
					</div>
				</div>
				<div v-else>
					<emptyList />
				</div>
			</div>

			<div v-show="myLeague">
				<div v-if="myLeagueList.length">
					<a-row v-for="item in myLeagueList" :key="item.matchId" class="matchBox">
						<a-col :lg="14" :xs="24">
							<a-col :span="4" class="matchImgBox">
								<img class="matchImg" :src="item.competitionImg" />
							</a-col>
							<a-col :span="18">
								<div>
									<div>{{ item.competitionName }}</div>
									<div class="divClass">
										<div v-for="div in item.divisionList" :key="div.divisionId">
											<a-button type="danger" size="small" @click="entryPage(item.competitionId, div.divisionId)">{{ div.divisionName }}</a-button>
										</div>
									</div>
								</div>
							</a-col>
						</a-col>
						<a-col :lg="2" :xs="0">
							<div class="fontDisplay">{{ $t('default.167') }}</div>
							<div>{{ item.areaName }}</div>
						</a-col>
						<a-col :lg="8" :xs="0">
							<div class="rightStyle">
								<div class="fontDisplay">{{ '比赛期间' }}</div>
								<div class="matchState I" v-if="item.status === 1">{{ '未开始' }}</div>
								<div class="matchState R" v-if="item.status === 2">{{ '进行中' }}</div>
								<div class="matchState F" v-if="item.status === 3">{{ '已结束' }}</div>
							</div>
							<div>{{ item.date }}</div>
						</a-col>
					</a-row>
					<div class="pagination">
						<a-pagination v-model:current="MyPageNum" v-model:pageSize="MyPageSize" :total="MyTotal" @change="MyPageChange" />
					</div>
				</div>
				<div v-else>
					<emptyList />
				</div>
			</div>
		</a-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue';
import { indexCountryHttp, indexCityHttp, leagueAllListHttp, leagueMyListHttp } from '@/axios/api';
import { useRoute, useRouter } from 'vue-router';
import { SearchOutlined, SettingFilled, EnvironmentOutlined, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import emptyList from '@/components/common/emptyList.vue';
interface HTMLInputEvent {
	value: HTMLInputElement & EventTarget;
}
interface DataProp {
	monthList: { id: number; value: number | string }[];
	currentValue: string;
	allLeague: boolean;
	myLeague: boolean;
	matchTotal: number;
	allLeagueList: { key: string; value: number | string }[];
	myLeagueList: { key: string; value: number | string }[];
	showALLleague: () => void;
	showMyLengue: () => void;
}
export default defineComponent({
	name: 'league',
	components: { EnvironmentOutlined, SearchOutlined, SettingFilled, emptyList, DownOutlined, UpOutlined },
	setup() {
		const ROUTE = useRoute();
		const ROUTER = useRouter();
		const data = reactive({
			isUp: true,
			all: 'ALL',
			my: 'MY',
			year: 2020,
			month: ' ',
			status: '',
			inputValue: '',
			matchTotal: 0,
			AllPageNum: 1,
			AllPageSize: 10,
			AllTotal: 1,
			MyPageNum: 1,
			MyPageSize: 10,
			MyTotal: 1,
			allLeague: true,
			myLeague: false,
			countryId: null,
			areaId: null,
			countryList: [],
			areaList: [],
			matchTypeList: [{ value: 2020, label: '2020' }],
			yearList: [
				{ value: 2020, label: 2020 },
				{ value: 2021, label: 2021 }
			],
			monthList: [
				{ value: ' ', label: 'ALL' },
				{ value: 1, label: 1 },
				{ value: 2, label: 2 },
				{ value: 3, label: 3 },
				{ value: 4, label: 4 },
				{ value: 5, label: 5 },
				{ value: 6, label: 6 },
				{ value: 7, label: 7 },
				{ value: 8, label: 8 },
				{ value: 9, label: 9 },
				{ value: 10, label: 10 },
				{ value: 11, label: 11 },
				{ value: 12, label: 12 }
			],
			newsSearch: [
				{ id: 1, value: '新闻' },
				{ id: 2, value: '标题' },
				{ id: 3, value: '新闻+标题' }
			],
			stateList: [
				{ value: '', label: 'ALL' },
				{ value: 1, label: '准备中' },
				{ value: 2, label: '进行中' },
				{ value: 3, label: '已结束' }
			],
			allLeagueList: [],
			myLeagueList: [],
			onSearch: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAllLeagueList();
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getMyLeagueList();
			},
			changeIcon: () => {
				data.isUp = !data.isUp;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAllLeagueList();
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getMyLeagueList();
			},
			AllPageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAllLeagueList();
			},
			MyPageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getMyLeagueList();
			},
			entryPage: (competitionId: number, divisionId: number) => {
				ROUTER.push({
					path: '/calendar',
					query: {
						competitionId,
						divisionId
					}
				});
			},
			showALLleague: () => {
				data.matchTotal = data.allLeagueList.length;
				data.allLeague = true;
				data.myLeague = false;
			},
			showMyLengue: () => {
				data.matchTotal = data.myLeagueList.length;
				data.myLeague = true;
				data.allLeague = false;
			},
			stateChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAllLeagueList();
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getMyLeagueList();
			},
			areaChange: (value: number) => {
				indexCityHttp({ countryId: value }).then((res) => {
					data.areaList = res.data.data;
					if (data.areaList.length) {
						data.areaId = data.areaList[0]['areaId'];
					} else {
						data.areaId = null;
					}
				});
			},
			cityChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAllLeagueList();
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getMyLeagueList();
			},
			monthChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getAllLeagueList();
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getMyLeagueList();
			}
		});
		const getAllLeagueList = (value = data.inputValue) => {
			const obj = {
				sort: data.isUp ? 1 : 2,
				year: data.year,
				month: data.month,
				countryId: data.countryId,
				areaId: data.areaId,
				status: data.status,
				competitionName: value,
				pageIndex: data.AllPageNum,
				pageSize: data.AllPageSize
			};
			leagueAllListHttp(obj).then((res) => {
				data.allLeagueList = res.data.data.list;
				data.matchTotal = res.data.data.list.length;
				data.AllTotal = res.data.data.totalCount;
			});
		};
		const getMyLeagueList = (value = data.inputValue) => {
			const obj = {
				sort: data.isUp ? 1 : 2,
				year: data.year,
				month: data.month,
				countryId: data.countryId,
				areaId: data.areaId,
				status: data.status,
				memberId: sessionStorage.getItem('userId'),
				competitionName: value,
				pageIndex: data.MyPageNum,
				pageSize: data.MyPageSize
			};
			leagueMyListHttp(obj).then((res) => {
				data.myLeagueList = res.data.data.list;
				data.MyTotal = res.data.data.totalCount;
			});
		};
		const getCountryList = (value: any) => {
			indexCountryHttp().then((res) => {
				if (res.data.data.length) {
					data.countryList = res.data.data;
					data.countryId = data.countryList[0]['countryId'];
					data.areaChange(data.countryList[0]['countryId']);
					getAllLeagueList(value);
					getMyLeagueList(value);
				}
			});
		};
		onMounted(() => {
			getCountryList(ROUTE.query.value);
		});
		watch(
			() => sessionStorage.getItem('countryId'),
			(val) => {
				debugger;
				console.log(val);
			}
		);
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
	margin: 10px;
}
.btnStyle {
	width: 100%;
}
.btnBox {
	height: 50px;
	display: flex;
	justify-content: center;
	align-content: center;
	flex-direction: column;
}
.centerStyle {
	line-height: 32px;
}
.tabs {
	display: flex;
}
.tab {
	line-height: 32px;
}
.centerFont {
	font-size: 20px;
	font-weight: bold;
	color: red;
	margin: 5px 0;
}
.matchBox {
	height: 80px;
	border: 1px solid #d4d4d4;
	margin: 10px;
	display: flex;
	align-items: center;
}
.matchImg {
	height: 40px;
}
.rightStyle {
	display: flex;
	justify-content: space-around;
}
.fontDisplay {
	color: #999;
}
.matchImgBox {
	height: 80px;
	line-height: 80px;
}
.matchState {
	width: 100px;
	height: 25px;
	line-height: 25px;
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
.divClass {
	display: flex;
	justify-content: flex-start;
}
.divClass div {
	margin: 0 2px;
}
</style>
