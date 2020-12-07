<template>
	<div>
		<a-row>
			<a-col :span="12" class="centerFont"> <SettingFilled /> {{ $t('default.26') }} </a-col>
		</a-row>

		<a-row>
			<a-tabs type="card" class="tabsBox">
				<a-tab-pane key="1" :tab="$t('default.67')">
					<a-row>
						<a-col :span="12" class="smallTitle"> <SettingFilled /> {{ $t('default.67') }} </a-col>
					</a-row>
					<a-row>
						<a-col :lg="3" :xs="12">
							<a-select v-model:value="divisiton" @change="divisitonChange" class="selectBox">
								<a-select-option v-for="item in divisitonList" :key="item.divisionId" :value="item.divisionId">{{ item.divisionName }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :lg="3" :xs="12">
							<a-select v-model:value="stage" @change="stageChange" class="selectBox">
								<a-select-option v-for="item in stageList" :key="item.stageId" :value="item.stageId">{{ item.stageName }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :lg="{ span: 3, offset: 15 }" :xs="0">
							<a-button type="danger" @click="showMatchTable">{{ $t('default.151') }}</a-button>
						</a-col>
					</a-row>

					<a-row class="inPhoneTableDisplay">
						<showTeam />
					</a-row>

					<a-row class="rowStyle">
						<a-col :lg="2" :xs="8">
							<div><span class="iconRound"></span>{{ $t('default.73') }}</div>
						</a-col>
						<a-col :lg="{ span: 2, offset: 20 }" :xs="0">
							<a-button type="primary" size="small">{{ $t('default.69') }}</a-button>
						</a-col>
					</a-row>
					<a-row>
						<a-table class="inPhoneTableDisplay" :pagination="false" :data-source="tableList" bordered>
							<a-table-column key="lastName" title="排行" data-index="lastName" />
							<a-table-column-group>
								<template v-slot:title>队伍</template>
								<a-table-column key="lastName" title="队名" data-index="awayName">
									<template v-slot="{ record: row }">
										<img class="tableImg" :src="row.img" alt="" />
										<a @click="fastWay(row)">{{ row.homaName }}</a>
									</template>
								</a-table-column>
								<a-table-column key="firstName" title="RATING" data-index="firstName" />
								<a-table-column key="lastName" title="PPD" data-index="lastName" />
								<a-table-column key="lastName" title="MPR" data-index="lastName" />
							</a-table-column-group>
							<a-table-column key="lastName" title="总积分" data-index="lastName" />
							<a-table-column-group>
								<template v-slot:title>Match</template>
								<a-table-column key="firstName" title="胜" data-index="firstName" />
								<a-table-column key="firstName" title="败" data-index="firstName" />
								<a-table-column key="lastName" title="和" data-index="lastName" />
								<a-table-column key="lastName" title="胜率" data-index="lastName" />
							</a-table-column-group>
							<a-table-column-group>
								<template v-slot:title>Set</template>
								<a-table-column key="firstName" title="胜" data-index="firstName" />
								<a-table-column key="firstName" title="败" data-index="firstName" />
								<a-table-column key="lastName" title="和" data-index="lastName" />
								<a-table-column key="lastName" title="胜率" data-index="lastName" />
							</a-table-column-group>
							<a-table-column key="lastName" title="罚分" data-index="lastName" />
						</a-table>
						<!-- 移动端显示 -->
						<a-table class="showPhoneTable" :pagination="false" :scroll="{ x: 300 }" :columns="LeagueColumns" :data-source="tableList" bordered>
							<template v-slot:teamName="{ record }">
								<img class="tableImg" :src="record.img" alt="" />
								<a @click="fastWay(row)">{{ record.address }}</a>
							</template>
						</a-table>
					</a-row>

					<a-row class="rowStyle">
						<a-col :lg="2" :xs="8">
							<div><span class="iconRound"></span>{{ $t('default.74') }}</div>
						</a-col>
					</a-row>
					<a-row>
						<a-table class="inPhoneTableDisplay" :pagination="false" :data-source="tableList" bordered>
							<a-table-column key="lastName" title="排行" data-index="lastName" />
							<a-table-column key="lastName" title="队伍" data-index="awayName">
								<template v-slot="{ record: row }">
									<img class="tableImg" :src="row.img" alt="" />
									<a @click="fastWay(row)">{{ row.homaName }}</a>
								</template>
							</a-table-column>
							<a-table-column key="firstName" title="LT" data-index="firstName" />
							<a-table-column key="lastName" title="HAT" data-index="lastName" />
							<a-table-column key="lastName" title="HT" data-index="lastName" />
							<a-table-column key="lastName" title="HT.OFF" data-index="lastName" />
							<a-table-column key="firstName" title="LT.OFF" data-index="firstName" />
							<a-table-column key="firstName" title="BED" data-index="firstName" />
							<a-table-column key="lastName" title="180" data-index="lastName" />
							<a-table-column key="lastName" title="EYE" data-index="lastName" />
							<a-table-column key="firstName" title="5M" data-index="firstName" />
							<a-table-column key="firstName" title="6M" data-index="firstName" />
							<a-table-column key="lastName" title="7M" data-index="lastName" />
							<a-table-column key="lastName" title="8M" data-index="lastName" />
							<a-table-column key="lastName" title="9M" data-index="lastName" />
							<a-table-column key="lastName" title="WH" data-index="lastName" />
						</a-table>
						<!-- 移动端显示 -->
						<a-table class="showPhoneTable" :pagination="false" :scroll="{ x: 400 }" :columns="historyColumns" :data-source="tableList" bordered>
							<template v-slot:teamName="{ record }">
								<img class="tableImg" :src="record.img" alt="" />
								<a @click="fastWay(row)">{{ record.address }}</a>
							</template>
						</a-table>
					</a-row>
				</a-tab-pane>
				<!-- // 玩家排名 -->
				<a-tab-pane key="2" :tab="$t('default.68')">
					<a-row>
						<a-col :span="12" class="smallTitle"> <SettingFilled /> {{ $t('default.68') }} </a-col>
					</a-row>
					<a-row>
						<a-col :lg="3" :xs="12">
							<a-select v-model:value="divisiton" @change="divisitonChange" class="selectBox">
								<a-select-option v-for="item in divisitonList" :key="item.divisionId" :value="item.divisionId">{{ item.divisionName }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :lg="3" :xs="12">
							<a-select v-model:value="stage" @change="stageChange" class="selectBox">
								<a-select-option v-for="item in stageList" :key="item.stageId" :value="item.stageId">{{ item.stageName }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :lg="2" :offset="4" :xs="0" class="titleStyle"> <ClusterOutlined />{{ $t('default.140') }} </a-col>
						<a-col :lg="3" :xs="0">
							<a-select v-model:value="matchType" @change="matchTypeChange" class="selectBox">
								<a-select-option v-for="item in matchTypeList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
							</a-select>
						</a-col>
						<a-col :lg="3" :offset="6" :xs="0">
							<a-button type="danger" @click="showMatchTable">{{ $t('default.151') }}</a-button>
						</a-col>
					</a-row>
					<!-- 第一名展示信息 -->
					<a-row class="inPhoneTableDisplay">
						<showPersonal />
					</a-row>
					<a-row class="rowStyle">
						<a-col :lg="2" :xs="8">
							<div><span class="iconRound"></span>{{ $t('default.68') }}</div>
						</a-col>
						<a-col :lg="2" :offset="20" :xs="0">
							<a-button type="primary" size="small">{{ $t('default.69') }}</a-button>
						</a-col>
					</a-row>

					<a-row>
						<a-table :columns="playerColumns" :data-source="tableList" bordered :scroll="{ x: 1300 }" :pagination="paginationProps">
							<template #action="{ record:row }">
								<a>{{ row.name }}</a>
							</template>
							<template #player="{ record:row }">
								<div class="tableStyle">
									<div>
										<img class="tableImg" :src="row.img" alt="" />
									</div>
									<div>
										<div>{{ row.name }}</div>
										<a @click="fastWay(row)">{{ row.address }}</a>
									</div>
								</div>
							</template>
						</a-table>
					</a-row>
				</a-tab-pane>
			</a-tabs>
			<entryList :entryPath="entryPath" />
		</a-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs,onMounted } from 'vue';
import { leagueSelectHttp } from '@/axios/api'
// import { rowType } from "@/type/interface.d.ts";
import { useRouter } from 'vue-router';
import { SettingFilled, ClusterOutlined } from '@ant-design/icons-vue';
import showTeam from '@/components/showTeamTopOne.vue';
import showPersonal from '@/components/showPersonalTopOne.vue';
import entryList from '@/components/common/entryList.vue';
// eslint-disable-next-line @typescript-eslint/class-name-casing
interface rowType {
	[x: string]: string | number;
}
export default defineComponent({
	name: 'ranking',
	components: {
		SettingFilled,
		ClusterOutlined,
		showTeam,
		showPersonal,
		entryList
	},
	setup() {
		const Router = useRouter();
		const paginationProps = {
			showQuickJumper: false,
			pageSize: 10,
			current: 1,
			total: 50,
			onShowSizeChange: (current: number, pageSize: number) => {
				console.log(pageSize, current);
			},
			onChange: (current: number) => {
				console.log(current);
			}
		};
		const data = reactive({
			entryPath: '/league',
			monthList: [],
			stateList: [],
			matchType: 2020,
			matchTypeList: [{ value: 2020, label: '2020' }],
			stage: '',
			divisiton: '',
			stageList: [{ stageId: '' }],
			divisitonList: [{ divisionId: 0, stageList: [] }],
			columns: [
				{ title: '队名', dataIndex: 'homaName', key: 'homaName' },
				{ title: '对战地点', dataIndex: 'homaName', key: 'homaName' },
				{ title: '队长管理', dataIndex: 'awayName', key: 'homaName' },
				{ title: '玩家号码', dataIndex: 'homeScore', key: 'homaName' },
				{
					title: '标准等级',
					children: [
						{ title: 'RATING', dataIndex: 'state', key: 'homaName' },
						{ title: 'PPD', dataIndex: 'homeScore', key: 'homaName' },
						{ title: 'MPR', dataIndex: 'key', key: 'homaName' }
					]
				},
				{ title: '分配信息', dataIndex: 'data', key: 'homaName' },
				{ title: '比赛日程', dataIndex: 'data', key: 'homaName' }
			],
			LeagueColumns: [
				{
					title: '排行',
					width: 65,
					dataIndex: 'name',
					key: 'name',
					fixed: 'left',
					slots: { customRender: 'action' }
				},
				{
					title: '队名',
					width: 140,
					dataIndex: 'name',
					key: 'name',
					fixed: 'left',
					slots: { customRender: 'teamName' }
				},
				{ title: 'Rating', width: 80, dataIndex: 'name', key: 'name' },
				{ title: 'PPD', width: 80, dataIndex: 'name', key: 'name' },
				{ title: 'MPR', width: 80, dataIndex: 'name', key: 'name' },
				{ title: '总积分', width: 80, dataIndex: 'name', key: 'name' },
				{
					title: 'Match',
					dataIndex: 'name',
					key: 'name',
					children: [
						{ title: '胜', dataIndex: 'address', width: 80, key: '7' },
						{ title: '和', dataIndex: 'address', width: 80, key: '8' },
						{ title: '败', dataIndex: 'address', width: 80, key: '9' },
						{ title: '胜率', dataIndex: 'address', width: 80, key: '6' }
					]
				},
				{
					title: 'Set',
					dataIndex: 'name',
					key: 'name',
					children: [
						{ title: '胜', dataIndex: 'address', width: 80, key: '7' },
						{ title: '和', dataIndex: 'address', width: 80, key: '8' },
						{ title: '败', dataIndex: 'address', width: 80, key: '9' },
						{ title: '胜率', dataIndex: 'address', width: 80, key: '6' }
					]
				},
				{ title: '罚分', dataIndex: 'address', width: 80, key: '6' }
			],
			historyColumns: [
				{
					title: '排行',
					width: 65,
					dataIndex: 'name',
					key: 'name',
					fixed: 'left',
					slots: { customRender: 'action' }
				},
				{
					title: '队名',
					width: 140,
					dataIndex: 'name',
					key: 'name',
					fixed: 'left',
					slots: { customRender: 'teamName' }
				},
				{ title: 'LT', dataIndex: 'homeScore', width: 50, key: 'homaName' },
				{ title: 'HAT', dataIndex: 'homeScore', width: 60, key: 'homaName' },
				{ title: 'HT', dataIndex: 'homeScore', width: 60, key: 'homaName' },
				{ title: 'HT.OFF', dataIndex: 'homeScore', width: 85, key: 'homaName' },
				{ title: 'LT.OFF', dataIndex: 'homeScore', width: 80, key: 'homaName' },
				{ title: 'BED', dataIndex: 'homeScore', width: 70, key: 'homaName' },
				{ title: '180', dataIndex: 'homeScore', width: 70, key: 'homaName' },
				{ title: 'EYE', dataIndex: 'homeScore', width: 70, key: 'homaName' },
				{ title: '5M', dataIndex: 'homeScore', width: 60, key: 'homaName' },
				{ title: '6M', dataIndex: 'homeScore', width: 60, key: 'homaName' },
				{ title: '7M', dataIndex: 'homeScore', width: 60, key: 'homaName' },
				{ title: '8M', dataIndex: 'homeScore', width: 60, key: 'homaName' },
				{ title: '9M', dataIndex: 'homeScore', width: 60, key: 'homaName' },
				{ title: 'WH', dataIndex: 'homeScore', width: 60, key: 'homaName' }
			],
			playerColumns: [
				{
					title: '排行',
					width: 50,
					dataIndex: 'name',
					key: 'name',
					fixed: 'left',
					slots: { customRender: 'action' }
				},
				{
					title: '玩家',
					width: 180,
					dataIndex: 'age',
					key: 'age',
					fixed: 'left',
					slots: { customRender: 'player' }
				},
				{ title: 'Rating', dataIndex: 'address', width: 80, key: '1' },
				{ title: 'PPD', dataIndex: 'address', width: 80, key: '2' },
				{ title: 'MPR', dataIndex: 'address', width: 80, key: '3' },
				{
					title: 'Set',
					key: '4',
					children: [
						{ title: 'Total', dataIndex: 'address', width: 80, key: '5' },
						{ title: '胜率', dataIndex: 'address', width: 80, key: '6' },
						{ title: '胜', dataIndex: 'address', width: 80, key: '7' },
						{ title: '和', dataIndex: 'address', width: 80, key: '8' },
						{ title: '败', dataIndex: 'address', width: 80, key: '9' }
					]
				},
				{ title: 'LA', dataIndex: 'address', width: 80, key: '10' },
				{ title: 'HAT', dataIndex: 'address', width: 80, key: '11' },
				{ title: 'HT.OFF', dataIndex: 'address', width: 80, key: '12' },
				{ title: 'LT.OFF', dataIndex: 'address', width: 80, key: '13' },
				{ title: 'BED', dataIndex: 'address', width: 60, key: '14' },
				{ title: '180', dataIndex: 'address', width: 60, key: '15' },
				{ title: 'EYE', dataIndex: 'address', width: 60, key: '16' },
				{ title: '5M', dataIndex: 'address', width: 60, key: '17' },
				{ title: '6M', dataIndex: 'address', width: 60, key: '18' },
				{ title: '7M', dataIndex: 'address', width: 60, key: '19' },
				{ title: '8M', dataIndex: 'address', width: 60, key: '20' },
				{ title: '9M', dataIndex: 'address', width: 60, key: '21' },
				{ title: 'WH', dataIndex: 'address', width: 60, key: '22' }
			],
			tableList: [
				{
					key: '1',
					name: 'John Brown',
					age: 32,
					img: require('@/assets/1.jpg'),
					address: '晾挂个总队'
				},
				{
					key: '2',
					name: 'Jim Green',
					age: 40,
					img: require('@/assets/1.jpg'),
					address: '啊色彩总队'
				}
			],
			showMatchTable: () => {
				console.log('1111');
			},
			handleMenuClick: () => {
				console.log('1');
			},
			onSearch: () => {
				console.log('1');
			},
			Gohistory: () => {
				Router.push('/result');
			},
			fastWay: (row: rowType) => {
				console.log(row);
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
			matchTypeChange: (value: number) => {
				console.log(value);
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
		onMounted(() =>{
			getSelectList()
		})
		return {
			...toRefs(data),
			paginationProps
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
.tabsBox >>> .ant-tabs-nav-scroll {
	display: flex;
}
.secondFont {
	font-size: 15px;
	color: red;
}
.iconRound {
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	margin: 0 5px 0 0;
	background: red;
}
.tableStyle {
	display: flex;
	justify-content: space-around;
}
.showPhoneTable {
	display: none;
}
</style>
