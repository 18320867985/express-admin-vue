
// 根模块区
import Layout from "../layout/index.vue"
import Login from "../views/login.vue"
import Home from "../views/home.vue"

// 子模块区
import User from "./user.js";
import Rotation from "./rotation.js";
import Series from "./series.js";

const routes = [

	{
		path: "/",
		component: Layout,
		name: "",
		meta: {ttl: "首页", icon: "el-icon-s-home"},
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
		meta: {ttl: "用户信息", icon: "el-icon-user"},
		children: User

	},

	{
		path: "/rotation",
		component: Layout,
		meta: {ttl: "图片管理", icon: "el-icon-picture"},
		children: Rotation

	},

	{
		path: "/series",
		component: Layout,
		meta: {ttl: "产品系列", icon: "el-icon-box"},
		children: Series

	},

	{
		path: "/svcnet",
		component: Layout,
		meta: {ttl: "服务中心", icon: "el-icon-data-line"},
		children: User

	},

	{
		path: "/article",
		component: Layout,
		meta: {ttl: "文章管理", icon: "el-icon-notebook-2"},
		children: User

	},

	{
		path: "/contact",
		component: Layout,
		meta: {ttl: "关于我们", icon: "el-icon-office-building"},
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
		redirect: "/"


	},

];

import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);

const createRouter = () => new VueRouter({
	mode: 'history', // require service support
	scrollBehavior: () => ({y: 0}),
	routes
})

const router = createRouter();
export function resetRouter ()
{
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
