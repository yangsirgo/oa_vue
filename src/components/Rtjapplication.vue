<template>
 <div id="content">
        <div class="set-page-mbx">
            <span class="set-page-title">当前位置：首页<span style="font-family: 'microsoft yahei'">&nbsp;&gt;&nbsp;</span>发起申请<span
                    style="font-family: 'microsoft yahei'">&nbsp;&gt;&nbsp;</span>报销申请</span>
        </div>
        <div id="content-size-OA" class="app_pubprocess_notloading">
            <div class="process">
                <span class="pass-name">基本信息</span>
                <div class="base-info" id="data_info">
                    <TABLE class="info-table" cellSpacing=0 border=1 borderColor=#E4E5E7>
                        <form class="get_ajax">
                            <TBODY>
                            <TR>
                                <TD class="odd-td" width=100>
                                    <DIV align=center>申请人</DIV>
                                </TD>
                                <TD class="even-td" width=100>
                                    <DIV align=center>{{selectPerReimUserInfo.perReimApplyUserName}}</DIV>
                                </TD>
                                <TD class="odd-td" width=100>
                                    <DIV align=center>员工编号</DIV>
                                </TD>
                                <TD class="even-td" width=100>
                                    <DIV align=center>{{selectPerReimUserInfo.perReimApplyUserNumber}}</DIV>
                                </TD>
                            </TR>
                            <TR>
                                <TD class="odd-td" width=100>
                                    <DIV align=center>所属部门</DIV>
                                </TD>
                                <TD class="even-td" width=100>
                                    <DIV align=center>{{selectPerReimUserInfo.perReimApplyUserDepart}}</DIV>
                                </TD>
                                <TD class="odd-td" width=100>
                                    <DIV align=center>分组</DIV>
                                </TD>
                                <TD class="even-td" width=100>
                                    <DIV align=center>{{selectPerReimUserInfo.perReimApplyUserGroups}}</DIV>
                                </TD>
                            </TR>
                            <TR>
                                <TD class="odd-td" width=100>
                                    <DIV align=center>职位</DIV>
                                </TD>
                                <TD class="even-td" width=100>
                                    <DIV align=center>{{selectPerReimUserInfo.perReimApplyUserPosition}}</DIV>
                                </TD>
                                <TD class="odd-td" width=100>
                                    <DIV align=center>分机</DIV>
                                </TD>
                                <TD class="even-td" width=100>
                                    <DIV align=center>{{selectPerReimUserInfo.perReimApplyUserExtension}}</DIV>
                                </TD>
                            </TR>
                            <TR>
                                <TD class="odd-td" width=100>
                                    <DIV align=center>申请类型</DIV>
                                </TD>
                                <TD class="even-td" width=100>
                                    <DIV align=center>{{selectPerReimUserInfo.perReimInvoiceComanyId}}</DIV>
                                </TD>
                                <TD class="odd-td" width=100>
                                    <DIV align=center>发票抬头</DIV>
                                </TD>
                                <TD class="even-td" width=100>
                                    <DIV align=center>{{selectPerReimUserInfo.perReimInvoiceCompany}}</DIV>
                                </TD>
                            </TR>
                            </TBODY>
                        </form>
                    </TABLE>
                </div>
            </div>
              <rtjapply-tabs></rtjapply-tabs>
        </div>
    </div>

</template>

<script>
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import Rtjapplytabs from './tabsvue/components/Rtjapplytabs.vue'
import { PerReimApplyUserInfoAjax} from '../vuex/actions'
import { PerReimApplyUserInfodata} from '../vuex/getters'
Vue.use(VueCookie);

  export default{
    data () {
      return {
        items:[
          {value:'baoxiaoren1'}
        ]
      }
    },
    created:function(){
      var usernum = this.$cookie.get("user_uid")
      var params={
          userId:usernum
      }
      this.PerReimApplyUserInfoAjax(params)
    },
    components: {
      rtjapplyTabs:Rtjapplytabs
    },
    methods:{
      add:function(){
        let count=1;
        this.items.push({
          value: '报销人'
                })
      }
    },
    vuex:{
      getters: {
          selectPerReimUserInfo:PerReimApplyUserInfodata
      },
      actions: {
          PerReimApplyUserInfoAjax
      }
    }
  }
</script>

<style scoped>
#content {
    margin-left: 0;
    overflow-y: scroll;
    /*overflow-x: hidden;*/
    height: 682px;
    position: relative;
}

