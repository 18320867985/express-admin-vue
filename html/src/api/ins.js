import axios from 'axios'; // 引入axio
import router from "../routes"

let axios_ins = axios.create();

// config
// 注意 开启跨域要于vue.config.js文件配置优先 

let baseURL = 'http://localhost:3000'; 
//let baseURL = 'http://192.168.1.41:60002/';
//let contentType = "application/x-www-form-urlencoded;charset=UTF-8";

axios_ins.defaults.baseURL = baseURL;
axios_ins.defaults.timeout = 10000;

// axios_ins.defaults.headers.post[ 'Content-Type' ] = contentType;
// axios_ins.defaults.headers.put[ 'Content-Type' ] = contentType;

//添加请求的拦截器
axios_ins.interceptors.request.use(function (config)
{
	//在发送请求之前做某事
	//console.log("config",config)
	let token=window.sessionStorage.getItem("myToken")||"";
	config.headers[ 'Access-Token' ] = token ;// 让每个请求携带自定义 token 请根据实际情况自行修改
	return config;

}, function (error)
{
	//请求错误时做些事
	return Promise.reject(error);
});

//添加响应的拦截器
axios_ins.interceptors.response.use(function (response)
{
	//对响应数据做些事
	//console.log("response",response)
	if(response.status===200)
	{	
		if(response.data.code===2)  // not token 
		{
			if(router.history.current.fullPath==="/login"){
				return;
			}
			router.push("/login"); //没有access token 跳回登录页
			return ;
		}
	}
	return response;

}, function (error)
{
	//请求错误时做些事
	return Promise.reject(error);
});


export default axios_ins;
