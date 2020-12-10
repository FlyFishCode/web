import axios from 'axios';
import qs from 'qs';
import { message } from 'ant-design-vue';
// 此处使用路由，会报错
// inject() can only be used inside setup() or functional components
// import { useRouter } from 'vue-router'

// 首页
import { login, leagueList, indexTeam, indexPlayer, indexCountrylist, indexCitylist, indexNewslist, newslist, newsInfo, indexCarousel } from './index/index';

// 我的页面
import { myPageInfo, myMatchInfo, myMatchInfoMore, myBattleSelectList, myBattleDataList, myBattleDateList, myTeamList } from './myPage/index';

// 联赛
import {
	leagueInfo,
	leagueSelect,
	timeTableList,
	matchPlayerList,
	submitMatchTable,
	matchtable,
	matchTableOptions,
	leagueTeam,
	rankingPlayer,
	matchInfo,
	matchResult,
	matchTeamInfo,
	matchInfoTableList,
	timetablecustom,
	legaueAllList,
	timeTableDataList,
	legaueMyList
} from './league/index';

// 队伍
import { theBestTeam, teamList, teamdetails, timePageSelectList, timePageList, calendarList, vipList, historyResult } from '@/axios/team/index';

// 玩家
import { theBestPlayer, playerList } from '@/axios/player/index';

// 店铺
import { shopList, shopdetails, historyList, shopTeamList, shopPlayerList } from '@/axios/shop';

// 排名
import { teamRanking, playerRanking, teamSearch, teamDataList, playerSearch, playerDataList } from '@/axios/ranking';

const baseURL = '/apw';

