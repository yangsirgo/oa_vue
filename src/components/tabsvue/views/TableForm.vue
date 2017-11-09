 <template>
   <table class="table">
    <tbody>
          <tr>
              <th colspan="6">报销信息</th>
          </tr>
          <tr>
            <td>单据日期</td>
            <td>{{personMytable.applyDate}}</td>
            <td>报销号</td>
            <td>{{personMytable.applyCode}}</td>
            <td colspan="2" class="dashed-block"></td>
          </tr>
          <tr>
            <th colspan="6">报销人信息</th>
          </tr>
         <tr class="even-tr-tbody">
             <td>
                 <div align="center">报销人</div></td>
             <td>
                 <div align="center" class="fontColor-set">{{personMytable.reimbursUserName}}</div></td>
             <td>
                 <div align="center">报销人开户行</div></td>
             <td>
                 <div align="center" class="fontColor-set">{{personMytable.reimburseUserBankName}}</div></td>
             <td>
                 <div align="center">报销人账号</div></td>
             <td>
                 <div align="center" class="fontColor-set">{{personMytable.reimburseUserBandNo}}</div></td>
         </tr>
        <tr>
          <th  colspan="5">发票信息</th>
        </tr>
        <tbody v-for='(Indexinv,iteminvList) in  personMytable.invoiceList.lst'>
          <tr>
            <td>报销项目</td>
            <td>{{iteminvList.invoiceItemStr}}</td>
            <td>报销类型</td>
            <td>{{iteminvList.invoiceItemTypeStr}}</td>
            <td>电子发票</td>
            <td>{{iteminvList.invoiceisEleStr}}</td>
          </tr>
          <tr>
              <td>电子发票号</td>
            <td>{{iteminvList.invoiceNo}}</td>
            <td>发票类型</td>
            <td>{{iteminvList.invoiceType}}</td>
            <td>税率</td>
            <td>{{iteminvList.tax}}</td>
          </tr>
          <tr>
              <td>币种</td>
            <td>{{iteminvList.currencyStr}}</td>
            <td>汇率</td>
            <td>{{iteminvList.exchangeRate}}</td>
            <td>申请金额</td>
            <td>{{iteminvList.price}}</td>
          </tr>
          <tr>
              <td>人民币金额</td>
            <td>{{iteminvList.finalPrice}}</td>
            <td  colspan="4"></td>
          </tr>
        </tbody>
    </tbody>
</table>
</template>
<script>
    export default{
      props:['personMytable'],
      ready(){
      }
    }
</script>
