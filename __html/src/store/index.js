
import Vue from "vue";
import Vuex from "vuex";
import router from "../routes"
import commonApi from "../api/commonApi";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    authId:0, // 0 普通用户 1.系统管理员 2.超级管理员
    autoLogoutSetTimeoutId: 0,
    pageLoaded: false,

  },
  getters: {
    getUserinfo: (state) =>
    {
      if(!state.userInfo){
        state.userInfo= JSON.parse(window.sessionStorage.getItem("userinfo"));
      }
      return state.userInfo;
    },

    getUserVid: (state) =>
    {
      return state.authId;
    },

    getPageLoaded: (state) =>
    {
      return state.pageLoaded;
    },

  },
  mutations: {

    setUserinfo (state, userinfo)
    {
      window.sessionStorage.setItem("userinfo", JSON.stringify(userinfo))
      state.userInfo = userinfo;
      state.authId=userinfo&&userinfo.roleId.vid;
    },

    setLoginUserinfo (state, res)
    {
      window.sessionStorage.setItem("myToken", res.data.token);
      window.sessionStorage.setItem("exp", res.exp);
      window.sessionStorage.setItem("userinfo", JSON.stringify(res.data.userinfo))
      state.userInfo = res.data.userinfo;
      state.authId=res.data.userinfo&&res.data.userinfo.roleId.vid;
      state.pageLoaded = true;
    },

    setPageLoaded (state)
    {
      state.pageLoaded = true;
    },

    setTimeoutId (state, timeoutId)
    {
      clearTimeout(state.autoLogoutSetTimeoutId);
      state.autoLogoutSetTimeoutId = timeoutId;
    },

    logout (state)
    {
      state.userInfo = null;
      window.sessionStorage.clear();
      clearTimeout(state.autoLogoutSetTimeoutId);
      router.push("/login");
    },


  },
  actions: {

    autoEmitLogout ({commit}, timeout)
    {
      if (!timeout)
      {
        let exp = window.sessionStorage.getItem("exp");
        exp = Number(exp) || 0;
        timeout = exp * 1000 - new Date().getTime();
      }

      let timeoutId = setTimeout(() =>
      {
        commit("logout");
      }, timeout);
      commit("setTimeoutId", timeoutId);
    },

    initData ({commit, dispatch})
    {
      console.log("initGetData running")
      let userinfo = JSON.parse(window.sessionStorage.getItem("userinfo"));
      commonApi.getInitData(userinfo).then(res =>
      {
        if (res && res.code === 1)
        {
          commit("setUserinfo", res.data.userinfo);
          dispatch("autoEmitLogout");
        }
        commit("setPageLoaded");
      }).catch(err => {console.log(err)})

    },
    

  },

})




