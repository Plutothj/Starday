<template>
  <div class="app-useIntro">
    <van-nav-bar title="クーポン使用ガイド" left-arrow @click-left="goBack" />
    <div class="introDetail">
      <p>1、クーポンには期限があり、有効期限が切れると使用できなくなります；</p>
      <p>2、店舗ごとにショップクーポンは一枚だけ使用できます；</p>
      <p>3、注文ごとに通用クーポンは一枚だけ使用できます；</p>
      <p>4、注文ごとに送料クーポンは一枚だけ使用できます；</p>
      <p>
        5、商品は、キャンペーンの割引額を除いてから、ショップクーポンが使用されるかどうかを判断する必要があります；
      </p>
      <p>
        6、商品は、キャンペーンとショップクーポンの割引額を除いてから、通用クーポンが使用されるかどうかを判断する必要があります；
      </p>
      <p>
        7、注文は、キャンペーンとショップクーポンと通用クーポンの割引額を除いてから、送料クーポンが使用されるかどうかを判断する必要があります；
      </p>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Field, SubmitBar, Cell, CellGroup, Toast } from "vant";
Vue.use(NavBar).use(Field).use(SubmitBar).use(Cell).use(CellGroup).use(Toast)

export default {
  name: "useIntro",
  mounted() {},
  components: {},
  data() {
    return {};
  },
  methods: {
    //返回
    goBack: function() {
      let that = this;
      that.$router.back(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.app-useIntro {
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: left;
  padding-bottom: 50px;
  .introDetail {
    width: 100%;;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .van-nav-bar__left {
    .van-icon {
      color: #7d7d7d;
    }
  }
}
</style>
