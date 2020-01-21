<template>
  <div class="app-store">
    <div class="store-head">
      <div class="mask-container">
        <div class="mask"></div>
        <div class="store-head-bg" :style="{backgroundImage: 'url(' + storeInfo.storeSignH + ')'}"></div>
      </div>
      <div class="head-container">
        <div class="img-container" @click="goBack">
          <img src="../../../static/images/detail/back.png" alt />
        </div>
        <form action="/">
          <van-search
            v-model="searchValue"
            :placeholder="$t('store.search')"
            
            @input="onSearch"
          />
        </form>
      </div>
    </div>
    <div class="store-info">
      <div class="store-content">
        <div class="img-container">
          <img v-lazy="storeInfo.storeLogo" alt />
        </div>
        <div class="store-name">
          <div class="name">{{storeInfo.storeName}}</div>
          <div class="goods-no">
            <!-- <span>{{$t('store.China')}} |</span> -->
            <span>{{$t('store.goods')}}</span>
            
            <span>{{saleNum}}件</span>
           <!-- <van-checkbox
                  v-model="checked"
                  class="islike"
                  @change="cancle"
                  checked-color="#ED5D28"
                >
                フォロー
                </van-checkbox> -->
            
                <van-button class="isfocus" size="mini" type="warning" @click="cancle">{{isfocus?$t('newAdd.noFocus'):$t('newAdd.focus')}}</van-button>
          </div>
         
                  
          
        </div>
      </div>
    </div>
    <div class="store-goods">
      <van-tabs
        v-model="active"
        title-active-color="#ED5D28"
        color="#ED5D28"
        line-width="28px"
        @click="clickFather"
      >
        <van-tab
          v-for="(item,index) in tabList"
          :key="index"
          :title="(item.cateNameJp==null?item.cateName:item.cateNameJp)"
        >
          <div class="tabs-content">
            <van-tabs
              v-model="show"
              title-active-color="#ED5D28"
              color="#ED5D28"
              line-width="28px"
              @click="clickChild"
            >
              <van-tab v-for="(v,idx) in tabListChild" :key="idx">
                <div slot="title">
                  {{v.name}}
                  <van-icon name="arrow-up" :class="{'active':!isUp}" v-if="idx==1||idx==2" />
                  <van-icon name="arrow-down" :class="{'active':isUp}" v-if="idx==1||idx==2" />
                </div>
                <van-list
                  class="goods-list"
                  :loading-text="$t('supply.loadding')"
                  v-model="loading"
                  :finished="finished"
                  :immediate-check="false"
                  :finished-text="$t('threeClass.finished')"
                  @load="onLoad"
                >
                <!-- <div class="goods-list"> -->
                  <div
                    class="goods-item"
                    v-for="(m,inx) in goodsList"
                    :key="inx"
                    @click="goDetail(m)"
                  >
                    <div class="img-container">
                      <img v-lazy="m.goodsImg" alt />
                    </div>
                    <div class="goods-name">{{m.goodsName}}</div>
                    <div class="prices">
                      <div class="now-price">¥{{m.skuMarketPrice?m.skuMarketPrice:m.marketPrice}}</div>
                      <!-- <div class="line-price">
                        ¥{{m.goodsInfos[0].marketPrice}}
                        <p class="line"></p>
                      </div>-->
                    </div>
                  </div>
                  <!-- </div> -->
                </van-list>
              </van-tab>
            </van-tabs>
          </div>
        </van-tab>
      </van-tabs>
      <div class="store-go">
        <div class="jump line">
          <!-- <van-cell title="关于付款" is-link to="/" />
          <van-cell title="关于隐私" is-link to="/" />
          <van-cell title="关于营业时间" is-link to="/" />-->
          <van-cell :title="$t('store.aboutPay')" is-link to="about_pay" />
          <van-cell :title="$t('store.aboutInfo')" is-link to="about_privacy" />
          <van-cell :title="$t('store.aboutTimes')" is-link to="about_times" />
        </div>
        <div class="jump">
          <!-- <van-cell title="关于发货" is-link to="/" />
          <van-cell title="关于退换货" is-link to="/" />
          <van-cell title="关于联系人" is-link to="/" />-->
          <van-cell :title="$t('store.aboutDeliver')" is-link to="about_deliver" />
          <van-cell :title="$t('supply.aboutreturn')" is-link to="about_reback" />
          <van-cell :title="$t('store.aboutContant')" is-link @click="contant" />
        </div>
      </div>
      <div class="tabsFixed" v-if="isFixed">
        <div class="store-headT">
          <div class="head-container">
            <div class="img-container" @click="goBack">
              <img :src="img1" alt />
            </div>
            <form action="/">
              <van-search
                v-model="searchValue"
                :placeholder="$t('store.search')"
                disabled
                @click="onSearch"
              />
            </form>
          </div>
        </div>
        <van-tabs
          v-model="active"
          title-active-color="#ED5D28"
          color="#ED5D28"
          line-width="28px"
          @click="clickFather"
        >
          <van-tab
            v-for="(item,index) in tabList"
            :key="index"
            :title="(item.cateNameJp==null?item.cateName:item.cateNameJp)"
          >
            <div class="tabs-content">
              <van-tabs
                v-model="show"
                title-active-color="#ED5D28"
                color="#ED5D28"
                line-width="28px"
                @click="clickChild"
              >
                <van-tab v-for="(v,idx) in tabListChild" :key="idx">
                  <div slot="title">
                    {{v.name}}
                    <van-icon name="arrow-up" :class="{'active':!isUp}" v-if="idx==1||idx==2" />
                    <van-icon name="arrow-down" :class="{'active':isUp}" v-if="idx==1||idx==2" />
                  </div>
                </van-tab>
              </van-tabs>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="goTop" @click="goTop" v-if="isFixed">
      <img src="../../../static/images/index/zhiding.png" alt />
    </div>
  </div>
