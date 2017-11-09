<template>
  <div class="process">
    <span class="pass-name"></span>
    <div class="base-info" id="data_info">
        <TABLE class="info-table" cellSpacing=0 border=1 borderColor=#E4E5E7>
            <form class="get_ajax">
                <TBODY>
                <TR>
                    <TD class="odd-td" width=100>
                        <DIV align=center>申请人</DIV>
                    </TD>
                    <TD class="even-td" width=100>
                        <DIV align=center>{{ApplyUserName}}</DIV>
                    </TD>
                    <TD class="odd-td" width=100>
                        <DIV align=center>员工编号</DIV>
                    </TD>
                    <TD class="even-td" width=100>
                        <DIV align=center>{{ApplyUserNumber}}</DIV>
                    </TD>
                </TR>
                <TR>
                    <TD class="odd-td" width=100>
                        <DIV align=center>所属部门</DIV>
                    </TD>
                    <TD class="even-td" width=100>
                        <DIV align=center>{{ApplyUserDepart}}</DIV>
                    </TD>
                    <TD class="odd-td" width=100>
                        <DIV align=center>分组</DIV>
                    </TD>
                    <TD class="even-td" width=100>
                        <DIV align=center>{{ApplyUserGroups}}</DIV>
                    </TD>
                </TR>
                <TR>
                    <TD class="odd-td" width=100>
                        <DIV align=center>职位</DIV>
                    </TD>
                    <TD class="even-td" width=100>
                        <DIV align=center>{{ApplyUserPosition}}</DIV>
                    </TD>
                    <TD class="odd-td" width=100>
                        <DIV align=center>分机</DIV>
                    </TD>
                    <TD class="even-td" width=100>
                        <DIV align=center>{{ApplyUserExtension}}</DIV>
                    </TD>
                </TR>
                <TR>
                    <TD class="odd-td" width=100>
                        <DIV align=center>申请类型</DIV>
                    </TD>
                    <TD class="even-td" width=100>
                        <DIV align=center>{{InvoiceComanyId}}</DIV>
                    </TD>
                    <TD class="odd-td" width=100>
                        <DIV align=center>发票抬头</DIV>
                    </TD>
                    <TD class="even-td" width=100>
                        <DIV align=center>{{InvoiceCompany}}</DIV>
                    </TD>
                </TR>
                </TBODY>
            </form>
        </TABLE>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
    data () {
      return {
        ApplyUserName:'',
        ApplyUserNumber:'',
        ApplyUserDepart:'',
        ApplyUserGroups:'',
        ApplyUserPosition:'',
        ApplyUserExtension:'',
        InvoiceComanyId:'',
        InvoiceCompany:''
      }
    },
    created:function(){
        this.getUserInfo();
    },
    methods:{
      getUserInfo:function(){
        let self = this;
        this.$http
                .get({
                    url:'http://localhost:8080/PersonalReimburse/perReimburseApply/selectPerReimApplyUserInfo',
                    headers:{Authorization:'Basic Yxsdlfjui'},
                    params:{
                        userId:self.$cookie.get("user_uid")
                    }})
                .then(function(response){
                    if(response.data.code=="0001"){
                       self.ApplyUserName=response.data.body.perReimApplyUserName;
                       self.ApplyUserNumber=response.data.body.perReimApplyUserNumber;
                       self.ApplyUserDepart=response.data.body.perReimApplyUserDepart;
                       self.ApplyUserGroups=response.data.body.perReimApplyUserGroups;
                       self.ApplyUserPosition=response.data.body.perReimApplyUserPosition;
                       self.ApplyUserExtension=response.data.body.perReimApplyUserExtension;
                       self.InvoiceComanyId=response.data.body.perReimInvoiceComanyId;
                       self.InvoiceCompany=response.data.body.perReimInvoiceCompany;
                      };
                },function(){

                })
      },
    }
}
</script>

<style scoped>
.process{
    padding-top: 17px;
    padding-left: 27px;
}

.pass-name {
    display: inline-block;
    padding-bottom: 10px;
    border-bottom: 2px solid #FF9A34;
    font-size: 18px;
    line-height: 17px;
}

.process .base-info{
    margin-top: 20px;
    width: 1165px;
    height: 148px;
    background-color: #fff;
}


.process .base-info tr{

}

.process .base-info td.odd-td{
    width: 145px;
    height: 34px;
    color:#909DA6;
    background-color:#FCFCFC;
}
.process .base-info td.even-td{
    width: 435px;
    height: 34px;
    color:#203040;
    background-color:#Fff;
}

.process .base-info .info-table{
    BORDER-COLLAPSE: collapse;
    cellSpacing:0;
    align:center;
    border:1px solid #E4E5E7;
}
.base-info .info-table select {
    width: 256px;
    height: 22px;
    font-size: 12px;
    color:#223347;
}

</style>
