<template>
	<div class="content">
		<a-row>
			<a-col :span="12" class="smallTitle"> <SettingFilled /> {{ $t('default.102') }} </a-col>
		</a-row>
		<a-row>
			<a-col :lg="3" :xs="6">
				<a-select v-model:value="year" class="selectBox" @change="yearChange">
					<a-select-option v-for="yaer in yearLiat" :key="yaer.value" :value="yaer.value">{{ yaer.label }}</a-select-option>
				</a-select>
			</a-col>
			<a-col :lg="{ span: 3, offset: 18 }" :xs="0" class="sortColBox">
				<div>
					<div class="linkIcon">
						<span v-if="sortTeam" @click="changeSortTeam(1)"> {{ $t('default.256') }}<DownOutlined /> </span>
						<span v-else @click="changeSortTeam(2)"> {{ $t('default.256') }}<UpOutlined /> </span>
					</div>
				</div>
			</a-col>
		</a-row>
		<a-row v-for="(item, index) in matchList" :key="index">
			<a-row class="matchBox">
				<a-col :lg="14" :xs="22">
					<a-col :span="5">
						<img class="matchImg" :src="item.img" />
					</a-col>
					<a-col :span="10">
						<div @click="showMore(item.state)" class="divBg">
							<div>{{ item.title }}</div>
							<div class="divisionBox">
								<div v-for="div in item.divisiton" :key="div.index" class="divsision">{{ div.name }}</div>
							</div>
						</div>
					</a-col>
				</a-col>
				<a-col :lg="2" :xs="0">
					<div class="fontDisplay">{{ $t('default.167') }}</div>
					<div>{{ item.area }}</div>
				</a-col>
				<a-col :lg="6" :xs="0">
					<div class="rightStyle">
						<div class="fontDisplay">{{ $t('default.17') }}</div>
						<div class="matchState I" v-if="item.state === 1">{{ '比赛中' }}</div>
						<div class="matchState R" v-if="item.state === 2">{{ '比赛结束' }}</div>
						<div class="matchState F" v-if="item.state === 3">{{ '比赛结束' }}</div>
					</div>
					<div>{{ item.date }}</div>
				</a-col>
				<a-col :lg="2" :xs="2" class="iconFont">
					<div v-if="item.matchHistory.length">
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
					<div class="inPhoneTableDisplay">
						<a-row class="title">
							<a-col :span="12">{{ $t('default.156') }}</a-col>
							<a-col :span="12">{{ $t('default.157') }}</a-col>
						</a-row>
						<a-row v-for="history in item.matchHistory" :key="history.index" class="msgBox">
							<a-col :span="12" class="teamBox">
								<div class="teamName">{{ history.matchName }}</div>
							</a-col>
							<a-col :span="12" class="countBox">
								<div class="tableBox Header">
									<div>{{ '排行' }}</div>
									<div>{{ 'Rating' }}</div>
									<div>{{ 'PPD' }}</div>
									<div>{{ 'MPR' }}</div>
									<div>{{ 'Set 胜' }}</div>
									<div>{{ 'Set 和' }}</div>
									<div>{{ 'Set 败' }}</div>
								</div>
								<div class="tableBox Content">
									<div>{{ history.win }}</div>
									<div>{{ history.win }}</div>
									<div>{{ history.win }}</div>
									<div>{{ history.win }}</div>
									<div>{{ history.win }}</div>
									<div>{{ history.win }}</div>
									<div>{{ history.win }}</div>
								</div>
							</a-col>
						</a-row>
					</div>
					<div class="showPhoneTable">
						<div v-for="history in item.matchHistory" :key="history.index" class="marginBox">
							<a-row>
								<a-col class="borderBox" :span="6">{{ $t('default.156') }}</a-col>
								<a-col class="borderBox" :span="18">{{ 'history.matchName' }}</a-col>
							</a-row>
							<a-row>
								<a-col class="borderBox" :span="6">{{ $t('default.257') }}</a-col>
								<a-col class="borderBox" :span="18">{{ 'history.matchName' }}</a-col>
							</a-row>
							<a-row>
								<a-col :span="12" class="inPhoneCol">
									<div class="inphoneBg">{{ $t('default.157') }}</div>
									<div class="inPhoneCentent inphoneBg">
										<div>{{ 'Rating' }}</div>
										<div>{{ 'PPD' }}</div>
										<div>{{ 'MPR' }}</div>
									</div>
									<div class="inPhoneCentent">
										<div>1</div>
										<div>2</div>
										<div>3</div>
									</div>
								</a-col>
								<a-col :span="12" class="inPhoneCol">
									<div class="inphoneBg">{{ $t('default.258') }}</div>
									<div class="inPhoneCentent inphoneBg">
										<div>{{ $t('default.46') }}</div>
										<div>{{ $t('default.47') }}</div>
										<div>{{ $t('default.48') }}</div>
									</div>
									<div class="inPhoneCentent">
										<div>1</div>
										<div>2</div>
										<div>3</div>
									</div>
								</a-col>
							</a-row>
						</div>
					</div>
				</a-row>
			</transition>
		</a-row>
		<entryList :entryPath="entryPath" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import entryList from '@/components/common/entryList.vue';
