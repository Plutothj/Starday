<template>
  <div class="Addgifcard-wrap">
    <van-nav-bar :title="$t('supply.p14')" class="nav" left-arrow @click-left="onClickLeft" />
    <div class="main">
      <van-cell-group>
        <van-field
          v-model="username"
          clearable
          :label="$t('supply.p15')"
          :placeholder="$t('supply.p18')"
        />

        <van-field
          v-model="password"
          type="password"
          :label="$t('supply.p16')"
          :placeholder="$t('supply.p19')"
        />
      </van-cell-group>
    </div>

    <van-button
      type="warning"
      size="large"
      :disabled="hangle"
      @click="bang"
      class="bangding"
    >{{$t('supply.p17')}}</van-button>
  </div>
</template>

<script src="./index.ts"></script>
<style lang="scss" scoped>
@import url('./index.scss');
</style>
