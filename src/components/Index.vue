<template>
      <div class="set-page">
                  <div class="page-cont">
                      <div class="set-page-mbx">
                          <span class="set-page-title">当前位置：首页<span style="font-family: 'microsoft yahei'">&nbsp;>&nbsp;</span>发起申请</span>
                      </div>
                      <div>
                          <span class="pass-name">发起申请</span>
                      </div>
                      <div class="set-block">
                          <div class="line-one">
                              <div class="set-block-div">
                                  <table class="set-table" cellSpacing=0 >
                                      <thead>
                                      <tr>
                                          <th colspan="2">
                                              <h3><a href="#">财务类（1）</a></h3>
                                          </th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr>
                                          <td>
                                              <a v-link="{path:'/home/Rtjapplication'}">报销申请</a>
                                          </td>
                                          <td>
                                              <a href="#"></a>
                                          </td>
                                      </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
</template>

<script>
  export default{
    data () {
      return {}
    }
  }
</script>

<style scoped>
.set-page {
    margin-left: 164px;
    /*background: #f5f5f5;*/
}

.page-cont {
    padding: 16px 4px;
}

.set-page-mbx .set-page-title{
    line-height: 14px;
    font-size: 14px;
    padding-left: 25px;
    display: block;
    border-bottom: 1px solid #D3D6D9;
    padding-bottom: 15px;
}
.page-cont .pass-name{
    display: inline-block;
    margin-left: 27px;
    padding-bottom: 10px;
    padding-top: 17px;
    border-bottom: 2px solid #FF9A34;
    font-size: 18px;
    line-height: 17px;
}
.page-cont .search-Bar{
    margin-left: 11px;
    padding-top: 17px;
    /*min-width: 500px;*/
}
.page-cont .search-Bar .search-Bar-name{
    font-size: 14px;
    /*margin-top: 1px;*/
    display: inline-block;
    line-height: 20px;
    vertical-align: middle;
}
.page-cont .search-Bar .search-input{
    width: 166px;
    height: 22px;
    display: inline-block;
    border:1px solid #D3D6D9;
    background-color:transparent;
}

.page-cont .search-Bar .search-button{
    width: 72px;
    height: 22px;
    border:1px solid #D7DADC;
    cursor: pointer;
    background-color: #539BE9;
    color: #FFFFFF;
    font-size: 14px;
    margin-left: 30px;
}

.set-block {
    padding-left: 8px;
   /*padding-right: 20px;*/
    /*padding-bottom: 20px;*/
    padding-top: 17px;
    /*min-height: 60px;*/
}

.set-block .set-table{
    BORDER-BOTTOM-WIDTH: 0px;
    BORDER-TOP-WIDTH: 0px;
    BORDER-RIGHT-WIDTH: 0px;
    BORDER-LEFT-WIDTH: 0px;
    BORDER-COLLAPSE: collapse;
    /*background-color: #fff;*/
    /*border-color:#000000;*/
    width: 389px;
}
.set-block .set-table th{
    border: 1px solid #D3D6D9;
    height:42px;
    background-color: #FCFCFC;
}
.set-block .set-table th a{
    font-size:16px;
    color: #1E2F41;
    display: inline-block;
    width: 130px;
    line-height: 25px;
    background-color: #fff;
}

.set-block .set-table td span{
    display: block;
}

.set-block .set-table td{
    border: 1px solid #D3D6D9; /*边框*/
    /*width:100px;             /!*单元格宽度*!/*/
    height:41px;             /*单元格高度*/
    text-align:center;       /*单元格文字居中对齐*/
    background-color: #fff;
}

.set-block .set-table td a{
   display: inline-block;
    width: 100px;
    line-height: 25px;
    text-align:center;
}

.set-block-div{
    display: inline-block;
    margin-bottom: 23px;
    margin-left: 20px;
    margin-right: 16px;
}
/*ie6、ie7*/
.set-block-div{
    *display:inline;
}

.line-one{
    width: 1000px;
}

.bg{
    height: 100%;
    width: 164px;
    background: #213346;
}


</style>
