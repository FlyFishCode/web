<template>
	<div>
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.153') }} </a-col>
		</a-row>

		<a-row class="rowStyle rowSearchBox">
			<a-col :lg="3" :xs="8">
				<a-select v-model:value="divisiton" @change="divisitonChange" class="selectBox">
					<a-select-option v-for="item in divisitonList" :key="item.divisionId" :value="item.divisionId">{{ item.divisionName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="3" :xs="8">
				<a-select v-model:value="stage" @change="stageChange" class="selectBox">
					<a-select-option v-for="item in stageList" :key="item.stageId" :value="item.stageId">{{ item.stageName }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="{ span: 2, offset: 8 }" :xs="0" class="titleStyle"> <SearchOutlined class="fontIcon" />{{ $t('default.140') }} </a-col>
			<a-col :lg="3" :xs="8">
				<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
					<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ $t(item.label) }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="5" :xs="0">
				<a-input-search v-model:value="currentValue" :enter-button="$t('default.16')" size="default" @search="onSearch" />
			</a-col>
		</a-row>
		<!-- 表格 -->
		<a-row class="inPhoneTableDisplay">
			<a-table :columns="columns" :data-source="tableList" rowKey="teamId" bordered>
				<template v-slot:teamName="{ record }">
					<img class="tableImg" :src="record.img" alt="" />
					<a @click="showInfo(record)">{{ record.homaName }}</a>
				</template>
				<template v-slot:addres="{ record }">
					<div class="addres">
						<div>{{ record.addres }}</div>
						<div class="icon" @click="showDialog(record)"><EnvironmentOutlined /></div>
					</div>
				</template>
				<template v-slot:matchTable="{ record }">
					<a-button class="tableBtn" size="small" @click="fastWay(record)">{{ $t('default.271') }}</a-button>
				</template>
			</a-table>
		</a-row>
		<!-- 移动端显示 -->
		<a-row class="eveyTeam showPhoneTable" v-for="item in tableList" :key="item.id">
			<a-col :lg="3" :xs="6" class="imgColStyle">
				<div>
					<img class="tableImg" :src="item.img" alt="" />
				</div>
				<div class="placeStyle">
					<div>{{ item.homaName }}</div>
					<div class="counyStyle">
						{{ item.awayName }}
						<span @click="showDetail">
							<EnvironmentOutlined />
						</span>
					</div>
				</div>
			</a-col>
			<a-col :lg="4" :xs="14" class="topBox">
				<a-col>{{ item.homaName }}</a-col>
				<a-col class="infoStyle">
					<a-col>{{ `Rating  ${item.ranting}` }}</a-col
					>|<a-col>{{ `PPD  ${item.PPD}` }}</a-col
					>|<a-col>{{ `MPR  ${item.MPR}` }}</a-col>
				</a-col>
			</a-col>
			<a-col :lg="3" :xs="4" class="vipBox">
				<a-col> <UserOutlined />{{ item.homeScore }} </a-col>
			</a-col>
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
		<entryList :entryPath="entryPath" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import entryList from '@/components/common/entryList.vue';
import { useRouter } from 'vue-router';
import { SearchOutlined, SettingFilled, UserOutlined, EnvironmentOutlined } from '@ant-design/icons-vue';
import { leagueSelectHttp } from '@/axios/api';
// eslint-disable-next-line @typescript-eslint/class-name-casing
interface rowType {
	[x: string]: string | number;
}
export default defineComponent({
	name: 'matchTeam',
	components: {
		SearchOutlined,
		SettingFilled,
		UserOutlined,
		EnvironmentOutlined,
		entryList
	},
	setup() {
		const Router = useRouter();
		const data = reactive({
			entryPath: '/league',
			visible: false,
			monthList: [],
			stateList: [],
			currentValue: '',
			stage: '',
			matchType: 1,
			divisiton: '',
			stageList: [{ stageId: '' }],
			divisitonList: [{ divisionId: 0, stageList: [] }],
			matchTypeList: [
				{ value: 1, label: 'default.55' },
				{ value: 2, label: 'default.248' },
				{ value: 3, label: 'default.94' }
			],
			columns: [
				{
					title: '队名',
					dataIndex: 'name',
					key: 'name',
					slots: { customRender: 'teamName' }
				},
				{
					title: '对战地点',
					dataIndex: 'age',
					key: 'age',
					slots: { customRender: 'addres' }
				},
				{
					title: '队长',
					dataIndex: 'address',
					key: 'address'
				},
				{
					title: '玩家人数',
					key: 'tags',
					dataIndex: 'tags',
					slots: { customRender: 'tags' }
				},
				{
					title: 'CRITERIA RATING',
					key: 'action',
					children: [
						{
							title: 'RATING',
							key: 'tags',
							dataIndex: 'tags'
						},
						{
							title: 'PPD',
							key: 'tags',
							dataIndex: 'tags'
						},
						{
							title: 'MPR',
							key: 'tags',
							dataIndex: 'tags'
						}
					]
				},
				{
					title: 'ALLOCATION INFORMATION',
					key: 'tags',
					dataIndex: 'tags'
				},
				{
					title: '对战时间表',
					key: 'tags',
					dataIndex: 'tags',
					slots: { customRender: 'matchTable' }
				}
			],
			tableList: [
				{
					teamId: 1,
					type: 1,
					homaName: '张自然',
					addres: '上海市虹口区',
					img: require('@/assets/1.jpg')
				}
			],
			dialogObj: {
				title: '',
				img: '',
				phone: '',
				address: '',
				shopName: ''
			},
			handleOk: () => {
				console.log('ok');
			},
			showDialog: (row: any) => {
				data.dialogObj.title = row.areaName;
				data.dialogObj.img = row.shopImg;
				data.dialogObj.shopName = row.shopName;
				data.dialogObj.phone = row.shopPhone;
				data.dialogObj.address = row.shopAddress;
				data.visible = true;
			},
			showInfo: (row: any) => {
				console.log(row);
			},
			fastWay: (row: any) => {
				console.log(row);
			},
			onSearch: () => {
				console.log('1');
			},
			Gohistory: () => {
				Router.push('/result');
			},
			divisitonChange: (value: number) => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				data.stageList = data.divisitonList.find((i) => i.divisionId === value)!.stageList;
				if (data.stageList.length) {
					data.stage = data.stageList[0].stageId;
				} else {
					data.stage = '';
				}
			},
			stageChange: () => {
				console.log(1);
			},
			matchTypeChange: () => {
				console.log(1);
			}
		});
		const getSelectList = () => {
			leagueSelectHttp({ competitionId: 234 }).then((res) => {
				data.divisitonList = res.data.data;
				data.divisiton = res.data.data[0].divisionId;
				data.stageList = res.data.data[0].stageList;
				data.stage = res.data.data[0].stageList[0].stageId;
			});
		};
		onMounted(() => {
			getSelectList();
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.tableBtn {
	border-color: red;
	border-radius: 15px;
}
.tableImg {
	width: 50px;
	margin: 0 10px 0 0;
}
.tableImg img {
	width: 100%;
}
.showPhoneTable {
	display: none;
}
.imgColStyle {
	height: 100%;
	display: flex;
	text-align: left;
	justify-content: space-around;
	align-items: center;
}
.infoClass {
	text-align: left;
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
.eveyTeam {
	border: 1px solid #2b2b2b;
	border-radius: 5px;
	height: 60px;
}
.vipBox {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.icon {
	cursor: pointer;
}
.addres {
	display: flex;
	align-items: center;
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
