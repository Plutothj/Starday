<template>
  <div>
    <van-nav-bar :title="$t('store.aboutTimes')" class="nav" left-arrow @click-left="onClickLeft" />
    <div class="main">
     
 
	<p class="MsoNormal">
		受付時間：月～金：9：00～18：00（祝日を除く）<o:p></o:p>
	</p>
	<p class="MsoNormal">
		ネットでのご注文は24時間受け付けております<o:p></o:p>
	</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {NavBar} from 'vant'
Vue.use(NavBar)
export default {
  name: "about_times",
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  width: 400px;
  height: 44px;
  position: fixed;
  top: 0;
  .van-ellipsis {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
    margin-left: 60px;
  }
  .van-nav-bar__left i {
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.main {
  margin-top: 48px;
  padding: 15px;
  font-size: 16px;
}
</style>
