<template>
  <div class="Membership-wrap">
    <van-nav-bar :title="$t('supply.p20')" class="nav" left-arrow @click-left="onClickLeft" />
    <div class="main">
     
      <van-cell-group> 
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      > 
        <van-cell v-for="(item,index) in info" :key='index' :title="$t('supply.p21')+item.transactionNo" :value="item.month+'-'+item.day" size="large" :label="item.description" />
         </van-list>
      </van-cell-group>
     
    </div>
  </div>
</template>

<script src='./index.ts'>


</script>
<style lang="scss" scoped>
@import './index.scss'
</style>
