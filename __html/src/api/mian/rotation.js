import axios from "../ins.js";

// get all list 
async function getAll (params)
{
	let res = await axios.get(`/main/rotation/all/`, {params}).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// get list 
async function getData (pageIndex=1,pageSize=10,params)
{
	let res = await axios.get(`/main/rotation/data/${pageIndex}/${pageSize}`, {params}).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// get dtl
async function getDataDtl (ids)
{
	let res = await axios.get(`/main/rotation/data-dtl/${ids}`).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// delete
async function deleteData (ids)
{
	let res = await axios.delete(`/main/rotation/data/${ids}`).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// post
async function postData (obj)
{
	let res = await axios.post(`/main/rotation/data`,obj).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// put 
async function putData (obj)
{
	let res = await axios.put(`/main/rotation/data/`,obj).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}



export default {
	getAll,
	getData,
	deleteData,
	getDataDtl,
	postData,
	putData

}