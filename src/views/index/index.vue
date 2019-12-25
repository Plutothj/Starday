<template>
<div class="index">
  <van-loading class="jsLoading" size="24px" type="spinner" v-if="showLoading=='true'">{{$t('supply.loadding')}}...</van-loading>
  <div :class="{'closePadding':!isClose}">
    <div class="header">
      <img :src="logoUrl" width="100%" />
    </div>
    <div class="search_container">
      <div class="search">
        <form action="/">
          <van-search v-model="searchValue" :placeholder="$t('supply.p4')" @click="goSearch" disabled="true" />
        </form>
      </div>
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in bannerList" :key="index">
            <van-image width="94%" height="161" :src='item.img'  @click="goLinkUrl(item,index)" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="shopContainer">
      <van-grid :column-num="4" square icon-size='50px' clickable :border='false'>
        <van-grid-item v-for="(item,index) in shopList" :key="index" :icon="item.cateImg" :text="item.cateName" />
      </van-grid>

    <div class="movement-container">
        <p class="module-name">{{activityList.title}}</p>
        <ul class="movement-list" id="movement-list">
          <li class="movement-item" v-for="(item,index) in activityList.details" :key="index"  @click="goLinkUrl(item)">
            <div class="img-container">
              <img class="activityimg" v-lazy="WebpToJpg(item.img)" />
            </div>
          </li>
        </ul>
        <div class="showMore" @click="moreMove(item)">
          <p>{{$t('index.viewmore')}}</p>
          <div class="img-container">
            <img src="../../../static/images/index/more.png" alt />
          </div>
        </div>
      </div>

    

      <div class="movement-container" v-for="(main_item,index) in subGoodsList" :key="index">
        <p class="module-name">{{main_item.title}}</p>
        <ul class="movement-list">
          <li class="movement-item" v-for="(item,index) in main_item.details" :key="index" @click="goLinkUrl(item)">
            <div class="img-container">
              <img v-lazy="WebpToJpg(item.img)" />
            </div>
            <div v-if="item.goods !== null">
              <div class="goods-name">
                {{item.goods.goodsName}}
              </div>
              <div class="now-price" >
                <p class="price">￥{{item.marketPrice}}</p>
                <div class="tips">
                  <img src="../../../static/images/index/tips.png" alt />
                </div>
              </div>
                <!-- <div class="foot-price">
                  <div class="price">
                    ￥
                    <p class="line"></p>
                  </div>
                  <div class="tips">
                    <img src="../../../static/images/index/pr.png" alt />
                  </div>
                </div> -->
              </div>
            

          </li>
        </ul>
        <div class="showMore" @click="moreMove(main_item)">
          <p>{{$t('index.viewmore')}}</p>
          <div class="img-container">
            <img src="../../../static/images/index/more.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showTop" class="goTop" @click="goTop">
    <img src="../../../static/images/index/zhiding.png" alt />
  </div>
  <navFoot :active="active"></navFoot>
  <!-- <div class="load" v-if="!isClose">
      <van-icon class="close" name="close" @click="closeLoad"/>
      <div class="tips">
        <div class="icon-img"></div>
        <div class="tipsText">{{$t('index.loadTips')}}</div>
      </div>
      <div class="load-it" @click="goLoad">{{$t('index.loadText')}}</div>
    </div>-->
</div>
</template>

<script src='./index.ts'>


// export default {
//   name: "index",

//   components: {
//     navFoot,
    

//   },
//   computed: {
//     showLoading(val) {
//       console.log("------val", val);
//       return window.localStorage.getItem("showLoad");
//     }
//   },
//   data() {
//     return {
//       logoUrl: "../../../static/images/index/logo.png",
//       searchValue: "",
//       showHeight: 440,
//       ismoreR: false,
//       bannerList: [], //轮播图
//       cloneRecommenList: [], //轮播数组复制
//       shopList: [],
//       recommenList: [],
//       subGoodsList: [],
//       showTop: false,
//       isClose: false,
//       colist: [],
//       plist: [],
//       IndexData: []
//       // showLoading: window.localStorage.getItem('showLoad')
//     };
//   },
//   mounted() {
//     let that = this;
//     that.getBanner();
//     that.getsubGoodsList();

//     //页面滚动高度
//     window.addEventListener("scroll", that.fixedHead);
//     if (that.checkIsH5Plus()) {
//       //app内部隐藏
//       that.isClose = true;
//     } else {
//       that.isClose = false;
//     }
//     this.$fetch(

//       api.HomeCate
//     ).then(res => {
//       console.log(res.context.slice(1, 9))
//       this.shopList = res.context.slice(1, 9)
//     })
//     this.getData()

//   },
//   methods: {
//     getData() {
//       let that = this
//       that.$post(
//         api.HomeData
//       ).then(res => {

