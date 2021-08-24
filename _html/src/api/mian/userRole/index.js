import axios from "../../ins.js";

// 用户登录
async function getAll (params)
{
	let res = await axios.get(`/main/userRole/all/`, {params}).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

export default {
	getAll

}