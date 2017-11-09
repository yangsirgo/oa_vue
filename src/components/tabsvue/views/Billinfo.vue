<template>
  <TABLE class="add-bill-table  table">
      <TBODY>
      <TR class="odd-tr-tbody">
          <TD colSpan=5 class="action_coin" style="border-right:0">
              <span class="fl">发票信息</span></TD>
          <td class="action_coin" style="border-left:0"><span
              v-show='billData.id!=0' class="delete_coin"
              @click='deletebill(billData)'></span><span
                  class="add_coin"
                  @click='addPill'></span></td>
      </TR>
      <TR class="even-tr-tbody">
          <TD width=100>
              <DIV align=center>报销项目</DIV>
          </TD>
          <TD width=100>
              <DIV align=center class="fontColor-set">
                  <select name="reimburseItem" class="par_baoxiao" v-model='reimburseItemVal'>
                      <option v-for='item in applytypeIterm' value="{{item.perReItemId}}" track-by="$index">{{item.perReiItemName}}</option>
                  </select>
              </DIV>
          </TD>
          <TD width=100>
              <DIV align=center>报销类型</DIV>
          </TD>
          <TD width=100>
              <DIV align=center class="fontColor-set">
                  <select name="reimburseType" class="par_baoxiao" v-model='reimburseTypeVal'>
                    <option v-for='item in applytypeIterm' value="{{item.perReItemId}}" track-by="$index">{{item.perReiItemName}}</option>
                  </select>
              </DIV>
          </TD>
          <TD width=100>
              <DIV align=center>电子发票</DIV>
          </TD>
          <TD width=100>
              <DIV align=center>
                  <select name="isElecInvoice" class="e-invoice" v-model='isElecInvoiceVal'>
                      <option value="1">是</option>
                      <option value="0">否</option>
                  </select>
              </DIV>
          </TD>
      </TR>
      <TR class="even-tr-tbody ipt-parent">
          <TD width=100>
              <DIV align=center>电子发票号</DIV>
          </TD>
          <TD width=100>
              <DIV align=center class="fontColor-set">
                  <input placeholder="请输入发票号码" name='invoiceNum' v-model='billnumber' :disabled='isElecInvoiceVal==1?disabled:!disabled' />
              </DIV>
          </TD>
          <TD width=100>
              <DIV align=center>发票类型</DIV>
          </TD>
          <TD width=100>
              <DIV align=center class="fontColor-set">
                  <select name="invoiceType" class="special-invoice" v-model='invoiceTypevalue'>
                      <option value="增值税专用发票">增值税专用发票</option>
                      <option value="普通发票">普通发票</option>
                  </select>
              </DIV>
          </TD>
          <TD width=100>
              <DIV align=center>税率</DIV>
          </TD>
          <TD width=100>
              <DIV align=center class="tax-rate">
                  <select name="taxId" class="shuilv_fapiao" v-model='taxIdvalue' :disabled="invoiceTypevalue=='增值税专用发票'?disabled:!disabled">
                    <option v-for='taxitem in applytaxIterm' value="{{taxitem.taxId}}" track-by="$index">{{taxitem.taxValue}}</option>
                  </select>
              </DIV>
          </TD>
      </TR>
      <TR class="even-tr-tbody">
          <TD width=100>
              <DIV align=center>币种</DIV>
          </TD>
          <TD width=100>
              <DIV align=center class="fontColor-set">
                  <select name="currencyId" class="hl_currency"
                  v-model='currencyTaxNum'
                  @change='currencyEvent'>
                    <option v-for='currencyitem in applycurrencyIterm' value="{{currencyitem.currencyId}}"  track-by="$index">{{currencyitem.currencyName}}</option>
                  </select>
              </DIV>
          </TD>
          <TD width=100>
              <DIV align=center>
                  <span>汇率</span>
                  <span class="rel">
                       <div class="helper">
                           <i class="helper_i"></i>
                       </div>
                  </span>
              </DIV>
          </TD>
          <TD width=100 class="ex-rate">
              <DIV align=center>
                <Input-number :min="0.1" :value.sync="currencyNum" :step="0.1" size="small" :disabled="iscurdisabled"></Input-number>
              </DIV>
          </TD>
          <TD width=100>
              <DIV align=center>申请金额</DIV>
          </TD>
          <TD width=100 class="ex-application">
              <DIV align=center class="fontColor-set">
              <Input-number :min="1" :value.sync="applyNum" :step="0.1" size="small"></Input-number>
          </TD>
      </TR>
      <TR class="even-tr-tbody">
          <TD width=100>
              <DIV align=center>人民币金额</DIV>
          </TD>
          <TD width=100 class="RMB-total">
              <DIV align=center class="fontColor-set">{{RMBnumb | currency '￥' 2}}</DIV>
          </TD>
          <TD width=100 colspan=4>
              <DIV align=center></DIV>
          </TD>
      </TR>
      </TBODY>
  </TABLE>
  <div v-show='!billnumber&&isElecInvoiceVal==1'>
    <Alert type="error" show-icon>请填写发票号！</Alert>
  </div>
