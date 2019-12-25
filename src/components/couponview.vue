<template>
  <div class="couponview-wrap">

<v-coupon :config="Config" class="main" v-for="(item,index) in list" :key="index">
  <div class="content">
    <h1>{{item.valueDesc+'円'}}</h1>
    <p class="desc">{{item.condition}}</p>
    <p class="name">{{'优惠券名称:'+item.name}}</p>
    <p class="type">{{'类型:'+item.description}}</p>
    <p class="date">{{'日期:'+item.startAt+'-'+item.endAt}}</p>
    <p class="button">
<van-button round  plain size='small'  color='rgba(237, 88, 33, 1)' @click="receive(item.id)">领取</van-button>
    </p>
    
  </div>
</v-coupon>

  </div>
</template>

<script lang="ts">
import api from "../request/api";
import { Vue,Prop ,Inject } from 'vue-property-decorator'
import {Button,Toast} from 'vant'
import Component from 'vue-class-component'
import { getdate,gettime } from '../until/until'
Vue.use(Button).use(Toast)

@Component({ 
  
  
})
export default class Couponview extends Vue {
 @Inject() 
 private reload = (this as any).reload 
 @Prop() 
 private list!:{
      type: Array<any>,
      required: true
    }


Config:object= {
    width: 150, // 卡券宽度
    height: 200, // 卡券高度
    borderRadius: 15, // 卡券四个角的圆角半径
    borderColor: 'rgba(237, 88, 33, 1)', // 边框颜色
    borderWidth: 0.5, // 边框粗细
    borderOpcity: 1, // 边框透明度
    borderDash: null, // 边框虚线数组, 直线是 null, 虚线的话给一个数组,如[2,2]
    showLine: true, // 是否显示分割线
    lineColor: '#ccc', // 分割线颜色
    lineWidth: 0.4, // 分割线粗细
    lineOpcity: 1, // 分割线透明度
    lineDash: [3, 5], // 分割线虚线数组, 同 边框虚线数组
    lineOffset: 5, // 分割线跟卡券两侧的距离, 为 0 则相连
    cutPosition: 150, // 裁切口的位置
    cutRadius: 10, // 裁切口的半径
    cutSlope: 1.5, // 裁切口的弧度
    background: '#eee' // 背景颜色, 优先级低于 slot 的背景
}
receive(id:string){
  let that = (this as any)
  that.$post(
    api.getCustomerCoupon,
    {
      couponIds:[id]
    }
  ).then((res:any)=>{
    console.log('tag', res)
    if (res.code=='500') {
      Toast(res.message)
    }else if (res.code=='200') {
      that.reload()
      Toast(res.context)
      
    }
  })
}

mounted() {
  
  
}
updated(){
  
  
  

}

}
</script>
<style lang="scss" scoped>
.couponview-wrap{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.main{
  margin-bottom: 20px;
  
  h1{
    text-align: center;
    font-size: 16px;
    color: rgba(237, 88, 33, 1);
  }
  .desc{
    text-align: center;
    color: rgba(237, 88, 33, 1);
    font-size: 14px;
  }
  .name{
    text-align: center;
    color: rgba(237, 88, 33, 1);
    font-size: 10px;
  }
  .type{
    text-align: center;
    color: rgba(237, 88, 33, 1);
    font-size: 10px;
  }
  .date{
    text-align: center;
    color: rgba(237, 88, 33, 1);
    font-size: 10px;
  }
  .button{
    text-align: center;
  }
}

</style>
