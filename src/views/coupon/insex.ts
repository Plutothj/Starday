import api from "../../request/api";
import ConstKey from "../../until/const_key"
import Vue from "vue";
import {
  NavBar,
  Card,
  Icon,
  Panel,
  Button,
  Tabs,
  Tab,
  CouponList
} from 'vant'
Vue.use(NavBar).use(Card).use(Icon).use(Panel).use(Button).use(Tabs).use(Tab).use(CouponList)

import { Inject } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component({

})
export default class Coupon extends Vue{
  @Inject() private reload = (this as any).reload

      active:string= '0'
      returnlist:Array<any>= []
      status:String= ""
      return1:Array<any>=[]
      return2:Array<any>=[]
      state:string|Number = '1'
      chosenCoupon:Number= -1
      coupons: Array<any>=[]
      disabledCoupons:Array<any>= []

    onChange(index:any) {
      let that = (this as any)
      that.showList = false;
      that.chosenCoupon = index;
    }
    onExchange(code:any) {
      let that = (this as any)
      that.coupons.push();
    }
    returnStatus(s:any) {
       let that = (this as any)
      switch (s) {
        case "VOID":
          return that.$t("returnList.VOID");

        case "AUDIT":
          return that.$t("returnList.AUDIT");

        case "DELIVERED":
          return that.$t("returnList.DELIVERED");

        case "RECEIVED":
          return that.$t("returnList.RECEIVED");

        case "REFUNDED":
          return that.$t("returnList.REFUNDED");

        case "COMPLETED":
          return that.$t("returnList.COMPLETED");

        case "REJECT_REFUND":
          return that.$t("returnList.REJECT_REFUND");

        case "REJECT_RECEIVE":
          return that.$t("returnList.REJECT_RECEIVE");

        case "REFUND_FAILED":
          return that.$t("returnList.REFUND_FAILED");
        case "INIT":
          return that.$t("returnList.INIT");
        case 10:
          return '申请退款';
        default:
      }
    }
    onClickLeft() {
      let that = (this as any)
      that.$router.go(-1);
    }
    returndetail(ids:any,id:any) {
      let that = (this as any)
      that.$router.push({
        path: "/returndetail",
        query: {
          ids:ids,
          id: id
        }
      });
    }
    cancel(id:any) {
      let that = (this as any)
      that.$axios({
        url: `return/cancel/${id}`,
        method: 'post',
        params: {
          reason: '注文をキャンセル'
        }
      }).then((res:any) => {
        if (res.data.code == "K-000000") {
          console.log(res)
          that.$toast(that.$t('like.cancel'))
          that.reload()
        }

      })
    }
    getData() {
      
      let that = (this as any)
      that.$post(
        api.getCouponList,
        {
          couponState:that.state
        }
      ).then((res:any) => {
        console.log(res);
        
        let infolist = res.context.couponActivityVo
        infolist.map((info:any)=>{
          let coupon = {
          id:info.couponActivity?info.couponActivity.couponId:null,
          available: 1,
          condition: info.couponActivity.fullbuyType==0?'无门槛':'满'+info.couponActivity.fullbuyPrice+'元可用',
          reason: '',
          value: info.couponActivity.denomination*100,
          name:info.couponActivity.couponName,
          startAt: info.couponActivity.startTime,
          endAt: info.couponActivity.endTime,
          valueDesc: info.couponActivity.denomination,
          unitDesc: '円',
          description:info.couponActivity.couponType==0?'通用券':info.couponActivity.couponType==1?'店铺券':'运费券',
          isuse:info.couponActivity.couponUseState
        }
        if (coupon.isuse == 1) {
          that.coupons.push(coupon)
        }else{
          that.disabledCoupons.push(coupon)
        }
        

        
        })
        
      });
    }
    // getDelData(){
           
    //   let that = (this as any)
    //   that.state = '3' 
    //   that.$post(
    //     api.getCouponList,
    //     {
    //       couponState:that.state
    //     }
    //   ).then((res:any) => {
    //     console.log(res);
        
    //     let infolist = res.context.couponActivityVo
    //     infolist.map((info:any)=>{
    //       let coupon = {
    //       id:info.couponActivity.couponId,
    //       available: 1,
    //       condition: info.couponActivity.fullbuyType==0?'无门槛':'满'+info.couponActivity.fullbuyPrice+'元可用',
    //       reason: '',
    //       value: info.couponActivity.denomination*100,
    //       name:info.couponActivity.couponName,
    //       startAt: info.couponActivity.startTime,
    //       endAt: info.couponActivity.endTime,
    //       valueDesc: info.couponActivity.denomination,
    //       unitDesc: '円',
    //       description:info.couponActivity.couponType==0?'通用券':info.couponActivity.couponType==1?'店铺券':'运费券',
          
    //     }
    //     that.disabledCoupons.push(coupon)
    //     })
        
    //   });
    // }

      mounted() {
   
   this.getData()
  //  this.getDelData()

  }
}
