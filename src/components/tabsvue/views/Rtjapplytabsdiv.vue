<template>
    <div role="tabpanel" class="tab-pane" :class="{'active': tabData.active}" id="tab{{tabData.id}}">
      <validator name='validation'>
                          <TABLE class="person-tabs-table table">
                            <TBODY>
                            <TR class="odd-tr-tbody">
                                <TD colSpan=6>
                                    <DIV align=left>报销人信息</DIV>
                                </TD>
                            </TR>
                            <TR class="even-tr-tbody">
                                <TD class="perc-10">
                                    <DIV align=center>报销人</DIV>
                                </TD>
                                <TD class="perc-24">
                                  <div>
                                    <autocomplete
                                    name="people"
                                    url="http://localhost:8080/HumanBasic/humanFulltimeUser/selectListByName"
                                    anchor="userName"
                                    label="userNumber"
                                    model="vModelLike"
                                    placeholder='请输入查询的'
                                    limit='2'>
                                  </div>
                                </TD>
                                <TD class="perc-10">
                                    <DIV align=center>报销人开户行</DIV>
                                    <input type="text" class="apply_userId" style="display: none"
                                    v-model='datauserId' id="username" v-validate:username="{
                                    required:{rule:true,message:'请填写报销人！'}
                                    }"/>
                                </TD>
                                <TD class="perc-25">
                                    <DIV align=center class="fontColor-set yinhang_add">{{selectPerReimUserInfo.perReimUserBankName}}</DIV>
                                </TD>
                                <TD class="perc-10">
                                    <DIV align=center>报销人账号</DIV>
                                </TD>
                                <TD>
                                    <DIV align=center class="fontColor-set yinhang_admin">{{selectPerReimUserInfo.perReimUserAccountNum}}</DIV>
                                </TD>
                            </TR>
                            </TBODY>
                        </TABLE>
                        <div class='errors'>
                          <Alert type="error" show-icon v-if='$validation.username.required'>请填写报销人！</Alert>
                        </div>
                        <form class="bill_form">
                          <bill-info v-for='billitem in billitems' :bill-data='billitem' v-ref:bill></bill-info>
                        </form>
                        <p class="all-total">报销总计:<span>{{totalMoney | currency '￥' 2}}</span></p>
      </validator>
    </div>
</template>
<script>
import Vue from 'vue'
import VueValidator from 'vue-validator'
import autocomplete from '../components/vue-autocomplete.vue'
import billinfo from './Billinfo.vue'
import { selectPerReimUserInfoajax} from '../../../vuex/actions'
import { selectPerReimUserInfodata} from '../../../vuex/getters'
Vue.use(VueValidator)


export default{
  props: {
      tabData: Object
  },
    data(){
    return{
       vModelLike: "",
       datauserId: '',
       billitems:[{id:0}],
       // //报销类型
       // reimburseTypeArray:[]
    }
  },
  components:{
    autocomplete,
    billInfo:billinfo
  },
  computed:{
    //报销类型入数组，判断是下一步还是提交使用
    reimburseTypeArray(){
      var array = this.$refs.bill;
      var reimburseArray = []
      array.forEach(function(item){
        reimburseArray.push(item.reimburseTypeVal)
      })
      return reimburseArray
    },
    totalMoney(){
      var array = this.$refs.bill;
      var totalCount = 0;
      array.forEach(function(item){
        totalCount = totalCount+item.RMBnumb
      })
      return totalCount;
    },
    billdatalist(){
      var array = this.$refs.bill;
      var billdatalistArray = [];
      array.forEach(function(item){
        billdatalistArray.push(item.billReimburseInvoiceInfo);
      })
      return billdatalistArray;
    },
    persontabsData(){
      return {
        personalReimburseDetail:{
          userId:this.datauserId
        },
        personalReimburseInvoiceInfoList:this.billdatalist
      }
    }
  },
  events:{
      // Autocomplete on selected
      'autocomplete:selected': function(name,data){
        this.datauserId = data.userId;
        //报销人选择后的开户行和报销人账号
        var params = {
          userId:data.userId
        };
        this.selectPerReimUserInfoajax(params);
      }
  },
  vuex:{
    getters: {
        selectPerReimUserInfo:selectPerReimUserInfodata
    },
    actions: {
        selectPerReimUserInfoajax
    }
  }
}
</script>
<style>
.autocomplete ul{
      z-index: 10000;
}
</style>
