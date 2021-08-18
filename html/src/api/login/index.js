import axios from "../ins.js";

// 用户登录
async function login_post (params)
{
	let res = await axios.post("/login/data", params).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}


export default {
	login_post,

}