#content-size-OA{
 margin-bottom: 20px;
}

.set-page-mbx .set-page-title {
    line-height: 14px;
    font-size: 14px;
    padding-left: 29px;
    display: block;
    border-bottom: 1px solid #D3D6D9;
    padding-bottom: 15px;
    padding-top: 16px;
}

#container .pass-name {
    display: inline-block;
    padding-bottom: 10px;
    border-bottom: 2px solid #FF9A34;
    font-size: 18px;
    line-height: 17px;
}

.process{
    padding-top: 17px;
    padding-left: 27px;
}

.process .process-inline{
    margin-top: 20px;
    width: 1125px;
    height: 152px;
    border:1px solid #CECED0;
    padding: 20px;
    background-color: #fff;
    /*����ie7*/
    /*position: relative;*/
}
.process .process-inline .process-tableline ul{
    /*text-align: center;*/
    /*position: relative;*/
}



.process-inline .process-tableline #first-li-block{
    width: 120px;
    height: 152px;
    float: left;
    /*margin-left: 174px;*/
}

.process-inline .process-tableline #last-li-block{
    width: 120px;
    height: 150px;
    float: left;
}


.process-inline .process-tableline li.block-tableline{
    width: 120px;
    height: 150px;
    float: left;
}


/*��������*/


.process-tableline .up-li{
    width: 120px;
    height: 74px;
    display: block;
    border-bottom: 2px solid #949494;
    /*position: relative;*/
}
.process-tableline .up-li i{
    width: 54px;
    height: 62px;
    display: block;
    margin: auto;
}

.process-tableline .up-li .accept-i{
    background: url("../assets/images/processcoin.png") no-repeat -10px -10px;
}
.process-tableline .up-li .refuse-i{
    background: url("../assets/images/processcoin.png") no-repeat -136px -10px;
}
.process-tableline .up-li .wait-i{
     background: url("../assets/images/processcoin.png") no-repeat -74px -10px;
 }
.process-tableline  #first-li-block em{
    position: absolute;
    width: 10px;
    height: 10px;
    left: 185px;
    top: 90px;
    display: inline-block;
    background: url("../assets/images/processcoin.png") no-repeat -200px -10px;
}
.process-tableline  #last-li-block em{
    position: absolute;
    width: 7px;
    height: 10px;
    right: 155px;
    top: 90px;
    display: inline-block;
    background: url("../assets/images/processcoin.png") no-repeat -202px -10px;
}

.process-tableline .down-li{
    width: 120px;
    height: 72px;
    display: inline-block;
    text-align: center;
}

.process-tableline .accept-ul{
    color: #539CE9;
}
.process-tableline .refuse-ul{
    color: #FE3640;
}
.process-tableline .wait-ul{
    color: #929AA5;
}
.process-tableline .down-li li.down-li-first {
    margin-top: 8px;
}
.process-tableline .down-li li{
    padding-top: 6px;
}

.process-tableline .down-li li.down-li-last {
    margin-bottom:6px;
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

/*������ϸ*/

table{
    border: 1px solid #d3D6D9;
    border-collapse:collapse;
}

td{
    border: 1px solid #d3D6D9;
}

.dashed-block{
    /*border-right:1px solid #F3F4F6;*/
    background-color:#ffffff;
}

#tabs{
    margin-top: 18px;
    background-color:#ffffff;
}

.process .person-tabs li{
    float: left;
}

.process .person-tabs .person-tabs-ul{
    /*min-width: 200px;*/
    /*height:28px;*/
    display: inline-block;
    zoom:1;*display:inline;
    border: 1px solid #d3D6D9;
    border-bottom: 0;
    max-width: 1165px;
}

.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active {
    /*border: 1px solid red;*/
    border-bottom: 0;
    background: #539AE8;
    font-weight: normal;
    color: #fff;
}

.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited {
    color: #fff;
    text-decoration: none;
}
.ui-tabs .ui-tabs-nav .ui-tabs-anchor {
    float: left;
    padding: 7px 28px;
    text-decoration: none;
}

#tabs a.ui-tabs-anchor{
    width: 56px;
    padding: 7px 10px 7px 28px;
}


/*������1 span����*/
.apply-person{
    width: 16px;
    height: 16px;
    display: inline-block;
    text-indent: -99999px;
    overflow: hidden;
}


.person-tabs-table {
    width: 1165px;
    align:center;
    margin-bottom: 10px;
}
.person-tabs-table tr{
    height:35px;
}
.person-tabs-table td{
    /*width: 1165px;*/
}

