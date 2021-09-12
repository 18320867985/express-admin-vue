
//  user
import  user from "../views/user/userList.vue";
import  usertype from "../views/user/userType.vue";
import  userInfo from "../views/user/userInfo.vue";
import  userPwd from "../views/user/userPwd.vue";

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
		component: userInfo,
		meta:{ ttl:"用户信息"},

	},

	{
		path: "userPwd",
		component: userPwd,
		meta:{ ttl:"修改密码"},

	},

];