const Axios = axios.create({
	baseURL: baseURL,
	timeout: 2000
});
let isLogin = false;
Axios.interceptors.request.use(
	(config) => {
		// 修改获取token时机，解决token验证问题
		const token = sessionStorage.getItem('token');
		if (config.url !== '/login' && token) {
			config.headers.common['Authorization'] = token;
		} else {
			if (!isLogin) {
				message.info('未登录');
			}
			isLogin = true;
			// window.location.href = window.location.origin + '/leaguefront/';
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

Axios.interceptors.response.use(
	(response) => {
		if (response.data.code === 401) {
			// Router.push({
			// 	path:'/',
			// })
		}
		return response;
	},
	(err) => {
		return Promise.reject(err);
	}
);

const getNewUrl = (url: string, data: any = null) => {
	if (data) {
		let src = url + '?';
		for (const [key, value] of Object.entries(data)) {
			src += `${key}=${value}&`;
		}
		return src.substring(0, src.length - 1);
	}
	return url;
};

// 判断是否为Form Data，如果是需要用qs转换
const loginHttp = (json: boolean, data: any) => {
	let DATA = '';
	if (json) {
		DATA = data;
	} else {
		DATA = qs.stringify(data);
	}
	return Axios.post(login, DATA);
};
// 国家列表
const indexCountryHttp = () => {
	return Axios.get(indexCountrylist);
};
// 区域列表
const indexCityHttp = (data: { countryId: number }) => {
	return Axios.get(getNewUrl(indexCitylist, data));
};
// 首页新闻列表
const indexNewsHttp = () => {
	return Axios.get(indexNewslist);
};
// 新闻列表
const newsHttp = (data: any) => {
	return Axios.post(newslist, data);
};
// 新闻详情
const newsInfoHttp = (data: any) => {
	return Axios.get(getNewUrl(newsInfo, data));
};
// 首页轮播图
const indexCarouselHttp = (data: any) => {
	return Axios.get(getNewUrl(indexCarousel, data));
};
// 首页联赛列表
const leagueListHttp = (data: any) => {
	return Axios.get(getNewUrl(leagueList, data));
};
// 首页队伍列表
const indexTeamHttp = (data: any = null) => {
	return Axios.get(getNewUrl(indexTeam), data);
};
// 首页玩家列表
const indexPlayerHttp = (data: any = null) => {
	return Axios.get(getNewUrl(indexPlayer, data));
};

//  我的页面 会员信息
const myPageInfoHttp = async (data: any = null) => {
	return Axios.get(getNewUrl(myPageInfo, data));
};

//  我的页面 我的比赛信息
const myMatchInfoHttp = (data: any = null) => {
	return Axios.post(myMatchInfo, data);
};
//  我的页面 我的比赛信息下拉请求
const myMatchMoreHttp = (data: any = null) => {
	return Axios.get(getNewUrl(myMatchInfoMore, data));
};
//  我的页面 我的对战下拉列表
const myBattleSelectHttp = (data: any = null) => {
	return Axios.get(getNewUrl(myBattleSelectList, data));
};
//  我的页面 我的对战列表数据
const myBattleDataListHttp = (data: any = null) => {
	return Axios.post(myBattleDataList, data);
};
//  我的页面 我的对战日历数据
const myBattleDateListHttp = (data: any = null) => {
	return Axios.post(myBattleDateList, data);
};
// 联赛 信息
const leagueInfoHttp = (data: any = null) => {
	return Axios.get(getNewUrl(leagueInfo, data));
};
// 联赛 所有联赛
const leagueAllListHttp = (data: any = null) => {
	return Axios.post(legaueAllList, data);
};
// 联赛 我的联赛y
const leagueMyListHttp = (data: any = null) => {
	return Axios.post(legaueMyList, data);
};
// 联赛 比赛信息
const matchInfoHttp = (data: any = null) => {
	return Axios.get(getNewUrl(matchInfo, data));
};
// 联赛 下拉数据
const leagueSelectHttp = (data: any = null) => {
	return Axios.get(getNewUrl(leagueSelect, data));
};
// 联赛 时间表 查看排阵
const timeTableLineHttp = (data: any = null) => {
	return Axios.get(getNewUrl(timeTableList, data));
};
// 联赛 时间表 列表数据
const timeTableDataListHttp = (data: any = null) => {
	return Axios.post(timeTableDataList, data);
};
// 联赛 时间表 自定义组件
const timetablecustomHttp = (data: any = null) => {
	return Axios.get(getNewUrl(timetablecustom, data));
};
// 联赛 查看时间
const matchDateHttp = (data: any = null) => {
	return Axios.get(getNewUrl(matchTableOptions, data));
};
// 联赛 获取对战列表玩家列表
const matchPlayerListHttp = (data: any = null) => {
	return Axios.get(getNewUrl(matchPlayerList, data));
};
// 联赛 获取对战列表玩家列表
const matchtableHttp = (data: any = null) => {
	return Axios.get(getNewUrl(matchtable, data));
};
// 联赛 提交排阵
const submitMatchTableHttp = (data: Array<any>) => {
	return Axios.post(submitMatchTable, data);
};
// 联赛 队伍
const leagueTeamHttp = (data: any = null) => {
	return Axios.post(leagueTeam, data);
};
// 联赛 记录 玩家排名
const rankingPlayerHttp = (data: any = null) => {
	return Axios.post(rankingPlayer, data);
};
// 联赛 时间表 对阵队伍
const matchTeamInfoHttp = (data: any = null) => {
	return Axios.get(getNewUrl(matchTeamInfo, data));
};
// 联赛 时间表 比赛对战组成列表
const matchInfoTableListHttp = (data: any = null) => {
	return Axios.get(getNewUrl(matchInfoTableList, data));
};
// 联赛 时间表 比赛结果
const matchResultHttp = (data: any = null) => {
	return Axios.get(getNewUrl(matchResult, data));
};

//  队伍 列表数据
const myTeamListHttp = (data: any = null) => {
	return Axios.post(myTeamList, data);
};
// 队伍 队伍详情
const teamdetailsHttp = (data: any = null) => {
	return Axios.get(getNewUrl(teamdetails, data));
};
// 队伍 最佳队伍
const teamBestListHttp = (data: any = null) => {
	return Axios.get(getNewUrl(theBestTeam, data));
};
// 队伍 时间表 下拉
const timePageSelectListHttp = (data: any = null) => {
	return Axios.get(getNewUrl(timePageSelectList, data));
};
// 队伍 时间表 列表数据
const timePageListHttp = (data: any = null) => {
	return Axios.post(timePageList, data);
};
// 队伍 时间表 日历数据
const calendarListHttp = (data: any = null) => {
	return Axios.post(calendarList, data);
};
// 队伍 以前结果 列表
const historyResultHttp = (data: any = null) => {
	return Axios.post(historyResult, data);
};
// 队伍 队伍列表
const teamListHttp = (data: any = null) => {
	return Axios.post(teamList, data);
};
// 队伍 会员 列表
const vipListHttp = (data: any = null) => {
	return Axios.post(vipList, data);
};

// 玩家 最佳玩家
const playerBestListHttp = (data: any = null) => {
	return Axios.get(getNewUrl(theBestPlayer, data));
};
// 玩家 队伍列表
const playerListHttp = (data: any = null) => {
	return Axios.post(playerList, data);
};

// 店铺 店铺列表
const shopListHttp = (data: any = null) => {
	return Axios.post(shopList, data);
};
// 店铺 店铺详情
const shopdetailsHttp = (data: any = null) => {
	return Axios.get(getNewUrl(shopdetails, data));
};
// 店铺 以前的结果 列表
const historyListHttp = (data: any = null) => {
	return Axios.post(historyList, data);
};
// 店铺 队伍 列表
const shopTeamListHttp = (data: any = null) => {
	return Axios.post(shopTeamList, data);
};
// 店铺 玩家 列表
const shopPlayerListHttp = (data: any = null) => {
	return Axios.post(shopPlayerList, data);
};
// 排名 队伍排名
const teamRankingHttp = (data: any = null) => {
	return Axios.post(teamRanking, data);
};
// 排名 玩家排名
const playerRankingHttp = (data: any = null) => {
	return Axios.post(playerRanking, data);
};
// 排名 队伍对比
const teamDataListHttp = (data: any = null) => {
	return Axios.post(teamDataList, data);
};
// 排名 队伍搜索
const teamSearchHttp = (data: any = null) => {
	return Axios.post(teamSearch, data);
};
// 排名 玩家搜索
const playerSearchHttp = (data: any = null) => {
	return Axios.post(playerSearch, data);
};
// 排名 玩家对比
const playerDataListHttp = (data: any = null) => {
	return Axios.post(playerDataList, data);
};
export {
	loginHttp,
	leagueListHttp,
	indexTeamHttp,
	indexPlayerHttp,
	myPageInfoHttp,
	myMatchInfoHttp,
	myMatchMoreHttp,
	indexCountryHttp,
	indexCityHttp,
	indexNewsHttp,
	newsHttp,
	newsInfoHttp,
	indexCarouselHttp,
	myBattleSelectHttp,
	myBattleDataListHttp,
	myBattleDateListHttp,
	myTeamListHttp,
	teamBestListHttp,
	playerBestListHttp,
	teamListHttp,
	playerListHttp,
	shopListHttp,
	shopdetailsHttp,
	historyListHttp,
	shopTeamListHttp,
	shopPlayerListHttp,
	teamdetailsHttp,
	timePageSelectListHttp,
	timePageListHttp,
	calendarListHttp,
	vipListHttp,
	timeTableLineHttp,
	historyResultHttp,
	matchPlayerListHttp,
	submitMatchTableHttp,
	matchtableHttp,
	teamRankingHttp,
	matchDateHttp,
	teamDataListHttp,
	teamSearchHttp,
	playerSearchHttp,
	playerDataListHttp,
	playerRankingHttp,
	leagueInfoHttp,
	leagueSelectHttp,
	leagueTeamHttp,
	rankingPlayerHttp,
	matchInfoHttp,
	matchResultHttp,
	matchTeamInfoHttp,
	matchInfoTableListHttp,
	timetablecustomHttp,
	leagueAllListHttp,
	timeTableDataListHttp,
	leagueMyListHttp
};
