<template>
<div id="content">
    <div class="set-page-mbx">
        <span class="set-page-title">当前位置：首页<span style="font-family: 'microsoft yahei'">&nbsp;&gt;&nbsp;</span>我的申请</span>
    </div>
    <div id="content-size-OA">
        <div class="process">
            <span class="pass-name">我的申请</span>
            <div class="myapplycation-info">
                <form name="queryForm" id="queryForm" >
                    <div class="find_line_div">
                        <span class="first_span">申请类型</span><select id="applyType" name="applyType" data-value="" v-model="applyType"><option value="0" selected>财务类</option></select>
                        <span class="s-t">申请状态</span><select id="applyStatus" name="applyStatus" data-value="" v-model="applyStatus"><option value="全部" selected>全部</option><option value="待审批" >待审批</option><option value="审批通过">审批通过</option><option value="审批驳回">审批驳回</option><option value="草稿">草稿</option></select>
                        <span class="bianhao">报销编号</span><input type="text" name="applyNumber" v-model="bianhao"/>
                        <div id="app">
                            <span class="first_span">申请日期</span>
                            <n3-datepicker
                              :value.sync="starttime"
                              :format="format"
                              width="150px"></n3-datepicker>
                                -
                              <n3-datepicker
                              :value.sync="endtime"
                              :format="format"
                              width="150px">
                            </n3-datepicker>
                            <button class="find_button" type="button" name="findBtn"
                            @click='find_button'>查询</button>
                        </div>
                    </div>
                </form>
                <divtable
                :applytypeprop='applyType'
                :applystatusprop='applyStatus'
                :bianhaoprop='bianhao'
                :starttimeprop='starttime'
                :endtimeprop = 'endtime'
                v-ref:child
                ></divtable>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import $ from 'jquery'
import Myapplication_table from './Myapplication_table.vue'
import N3Components from 'N3-components'
N3Components.install(Vue)
Vue.use(VueCookie);
Vue.use(VueResource);


export default {
        data(){
            return {
              applyType:'0',
              starttime:"",
              endtime:'',
              bianhao:'',
              applyStatus:'全部'
            }
        },
        components:{
            'divtable':Myapplication_table
        },
        methods:{
          find_button:function(){
            this.$refs.child.$emit('click-child');
          }
        }
    };
</script>

<style>
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

/*�ҵ�����*/

.myapplycation-info{
    padding-top: 18px;
}

.myapplycation-info input{
    width: 148px;
    height: 18px;
    font-size: 14px;
    color: #1C2E42;
    vertical-align: baseline;
}

.myapplycation-info select{
    width: 152px;
    height: 22px;
    /*vertical-align: middle;*/
    font-size: 13px;
    color: #1e2f41;
    vertical-align: top;
}

.myapplycation-info form span{
    line-height: 22px;
    font-size: 14px;
    color: #1e2f41;
    display: inline-block;
    margin-right: 10px;
}

.myapplycation-info form button.find_button{
    border: 0;
    background-color: #539AE8;
    width: 72px;
    height: 22px;
    color: #fff;
    vertical-align: top;
    /*margin-left: 120px;*/
    /*border: 1px solid #D5D6DA;*/
}

.myapplycation-info form .first-line-div{
    margin-bottom: 8px;
}

.myapplycation-info form .second-line-div .bianhao{
    margin-right: 38px;
}

.myapplycation-info form .second-line-div{
    margin-bottom: 18px;
}

table{
    border: 1px solid #d3D6D9;
    border-collapse:collapse;
}

table,td{
    border: 1px solid #d3D6D9;
}

.myapplycation-info-table{
    width: 1165px;
    align:center;
    margin-bottom: 18px;
    background-color: #fff;
}
.myapplycation-info-table tr{
    height: 35px;
}
/*.myapplycation-info-table td{*/
    /*width: 194px;*/
/*}*/
.pagi_line{
    width: 1165px;
}

.span-block span.span-num{
    width: 20px;
    height: 20px;
    border: 1px solid #D5D6DA;
    display: inline-block;
    /*����ie6-7*/
    _zoom:1;*display:inline;
    line-height: 22px;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    color: #539Be9;
    border-radius: 4px;
}

.span-block p{
    display: inline-block;
    _zoom:1;*display:inline;
    margin-left: 810px;
    text-align: right;
}

.span-block p button{
    width: 70px;
    height: 21px;
    border: 1px solid #D5D6DA;
    background-color: #fff;
    margin-left: 10px;
}

.myapplycation-info-table .handle a{
    padding: 0 10px;
    display: inline-block;
}


.block-div {
    padding-left: 4px;
}
.find_line_div span.first_span {
    margin-left: 0px;
}

.myapplycation-info select {
    width: 152px;
    height: 22px;
    /* vertical-align: middle; */
    font-size: 13px;
    color: #1e2f41;
    vertical-align: top;
}

.myapplycation-info form span {
    line-height: 22px;
    font-size: 14px;
    color: #1e2f41;
    display: inline-block;
    margin-right: 10px;
}
.myapplycation-info input {
    width: 148px;
    height: 18px;
    font-size: 14px;
    color: #1C2E42;
    vertical-align: baseline;
}

.find_line_div div {
    margin-top: 15px;
    margin-bottom: 15px;
}

.find_line_div span.first_span {
    margin-left: 0px;
}
.myapplycation-info-table .first_tr_title {
    background-color: #539BE9;
    color: #fff;
}


/*日期控件样式*/
.find_line_div div {
    margin-top: 4px;
    margin-bottom: 4px;
}
</style>
