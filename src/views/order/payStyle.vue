<template>
  <div class="app-payStyle">
    <van-nav-bar
      :title="$t('order.selpaytype')"
      left-arrow
      :left-text="$t('returnGoods.cancel')"
      @click-left="goBack"
    />
    <div class="payStyle-container">
      <van-radio-group v-model="radioVal" @change="change">
        <van-cell-group>
          <!-- <van-cell :title="$t('order.p2')" :label="$t('order.p3')" clickable @click="radioVal = '1'">
            <van-radio slot="right-icon" checked-color="#ED5821" name="1"  disabled="disabled"/>
          </van-cell>-->
          <!-- <van-cell
            :title="$t('order.p4')"
            :label="$t('order.p5')"
            clickable
            @click="radioVal = '2'" 
          >
            <van-radio slot="right-icon" checked-color="#ED5821" name="2" disabled="disabled"/>
          </van-cell>-->
          <!-- <van-cell> -->
          <van-cell :title="$t('order.moneyPay')" clickable @click="radioVal = '1'">
            <div slot="label">{{$t('order.moneyPay')}}：{{cardBalance}}</div>
            <van-radio slot="right-icon" checked-color="#ED5821" name="1" />
          </van-cell>
          <van-collapse v-model="activeNames">
            <van-collapse-item
              class="collapseItem"
              :title="$t('order.card')"
              :value="$t('supply.p3')"
              name="0"
            >
              <van-cell
                :title="item.card"
                clickable
                @click="changeVal(item)"
                v-for="(item,index) in cardList"
                :key="index"
              >
                <div class="img-container" slot="icon">
                  <!-- <img :src="item.imgUrl" alt /> -->
                  <img src="../../../static/images/detail/yinhang.png" alt />
                </div>
                <van-radio slot="right-icon" checked-color="#ED5821" :name="index+3" />
              </van-cell>
              <van-cell class="addCard" :title="$t('creditCard.addCard')" is-link to="/Addcard" />
            </van-collapse-item>
          </van-collapse>
          <!-- </van-cell> -->
        </van-cell-group>
      </van-radio-group>
    </div>
    <div ><van-button class="pay"  size="large"  @click="goPay">{{$t('supply.pay')}}</van-button></div>

  </div>
</template>

<script>
import api from "../../request/api";
import Vue from "vue";


