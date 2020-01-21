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
        @click="clickTab"
      >
        <van-tab v-for="(item,index) in returnList()" :key="index" :title="item.name">
          <van-list
            v-model="loading"
            :loading-text="$t('supply.loadding')"
            :finished="finished"
            :finished-text="$t('threeClass.finished')"
            @load="onLoad"
          >
            <van-panel
              :title="$t('order.order')+':'+item.orderNumber"
              v-for="(item,index) in orderlist"
              :key="index"
              :status="returnStatus(item.state)"
            >
              <div>
                <van-card
                  v-for="(i,k) in item.orderItem"
                  :num="i.number"
                  :price="i.amount"
                  :desc="i.goodsSkuVal"
                  :title="i.goodsInfoName"
                  :thumb="i.goodsInfoImg"
                  :key="k"
                  @click="orderdetail(item)"
                >
                  <div slot="footer">
                    <van-button
                      size="small "
                      @click="goCommont(item,$event)"
                      class="goCommont"
                      v-if="item.state == 7&&i.evalState!==1"
                      >{{$t('user_main.comont')}}
                  </van-button>
                  </div>
                </van-card>
                
                <!-- <p class="length">
                  {{$t('returnList.all')}}{{totalnum(item.tradeItems)}} {{$t('returnList.goods')}}&nbsp;&nbsp;&nbsp; {{$t('order.allprice')}}
                  <span>￥{{item.tradePrice.totalPrice}}</span>
                </p>
                <van-button
                  size="small "
                  @click="cancel(item.id)"
                  class="button2"
                  v-if="item.tradeState.payState =='NOT_PAID' && (item.tradeState.flowState == 'INIT' || item.tradeState.flowState == 'REMEDY' || item.tradeState.flowState == 'AUDIT')"
                >{{$t('order.cancel')}}</van-button>
                

                <van-button
                  @click="goPay(item)"
                  size="small "
                  class="button"
                  v-if="item.tradeState.payState =='NOT_PAID' &&( item.tradeState.flowState == 'INIT' || item.tradeState.flowState == 'REMEDY' || item.tradeState.flowState == 'AUDIT')"
                >{{$t('order.gopay')}}</van-button> -->

                <van-divider :style="{ borderColor: '#EC5820', padding: '0 15px' }"></van-divider>
                <p class="goodsinfo">
                  {{ $t("returnList.all") }}{{item.orderItem.length}}{{ $t("returnList.goods") }}&nbsp;&nbsp;&nbsp; {{ $t("order.orderprice") }}
                  <span>{{":￥"+item.payAmount?item.payAmount:''}}</span>
                </p>
              </div>
              <div slot="footer" class='slot'>
                
                    <van-button
                      size="small "
                      class="button3"
                      @click="confirm(item.orderNumber,$event)"
                      v-if="item.state == 6"
                    >{{$t('order.p1')}}</van-button>
                    
                    

                    <van-button
                      size="small "
                      @click="goPay(item,$event)"
                      class="goPay"
                      v-if="item.state ==  2"
                    >{{$t('order.goPay')}}
                    </van-button>

                    <van-button
                      size="small "
                      @click="cancel(item.orderNumber,$event)"
                      class="cancel"
                      v-if="item.state <= 3"
                    >{{$t('order.cancel')}}
                    </van-button>
                  </div>
            </van-panel>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang='ts'>
import api from "../../request/api";
import ConstKey from "../../until/const_key"
import Vue from "vue";
import { Cell, CellGroup, Toast,NavBar,Tabs,Tab,List, Panel,Card ,Button,Divider,Dialog } from "vant";
Vue.use(Cell).use(CellGroup).use(Toast).use(NavBar).use(Tabs).use(Tab).use(List).use(Panel).use(Card).use(Button).use(Divider).use(Dialog)
import Component from 'vue-class-component'

import { Inject } from 'vue-property-decorator'
import { 
  State,
  Getter,
  Action,
  Mutation,
  namespace
  } from 'vuex-class'


@Component({
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
})

export default class OrderListShow extends Vue {
  @Inject() private reload =(this as any ).reload 
      @State('accountid') accountid:any
      loading:boolean= true
      finished:boolean= false
      isLoading:boolean= false
      active:number= 0
      show:boolean= false
      radio:string= ""
      time:string= ""
      
