<template>
  <div class="empty-wrap">
    <!-- <van-nav-bar class="nav1" left-arrow @click-left="onClickLeft" /> -->
    <div class="empty">
      <div class="img-container">
        <img v-if="!isGoods" src="@s/img/wushuju.png" alt />
        <img v-if="isGoods" src="@s/img/wushangpin.png" alt />
      </div>
      <p v-if="!isGoods">{{$t('error_msg1')}}</p>
      <p v-if="isGoods">{{$t('error_msg2')}}</p>
    </div>
  </div>
</template>

<script src='./index.ts'>



</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
