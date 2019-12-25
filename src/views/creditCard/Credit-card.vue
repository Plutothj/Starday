<template>
  <div class="Credit-card-wrap">
    <van-nav-bar class="nav" :title="$t('creditCard.cardmange')" left-arrow @click-left="onClickLeft" />

    
    <van-skeleton
  title
  style="margin-top:60px"
  :row="3"
  :loading="loading"
>
  <div> <van-radio-group v-model="radio" class="main">
      <van-cell-group>
        <div @click="radio = index + 1" class="adress" v-for="(item,index) in cardList" :key="index">
          <van-radio
            slot="right-icon"
            :name="index+1"
            checked-color="#EC5820"
            class="right-icon"
            style="float:left"
          />
          <p class="name">VISA:&nbsp;{{item.card}}</p>
          <p class="detail">{{item.nominee}}</p>
          <span style="float:right" class="del" @click="delcard(item)">{{$t('creditCard.del')}}</span>
          <van-divider :style="{ borderColor: '#EC5820', padding: '0 15px' }"></van-divider>
        </div>
      </van-cell-group>
    </van-radio-group></div>
</van-skeleton>
   

    <!-- <van-button type="warning" size="large" to="/addcard">添加信用卡</van-button> -->
    <Button addadress="/addcard" :msg="$t('creditCard.addCard')" />
  </div>
</template>

<script src='./index.ts'>



</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
