<template>
<div>
    <van-icon class="icon1" name="cross" style="font-size:24px" @click="toIndex()" />
    <div class="logo">
        <img src="@s/img/logo.png" />
    </div>
    <div class="login">
        <van-Cell-group>
            <van-field v-model="username" class="emile" clearable :placeholder="$t('login.emile')" clickable :error-message="errormsg" @input="reg" />

            <van-field v-model="password" class="emile" :type="ispwd" :placeholder="$t('login.passworld')" :right-icon="tog" clickable @click-right-icon="toggle" />
        </van-Cell-group>
        <div class="forget" @click="forgetpwd">{{$t('login.forgotpwd')}}</div>
        <van-button type="warning" size="large" @click="login" class="button">{{$t('login.loginnow')}}</van-button>
        <!-- <div class="newperson" >{{$t('login.newperson')}}</div> -->
        <van-button type="info" size="large" @click="goreg" class="info">{{$t('login.newperson')}}</van-button>
    </div>
</div>
</template>

<script src='./index.ts'>

</script>

<style lang='scss'  scoped>
@import './index.scss'

</style>