<template>
  <div>
    <van-nav-bar :title="$t('store.aboutDeliver')" class="nav" left-arrow @click-left="onClickLeft" />
    <div class="main">

	<p class="MsoNormal">
		商品発送について<o:p></o:p>
	</p>
	<p class="MsoNormal">
		特にご指定がない場合、ご入金確認後、<span lang="EN-US">1</span>～<span lang="EN-US">3</span>営業日以内に発送いたします。<span lang="EN-US"><o:p></o:p></span>
	</p>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {NavBar} from 'vant'
Vue.use(NavBar)
export default {
  name: "about_deliver",
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
