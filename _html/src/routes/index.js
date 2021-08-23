
// 根模块区
import Layout from "../layout/index.vue"
import Login from "../views/login.vue"
import Home from "../views/home.vue"

// 子模块区
import User from "./user.js";

const routes = [

	{
		path: "/",
		component: Layout,
		name: "",
		meta: { ttl: "首页", icon: "el-icon-s-home" },
		//	redirect: '/basic',
		children: [
			{
				path: "",
				component: Home,	
			}
		]
	},
	
	{
		path: "/user",
		component: Layout,
		meta: { ttl: "用户信息", icon: "el-icon-s-check" },
		children: User

	},
	
	{
		path: "/login",
		ttl: "登录",
		component: Login,
		hidden: true,
	},
	{
		path: "*",
		ttl: "",
		hidden: true,
		redirect:"/"
		

	},
		
];

import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);

const createRouter = () => new VueRouter({
	mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes
})

const router = createRouter();
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