import { SettingFilled, DownCircleOutlined, UpCircleOutlined, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'matchRecord',
	components: {
		SettingFilled,
		DownCircleOutlined,
		UpCircleOutlined,
		DownOutlined,
		UpOutlined,
		entryList
	},
	setup() {
		const Router = useRouter();
		const data = reactive({
			entryPath: '/players',
			year: 2020,
			sort: 1,
			sortTeam: true,
			yearLiat: [
				{ value: 2020, label: 2020 },
				{ value: 2019, label: 2019 }
			],
			matchList: [
				{
					matchId: 1,
					img: require('@/assets/1.jpg'),
					title: '2020第一次比赛',
					divisiton: [
						{ id: 1, name: '张三' },
						{ id: 2, name: '李四' }
					],
					area: '上海',
					date: '2020-9-10',
					state: 1,
					flag: false,
					matchHistory: [
						{
							matchName: 'Demo_A_Team',
							img: require('@/assets/1.jpg'),
							date: '2020-5-40 ~ 2020-6-10',
							place: '广州',
							win: 10
						},
						{
							matchName: 'Demo_A_Team',
							img: require('@/assets/1.jpg'),
							date: '2020-5-40 ~ 2020-6-10',
							place: '广州',
							win: 10
						}
					]
				},
				{
					matchId: 1,
					img: require('@/assets/1.jpg'),
					title: '2021第二次比赛',
					divisiton: [
						{ id: 1, name: '张三' },
						{ id: 2, name: '李四' },
						{ id: 3, name: '王五' }
					],
					area: '武汉',
					date: '2020-9-10',
					state: 2,
					flag: false,
					matchHistory: []
				},
				{
					matchId: 1,
					img: require('@/assets/1.jpg'),
					title: '2022第三次比赛',
					divisiton: [{ id: 1, name: '张三' }],
					area: '云南',
					date: '2020-9-10',
					state: 3,
					flag: false,
					matchHistory: []
				}
			],
			changeFlag: (index: number) => {
				data.matchList[index].flag = !data.matchList[index].flag;
			},
			yearChange: () => {
				console.log(1);
			},
			changeSortTeam: (value: number) => {
				data.sort = value;
				data.sortTeam = !data.sortTeam;
			},
			goHistory: () => {
				Router.push('/players');
			}
		});
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
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
.divBg {
	cursor: pointer;
	text-align: left;
}
.divisionBox {
	display: flex;
}
.divsision {
	border: 1px solid #000;
	padding: 0 2px;
	margin: 0 4px;
	text-decoration: underline;
}
.fontDisplay {
	color: #999;
}
.rightStyle {
	display: flex;
	justify-content: space-around;
}
.matchState {
	width: 100px;
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
.title {
	text-align: left;
	color: #999;
}
.msgBox {
	margin: 10px 0;
	height: 80px;
	box-sizing: border-box;
	border-bottom: 1px solid #eee;
	display: flex;
}
.teamBox {
	display: flex;
	align-items: center;
}
.teamName {
	text-align: left;
	font-size: 20px;
	font-weight: bold;
}
.countBox {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.tableBox {
	display: flex;
	justify-content: space-between;
	text-align: center;
}
.tableBox div {
	width: 75px;
	border: 1px solid #000;
}
.Header {
	background: #f1f0ed;
	color: #5a5a5a;
}
.recordBox {
	margin: 10px;
	padding: 0 20px;
	border: 1px solid #d4d4d4;
}
.showPhoneTable {
	display: none;
}
.borderBox {
	border: 1px solid #eee;
}
.marginBox {
	margin-bottom: 10px;
}
.inPhoneCol {
	border: 1px solid #999;
}
.inphoneBg {
	background: #ededed;
	border-bottom: 1px solid #999;
}
.inPhoneCentent {
	display: flex;
	justify-content: space-around;
	align-content: center;
}
.inPhoneCentent div {
	flex-grow: 1;
}
</style>
