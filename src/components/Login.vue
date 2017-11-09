<template>
  <div class="frame" id="app">
        <validator name="validation">
            <ul>
                <li>
                    <p class="title">爱卡OA系统 </p>
                </li>
                <li class="input">
                    <i class="before staff" style="visibility: visible;"></i>
                    <input type="text" v-model="usernumber" @keyup.enter="onsubmit" v-validate:usernum="['required']"
                           class="code sta" placeholder="员工编号" number/>
                    <i class="del" style="visibility: hidden;"></i>
                </li>
                <li class="input">
                    <i class="before pw" style="visibility: visible;"></i>
                    <input type="password" v-model="password" @keyup.enter="onsubmit" id="user_password"
                           v-validate:password="['required']" class="code psw" placeholder="密&emsp;&emsp;码"/>
                    <i class="del" style="visibility: hidden;"></i>
                </li>
                <li>
                    <button id="submitBtn" class="sub" @click.prevent="onsubmit" class="{{isRipe}}" v-cloak>{{login}}
                    </button>
                </li>
            </ul>
            <div class="bottom">
                <span v-bind:style="ddfe" v-cloak>{{message}}</span>
            </div>
        </validator>
    </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
 import VueCookie from 'vue-cookie'
 import $ from 'jquery'

Vue.use(VueValidator)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueCookie);

export default {
        data(){
          return{
            usernumber: "",
            password: "",
            message: "",
            login: "登录",
            isRipe: "",
            ddfe: {
                color: 'red',
                marginBottom: '15px'
            }
          }
        },
        methods: {
            onsubmit: function () {
              let self = this;
                if (this.isRipe == "disabled") {
                    return;
                }
                ;
                if (this.usernumber == "") {
                    this.message = "请输入用户名";
                    return;
                } else if (this.password == "") {
                    this.message = "请输入密码";
                    return;
                } else {
                    this.message = "";
                }
                let reg = /^[0-9a-zA-Z]*$/g;
                if (!(reg.test(this.usernumber))) {
                    this.message = "用户名必须是数字";
                    return;
                }
                if (!/^[0-9a-zA-Z]*$/.test(this.password)) {
                    this.message = "密码只能是数字或者字母!";
                    return;
                }
                this.login = "正在登录...";
                this.isRipe = 'disabled';
                this.$http.get({
                    url: 'http://localhost:8080/OA/auth/login',
                    method: "GET",
                    data: {
                        'unumber': this.usernumber,
                        'pwd': this.password
                    },
                    headers: {
//                        "Content-Type": "x-www-form-urlencoded"
                        Authorization:'Basic Yxsdlfjui'
                    }
                }).then(function (response) {
                    if (response.data.code == '0001') {//如果返回来的信息说明提交的信息为正确的
                        let user_name = response.data.body.uname;
                        let token = response.data.body.token;
                        let user_uid = response.data.body.uid;
                        let roleEnName;
                        let roleEnNameArray = [];
                        $.each($(response.data.body.roles), function (n, data) {
                            roleEnNameArray.push(data.roleEnName);
                        });
                        self.$cookie.set("user_name", user_name, 30);
                        self.$cookie.set("token", token, 30);
                        self.$cookie.set("user_uid", user_uid, 30);
                        self.$cookie.set("roleEnName", roleEnNameArray.join(','), 30);
                        self.$route.router.go('/home/index');
                    } else if (response.data.code == '0002') {
                        this.message = response.data.body;
                        this.isRipe = '';
                        this.login = "登录";
                        return false;
                    }
                }, function (response) {
                    this.message = "请检查网络，数据无法发送！";
                    //请求完成了让状态还原
                    this.isRipe = '';
                    this.login = "登录";
                })
            }
        }
}
</script>

<style scoped>

body{
    background: url(../assets/loginImage/bg.png) no-repeat center top;
}
.frame{
    width: 460px;
    height: 330px;
    background-color: #fdebe7;
    opacity: .85;
    text-align: center;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    position: absolute;
    top: 115px;
    right: 115px;
    padding-bottom: 20px;
}
.frame ul .title{
    font-size: 30px;
    color: #0069b4;
    margin-top: 30px;
}
.frame ul .input{
    width: 310px;
    height: 46px;
    border: 2px #91bbe0 solid;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    margin: 0 auto 24px;
    position: relative;
    z-index: 2;
}
.scode{
    width: 225px;
    height: 46px;
    position: relative;
}
.frame ul .input input{
    width: 225px;
    height: 46px;
    line-height: 46px;
    border: none;
    font-size: 16px;
    vertical-align: middle;
    -webkit-appearance: none;
}
.frame ul .input .tip{
    color: #CCC;
}
.frame ul .input .tipnone{
    color:#000;
}
.dinput{
    width: 225px;
    height: 46px;
    position: relative;
}
.frame ul .input .placeholder{
    position: absolute;
    vertical-align: middle;
    top: 13px;
    z-index: 0;
}
.frame ul .before{
    position: absolute;
    top: 12px;
    left: 15px;
    width: 15px;
    height: 20px;
}
.frame ul .staff{
    background: url(../assets/loginImage/staff.png) no-repeat;
}
.frame ul .pw{
    background: url(../assets/loginImage/password.png) no-repeat;
}
.frame ul .del{
    background: url(../assets/loginImage/close.png) no-repeat;
    width: 22px;
    height: 22px;
    position: absolute;
    top: 12px;
    right: 10px;
}
.frame button{
    border: none;
    background-color: #0069b4;
    font-size: 18px;
    color: white;
    width: 311px;
    height: 47px;
    border-radius: 1px;
    -moz-border-radius: 1px;
    -webkit-border-radius: 1px;
}
.frame .red{
    color: #ec001d;
    font-size: 14px;
}
.frame .tips{
    color: #00489a;
    font-size: 14px;
    position: absolute;
    right: 75px;
}
.frame ul li{
    margin-bottom: 16px;
}
</style>
