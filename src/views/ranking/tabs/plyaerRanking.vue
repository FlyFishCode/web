<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="smallTitle"> <SettingFilled /> {{ $t('default.68') }} </a-col>
		</a-row>
		<a-row class="rowStyle rowSearchBox">
			<a-col :lg="3" :xs="12">
				<a-select v-model:value="year" @change="yearChange" class="selectBox">
					<a-select-option v-for="item in yearList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
				</a-select>
			</a-col>
			<!-- <a-col :lg='3' :xs="12">
        <a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
          <a-select-option v-for="item in list" :key="item.value" :value='item.value'>{{ item.label }}</a-select-option>
        </a-select>
      </a-col> -->
			<a-col :lg="{ span: 2, offset: 3 }" :xs="6" class="titleStyle inPhoneTableDisplay"> <AimOutlined class="fontIcon" />{{ $t('default.27') }} </a-col>
			<a-col :lg="3" :xs="12">
				<a-select v-model:value="countryId" @change="countryChange" class="selectBox">
					<a-select-option v-for="item in countryList" :key="item.countryId" :value="item.countryId">{{ item.countryName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="3" :xs="12">
				<a-select v-model:value="areaId" @change="areaChange" class="selectBox">
					<a-select-option v-for="item in areaList" :key="item.areaId" :value="item.areaId">{{ item.areaName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="{ span: 2, offset: 4 }" :xs="12" class="titleStyle inPhoneTableDisplay">
				{{ $t('default.90') }}
			</a-col>
			<a-col :lg="3" class="inPhoneTableDisplay">
				<a-radio-group v-model:value="gender" class="genderBox" @change="genderChange">
					<a-radio value="">{{ $t('default.120') }}</a-radio>
					<a-radio :value="0">{{ $t('default.204') }}</a-radio>
				</a-radio-group>
			</a-col>
			<a-col :xs="12" class="showPhoneTable">
				<a-select v-model:value="gender" @change="genderChange" class="selectBox">
					<a-select-option value="">{{ $t('default.120') }}</a-select-option>
					<a-select-option :value="0">{{ $t('default.204') }}</a-select-option>
				</a-select>
			</a-col>
		</a-row>

		<a-row class="inPhoneTableDisplay">
			<playerRanking :dataObj="dataObj" />
		</a-row>

		<!-- 表格 -->
		<a-row class="inPhoneTableDisplay">
			<a-table :row-selection="rowSelection" :columns="columns" :data-source="tableList" :pagination="false" bordered rowKey="playerId" :customHeaderRow="customHeaderRow" :scroll="{ x: 1750 }">
				<template v-slot:index>{{ $t('default.70') }}</template>
				<template v-slot:date>{{ $t('default.10') }}</template>
				<template v-slot:Rating>{{ $t('default.168') }}</template>
				<template v-slot:PPD>{{ $t('default.169') }}</template>
				<template v-slot:MPR>{{ $t('default.170') }}</template>
				<template v-slot:homeTeam>{{ $t('default.137') }}</template>
				<template v-slot:total>{{ $t('default.202') }}</template>
				<template v-slot:homeWin>{{ $t('default.46') }}</template>
				<template v-slot:homeLose>{{ $t('default.47') }}</template>
				<template v-slot:homeDraw>{{ $t('default.48') }}</template>
				<template v-slot:homeChange>{{ $t('default.185') }}</template>
				<template v-slot:LT>{{ $t('default.205') }}</template>
				<template v-slot:HAT>{{ $t('default.206') }}</template>
				<template v-slot:HT>{{ $t('default.207') }}</template>
				<template v-slot:HTOFF>{{ $t('default.208') }}</template>
				<template v-slot:LTOFF>{{ $t('default.209') }}</template>
				<template v-slot:BED>{{ $t('default.210') }}</template>
				<template v-slot:180>{{ $t('default.211') }}</template>
				<template v-slot:EYE>{{ $t('default.212') }}</template>
				<template v-slot:5M>{{ $t('default.213') }}</template>
				<template v-slot:6M>{{ $t('default.214') }}</template>
				<template v-slot:7M>{{ $t('default.215') }}</template>
				<template v-slot:8M>{{ $t('default.216') }}</template>
				<template v-slot:9M>{{ $t('default.217') }}</template>
				<template v-slot:WH>{{ $t('default.218') }}</template>
				<template v-slot:team="{ record }">
					<div class="tableBox">
						<div class="tableImgBox"><img :src="record.captainImg" alt="" /></div>
						<div class="tableMsgCentent">
							<div @click="entryInfoPage(record.playerId)" class="link">{{ record.playerName }}</div>
							<div v-if="record.shop && record.shop.shopName">
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
			<a-table :columns="inPhoneColumns" :data-source="tableList" :pagination="false" bordered rowKey="playerId">
				<template v-slot:index>{{ $t('default.70') }}</template>
				<template v-slot:date>{{ $t('default.55') }}</template>
				<template v-slot:Rating>{{ $t('default.168') }}</template>
				<template v-slot:team="{ record }">
					<div class="tableBox">
						<div class="tableImgBox"><img :src="record.captainImg" alt="" /></div>
						<div class="tableMsgCentent">
							<div @click="entryInfoPage(record.playerId)" class="link">{{ record.playerName }}</div>
							<div>
								<span v-if="record.shop">{{ record.shop.shopName }}</span>
								<span style="cursor:pointer" @click="showDialog(record.shop)">
									<EnvironmentOutlined />
								</span>
							</div>
						</div>
					</div>
				</template>
			</a-table>
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
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { SettingFilled, AimOutlined, EnvironmentOutlined } from '@ant-design/icons-vue';
import { indexCountryHttp, indexCityHttp, playerRankingHttp } from '@/axios/api';
import playerRanking from '@/components/rankingPlayer.vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
export default defineComponent({
	name: 'plyaerRanking',
	components: {
		SettingFilled,
		AimOutlined,
		playerRanking,
		EnvironmentOutlined
	},
	setup(prop: any, ctx: any) {
		const ROUTER = useRouter();
		let currentSelectList: Array<any> = [];
		const data = reactive({
			colSpan: 5,
			getDate: () => {
				return '2020-10-17';
			},
			gender: '',
			isChange: false,
			dataObj: {},
			year: 2020,
			total: 1,
			pageNum: 1,
			pageSize: 10,
			yearList: [
				{ value: 2020, label: 2020 },
				{ value: 2021, label: 2021 }
			],
			matchType: 1,
			areaId: null,
			countryId: null,
			areaList: [],
			countryList: [],
			visible: false,
			dialogObj: {
				title: '',
				img: '',
				shopName: '',
				phone: '',
				address: ''
			},
			customHeaderRow: () => {
				return {
					className: 'selectBox',
					onClick: (e: any) => {
						if (e.target.className.includes('ant-table-column-title')) {
							if (currentSelectList.length === 2) {
								ctx.emit('player-key-change', '4', currentSelectList);
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
							selectIndex.push(data.tableList.findIndex((j) => j.playerId === i));
						});
						data.tableList.forEach((i, index) => {
							if (index !== selectIndex[1]) {
								i.disabled = true;
							}
						});
						const list = data.tableList;
						data.tableList = [...list];
					} else {
						data.tableList.forEach((i) => {
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
					dataIndex: 'data',
					key: 'name',
					slots: { title: 'date', customRender: 'team' }
				},
				{ dataIndex: 'data', key: 'time', slots: { title: 'Rating' } }
			],
			columns: [
				{
					dataIndex: 'sort',
					slots: { title: 'index' },
					fixed: 'left'
				},
				{
					dataIndex: 'data',
					width: 160,
					slots: { title: 'date', customRender: 'team' },
					fixed: 'left'
				},
				{
					dataIndex: 'playerRating.rating',
					slots: { title: 'Rating' },
					width: 80
				},
				{ dataIndex: 'playerRating.ppd', key: 'type', slots: { title: 'PPD' }, width: 70 },
				{ dataIndex: 'playerRating.mpr', key: 'type', slots: { title: 'MPR' }, width: 70 },
				{
					children: [
						{
							dataIndex: 'setResult.total',
							width: 70,
							slots: { title: 'total' }
						},
						{
							dataIndex: 'setResult.wins',
							width: 50,
							slots: { title: 'homeWin' }
						},
						{
							dataIndex: 'setResult.draws',
							width: 50,
							slots: { title: 'homeLose' }
						},
						{
							dataIndex: 'setResult.losses',
							width: 50,
							slots: { title: 'homeDraw' }
						},
						{
							dataIndex: 'setResult.winProbability',
							width: 90,
							slots: { title: 'homeChange' }
						}
					],
					slots: { title: 'homeTeam' }
				},
				{
					dataIndex: 'playerResultDetails.lowTon',
					width: 50,
					slots: { title: 'LT' }
				},
				{
					dataIndex: 'playerResultDetails.hatTrick',
					width: 70,
					slots: { title: 'HAT' }
				},
				{
					dataIndex: 'playerResultDetails.highTon',
					width: 50,
					slots: { title: 'HT' }
				},
				{
					dataIndex: 'playerResultDetails.highTonOut',
					width: 90,
					slots: { title: 'HTOFF' }
				},
				{
					dataIndex: 'playerResultDetails.lowTonOut',
					width: 90,
					slots: { title: 'LTOFF' }
				},
				{
					dataIndex: 'playerResultDetails.threeInBed',
					width: 70,
					slots: { title: 'BED' }
				},
				{
					dataIndex: 'playerResultDetails.ton80',
					width: 70,
					slots: { title: '180' }
				},
				{
					dataIndex: 'playerResultDetails.threeInBlack',
					width: 70,
					slots: { title: 'EYE' }
				},
				{
					dataIndex: 'playerResultDetails.fiveMarks',
					width: 60,
					slots: { title: '5M' }
				},
				{
					dataIndex: 'playerResultDetails.sixMarks',
					width: 60,
					slots: { title: '6M' }
				},
				{
					dataIndex: 'playerResultDetails.sevenMarks',
					width: 60,
					slots: { title: '7M' }
				},
				{
					dataIndex: 'playerResultDetails.eightMarks',
					width: 60,
					slots: { title: '8M' }
				},
				{
					dataIndex: 'playerResultDetails.nineMarks',
					width: 60,
					slots: { title: '9M' }
				},
				{
					dataIndex: 'playerResultDetails.whiteHorse',
					width: 60,
					slots: { title: 'WH' }
				}
			],
			tableList: [{ playerId: 1, disabled: false }],
			entryInfoPage: (id: number) => {
				ROUTER.push({
					path: 'playerInfo',
					query: {
						activeKey: '1',
						playerId: id
					}
				});
			},
			areaChange: () => {
				data.isChange = true;
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				getDataList();
			},
			yearChange: (value: number) => {
				console.log(value);
			},
			genderChange: () => {
				console.log(data.gender);
			},
			showDialog: (item: any) => {
				data.dialogObj.title = item.shopName;
				data.dialogObj.img = item.shopImg;
				data.dialogObj.shopName = item.shopName;
				data.dialogObj.phone = item.shopPhone;
				data.dialogObj.address = item.shopAddress;
				data.visible = true;
			},
			handleOk: () => {
				console.log(1);
			},
			countryChange: (value: number) => {
				indexCityHttp({ countryId: value }).then((res) => {
					data.areaList = res.data.data;
					if (data.areaList.length) {
						data.areaId = data.areaList[0]['areaId'];
					} else {
						data.areaId = null;
					}
					data.areaChange();
				});
			}
		});
		const getCountryList = () => {
			indexCountryHttp().then((res) => {
				if (res.data.data.length) {
					data.countryList = res.data.data;
					data.countryId = data.countryList[0]['countryId'];
					data.countryChange(data.countryList[0]['countryId']);
				}
			});
		};
		const getDataList = () => {
			const obj = {
				year: data.year,
				gender: data.gender,
				areaId: data.areaId,
				countryId: data.countryId,
				pageIndex: data.pageNum,
				pageSize: data.pageSize
			};
			playerRankingHttp(obj).then((res: any) => {
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
.genderBox {
	display: flex;
	align-items: center;
	height: 32px;
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
.tableImgBox {
	height: 40px;
	width: 40px;
	margin: 0 auto;
}
.tableImgBox img {
	width: 100%;
	height: 100%;
}
.tableBox {
	display: flex;
}
.tableMsgCentent {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
</style>