import {
  NavBar,
  Icon,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Toast,
  Overlay ,
  Loading ,
  Button
} from "vant";
Vue.use(NavBar).use(Icon).use(RadioGroup).use(Radio).use(Cell).use(CellGroup).use(Collapse).use(CollapseItem).use(Toast).use(Overlay).use(Loading).use(Button)
export default {
  name: "payDetail",
  mounted() {
    let that = this;
    // that.orderTids =
    //   that.$route.params.orderTids ||
    //   JSON.parse(window.localStorage.getItem("orderTids"));
    // that.orderTids = that.$route.params.orderTids;
    console.log("----------orderTids", that.orderTids);
    
    console.log(this.$route);
    that.orderId =that.$route.params.orderTids.orderId != undefined?that.$route.params.orderTids.orderId:that.$route.params.orderTids.order.id

    that.orderNumber = that.$route.params.orderTids.orderInfoNumbers != undefined?that.$route.params.orderTids.orderInfoNumbers[0].orderInfoNumber:that.$route.params.orderTids.orderNumber

    that.orderTids = that.$route.params.orderTids.orderInfoNumbers != undefined?that.$route.params.orderTids.orderInfoNumbers:that.$route.params.orderTids.orderItem
    that.cardBalance = localStorage.getItem('cardBalance')
    that.price = that.$route.params.price
    that.getMoney();
    that.getCards();
    that.getPayOrderId()
  },
  components: {},
  data() {
    return {
      radioVal: "0",
      activeNames: ["0"],
      orderTids: [],
      cardList: [],
      payOrderId: null,
      payInfo: {},
      cardBalance: localStorage.getItem('cardBalance'), //可用余额
      isMoneyPay: false, //是否余额支付
      isClick: true,
      cardId:'',
      orderId: "",
      orderNumber: "",
      payOrderId:'',
      orderTids:[],
      price:'',
      duration:0
      
    };
  },
  methods: {
    //返回
    goBack() {
      let that = this;
      // that.$router.back(-1);
      that.$router.push({
        name: "OrderListShow",
        params: {
          comeType: 1
        }
      });
    },
    change(val) {
      console.log("------------", val);
      let that = this;
      if (val >= 3) {
        that.isMoneyPay = false;
        let index = val - 3;
        // let cardInfo = that.cardList[index];
        // that.payInfo.cardId = cardInfo.id;
        // that.payInfo.orderId = that.orderTids[0].tid;
        // that.payInfo.price = that.orderTids[0].price;
      } else if (val == 1) {
        console.log("-------------余额支付");
        that.isMoneyPay = true;
      }
    },
    changeVal(info) {
      let that = this;
      console.log('tag', info)
      that.cardId = info.id
      // that.radioVal = index + 3;
    },
    // 余额支付
    goPay() {
      console.log("-------支付");
      let that = this;
      if (that.isMoneyPay) {
         that.yPay()
        
      }else{
        that.surePay()
      }
    },
    //信用卡列表
    getCards() {
      let that = this;
      that.$post(
          
          api.getCard,
          {
            customerId:localStorage.getItem('accountid')
          }
        )
        .then(res => {
          console.log("-------------信用卡列表--res", res);
          if (res.code == "200") {
            that.cardList = res.context;
          } else {
            Toast(res.message);
          }
        });
    },
    //获取payOrderId
    getPayOrderId(orderId) {
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
    },
    //确认支付--信用卡
    surePay() {
      let that = this;
      let  orderInfoNumbers = []
      
      let data = []
      that.orderTids.map(item=>{
        
        data.push({
              cardId: that.cardId,
              channel: '1',
              orderId: that.orderId,
              orderNumber: item.orderInfoNumber,
        })
      })
      Toast.loading({
        message: 'お支払い中...',
        forbidClick: true,
        loadingType: 'spinner',
        overlay:true,
        duration:that.duration
      });
      that.$post(
          
          api.payCard,
          data
          
        )
        .then(res => {
          console.log("-------------确认支付--res", res);
          that.isClick=true;
          if (res.code == "200") {
            
            that.payOrderId = res.context
            that.moneyPay()
          } else {
            Toast(res.message);
            
          }
        });
    },
    // 确认支付
    moneyPay() {
      let that = this;
      let  orderInfoNumbers = []
      let data = []

      that.orderTids.map((item,index)=>{
        data.push({
              orderId: that.orderId,
              channel: 1,
              payOrderId:  that.payOrderId[index].orderId,
              orderNumber:item.orderInfoNumber
        })
      })
      that.$post(
          api.affirmPayCard,
          data
        )
        .then(res => {
          that.isClick=true;
          console.log("-------------余额确认支付--res", res);
          if (res.code == "200") {
            Toast(this.$t("supply.paysuc"));
            that.duration = 500
            setTimeout(() => {
              that.$router.push("/OrderListShow");
            }, 1000);
          } else {
            Toast(res.message);
            setTimeout(() => {
              that.$router.push("/OrderListShow");
            }, 1000);
          }
        });
    },
    yPay() {
      let that = this;
      let  orderInfoNumbers = []
      
      that.orderTids.map(item=>{
        let obj = {}
        obj.orderInfoNumber = item.orderInfoNumber != undefined?item.orderInfoNumber:item.orderNumber
         orderInfoNumbers.push(obj)
      })
      Toast.loading({
        message: 'お支払い中...',
        forbidClick: true,
        loadingType: 'spinner',
        overlay:true,
        duration:that.duration
      });
      that.$post(
          
          api.giftCardPay,
         {
          cardBalance: that.cardBalance,
          channelItemId: 3,
          money: that.price,
          orderInfoNumbers: orderInfoNumbers,
          payOrderId:that.orderId,
          }
          
        )
        .then(res => {
          that.isClick=true;
          console.log("-------------余额确认支付--res", res);
          if (res.code == "200") {
            Toast(this.$t("supply.paysuc"));
            that.duration = 500
            setTimeout(() => {
              that.$router.push("/OrderListShow");
            }, 1000);
          } else {
            Toast(res.message);
            
          }
        });
    },
    //余额
    getMoney() {
      let that = this;
      that.$post(
          
          api.getAllUserInfo,
          
        )
        .then(res => {
          console.log("------------余额---res", res);
          if (res.code == "200") {
            that.cardBalance = res.context.cardBalance;
            localStorage.setItem('cardBalance',res.context.cardBalance)
          } else {
            Toast(res.message);
          }
        });
    }
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.app-payStyle {
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
    .van-nav-bar__text {
      color: #7d7d7d;
    }
  }
  .payStyle-container {
    margin-top: 10px;
    .van-collapse-item {
      .van-hairline--top-bottom::after {
        border-width: 0;
      }
      .van-collapse-item__content {
        .van-cell--clickable {
          padding-left: 0;
          padding-right: 0;
          align-items: center;
        }
      }
    }
    .collapseItem {
      .van-cell__value {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .img-container {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .addCard {
    padding-left: 20px !important;
  }
  .pay {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    text-align: center;
    background: rgba(236, 88, 32, 1);
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>

