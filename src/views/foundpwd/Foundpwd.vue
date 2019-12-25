<template>
<div>
    <van-icon class="icon" name="arrow-left" @click="onClickLeft" style="font-size:24px" />
    <h1>{{$t('foundpwd.fpwd')}}</h1>
    <p v-if="toggle">{{$t('foundpwd.code')}}{{emile}}{{$t('foundpwd.info')}}</p>
    <p v-else>{{msg}}</p>
    <div class="found">
        <van-cell-group>
            <van-field v-if="!toggle" v-model="username" class="found_emile" clearable clickable @input="change" />
            <van-field v-else v-model="valcode" class="found_emile" clearable placeholder="请输入验证码" clickable />


            <van-field v-if="toggle" v-model="password" class="found_emile" clearable :placeholder="$t('resetpwd.inputNew')" clickable />


            <van-field v-if="toggle" v-model="password1" class="found_emile" @input="change" clearable :placeholder="$t('resetpwd.savePwd')" clickable />
        </van-cell-group>

        <van-button v-if="show" :loading="load" type="warning" :disabled="hiddle" size="large" @click="send">{{$t('login.sendsms')}}</van-button>
        <van-button v-else :loading="load" type="warning" :disabled="hiddle" size="large" @click="sendcode">{{emcode}}</van-button>
    </div>
</div>
</template>

<script src='./index.ts'>

</script>

<style lang='scss' scoped>
@import './index.scss';
</style>