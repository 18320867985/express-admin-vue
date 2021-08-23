import axios from "../../ins.js";

// 用户登录
async function getData (pageIndex=1,pageSize=10,params)
{
	let res = await axios.get(`/main/user/data/${pageIndex}/${pageSize}`, {params}).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

export default {
	getData

}