<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="smallTitle"> <SettingFilled /> {{ $t('default.67') }} </a-col>
		</a-row>
		<a-row class="rowStyle rowSearchBox">
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="year" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in yearList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<!-- <a-col :lg="3" :xs="12">
				<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in list" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col> -->
			<a-col :lg="{ span: 2, offset: 13 }" :xs="{ span: 6, offset: 0 }" class="titleStyle"> <AimOutlined class="fontIcon" />{{ $t('default.27') }} </a-col>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="countryId" @change="areaChange" class="selectBox">
					<a-select-option v-for="item in countryList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="areaId" @change="cityChange" class="selectBox">
					<a-select-option v-for="item in areaList" :key="item.areaId" :value="item.areaId">{{ item.areaName }}</a-select-option>
				</a-select>
			</a-col>
			<!-- <a-col :lg="3" :xs="6">
				<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in list" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col> -->
		</a-row>

		<a-row class="inPhoneTableDisplay">
			<tramRanking :dataObj="dataObj" />
		</a-row>

		<!-- 表格 -->
		<a-row class="inPhoneTableDisplay">
			<a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" bordered rowKey="teamId" :customHeaderRow="customHeaderRow">
				<template v-slot:team="{ record }">
					<div class="tableBox">
						<div class="tableImgBox">
							<img v-if="record.teamImg" :src="record.teamImg" alt="" />
							<img v-else :src="defaultImg" alt="" />
						</div>
						<div class="tableMsgCentent">
							<div @click="entryInfoPage(record.teamId)" class="link">{{ record.teamName }}</div>
							<div v-if="record.shop">
								<span>{{ record.shop.shopName }}</span>
								<span style="cursor:pointer" @click="showDialog(record.shop)">
									<EnvironmentOutlined />
								</span>
							</div>
						</div>
					</div>
				</template>
				<template v-slot:state="{ text }">
					<div class="tableState">
						<div v-if="text === 1" class="plan" @click="showPlan">{{ $t('default.41') }}</div>
						<div v-if="text === 2">{{ 'Ready' }}</div>
						<div v-if="text === 3">{{ 'Finished' }}</div>
					</div>
				</template>
			</a-table>
		</a-row>

		<a-row class="showPhoneTable">
			<a-table :columns="inPhoneColumns" :data-source="tableList" :pagination="false" bordered rowKey="teamId">
				<template v-slot:index>{{ $t('default.70') }}</template>
				<template v-slot:date>{{ $t('default.55') }}</template>
				<template v-slot:Rating>{{ $t('default.168') }}</template>
				<template v-slot:team="{ text }">
					<div class="tableBox">
						<div class="tableImgBox">
							<!-- <img v-if="record.teamImg" :src="text.teamImg" alt="" />
							<img v-else :src="defaultImg" alt="" /> -->
							<img :src="dialogObj.img" alt="" />
						</div>
						<div class="tableMsgCentent">
							<div @click="entryInfoPage(record.teamId)" class="link">{{ text }}</div>
							<div>
								{{ text }}
								<span style="cursor:pointer" @click="showDialog(text)">
									<EnvironmentOutlined />
								</span>
							</div>
						</div>
					</div>
				</template>
			</a-table>
		</a-row>
		<div class="pagination">
			<a-pagination v-model:current="pageNum" v-model:pageSize="pageSize" :total="total" @change="pageChange" />
		</div>
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
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance } from 'vue';
import { SettingFilled, AimOutlined, EnvironmentOutlined } from '@ant-design/icons-vue';
import { indexCountryHttp, indexCityHttp, teamRankingHttp } from '@/axios/api';
import tramRanking from '@/components/rankingTeam.vue';
import { yearList } from '@/components/common/public/index';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';

interface DataProps {
	areaChange: (value: any) => void;
	countryList: any;
	pageNum: any;
	pageSize: any;
	dataObj: any;
	total: any;
	year: any;
	visible: boolean;
	dialogObj: any;
	tableList: any;
	isChange: boolean;
	cityChange: () => void;
	areaId: any;
	areaList: any;
	countryId: number | string;
}

