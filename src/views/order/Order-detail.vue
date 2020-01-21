<template>
  <div class="Order-detail-wrap">
    <van-nav-bar class="nav" :title="$t('supply.orderdetail')" left-arrow @click-left="onClickLeft" />
    <!-- <div class="order_img" v-show="show">
      <img src="/static/img/编组.png" alt />
    </div> -->
    <div class="order_delive" :style="top">
      <p>
        <img src="../../../static/img/peisong.png"  class="deliveimg"/>
        {{deliverinfostate}}
      </p>
      <!-- <p>{{$t('supply.p2')}}{{delivertime}}</p> -->
    </div>
    <div>
      <van-panel :title="$t('order.orderinfo')">
        <div>{{$t('order.orderdate')}}{{ordertime}}</div>
        <div>{{$t('order.orderNo')}}{{orderid}}</div>
        <div>{{$t('order.orderprice')}}￥{{totalprice}}</div>
      </van-panel>
    </div>
    <div class="shop">
      <!-- <p>
        {{storeName}}
        <van-icon name="arrow" />
      </p> -->
      <van-card
        :num="item.number"
        :price="item.amount"
        :desc="item.goodsSkuVal"
        :title="item.goodsInfoName"
        :thumb="item.goodsInfoImg"
        v-for="(item,index) in tradeItems"
        :key="index"
      >
        <div slot="footer">
          <van-button
            size="normal"
            v-if="payState=='PAID'&& (flowState == 'AUDIT' || flowState == 'INIT' || flowState == 'REMEDY')"
            @click="service(item.skuId,item.spuId,item.storeId,item.skuNo)"
          >{{$t('supply.p7')}}</van-button>
         
        </div>
      </van-card>

    </div>
   

    <van-panel :title="$t('supply.paytype')">
      <div>{{payType}}</div>
      
    </van-panel>
    <van-panel :title="$t('supply.deliverinfo')">
      <div>{{consignee.realName}}</div>
      <div>{{consignee.address+" "+consignee.deliveryAddress}}</div>
      <div>{{consignee.mobile}}</div>
      <div>{{$t('supply.delivernumber')}}{{deliverNum}}</div>
      <div>{{$t('supply.delivername')}}{{deliverName}}</div>
    </van-panel>
    <van-panel title="商品合计">
      <div>
        {{$t('order.goodsprice')}}
        <span>￥{{tradePrice.productAmount}}</span>
      </div>
      <div>
        {{$t('order.ServiceCharge')}}
        <span>￥{{tradePrice.freightAmount}}</span>
      </div>
      <div>
        {{$t('order.discount')}}
        <span>-￥{{tradePrice.discountAmount}}</span>
      </div>
      <div>
        {{$t('order.ingetral')}}
        <span>{{"-￥"+tradePrice.ingetral}}</span>
      </div>
      <div style="margin-bottom:30px">
        {{$t('order.paynumber')}}
        <span>￥{{tradePrice.payAmount}}</span>
      </div>
       <van-button size="normal"  @click="returnGoods" v-if="flowState=='8'||flowState=='7' || flowState == '5'" class="button" :style='buttonstyle'>{{$t('user_main.return')}}</van-button>
        <!-- <van-button
        size="small "
        @click="returnGoods"
        class="returnGoods"
        v-if="item.state == 7||item.state == 5"
        >{{$t('user_main.return')}}
        </van-button> -->
       <van-button size="normal" @click='goPay' v-if="payState=='NOT_PAID' && (flowState == 'AUDIT' || flowState == 'INIT' || flowState == 'REMEDY')" >{{$t('order.gopay')}}</van-button>
    </van-panel>
  </div>
</template>

