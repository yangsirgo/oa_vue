<template>
      <div>
        <table id="table" class="myapplycation-info-table" cellSpacing=0 border=1 borderColor=#E4E5E7>
            <thead>
                <tr class="first_tr_title">
                    <td class="odd-td perc-17" width="17%">
                        <div align=center>报销编号</div></td>
                    <td class="even-td perc-17" width="17%">
                        <div align=center>申请状态</div></td>
                    <td class="odd-td perc-17" width="17%">
                        <div align=center>申请类型</div></td>
                    <td class="even-td perc-17" width="17%">
                        <div align=center>申请日期</div></td>
                    <td class="odd-td" colspan="2">
                        <div align=center>操作</div></td>
                </tr>
            </thead>
            <tbody class="table_tbody">
                <tr class="second_tr_child" v-for="item in items">
                    <td class="odd-td" width=194><div align=center>{{item.applyNumber}}</div></td>
                    <td class="even-td" width=194>
                        <div align=center>
                                <span  v-if="item.applyStatus=='审批通过'" style="color:#01a451">{{item.applyStatus}}</span>
                            <template v-else>
                                <span v-if="item.applyStatus=='审批驳回'" style="color:#f78320">{{item.applyStatus}}</span>
                                <template v-else>
                                    <span v-if="item.applyStatus=='草稿'">{{item.applyStatus}}</span>
                                    <span v-else style="color:red">{{item.applyStatus}}</span>
                                </template>
                            </template>
                        </div></td>
                    <td class="odd-td" width=194>
                        <div align=center>{{item.applyType}}</div></td>
                    <td class="even-td" width=194>
                        <div align=center>{{item.applyTime}}</div></td>
                    <td class="handle">
                        <div align=center class="block-div" >
                            <span v-for="op in item.opList">
                                <a  v-if="op.opName=='查看'"
                                v-link="{name:'MyApplidetails',query:{applyId:item.perReApplyId,taskId:9999}}"
                                >{{op.opName}}</a>
                            </span>
                            <span v-for="op in item.opList">
                                <a v-if="op.opName=='打印'"  href="./dayin.html?root=myapplication.html&applyId={{item.perReApplyId}}">{{op.opName}}</a>
                            </span>
                            <span v-for="op in item.opList">
                                <a  v-if="op.opName=='编辑'" href="./Rtj_application.html?root=myapplication.html&applyId={{item.perReApplyId}}">{{op.opName}}</a>
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="pagi_line">
        <div class="span-block" style="float:left;" name="pageSize">
            <span class="span-num click_span" @click="setpageSize($event)">{{ten}}</span>
            <span class="span-num" @click="setpageSize($event)">{{twenty}}</span>
            <span class="span-num" @click="setpageSize($event)">{{thirty}}</span>
            <span class="span-num" @click="setpageSize($event)">{{sixty}}</span>
        </div>
        <div class="div_pagination"  style="float:right;">
            <p>共<span id="totalCount">{{totalCount}}</span>条记录</p>
            <div class="pagination">
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import $ from '../assets/jquery-1.11.3.min.js'
import '../assets/fw_pagination'
Vue.use(VueCookie);
Vue.use(VueResource);

let jQuery = $;
let path = 'http://localhost:8080/PersonalReimburse/perReimburseApply/queryPersonalReimburseApplyList'

