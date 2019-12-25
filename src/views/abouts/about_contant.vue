<template>
  <div>
    <van-nav-bar
      :title="$t('store.aboutContant')"
      class="nav"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <p class="MsoNormal">
        店舗名：{{infos.storeName}}
        <span lang="EN-US">
          <!-- <o:p></o:p> -->
        </span>
      </p>
      <p class="MsoNormal">
        販売者名：
        <span lang="EN-US">
          {{infos.contactPerson}}
        </span>
      </p>
      <p class="MsoNormal">
        連絡人:
        <span lang="EN-US">
          {{infos.contactPerson}}
        </span>
      </p>
      <p class="MsoNormal">
        連絡先：
         <span lang="EN-US">
          {{infos.contactMobile}}
        </span>
      </p>
      <p class="MsoNormal">
        メールアドレス：
         <span lang="EN-US">
          {{infos.contactEmail}}
        </span>
      <p class="MsoNormal">
        住所：
        <span lang="EN-US">
          {{infos.addressDetail}}
          <!-- <o:p></o:p> -->
        </span>
      </p>
      <p class="MsoNormal">
        統一社会信用コード：
        <span lang="EN-US">
          {{infos.socialCreditCode}}
          <!-- <o:p></o:p> -->
        </span>
      </p>
      <p class="MsoNormal">
        企業名：
        <span lang="EN-US">{{infos.companyName}}</span>
        <!-- <o:p></o:p> -->
      </p>
      <p class="MsoNormal">
        営業期限**から：
        <span lang="EN-US">{{infos.businessTermStart}}</span>
        <!-- <o:p></o:p> -->
      </p>
      <p class="MsoNormal">
        営業期限**まで：
        <span lang="EN-US">{{infos.businessTermEnd}}</span>
        <!-- <o:p></o:p> -->
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
  name: "about_contant",
  data() {
    return {
      storeId: '',
      infos:{}
    };
  },
  mounted() {
    let that = this;
    that.storeId = that.$route.params.storeId;
    console.log("--------that.storeId",that.storeId)
    that.getData();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getData() {
      let that = this;
      console.log("--------that.storeId",that.storeId)
      that
        .$axios({
          method: "post",
          url: "store/storeDocument",
          data: {
            storeId: that.storeId
          }
        })
        .then(res => {
          console.log("-------------联系人--res", res);
          if (res.data.code == "K-000000") {
            that.infos=res.data.context;
          } else {
            Toast(res.data.message);
          }
          
        });
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
