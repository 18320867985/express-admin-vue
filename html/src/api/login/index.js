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

async function test_get (params)
{
	let res = await axios.get("/test/data", params).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}


export default {
	login_post,
	test_get

}