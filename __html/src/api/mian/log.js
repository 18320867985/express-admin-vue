import axios from "../ins.js";

// get list 
async function getData (pageIndex=1,pageSize=10,params)
{
	let res = await axios.get(`/main/log/data/${pageIndex}/${pageSize}`, {params}).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// get dtl
async function getDataDtl (ids)
{
	let res = await axios.get(`/main/log/data-dtl/${ids}`).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// delete
async function deleteData (ids)
{
	let res = await axios.delete(`/main/log/data/${ids}`).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// post
async function postData (obj)
{
	let res = await axios.post(`/main/log/data`,obj).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// put 
async function putData (obj)
{
	let res = await axios.put(`/main/log/data/`,obj).catch(err =>
	{
		console.log(err)
	});
	return res && res.data;
}

// put editPwd 
async function putEditPwd (obj)
{
	let res = await axios.put(`/main/log/editPwd/`,obj).catch(err =>
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
	putData,
	putEditPwd

}