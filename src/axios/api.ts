import axios from 'axios'
import qs from 'qs'
import { useRouter } from 'vue-router'

import { login,leagueList ,indexTeam,indexPlayer} from './index/index'

const baseURL = "/aps"
const Router = useRouter()
const token = sessionStorage.getItem('token')

const Axios = axios.create({
	baseURL:baseURL,
	timeout:1000
})

Axios.interceptors.request.use((config) => {
	if(token){
		config.headers.common['token'] = token
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
export { loginHttp ,leagueListHttp,indexTeamHttp,indexPlayerHttp}