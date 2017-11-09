/*
* @Author: Xcar
* @Date:   2016-12-12 15:12:39
* @Last Modified by:   Xcar
* @Last Modified time: 2016-12-23 17:19:10
*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 创建一个对象来保存应用启动时的初始状态
const state = {
// TODO: 放置初始状态
  items:'',
  personapplydetailIterms:'',
  tabslistshow:false,
  selectPerReimUserInfo:'',
  applytypeOption:'',
  applyTaxListOption:'',
  applyCurrencyList:'',
  //人员基本信息
  PerReimApplyData:''
}
// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
 // TODO: 放置我们的状态变更函数
   APPLYDETAILS_INFO(state, data){
      state.items = data.body;
   },
   PERSONAPPLYDETAILS_INFO(state, data){
      state.personapplydetailIterms = data.body;
   },
   SHOWAPPLYDETAILS(state){
      state.tabslistshow =!(state.tabslistshow);
   },
   SELECTPERREIMUSER_INFO(state, data){
      state.selectPerReimUserInfo = data.body;
   },
   APPLYTYPEOPTION_INFO(state, data){
      state.applytypeOption = data.body;
   },
   APPLYTAXLISTOPTION_INFO(state, data){
      state.applyTaxListOption = data.body;
   },
   APPLYCURRENCYLIST_INFO(state, data){
      state.applyCurrencyList = data.body;
   },
   PERPEIMAPPLYUSERDATA_INFO(state, data){
      state.PerReimApplyData = data.body;
   }
}
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations
})
