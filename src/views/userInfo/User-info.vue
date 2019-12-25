<template>
<div class="user-info-wrap">
  <van-nav-bar class="nav" :title="$t('user_info.userinfo')" left-arrow @click-left="onClickLeft" />
  <div>
    <div class="change_img">
      <span>{{$t('user_info.head_img')}}</span>
      <div class="change_icon">
        <van-uploader v-model="fileList" :after-read="afterRead"  preview-size='30px' image-fit='round' :deletable='false' :preview-full-image='false'>
          <van-image v-if="fileList.length == 0" round width="30px" height="30px" :src="userinfo.headImage?userinfo.headImage:morren" />
          <!-- <van-icon name="../static/img/ic_more copy备份 4.png" /> -->
        </van-uploader>
      </div>
    </div>
    <van-cell :title="$t('user_info.name')" is-link :value="username" @click="show=true" />
    <van-cell :title="$t('user_info.six')" is-link :value="userinfo.sex==1?'男':'女'" @click="show=true"/>
    <van-cell :title="$t('user_info.emile')" :value="customerAccount" />
    <van-cell :title="$t('user_info.phone')" :value="userinfo.mobile" @click="show=true" />
    <van-cell :title="$t('user_info.integral')" :value="userinfo.integral"  />
    <!-- <van-cell title="密码" is-link to="Changepwd" /> -->
  </div>
  <van-action-sheet v-model="show" :title="$t('user_info.changeinfo')" style="height:80%">
    <van-cell-group>
      <van-field v-model="value" :placeholder="$t('user_info.value1')" />
      <van-field v-model="phonenumber" :placeholder="$t('user_info.value2')" />
      <div class="sex_wrap">
        <van-radio-group v-model="radio" class="sex">
          <van-radio name="1" class="sixn" checked-color="#EC581E">{{$t('register.man')}}</van-radio>
          <van-radio name="2" class="sixn" checked-color="#EC581E">{{$t('register.men')}}</van-radio>
        </van-radio-group>
      </div>
      
    </van-cell-group>
    
    <van-button type="warning" size="large" class="save" @click="savephone">{{$t('user_info.saveChange')}}</van-button>
  </van-action-sheet>

</div>
</template>

<script src='./index.ts'>
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
