<template>
  <div>
    <van-nav-bar title="支払方法" class="nav" left-arrow @click-left="onClickLeft" />
    <div class="main">
     
 
	<p style="background:white;">
		●代金引換
	</p>
	<p style="background:white;">
		●クレジットカードでのお支払い
	</p>
	<p style="background:white;">
		&nbsp;Visa
	</p>
	<p style="background:white;">
		&nbsp;Mastercard
	</p>
	<p style="background:white;">
		&nbsp;American Express
	</p>
	<p style="background:white;">
		&nbsp;Diners Club
	</p>
	<p style="background:white;">
		&nbsp;JCB
	</p>
	<p style="background:white;">
		お支払いに関するご不明点がございましたら、各店舗のカスタマサービスにメールでお問い合わせください。
	</p>
	<p style="background:white;">
		受付時間<span>&nbsp;</span>：<span>10:00</span>～<span>16:00</span>（土日祝を除く）<span>&nbsp;<br />
</span>※お問い合わせは上記の営業時間でお願い致します。<span></span>
	</p>
	<p class="MsoNormal">
		<br />
	</p>
 
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {NavBar} from 'vant'
Vue.use(NavBar)
export default {
  name: "about_pay",
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
