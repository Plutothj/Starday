<template>
  <div class="app-store">
    <van-nav-bar class="store-title" :title="searchValue" left-arrow @click-left="goBack">
      <div slot="right" class="title-right">
        <div class="img-container right" @click="goSearch">
          <img src="../../../static/images/index/search.png" alt />
        </div>
        <div class="img-container" @click="goCart">
          <img src="../../../static/images/index/car.png" alt />
        </div>
        <div class="info">{{carNum}}</div>
      </div>
    </van-nav-bar>
    <div class="store-goods">
      <div class="tabs-content">
        <van-tabs
          v-model="show"
          title-active-color="#ED5D28"
          color="#ED5D28"
          line-width="28px"
          @click="clickChild"
        >
          <van-tab v-for="(v,idx) in tabListChild" :key="idx" :title="v.name">
            <van-list
              class="goods-list"
              :loading-text="$t('supply.loadding')"
              v-model="loading"
              :finished="finished"
              :immediate-check="false"
              :finished-text="$t('threeClass.finished')"
              @load="onLoad"
            >
              <div class="goods-item" v-for="(m,inx) in goodsList" :key="inx" @click="goDetail(m)">
                <div class="img-container">
                  <img v-lazy="m.goodsImg" alt />
                </div>
                <div class="goods-name">{{m.goodsName}}</div>
                <div class="prices">
                  <div class="now-price">¥{{m.skuMarketPrice}}</div>
                  <!-- <div class="line-price">
                        ¥{{m.goodsInfos[0].marketPrice}}
                        <p class="line"></p>
                  </div>-->
                </div>
              </div>
            </van-list>
          </van-tab>
        </van-tabs>
      </div>

      <div class="tabsFixed" v-if="isFixed">
        <div class="tabs-content">
          <van-tabs
            v-model="show"
            title-active-color="#ED5D28"
            color="#ED5D28"
            line-width="28px"
            @click="clickChild"
          >
            <Tab v-for="(v,idx) in tabListChild" :key="idx" :title="v.name"></Tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { NavBar, Tab, Tabs, List, Toast } from "vant";
import api from "../../request/api";
import ConstKey from "../../until/const_key";
import Component from 'vue-class-component'
Vue.use(NavBar).use(Tab).use(Tabs).use(List).use(Toast)

@Component({

})

export default class SearchResult extends Vue{
      searchValue:String= ""
      active:Number=0
      show:Number= 0
      carNum:Number=0
      tabListChild:Object= [
        { name: "総合" },
        { name: "最新" },
        { name: "販売量" },
        { name: "価格" }
      ]
      goodsList:Array<any> = []
      cateId:String= ""//分类ID
      pageNum:Number= 1
      pageSize:Number= 20
      sortFlag:Number= 0
      loading:Boolean= false
      finished:Boolean= false
      isLoading:Boolean= false//是否进行上拉加载
      isFixed:Boolean= false


