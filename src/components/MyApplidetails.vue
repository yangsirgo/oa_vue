<template>
  <div id="content">
    <div class="set-page-mbx">
        <span class="set-page-title">当前位置：我的申请<span style="font-family: 'microsoft yahei'">&nbsp;&gt;&nbsp;</span>查看报销详情 </span>
    </div>
    <process-img></process-img>
    <base-info></base-info>
    <div class="process">
      <span class="pass-name">明细</span>
      <div id="tabs" class="person-tabs">
        <tabs v-show='!istablistshow' keep-alive>
        </tabs>
        <Tabs-list v-show='istablistshow' keep-alive></Tabs-list>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import processImgvue from './basevue/processImg'
import baseinfovue from './basevue/baseinfo'
import Tabs from './tabsvue/components/Tabs.vue'
import Tabslist from './tabsvue/components/Tabslist.vue'
import store from '../vuex/store' // import 我们刚刚创建的 store
import { initInfo} from '../vuex/actions'
import { getdata,istablistshow} from '../vuex/getters'
Vue.use(VueRouter)
export default {
    store,
    components:{
      Tabs,
      processImg:processImgvue,
      baseInfo:baseinfovue,
      tabsList:Tabslist
    },
    created:function(){
      var self = this;
      // this.applydetails();
      var params = {
        applyId:self.$route.query.applyId
        };
       this.initInfo(params);
    },
    vuex: {
      actions: {
          initInfo,
      },
      getters: {
          getUserInfo:getdata,
          istablistshow
      }
    },
    //vuex没办法解决 拖鞋
    computed:{
      istablistshow:function () {
        return store.state.tabslistshow
      }
    }

}
</script>

<style scoped>
.process {
    padding-top: 17px;
    padding-left: 27px;
}
</style>
