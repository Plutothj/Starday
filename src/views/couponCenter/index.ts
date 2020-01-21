import { Component, Vue ,Inject} from 'vue-property-decorator'
import CouponView from '../../components/couponview.vue'
import api from "../../request/api";
import ConstKey from "../../until/const_key"
import {NavBar,Checkbox,Icon} from 'vant'
import { getdate,gettime } from '../../until/until'
Vue.use(NavBar).use(Checkbox).use(Icon)



@Component({
  name: 'Couponcenter',
  components:{
    CouponView
  }
})
export default class extends Vue {
    list:Array<any>=[]

    onClickLeft() {
      let that = (this as any)
      that.$router.go(-1);
    }
    created() {
      let that =(this as any)
      that.$fetch(
        api.getCouponActList
      ).then((res:any)=>{
        console.log('tag', res)
        let infolist = res.context
        infolist.map((info:any)=>{
          let coupon = {
          id:info.couponId,
          available: 1,
          condition: info.fullbuyType==0?'无门槛':'满'+info.fullbuyPrice+'元可用',
          reason: '',
          value: info.denomination*100,
          name:info.couponName,
          startAt: getdate('Y-m-d',info.startTime),
          endAt: getdate('Y-m-d',info.endTime),
          valueDesc: info.denomination,
          unitDesc: '円',
          description:info.goodsType==0?'通用券':info.goodsType==1?'单品券':'运费券',
          type:info.couponAmount-info.couponNum == 0?true:false
        }
        that.list.push(coupon)
        })
        
        


      })
    }

    

}