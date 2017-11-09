import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import configRouter from './router-config'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import './assets/common.css'
import './assets/commonoa.css'
import './assets/ui.css'
Vue.config.debug = true;
Vue.use(VueRouter)

Vue.use(VueResource)
Vue.use(iView)

let Appstart = Vue.extend({})

let router = new VueRouter({
  history : true,
  transitionOnLoad:true
});

configRouter(router);

router.start(Appstart,"#app");

