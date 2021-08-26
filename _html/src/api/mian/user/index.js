import axios from "../../ins.js";


async function getData (pageIndex=1,pageSize=10,params)
{
	let res = await axios.get(`/main/user/data/${pageIndex}/${pageSize}`, {params}).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

async function getDataDtl (ids)
{
	let res = await axios.get(`/main/user/data-dtl/${ids}`).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

async function deleteData (ids)
{
	let res = await axios.delete(`/main/user/data/${ids}`).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

async function postData (obj)
{
	let res = await axios.post(`/main/user/data`,obj).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

async function putData (obj)
{
	let res = await axios.put(`/main/user/data/`,obj).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}


export default {
	getData,
	deleteData,
	getDataDtl,
	postData,
	putData

}