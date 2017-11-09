<template>
  <div>
     <!--网页头部-->
    <div id="header">
      <app-header></app-header>
    </div>
    <div id="set-cont">
      <!--网页左边栏-->

      <left-bar></left-bar>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import Header from './components/Header.vue'
import Leftbar from './components/Leftbar.vue'
import Index from './components/Index.vue'
import store from './vuex/store' // import 我们刚刚创建的 store
Vue.use(Vuex)

export default {
  store,
  components: {
    'app-header':Header,
    'left-bar':Leftbar
  }
}
</script>

<style scoped>

</style>
