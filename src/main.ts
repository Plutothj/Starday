import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


import {post,fetch,patch,put} from './request/http'
import VueLazyload from 'vue-lazyload' 
// import Calendar from 'vue-mobile-calendar'
import VueI18n from 'vue-i18n'
import zh from '@/language/locales/zh_CN'
import jp from '@/language/locales/ja_JP'
import Common from '@/until/common'
import 'vant/lib/index.css'
import VueQriously from "vue-qriously";


import coupon from 'v-coupon'

import Component from 'vue-class-component'

// import Vconsole from 'vconsole'
// const vConsole:any = new Vconsole()

// Vue.use(vConsole)
Component.registerHooks([
  'beforeRouteEnter',//进入路由之前
  'beforeRouteLeave',//离开路由之前
  'beforeRouteUpdate'
])
Vue.use(coupon)
Vue.use(VueQriously)

Vue.use(VueI18n)
Vue.use(Common)


Vue.use(VueLazyload,{
  error:'./static/img/default_loding.png',
  loading:'./static/img/default_loding.png'
});


// Vue.use(Calendar);
//定义全局变量
Vue.prototype.locale = ()=>{}
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$axios=axios;
Vue.config.productionTip = false
const i18n = new VueI18n({
  locale: localStorage.getItem('local')||'jp', // 语言标识
  messages: {
    'zh': zh,
    'jp': jp
  }
})

const isDebug_mode = process.env.NODE_ENV !== 'production'

// Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
 //  mounted () {
 // // You'll need this for renderAfterDocumentEvent.
 // document.dispatchEvent(new Event('render-active'))
 // }
}).$mount('#app')
