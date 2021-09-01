<template>
<div class="login">
    <!--header-->
    <header class="login-hd">
        <div class="ctr">
            <!--左边logo-->
            <h1 class="login-hd-logo">
                <a href="">
                    <img src="../assets/vue.png" alt="home logo" />
                    <span> www.xxxx.com </span>
                </a>
                <span class="txt">
                    网站后台-管理系统
                    <!-- 欢迎登录 -->
                </span>
            </h1>
        </div>
    </header>

    <section class="login-cnt">
        <div class="login-cnt-tip">
            <p class="ctr">
                <span class="iconfont iconwarning"></span>依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号验证！
                将更有利于保护您的个人隐私。
            </p>
        </div>

        <div class="login-cnt-form">
            <div class="ctr relative">
                <div class="_pwr">
                    <p class="_tip">
                        <span class="iconfont iconwarning"></span>提示！注意要保管好自己的账号和密码，谨防被盗。
                    </p>

                    <div class="_item v-tab">
                        <!-- tab 标题-->
                        <ul class="_item-tab-ttl v-tab-btns">
                            <li class="v-tab-btn" v-bind:class="{ active: tabIndex == 0 }" @click="tabIndex = 0">
                                账号登录
                            </li>
                            <li class="v-tab-btn" v-bind:class="{ active: tabIndex == 1 }" @click="tabIndex = 1">
                                验证码登录
                            </li>
                        </ul>
                        <!-- tab 内容-->
                        <div class="_item-tab-cnt v-tab-cnt">
                            <!--账户登录-->

                            <div class="_item-tab-cnt-item v-tab-cnt-item" v-bind:class="{ in: tabIndex == 0 }" id="accountLogin" @keyup.enter="loginBtn">
                                <vee ref="userLogin" v-slot="{ invalid ,dirty}">
                                    <div class="__item">
                                        <vee-item rules="required" v-slot="{ errors }">
                                            <el-input v-model="userName" ref="userName" placeholder="输入/邮箱/用户名/已验证手机号" autocomplete="on"></el-input>
                                            <span class="text-danger" v-if="errors.length > 0">用户名不能为空！</span>
                                        </vee-item>
                                    </div>

                                    <div class="__item">
                                        <vee-item rules="required" v-slot="{ errors }">
                                            <el-input v-model="password" placeholder="输入密码" ref="password" type="password" autocomplete="on"></el-input>
                                            <span class="text-danger" v-if="errors.length > 0">密码不能为空！</span>
                                        </vee-item>
                                    </div>

                                    <div class="__item bfc">
                                        <a class="__reg fl" href="#">立即注册</a>
                                        <a class="__pwdlink fr" href="#">忘记密码？</a>
                                    </div>

                                    <div class="__item">
                                        <a class="__btn " href="#" @click.enter.13="loginBtn" :class="{'disabled':invalid&&dirty}" ref="loginBtn">登录</a>
                                    </div>
                                </vee>
                            </div>

                            <!--手机验证码登录-->
                            <div class="_item-tab-cnt-item v-tab-cnt-item" v-bind:class="{ in: tabIndex == 1 }" id="codeLogin">
                                <p class="login-error d-hide">~手机验证码录失败~</p>
                                <div class="__item">
                                    <input class="phone" type="text" name="name" maxlength="11" placeholder="输入已验证的手机号" autocomplete="off" />
                                </div>

                                <div class="__item __yzm vd-box">
                                    <a class="__yzm-btn">获取验证码</a>
                                    <div class="bfc">
                                        <input class="" type="text" placeholder="输入手机验证码" autocomplete="off" />
                                    </div>
                                </div>

                                <div class="__item bfc">
                                    <a class="__reg fl" href="#">立即注册</a>
                                    <a class="__pwdlink fr" href="#">忘记密码？</a>
                                </div>

                                <div class="__item">
                                    <a class="__btn vd-btn" href="#" @click="loginBtn">登录</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--轮播图-->
            <div class="login-cnt-slide">
                <div class="banner" data-time="5000">
                    <div class="banner-wrap">
                        <ul class="clearfix cont">
                            <li class="init" data-bg="#2d50d1">
                                <a>
                                    <img class="_fade-img" src="../assets/login-1.png" alt="登录大图" />
                                </a>
                            </li>

                            <li data-bg="#4439c3">
                                <a>
                                    <img class="_fade-img" src="../assets/login-2.png" alt="登录大图" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="login-ft">
        <p class="py ctr">
            COPYRIGHT ©Vue https://vuejs.bootcss.com 粤ICP备17088510号
        </p>
    </footer>
</div>
</template>

<script>
import commonApi from "../api/commonApi"
export default {
    data() {
        return {
            userName: "",
            password: "",
            tabIndex: 0,
            isLoding: false,
        };
    },
    methods: {
        async loginBtn() {

            if (this.password === "") {
                this.$refs.password.focus();

            }
            if (this.userName === "") {
                this.$refs.userName.focus();
            }

            this.$refs.userLogin.validate().then(async (success) => {
                if (!success) {
                    return;
                }

                if (this.isLoding) {
                    return;
                }
                this.isLoding = true;
                this.$refs.loginBtn.innerText = "...正在登录中";
                let res = await commonApi.postLoginData({
                    user: this.userName,
                    pwd: this.password,
                });
                this.$refs.loginBtn.innerText = "登录";
                this.isLoding = false;

                if (res && res.code == 1) {
                    let timeout = res.exp * 1000 - new Date().getTime();
                    this.$store.dispatch("autoEmitLogout", timeout);
                    this.$store.commit("setLoginUserinfo", res);
                    this.$router.push("/");

                    this.$message({
                        showClose: true,
                        message: "登录成功！",
                        type: "success",
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: "error",
                    });
                }
            });
        },
    },
    watch: {
        userinfo: function () {
            if (this.$store.getters.getUserinfo) {
                this.$router.push("/");
            }
        },
    },
    computed: {
        userinfo() {
            return this.$store.getters.getUserinfo;
        },
    }
};
</script>

<style>
</style>
