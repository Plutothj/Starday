<template>
  <div>
    <van-nav-bar class="nav1" :title="$t('order.title')" left-arrow @click-left="onClickLeft" />
    <div>
      <van-tabs
        v-model="active"
        title-active-color="#ED5821"
        color="#ED5821"
        title-inactive-color="#666666"
        ine-height="2px"
        swipeable
        class="tab"
        :ellipsis='false'
      >
        <van-tab :title="$t('order.all')">
          <van-list v-model="loading" :loading-text="$t('supply.loadding')" :finished="finished" :finished-text="$t('threeClass.finished')" @load="onLoad">
            <van-panel
              :title="$t('order.order')+item.id"
              v-for="(item,index) in list"
              :key="index"
              :status="returnStatus(item.tradeState)"
              >
              <div>
                <van-card
                  v-for="(i,k) in item.tradeItems"
                  :num="i.num"
                  :price="i.price"
                  :desc="i.specDetails"
                  :title="i.skuName"
                  :thumb="i.pic"
                  :key="k"
                  @click="orderdetail(item.id)"
                >
                  <div slot="footer">
                    <van-button
                      size="small "
                      class="button3"
                      @click="confirm(item.id)"
                      v-if="item.tradeState.flowState == 'DELIVERED' || item.tradeState.flowState == 'DELIVERED_PART'"
                    >{{$t('order.p1')}}</van-button>
                  </div>
                </van-card>
                <p class="length">
                  {{$t('returnList.all')}}{{totalnum(item.tradeItems)}} {{$t('returnList.goods')}}&nbsp;&nbsp;&nbsp; {{$t('order.allprice')}}
                  <span>￥{{item.tradePrice.totalPrice}}</span>
                </p>
                <van-button
                  size="small "
                  @click="cancel(item.id)"
                  :style="jpstyle"
                  class="button2"
                  v-if="item.tradeState.payState =='NOT_PAID' && (item.tradeState.flowState == 'INIT' || item.tradeState.flowState == 'REMEDY' || item.tradeState.flowState == 'AUDIT')"
                >{{$t('order.cancel')}}</van-button>
                <!-- <van-button size="small " class="button" v-if="item.tradeState.deliverStatus ==='NOT_YET_SHIPPED'">确认收货</van-button> -->
                <van-button
                
                  @click="goPay(item)"
                  size="small "
                  :style="jpstyle"
                  class="button"
                  v-if="item.tradeState.payState =='NOT_PAID' &&( item.tradeState.flowState == 'INIT' || item.tradeState.flowState == 'REMEDY' || item.tradeState.flowState == 'AUDIT')"
                >{{$t('order.gopay')}}</van-button>

                <van-divider :style="{ borderColor: '#EC5820', padding: '0 15px' }"></van-divider>
              </div>
            </van-panel>
          </van-list>
        </van-tab>

        <van-tab :title="$t('order.nopay')">
          <van-list v-model="loading" :loading-text="$t('supply.loadding')" :finished="finished" :finished-text="$t('threeClass.finished')" @load="onLoad">
            <van-panel
              :status="returnNopay(item.tradeState.flowState)"
              :title="$t('order.order')+':'+item.id"
              v-for="(item,index) in nopay"
              :key="index"
              @click="orderdetail(item.id)"
            >
              <div>
                <van-card
                  v-for="(i,k) in item.tradeItems"
                  :num="i.num"
                  :price="i.price"
                  :desc="i.specDetails"
                  :title="i.skuName"
                  :thumb="i.pic"
                  :key="k"
                  @click="orderdetail(item.id)"
                ></van-card>
                <p class="length">
                  {{$t('returnList.all')}}{{totalnum(item.tradeItems)}}{{$t('returnList.goods')}}&nbsp;&nbsp;&nbsp; {{$t('order.allprice')}}
                  <span>￥{{item.tradePrice.totalPrice}}</span>
                </p>
                <van-button
                  :style="jpstyle"
                  size="small "
                  @click="cancel(item.id)"
                  class="button1 _button"
                  v-show="item.tradeState.flowState !== 'VOID'"
                >{{$t('order.cancelorder')}}</van-button>
                <van-button
                @click="goPay(item)"
                :style="jpstyle"
                  size="small "
                  class="button _button1"
                  v-show="item.tradeState.flowState !== 'VOID'"
                >{{$t('order.gopay')}}</van-button>
                <van-divider :style="{ borderColor: '#EC5820', padding: '0 15px' }"></van-divider>
              </div>
            </van-panel>
          </van-list>
        </van-tab>

        <van-tab :title="$t('order.nodeliver')">
          <van-panel
            :status="returnNodeliver(item.tradeState.flowState)"
            :title="$t('order.order')+':'+item.id"
            v-for="(item,index) in nodeliver"
            :key="index"
            @click="orderdetail(item.id)"
          >
            <div>
              <van-card
                v-for="(i,k) in item.tradeItems"
                :num="i.num"
                :price="i.price"
                :desc="i.specDetails"
                :title="i.skuName"
                :thumb="i.pic"
                :key="k"
                @click="orderdetail(item.id)"
              ></van-card>
              <p class="length">
                {{$t('returnList.all')}}{{totalnum(item.tradeItems)}}{{$t('returnList.goods')}}&nbsp;&nbsp;&nbsp; {{$t('order.allprice')}}
                <span>￥{{item.tradePrice.totalPrice}}</span>
              </p>
              <van-divider :style="{ borderColor: '#EC5820', padding: '0 15px' }"></van-divider>
            </div>
          </van-panel>
        </van-tab>

        <van-tab :title="$t('order.bedeliver')">
          <van-panel
            :status="returnBedeliver(item.tradeState.flowState)"
            :title="$t('order.order')+':'+item.id"
            v-for="(item,index) in bedeliver"
            :key="index"
          >
            <div>
              <van-card
                v-for="(i,k) in item.tradeItems"
                :num="i.num"
                :price="i.price"
                :desc="i.specDetails"
                :title="i.skuName"
                :thumb="i.pic"
                :key="k"
                @click="orderdetail(item.id)"
              >
                <div slot="footer">
                  <!-- <van-button
                    size="small "
                    @click="service(item.id,item.tradeItems[0].skuId,item.tradeItems[0].spuId,item.tradeItems[0].storeId,item.tradeItems[0].skuNo)"
                    class="button1"
                  >申请售后</van-button>-->
                  <van-button size="small " class="button" @click="confirm(item.id)">{{$t('order.p1')}}</van-button>
                </div>
              </van-card>
              <p class="length">
                {{$t('returnList.all')}}{{totalnum(item.tradeItems)}}{{$t('returnList.goods')}}&nbsp;&nbsp;&nbsp; {{$t('order.allprice')}}
                <span>￥{{item.tradePrice.totalPrice}}</span>
              </p>
              <van-divider :style="{ borderColor: '#EC5820', padding: '0 15px' }"></van-divider>
            </div>
          </van-panel>
        </van-tab>

        <van-tab :title="$t('order.complete')">
          <van-panel
            :status="returnStatus(item.tradeState.flowState )"
            :title="$t('order.order')+':'+item.id"
            v-for="(item,index) in completed"
            :key="index"
            @click="orderdetail(item.id)"
          >
            <div>
              <van-card
                v-for="(i,k) in item.tradeItems"
                :num="i.num"
                :price="i.price"
                :desc="i.specDetails"
                :title="i.skuName"
                :thumb="i.pic"
                :key="k"
                @click="orderdetail(item.id)"
              ></van-card>
              <p class="length">
                {{$t('returnList.all')}}{{totalnum(item.tradeItems)}}{{$t('returnList.goods')}}&nbsp;&nbsp;&nbsp; {{$t('order.allprice')}}
                <span>￥{{item.tradePrice.totalPrice}}</span>
              </p>
              <van-divider :style="{ borderColor: '#EC5820', padding: '0 15px' }"></van-divider>
            </div>
          </van-panel>
        </van-tab>
      </van-tabs>
    </div>

    <van-action-sheet v-model="show" title="取消订单">
      <p>请选择取消订单的原因</p>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="下错定单了" clickable @click="radio = '1'  ">
            <van-radio slot="right-icon" checked-color="#EC581E" name="1" />
          </van-cell>

          <van-cell title="送达日与预期不符" clickable @click="radio = '2'">
            <van-radio slot="right-icon" name="2" checked-color="#EC581E" />
          </van-cell>
          <van-cell title="配送费太贵" clickable @click="radio = '3'">
            <van-radio slot="right-icon" name="3" checked-color="#EC581E" />
          </van-cell>
          <van-cell title="商品价格太高" clickable @click="radio = '4'">
            <van-radio slot="right-icon" name="4" checked-color="#EC581E" />
          </van-cell>
          <van-cell title="在其他平台看到比此商品更低的价格" clickable @click="radio = '5'">
            <van-radio slot="right-icon" name="5" checked-color="#EC581E" />
          </van-cell>
          <van-cell title="配送地址变更" clickable @click="radio = '6'">
            <van-radio slot="right-icon" name="6" checked-color="#EC581E" />
          </van-cell>
          <van-cell title="配送方式变更" clickable @click="radio = '7'">
            <van-radio slot="right-icon" name="7" checked-color="#EC581E" />
          </van-cell>
          <van-cell title="支付方法变更" clickable @click="radio = '8'">
            <van-radio slot="right-icon" name="8" checked-color="#EC581E" />
          </van-cell>
          <van-cell title="其他" clickable @click="radio = '9'">
            <van-radio slot="right-icon" name="9" checked-color="#EC581E" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-button type="default" class="order_button order_button1">暂不取消</van-button>
      <van-button type="default" class="order_button order_button2">确定取消</van-button>
    </van-action-sheet>
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";
import http from "@/until/http.js";
import ConstKey from "@/until/const_key.js";
export default {
  name: "Orderlist",
  inject: ["reload"],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      active: 0,
      show: false,
      radio: "",
      time: "",
      orderlist: [],
      nopay: [],
      nodeliver: [],
      bedeliver: [],
      completed: [],
      pageNum: 0,
      status: "",
      jpstyle:{},
      
    };
  },
  computed: {},
  filters: {
    
    
    
  },
  methods: {
    goPay(item) {
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
    returnNodeliver(s) {
      switch (s) {
        case "VOID":
          return this.$t('returnList.VOID');

        case "AUDIT":
          return this.$t('order.nodeliver');

        case "DELIVERED":
          return this.$t('supply.delivered');

        case "DELIVERED_PART":
          return this.$t('supply.deliverpart');

        case "COMPLETED":
          return this.$t('order.complete');

        case "CONFIRMED":
          return this.$t('supply.saved');

        case "INIT":
          return this.$t('returnList.saved');
        default:
      }
    },
    returnBedeliver(s) {
      switch (s) {
        case "VOID":
          return this.$t('returnList.VOID');

        case "AUDIT":
          return this.$t('supply.delivered');

        case "DELIVERED":
          return this.$t('supply.delivered');

        case "DELIVERED_PART":
          return this.$t('supply.deliverpart');

        case "COMPLETED":
          return this.$t('order.complete');

        case "CONFIRMED":
          return this.$t('supply.saved');

        case "INIT":
          return this.$t('returnList.INIT');
        default:
      }
    },
    returnNopay(s) {
      switch (s) {
        case "VOID":
          return this.$t('returnList.VOID');

        case "AUDIT":
          return this.$t('order.nopay');

        case "DELIVERED":
          return this.$t('supply.delivered');

        case "DELIVERED_PART":
          return this.$t('supply.deliverpart');

        case "COMPLETED":
          return this.$t('order.complete');

        case "CONFIRMED":
          return this.$t('supply.saved');

        case "INIT":
          return this.$t('supply.saved');
        default:
      }
    },
    returnStatus(s) {
      
      if (s.flowState == "VOID") {
        return this.$t('returnList.VOID')
      } else if (s.flowState != "VOID" && s.payState == 'NOT_PAID') {
         return this.$t('order.nopay')
      } else if (s.flowState == "AUDIT" && s.payState == 'PAID') {
         return this.$t('order.nodeliver')
      } else if (s.flowState == "CONFIRMED" ) {
         return this.$t('order.bedeliver')
      } if (s.flowState == "COMPLETED" ) {
         return this.$t('order.complete')
      }
    },
    totalnum(list) {
      let num = 0;
      list.map(i => {
        num += i.num;
      });
      return num;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    service(id, skuId, spuId, storeId, skuNo) {
      event.stopPropagation();

      this.$router.push({
        path: "/returngoods",
        query: {
          id: id,
          skuId: skuId,
          spuId: spuId,
          storeId: storeId,
          skuNo: skuNo
        }
      });
    },
    cancel(id) {
      // this.show = true;
      event.stopPropagation();
      let that = this;
      this.$axios({
        method: "get",
        url: `trade/cancel/${id}`
      }).then(res => {
        console.log(-"----------cancel", res);
        if (res.data.code == ConstKey.SUCCESS) {
          this.$toast(this.$t('like.cancel'));
          this.reload();
          that.active = 3;
        }
      });
    },
    orderdetail(id) {
      this.$router.push({
        path: "/orderdetail",
        query: {
          id: id
        }
      });
    },
    confirm(id) {
      event.stopPropagation();
      this.$axios({
        method: "get",
        url: `trade/receive/${id}`
      }).then(res => {
        console.log(res);
        this.$toast(res.data.message);
        this.reload();
      });
    },
    getdata() {
      let that = this;
      this.$axios({
        url: "trade/page",
        method: "post",
        data: {
          createdFrom: "",
          createdTo: that.time,
          deliverStatus: null,
          keywords: "",
          pageNum: that.pageNum,
          pageSize: 5,
          payState: null
        }
      }).then(res => {
        console.log("------------全部", res);
        let _list = res.data.context.content;
        _list.map(item => {
          that.list.push(item);
        });
      });
    },
    getNoPaid() {
      //代付款
      let that = this;
      this.$axios({
        method: "post",
        url: "trade/page",
        data: {
          payState: "NOT_PAID",
          deliverStatus: null,
          keywords: "",
          createdFrom: "",
          createdTo: that.time,
          pageNum: that.pageNum,
          pageSize: 5
        }
      }).then(res => {
        console.log("------------待付款", res);
        let _Nolist = res.data.context.content;
        _Nolist.map(item => {
          that.nopay.push(item);
        });
      });
    },
    getNoDeliver() {
      //代发货
      this.$axios({
        method: "post",
        url: "trade/page",
        data: {
          payState: null,
          deliverStatus: null,
          keywords: "",
          createdFrom: "",
          createdTo: this.time,
          flowState: "AUDIT",
          pageNum: this.getNoDeliver,
          pageSize: 5
        }
      }).then(res => {
        console.log("------------代发货", res);
        this.nodeliver = res.data.context.content;
      });
    },

    onLoad() {
      let that = this;
      that.pageNum++;
      // 异步更新数据
      setTimeout(() => {
        that.getdata();
        that.getNoPaid();
        that.getNoDeliver();
        // 加载状态结束
        that.loading = false;

        // 数据全部加载完成
        if (that.pageNum >= 6) {
          that.finished = true;
        }
      }, 500);
    }
  },
  created() {
    
    var date = new Date();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    this.time =
      date.getFullYear() +
      "-" +
      (mon < 10 ? "0" + mon : mon) +
      "-" +
      (day < 10 ? "0" + day : day);
  },
  mounted() {
    if (localStorage.getItem('local') == 'jp') {
      this.jpstyle = {
        'margin-left':'15px',
        'width':'160px'
      }
    }
    this.active = this.$route.query.index;
    console.log(String(this.time));
    let that = this;
    // this.$axios({
    //   url: "trade/page",
    //   method: "post",
    //   data: {
    //     createdFrom: "",
    //     createdTo: this.time,
    //     deliverStatus: null,
    //     keywords: "",
    //     pageNum: 0,
    //     pageSize: 100,
    //     payState: null
    //   }
    // }).then(res => {
    //   console.log(res);
    //   that.orderlist = res.data.context.content;
    // let list = res.data.context.content;
    // list.map(item => {
    //   if (
    //     item.tradeState.payState == "NOT_PAID"&&(item.tradeState.flowState == "AUDIT" || item.tradeState.flowState == "INIT"||item.tradeState.flowState == "REMEDY")

    //   ) {
    //     that.nopay.push(item);
    //     console.log('------',that.nopay)
    //   } else if (
    //     (item.tradeState.flowState == "AUDIT" || item.tradeState.flowState == "INIT"||item.tradeState.flowState == "REMEDY") &&
    //     item.tradeState.payState == "PAID" &&
    //     item.tradeState.deliverStatus == "NOT_YET_SHIPPED"
    //   ) {
    //     that.nodeliver.push(item);
    //   } else if (item.tradeState.flowState == "DELIVERED" || item.tradeState.flowState == 'DELIVERED_PART') {
    //     that.bedeliver.push(item);
    //   } else if (item.tradeState.flowState == "COMPLETED") {
    //     that.completed.push(item);
    //   }
    // });
    // });

    //代收货
    this.$axios({
      method: "post",
      url: "trade/page",
      data: {
        payState: null,
        deliverStatus: null,
        keywords: "",
        createdFrom: "",
        createdTo: this.time,
        flowState: "CONFIRMED",
        pageNum: 0,
        pageSize: 100
      }
    }).then(res => {
      console.log("------------代收货", res);
      this.bedeliver = res.data.context.content;
    });

    //已完成
    this.$axios({
      method: "post",
      url: "trade/page",
      data: {
        payState: null,
        deliverStatus: null,
        keywords: "",
        createdFrom: "",
        createdTo: this.time,
        flowState: "COMPLETED",
        pageNum: 0,
        pageSize: ConstKey.PAGE_SIZE,
        payState: null
      }
    }).then(res => {
      console.log("------------已完成", res);
      this.completed = res.data.context.content;
    });
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
.tab {
  margin-top: 40px;
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
.button2 {
  margin-left: 150px;
  margin-right: 20px;
  width: 88px;
  height: 28px;
  border-radius: 3px;
}
.button3 {
  margin-left: 260px;
  width: 88px;
  height: 28px;
  border-radius: 3px;
  border: 1px solid rgba(236, 88, 32, 1);
  color: rgba(236, 88, 32, 1);
}
.van-cell__title {
  font-size: 12px;
  line-height: 20px;
}
.length {
  text-align: right;
  margin-right: 30px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}
._button {
  margin-left: 170px;
}
</style>