//         that.IndexData = res.context
//         console.log(that.IndexData)
//         that.IndexData.map(item => {
//           if (item.type === 0) {
//             that.bannerList.push(...item.components.details)
//             console.log('>>>>>>>>>>', that.bannerList);
//           } else {
//             that.subGoodsList.push(item.components)
//             console.log('', that.subGoodsList);
//           }
//         })
//       })
//     },
//     // 点击搜索
//     goSearch: function() {
//       console.log("---------去搜索");
//       this.$router.push("/search");
//     },
//     // 更多推荐
//     moreRecommen: function() {
//       console.log("----------更多推荐");
//       let that = this;
//       if (that.recommenList.length > 4) {
//         that.recommenList = that.recommenList.slice(0, 4);
//       } else {
//         that.recommenList = that.cloneRecommenList;
//       }
//     },
//     //主题商品广告位
//     getsubGoodsList: function() {
//       // this.$axios({
//       //   method: "get",
//       //   url: api.shortUrl + "mobile_goods_subads.json?" + new Date().getMinutes(),
//       //   data: {}
//       // }).then(res => {
//       //   console.log("------------主题商品广告位-res-", res);
//       //   if (res.status == "200") {
//       //     if (res.data && res.data.length > 0) {
//       //       this.subGoodsList = res.data;
//       //       //为展示效果 将价格去掉小数点
//       //       this.subGoodsList.forEach(e => {
//       //         e.goodslist.forEach(k => {
//       //           k.price = parseFloat(k.price);
//       //           k.marketprice = parseFloat(k.marketprice);
//       //         });
//       //       });
//       //     }
//       //   } else {
//       //     Toast(res.statusText);
//       //   }
//       // });
//     },
//     //banner广告位
//     getBanner() {


//     },
//     //专题商品查看更多
//     moreMove: function(item) {
//       window.location.href = item.sublink;
//     },

//     //广告位转向
//     // goLinkUrl: function(item, index) {
//     //   console.log(item);
//     //   let that = this;
//     //   // if (index == '0'){
//     //   //       that.$router.push({
//     //   //         name:'oldman',
//     //   //         query: {
//     //   //           id:0
//     //   //         }
//     //   //       });
//     //   // }else if(index == '1') {
//     //   //     that.$router.push({
//     //   //         name:'oldman',
//     //   //         query: {
//     //   //           id:1
//     //   //         }
//     //   //       });
//     //   // } else if (item.img == 'https://sanyi-x-site.oss-cn-hongkong.aliyuncs.com/temp_imgs/201908280925307114.jpg') {
//     //   //   that.$router.push({
//     //   //         name:'oldman',
//     //   //         query: {
//     //   //           id:3
//     //   //         }
//     //   //       });
//     //   // } else

//     //   if (that.checkIsH5Plus() && that.checkIsIOS()) {
//     //     var url = item.url;
//     //     //截取Key值
//     //     var index = url.lastIndexOf("/");
//     //     var keystr = url.substring(index + 1, url.length);
//     //     console.log("key====", keystr);
//     //     console.log("url=====", url);

//     //     if (url.indexOf("/category/goodlist/") > -1) {
//     //       //分类
//     //       that.$router.push({
//     //         name: "categorygoodlist",
//     //         params: { cid: keystr }
//     //       });
//     //     } else if (url.indexOf("/#/goods-detail/") > -1) {
//     //       //商品详情
//     //       that.$router.push({
//     //         name: "goods_detail",
//     //         params: { id: keystr }
//     //       });
//     //     } else if (url.indexOf("/#/activity/") > -1) {
//     //       //活动页
//     //       that.$router.push({
//     //         name: "activity",
//     //         params: { id: keystr }
//     //       });
//     //     }
//     //   } else {
//     //     window.location.href = item.url;
//     //   }
//     // },
//
//     goLinkUrl1(item) {
//       // let that = this;

//       // if (that.checkIsH5Plus() && that.checkIsIOS()) {
//       //   var url = item.url;
//       //   //截取Key值
//       //   var index = url.lastIndexOf("\/");
//       //   var keystr = url.substring(index + 1, url.length);
//       //   console.log('key====', keystr)
//       //   console.log('url=====', url)

//       //   if (url.indexOf("/category/goodlist/") > -1) { //分类
//       //     that.$router.push({
//       //       name: "categorygoodlist",
//       //       params: {
//       //         cid: keystr
//       //       }
//       //     });
//       //   } else if (url.indexOf("/#/goods-detail/") > -1) { //商品详情
//       //     that.$router.push({
//       //       name: "goods_detail",
//       //       params: {
//       //         id: keystr
//       //       }
//       //     });
//       //   } else if (url.indexOf("/#/activity/") > -1) { //活动页
//       //     that.$router.push({
//       //       name: "activity",
//       //       params: {
//       //         id: keystr
//       //       }
//       //     });
//       //   }

//       // } else {
//       //   window.location.href = item.url;
//       // }
//       // console.log(item)
//     },
//     //回到顶部
//     goTop() {
//       //动画版回到顶部
//       setTimeout(() => {
//         (function smoothscroll() {
//           var currentScroll =
//             document.documentElement.scrollTop || document.body.scrollTop;
//           if (currentScroll > 0) {
//             window.requestAnimationFrame(smoothscroll);
//             window.scrollTo(0, currentScroll - currentScroll / 5);
//           }
//         })();
//       }, 100);
//     },
//     //页面滚动高度
//     fixedHead() {
//       let that = this;
//       let scroll =
//         document.documentElement.scrollTop || document.body.scrollTop;
//       if (scroll > 150) {
//         that.showTop = true;
//       } else {
//         that.showTop = false;
//       }
//     },
//     //关闭下载提示
//     closeLoad() {
//       let that = this;
//       that.isClose = true;
//     },
//     //下载app
//     goLoad() {}
//   }
// };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import './index.scss'
</style>

