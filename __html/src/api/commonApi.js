import axios from "./ins.js";

// 用户登录
async function postLoginData (params)
{
	let res = await axios.post("/login/data", params).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

async function postInitdata ()
{
	let res = await axios.post("/init/data").catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// 初始化，获取信息
async function getInitData (params)
{
	let res = await axios.get("/init/data",params).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

export default {
	postLoginData,
	postInitdata,
	getInitData,

}