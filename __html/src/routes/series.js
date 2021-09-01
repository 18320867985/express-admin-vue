
//  user
import  user from "../views/user/userList.vue";
import  seriesType from "../views/series/seriesType.vue"

export default [
    {
		path: "",
		component: user,
		meta:{ ttl:"用户列表"},

	},
	{
		path: "seriesType",
		component: seriesType,
		meta:{ ttl:"系列类型"},

	},


];
