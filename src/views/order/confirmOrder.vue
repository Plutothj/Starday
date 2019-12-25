<template>
<div class="app-confirmOrder">
  <van-nav-bar :title="$t('order.Confirmorder')" left-arrow @click-left="goBack" />
  <div class="price-container">
    <van-cell-group :border="false">
      <!-- <van-cell class="now-price" :border="false" title="实付金额" value="￥1243" /> -->
      <van-cell class="now-price" :border="false" :title="$t('order.paynumber')">￥{{dealTotalPrice}}</van-cell>
      <van-cell class="other-price" :border="false" :title="$t('order.goodsprice')">￥{{goodsTotalPrice}}</van-cell>
      <van-cell class="other-price" :border="false" :title="$t('order.deliverprice')">￥{{priceInfo.deliveryPrice}}</van-cell>

    </van-cell-group>
  </div>
  <div class="address">
    <van-cell-group>
      <van-field v-model="address" clearable :label="$t('order.adress')" :placeholder="$t('order.inpadress')" right-icon="arrow" @click="goAddress" disabled />
      <van-field v-model="buyMan" :label="$t('order.consignee')" disabled />
      <!-- 优惠券单元格 -->
      <van-coupon-cell    @click="showList = true" />
      <van-cell :title="$t('order.markrt')" is-link arrow-direction="down" value="使用" @click="ordermarkrt"/>
      <!-- 优惠券列表 -->
      <van-popup v-model="showList" position="bottom">
        <van-coupon-list :show-exchange-bar='false' :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" @change="onChange" @exchange="onExchange" />
      </van-popup>
      <van-field  v-model="integral" :disabled="integral == 0"  :max='integral' :min='0' type='number' @input='watchvalue' :label="$t('order.ingetral')"  />

    </van-cell-group>
    <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '30%' }"
    >
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="不使用优惠" clickable @click="delMarket">
          
           <van-radio slot="right-icon" name="0" />
        </van-cell>

        <van-cell :title="item.marketingName" clickable @click="checkMarket(item.marketingId,index)" v-for="(item,index) in markrtList" :key="index">
          <van-radio slot="right-icon" :name="index+1" />
        </van-cell>
        
      </van-cell-group>
    </van-radio-group>
    </van-popup>
  </div>
  <div class="order-detail">
    <ul class="store-list">
      <li class="store-item">

        <ul class="goods-list" v-for="(itm,idx) in listArr" :key="idx">
          <div class="store-name">{{itm.storeName}}</div>
          <li class="goods-item" v-for="(item, index) in itm.listInfo" :key="index">

            <img v-lazy="item.sku.goodsInfoImg" alt />
            <div class="goods-detail">
              <div class="goods-name">{{item.sku.goodsInfoName}}</div>
              <div class="size-num">
                <div class="size">
                  <span v-if="item.skuVal!=null">{{item.skuVal}}</span>
                  <span v-if="item.skuVal==null">{{$t('order.guige')}}</span>
                  <!-- <span>;</span>
                    <span>{{itm.spu}}</span>-->
                </div>
                <div class="num">x{{item.number}}</div>
                
              </div>
              <select class="select"  name="public-choice"  @change="getCouponSelected(idx,index,$event,item)"> 
                  <option value="" >不使用优惠</option>
                  <option :value="ite.marketingId" v-for="(ite,i) in item.marketingDTOList" :key="i">{{ite.marketingName}}</option>
              </select>
              <div class="price">￥{{item.sku.marketPrice}}</div>
              
             
              
            </div>

          </li>
        </ul>
        <!-- <van-cell-group :border="false" class="store-msg">
            <van-field
              v-model="item.buyerRemark"
              clearable
              :label="$t('supply.message')"
              :placeholder="$t('supply.p1')"
            />
          </van-cell-group>
          <div class="all-price">
            <span
              class="all-num"
            >{{$t('returnList.all')}}{{orderList.length}}{{$t('returnList.goods')}}</span>
            <span>{{$t('order.deliverprice')}}</span>
            <span>¥{{item.tradePrice.deliveryPrice||0}}</span>
            <span>{{$t('order.discount')}}</span>
            <span>¥{{item.tradePrice.discountsPrice||0}}</span>
            <span>{{$t('order.allprice')}}</span>
            <span class="price">¥{{item.tradePrice.totalPrice}}</span>
          </div> -->
      </li>
    </ul>
  </div>
  <div class="submit-order">
    <div class="payPrice">
      <span>{{$t('order.pay')}}</span>
      <span class="money">￥{{dealTotalPrice}}</span>
      <!-- <span class="text">{{$t('order.discounted')}}</span>
      <span class="text">￥{{priceInfo.totalCommission}}</span> -->
    </div>
    <div class="sub-btn" @click="submitOrder">{{$t('order.suborder')}}</div>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import api from "../../request/api";
