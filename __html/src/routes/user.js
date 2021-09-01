
//  user
import  user from "../views/user/userList.vue";
import  usertype from "../views/user/userType.vue";

export default [{
		path: "",
		component: user,
		meta:{ ttl:"用户列表"},

	},
	{
		path: "userType",
		component: usertype,
		meta:{ ttl:"用户类型"},

	},


];