</template>

<script >
import api from "../../request/api";
import ConstKey from "../../until/const_key"
import Vue from "vue";
import { Search, Cell, Tab, Tabs, List, Toast ,Icon,Checkbox, CheckboxGroup,Button} from "vant";
Vue.use(Search).use(Cell).use(Tab).use(Tabs).use(List).use(Toast).use(Icon).use(Checkbox).use(CheckboxGroup).use(Button);
import Component from 'vue-class-component'

export default {
  name: "store",
  mounted() {
    let that = this;
    //滚动到顶部
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    })();
    //接收storeId
    that.storeId =that.$route.params.storeId || window.localStorage.getItem("storeId");
    //店铺信息
    that.getStoreData();
    //店铺分类信息
    that.getCateList();
    //商品信息
    that.getData();
    // that.isFollow()
    //页面滚动高度
    window.addEventListener("scroll", that.fixedHead);
  },
  components: {},
  data() {
    return {
      checked:false,
      
      img1:'../../../static/images/detail/back.png',
      storeId: null, //店铺ID
      storeInfo: {}, //店铺信息
      saleNum: 0, //在售商品数量
      pageNum: 1,
      searchValue: "",
      active: 0,
      keywords:'',
      show: 0,
      sortFlag: 'asc',
      storeCateIds: [],
      tabList: [{ storeCateId: 0, cateNameJp: this.$t("store.all") }],
      tabListChild: [{
          name: "総合"
        },
        
        {
          name: "价格"
        },
        {
          name: "レビュー数"
        }
      ],
      goodsList: [],

      loading: true,
      finished: false,
      isLoading: false, //是否进行上拉加载
      isFixed: false,
      isUp: false,
      bgImg: "../../../static/images/detail/back.png",
      sorted:0,
      sortOrder:'asc',
      msg:'关注',
      isfocus:true,
    };
  },
  methods: {
    //页面滚动高度
    fixedHead() {
      let that = this;
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll > 450) {
        that.isFixed = true;
      } else {
        that.isFixed = false;
      }
    },
    cancle(value){
      let that = this;
      
        
        that.$post(
          api.StoreFollow,
          {
            customerId:localStorage.getItem('accountid'),
            storeId:that.storeId
          }
        ).then(res=>{
          console.log(res)
          if (res.code == 200){
            that.isfocus = !that.isfocus 
          }
        })
      
    },
    clickFather(title) {
      console.log("------------点击父", title);
      let that = this;
      that.show = 0; //子级 重置第一个
      that.pageNum = 0;
      that.goodsList = [];
      that.finished = false;
      that.sortFlag = 0;
      that.loading = true;
      that.isLoading = false;
      //全部重置类型
      if (title > 0) {
        that.storeCateIds[0] = that.tabList[title].storeCateId;
      } else {
        that.storeCateIds = [];
      }
      that.getData();
    },
    clickChild(title) {
      console.log("---------------点击子", title);
      let that = this;
      that.pageNum = 1;
      that.goodsList = [];
      that.loading = true;
      that.finished = false;
      that.isLoading = false;
      switch (title) {
        case 0:
          that.sorted = 0;
          that.sortOrder = 'asc'
          break;
        case 1:
          if (that.isUp) {
            that.sorted = 1;
            that.sortOrder = 'asc'
            that.isUp = false;
          } else {
            that.sorted = 1;
            that.sortOrder = 'desc'
            that.isUp = true;
          }
          break;
        case 2:
          if (that.isUp) {
            that.sorted = 2;
            that.sortOrder = 'asc'
            that.isUp = false;
          } else {
            that.sorted = 2;
            that.sortOrder = 'desc'
            that.isUp = true;
          }
          break;
      }
      that.getData();
    },
    // 返回
    goBack() {
      let that = this;
      that.$router.back(-1);
    },
    //获取店铺信息
    getStoreData() {
      let that = this;
      that.$post(
          api.getStoreInfo,
          {
            customerId:localStorage.getItem('accountid'),
            storeId: that.storeId
          }
        ).then(res => {
          console.log("-------------店铺信息--res", res);
          if (res.code == ConstKey.SUCCESS) {
            that.storeInfo = res.context.store;
            that.bgImg ="../../../static/images/detail/bg.png";
            
            that.isfocus =  res.context.follow.isFollow ==0?false:true
          } else {
            Toast(res.message);
          }
        });
    },
    //获取店铺商品列表
    getData() {
      let that = this;
      that.$post(
          
          api.getGoods,
          {
            storeId: that.storeId,
            cateId: "",
            keywords: that.keywords,
            pageNumber: that.pageNum,
            pageSize: 8,
            sortOrder: that.sortOrder,
            sorted: that.sorted,
          }
        )
        .then(res => {
          console.log("-------------商品分页--res", res);
          that.isLoading = true;
          if (res.code == ConstKey.SUCCESS) {
           
            let esList = res.context.data;
            that.goodsList = that.goodsList.concat(esList);
            that.saleNum = res.context.totalRow;
            
            // 数据全部加载完成
            if (res.context.lastPage) {
              that.finished = true;
             
            }
            that.loading = false;
          } else {
            // 加载状态结束
            that.loading = false;
            Toast(res.message);
          }
        });
    },
    //上拉加载
    onLoad() {
      let that = this;
      console.log("----------that.pageNum111", that.pageNum);
      //异步更新数据
      if (that.isLoading) {
        setTimeout(() => {
          that.pageNum++
          that.getData();
        }, 500);
      }
    },
    //获取店铺分类
    getCateList() {
      let that = this;
      that.$post(
          
          api.getStoreCate,
         {
            storeId: that.storeId
          }
        ).then(res => {
          console.log("-------------店铺分类--res", res);
          if (res.code == ConstKey.SUCCESS) {
            that.tabList = that.tabList.concat(res.context);
            if (res.context.length > 0) {
              that.storeCateIds.push(that.tabList[1].storeCateId);
            }
          } else {
            Toast(res.message);
          }
        });
    },
    //是否关注
    isFollow(){
      this.$post(
        api.isFollow,
        {
          storeId:this.storeId,
          customerId:localStorage.getItem('accountid')
        }
      ).then(res => {
        console.log(res)
      })
    },
    //跳转详情
    goDetail: function(item) {
      let that = this;
      console.log(item)
      let goodsInfoId = item.goodsId;
      window.localStorage.setItem("goodsInfoId", goodsInfoId);
      that.$router.push({
        name: "goods_detail",
        params: {
          goodsInfoId: goodsInfoId
        }
      });
    },
    onSearch() {
      this.goodsList = []
      this.keywords = this.searchValue
      this.getData()
      // console.log("---------搜索");
      // this.$router.push("/search");
    },
    contant() {
      let that = this;
      that.$router.push({
        name: "about_contant",
        params: {
          storeId: that.storeId
        }
      });
    },
    //回到顶部
    goTop() {
      //动画版回到顶部
      setTimeout(() => {
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      }, 100);
    }
  }
};
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
  .store-head {
    height: 125px;
    position: relative;
    // background: url("../../static/images/detail/bg.jpg") no-repeat;
    .mask-container {
      width: 100%;
      height: 125px;
      .mask {
        width: 100%;
        height: 100%;
        background: rgba(153, 153, 153, 0.6);
        position: absolute;
        top: 0;
      }
      .store-head-bg {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .head-container {
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 13px 10px;
      position: absolute;
      top: 0;
      z-index: 10;

      .img-container {
        width: 31px;
        height: 31px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .van-search {
        width: 320px;
        margin: 0 auto;
        background-color: transparent !important;
        .van-search__content {
          background: rgba(255, 255, 255, 0.5);
          .van-icon {
            color: #f9f9f9;
          }
          .van-field__body {
            input {
              color: #f9f9f9;
            }
            input::-webkit-input-placeholder {
              color: #f9f9f9;
            }
          }
        }
      }
    }
  }
  .store-headT {
    padding: 0 10px;
    background: #fff;
    .head-container {
      display: flex;
      justify-content: start;
      align-items: center;
      .img-container {
        width: 31px;
        height: 31px;
        margin-left: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .van-search {
        width: 310px;
        margin: 0 auto;
        padding-right: 10px;
        background-color: transparent !important;
        .van-search__content {
          background: #f2f2f2;
          .van-icon {
            color: #d2d2d2;
          }
          .van-field__body {
            input {
              color: #d2d2d2;
            }
            input::-webkit-input-placeholder {
              color: #d2d2d2;
            }
          }
        }
      }
    }
  }
  .store-info {
    position: relative;
    background: #fff;
    margin-bottom: 10px;
    height: 75px;
    background: #fff;
  }
  .store-content {
    // width: 100%;
    padding: 0 15px;
    display: flex;
    justify-content: start;
    align-items: center;
    position: absolute;
    top: -10px;
    box-sizing: border-box;
    .img-container {
      width: 78px;
      height: 78px;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .store-name {
      width: 240px;
      .name {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: 5px;
      }
      .goods-no {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
  .store-go {
    display: flex;
    justify-content: space-between;
    padding-top: 60px;
    padding-bottom: 10px;
    .jump {
      width: 49%;
      .van-cell {
        padding-right: 5px;
      }
    }
    .line {
      border-right: 1px solid #ececec;
    }
  }
  .store-goods {
    background: #fff;
    .van-tabs__wrap {
      .van-tabs__nav {
        .van-tab {
          flex-basis: 35% !important;
          .van-ellipsis {
            display: inline-block;
            width: auto;
          }
        }
      }
    }
    .tabs-content {
      padding: 0 15px;
      background: #fff;
      .active {
        color: #7d7d7d;
      }
      .van-tabs__line {
        display: none;
      }
      .goods-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
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
              top: -4px;
              left: 0;
            }
          }
        }
        .van-list__finished-text {
          width: 100%;
          position: absolute;
          bottom: -50px;
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
  .goTop {
    position: fixed;
    bottom: 60px;
    right: 10px;
    width: 43px;
    height: 43px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.isfocus{
  margin-top: 3px;
 
  font-size: 10px;
  font-family: PingFangSC-Regular;
  position: relative;
  left: 127px;
  bottom: 30px;
}
</style>

