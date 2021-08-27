
//  user
import  user from "../views/user/userlist.vue";
import  usertype from "../views/user/usertype.vue";

export default [{
		path: "",
		component: user,
		meta:{ ttl:"用户列表"},

	},
	{
		path: "usertype",
		component: usertype,
		meta:{ ttl:"用户类型"},

	},


];
