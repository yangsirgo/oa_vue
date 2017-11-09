<template>
    <div class="app-header">
        <a href="./index.html" class="fz22 logo-link tcenter">爱卡OA系统</a>
        <div class="nav">
            <ul>
                <li>
                    <a v-link="{path:'/home/index'}">返回首页</a>
                </li>
                <li class="user-name">
                    <a href="javascript:avoid(0)" class="li_a"><span class="person_name">{{username}}</span><i class="user-pic"></i></a>
                    <div class="my-system-menu">
                        <div class="my-system-posi"></div>
                        <a v-link="{path:'/home/modifipassword'}"><i class="sp-menu-hd3"></i>密码修改</a>
                        <a v-link="{path:'/login'}"><i class="sp-menu-hd5"></i>退出</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

export default {
    data(){
          return {
                    username:this.$cookie.get("user_name"),
                }
          }
}
</script>

<style>
.app-header {
    /*width: 210px;*/
    height: 72px;
    background-color:#539be9;
    top: 0;
    /*padding: 10px;*/
    position: relative;
}

.app-header .nav {
    display: inline-block;
    /*height: 100%;*/
    position: absolute;
    /*top: 25px;*/
    right: 0;
    z-index: 31;
}

.app-header .nav li {
    font-size: 14px;
    float: left;
    /* margin-left: 2px; */
    padding: 23px 20px;
    line-height: 25px;
    position: relative;

}
.app-header .nav li.user-name{
    margin-right: 35px;
}
.app-header .nav li>a{
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 25px;
    color: #fff;
    display: block;
    font-family: microsoft yahei;
}

.app-header .nav li.user-name i.user-pic{
    position: absolute;
    top: 31px;
    right: 2px;
    width: 13px;
    height: 7px;
    background-position: -10px -31px;
    background-image: url(../assets/images/newcoin.png);
}
.logo-link{
    width: 268px;
    display: inline-block;
    line-height: 72px;
    color: #fff;
    text-align: center;
    background-color: #539BE9;
    font-size: 40px;
    font-family: microsoft yahei;
    letter-spacing: 1px;
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
