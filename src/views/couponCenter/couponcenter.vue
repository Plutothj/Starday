<template>
  <div class="couponcenter-wrap">
<van-nav-bar class="nav" :title="$t('coupon.center')" left-arrow @click-left="onClickLeft" />
<div class="main">
<CouponView :list='list'/>
</div>


  </div>
</template>

<script src='./index.ts'>

</script>
<style lang="scss" scoped>

@import './index.scss';
</style>
