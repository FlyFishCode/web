// 联赛信息
const leagueInfo = '/competitionoverview';
// 联赛下拉列表
const leagueSelect = '/divisionandstage';
// 联赛 时间表 获取排阵
const timeTableList = '/getTeamLineU';
// 联赛 获取对阵信息
const matchTableOptions = '/matchDate';
// 获取对阵表玩家下拉数据
const matchPlayerList = '/getTeamCompetitionPlayer';
// 查看对战列表
const matchtable = '/getMatchTableFightInfo';
// 提交排阵玩家
const submitMatchTable = '/playerIntoLeg';
// 联赛 队伍
const leagueTeam = '/competitionteam';
// 联赛 排名记录 玩家排名
const rankingPlayer = '/competitionplayerranking';
// 联赛 比赛信息
const matchInfo = '/information';
// 联赛 比赛信息下表格
const matchInfoTableList = '/matchcomposition';
// 联赛 时间表 对阵队伍
const matchTeamInfo = '/matchTeam';
// 联赛 时间表 列表
const timeTableDataList = '/competition/confrontation';
// 联赛 时间表 比赛结果
const matchResult = '/matchresult';
// 联赛 时间表 自定义滚动服务
const timetablecustom = '/schedule';
// 联赛 所有联赛
const leagueAllList = '/competition/schedule';
// 联赛 所有联赛
const leagueMyList = '/competition/myschedule';
// 联赛 AWARD
const awardInfo = '/competition/confrontationaward';
// 联赛 AWARD 主队列表
const awardHomeList = '/competition/confrontationplayerlist';
// 联赛 AWARD 客队列表
const awardAwayList = '/competition/confrontationplayerlist';
// 联赛 排名记录 联赛排名
const rakingLeagueList = '/competition/teamranking';
// 联赛 排名记录 奖励排名
const rakingRewardList = '/competition/teamaward';

// 弹框组件 接口
const dialogInfo = '/competition/teaminfo';
// 弹框队伍
const dialogTeamList = '/competition/teamplayer';
// 弹框队伍
const dialogHistoryList = '/competition/teamentryrecord';
export {
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
	leagueAllList,
	timeTableDataList,
	leagueMyList,
	awardHomeList,
	awardAwayList,
	awardInfo,
	rakingLeagueList,
	rakingRewardList,
	dialogInfo,
	dialogTeamList,
	dialogHistoryList
};