.person-tabs-table .odd-tr-tbody{
    background-color: #fff;
    color: #223347;
}

.person-tabs-table .odd-tr-tbody td{
    padding-left: 14px;
}

.person-tabs-table .even-tr-tbody{
    background-color: #FCFCFC;
    color: #919AA3;
}
.person-tabs-table .even-tr-tbody .fontColor-set{
    color: #223347;
}


/*��Ʊ��Ϣ*/
.add-bill-table {
    width: 1165px;
    align:center;
    margin-bottom: 10px;
}

.add-bill-table tr{
    height:35px;
}
.add-bill-table td{
    width: 194px;
}

.add-bill-table .odd-tr-tbody{
    background-color: #fff;
    color: #223347;

}

.add-bill-table .odd-tr-tbody td{
    padding-left: 14px;
}

.add-bill-table div{

}

.add-bill-table div select{
    width: 178px;
    height: 22px;
    font-size: 12px;
}

.add-bill-table .even-tr-tbody{
    background-color: #FCFCFC;
    color: #919AA3;
}
.add-bill-table .even-tr-tbody .fontColor-set{
    color: #223347;
}

.add-bill-table .even-tr-tbody .ipt-td-tbody{
    /*����border 1px*/
    width: 174px;
    height: 18px;
}

#content-size-OA .process .all-total{
    width: 1165px;
    padding-top: 7px;
    margin-bottom:11px;
    text-align: right;
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

.add-bill-table .action_coin span.fl {
    display: inline-block;
    zoom:1;
    *display:inline;
    margin-right: 15px;
    width:100%;
    overflow:hidden;
    width: 80px;
    height: 20px;
    line-height: 20px;
}

.add-bill-table td.action_coin{
    border-left:0 ;
}


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
    background-image: url("../assets/images/zengjia.jpg");
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
    background-image: url("../assets/images/jianhao.jpg");
}

/*����*/

.rel {
    position: relative;
}


.helper {
    position: absolute;
    right: 0px;
    top: 0px;
}

.helper i {
    color: #fff;
    background: url('../assets/images/u817.png')no-repeat;
    cursor: pointer;
    display: block;
    width: 15px;
    height: 15px;
    left: -1px;
    position: absolute;
    top: -4px;
    z-index: 9;
    /*padding: 0px 20px;*/
}

.helper .helpertext {

    border: 1px solid rgb(207, 208, 208);
    color: rgb(255, 105, 14);
    width: 200px;
    background: #fff0d1;
    position: absolute;
    left: 5px;
    top: -5px;
    display: none;
    z-index: 10;
    text-align: left;
    border-radius: 3px;
    word-break: break-all;
    box-shadow: rgb(197, 198, 199) 2px 2px 2px -1px;
    font-size: 12px;
}



.yinhang_admin{
    /*width: 250px;*/
    /*margin-right: -141px;*/
}

#content-size-OA .bottom-btn button:hover{
    background-color: #2f7fe7;
}

/*用户名栏目 修改密码和退出系统*/

div.nav li:hover {
    background: #2196F3;
    border-color: #2196F3;
}
div.nav li:hover div.my-system-menu {
    display: block;
}

div.my-system-menu{
    position: absolute;
    width: 100px;
    top: 66px;
    box-shadow: 0px 1px 2px #c9c9c9;
    z-index: 91;
    border-radius: 0px 0px 5px 5px;
    left: -1px;
    display: none;
    border-top: 6px dotted transparent;
    color: black;
}

div.my-system-menu a:hover {
    background: #539be9;
    color: #fff;
}

div.my-system-posi {
    position: absolute;
    height: 10px;
    width: 130px;
    background: rgba(25, 24, 24, 0);
    top: -5px;
    display: none;
}

div.my-system-menu a{
    display: block;
    padding: 10px 0px;
    padding-left: 12px;
    color: black;
    background: #fff;
}

/*.sp-menu-hd1 {*/
    /*background-position: 0 -37px;*/
    /*width: 16px;*/
    /*height: 16px;*/
/*}*/

div.my-system-menu i {
    background-image: url(../assets/images/sprite-hdmenu.png);
    background-repeat: no-repeat;
    display: inline-block;
    margin-right: 13px;
    vertical-align: middle;
}

.sp-menu-hd1 {
    background-position: 0 -37px;
    width: 16px;
    height: 16px;
}
</style>
