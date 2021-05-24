<template>
	<div class="content">
		<a-row type="flex" justify="space-between">
			<a-col :span="10" class="smallTitle"> <SettingFilled /> {{ $t('default.181') }} </a-col>
			<a-col :span="4" class="btnBox">
				<a-button type="danger" size="small" @click="clearList">{{ $t('default.196') }}</a-button>
			</a-col>
		</a-row>
		<a-row class="allBox">
			<a-col :lg="4" :xs="8">
				<div v-for="item in titleList" :key="item.id">
					<div class="titleBox" :class="{ imgTitle: item.id === 1, captainTitle: item.id === 4, plain: item.id === 6 || item.id === 7, chance: item.id === 9, topTitle: item.id === 10 }">
						{{ $t(item.title) }}
					</div>
				</div>
			</a-col>
			<a-col class="inPhoneTableDisplay" :span="5" v-for="(item, index) in teamList" :key="index">
				<div v-if="item.flag" class="playerBox">
					<div class="imgBg">
						<div class="closeBox">
							<CloseCircleFilled class="closeIcon" @click="bySpliceIndex(index)" />
						</div>
						<div class="img"><img :src="item.teamImg" alt="" /></div>
						<div>{{ item.captainName }}</div>
					</div>
					<div class="info">{{ item.countryName }}</div>
					<div class="info">{{ item.shopName }}</div>
					<div class="captainBox">
						<div class="topBox"><img :src="item.captainImg" alt="" /></div>
						<div>{{ item.captainName }}</div>
					</div>
					<div class="info">{{ item.playerCount }}</div>
					<div v-show="item.top4GeneralRating" class="plainList">
						<div>
							<a-progress type="circle" status="exception" :percent="item.top4GeneralRating.rating">
								<template v-slot:format="percent">
									<span style="color: red">{{ percent }}</span>
								</template>
							</a-progress>
						</div>
						<div class="plainScore">
							<div>
								<div class="score">
									<div>{{ $t('default.169') }}</div>
									<div>{{ item.top4GeneralRating.ppd }}</div>
								</div>
								<div class="progress">
									<a-progress status="exception" :percent="item.top4GeneralRating.ppd" />
								</div>
							</div>
							<div>
								<div class="score">
									<div>{{ $t('default.169') }}</div>
									<div>{{ item.top4GeneralRating.mpr }}</div>
								</div>
								<div class="progress">
									<a-progress status="exception" :percent="item.top4GeneralRating.mpr" />
								</div>
							</div>
						</div>
					</div>
					<div v-show="item.top4CompetitionRating" class="plainList">
						<div>
							<a-progress type="circle" status="exception" :percent="item.top4CompetitionRating.rating">
								<template v-slot:format="percent">
									<span style="color: red">{{ percent }}</span>
								</template>
							</a-progress>
						</div>
						<div class="plainScore">
							<div>
								<div class="score">
									<div>{{ $t('default.169') }}</div>
									<div>{{ item.top4CompetitionRating.ppd }}</div>
								</div>
								<div class="progress">
									<a-progress status="exception" :percent="item.top4CompetitionRating.ppd" />
								</div>
							</div>
							<div>
								<div class="score">
									<div>{{ $t('default.169') }}</div>
									<div>{{ item.top4CompetitionRating.mpr }}</div>
								</div>
								<div class="progress">
									<a-progress status="exception" :percent="item.top4CompetitionRating.mpr" />
								</div>
							</div>
						</div>
					</div>
					<div class="info">{{ item.competitionCount }}</div>
					<div v-show="item.setWinProbability" class="chanceBox">
						<div>
							<a-progress type="circle" status="exception" :percent="parseInt(item.setWinProbability)" :width="80">
								<template v-slot:format="percent">
									<div class="scoreBox">{{ percent }}</div>
									<div class="scoreTitle">{{ 'Set' }}</div>
								</template>
							</a-progress>
						</div>
						<div>
							<a-progress type="circle" status="exception" :percent="parseInt(item.matchMinProbability)" :width="80">
								<template v-slot:format="percent">
									<div class="scoreBox">{{ percent }}</div>
									<div class="scoreTitle">{{ 'Match' }}</div>
								</template>
							</a-progress>
						</div>
					</div>
					<div v-for="top in item.top4Player" :key="top" class="topBg">
						<div class="topBox"><img :src="top.img" /></div>
						<div>{{ top.playerName }}</div>
					</div>
				</div>
				<div v-else class="addBox">
					<a-button type="dashed" ghost @click="showDialog(index)">{{ $t('default.197') }}</a-button>
				</div>
			</a-col>
			<!-- 移动端显示两个 -->
			<a-col class="showPhoneTable" :span="8" v-for="(item, index) in inPhoneTeamList" :key="index">
				<div v-if="item.flag" class="playerBox">
					<div class="imgBg">
						<div class="closeBox">
							<CloseCircleFilled class="closeIcon" @click="inPhonebySpliceIndex(index)" />
						</div>
						<div class="img"><img :src="item.img" alt="" /></div>
						<div>{{ item.captain }}</div>
					</div>
					<div class="info">{{ item.place }}</div>
					<div class="info">{{ item.address }}</div>
					<div class="captainBox">
						<div class="topBox"><img :src="item.captainImg" alt="" /></div>
						<div>{{ item.captain }}</div>
					</div>
					<div class="info">{{ item.playerNum }}</div>
					<div class="plainList">
						<div>
							<a-progress type="circle" status="exception" :percent="item.plainRating">
								<template v-slot:format="percent">
									<span style="color: red">{{ percent }}</span>
								</template>
							</a-progress>
						</div>
						<div class="plainScore">
							<div>
								<div class="score">
									<div>{{ $t('default.169') }}</div>
									<div>{{ item.plainPPD }}</div>
								</div>
								<div class="progress">
									<a-progress status="exception" :percent="item.plainPPD" />
								</div>
							</div>
							<div>
								<div class="score">
									<div>{{ $t('default.169') }}</div>
									<div>{{ item.plainMPR }}</div>
								</div>
								<div class="progress">
									<a-progress status="exception" :percent="item.plainMPR" />
								</div>
							</div>
						</div>
					</div>
					<div class="plainList">
						<div>
							<a-progress type="circle" status="exception" :percent="item.matchRating">
								<template v-slot:format="percent">
									<span style="color: red">{{ percent }}</span>
								</template>
							</a-progress>
						</div>
						<div class="plainScore">
							<div>
								<div class="score">
									<div>{{ $t('default.169') }}</div>
									<div>{{ item.matchPPD }}</div>
								</div>
								<div class="progress">
									<a-progress status="exception" :percent="item.matchPPD" />
								</div>
							</div>
							<div>
								<div class="score">
									<div>{{ $t('default.169') }}</div>
									<div>{{ item.matchMPR }}</div>
								</div>
								<div class="progress">
									<a-progress status="exception" :percent="item.matchMPR" />
								</div>
							</div>
						</div>
					</div>
					<div class="info">{{ item.joinCount }}</div>
					<div class="chanceBox">
						<div>
							<a-progress type="circle" status="exception" :percent="item.chanceSet" :width="80">
								<template v-slot:format="percent">
									<div class="scoreBox">{{ percent }}</div>
									<div class="scoreTitle">{{ 'Set' }}</div>
								</template>
							</a-progress>
						</div>
						<div>
							<a-progress type="circle" status="exception" :percent="item.chanceMatch" :width="80">
								<template v-slot:format="percent">
									<div class="scoreBox">{{ percent }}</div>
									<div class="scoreTitle">{{ 'Match' }}</div>
								</template>
							</a-progress>
						</div>
					</div>
					<div v-for="top in item.top" :key="top" class="topBg">
						<div class="topBox"><img :src="top.img" alt="" /></div>
						<div>{{ top.name }}</div>
					</div>
				</div>
				<div v-else class="addBox">
					<a-button type="dashed" ghost @click="showDialog(index)">{{ $t('default.197') }}</a-button>
				</div>
			</a-col>
		</a-row>

		<a-modal v-model:visible="visible" centered width="900px" :footer="null" :title="$t('default.200')">
			<a-row class="rowSearchBox">
				<a-col :lg="6" :xs="12">
					<a-select v-model:value="countryId" class="selectBox">
						<a-select-option v-for="item in countryList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="6" :xs="12">
					<a-select v-model:value="type" class="selectBox">
						<a-select-option v-for="item in typeList" :key="item.value" :value="item.value">{{ $t(item.label) }}</a-select-option>
					</a-select>
				</a-col>
				<a-col :lg="{ span: 1, offset: 11 }" :xs="0"></a-col>
				<a-col :lg="{ span: 8, offset: 4 }" :xs="24">
					<a-input-search v-model:value="searchValue" class="selectBox" :enter-button="$t('default.16')" size="default" @search="onSearch" />
				</a-col>
			</a-row>
			<a-row class="dialogBG">
				<a-table :columns="columns" :data-source="dataList" :pagination="false" bordered rowKey="teamId">
					<template v-slot:choice>
						<div>{{ $t('default.201') }}</div>
					</template>
					<template v-slot:add="{ record }">
						<a-button v-if="!record.flag" type="primary" shape="circle">
							<template v-slot:icon>
								<div @click="selectPlayer(record.teamId)">
									<PlusOutlined />
								</div>
							</template>
						</a-button>
						<div v-else></div>
					</template>
					<template v-slot:team>
						<div>{{ $t('default.9') }}</div>
					</template>
					<template v-slot:teamImg="{ record }">
						<div class="diaLogBox">
							<div class="teamImgBox"><img :src="record.teamImg" alt="" /></div>
							<div>
								<div>{{ record.teamName }}</div>
								<div>{{ record.shopName }}</div>
							</div>
						</div>
					</template>
				</a-table>
			</a-row>
			<div class="pagination">
				<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" @change="pageChange" />
			</div>
		</a-modal>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue';
