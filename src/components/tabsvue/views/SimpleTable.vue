<template>
   <table class="table">
      <thead>
        <tr>
          <th>序号</th>
          <th>日期</th>
          <th>报销人</th>
          <th>报销人账号</th>
          <th>报销项目</th>
          <th>报销类型</th>
          <th>金额</th>
          <th>备注</th>
      </tr>
  </thead>
  <tbody>
      <tr v-for='(IndexLst,itemLst) in totalTable[0].totalLst'>
        <td>{{IndexLst+1}}</td>
        <td>{{itemLst.applyTime}}</td>
        <td>{{itemLst.applyUserName}}</td>
        <td>{{itemLst.applyUserNum}}</td>
        <td>{{itemLst.invoiceItem}}</td>
        <td>{{itemLst.invoiceType}}</td>
        <td>{{itemLst.finalPrice}}</td>
        <td>
          <a v-if='itemLst.invoiceType=="交通费"||itemLst.invoiceType=="办公用品"'
          @click='getdetails(itemLst.invoiceInfoId)'>查看明细单</a>
          <template v-else>
            <a href="javascript:void(0)" style="color:#d3d6d9;cursor:text;">查看明细单</a>
          </template>
        </td>
      </tr>
   <tr>
     <td>
         <div align="center" class="fontColor-set">合计</div></td>
     <td  colspan="5">
         <div align="center" class="fontColor-set NumtoMoney">{{totalTable[0].totalPrice | capitalnum}}</div></td>
     <td  colspan="2">
         <div align="center" class="NumMoney">{{totalTable[0].totalPrice}}</div></td>
  </tr>
</tbody>
</table>
</template>
<script>
import Vue from 'vue'
  import { personapplydetailsajax,isshowtablist} from '../../../vuex/actions'
    Vue.filter('capitalnum',function(n){
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
        var head = n < 0 ? '欠' : '';
        n = Math.abs(n);
        var s = '';
        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    })

    export default{
      props:['totalTable'],
      vuex: {
        actions: {
            personapplydetailsajax,
            isshowtablist
        }
      },
      methods:{
        getdetails:function(e){
          var params = {
            invoiceId:e
          };
          this.personapplydetailsajax(params);
          this.isshowtablist();
        }
      }
    }
</script>