       //method
           //页面滚动高度
    fixedHead() {
      let that = this;
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll > 150) {
        that.isFixed = true;
      } else {
        that.isFixed = false;
      }
    }
    clickChild(title:any) {
      console.log("---------------点击子", title);
      let that = this;
      that.pageNum = 0;
      that.goodsList = [];
      that.finished = false;
      that.isLoading = false;
      switch (title) {
        case 0:
          that.sortFlag = 0;
          break;
        case 1:
          that.sortFlag = 1;
          break;
        case 2:
          that.sortFlag = 4;
          break;
        case 3:
          that.sortFlag = 3;
          break;
      }
      that.getData();
    }

    //获取页面信息
    getData() {
      let that = (this as any);
      
      //获取同级分类信息
      // if (!this.checkIsLogin()) {
        that.$post(
            
            api.SearchGoods,
            {
              
              goodsCateId: "",
              keywords:  that.searchValue,
              pageNumber:that. pageNum,
              pageSize: that.pageSize,
              sortOrder: "asc",
              sorted: that.sortFlag,
            }
          )
          .then((res:any) => {
            console.log("-------------未登录-查询--res", res);
            if (res.code == ConstKey.SUCCESS) {
              that.isLoading = true;
              let esList = res.context.data;
              // that.goodsList = that.goodsList.concat(esList);
              that.goodsList = res.context.data;
              // 数据全部加载完成
              if (res.context.lastPage) {
                that.finished = true;
              }
              // 加载状态结束
              that.loading = false;
            } else {
              // 加载状态结束
              that.loading = false;
              Toast(res.data.message);
            }
          });
      // } else {
      //   that.$axios({
      //       method: "post",
      //       url: api.SearchGoods,
      //       data: {
              
      //         pageNum: that.pageNum,
      //         pageSize: ConstKey.PAGE_SIZE,
      //         keywords: that.searchValue
      //       }
      //     })
      //     .then(res => {
      //       console.log("-------------登录-查询--res", res);
      //       if (res.data.code == ConstKey.SUCCESS) {
      //         that.isLoading = true;
      //         let esList = res.data.context.esGoods.content;
      //         that.goodsList = that.goodsList.concat(esList);
      //         // 数据全部加载完成
      //         if (res.data.context.esGoods.last) {
      //           that.finished = true;
      //         }
      //         // 加载状态结束
      //         that.loading = false;
      //       } else {
      //         // 加载状态结束
      //         that.loading = false;
      //         Toast(res.data.message);
      //       }
      //     });
      // }
    }
    //上拉加载
    onLoad() {
      let that = (this as any);
      console.log("----------that.pageNum111", that.pageNum);
      // 异步更新数据
      if (that.isLoading) {
        setTimeout(() => {
          that.pageNum++;
          that.getData();
        }, 500);
      }
    }
    //获取购物车数量
    getMiniPurchases() {
      // //未登录不读取
      // if (!this.checkIsLogin()) {
      //   return;
      // }
      // let that = this;
      // that
      //   .$axios({
      //     method: "post",
      //     url: "site/miniPurchases",
      //     data: {}
      //   })
      //   .then(res => {
      //     console.log("-------------mini购物车--res", res);
      //     if (res.data.code == ConstKey.SUCCESS) {
      //       that.carNum = res.data.context.num;
      //     } else {
      //       Toast(res.data.message);
      //     }
      //   });
    }
    // 返回
    goBack(){
      let that = (this as any);
      that.$router.back(-1);
    }
    //跳转详情
    goDetail(item:any) {
      let that = (this as any);
      let goodsInfoId = item.goodsInfos[0].goodsId;
      window.localStorage.setItem("goodsInfoId", goodsInfoId);
      that.$router.push({
        name: "goods_detail",
        params: {
          goodsInfoId: goodsInfoId
        }
      });
    }
    //跳转搜索页
    goSearch() {
      (this as any).$router.push("/search");
    }
    //跳转购物车
    goCart() {
      (this as any).$router.push("/cart");
    }
  

  mounted(){
    let that = (this as any);
    that.searchValue = that.$route.params.keyword;
    console.log('tag', that.$route.params)
    //mini购物车
    that.getMiniPurchases();
    //商品信息
    that.getData();
    //页面滚动高度
    window.addEventListener("scroll", that.fixedHead);
    // that.$axios({
    //         method:'post',
    //         url:api.SearchGoods,
    //         data:{
              
    //           goodsCateId: "",
    //           keywords:  that.searchValue,
    //           pageNumber: 1,
    //           pageSize: 10,
    //           sortOrder: "asc",
    //           sorted: 0,
    //         }
    //       })
    //       .then((res:any) => {
    //         console.log("-------------未登录-查询--res", res);
    //         if (res.code == ConstKey.SUCCESS) {
    //           that.isLoading = true;
    //           let esList = res.context.data;
    //           that.goodsList = that.goodsList.concat(esList);
    //           // 数据全部加载完成
    //           if (res.context.lastPage) {
    //             that.finished = true;
    //           }
    //           // 加载状态结束
    //           that.loading = false;
    //         } else {
    //           // 加载状态结束
    //           that.loading = false;
    //           Toast(res.data.message);
    //         }
    //       });
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.app-store {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  text-align: left;
  .clear::after {
    content: "";
    display: block;
    clear: both;
  }
  .store-title {
    position: relative;
    .van-nav-bar__left .van-icon {
      color: #7d7d7d;
    }
    .title-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 20px;
      right: 0;
      .img-container {
        width: 20px;
        height: 20px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        margin-right: 10px;
      }
      .info {
        width: 13px;
        height: 13px;
        line-height: 13px;
        text-align: center;
        border-radius: 50%;
        overflow: hidden;
        background: rgba(237, 88, 33, 1);
        font-size: 9px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        position: absolute;
        top: 6px;
        right: -6px;
      }
    }
  }
  .store-goods {
    background: #fff;
    .tabs-content {
      padding: 0 15px;
      .goods-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 50px;
        padding-top: 10px;
        .goods-item {
          width: 48%;
          margin-bottom: 10px;
          .img-container {
            width: 173px;
            height: 173px;
            border-radius: 5px;
            overflow: hidden;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .goods-name {
            height: 40px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
            margin: 10px 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .prices {
            display: flex;
            justify-content: start;
            align-items: baseline;
            .now-price {
              font-size: 17px;
              font-family: DINAlternate-Bold;
              font-weight: bold;
              color: rgba(237, 88, 33, 1);
            }
            .line-price {
              font-size: 11px;
              font-family: DINAlternate-Bold;
              font-weight: bold;
              color: rgba(153, 153, 153, 1);
              position: relative;
              margin-left: 5px;
            }
            .line {
              width: 100%;
              height: 1px;
              background: rgba(153, 153, 153, 1);
              position: absolute;
              top: -5px;
              left: 0;
            }
          }
        }
        .van-list__finished-text {
          width: 100%;
          position: absolute;
          bottom: 0;
        }
        .van-list__loading {
          width: 100%;
          text-align: center;
        }
      }
    }
    .tabsFixed {
      width: 100%;
      position: fixed;
      top: 0;
    }
  }
}
</style>