<script>
import api from "../../request/api";
import Vue from "vue";
import { gettime } from '../../until/until'
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
  Panel
} from "vant";
Vue.use(NavBar).use(Icon).use(RadioGroup).use(Radio).use(Cell).use(CellGroup).use(Collapse).use(CollapseItem).use(Toast).use(Panel)
export default {
  name: "OrderDetail",
  inject:['reload'],
  data() {
    return {
      top: 48,
      deliverinfo: "",
      show: true,
      storeName: "",
      tradeItems: [],
      ordertime: "",
      orderid: "",
      totalprice: "",
      payState: "",
      payWay: "",
      flowState:'',
      consignee: {},
      tradePrice: {},
      id: "",
      delivertime: "",
      deliverNum: "",
      deliverName: "",
      payOrderId:"",
      price:'',
      buttonstyle:{},
      deliverinfostate:'',
      payType:'',
      integral:''
    };
  },
  methods: {
    goPay() {
      let that = this;
      let orderTids = [];
      let tids = {};
      tids.tid = that.id;
      tids.price = that.price;
      tids.payOrderId = that.payOrderId;
      orderTids.push(tids);
      that.$router.push({
        name: "payStyle",
        params: {
          orderTids: orderTids
        }
      });
    },
    deliverinfostatus(status){
      let that = this
      switch(status) {
        case 0:
          return that.deliverinfostate = that.$t('order.nodeliver')
          break;
        case 1:
          return that.deliverinfostate = that.$t('supply.delivered')
          break;
        case 2:
          return that.deliverinfostate = '在途中'
          break;
        case 3:
          return that.deliverinfostate = that.$t('order.confirmed')
          break;
        case 4:
          return that.deliverinfostate = that.$t('returnList.VOID')
          break;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
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
    cancel() {
      // this.show = true;
      let id = this.id
      event.stopPropagation()
      let that = this;
      this.$axios({
        method: "get",
        url: `trade/cancel/${id}`
      }).then(res => {
        console.log(-"----------cancel", res);
        if (res.data.code == "K-000000") {
          that.$toast(this.$t('order.success'));
          that.reload();
          that.active = 3;
        }
      });
    },
    returnGoods(){
      let that = this;
      event.stopPropagation();
      
      let orderId = localStorage.getItem('orderId');
      let orderNumber = localStorage.getItem('orderNumber')
      that.$fetch(
        
        api.returnable,
        {
          orderId:orderId,

          orderInfoNumber:orderNumber
        }

      ).then((res) => {
        console.log(res);
        if (res.code == '200') {
          // that.$toast(res.message);
          that.reload();
          that.$router.push({
            path: "/returnGoods",
            query: {
              orderId: orderId,
              orderInfoNumber:orderNumber
            }
          });
        }else{
          that.$toast(res.message);
        }
        
      });
    }
  },
  mounted() {
    if(localStorage.getItem('local') == 'zh'){
      this.buttonstyle = {
        'margin-left':'150px'
      }
    }
    console.log(this.$route.query.id);
    localStorage.setItem('orderId',this.$route.query.id.order.id)
    localStorage.setItem('orderNumber',this.$route.query.id.orderNumber)
    let orderId = localStorage.getItem('orderId');
    let orderNumber = localStorage.getItem('orderNumber')
    let that = this;

    
    that.$fetch(
          api.getorderDetail,
          {
            orderId:orderId,
            orderInfoNumber:orderNumber
          }
        ).then(res => {
      console.log(res);
      let orderDTO = res.context.orderDTO
      let orderInfoDTO = res.context.orderInfoDTO
      that.tradeItems = res.context.orderInfoDTO.orderItem
      that.deliverNum = orderInfoDTO.express
        ? orderInfoDTO.express.split('-')[0]
        : "";
      that.deliverName = orderInfoDTO.express
        ? orderInfoDTO.express.split('-')[1]
        : "";
      //   ? res.data.context.tradeDelivers[0].logistics.logisticCompanyName
      //   : "";
      // that.delivertime = res.data.context.tradeDelivers[0]
      //   ? res.data.context.tradeDelivers[0].deliverTime.slice(0, 19)
      //   : "";
      that.id = orderDTO.id;
      that.storeName = orderInfoDTO.storeName;
      that.tradeItems = orderInfoDTO.orderItem;
      that.ordertime = gettime(orderDTO.submitTime) ;
      that.orderid = orderDTO.orderNumber;
      that.totalprice = orderDTO.productAmount;
      // that.payState = res.data.context.tradeState.payState;
      that.flowState = orderInfoDTO.state
      that.consignee =JSON.parse(orderInfoDTO.order.address) ;
      that.tradePrice = orderDTO;
      that.tradePrice.discountAmount = orderInfoDTO.discountAmount
      that.tradePrice.freightAmount = orderInfoDTO.freightAmount
      that.tradePrice.ingetral = res.context.orderInfoDTO.integral
      that.deliverinfo =orderInfoDTO.express?orderInfoDTO.express:that.$t('order.nodeliver');
      console.log("+++++++",that.tradePrice)
      that.deliverinfostatus(orderInfoDTO.expressState)
      that.payType = orderInfoDTO.payChannel==3?that.$t('order.moneyPay'):that.$t('order.card')
      // that.price = res.data.context.tradeItems[0].price
      // that.payOrderId=res.data.context.payOrderId;
      // if (res.data.context.tradeState.deliverStatus == "NOT_YET_SHIPPED") {
      //   that.deliverinfo = that.$t('order.nodeliver');
      // } else if (res.data.context.tradeState.deliverStatus == "SHIPPED") {
      //   that.deliverinfo = that.$t('order.delivered');
      //   that.show = false;
      //   that.top = "margin-top:48px";
      // }
    });
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
.order_img {
  width: 100%;
  height: 70px;
  margin-top: 58px;
  img {
    width: 100%;
    height: 100%;
  }
}
.order_delive {
  margin-top:45px;
  padding-left: 15px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(56, 151, 224, 1);
  overflow: hidden;
  :last-child {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
  }
  i {
    font-size: 20px;
    margin-right: 10px;
  }
}
.van-cell__title {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.van-panel__content {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 16px;
  padding-left: 15px;
  :last-child {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    span {
      font-size: 16px;
    }
  }
  div {
    height: 30px;
    span {
      float: right;
      padding-right: 20px;
      font-size: 12px;
    }
  }
}
.shop {
  overflow: hidden;
  padding-left: 15px;
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.button{
  width: 192px;
  margin-right: 30px;
  margin-bottom: 50px;
}
.deliveimg{
  width: 25px;
  height: 20px;
}
</style>