      orderlist:Array<any>= []
      pageNum:number = 1
      p_deliverStatus:any= null
      p_payState:any= ''
      p_flowState:any= ''
      status:string= ""
      jpstyle:object= {}
      comeType:number= 0


    goPay(item:any,event:any) {
      event.stopPropagation();
      let that = (this as any );
      let orderTids:any = [];
      let tids:any = {
        orderId:item.order.id,
        orderInfoNumbers:[]
      };
      
      console.log("----------------item-", item);
      tids.orderInfoNumbers.push({orderInfoNumber:item.orderNumber})
            // tids.tid = item.id;
      // tids.price = item.tradeItems[0].price;
      // tids.payOrderId = item.payOrderId;
      // orderTids.push(tids);
      that.$router.push({
        name: "payStyle",
        params: {
          orderTids: tids,
          price:item.amount
        }
      });
    }

    returnList(){
      let that =(this as any);
      let tabList:Array<any>= [
        { name: that.$t("order.all") },
        { name: that.$t("order.nopay") },
        { name: that.$t("order.nodeliver") },
        // { name: that.$t("order.bedeliver") },
        // { name: that.$t("order.confirmed") },
        // { name: that.$t("returnList.VOID") }
      ]
      return tabList
    }
    returnStatus(s:any) {
      let that = (this as any );
      if (s == "14") {
        //作废
        return that.$t("returnList.VOID");
      } else if (s== "2") {
        //待支付
        return that.$t("order.nopay");
      } else if (
        s== "5"
      ) {
        //待发货
        return that.$t("order.nodeliver");
      } else if (s == "6") {
        //待收货
        return that.$t("order.bedeliver");
      } else if (s == "7") {
        //已收货
        return that.$t("order.confirmed");
      }
      if (s == "8") {
        //已完成
        return that.$t("order.complete");
      }
    }
    totalnum(list:Array<any>) {
      let num = 0;
      list.map(i => {
        num += i.num;
      });
      return num;
    }
    onClickLeft() {
      let that = (this as any );
      if (this.comeType == 1) {
        that.$router.push('/usermain')
      } else {
        // that.$router.go(-1);
        that.$router.push('/usermain')
      }
    }
    service(id:any, skuId:any, spuId:any, storeId:any, skuNo:any) {
      // window.event.stopPropagation();
    let that = (this as any );
      that.$router.push({
        path: "/returngoods",
        query: {
          id: id,
          skuId: skuId,
          spuId: spuId,
          storeId: storeId,
          skuNo: skuNo
        }
      });
    }

