<template>
  <div class="app-payDetail">
    <van-nav-bar :title="$t('supply.pay')" left-arrow @click-left="goBack" />
    <ul class="order-list">
      <li class="order-item" v-for="(item,index) in orderList" :key="index">
        <div class="order-head">{{$t('order.orderinfo')}}</div>
        <div class="order-info">
          <div class="info-text">
            <div class="info-item">
              <span class="info-head">{{$t('order.orderdate')}}</span>
              <span>{{item.tradeEventLogs[0].eventTime}}</span>
            </div>
            <div class="info-item">
              <span class="info-head">{{$t('order.orderNo')}}</span>
              <span>{{item.tradeItems[0].oid}}</span>
            </div>
            <div class="info-item">
              <span class="info-head">{{$t('order.orderprice')}}</span>
              <span>¥{{item.tradePrice.totalPrice}}</span>
            </div>
            <div class="info-item">
              <span class="info-head">{{$t('order.storename')}}</span>
              <span>{{item.supplier.storeName}}</span>
            </div>
          </div>
          <div class="info-img">
            <div class="img-container">
              <img v-lazy="item.tradeItems[0].pic" alt />
            </div>
            <div class="goods-name">商品は全部で{{item.totalNum}}点</div>
          </div>
        </div>
        <div class="goPay" @click="goPay(item)">
          <span>{{$t('order.gopay')}}</span>
          <van-icon name="arrow" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../../request/api";
import Vue from "vue";
import { NavBar, Icon } from "vant";
Vue.use(NavBar).use(Icon)
export default {
  name: "payDetail",
  mounted() {
    let that = this;
    // that.orderTids =
    //   that.$route.params.orderTids ||
    //   JSON.parse(window.localStorage.getItem("orderTids"));
    that.orderTids = that.$route.params.orderTids;
    //获取订单详情
    
      setTimeout(() => {
        that.getData(that.orderTids);
      }, 500);
    

    // console.log("------------that.orderTids", that.orderTids);
    // //处理各个店铺订单商品数量
    // // that.list =
    // //   that.$route.params.list ||
    // //   JSON.parse(window.localStorage.getItem("list"));
    // that.list = that.$route.params.list;
    // that.orderList.forEach(e => {
    //   that.list.forEach(k => {
    //     if (e.supplier.storeId == k.supplier.storeId) {
    //       e.totalNum = k.totalNum;
    //     }
    //   });
    // });
  },
  components: {

  },
  data() {
    return {
      list: [], //订单确认页传过来的 订单列表
      orderTids: [],
      orderList: []
    };
  },
  methods: {
    //返回
    goBack: function() {
      let that = this;
      that.$router.back(-1);
    },
    goPay: function(item) {
      let that = this;
      let orderTids = [];
      let tids = {};
      tids.tid = item.tradeItems[0].oid;
      tids.price = item.tradeItems[0].price;
      orderTids.push(tids);
      that.$router.push({
        name: "payStyle",
        params: {
          orderTids: orderTids
        }
      });
    },
    //订单详情
    getData(tid) {
      let that = this;
      that.$fetch(
          
          api.orderDetail,
          {
            orderId:'314',
            orderInfoNumber:"3191204172146458"
          }
        )
        .then(res => {
          console.log("-------------订单详情--res", res);
          // if (res.code == "200") {
          //   that.orderList.push(res.context);
          // } else {
          //   Toast(res.data.message);
          // }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.app-payDetail {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  text-align: left;
  .clear::after {
    content: "";
    display: block;
    clear: both;
  }
  .van-nav-bar__left {
    .van-icon {
      color: #7d7d7d;
    }
  }
  .order-list {
    margin-top: 10px;

    .order-item {
      background: #fff;
      padding: 16px 15px 0;
      margin-bottom: 10px;
      .order-head {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 10px;
      }
      .order-info {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        display: flex;
        justify-content: space-between;
        .info-item {
          margin: 10px 0;
          text-align: left;
          .info-head {
            display: inline-block;
            width: 52px;
            margin-right: 10px;
          }
        }
        .info-img {
          padding-top: 10px;
          .img-container {
            width: 69px;
            height: 69px;
            border-radius: 5px;
            overflow: hidden;
            margin: 0 auto;
            margin-bottom: 12px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .goods-name {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
        }
      }
      .goPay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #ec5820;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        border-top: 1px solid #f4f4f4;
        .van-icon {
          position: relative;
          top: 2.5px;
        }
      }
    }
  }
}
</style>