//pagination 插件选项
let opt = {
  ctr:".pagination",
  current:1,
  jump:{
      text:"跳转"
  },
  pageSize:10,
  totalPageCount:10,
};
//查询条件初始化
let perReimMyApplyQuery={
          userId:'',
          applyStatus:'',
          applyNumber:'',
          applyFromDate:'',
          applyToDate:'',
          pageNo: 1,
          pageSize:10
        };
  export default {
    props: [
            'applytypeprop',
            'applystatusprop',
            'bianhaoprop',
            'starttimeprop',
            'endtimeprop'
        ],
    data(){
      return{
        items:[],
        totalCount:'',
        ten:10,
        twenty:20,
        thirty:30,
        sixty:60,
      }
    },
    created:function(){
      var self = this;
      this.queryInit(opt);

      this.$on('click-child', function(){
        self.findfun();
      });
        },
    methods:{
        queryInit:function(opt){
            let self = this;
                  //查询对象赋值
            perReimMyApplyQuery.userId = this.$cookie.get("user_uid");
            perReimMyApplyQuery.applyStatus = this.applystatusprop;
            perReimMyApplyQuery.applyNumber = this.bianhaoprop;
            perReimMyApplyQuery.applyFromDate = this.starttimeprop;
            perReimMyApplyQuery.applyToDate = this.endtimeprop;

            this.$http
                .get({url:path,
                    headers:{Authorization:'Basic Yxsdlfjui'}})
                .then(function(response){
                    if(response.data.code=="0001"){
                        self.renderTable(response);
                        opt.totalPageCount = self.totalCount;
                      };
                      //pagination 添加回调函数fun
                      opt.fun = function (result) {
                          perReimMyApplyQuery.pageNo = result;
                          self.query(opt,perReimMyApplyQuery);
                      };
                      this.pagination(opt);
                },function(){

                })
        },
        query:function(opt,perReimMyApplyQuery){
          //查询对象赋值
          perReimMyApplyQuery.userId = this.$cookie.get("user_uid");
          perReimMyApplyQuery.applyStatus = this.applystatusprop;
          perReimMyApplyQuery.applyNumber = this.bianhaoprop;
          perReimMyApplyQuery.applyFromDate = this.starttimeprop;
          perReimMyApplyQuery.applyToDate = this.endtimeprop;
          let self = this;
                this.$http
                    .get({url:'http://localhost:8080/PersonalReimburse/perReimburseApply/queryPersonalReimburseApplyList',
                        data:perReimMyApplyQuery,
                        headers:{Authorization:'Basic Yxsdlfjui'}})
                    .then(function(response){
                        if(response.data.code=="0001"){
                            self.renderTable(response);
                            self.setPage(opt,perReimMyApplyQuery,response.data);
                        }
                    },function(){

                    })
            },
        renderTable:function(response){
                this.items=response.data.body.lst;
                this.totalCount = response.data.body.totalCount;
            },
        setPage:function(opt,perReimMyApplyQuery,result){
                opt.current = perReimMyApplyQuery.pageNo;
                opt.pageSize = perReimMyApplyQuery.pageSize;
                opt.totalPageCount = result.body.totalCount;
                opt.totalCount = result.body.totalCount;
                this.pagination(opt);
            },
        findfun:function(){
          console.log(perReimMyApplyQuery)
          this.query(opt,perReimMyApplyQuery);
        },
         setpageSize:function(event){
                var self =this;
                perReimMyApplyQuery.pageNo = 1;
                var el = event.currentTarget;
                perReimMyApplyQuery.pageSize = $(el).text();
                opt.pageSize = $(el).text();
                self.query(opt,perReimMyApplyQuery);
                $('.span-num.click_span').removeClass('click_span');
                $(el).addClass('click_span');
            },
            //pagination分页设置
        pagination:function(opt){
            if (!(opt && opt.totalPageCount && opt.pageSize)) {
                $(opt.ctr).empty();
                return false;
                }
            if (opt.totalPageCount > opt.pageSize) {
                jQuery(opt.ctr).pagination(opt.totalPageCount, {
                           callback : opt.fun,
                    prev_text : '上一页', //上一页按钮里text
                    next_text : '下一页', //下一页按钮里text
                    items_per_page : opt.pageSize, //显示条数
                    num_display_entries : opt.num_edge_entries||2, //连续分页主体部分分页条目数
                    current_page : opt.current, //当前页索引
                    num_edge_entries : 1, //两侧首尾分页条目数
                    cls : "cutepage",
                    prev_current_cls : "disabled",
                    next_current_cls : "disabled",
                    jump : opt.jump || false
                });
            }else {
                jQuery(opt.ctr).pagination(opt.totalPageCount, {
                    callback : opt.fun,
                    prev_text : '上一页', //上一页按钮里text
                    next_text : '下一页', //下一页按钮里text
                    items_per_page : opt.pageSize, //显示条数
                    num_display_entries : 1, //连续分页主体部分分页条目数
                    current_page : 1, //当前页索引
                    num_edge_entries : 1, //两侧首尾分页条目数
                    cls : "cutepage",
                    prev_current_cls : "disabled",
                    next_current_cls : "disabled",
                    jump : opt.jump || false
                });
            }
        }
    }
  }

</script>
<style src='../assets/pagination.css'>
</style>
