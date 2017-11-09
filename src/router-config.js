/*
* @Author: Xcar
* @Date:   2016-12-02 10:07:35
* @Last Modified by:   Xcar
* @Last Modified time: 2016-12-12 15:49:52
*/

'use strict';
import App from './App'
import Home from './Home'
import Index from './components/Index'
import Modifipassword from './components/Modifipassword'
import Myapplication from './components/Myapplication'
import Rtjapplication from './components/Rtjapplication'
import MyApplidetails from './components/MyApplidetails'
export default function(router){
  router.map({
  '/login':{
    component:App
  },
  '/home':{
    component:Home,
    subRoutes:{
      "/index":{
        component:Index,
      },
      "/modifipassword":{
        component:Modifipassword
      },
      '/myapplycation':{
        component:Myapplication
      },
      '/Rtjapplication':{
        component:Rtjapplication
      },
      '/MyApplidetails':{
        name:'MyApplidetails',
        component:MyApplidetails
      },
    }
  }
})
  router.redirect({
    '*':'/login'
  })

}
