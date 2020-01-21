<template>
<div class="activity-3-wrap">
  <van-icon name="arrow-left" size='28' class="tag" @click="goBack" />
  <van-image width="100%" height="260" :src="imgurl" />
  <div class="van-tab">
    <van-dropdown-menu active-color='#EC5820'>
      <van-dropdown-item v-model="value1" :options="option1" @change="toggle(value1)" />

    </van-dropdown-menu>
    <van-tabs :ellipsis='ellipsis' swipeable sticky border title-active-color='#EC5820' v-model="active">
      <van-tab :title="item.subtitle" v-for="(item,index) in info" :key="index">
        <div class="shop_wrap">

          <div class="avtivity_shop" v-for="(t,i) in item.goodslist" :key="i" @click="goDetail(t.key1)">

            <img :src="t.img" alt="">
            <p class="shop_title">{{t.title}}</p>
            <p class="shop_price">￥{{t.price}}<img src="/static/img/(税込)(1).png"></p>
            <p class="line_price">￥{{t.marketprice}}</p>
          </div>



        </div>

      </van-tab>
      <!-- <van-tab title=" バッグ・スーツケース">
        <div class="shop_wrap">

          <div class="avtivity_shop" v-for="(item,index) in list.out" :key="index" @click="goDetail(item.goodsId)">
            <img :src="item.goodsImg" alt="">
            <p class="shop_title">{{item.goodsName}}</p>
            <p class="shop_price">￥{{item.goodsPrice}}<img src="/static/img/(税込)(1).png"></p>
            <p class="line_price">￥{{item.linePrice}}</p>
          </div>



        </div>

      </van-tab>

      <van-tab title="アクセサリー ·服　">
        <div class="shop_wrap">

          <div class="avtivity_shop" v-for="(item,index) in list.coat" :key="index" @click="goDetail(item.goodsId)">
            <img :src="item.goodsImg" alt="">
            <p class="shop_title">{{item.goodsName}}</p>
            <p class="shop_price">￥{{item.goodsPrice}}<img src="/static/img/(税込)(1).png"></p>
            <p class="line_price">￥{{item.linePrice}}</p>
          </div>



        </div>

      </van-tab>

      <van-tab title="ペット用品">
        <div class="shop_wrap">

          <div class="avtivity_shop" v-for="(item,index) in list.cat" :key="index" @click="goDetail(item.goodsId)">
            <img :src="item.goodsImg" alt="">
            <p class="shop_title">{{item.goodsName}}</p>
            <p class="shop_price">￥{{item.goodsPrice}}<img src="/static/img/(税込)(1).png"></p>
            <p class="line_price">￥{{item.linePrice}}</p>
          </div>



        </div>

      </van-tab>

      <van-tab title="3Ｃデジタル·文房具">
        <div class="shop_wrap">

          <div class="avtivity_shop" v-for="(item,index) in list.Stationery" :key="index" @click="goDetail(item.goodsId)">
            <van-image width="100%" height="110" radius=10px :src="item.goodsImg" />
            <p class="shop_title">{{item.goodsName}}</p>
            <p class="shop_price">￥{{item.goodsPrice}}<img src="/static/img/(税込)(1).png"></p>
            <p class="line_price">￥{{item.linePrice}}</p>
          </div>



        </div>

      </van-tab> -->
    </van-tabs>
  </div>

</div>
</template>

<script>
import model from '../../../static/activityData/09'
export default {
  name: 'Activity3',
  data() {
    return {
      active: 0,
      list: model,
      ellipsis: false,
      value1: 0,
      option1: [
      ],
      info:[],
      imgurl:''

    }
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color: #E8A645')


  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  mounted() {
    document.getElementsByClassName('van-tabs__wrap')[0].setAttribute('style', 'border-radius:6px')
    console.log(this.$route)
    this.info = JSON.stringify(this.$route.params.info) 
    this.imgurl = this.$route.params.imgUrl
    localStorage.setItem('list',this.info)
    localStorage.setItem('imgurl',this.imgurl)
    this.getdata()
  },
  methods: {
    getdata(){
      this.info =JSON.parse(localStorage.getItem('list')) 
      
      this.imgurl = localStorage.getItem('imgurl')
      
      this.info.map((item,index) =>{
      this.option1.push({
          text: item.subtitle,
          value: index
        },)
      })
    
    },
    toggle(value) {

      this.active = value
    },
    //跳转详情
    goDetail(url) {
      let that = this;
      let goodsInfoId = url.split('/')[1];
      window.localStorage.setItem("goodsInfoId", goodsInfoId);
      that.$router.push({
        name: "goods_detail",
        params: {
          goodsInfoId: goodsInfoId
        }
      });
    },
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
.van-tab {
  width: 98%;
  margin: -20px auto;
  height: 80px;
}

.van-dropdown-item__content {
  position: absolute;
  width: 96%;
}

.van-tab__pane {
  background: #E8A645
}

.van-dropdown-menu {
  position: absolute;
  top: 0px;
  right: 6px;
  z-index: 99;
  text-align: center;
  line-height: 16px;
  width: 5px;
  border-radius: 6px;
  height: 40px;
  padding-right: 14px;
}

.activity-3-wrap {
  .van-tabs__content {
    background-color: #E8A645;
  }
  .van-sticky {
    .van-tabs__wrap {
      border-radius: 16px
    }
  }
  .avtivity_shop {
    margin-top: 15px;
    width: 116px;
    height: 195px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 1);
    img {
      width: 100%;
      height: 116px;
      border-radius: 6px
    }
    .shop_title {
      width: 110px;
      height: 40px;
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
      margin-top: -15px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .shop_price {
      color: #EC5820;
      img {
        width: 32px;
        height: 12px;
        margin-left: 5px;
      }
      text-align: left;
      margin-top: -30px;
      font-weight:600;
      margin-left: 5px;
    }
    .line_price {
      font-size: 10px;
      text-decoration: line-through;
      margin-top: -40px;
      text-align-last: left;
      margin-left: 7px;
    }
  }
}

.shop_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.tag {
  position: absolute;
  margin-top: 30px;
  margin-left: 15px;
  z-index: 99;
}
</style>
