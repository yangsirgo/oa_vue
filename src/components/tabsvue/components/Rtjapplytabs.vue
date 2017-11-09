<template>
    <div id="tabs">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <rtjapply-tabsli v-for='item in items' :tab-data='item'></rtjapply-tabsli>
        </ul>
    <!-- Tab panes -->
    <div class="tab-content">
      <rtjapply-tabsdiv v-for='item in items' :tab-data='item' v-ref:tabsdiv></rtjapply-tabsdiv>
    </div>
    </div>
    <div class="bottom-btn">
      <button class="set-first-btn save_btn" @click='saveDraft'>保存草稿</button>
      <button id="add-pillperson" @click='clickTab'>新增报销人</button>
      <button class="submit_btn">{{isSubmit}}</button>
    </div>
</template>
<script>
import Rtjapplytabsli from '../views/Rtjapplytabsli.vue';
import Rtjapplytabsdiv from '../views/Rtjapplytabsdiv.vue';
import { PerReimApplyUserInfodata} from '../../../vuex/getters'
      var count = 0;
export default{
  data(){
    return {
      items:[
        {
          active:true,
          id:count
        }
      ]
    }
  },
  ready(){

  },
  components:{
    rtjapplyTabsli:Rtjapplytabsli,
    rtjapplyTabsdiv:Rtjapplytabsdiv
  },
  computed:{
    //判断是下一步还是提交
    isSubmit(){
      var self = this
      var array = this.$refs.tabsdiv
      var isNext = false
      array.forEach(function(item,index){
        item.reimburseTypeArray.forEach(function(itemin,indexin){
          if(itemin==2||itemin==3){
            isNext = true
          }
        })
      })
      console.log(isNext)
      return isNext?'保存并下一步':'保存并提交'
    },
    perReiburseDetailVoListInfo(){
      var self = this;
      var array = this.$refs.tabsdiv;
      //将数据放到tabdataarray数组里面
      var tabdataarray = []
      array.forEach(function(item,index){
        tabdataarray.push(item.persontabsData)
      })
      return {
        ifCommit:true,
        perReiburseDetailVoList:tabdataarray,
        personalReimburseApply:{
          applyUserId:self.applyPersonInfo.userId,
          companyId:self.applyPersonInfo.perReimInvoiceComanyId,
          reimburseType:"个人日常"
        }
      }
    }
  },
  methods:{
    saveDraft(){
      var array = this.$refs.tabsdiv;
      var issave = false;
      var Personindex = -1;
      //判断userid不能重复
      var useridArray = [];

      array.forEach(function(item,index){
        //选择的报销人不能重复
        if(useridArray.indexOf(item.datauserId)<0){
          useridArray.push(item.datauserId)
        }else{
          Personindex = index+1;
          alert('第'+Personindex+'tab报销人重复,重新填写报销人');
        }
        //有一tabs选择了报销人就可以保存
        issave = item.$validation.valid
      })
      console.log(this.perReiburseDetailVoListInfo);
      if(Personindex!='-1'){
        return;
      }
      if(!issave){
        alert('请填写报销人！')
        return
      }

    },
    draftAjax(){
      Vue.http.get({
                url:'http://localhost:8080/PersonalReimburse/reimburseInfo/listReimburseUsers',
                headers:{Authorization:'Basic Yxsdlfjui'},
                params:p
                })
    .then((response) => {
      if(response.data.code=="0001"){
         dispatch('APPLYDETAILS_INFO', response.data);
        };
    },(response) => {
        console.log('fail');
    });
    },
    clickTab () {
      //清除所有的active
      $('[role="presentation"]').removeClass('active');
      $('[role="tabpanel"]').removeClass('active');
      count++
      this.items.forEach(function(item){
        item.active=false
      })
      var tabsobj = {
          active:true,
          id:count
      }
      this.items.push(tabsobj);
    },
    closeTab(obj){
      //清除所有的active
      $('[role="presentation"]').removeClass('active');
      $('[role="tabpanel"]').removeClass('active');
      this.items = this.items.filter(function(item){
        return item.id != obj.id
      })
      this.items.forEach(function(item){
        item.active=false
      })
      this.items[this.items.length-1].active = true;
    }
  },
  vuex:{
    getters: {
        applyPersonInfo:PerReimApplyUserInfodata
    }
  }
  }
</script>
<style>
    .add-bill-table .action_coin span.add_coin{
        display: inline-block;
        zoom:1;
        *display:inline;
        position: relative;
        /*right: -1010px;*/
        margin-right: 15px;
        cursor: pointer;
        overflow:hidden;
        width: 20px;
        height: 20px;
        float:right;
        background-image: url("../../../assets/images/zengjia.jpg");
    }
    .add-bill-table .action_coin span.delete_coin{
        display: inline-block;
        zoom:1;
        *display:inline;
        position: relative;
        /*right: -1010px;*/
        margin-right: 15px;
        cursor: pointer;
        overflow:hidden;
        width: 20px;
        height: 20px;
        float:right;
        background-image: url("../../../assets/images/jianhao.jpg");
    }
    /*
        Created on : 2015-8-11, 16:18:09
        Author     : joe
    */

    .close-tab {
        font-size: 10px;
        position:absolute;
        right: 5px;
        top: 5px;
        padding-left: 25px;
        z-index: 100;
        cursor: hand;
        cursor: pointer;
        color: #94A6B0;
        display: none;
    }

    .nav-tabs {position: relative;}
    .nav-tabs li{position: relative;}

    .iframeClass {
        z-index: 1;
        visibility: inherit;
        width: 100%;
        frameborder: 'no';
        border: 0;
        marginwidth: 0;
        marginheight: 0;
        scrolling-x: 'no';
        scrolling-y: auto;
        allowtransparency: true;
    }

    .tab-drop {
        margin-right: 30px;
    }

    .rightMenu {
        position: absolute;
        width: 150px;
        z-index: 99;
        display: none;
    }
    #content-size-OA .process .btn{
        width: 1165px;
        text-align: right;
    }

    #content-size-OA .process .btn button{
        width: 98px;
        height: 34px;
        background-color: #539AE8;
        color: #fff;
    }

    #content-size-OA .bottom-btn{
        width: 1165px;
        margin-bottom: 42px;
    }

    #content-size-OA .bottom-btn button{
        width: 142px;
        height: 36px;
        line-height: 36px;
        background-color: #539be9;
        margin-left: 70px;
        color: #fff;
    }
    #content-size-OA .bottom-btn button a{
        color: #fff;
    }

    #content-size-OA .bottom-btn .set-first-btn{
        margin-left: 240px;
    }

    .all-total{
        width: 1165px;
        padding-top: 7px;
        margin-bottom:11px;
        text-align: right;
        font-weight:bold;
        font-size:20px;
    }
</style>
