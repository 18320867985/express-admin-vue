import axios from "../ins.js";


// get list 
async function getData (pageIndex=1,pageSize=10,params)
{
	let res = await axios.get(`/main/article/data/${pageIndex}/${pageSize}`, {params}).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// get dtl
async function getDataDtl (ids)
{
	let res = await axios.get(`/main/article/data-dtl/${ids}`).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// delete
async function deleteData (ids)
{
	let res = await axios.delete(`/main/article/data/${ids}`).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// post
async function postData (obj)
{
	let res = await axios.post(`/main/article/data`,obj).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// put 
async function putData (obj)
{
	let res = await axios.put(`/main/article/data/`,obj).catch(err =>
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