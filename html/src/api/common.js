import axios from "./ins.js";

// 初始化，获取信息
async function initdata (params)
{
	let res = await axios.get("/init/data",params).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

export default {
	initdata,

}