<template>
  <div class="coupon-wrap">
<van-nav-bar class="nav1" :title="$t('coupon.title')" left-arrow @click-left="onClickLeft" />
  <div class="return_list">

    <!-- <van-tabs v-model="active">
      <van-tab :title="$t('coupon.use')">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-tab>
      <van-tab :title="$t('coupon.used')">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-tab>
      <van-tab :title="$t('coupon.losed')">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-tab>

    </van-tabs> -->
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
          :show-close-button='false'
          :show-exchange-bar='false'
        />

  </div>
  </div>
</template>

<script src='./insex.ts'>



</script>
<style lang="scss" scoped>
@import './index.scss';

</style>
