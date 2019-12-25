<template>
  <div class="app-footer">
    <van-tabbar route v-model="activ" active-color="#ED5821">
      <van-tabbar-item to="/" icon="home-o">
        <span>{{$t('supply.home')}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon0.active : icon0.normal" />
      </van-tabbar-item>
      <van-tabbar-item to="/classification" icon="search">
        <span>{{$t('supply.class')}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon1.active : icon1.normal" />
      </van-tabbar-item>
      <van-tabbar-item to="/cart" icon="friends-o">
        <span>{{$t('supply.cart')}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon2.active : icon2.normal" />
      </van-tabbar-item>
      <van-tabbar-item to="/usermain"  icon="setting-o">
        <span>{{$t('supply.person')}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon3.active : icon3.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";

import { Search, Swipe, SwipeItem, Tabbar, TabbarItem } from "vant";
Vue.use(Search).use(Swipe).use(SwipeItem).use(Tabbar).use(TabbarItem)
import img1 from '@s/images/foot/shouye.png'
import img2 from '@s/images/foot/shouye2.png'
import img3 from '@s/images/foot/fenlei.png'
import img4 from '@s/images/foot/fenlei2.png'
import img5 from '@s/images/foot/gouwuche.png'
import img6 from '@s/images/foot/gouwuche2.png'
import img7 from '@s/images/foot/wode.png'
import img8 from '@s/images/foot/wode2.png'

import Component from 'vue-class-component'

@Component({
props: {
    active: String
}
})

export default class Footer extends Vue{
      //data

    public activ:String='0'
    public icon0:object= {
        normal:img1,
        active:img2
      }
     public  icon1:object= {
        normal: img3,
        active: img4
      }
     public  icon2:object={
        normal: img5,
        active: img6
      }
     public  icon3:object= {
        normal: img7,
        active: img8
      }
      //
  created() {
    let that = (this as any)
    that.avtiv = that.active
  }


}

// export default {
//   name: "navFoot",
//   props: ['active'],
//   mounted() {
//     let that = this;
//   },
//   watch: {
//     // active(val) {
//     //   console.log("---------val", val);
//     //   this.active=val
//     // }
//   },
//   components: {
    
//   },
//   data() {
//     return {
//       // action:this.active,
//       icon0: {
//         normal:img1,
//         active: img2
//       },
//       icon1: {
//         normal: img3,
//         active: img4
//       },
//       icon2: {
//         normal: img5,
//         active: img6
//       },
//       icon3: {
//         normal: img7,
//         active: img8
//       }
//     };
//   },
//   methods: {

//   }
// };
</script>

<style lang="scss">
.app-footer {
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 49px;
  line-height: 49px;
  box-sizing: border-box;
  background: #ffffff;
  .foot-list {
    display: flex;
    justify-content: space-around;
    .foot-item {
      text-align: center;
      .img-container {
        width: 23px;
        height: 23px;
        margin: 0 auto;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        line-height: 32px;
      }
    }
  }
}
</style>

