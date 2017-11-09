<template>
  <div>
    <ul class="nav nav-tabs">
        <li role="presentation" :class="{'active':true}"><a href="#tab{{index}}" aria-controls="tab{{index}}" role="tab" data-toggle="tab">报销人1</a></li>
    </ul>
    <div class="tab-content">
     <TABLE class="table">
            <TBODY>
            <TR class="odd-tr-tbody">
                <TD colSpan=8>
                    <DIV align=left>明细单</DIV></TD>
            </TR>
            <TR class="even-tr-tbody">
                <TD width=100>
                    <DIV align=center>姓名</DIV></TD>
                <TD width=100>
                    <DIV align=center class="fontColor-set">{{obj.reimburseUser.perReimUserName}}</DIV></TD>
                <TD width=100>
                    <DIV align=center>所在城市</DIV></TD>
                <TD width=100>
                    <DIV align=center class="fontColor-set">{{obj.reimburseUser.perReimUserCity}}</DIV></TD>
                <TD width=100>
                    <DIV align=center>公司</DIV></TD>
                <TD width=100>
                    <DIV align=center class="fontColor-set">{{obj.reimburseUser.perReimUserCompany}}</DIV></TD>
                <TD width=100>
                    <DIV align=center>部门</DIV></TD>
                <TD width=100>
                    <DIV align=center class="fontColor-set">{{obj.reimburseUser.perReimUserDepartment}}</DIV></TD>
            </TR>
            </TBODY>
        </TABLE>
      <div  v-if='obj.personalReimburseInvoiceInfo.personalReimburseTraffic' role="tabpanel" class="tab-pane" :class="{'active':true}" id="tab{{index}}">
        <traffic></traffic>
      </div>
      <div v-else  role="tabpanel" class="tab-pane" :class="{'active':true}" id="tab{{index}}">
        <ospink><ospink>
      </div>
    </div>
  </div>
</template>
<script>
  import traffic from '../views/Traffic.vue'
  import ospink from '../views/Ospink.vue'
  import { personapplygetdata } from '../../../vuex/getters'
    export default{
      data () {
          return {
            tablist: []
          }
      },
      components:{
        ospink,traffic
      },
      vuex:{
        getters: {
            obj:personapplygetdata
        }
      },
      methods:{

      }
  }
</script>
<style>
  .nav-tabs {
    background-color: #eeeeee;
    padding-top:5px;
    padding-left:5px;
    border: 1px solid #ddd;

  }

  .tab-content {
    color : #000000;
    background-color: #ffffff;
    padding : 5px 15px;
    margin-top: -1px;
    border: 1px solid #ddd;
  }

</style>
