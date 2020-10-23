import Axios from 'axios'
import { useRouter } from 'vue-router'
const baseURL = ""
const Router = useRouter()
const token = sessionStorage.getItem('token')


Axios.interceptors.request.use(config => {
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

const login = (url:string,parmas:any) => {
  Axios.get(url)
}
export {login}