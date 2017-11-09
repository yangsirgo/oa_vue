<template>
  <form class="traffic_billDetails">
            <TABLE class="table">
                <TBODY>
                <TR class="even-tr-tbody">
                    <TD width=100>
                        <DIV align=center>日期</DIV></TD>
                    <TD width=100>
                        <DIV align=center class="fontColor-set">{{obj.personalReimburseInvoiceInfo.personalReimburseTraffic.trafficDateStr}}</DIV></TD>
                    <TD width=100>
                        <DIV align=center>外出事由</DIV></TD>
                    <TD width=100>
                        <DIV align=center class="fontColor-set">
                            {{obj.personalReimburseInvoiceInfo.personalReimburseTraffic.reason}}
                        </DIV></TD>
                    <TD width=100>
                        <DIV align=center>出发地</DIV></TD>
                    <TD width=100>
                        <DIV align=center>
                            {{obj.personalReimburseInvoiceInfo.personalReimburseTraffic.starting}}
                        </DIV></TD>
                </TR>
                <TR class="even-tr-tbody">
                    <TD width=100>
                        <DIV align=center>目的地</DIV></TD>
                    <TD width=100>
                        <DIV align=center class="fontColor-set">
                            {{obj.personalReimburseInvoiceInfo.personalReimburseTraffic.destination}}
                        </DIV></TD>
                    <TD width=100>
                        <DIV align=center>金额</DIV></TD>
                    <TD width=100>
                        <DIV align=center>
                        {{obj.personalReimburseInvoiceInfo.finalPrice}}
                        </DIV></TD>
                    <TD width=100 colspan=2>

                       </TD>
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
