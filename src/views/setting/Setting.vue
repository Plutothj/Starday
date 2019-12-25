<template>
  <div class="Setting-wrap">
    <van-nav-bar class="nav1" :title="$t('supply.seting')" left-arrow @click-left="onClickLeft" />
    <div class="main">
      <van-cell :title="$t('supply.changgelanguage')" :value="language" @click="changelanguage" />
      <van-cell :title="$t('supply.p8')" :value="cache" @click="delcache" />
      <van-button type="danger" size="large" @click="logout" class="logout">{{$t('supply.logout')}}</van-button>
    </div>
    <van-action-sheet v-model="show2" :actions="actions2" @select="onSelect" />
  </div>
</template>

<script src='./index.ts'>

</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