import Vue from "vue";
import {
  NavBar,
  Field,
  SubmitBar,
  Cell,
  CellGroup,
  Toast,
  CouponCell,
  CouponList,
  Popup,
  DropdownMenu, 
  DropdownItem,
  RadioGroup, 
  Radio
} from "vant";
Vue.use(NavBar).use(Field).use(SubmitBar).use(Cell).use(CellGroup).use(Toast).use(CouponCell).use(CouponList).use(Popup).use(DropdownMenu).use(DropdownItem)
Vue.use(RadioGroup);
Vue.use(Radio);


export default {
  name: "confirmOrder",
  mounted() {
    let that = this;
    // 获取订单信息

    console.log(this.$route)
   
    if (this.$route.params.info !== undefined) {
      localStorage.setItem('orderlist', JSON.stringify(this.$route.params.info.context.items))
      localStorage.setItem('freight', this.$route.params.info.context.freight)
      localStorage.setItem('integral', this.$route.params.info.context.integral)
      localStorage.setItem('amount', this.$route.params.info.context.amount)
      localStorage.setItem('type', this.$route.params.type)
      that.orderList = this.$route.params.info.context.items
      that.dealTotalPrice = this.$route.params.info.context.amount
      
      let listArr= []
      that.orderList.map((item,index)=>{
        let obj = {
          storeName:'',
          listInfo:[],
          
        }
        
        for (let i = 0; i < listArr.length; i++) {
          if(listArr[i].storeName == item.storeDTO.storeName){
            
            listArr[i].listInfo.push(item);
            return;
          };
          
        }
      
      obj.storeName = item.storeDTO.storeName
      obj.listInfo.push(item)
        listArr.push(obj);
        
      })
      let avtivity ={}
      
      
      that.listArr =listArr
     
      
    } else {
      that.orderList = JSON.parse(localStorage.getItem('orderlist'))
      
      console.log(">>>>>>>>>>>>>>>",that.orderList)
      let listArr= []
      that.orderList.map((item,index)=>{
        let obj = {
          storeName:'',
          listInfo:[],
          
        }
        let newitem = Object.assign({marketSelectid:index},item)
        for (let i = 0; i < listArr.length; i++) {
          if(listArr[i].storeName == item.storeDTO.storeName){
            
            listArr[i].listInfo.push(item);
            return;
          };
          
        }
      
      
      obj.storeName = item.storeDTO.storeName
      obj.listInfo.push(item)
      
      listArr.push(obj);
        
      })
      let avtivity ={}
      

      
      that.listArr =listArr
    }


    console.log('tag', JSON.parse(localStorage.getItem('orderlist')))
    that.getData();
    that.getCoupon();
    that.getDelCoupon()
    that.getDeliveryPrice();
    that.priceInfo.deliveryPrice = localStorage.getItem('freight')=='null'?0:localStorage.getItem('freight')
    that.integral = localStorage.getItem('integral')=='null'?0:localStorage.getItem('integral')
    that.dealTotalPrice = localStorage.getItem('amount')
    //判断设备app||h5
    // if (that.checkIsH5Plus()) {
    //   that.subOrderInfo.Source = "WECHAT";
    // } else {
    //   that.subOrderInfo.Source = "APP";
    // }
    
    
  },
  computed: {
    TotalPrice(){
      let that = this
      return that.goodsTotalPrice+(+that.priceInfo.deliveryPrice)
    },
    
    
  },
  components: {},
  data() {
    return {
      show:false,
      radio:null,
      value1: 0,
      showList: false,
      goodsTotalPrice: 0,
      chosenCoupon: null,
      coupons: [],
      couponid:'',
      disabledCoupons: [],
      dealTotalPrice:0,
      address: "", //送货地址
      isAddress: true, //是否有送货地址
      buyMan: "", //收货人
      orderList: [], 
      integral:0,//订单信息
      priceInfo: {
        //价格信息
        deliveryPrice: 0 //运费
      },
      addressInfo: {}, //默认地址信息
      consignee: {}, //地址id
      deliveryInfo: [], //运费接口参数信息
      subOrderInfo: {
        //提交订单参数信息
        goodsOneDiscountsList:[]
      },
      markList:[
        
      ],
      
      listArr:[],
      markrtList:[],
      markrtid:null,
      marketSelected:[],
      radio:[]
    };
  },
  
  updated() {
    
   
  },
  methods: {
    watchvalue(value){
      let that = this
      if (value > localStorage.getItem('integral')){
        that.integral = localStorage.getItem('integral')
      }
    },
    onChange(index) { 
      let that = this
      let couponClose = document.getElementsByClassName('van-coupon-list__close')[0]
      console.log('tag', document.getElementsByClassName('van-coupon-list__close'))
      couponClose.addEventListener('click',()=>{
        that.closeCoupon()
      })
      that.showList = false;
      that.chosenCoupon = index;
      
      that.couponid = that.coupons[index].id
      
      let obj = {}

     
      that.computePrice(that.marketSelected)
       
      
    },
    computePrice(arr){
      let that = this
      that.$post(
      api.Compute,
      {
        accountId: localStorage.getItem('accountid'),
        couponAllId: that.couponid,
        goodsOneDiscountsList: arr,
        integral: that.integral,
        marketingAllId: that.markrtid,
        shopType: 2,
      }
    ).then(res=>{
      
      that.dealTotalPrice= res.context.amount
      
    })
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    ordermarkrt(){
       this.show = true;
    },
    closeCoupon(arr){
      let that = this
     that.computePrice(arr)
    },
    getCouponSelected(idx,index,e,item){
      // console.log(idx,index,e)
      console.log(idx+index+'-'+e.target.selectedIndex,e.target.value,item)
      let that = this
      let option = new Number(item.option)
      that.marketSelected[option].marketingId = e.target.value
      console.log("+++++++++",that.marketSelected)
      that.computePrice(that.marketSelected)
    },
    //返回
    goBack: function() {
      let that = this;
      that.$router.back(-1);
    },
    // 选择地址
    goAddress: function() {
      console.log("------选择地址");
      let that = this;
      if (that.isAddress) {
        that.$router.push({
          name: "adressmanage",
          params: {
            type: 1
          }
        });
      } else {
        that.$router.push("/Addadress");
      }
    },
    
    //获取订单信息
    getData() {
      let that = this;
      that.marketSelected = []
      let arr = that.orderList
      
      console.log("+++++++++++++++",arr)
      arr.forEach((item,index)=>{
        let obj = {}
        item.option = index
        obj.goodsInfoId = item.skuId
        obj.skuVal = item.skuVal
        obj.number = item.number
        obj.couponId = ''
        obj.marketingId = ''
        
        that.marketSelected.push(obj)
        console.log(item)
      })
      
      arr.forEach((item,index)=>{
        
        that.goodsTotalPrice += Number(item.price)
      })
      console.log( that.marketSelected)
      that.getAddress();
    },
    //配送地址
    getAddress() {
      let that = this;
      that.$fetch(
          
          api.getAdress,
          
        ).then(res => {
          console.log("-------------配送地址--res", res);
          if (res.code == "200") {
            let context = res.context;
            if (context.length > 0) {
              context.map(item=>{
                if (item.def){
                  that.addressInfo = item;
                  that.address = item.address+item.deliveryAddress;
                  that.buyMan = item.realName;
                  that.isAddress = true;

                  let consignee = {};
                  consignee.provinceId = item.provinceId;
                  consignee.cityId = item.cityId;
                  that.consignee = consignee;
                }
              })
            } else {
              that.isAddress = false;
            }
          } else {
            Toast(res.message);
          }
        });
    },
    //促销信息
    getDeliveryPrice() {
      let that = this;
      that.$post(
          
          api.getMarketingBy,
          
        )
        .then(res => {
          console.log("-------------运费--res", res);
          if (res.code == "200") {
             that.markrtList = res.context;
            
          } else {
            Toast(res.message);
          }
        });
    },
    checkMarket(id,index){
    this.radio = index+1
    this.markrtid = id
    
    this.computePrice(this.marketSelected)
    },
    delMarket(){
    this.markrtid = ''
    this.computePrice(this.marketSelected)
    },
    getCoupon() {
      
      let that = this
      that.$post(
        api.getCouponActivity,
        
      ).then(res => {
        console.log(res);
        
        let infolist = res.context
        infolist.map(info=>{
          let coupon = {
          id:info.couponId,
          available: 1,
          condition: info.fullbuyType==0?'无门槛':'满'+info.fullbuyPrice+'元可用',
          reason: '',
          value: info.denomination*100,
          name:info.couponName,
          startAt: info.startTime,
          endAt: info.endTime,
          valueDesc: info.denomination,
          unitDesc: '円',
          description:info.couponType==0?'通用券':info.couponType==1?'店铺券':'运费券',
          
        }
        that.coupons.push(coupon)
        })
        
      });
    },
    getDelCoupon(){
           
      let that = this
      that.state = 3 
      that.$post(
        api.getCouponActivity,
        
      ).then(res => {
        console.log(res);
        
        let infolist = res.context
        infolist.map(info=>{
          let coupon = {
          id:info.couponId,
          available: 1,
          condition: info.fullbuyType==0?'无门槛':'满'+info.fullbuyPrice+'元可用',
          reason: '',
          value: info.denomination*100,
          name:info.couponName,
          startAt: info.startTime,
          endAt: info.endTime,
          valueDesc: info.denomination,
          unitDesc: '円',
          description:info.couponType==0?'通用券':info.couponType==1?'店铺券':'运费券',
          
        }
        that.disabledCoupons.push(coupon)
        })
        
      });
    },


    // 提交订单
    submitOrder: function() {
      console.log("-------提交订单");
      let that = this;
      //处理提交订单参数
      that.orderList.map(e => {
        console.log('tag', e)
        let obj  = {}
        
        obj.goodsInfoId = e.skuId
        obj.skuVal = e.skuVal
        
        obj.number = e.number
        obj.couponId = ''
        obj.marketingId = ''
        that.subOrderInfo.goodsOneDiscountsList.push(obj)
      });
      
      that.subOrderInfo.source = 3
      that.subOrderInfo.addressId =  that.addressInfo.id
      that.subOrderInfo.integral = that.integral
      that.subOrderInfo.payType = 1
      that.subOrderInfo.addressDetail = that.addressInfo.address+that.addressInfo.deliveryAddress
      that.subOrderInfo.accountId = localStorage.getItem('accountid')
      that.subOrderInfo.couponAllId = that.couponid
      that.subOrderInfo.shopType = localStorage.getItem('type') == '1'?1:2 
      that.subOrderInfo.marketingAllId =that.markrtid?that.markrtid:''
      that.$post(
          
          api.subOrder,
          that.subOrderInfo
        )
        .then(res => {
          console.log("-------------提交订单--res", res);
          if (res.code == "200") {
            let context = res.context;
            if (context.orderInfoNumbers.length > 1) {
              that.$router.push({
                name: "payStyle",
                params: {
                  orderTids: context,
                  list: that.orderList,
                  price:that.dealTotalPrice
                }
              });
              
            } else if (context.orderInfoNumbers.length == 1) {
              console.log("--------------直接支付");
              that.$router.push({
                name: "payStyle",
                params: {
                  orderTids: context,
                  list: that.orderList,
                  price:that.dealTotalPrice
                }
              });
              
            }
          } else {
            Toast(res.message);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.app-confirmOrder {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  text-align: left;
  padding-bottom: 50px;
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
  .price-container {
    margin: 10px 0;
    .now-price {
      .van-cell__title {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: bold;
        color: #445064;
      }
      .van-cell__value {
        font-size: 17px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(237, 88, 33, 1);
      }
    }
    .other-price {
      .van-cell__title {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .van-cell__value {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .address {
    margin-bottom: 10px;
  }
  .order-detail {
    margin-bottom: 10px; // padding: 16px 15px;
    // background: #fff;
    .store-item {
      background: #fff;
      padding: 0 15px 16px;
      margin-bottom: 10px;
    }
    .store-name {
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      padding: 16px 0 0;
      margin: 0;
    }
    .goods-item {
      display: flex;
      justify-content: space-between;
      margin: 24px 0;
      background: #fff;
      img {
        width: 90px;
        height: 90px;
        border-radius: 5px;
        margin-right: 10px;
      }
      .goods-detail {
        width: 250px;
        .goods-name {
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 600;
          color: #455165;
          margin-bottom: 7px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .size-num {
          font-size: 11px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          display: flex;
          justify-content: space-between;
          .num {
            font-weight: 600;
            color: #455165;
          }
        }
        .price {
          font-size: 15px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(237, 88, 33, 1);
          margin-top: 27px;
        }
      }
    }
    .store-msg {
      .van-cell {
        padding: 0;
        .van-cell__title {
          width: 60px;
        }
        input {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .all-price {
      text-align: right;
      margin-top: 20px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .all-num {
        margin-right: 16px;
      }
      .price {
        font-size: 14px;
        font-family: DINAlternate-Bold;
        font-weight: bold;
        color: rgba(255, 73, 0, 1);
      }
    }
  }
  .submit-order {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    .payPrice {
      padding: 0 15px;
      font-size: 15px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      .money {
        font-size: 19px;
        font-family: DINAlternate-Bold;
        font-weight: bold;
        color: rgba(236, 88, 32, 1);
        margin-right: 10px;
      }
      .text {
        font-size: 10px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .sub-btn {
      width: 126px;
      height: 49px;
      line-height: 49px;
      text-align: center;
      background: rgba(236, 88, 32, 1);
      font-size: 15px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.select{
  height:20px;
  border-radius:3px;
  font-size: 10px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
</style>

