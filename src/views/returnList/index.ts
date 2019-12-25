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
  Tab
} from 'vant'
Vue.use(NavBar).use(Card).use(Icon).use(Panel).use(Button).use(Tabs).use(Tab)
import Component from 'vue-class-component'
import { Inject } from 'vue-property-decorator'

interface Order{
          orderId:string ,
          orderInfoNumber:string 
        }

@Component({

})

export default class ReturnList extends Vue{
  @Inject() private reload = (this as any).reload
      active:string='0'
      returnlist:Array<any>= []
      status:string= ""
      return1:Array<any>=[]
      return2:Array<any>=[]

      


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
      that.$router.push('/usermain');
    }
    returndetail(ids:any,id:any) {
      
      let that = (this as any)
      let orderinfo:Order={
          orderId:ids,
          orderInfoNumber: id
      }
      that.$router.push({
        path: "/returndetail",
        query: orderinfo
      });
    }
    cancel(id:any) {
      let that = (this as any)
      console.log(id)
      that.$post(
        api.cancelReturnOrder+'?orderInfoNumber='+id,
        
      ).then((res:any) => {
        if (res.code == "200") {
          console.log(res)
          that.$toast(that.$t('like.cancel'))
          that.reload()
          that.$router.push('/usermain')
        }

      })
    }
    getData() {
      let that = (this as any)
      console.log('tag', 'aaaaaaaaaaaa')
      that.$post(
        
        // api.returnGoodsList, 
        'api/return/order/returnOrderInfoPage/10/1',
        {
          accountId: localStorage.getItem('accountid'),
          orderNumber: "",
          payState: "",
          submitTimeBegin: "",
          submitTimeEnd: "",
        }

      ).then((res:any) => {
        console.log(res);
        that.returnlist = res.context.data;
        
        that.returnlist.map((item:any)=>{
          
          item.returnOrderItem.map((v:any)=>{
            if(v.refundType == 0){
            that.return1.push(item)
            }else{
              that.return2.push(item)
            }
          })
        })
        // list.map(item=>{
        //   if(item.refundType == 0){
        //     that.return1.push(item)
        //   }else{
        //     that.return2.push(item)
        //   }
        // })
      });
    }

      mounted() {
    let that = (this as any)
    that.$fetch(

      api.returnGoods

    ).then((res:any) => {
      console.log(res);
      // this.returnlist = res.data.context.content;

    });
   this.getData()


  }
}