import { teamDataListHttp, teamSearchHttp, indexCountryHttp } from '@/axios/api';
import { SettingFilled, CloseCircleFilled, PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'teamHistory',
	props: ['activeKey', 'teamList'],
	components: {
		SettingFilled,
		CloseCircleFilled,
		PlusOutlined
	},
	setup(prop: any, ctx: any) {
		const data = reactive({
			total: 1,
			pageNum: 1,
			pageSize: 10,
			visible: false,
			searchValue: '',
			currentIndex: 0,
			countryId: null,
			countryList: [],
			type: 'teamName',
			typeList: [
				{ value: 'teamName', label: 'default.266' },
				{ value: 'playerName', label: 'default.248' },
				{ value: 'shopName', label: 'default.94' }
			],
			columns: [
				{
					dataIndex: 'teamId',
					slots: { title: 'choice', customRender: 'add' }
				},
				{
					dataIndex: 'teamImg',
					slots: { title: 'team', customRender: 'teamImg' }
				}
			],
			titleList: [
				{ id: 1, title: 'default.189' },
				{ id: 2, title: 'default.195' },
				{ id: 3, title: 'default.91' },
				{ id: 4, title: 'default.76' },
				{ id: 5, title: 'default.190' },
				{ id: 6, title: 'default.191' },
				{ id: 7, title: 'default.192' },
				{ id: 8, title: 'default.193' },
				{ id: 9, title: 'default.185' },
				{ id: 10, title: 'default.194' }
			],
			teamList: [{ teamId: 1, flag: false }, { flag: false }, { flag: false }, { flag: false }],
			inPhoneTeamList: [{ flag: false }, { flag: false }],
			dataList: [{ teamId: 1, flag: false }],
			clearList: () => {
				data.teamList.forEach((i, index) => {
					data.dataList.forEach((j) => {
						if (i.teamId === j.teamId) {
							j.flag = false;
						}
					});
					data.teamList.splice(index, 1, { flag: false });
				});
				ctx.emit('team-clear', []);
			},
			selectPlayer: (value: number) => {
				data.dataList.forEach((i) => {
					if (i.teamId === value) {
						// dialog table 设置数据已被选择
						i.flag = true;
						//  展示表格显示填充数据
						// eslint-disable-next-line @typescript-eslint/no-use-before-define
						addTeam([value]).then((response: any) => {
							data.teamList.fill(response, data.currentIndex, data.currentIndex + 1);
						});
					}
				});
				data.dataList.forEach((i) => {
					if (i.teamId === value) {
						// dialog table 设置数据已被选择
						i.flag = true;
						//  展示表格显示填充数据
						// eslint-disable-next-line @typescript-eslint/no-use-before-define
						addTeam([value]).then((response: any) => {
							data.inPhoneTeamList.fill(response, data.currentIndex, data.currentIndex + 1);
						});
					}
				});
				data.visible = false;
			},
			pageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTeamList();
			},
			onSearch: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getTeamList();
			},
			showDialog: (index: number) => {
				data.currentIndex = index;
				data.visible = true;
			},
			bySpliceIndex: (index: number) => {
				const obj: any = data.teamList.splice(index, 1, { flag: false });
				data.dataList.forEach((i) => {
					if (i.teamId === obj[0].teamId) {
						i.flag = false;
					}
				});
			},
			inPhonebySpliceIndex: (index: number) => {
				const obj: any = data.inPhoneTeamList.splice(index, 1, { flag: false });
				data.dataList.forEach((i) => {
					if (i.teamId === obj[0].teamId) {
						i.flag = false;
					}
				});
			}
		});
		const addTeam = (arr: Array<any>): any => {
			return teamDataListHttp(arr).then((res) => {
				if (res.data.data.length) {
					res.data.data.forEach((i: any) => {
						i.flag = true;
					});
					return res.data.data[0];
				}
			});
		};
		const getTeamList = () => {
			const obj = {
				countryId: data.countryId,
				memberId: localStorage.getItem('webUserId'),
				[data.type]: data.searchValue,
				pageIndex: data.pageNum,
				pageSize: data.pageSize
			};
			teamSearchHttp(obj).then((res) => {
				res.data.data.list.forEach((i: any) => {
					i.flag = false;
				});
				data.dataList = res.data.data.list;
				data.total = res.data.data.totalCount;
			});
		};
		const getCountryList = () => {
			indexCountryHttp().then((res) => {
				if (res.data.data.length) {
					data.countryList = res.data.data;
					data.countryId = data.countryList[0]['countryId'];
					getTeamList();
				}
			});
		};
		const getDataList = (list: Array<any>) => {
			teamDataListHttp(list).then((res) => {
				if (res.data.data) {
					res.data.data.forEach((i: any) => {
						i.flag = true;
					});
					data.teamList[0] = res.data.data[0];
					data.teamList[1] = res.data.data[1];
				} else {
					message.error(res.data.msg);
				}
			});
		};
		onMounted(() => {
			getCountryList();
			if (prop.teamList.length) {
				getDataList(prop.teamList);
			}
		});
		watch(
			() => prop.activeKey,
			(val) => {
				if (val === '2') {
					if (prop.teamList.length) {
						getDataList(prop.teamList);
					}
				}
			}
		);
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.titleBox {
	background: #272727;
	color: #a9a9a9;
	border-right: 2px solid #4b4b4b;
	box-shadow: -10px 0 8px -8px #111 inset;
	min-height: 40px;
	border-top: 1px solid #4b4b4b;
	box-sizing: content-box;
	line-height: 40px;
}
.playerBox {
	height: 100%;
	background: #4b4b4b;
	color: #fff;
	border-right: 1px solid #5f5f5f;
	border-left: 1px solid #5f5f5f;
}
.info {
	border-top: 1px solid #5f5f5f;
	min-height: 40px;
	line-height: 40px;
}
.img {
	height: 80px;
}
.img img {
	height: 100%;
}
.addBox {
	height: 140px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #5f5f5f;
}
.imgBg {
	height: 140px;
}
.imgTitle {
	height: 140px;
	line-height: 140px;
}
.closeBox {
	font-size: 20px;
	text-align: right;
}
.closeIcon {
	cursor: pointer;
}
.score {
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.plainList {
	border-top: 1px solid #5f5f5f;
	height: 220px;
	padding: 20px;
}
.plain {
	height: 220px;
	padding: 5px;
	box-sizing: border-box;
	white-space: normal;
	word-break: break-all;
}
.plainScore {
	display: flex;
	justify-content: space-around;
}
.plainScore div {
	width: 90px;
}
.progress >>> .ant-progress-text {
	display: none;
}
.progress >>> .ant-progress-outer {
	width: 120%;
}
.btnBox {
	display: flex;
	justify-content: center;
	align-items: center;
}
.chanceBox {
	display: flex;
	justify-content: space-around;
	height: 100px;
	padding: 10px;
	border-top: 1px solid #5f5f5f;
}
.scoreBox {
	font-size: 22px;
	color: #fff;
}
.scoreTitle {
	font-size: 11px;
	color: #fff;
}
.chance {
	height: 100px;
	padding: 10px;
	box-sizing: border-box;
}
.topBox {
	height: 50px;
	width: 50px;
}
.topBox img {
	width: 100%;
}
.topBg {
	display: flex;
	justify-content: space-around;
	border-top: 1px solid #5f5f5f;
	padding: 5px;
}
.topTitle {
	height: 242px;
}
.captainTitle {
	height: 60px;
	line-height: 60px;
}
.captainBox {
	padding: 5px;
	display: flex;
	justify-content: space-around;
	border-top: 1px solid #5f5f5f;
}
.allBox {
	background: #4b4b4b;
}
.teamImgBox {
	width: 50px;
	height: 50px;
}
.teamImgBox img {
	width: 100%;
}
.diaLogBox {
	display: flex;
	align-items: center;
}
.dialogBG {
	height: 600px;
	overflow-y: auto;
}
</style>
