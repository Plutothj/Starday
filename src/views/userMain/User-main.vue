<template>
<div class="User-main-wrap">
  <div class="head">
    <router-link to="/userinfo">
    
    
      <van-image class="head_img" round width="60px" height="60px" :src="userinfo.headImage!=null?userinfo.headImage:'../../../static/img/moren.png'" />
      <div>
        <p class="head_name">{{username}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;></p>
        <p class="integral">{{$t('user_info.integral')+":"+userinfo.integral}}</p>
      </div>
      
   
      
      <!-- <van-tag mark type="warning">{{userinfo.memberTypeName}}</van-tag> -->
    </router-link>
    <van-icon name="setting-o" class="setting" @click="setting" />
  </div>

  <div class="menu_user">
    <!-- <van-cell :title="$t('user_info.integral')"  clickable  icon="points" :value="userinfo.integral"/> -->
    <van-cell :title="$t('supply.p10')" is-link clickable to="Membership" icon="gold-coin-o" :value="$t('supply.p12')+(this.userinfo.cardBalance?this.userinfo.cardBalance:'0')+$t('supply.p13')" />
    <van-cell :title="$t('supply.p11')" is-link clickable to="Addgifcard" icon="gift-card-o" />

    <van-cell :title="$t('user_main.my_order')" is-link clickable to="orderlistshow" icon="notes-o" />
    <van-cell :title="$t('user_main.deliver_adress')" is-link clickable to="adress" icon="location-o" />
    <!-- <van-cell :title="$t('user_main.comont')" is-link clickable icon="thumb-circle-o" @click="assess" /> -->
    <van-cell :title="$t('coupon.center')" is-link clickable to="Couponcenter" icon="send-gift-o" />
    <van-cell :title="$t('coupon.mine')" is-link clickable to="CouponList" icon="coupon-o" />

    <van-cell is-link clickable to="Like" icon="like-o">
      <template slot="title" >
           <span class="custom-title">{{$t('user_main.like')}}</span>
      </template>
      </van-cell>
    <van-cell :title="$t('user_main.return')" is-link clickable to="ReturnList" icon="balance-list-o"  class="return"/>
       <van-cell :title="$t('user_main.credit_card')" is-link clickable to="Creditcard" icon="credit-pay" />
      <van-cell :title="$t('user_main.about')" is-link clickable to="about_us" icon="contact" />
    </div>
    <!-- <div class="menu_info">
      <van-cell :title="$t('user_main.credit_card')" is-link clickable to="Creditcard" icon="credit-pay" />
      <van-cell :title="$t('user_main.about')" is-link clickable to="about_us" icon="contact" />
    </div> -->
    <navFoot :active="active"></navFoot>
  </div>
</template>

<script src='./index.ts'>
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
