<template>
  <div>
    <van-nav-bar class="nav1" :title="$t('assess.rate')" left-arrow @click-left="onClickLeft" />
    <div class="assess">
      <van-panel
        :title="item.storeName + '>'"
        v-for="(item,index) in assessList"
        :key="index"
        @click="orderdetail(item.id)"
      >
        <div>
          <van-card
            :desc="$t('assess.orderNo')+item.orderNo"
            i
            :title="item.goodsInfoName"
            :thumb="item.goodsImg"
          >
            <div slot="footer">
              <!-- <p>
                共{{item.tradeItems[0].num}}件商品&nbsp;&nbsp;&nbsp; 总金额：
                <span>￥{{item.tradePrice.totalPrice}}</span>
              </p>-->
              <!-- <van-button
                size="small "
                class="button"
               @click="service(item.skuId,item.spuId,item.storeId,item.skuNo)"
              >申请售后</van-button> -->
              <van-button
                size="small "
                class="button"
                @click="gocomont(item.storeId,item.orderNo,item.storeName,item.goodsId,item.goodsInfoId,item.goodsInfoName,item.goodsImg)"
              >{{$t('assess.rate')}}</van-button>
            </div>
          </van-card>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>

import api from "../../request/api";
import ConstKey from "../../until/const_key"
import Vue from "vue";
import {NavBar, Cell, CellGroup} from 'vant'
Vue.use(Cell).use(CellGroup).use(NavBar)

export default {
  name: "Assess",
  data() {
    return {
      assessList: [],
      pageNum:1
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    cancel() {
      this.show = true;
    },
    orderdetail(id) {
      // this.$router.push({
      //   path:'/orderdetail',
      //   query:{
      //     id:id
      //   }
      // })
    },
    service(skuId, spuId, storeId, skuNo) {
      this.$router.push({
        path: "/returngoods",
        query: {
          id: this.id,
          skuId: skuId,
          spuId: spuId,
          storeId: storeId,
          skuNo: skuNo
        }
      });
    },
    gocomont(storeId,orderNo,storeName,goodsId,goodsInfoId,goodsInfoName,goodsImg) {
      this.$router.push({
        path: "/commont",
        query: {
          storeId:storeId,
          orderNo:orderNo,
          storeName:storeName,
          goodsId:goodsId,
          goodsInfoId:goodsInfoId,
          goodsInfoName:goodsInfoName,
          goodsImg:goodsImg
        }
      });
    },
    getdata() {
      let that = this;
      this.$post(
       
        `api/order/queryOrderInfoPage/${10}/${that.pageNum}`,
        {
          accountId:localStorage.getItem('accountid'),
          orderState: 7,
          payState: 7
        }
      ).then(res => {
        console.log("------------res:", res);
        if (res.code == ConstKey.SUCCESS) {
          that.isLoading = true;
          let _list = res.context.data;
          that.orderlist = that.orderlist.concat(_list);
          // 数据全部加载完成
          if (res.context.lastPage) {
            that.finished = true;
          }
          // 加载状态结束
          that.loading = false;
        } else {
          // 加载状态结束
          that.loading = false;
          Toast(res.message);
        }
      });
    },
  },

  mounted() {
    this.getdata()
    
  }
};
</script>

<style lang="scss" scoped>
.nav1 {
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
.assess {
  margin-top: 48px;
}

.order_button {
  width: 50%;
  margin: 0;
  float: left;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 49px;
}
.order_button1 {
  height: 49px;
  background: rgba(187, 187, 187, 1);
}
.order_button2 {
  height: 49px;
  background: rgba(236, 88, 32, 1);
}
.button {
  width: 88px;
  height: 28px;
  border-radius: 3px;
  border: 1px solid rgba(236, 88, 32, 1);
  color: rgba(236, 88, 32, 1);
}
.button1 {
  width: 88px;
  height: 28px;
  border-radius: 3px;
}
</style>
