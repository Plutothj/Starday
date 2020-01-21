<template>
  <div class="Addcard-wrap">
    <van-nav-bar :title="$t('addcard.card')" class="nav" left-arrow @click-left="onClickLeft" />
    <div class="main">
      <van-field 
        v-model="emile"  
        :label="$t('user_info.emile')" 
        id="emile" 
        class="reg_emile L0" 
        clearable placeholder="" 
        clickable
        disabled
        :error-message="errormsg" 
        @input="Regemil">
       <van-button 
          slot="button" 
          size="small" 
          type="primary" 
          :disabled='disabled' 
          @click="sendCode">
        {{loadtext}}
       </van-button>
      </van-field>
      <van-field 
        v-model="sms" 
        center clearable 
        label="验证码" 
        :placeholder="$t('resetpwd.code')"
        >
      </van-field>
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
        maxlength='16'
        @input="Regemil"
        :label="$t('addcard.No')"
      />

      <van-field
        v-model="expire"
        class="reg_emile L0"
        clearable
        :placeholder="$t('addcard.timeinfo')"
        clickable
        maxlength='4'
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('addcard.time')"
      />
      
      
      
    </div>
    <van-loading type="spinner" color="#EC581E" v-if="show" class="spinner"/>
    <!-- <van-button type="warning" size="large" to="/addadress">保存</van-button> -->
    <Buttons class="button" :msg="$t('addcard.save')" @click="addcard" />
  </div>
</template>

<script src='./index.ts'>

</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
