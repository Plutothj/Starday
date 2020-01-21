<template>
  <div class="Return-detail-wrap">
    <van-nav-bar class="nav1" :title="$t('returnDetail.returndetail')" left-arrow @click-left="onClickLeft" />
    <div class="returndetail">
      <van-panel :title="$t('returnDetail.returnInfo')">
        <div> {{$t('returnDetail.returnStatus')}}{{isstatus("11")}} </div>
        <div>{{$t('returnDetail.returnRes')}}{{reason[4]}}</div>
        <div>{{$t('returnDetail.orderNo')+ordernumber}}</div>
        <div>{{$t('returnDetail.returnNo')}}{{context.orderInfoDTO.returnOrderItem[0].returnOrderNumber}}</div>
        <div>{{$t('returnDetail.returnTime')}}{{time}}</div>
      </van-panel>
      <van-panel :title="context.orderInfoDTO.storeName"  >
        <van-card
          :num="item.number"
          :price="item.returnAmount"
          :desc="item.goodsSkuVal"
          :title="item.goodsInfoName"
          :thumb="item.goodsInfoImg"
          v-for="(item,index) in context.orderInfoDTO.returnOrderItem"
          :key="index"
        />
      </van-panel>

      <van-panel :title="$t('supply.serverinfo')" class="server">
        <div>{{$t('returnDetail.service')}}{{context.orderInfoDTO.returnOrderItem[0].refuseCause}}</div>
        <div>{{$t('returnDetail.description')}}{{context.description}}</div>
        <div>{{$t('returnDetail.returnPrice')}}￥{{context.orderInfoDTO.amount}}</div>
      </van-panel>
      <!-- <van-cell-group>
        <van-cell title="应返积分" :value="contenxt.returnPoints.applyPoints" />
        <van-cell title="实际返还积分" :value="contenxt.returnPoints.applyPoints"  />
      </van-cell-group>-->
    </div>
  </div>
</template>

<script lang='ts'>
import api from "../../request/api";
import ConstKey from "../../until/const_key"
import Vue from "vue";
import {  Toast,NavBar, Panel ,Button,Field,Card} from "vant";
import {gettime} from '../../until/until'
Vue.use(Toast).use(NavBar).use(Panel).use(Button).use(Field).use(Card)
import Component from 'vue-class-component'

@Component({

})
export default class ReturnDetail extends Vue{

      context:any= {}
      status:string|number= ""
      time:string|number=''
      storeName:string =''
      reason:Array<any> = []
      index:number =0
      state:any = null
      ordernumber:any = ''
    isstatus(status:string|number){
      let that = (this as any)
      console.log('aaaaa')
      switch (status) {
        case '10':
          return that.$t('returnList.returning');
          break;
        case '11':
          return that.$t('returnList.returning');
          break;
        case '12':
          return that.$t('returnList.REFUNDED');
          break;
        case '13':
          return that.$t('returnList.REJECT_REFUND');
          break;
        case '14':
          return that.$t('returnList.REFUND_FAILED');
          break;
        default:
          break;
      }
    }
    onClickLeft() {
       let that = (this as any)
      that.$router.go(-1);
    }
    getData() {
       let that = (this as any)
      let orderId = that.$route.query.orderId;
    let orderInfoNumber = that.$route.query.orderInfoNumber;
    that.$fetch(
      api.refundOrderDetails,
      {
        orderId:orderId,
        orderInfoNumber:orderInfoNumber
      }
    ).then((res:any) => {
      console.log("--------------------returndetail", res);
      that.context = res.context;
      that.time = gettime(that.context.orderInfoDTO.applyRefundTime) 
      that.index=that.context.orderInfoDTO.returnOrderItem[0].returnReason
      that.ordernumber = that.context.orderInfoDTO.orderNumber
      
      that.state=that.context.orderInfoDTO.state
      that.isstatus( that.state)
      console.log('>>>>>>>>>>>>>>>>>>>>',res.context.orderInfoDTO.orderNumber)
    });
    }
    getReason(){
      let that = (this as any)
      that.$fetch(
      api.getReasons,
      
    ).then((res:any) => {
      let data = res.context

      data.map((item:any,index:any)=>{
        
        this.reason = Object.assign(this.reason,item)
      })
      console.log('tag', this.reason)

      
    });
    
    }


  mounted() {
    this.getData()
    this.getReason()
  }
}

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
.returndetail {
  margin-top: 48px;
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
    font-size: 12px;
    font-family: PingFangSC-Regular;

    color: rgba(102, 102, 102, 1);

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
.server{
  margin-top: 78px;
}
.van-card:not(:first-child) {
    margin-top: 84px;
}
</style>
