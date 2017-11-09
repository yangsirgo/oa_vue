<template>
<form class="os_billDetails">
            <TABLE class="table">
                <TBODY>
                <TR class="even-tr-tbody">
                    <TD width=100>
                        <DIV align=center>费用日期</DIV></TD>
                    <TD width=100>
                        <DIV align=center class="fontColor-set">
                       {{obj.personalReimburseInvoiceInfo.personalReimburseOs.feeDateStr}}
                        </DIV></TD>
                    <TD width=100>
                        <DIV align=center>物品名称</DIV></TD>
                    <TD width=100>
                        <DIV align=center class="fontColor-set">
                            {{obj.personalReimburseInvoiceInfo.personalReimburseOs.osName}}
                        </DIV></TD>
                    <TD width=100>
                        <DIV align=center>数量</DIV></TD>
                    <TD width=100>
                        <DIV align=center>
                            {{obj.personalReimburseInvoiceInfo.personalReimburseOs.osCount}}
                        </DIV></TD>
                </TR>
                <TR class="even-tr-tbody">
                    <TD width=100>
                        <DIV align=center>使用人</DIV></TD>
                    <TD width=100>
                        <DIV align=center class="fontColor-set">
                             {{obj.personalReimburseInvoiceInfo.personalReimburseOs.osUser}}
                        </DIV></TD>
                    <TD width=100>
                        <DIV align=center>金额</DIV></TD>
                    <TD width=100>
                        <DIV align=center class="fontColor-set" >
                         {{obj.personalReimburseInvoiceInfo.finalPrice}}
                        </DIV></TD>
                    <TD width=100 colspan=2>
                        <input type="text"  class="ipt-td-tbody" name="invoiceId" style="display: none"/></TD>
                </TR>
                </TBODY>
            </TABLE>
            <a class="btn btn-primary" @click.stop="backtotal">返回</a>
        </form>
</template>
<script>
  import Vue from 'vue'
  import {isshowtablist} from '../../../vuex/actions'
  import { personapplygetdata } from '../../../vuex/getters'
    export default{
      vuex: {
        actions: {
            isshowtablist
        },
        getters: {
            obj:personapplygetdata
        }
      },
      methods:{
        backtotal:function(){
          this.isshowtablist();
        }
      }
    }
</script>
<style>

</style>
