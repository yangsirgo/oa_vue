<template>
  <div class="process">
    <span class="pass-name">申请流程</span>
    <div class="process-inline">
        <div class="process-tableline">
            <ul id="processImg">
              <li v-if='items.length==0' class="block-tableline" id="first-li-block">
                <span class="up-li">
                    <i class="accept-i"></i>
                </span>
                <ul class="down-li accept-ul">
                    <li class="down-li-first">正在申请</li>
                </ul>
              </li>
              <template v-else>
              <template v-for='item in items'>
                <li v-if='item.status==1' class="block-tableline" id="first-li-block">
                  <span class="up-li">
                      <i class="wait-i"></i>
                  </span>
                  <ul class="down-li wait-ul">
                      <li class="down-li-first">{{item.time}}</li>
                      <li class="down-li-last">{{item.taskName}}</li>
                  </ul>
                </li>
              <template v-else>
                <li v-if='item.status==2' class="block-tableline" id="first-li-block">
                  <span class="up-li">
                      <i class="accept-i"></i>
                  </span>
                  <ul class="down-li accept-ul">
                      <li class="down-li-first">{{item.time}}</li>
                      <li class="down-li-last">{{item.taskName}}</li>
                  </ul>
                </li>
                <template v-else>
                  <li v-if='item.status==3' class="block-tableline" id="first-li-block">
                    <span class="up-li">
                        <i class="refuse-i"></i>
                    </span>
                    <ul class="down-li refuse-ul">
                        <li class="down-li-first">{{item.time}}</li>
                        <li class="down-li-last">{{item.taskName}}</li>
                    </ul>
                  </li>
                </template>
              </template>
              </template>
              </template>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'


export default {
    data () {
      return {
        items:[]
      }
    },
    created:function(){
      this.getProcessimg();
    },
    methods:{
      getProcessimg:function(){
        let self = this;
        let applyIdnum = this.$route.query.applyId;
        this.$http
                .get({
                    url:'http://localhost:8080/PersonalReimburse/processImg/list/'+applyIdnum,
                    headers:{Authorization:'Basic Yxsdlfjui'}})
                .then(function(response){
                    if(response.data.code=="0001"){
                       self.items=response.data.body;
                      };
                },function(){

                })
      }
    }
}
</script>

<style scoped>
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
    background: url("../../assets/images/processcoin.png") no-repeat -10px -10px;
}
.process-tableline .up-li .refuse-i{
    background: url("../../assets/images/processcoin.png") no-repeat -136px -10px;
}
.process-tableline .up-li .wait-i{
     background: url("../../assets/images/processcoin.png") no-repeat -74px -10px;
 }
.process-tableline  #first-li-block em{
    position: absolute;
    width: 10px;
    height: 10px;
    left: 185px;
    top: 90px;
    display: inline-block;
    background: url("../../assets/images/processcoin.png") no-repeat -200px -10px;
}
.process-tableline  #last-li-block em{
    position: absolute;
    width: 7px;
    height: 10px;
    right: 155px;
    top: 90px;
    display: inline-block;
    background: url("../../assets/images/processcoin.png") no-repeat -202px -10px;
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

.process-tableline{
    float: left;
    position: relative;
    left: 50%;
    margin-top: 10px;
}

#processImg{
    float: left;
    position: relative;
    left: -50%;
}
</style>