</template>
<script>
import Vue from 'vue'
import { selectPerReimUserInfoajax,applytypeOptionAjax,applytaxOptionAjax,applycurrencyOptionAjax } from '../../../vuex/actions'
import { selectPerReimUserInfodata,applytypeoptionInfodata,applytaxoptionInfodata,applycurrencyoptionInfodata } from '../../../vuex/getters'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

let count = 0;
export default{
  props: {
      billData: Object
  },
  data(){
    return{
      applyNum:0,
      currencyNum:1,
      currencyTaxNum:3,
      iscurdisabled:true,
      isElecInvoiceVal:0,
      invoiceTypevalue:'增值税专用发票',
      reimburseItemVal:'2',
      reimburseTypeVal:'2',
      taxIdvalue:6,
      disabled:false,
      billnumber:'',
      // isNext:''
    }
  },
  created(){
    //发送报销项目 报销类型ajax
    var param = {
      token:this.$cookie.get("token")
    }
    this.applytypeOptionAjax(param);
    this.applytaxOptionAjax();
    this.applycurrencyOptionAjax();
  },
  vuex:{
    getters: {
        selectPerReimUserInfo:selectPerReimUserInfodata,
        applytypeIterm:applytypeoptionInfodata,
        applytaxIterm:applytaxoptionInfodata,
        applycurrencyIterm:applycurrencyoptionInfodata
    },
    actions: {
        selectPerReimUserInfoajax,
        applytypeOptionAjax,
        applytaxOptionAjax,
        applycurrencyOptionAjax
    }
  },
  watch:{
    isElecInvoiceVal:function(val,oldVal){
      if(val==='0'){
        this.billnumber=''
      }
    },
    // reimburseTypeVal:function(val,oldVal){
    //   if(val=='2'||val=='3'){
    //     this.isNext = true
    //     this.$dispatch('child-reimburseType',this.isNext)
    //   }else{
    //     this.isNext = false
    //     this.$dispatch('child-reimburseType',this.isNext)
    //   }
    // }
  },
  computed:{

    taxIdvalue(){
        if(this.invoiceTypevalue=='普通发票'){
          return ''
        }else if(this.invoiceTypevalue=='增值税专用发票'){
          return 6
        }
    },
    RMBnumb:function(){
      return this.applyNum*this.currencyNum
    },
    //bill需要传递的数据
    billReimburseInvoiceInfo(){
      return {
        currencyId:this.currencyTaxNum,
        invoiceType:this.invoiceTypevalue,
        invoiceNum:this.billnumber,
        isElecInvoice:this.isElecInvoiceVal,
        price:this.RMBnumb,
        reimburseItem:this.reimburseItemVal,
        reimburseType:this.reimburseTypeVal,
        taxId:this.taxIdvalue
      }
    }
  },
  methods:{
    currencyEvent(){
      if(this.currencyTaxNum!=3){
        this.iscurdisabled=false
      }else{
        this.iscurdisabled=true
        this.currencyNum=1
      }
    },
    addPill:function(){
      count++
      var pill = {
        id:count
      }
      this.$parent.billitems.push(pill);
    },
    deletebill(obj){
      this.$parent.billitems = this.$parent.billitems.filter(function(item){
        return item.id != obj.id
      })
    }
  }
}



</script>
