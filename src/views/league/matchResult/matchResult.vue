<template>
	<div class="content">
		<a-row>
			<a-col :span="4" class="smallTitle"> <SettingFilled /> {{ $t('default.62') }} </a-col>
		</a-row>
		<div v-if="tableList.length">
			<a-row v-for="(set, setIndex) in tableList" :key="setIndex">
				<a-row class="title">
					<a-col :span="3" class="winnerBox">
						<div class="winner" v-show="set.homeIsWin === 1">{{ 'Win' }}</div>
					</a-col>
					<a-col :span="9" class="leftBox">
						<div class="left">{{ `SET ${setIndex + 1}` }}</div>
					</a-col>
					<a-col :span="9" class="rightBox">
						<div class="right">{{ getGameType(set.mode) }}</div>
					</a-col>
					<a-col :span="3" class="winnerBox">
						<div class="winner" v-show="set.homeIsWin === 2">{{ 'Win' }}</div>
					</a-col>
				</a-row>
				<a-row v-for="(leg, legIndex) in set.legResultList" :key="legIndex">
					<a-row class="legBox">
						<a-col :span="4">{{ $t('default.10') }}</a-col>
						<a-col :span="3">{{ 'PPD' }}</a-col>
						<a-col :span="3">{{ $t('default.58') }}</a-col>
						<a-col :span="4">
							<div>{{ `leg  ${legIndex + 1} ${getGameMode(leg.gameName)}` }}</div>
						</a-col>
						<a-col :span="3">{{ $t('default.58') }}</a-col>
						<a-col :span="3">{{ 'PPD' }}</a-col>
						<a-col :span="4">{{ $t('default.10') }}</a-col>
					</a-row>
					<a-row v-for="(player, playerIndex) in leg.playerResultList" :key="playerIndex" class="playerBox">
						<a-col :span="4">
							<div class="playerImg">
								<div class="playerImgBox">
									<img :src="player.homeImg" alt="" />
								</div>
								<div class="playerName">{{ player.homePlayerName }}</div>
							</div>
						</a-col>
						<a-col :span="3">{{ player.homePpd || '-' }}</a-col>
						<a-col :span="3">{{ player.homeScore || '-' }}</a-col>
						<a-col :span="4" class="winStyle">
							<div class="WinStyle WinBox">{{ leg.homeIsWin === 1 ? 'win' : 'lose' }}</div>
							<div class="WinStyle">{{ leg.homeIsWin === 2 ? 'win' : 'lose' }}</div>
						</a-col>
						<a-col :span="3">{{ player.visitingScore || '-' }}</a-col>
						<a-col :span="3">{{ player.visitingPpd || '-' }}</a-col>
						<a-col :span="4">
							<div class="playerImg">
								<div class="playerImgBox">
									<img :src="player.homeImg" alt="" />
								</div>
								<div class="playerName">{{ player.visitingPlayerName }}</div>
							</div>
						</a-col>
					</a-row>
				</a-row>
			</a-row>
		</div>
		<div v-else>
			<emptyList />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
import { matchResultHttp } from '@/axios/api';
import { SettingFilled } from '@ant-design/icons-vue';
import emptyList from '@/components/common/emptyList.vue';
// import { DOM } from '@/type/interface';
export default defineComponent({
	name: 'matchResult',
	props: ['confrontationInfoId'],
	components: {
		SettingFilled,
		emptyList
	},
	setup(prop: any) {
		const data = reactive({
			tableList: [],
			getGameMode: (mode: number) => {
				let str = '';
				switch (mode) {
					case 1:
						str = '301 Game';
						break;
					case 2:
						str = '501 Game';
						break;
					case 3:
						str = '701 Game';
						break;
					default:
						str = 'Standard Cricket';
						break;
				}
				return str;
			},
			getGameType: (value: number) => {
				let str = '';
				switch (value) {
					case 1:
						str = 'Singles';
						break;
					case 2:
						str = 'Doubles';
						break;
					case 3:
						str = 'Team';
						break;
					default:
						str = 'Gallon';
						break;
				}
				return str;
			}
		});
		const getMatchResultList = (confrontationInfoId: any = '') => {
			matchResultHttp({ confrontationInfoId }).then((res) => {
				if (res.data.data) {
					data.tableList = res.data.data;
				}
			});
		};
		onMounted(() => {
			getMatchResultList(prop.confrontationInfoId);
		});
		watch(
			() => prop.confrontationInfoId,
			(val) => {
				getMatchResultList(val);
			}
		);
		return {
			...toRefs(data)
		};
	}
});
</script>

<style scoped>
.winnerBox {
	display: flex;
	justify-content: center;
	align-items: center;
}
.winner {
	background: #ff4e00;
	width: 60px;
	height: 30px;
	line-height: 30px;
	border-radius: 5px;
}
.leftBox {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.left {
	width: 90px;
	height: 30px;
	line-height: 30px;
	border: 1px solid #fff;
	border-radius: 10px;
	text-align: center;
}
.rightBox {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.right {
	width: 90px;
	height: 30px;
	line-height: 30px;
}
.title {
	height: 50px;
	line-height: 50px;
	display: flex;
	background: #b1b1b1;
	font-size: 25px;
	color: #fff;
}
.legBox {
	background: #ededed;
}
.legBox .ant-col {
	border: 1px solid #999;
}
.playerImgBox {
	width: 50px;
	height: 50px;
	padding: 5px;
	display: flex;
}
.playerImgBox img {
	width: 100%;
}
.playerBox .ant-col {
	border: 1px solid #999;
}
.playerBox {
	height: 50px;
	line-height: 50px;
}
.playerImg {
	display: flex;
}
.playerName {
	cursor: pointer;
}
.playerName:hover {
	text-decoration: underline;
}
.winStyle {
	display: flex;
	color: #ff4e00;
	font-weight: bold;
	font-size: 20px;
}
.winStyle div {
	width: 50%;
}
.WinBox {
	border-right: 1px solid #999;
}
</style>
