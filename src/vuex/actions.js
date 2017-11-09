/*
* @Author: Xcar
* @Date:   2016-12-12 15:12:15
* @Last Modified by:   Xcar
* @Last Modified time: 2016-12-26 17:56:49
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
export const initInfo = ({dispatch},p) => {
    Vue.http.get({
                    url:'http://localhost:8080/PersonalReimburse/reimburseInfo/listReimburseUsers',
                    headers:{Authorization:'Basic Yxsdlfjui'},
                    params:p
                    })
        .then((response) => {
          if(response.data.code=="0001"){
             dispatch('APPLYDETAILS_INFO', response.data);
            };
        },(response) => {
            console.log('fail');
        });
};
export const personapplydetailsajax = ({dispatch},p) => {
    Vue.http.get({
                    url:'http://localhost:8080/PersonalReimburse/reimburseInfo/detail',
                    headers:{Authorization:'Basic Yxsdlfjui'},
                    params:p
                    })
        .then((response) => {
          if(response.data.code=="0001"){
             dispatch('PERSONAPPLYDETAILS_INFO', response.data);
            };
        },(response) => {
            console.log('fail');
        });
};
export const isshowtablist = ({ dispatch})=> {
  dispatch('SHOWAPPLYDETAILS',true);
};
//先择人之后发送ajax取到账号和开户行
export const selectPerReimUserInfoajax = ({dispatch},p) => {
    Vue.http.get({
                    url:'http://localhost:8080/PersonalReimburse/perReimburseApply/selectPerReimUserInfo',
                    headers:{Authorization:'Basic Yxsdlfjui'},
                    params:p
                    })
        .then((response) => {
          if(response.data.code=="0001"){
             dispatch('SELECTPERREIMUSER_INFO', response.data);
            };
        },(response) => {
            console.log('fail');
        });
};
//选择报销项目ajax
export const applytypeOptionAjax = ({dispatch},p) => {
    Vue.http.get({
                    url:'http://localhost:8080/PersonalReimburse//personalReimburseItem/queryPersonalReimburseItemList',
                    headers:{Authorization:'Basic Yxsdlfjui'},
                    params:p
                    })
        .then((response) => {
          if(response.data.code=="0001"){
             dispatch('APPLYTYPEOPTION_INFO', response.data);
            };
        },(response) => {
            console.log('fail');
        });
};
//税率
export const applytaxOptionAjax = ({dispatch},p) => {
    Vue.http.get({
                    url:'http://localhost:8080/PersonalReimburse/tax/queryTaxList',
                    headers:{Authorization:'Basic Yxsdlfjui'}
                    })
        .then((response) => {
          if(response.data.code=="0001"){
             dispatch('APPLYTAXLISTOPTION_INFO', response.data);
            };
        },(response) => {
            console.log('fail');
        });
};
//货币汇率
export const applycurrencyOptionAjax = ({dispatch},p) => {
    Vue.http.get({
                    url:'http://localhost:8080/PersonalReimburse/currency/queryCurrencyList',
                    headers:{Authorization:'Basic Yxsdlfjui'}
                    })
        .then((response) => {
          if(response.data.code=="0001"){
             dispatch('APPLYCURRENCYLIST_INFO', response.data);
            };
        },(response) => {
            console.log('fail');
        });
};
//人员基本信息ajax请求
export const PerReimApplyUserInfoAjax = ({dispatch},p) => {
    Vue.http.get({
                    url:'http://localhost:8080/PersonalReimburse/perReimburseApply/selectPerReimApplyUserInfo',
                    headers:{Authorization:'Basic Yxsdlfjui'},
                    params:p
                    })
        .then((response) => {
          if(response.data.code=="0001"){
             dispatch('PERPEIMAPPLYUSERDATA_INFO', response.data);
            };
        },(response) => {
            console.log('fail');
        });
};

