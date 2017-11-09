<template>
  <li role="presentation" :class="{'active':tabData.active}"><a href="#tab{{tabData.id}}" aria-controls="tab{{tabData.id}}" role="tab" data-toggle="tab">报销人{{tabData.id}}<span v-show='tabData.id!=0' class="btn-close" @click.stop="close(tabData)">×</span></a></li>
</template>
<script>
export default{
  props: {
      tabData: Object
  },
  methods: {
      close (obj) {
        this.$parent.closeTab(obj);
      }
  }
}
</script>
<style>
li:hover .btn-close {
    opacity: 1;
}

.btn-close {
    position: absolute;
    display: inline-block;
    opacity: 0;
    top: 2px;
    right: 0;
    line-height: 12px;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    font-size: 12px;
    color: #999;
    transition: all .2s ease;
}
</style>
