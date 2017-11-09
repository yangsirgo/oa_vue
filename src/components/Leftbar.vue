<template>
    <div class="set-menu fl">
        <div class="header-menu">
            <p class="fz16 cs">自定义菜单</p>
            <span></span>
        </div>
        <div>
            <ul id="js_left_menu" class="set-menu-ul">
                <li class="true ex" v-for="liiterm in liiterms">
                    <a class="fz20 left-header first_A" v-on:click="sonMenuControll($index)"><i class="pic pic_14"></i>{{liiterm.name}}</a>
                    <ul class="menu-ul-ul sonMenu{{$index}}" id="menu_list_ul">
                              <template v-for="sonitem in liiterm.items">
                                <li v-if="$index==0" class="first-li">
                                  <span class="button top_docu switch"></span><a v-link='{path:"/home/index"}'
                                                           :class="{'true':link.indexOf(sonitem.pageUrl.substring(2))>'-1'?true:false}">{{sonitem.name}}</a>
                                </li>
                              <template v-else>
                                <li class="last-li" v-if="$index==liiterm.items.length-1">
                                  <span class="button bottom_docu switch"></span><a v-link='{path:"/home/myapplycation"}'
                                                                  :class="{'true':link.indexOf(sonitem.pageUrl.substring(2))>'-1'?true:false}">{{sonitem.name}}</a>
                                </li>
                                <li v-else><span class="button center_docu switch"></span><a href={{sonitem.pageUrl}}
                                                                         :class="{'true':link.indexOf(sonitem.pageUrl.substring(2))>'-1'?true:false}">{{sonitem.name}}</a></li>
                            </template>
                          </template>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
 import $ from 'jquery'
Vue.use(VueCookie);
Vue.use(VueResource);

export default {
        data(){
            return {
                liiterms:[],
                link:window.location.href+'/'
            }
        },
        created:function(){
            this.setmenu();
        },
        methods:{
            setmenu:function(){
              let self = this;
                this.$http({url:'http://localhost:8080/OA/leftDir/getDirTree',
                    params:{
                        token:self.$cookie.get("token")
                    },
                    headers:{Authorization:'Basic Yxsdlfjui'}})
                    .then(function(response){
                        if(response.data.code=="0001"){
                            self.liiterms = response.data.body;
                        }
                    },function(){

                    })
            },
            sonMenuControll:function(index){
                let target = 'sonMenu'+index;
                $(this.$el).find('.'+target).toggle();
            }
        }
    }
</script>

<style>
/*以下部分是左边栏*/

.set-menu{
    width: 164px;
    background: #213346;
    height: 737px;
}

#set-cont{
    /*padding-bottom: 120px;*/
    /*width: 100%;*/
    margin: auto;
    /*min-height: 800px;*/
    /*height: 100%;*/
}
.header-menu{
    color: #BDC2C8;
    height: 56px;
    position: relative;
}
.header-menu p{
    line-height: 56px;
    padding-left: 16px;
}
.header-menu span{
    background: url("../assets/images/newcoin.png") no-repeat -11px 2px;
    display: block;
    width: 16px;
    height: 16px;
    top: 19px;
    right: 6px;
    position: absolute;
}
.set-menu-ul li {

    /*line-height: 48px;*/
    font-size: 16px;
    color: #fff;
}
/*.set-menu-ul>li.true>a:first-child {*/
    /*/!*background: #2d3a48;*!/*/
    /*background: red;*/
/*}*/
.set-menu-ul>li>a.left-header{
    height: 33px;
    font-size: 16px;
    padding-left: 14px;
    background-color: #1E2F41;
    line-height: 32px;
    border-top: 1px solid #172534;
    cursor: pointer;
    /*border-top-width:1px;*/
    /*border-top-style:solid;*/
    /*border-top-color:#172534;*/
}

.set-menu-ul>li>a{
    padding-left: 28px;
    position: relative;
    display: block;
    color: #BDC2C8;
}
.set-menu-ul>li.true .menu-ul-ul {
    display: block;
}
.menu-ul-ul {
    display: none;
}
.menu-ul-ul li {
    line-height: 27px;
    font-size: 14px;
    /*padding-left: 35px;*/
}
.menu-ul-ul li.first-li{
    /*padding-top: 10px;*/
}
.menu-ul-ul li.first-li .button{
    padding-top: 10px;
}
.menu-ul-ul li.first-li a{
    padding-top: 10px;
}

.menu-ul-ul li.last-li{
    margin-bottom: 7px;
}
.menu-ul-ul li a{
    color:#7A8590;
    display: inline-block;
}
.menu-ul-ul li a.true {
    color: #fff;
}

.set-menu-ul .true .pic_14 {
    background-position:-11px -14px;
    width: 11px;
    height: 6px;
    top: 13px;
    right: 9px;
}

.set-menu-ul .false .pic_14 {
    background-position:16px -16px;
    width: 11px;
    height: 6px;
    top: 13px;
    right: 9px;
}

.pic {
    background-image: url("../assets/images/newcoin.png");
    display: inline-block;
}

.set-menu-ul .pic {
    position: absolute;
}

.menu-ul-ul li span.button.center_docu {
    background-position: 15px -14px;
}

.menu-ul-ul li span.button.switch{
    width: 24px;
    height: 27px;
}

.menu-ul-ul li span.button{
    line-height: 0;
    margin: 0;
    /*width: 16px;*/
    /*height: 16px;*/
    display: inline-block;
    vertical-align: top;
    /*vertical-align: middle;*/
    border: 0 none;
    cursor: pointer;
    /*outline: none;*/
    /*background-color: transparent;*/
    background-repeat: no-repeat;
    /*background-attachment: scroll;*/
    background-image: url("../assets/images/newcoin.png");
}

.menu-ul-ul li span.top_docu {
    background-position: 15px -5px;
}

.menu-ul-ul li span.bottom_docu {
    background-position: 15px -42px;
}
</style>
