<template>
  <div class="Addcard-wrap">
    <van-nav-bar :title="$t('addcard.card')" class="nav" left-arrow @click-left="onClickLeft" />
    <div class="main">
      <van-field
        v-model="nominee"
        class="reg_emile L0"
        clearable
        :placeholder="$t('addcard.name')"
        clickable
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('addcard.cardname')"
      />
      <van-field
        v-model="card_NO"
        class="reg_emile L0"
        clearable
        :placeholder="$t('addcard.cardNo')"
        clickable
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('addcard.No')"
      />

      <van-field
        v-model="expire"
        class="reg_emile L0"
        clearable
        :placeholder="$t('addcard.timeinfo')"
        clickable
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('addcard.time')"
      />
    </div>
    <van-loading type="spinner" color="#EC581E" v-if="show" class="spinner"/>
    <!-- <van-button type="warning" size="large" to="/addadress">保存</van-button> -->
    <Button :msg="$t('addcard.save')" @click="addcard" />
  </div>
</template>

<script src='./index.ts'>

</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
