<template>
  <div class="app-comment">
    <van-nav-bar class="nav" :title="$t('commont.rate')" left-arrow @click-left="onClickLeft" />
    <div class="rate-container" v-if="!isEmpty">
      <div class="rate-left">{{$t('commentlist.rate')}}</div>
      <van-rate v-model="value" readonly />
      <div class="rate-right">{{$t('commentlist.goodrate')}}</div>
    </div>
    <van-list
      class="rate-list"
      :loading-text="$t('supply.loadding')"
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      :finished-text="$t('threeClass.finished')"
      @load="onLoad"
      v-if="!isEmpty"
    >
      <div class="rate-item" v-for="(item,index) in rateList" :key="index">
        <div class="item-head">
          <div class="img-container">
            <img v-lazy="item.headImg" alt />
          </div>
          <div class="name" v-if="item.isShow==0">{{item.name}}</div>
          <div class="name" v-if="item.isShow==1">匿名</div>
          <van-rate v-model="item.evaluateScore" readonly />
        </div>
        <div class="rate-time">
          <span class="time">{{item.evaluateTime}}</span>
          <span>{{item.specDetails}}</span>
        </div>
        <div class="comment-text">{{item.evaluateContent}}</div>
        <!-- <ul class="img-list">
          <li class="img-item" v-for="(v,idx) in item.evaluateImageList" :key="idx">
            <img v-lazy="v.imgUrl" alt />
          </li>
        </ul> -->
      </div>
    </van-list>
     <div v-if="isFixed" class="goTop" @click="goTop">
      <img src="../../../static/images/index/zhiding.png" alt />
    </div>
    <!-- 空白页 -->
    <Empty v-if="isEmpty" :isGoods="false"></Empty>
  </div>
</template>

<script>
import api from "../../request/api";
import Vue from "vue";
import { NavBar, Rate, List } from "vant";
import Empty from "../empty/empty.vue";
import {getdate,gettime} from '../../until/until'
Vue.use(NavBar).use(Rate).use(List)
export default {
  name: "comment",
  mounted() {
    let that = this;
    that.goodsId = that.$route.params.goodsId;
    // 获取评论列表
    that.getData();
    //页面滚动高度
    window.addEventListener("scroll", that.fixedHead);
  },
  components: {
    Empty
  },
  data() {
    return {
      goodsId: null,
      value: 5, //评分
      rateList: [],
      pageNum: 0,
      loading: true,
      finished: false,
      isLoading: false, //是否进行上拉加载
      isUp: false,
      isFixed:false,
      isEmpty:false,
      pageSize:5
    };
  },
  methods: {
    onClickLeft() {
      let that = this;
      that.$router.back(-1);
    },
    //获取评论列表
    getData() {
      let that = this;
      that.$post(
         
          `api/goods/spuGetGoodsEvaluatePage/?index=${that.pageNum}&size=${that.pageSize}`,
          {
            
            goodsId:  that.goodsId,
            
            
          }
        )
        .then(res => {
          console.log("-------------获取评论列表--分页--res", res);
          if (res.code == "200") {
            that.isLoading = true;
            that.rateList = that.rateList.concat(res.context.list);
            that.rateList.map(item=>{
                item.evaluateTime= getdate("Y-m-d",item.evaluateTime*10)
            })
            if(that.rateList.length==0){
              that.isEmpty=true;
            }else{
              that.isEmpty=false;
              that.rateList.map(item=>{
                item.evaluateTime= getdate("Y-m-d",item.evaluateTime*10)
              })
            }
            if (res.context.list.length == 0) {
              that.finished = true;
            }
            // 加载状态结束
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
      // 异步更新数据
      if (that.isLoading) {
        setTimeout(() => {
          that.pageNum++;
          that.getData();
        }, 500);
      }
    },
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
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.app-comment {
  width: 100%;
  height: 100%;
  background: #fff;
  
 
  .clear::after {
    content: "";
    display: block;
    clear: both;
  }
  .van-icon {
    color: #838383;
  }
  .rate-container {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 20px 15px;
    .rate-left {
      margin-right: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .rate-right {
      margin-left: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .rate-list {
    padding: 0 15px 20px;
    .rate-item {
      width: 100%;
      padding: 13px 0;
      border-bottom: 1px solid #ebebeb;
      .item-head {
        display: flex;
        justify-content: start;
        align-items: center;
        .img-container {
          width: 37px;
          height: 37px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-left: 5px;
          margin-right: 10px;
        }
      }
      .rate-time {
        display: flex;
        justify-content: start;
        align-items: center;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        .time {
          margin: 6px 20px 6px 0;
        }
      }
      .comment-text {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        text-align: left;
        margin-bottom: 12px;
      }
      .img-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;
        .img-item {
          width: 110px;
          height: 110px;
          margin-right: 4px;
          margin-bottom: 4px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
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
</style>

