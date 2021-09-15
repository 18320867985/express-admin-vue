<template>
<el-container class="index" ref="index">
    <el-header class="index-h">
        <div>
            <div class="fr">
                <span class="username">{{getUserinfo&&getUserinfo.roleId&&getUserinfo.roleId.name}}：{{getUserinfo&&getUserinfo.name}}</span>
                <el-button size="small" @click="logout" round>退出登录</el-button>
            </div>
            <img src="../assets/vue.png" alt="Alternate Text" />
            网站后台-管理系统
        </div>
    </el-header>

    <el-container class="index-cnt">
        <el-scrollbar wrap-class="scrollbar-wrapper" class="index-cnt-aside" :class="{ open: !isCollapse }">
            <el-aside class="index-aside" :class="{ open: !isCollapse }">
                <!--导航菜单-->
                <el-menu :default-active="$route.path" :collapse="isCollapse" router ref="menu">
                    <template v-for="(item, index) in activePaths">

                        <el-submenu :index="index++ + ''" :key="index" v-if="item.path!=='/'">
                            <template slot="title">
                                <i :class="item.meta && item.meta.icon"></i>
                                <span slot="title">{{ item.meta && item.meta.ttl }} </span>
                            </template>
                            <el-menu-item-group>
                                <template v-for="(child, index2) in item.children">
                                    <router-link :index="index + '-' + index2" class="el-menu-item" :to="child.path ? item.path + '/' + child.path : item.path" active-class="is-active" :key="child.path" tag="li" exact v-if="!child.hidden">
                                        {{ child.meta && child.meta.ttl }}
                                    </router-link>
                                </template>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item :index="index++ + ''" :key="index" v-if="item.path==='/'" class="item-home" :class="{'active':$route.fullPath==='/'}">
                            <i :class="item.meta && item.meta.icon"></i>
                            <span slot="title">{{ item.meta && item.meta.ttl }} </span>
                        </el-menu-item>
                    </template>

                </el-menu>
            </el-aside>
        </el-scrollbar>

        <div class="index-main">
            <el-main class="column">

                <!-- 导航条 -->
                <ul class="index-main-nav">
                    <li>
                        <i class="index-h-icon" @click="isCollapse = !isCollapse" :class="isCollapse ? 'el-icon-s-unfold ' : 'el-icon-s-fold'"></i>
                    </li>
                    <router-link class="li-link home-link" tag="li" to="/" >首页</router-link>
                    <router-link class="li-link child-link" tag="li" v-for="(item, index) in navbars" :key="index" to="" >{{ item.meta.ttl }}</router-link>

                </ul>

                <!-- 路由页 -->
                <transition name="slide-fade">
                    <router-view></router-view>
                </transition>

                <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" size="small">
                    <span>确定退出登录?</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="logout">确 定</el-button>
                    </span>
                </el-dialog>
            </el-main>
        </div>
    </el-container>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            admin: "admin",
            centerDialogVisible: false,
            isCollapse: false,
            navbars: [],
        };
    },
    methods: {
        logout() {
            this.$confirm(" 是否退出登录?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.$store.commit("logout");
            });
        },
        // 设置动态导航条
        getnavbars() {
            this.navbars = this.$route.matched.filter((item) => item.meta && item.meta.ttl && item.path !== '');
        },

        openCurrentMenu() {
            let currentPath = this.$router.history.current.fullPath;
            let rts =this.activePaths; //this.$router.options.routes;
            let result = 0;
            for (let i = 0; i < rts.length; i++) {
                let path = rts[i].path;
                if (path === currentPath) {
                    result = i;
                    break;
                }
                let children = rts[i].children || [];
                for (let i2 = 0; i2 < children.length; i2++) {
                    let path2 = children[i2].path === "" ? path : path + "/" + children[i2].path;
                    if (currentPath === path2) {
                        result = i;
                        break;
                    }

                }
            }
            return result;
        }
    },
    computed: {

        getUserVid() {
            return this.$store.getters.getUserVid;
        },
        activePaths() {
            return this.$router.options.routes.filter((item) => !item.hidden).filter((item) => {

                // leve2 遍历vid修改hidden值
                item.children.forEach(child => {
                    if (child.meta) {
                        if (child.meta.vid && child.meta.vid === this.getUserVid) {
                            child.hidden = false;
                        }
                        if (child.meta.vid && child.meta.vid !== this.getUserVid) {
                            child.hidden = true;
                        }
                    }
                });

                 // leve1 遍历vid的过滤每一项 
                if (!item.meta.vid) {
                    return true;
                }
                if (item.meta.vid && item.meta.vid === this.getUserVid) {
                    return true;
                } else {
                    return false;
                }
            });
        },
        
        getUserinfo() {
            return this.$store.getters.getUserinfo;
        }
    },
    watch: {
        $route() {
            this.getnavbars();
        },
    },
    created() {
        this.getnavbars();
    },
    mounted() {

        // 设置 iframe 高度
        var $el = document.querySelector(".index");
        resetWidth();
        window.onresize = function () {
            resetWidth();
        };

        function resetWidth() {
            var win_h = $el.offsetHeight;
            var h_w = $el.querySelector(".index-h").offsetHeight;
            var $cnt = document.querySelector(".index-cnt");
            if ($cnt) {
                $cnt.style.height = win_h - h_w + "px";
            }

        }

        // open menu
        let openIndex = this.openCurrentMenu();
        if (openIndex > 0) {
            this.$refs.menu.open(openIndex)
        }

    },
};
</script>

