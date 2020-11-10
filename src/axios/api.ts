import axios from 'axios'
import qs from 'qs'
import { useRouter } from 'vue-router'

// 首页
import { login,leagueList ,indexTeam,indexPlayer} from './index/index'

// 我的页面
import { myPageInfo,myMatchInfo,myMatchInfoMore } from './myPage/index'
const baseURL = "/apw"
const Router = useRouter()
const token = sessionStorage.getItem('token')

const Axios = axios.create({
	baseURL:baseURL,
	timeout:1000
})

Axios.interceptors.request.use((config) => {
	if(token){
		config.headers.common['Authorization'] = token
	}
	return config
}, err => {
	return Promise.reject(err)
})

Axios.interceptors.response.use(response => {
	if(response.data.code === 401){
		Router.replace({
			path:'/',
		})
	}
	return response
}, err => {
  return Promise.reject(err)
})

// const getNewUrl = (url:string ,data:any) =>  {
// 	let src = url
// 	for(const [key,value] of Object.entries(data)){
// 			src += `?${key}=${value}&`
// 		}
// 		return src
// }

// 判断是否为Form Data，如果是需要用qs转换
const loginHttp = (json: boolean ,data: any) => {
	let DATA = ''
	if(json){
		DATA = data
	}else{
		DATA = qs.stringify(data)
	}
	return Axios.post(login, DATA)
}
// 首页联赛列表
const leagueListHttp = (data: any) => {
	let url = leagueList
	if(data){
		for(const [key,value] of Object.entries(data)){
			url += `?${key}=${value}&`
		}
	}
	return Axios.get(url)
}
// 首页联赛列表
const indexTeamHttp = (data: any = null) => {
	let url = indexTeam
	if(data){
		for(const [key,value] of Object.entries(data)){
			url += `?${key}=${value}&`
		}
	}
	return Axios.get(url)
}
// 首页玩家列表
const indexPlayerHttp = (data: any = null) => {
	let url = indexPlayer
	if(data){
		for(const [key,value] of Object.entries(data)){
			url += `?${key}=${value}&`
		}
	}
	return Axios.get(url)
}

//  我的页面 会员信息
const myPageInfoHttp = (data: any = null) =>{
	let url = myPageInfo
	if(data){
		url += '?'
		for(const [key,value] of Object.entries(data)){
			url += `${key}=${value}&`
		}
	}
	return Axios.get(url)
}

//  我的页面 我的比赛信息
const myMatchInfoHttp = (data: any = null) =>{
	return Axios.post(myMatchInfo,data)
}
//  我的页面 我的比赛信息下拉请求
const myMatchMoreHttp = (data: any = null) =>{
	let url = myMatchInfoMore
	if(data){
		url += '?'
		for(const [key,value] of Object.entries(data)){
			url += `${key}=${value}&`
		}
	}
	return Axios.get(url)
}
export { loginHttp ,leagueListHttp,indexTeamHttp,indexPlayerHttp,myPageInfoHttp,myMatchInfoHttp,myMatchMoreHttp}