export default defineComponent({
	name: 'teamRanking',
	components: {
		SettingFilled,
		AimOutlined,
		tramRanking,
		EnvironmentOutlined
	},
	setup(prop: any, ctx: any) {
		const ROUTER = useRouter();
		const instance: any = getCurrentInstance();
		let currentSelectList: Array<any> = [];
		const data: DataProps = reactive({
			colSpan: 5,
			getDate: () => {
				return '2020-10-17';
			},
			isChange: false,
			pageNum: 1,
			pageSize: 10,
			total: 1,
			year: new Date().getFullYear(),
			dataObj: {
				teamId: 0
			},
			yearList,
			areaId: '',
			countryId: '',
			countryList: [],
			areaList: [],
			visible: false,
			dialogObj: {
				title: '',
				img: '',
				shopName: '',
				phone: '',
				address: ''
			},
			defaultImg: require('@/assets/team.png'),
			areaChange: (value: number) => {
				indexCityHttp({ countryId: value }).then((res) => {
					data.areaList = res.data.data;
					if (data.areaList.length) {
						data.areaId = data.areaList[0]['areaId'];
					} else {
						data.areaId = '';
					}
					data.cityChange();
				});
			},
			cityChange: () => {
				data.isChange = true;
			},
			customHeaderRow: () => {
				return {
					className: 'selectBox',
					onClick: (e: any) => {
						if (e.target.className.includes('ant-table-column-title')) {
							if (currentSelectList.length === 2) {
								ctx.emit('team-key-change', '2', currentSelectList);
							} else {
								message.warning('请选择两支队伍');
							}
						}
					}
				};
			},
			rowSelection: {
				columnWidth: 80,
				columnTitle: '对比',
				onChange: (selectedRowKeys: number[]) => {
					if (selectedRowKeys.length === 2) {
						currentSelectList = selectedRowKeys;
						const selectIndex: number[] = [];
						selectedRowKeys.forEach((i) => {
							selectIndex.push(data.tableList.findIndex((j: { teamId: number }) => j.teamId === i));
						});
						data.tableList.forEach((i: { disabled: boolean }, index: number) => {
							if (index !== selectIndex[1]) {
								i.disabled = true;
							}
						});
						const list = data.tableList;
						data.tableList = [...list];
					} else {
						data.tableList.forEach((i: { disabled: boolean }) => {
							i.disabled = false;
						});
						const list = data.tableList;
						data.tableList = [...list];
						currentSelectList = [];
					}
				},
				getCheckboxProps: (record: { disabled: boolean }) => ({
					disabled: record.disabled // Column configuration not to be checked
				})
			},
			inPhoneColumns: [
				{ dataIndex: 'key', key: 'time', slots: { title: 'index' } },
				{
					key: 'name',
					slots: { title: 'date', customRender: 'team' }
				},
				{ dataIndex: 'data', key: 'time', slots: { title: 'Rating' } }
			],
			columns: [
				{ title: '排行', dataIndex: 'sort', key: 'time' },
				{
					title: '队名',
					key: 'name',
					width: 250,
					slots: { customRender: 'team' }
				},
				{ title: 'Rating', dataIndex: 'competitionRating.rating', key: 'time' },
				{ title: 'PPD', dataIndex: 'competitionRating.ppd', key: 'type' },
				{ title: 'MPR', dataIndex: 'competitionRating.mpr', key: 'type' },
				{
					title: 'Match',
					children: [
						{
							title: '胜',
							dataIndex: 'matchResult.wins',
							key: 'homaName'
						},
						{
							title: '败',
							dataIndex: 'matchResult.draws',
							key: 'homeScore'
						},
						{
							title: '和',
							dataIndex: 'matchResult.losses',
							key: 'homeScore'
						},
						{
							title: '胜率',
							dataIndex: 'matchResult.winProbability',
							key: 'homeScore'
						}
					]
				},
				{
					title: 'Set',
					children: [
						{
							title: '胜',
							dataIndex: 'setResult.wins',
							key: 'awayScore'
						},
						{
							title: '败',
							dataIndex: 'setResult.draws',
							key: 'awayName'
						},
						{
							title: '和',
							dataIndex: 'setResult.losses',
							key: 'homeScore'
						},
						{
							title: '胜率',
							dataIndex: 'setResult.winProbability',
							key: 'homeScore'
						}
					]
				}
			],
			tableList: [{ teamId: 1, disabled: false }],
			matchTypeChange: (value: number) => {
				console.log(value);
			},
			showDialog: (item: any) => {
				data.dialogObj.title = item.place;
				data.dialogObj.img = item.shopImg;
				data.dialogObj.shopName = item.shopName || '-';
				data.dialogObj.phone = item.shopPhone || '-';
				data.dialogObj.address = item.shopAddress || '-';
				data.visible = true;
			},
			entryInfoPage: (id: number) => {
				ROUTER.push({
					path: 'teamInfo',
					query: {
						activeKey: '1',
						teamId: id
					}
				});
			},
			handleOk: () => {
				console.log(1);
			},
			pageChange: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDataList();
			}
		});
		const getCountryList = () => {
			indexCountryHttp().then((res) => {
				if (res.data.data.length) {
					const id = Number(sessionStorage.getItem('countryId')) || data.areaList[0]['countryId'];
					data.countryList = res.data.data;
					data.countryId = id;
					data.areaChange(id);
					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					getDataList();
				}
			});
		};
		const getDataList = () => {
			const obj = {
				year: data.year,
				countryId: data.countryId,
				areaId: data.areaId,
				pageIndex: data.pageNum,
				pageSize: data.pageSize
			};
			teamRankingHttp(obj).then((res) => {
				data.tableList = res.data.data.list;
				data.total = res.data.data.totalCount;
				if (res.data.data.list.length && data.isChange) {
					data.isChange = false;
					data.dataObj = res.data.data.list[0];
				}
			});
		};
		onMounted(() => {
			getCountryList();
			instance.appContext.config.globalProperties.$bus.on('on-country-change', (val: any) => {
				data.countryId = val;
				data.areaChange(val);
				getDataList();
			});
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.tableState {
	text-align: center;
}
.plan {
	background: red;
	color: #fff;
	border-radius: 10px;
	cursor: pointer;
}
.tableImgBox img {
	height: 50px;
	width: 50px;
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
.tableMsgCentent {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.dialogBtn {
	text-align: center;
}
.tableBox {
	display: flex;
	justify-content: space-between;
}
</style>
