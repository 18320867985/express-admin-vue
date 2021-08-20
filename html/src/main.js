import Vue from 'vue';
import ElementUI from 'element-ui';
Vue.use(ElementUI, {size: 'small', zIndex: 3000});

import router from "./routes";
import store from "./store"

import api from "./api/index.js";
Vue.prototype.$api = api;

import vee from './vee';
Vue.component('vee', vee.ValidationObserver);
Vue.component('vee-item', vee.ValidationProvider);

import App from './App.vue';
Vue.config.productionTip = false;

// 登录状态的检查
router.afterEach((to) =>
 {
    if(to.fullPath==="/login"&&store.getters.getUserinfo)
    {
        router.push("/");  
    }
    if(to.fullPath!=="/login"&&!store.getters.getUserinfo)
    {
        router.push("/login");  
    }
  })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

