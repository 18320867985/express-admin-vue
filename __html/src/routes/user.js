
//  user
import  user from "../views/user/userList.vue";
import  usertype from "../views/user/userType.vue";

export default [

	{
		path: "",
		component: user,
		meta:{ ttl:"用户列表",vid:2},

	},

	{
		path: "userType",
		component: usertype,
		meta:{ ttl:"用户类型",vid:2},

	},
	
	{
		path: "userInfo",
		component: usertype,
		meta:{ ttl:"用户信息"},

	},

	{
		path: "editPwd",
		component: usertype,
		meta:{ ttl:"修改密码"},

	},

];
