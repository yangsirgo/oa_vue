<template>
<div class="set-page">
    <div class="page-cont">
        <div class="set-page-mbx">
            <span class="set-page-title">当前位置：修改密码</span>
        </div>
        <div class="con c-con">
            <div class="tt">修改密码</div>
            <div class="info">
              <validator name='validation' :groups="['passwordGroup']">
                <div class="info-box">
                    <span class="xing">*</span>
                    <span class="text">旧密码:</span>
                    <div style="display:inline-block;*zoom:1;*display:inline;">
                      <input type="password"
                        name="user_password" id="user_password" class="old" placeholder="" v-model='password.old' v-validate:old="{
                        required:{rule:true,message:'请先写旧密码！'}
                        }" initial="off"  group='passwordGroup'>
                    </div>
                </div>
                <div class="info-box">
                    <span class="xing">*</span>
                    <span class="text">新密码:</span>
                    <div style="display:inline-block;*zoom:1;*display:inline;"><input type="password" name="new_user_password" id="new_user_password" class="old" placeholder="" v-model='password.new' v-validate:new="{
                    required:{rule:true,message:'请先写新密码！'},
                    minlength:{rule:6,message:'你的新密码太短了'},
                    maxlength:{rule:10,message:'你的新密码太长了'}
                    }" initial="off" group='passwordGroup'></div>
                </div>
                <div class="info-box confirm">
                    <span class="xing">*</span>
                    <span class="text">确认新密码:</span>
                    <div style="display:inline-block;*zoom:1;*display:inline;"><input type="password" name="confirmPassWord" id="confirmPassWord" class="old" placeholder="" v-validate:confirm="{
                    required:{rule:true,message:'请写确认密码！'},
                    confirm:{rule:password.new,message:'确认密码与新密码不一致!'}
                    }" initial="off"  group='passwordGroup'  v-model='password.cofirmNum'
                    ></div>
                </div>
                <div class="btn">
                    <button type="button"  name="save" class="btn1 ui-state-default ui-corner-all"
                    :class="{'isabled':$validation.passwordGroup.valid}"
                    @click='onSubmit($event)'>修改密码</button>
                    <button type="reset" name="reset" class="btn2 ui-state-default ui-corner-all"
                    :style="isok"
                    @click.prevent='deleteAll()'>清除</button>
                </div>
                <p class="tip2">
                    <span class="xing">*</span>
                    密码为6-10位字母或数字
                </p>
                <div class='errors'>
                  <validator-errors :validation='$validation' :component="'custom-error'" ></validator-errors>
                </div>
              </validator>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
 import VueCookie from 'vue-cookie'
 import $ from 'jquery'
import xcarui from '../assets/oaui'



Vue.use(VueValidator)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueCookie);
Vue.component('custom-error',{
  props:['field','validator','message'],
  template:'<p :style="error">{{message}}</p>',
  data(){
    return {
      error:{
          padding:'5px',
          fontSize:'16px'
      }
    }
  }
});
  export default{
    data () {
      return {
        password:{
          old:'',
          new:'',
          cofirmNum:''
        },
        isok:{
          backgroundColor:'#539be9'
        }
      }
    },
    validators:{
      confirm:function(val,target){
        return val===target;
      }
    },
    methods:{
      onSubmit:function(event){
        var self = this;
        var el = event.currentTarget;
        if(!$(el).hasClass('isabled')){
          console.log('you isabled')
          return;
        }
        self.$http.post(
          'http://localhost:8080/HumanBasic/auth/modifyPassword',
          {
            "userId":self.$cookie.get("user_uid"),
            "oldPassword": self.password.old,
             "newPassword": self.password.new
           },
           {
            'headers':{
              'Content-Type':'application/x-www-form-urlencoded'
            }
           }
          ).then(function(response){
            if (response.data.code=="0001") {
                    // xcarui.successMask("恭喜！修改密码成功");
                    // setTimeout(function (){
                    //     cookie.clear();
                    //     store.clear();
                    //     window.location.href = "./login.html";
                    // },1500)
                }
                else {
                    // xcarui.error("请重新提交修改密码");
                    xcarui.successMask("恭喜！修改密码成功");
                    setTimeout(function (){
                        self.$cookie.delete();
                        self.$route.router.go('/login');
                    },1500)
                }
          },function(response){
            console.log(response);
          })
      },
      deleteAll:function(){
        this.password.old='',
        this.password.new='',
        this.password.cofirmNum=''
      }
    }
  }
</script>

<style scoped>
.isabled{
  background-color:#539be9;
}
.errors{
  padding:15px;
  color:red;
  font-size:18px;
}
.errors p.error{
  padding:5px;
  font-size:18px;
}
.set-page .page-cont .c-con div.info {
    text-align: center;
    font-size: 16px;
    color: #539be9;
    font-weight: bold;
    margin-top: 50px;
}
.page-cont .con {
    /*border-top: 4px solid  #539be9;*/
    background-color: #ffffff;
    /*margin: 20px;*/
}

.page-cont .tt {
    display: inline-block;
    /*推荐:IE67*/
    _zoom:1;
    _display:inline;
    padding-bottom: 10px;
    border-bottom: 2px solid #FF9A34;
    font-size: 18px;
    line-height: 17px;
    margin-top: 17px;
    margin-left: 27px;
}

.page-cont .c-con .info {
    text-align: center;
    font-size: 16px;
    color: #0068b7;
    font-weight: bold;
}

.page-cont .c-con .info .tip2 {
    font-size: 14px;
}
.c-con .info .info-box {
    height: 32px;
    margin-bottom: 40px;
}
.c-con .info .confirm {
    position: relative;
    left: -15px;
}
.c-con .info .btn {
    margin: 0px auto 30px;
}

.c-con .info .xing {
    color: #fc3636;
}
.c-con .info .info-box .text {
    margin-right: 24px;
    font-size: 17px;
}

.c-con .info .info-box input {
    width: 275px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #9e9e9e;
    padding: 0 3px;
    vertical-align: middle;
}

.c-con .info .btn button {

    /*border: none;*/
    border-radius: 4px;
    font-size: 18px;
    color: white;
    width: 142px;
    height: 36px;
    cursor: pointer;
}

.c-con .info .btn .btn1 {
    margin-right: 50px;
}
.c-con .info .btn .btn2{
  background-color: #2f7fe7;
}
.c-con .info .btn button:hover {
    background-color: #2f7fe7;
}

#resultFront {
    margin-bottom: 15px;
    margin-top: 25px;
    color:red;
    height: 15px;

}

.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default, .ui-button, html .ui-button.ui-state-disabled:hover, html .ui-button.ui-state-disabled:active {
    border: 1px solid #c5c5c5;
    /* background: #f6f6f6; */
    font-weight: normal;
    color: #454545;
}

.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {
    border-top-left-radius: 4px;
}

.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {
    border-top-right-radius: 4px;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {
    border-bottom-left-radius: 4px;
}

.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {
    border-bottom-right-radius: 4px;
}
.page-cont {
    padding: 16px 4px;
}

.set-page-mbx .set-page-title {
    line-height: 14px;
    font-size: 14px;
    padding-left: 25px;
    display: block;
    border-bottom: 1px solid #D3D6D9;
    padding-bottom: 15px;
}

.set-page {
    margin-left: 164px;
    /* background: #f5f5f5; */
}

</style>
