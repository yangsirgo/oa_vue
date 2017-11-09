<template>
  <div>
    <ul class="nav nav-tabs">
      <template v-for="(index,tab) in tabsArray">
        <li  v-if='index==0' role="presentation" :class="{'active':true}"><a href="#tab{{index}}" aria-controls="tab{{index}}" role="tab" data-toggle="tab">{{tab.reimbursUserName}}</a></li>
        <template v-else>
          <li role="presentation" :class="{'active':false}"><a href="#tab{{index}}" aria-controls="tab{{index}}" role="tab" data-toggle="tab">{{tab.reimbursUserName}}</a></li>
        </template>
      </template>
    </ul>
    <div class="tab-content">
    <template v-for="(index,tabobj) in tabsArray">
      <div  v-if='index==0' role="tabpanel" class="tab-pane" :class="{'active':true}" id="tab{{index}}">
        <simple-table :total-table='tabsArray'></simple-table>
      </div>
      <div v-else role="tabpanel" class="tab-pane"  :class="{'active':false}" id="tab{{index}}">
        <table-form v-bind:person-mytable='tabobj'></table-form>
      </div>
    </template>
    </div>
    </div>
</template>
<script>
  import SimpleTable from '../views/SimpleTable.vue'
  import TableForm from '../views/TableForm.vue'
  import { getdata} from '../../../vuex/getters'
    export default{
      data () {
          return {
            tablist: []
          }
      },
      components:{
        SimpleTable,
        'table-form':TableForm
      },
      vuex: {
        getters: {
            tabsArray:getdata
        }
      },
      watch:{
        tabsArray:{
          handler:function(val,oldval){
            console.log(val);
            console.log("tabsArray");
          }
        }
      },
      methods:{

      }
  }
</script>
<style>
  .nav-tabs {
    background-color: #eeeeee;
    padding-top:5px;
    padding-left:5px;
    border: 1px solid #ddd;

  }

  .tab-content {
    color : #000000;
    background-color: #ffffff;
    padding : 5px 15px;
    margin-top: -1px;
    border: 1px solid #ddd;
  }
</style>
