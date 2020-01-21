import api from "../../request/api";
import ConstKey from "../../until/const_key"
import Vue from "vue";
import {NavBar,Checkbox,Icon,Tab, Tabs} from 'vant'
Vue.use(NavBar).use(Checkbox).use(Icon).use(Tab).use(Tabs)
import Component from 'vue-class-component'
import { Inject } from 'vue-property-decorator'
// import img1 from '@s/img/shoucang2备份 2.png'
// import img2 from '@s/img/buxihuan.png'
@Component({

})
export default class Like extends Vue{
  @Inject() private reload = (this as any).reload
      active:string='1'
      type:string= "like"
      color:string= "rgba(237,88,33,1)"
      checked:Array<any>= []
      icon:object= {
        active: '../../../static/img/shoucang2.png',
        inactive: '../../../static/img/buxihuan.png'
      }
      likelist:Array<any>= []
      storeList:Array<any>= []

      godetail(id:any){
        let that = (this as any)
        console.log(id)
       window.localStorage.setItem("goodsInfoId", id);
      that.$router.push({
        name:'goods_detail',
        params:{
          goodsInfoId:id
        }
      })
    }
    goStoredetail(id:any){
      let that = (this as any)
      window.localStorage.setItem("storeId", id);
     that.$router.push({
       name:'store',
       params:{
        storeId:id
       }
     })
    }

    onClickLeft() {
      let that = (this as any)
      that.$router.go(-1);
    }
    tap() {
      console.log("tag");
      this.type = "like-o";
      this.color = "#ccc";
    }
    cancle(item:any,i:any) {
      let that = (this as any)
      let accountId = localStorage.getItem('accountid')
      let goodid = item.goodsId
      let cateId = item.cateId
      
     
        that.$post(
          api.cancelLike,
          {
            customerId:accountId,
            goodsId:goodid
          }
        ).then((res:any) => {
          console.log(res);
          if ((res.code = ConstKey.SUCCESS)) {
            this.reload();
            this.$toast(that.$t('like.cancel'));
          }
        })

   

}
    created() {
    for (let i = 1; i <= 100; i++) {
      this.checked.push(i);
    }
    }
   mounted() {
    let that = (this as any)

    that.$post(
      
      api.likeGoods,
      {
        customerId:localStorage.getItem('accountid')
      }
    ).then((res:any) => {
      console.log(res);
      this.likelist = res.context;
    });

    that.$post(
      
      api.getFllowStore,
      {
        customerId:localStorage.getItem('accountid')
      }
    ).then((res:any) => {
      console.log(res);
      this.storeList = res.context;
    });
  }
}