    cancel(number:any,event:any) {
      this.show = true;
      event.stopPropagation();
      let that = (this as any );
      
      Dialog.confirm({
        
        message: that.$t('newAdd.confirm')
      }).then(() => {
        
        that.$fetch(
        api.cancelOrder+'?orderInfoNumber='+number,
        
      ).then((res:any) => {
        console.log(-"----------cancel", res);
        if (res.code == ConstKey.SUCCESS) {
          that.$toast(that.$t("like.cancel"));
          that.reload();
          // that.active = 3;
          that.getdata()
        }
      });
      }).catch(() => {
        // on cancel
      });
      
    }
    orderdetail(id:any) {
       let that = (this as any );
      that.$router.push({
        path: "/orderdetail",
        query: {
          id: id
        }
      });
    }
    //确认收货
    confirm(id:any,event:any) {
      let that = (this as any );
      event.stopPropagation();
      that.$post(
        
        api.confirmReceiving,
        {
          orderInfoNumber:id
        }

      ).then((res:any) => {
        console.log(res);
        if (res.code == '200') {
          
          that.reload();
          that.$router.go(0)
        }else{
          that.$toast(res.message);
        }
        
      });
    }
    //评价
    goCommont(item:any,event:any){
      let that = (this as any );
      event.stopPropagation();
      console.log('tag', item)
      that.$router.push({
            path: "/commont",
            query: {
              orderId: item.order.id,
              orderInfoNumber:item.order.orderNumber,
              img:item.orderItem[0].goodsInfoImg,
              goodsInfoId:item.orderItem[0].goodsInfoId
            }
      });

    }
    //退货退款
    returnGoods(item:any,event:any){
      let that = (this as any );
      event.stopPropagation();
      console.log('tag', item)
      that.$fetch(
        
        api.returnable,
        {
          orderId:item.order.id,

          orderInfoNumber:item.order.orderNumber
        }

      ).then((res:any) => {
        console.log(res);
        if (res.code == '200') {
          that.$toast(res.message);
          that.reload();
          that.$router.push({
            path: "/returnGoods",
            query: {
              orderId: item.order.id,
              orderInfoNumber:item.order.orderNumber
            }
          });
        }else{
          that.$toast(res.message);
        }
        
      });
    }
    //点击选项
    clickTab(key:any) {
      let that = (this as any );
      //重置元素
      that.pageNum = 1;
      that.orderlist = [];
      that.finished = false;
      that.loading = true;
      that.isLoading = false;
      //设置参数
      if (key == 0) {
        //全部
        
        that.p_payState = null;
        that.p_flowState = null;
      } else if (key == 1) {
        //待付款
       
        that.p_payState = 2;
        that.p_flowState = 2;
      } else if (key == 2) {
        //待发货
        
        that.p_payState = 5;
        that.p_flowState = 5;
      }
      // } else if (key == 3) {
      //   //待收货
        
      //   that.p_payState = 6;
      //   that.p_flowState = 6;
      // } else if (key == 4) {
      //   //已收货
       
      //   that.p_payState = 7;
      //   that.p_flowState = 7;
      // } else if (key == 5) {
      //   //已完成
        
      //   that.p_payState = 14;
      //   that.p_flowState = 14;
      // }
      that.getdata();
    }
    getdata() {
      let that = (this as any );
      console.log(that.accountid)
      that.$post(
       
        `api/order/queryOrderInfoPage/${10}/${that.pageNum}`,
        {
          accountId:localStorage.getItem('accountid'),
          orderState: that.p_flowState,
          payState: that.p_payState,
          submitTimeBegin: "",
          submitTimeEnd: "",
          orderNumber: ""
        }
      ).then((res:any) => {
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
    }

    onLoad() {
      let that = (this as any );
      // 异步更新数据
      if (that.isLoading) {
        setTimeout(() => {
          that.pageNum++;
          that.getdata();
        }, 500);
      }
    }

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
  }
  mounted() {
    let that = (this as any );
    if (localStorage.getItem("local") == "jp") {
      that.jpstyle = {
        "margin-left": "15px",
        width: "100px"
      };
    }
    that.active = that.$route.query.index;
    console.log(String(this.time));
    
    that.getdata();
    that.comeType = that.$route.params.comeType || 0;
  }

}



// export default {
//   name: "OrderListShow",
//   inject: ["reload"],
//   data() {
//     return {
//       
//     };
//   },
//   computed: {},
//   filters: {},
//   methods: {

//   },

// };
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
  width: 105px;
  height: 28px;
  border-radius: 3px;
  border: 1px solid rgba(236, 88, 32, 1);
  color: rgba(236, 88, 32, 1);
}
.button1 {
  width: 105px;
  height: 28px;
  border-radius: 3px;
}
.button2 {
  margin-left: 80px;
  margin-right: 20px;
  width: 145px;
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
.returnGoods{
  width: 145px;
  height: 28px;
  border-radius: 3px;
  float:right;
  border: 1px solid rgba(236, 88, 32, 1);
   color:rgba(236, 88, 32, 1);
}
.goPay{
  width: 145px;
  height: 28px;
  border-radius: 3px;
  float:right;
  border: 1px solid rgba(236, 88, 32, 1);
   color:rgba(236, 88, 32, 1);
}
.cancel{
  width: 145px;
  height: 28px;
  border-radius: 3px;
  float:right;
  margin-right:20px;
  border: 1px solid rgba(236, 88, 32, 1);
   color:rgba(236, 88, 32, 1);
}
.slot{
  height:30px;
}
.goCommont{
  width: 145px;
  height: 28px;
  border-radius: 3px;
  float:right;
 border: 1px solid rgba(236, 88, 32, 1);
  margin-left:20px;
  color:rgba(236, 88, 32, 1);
}
.goodsinfo{
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  padding-left: 20px;
}
</style>