<template>
  <div class="app-activity">
    <div>
      <div class="goBack" @click="goBack">
        <img src="../../../static/images/detail/back.png" alt />
      </div>
      <div class="top-img" >
        <img :src='src' alt />
        <!-- <img v-lazy="headerUrl" alt /> -->
      </div>
      <div class="shopContainer">
        <div class="movement-container" v-if="showStore">
          
          <div class="shop-list">
            <ul class="movement-list">
              <li
                class="movement-item"
                v-for="(item,index) in shopList"
                :key="index"
                @click="goStore(item)"
              >
                <div class="img-container">
                  <img v-lazy="item.storeImg" alt />
                </div>
                <div class="goods-name">{{item.storeName}}</div>
                <!-- <div class="tips">需求文字描述</div> -->
              </li>
            </ul>
          </div>
        </div>
        <div class="movement-container">
          <div class="name-container">
            <div class="bowen">
              <img src="../../../static/images/activity/bowen.png" alt />
            </div>
            <p class="module-name">{{title}}</p>
            <div class="bowen">
              <img src="../../../static/images/activity/bowen.png" alt />
            </div>
          </div>
          <ul >
            <van-list
            v-model="loading"
            :loading-text="$t('supply.loadding')"
            :finished="finished"
            :finished-text="$t('threeClass.finished')"
            @load="onLoad"
            class="goods-list"
          >
            <li
              class="goods-item"
              v-for="(item,index) in list"
              :key="index"
              @click="goDetail(item)"
            >
              <div class="img-container">
                <img v-lazy="item.goodsImg" alt />
              </div>
              <div class="goods-info">
                <div class="goods-name">{{item.goodsName}}</div>
                <div class="now-price">
                  <p class="price">￥{{item.marketPrice}}</p>
                  <div class="tips">
                    <img src="../../../static/images/index/tips.png" alt />
                  </div>
                </div>
                <div class="foot-price" >
                  <div class="price" v-if="item.marketprice !=0 &&item.marketprice !=item.price">
                    ￥{{item.marketprice}}
                    <p class="line"></p>
                  </div>
                </div>
              </div>
            </li>
            </van-list>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="showTop" class="goTop" @click="goTop">
      <img src="../../../static/images/index/zhiding.png" alt />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Toast ,List} from "vant";
Vue.use(Swipe).use(SwipeItem).use(Toast).use(List)

import api from "../../request/api";


export default {
  name: "oldman",
  mounted() {
    let that = this;
    console.log(this.$route)
    let obj = {}
    if (this.$route.params.marketingId !== undefined) {
      this.marketingType = this.$route.params.marketingType
      this.marketingId = this.$route.params.marketingId
      this.src = this.$route.params.imgUrl
      this.title = this.$route.params.subtitle
      // window.localStorage.setItem('list',JSON.stringify(this.list))
      window.localStorage.setItem('title',this.title)
      window.localStorage.setItem('src',this.src)
      window.localStorage.setItem('marketingType',this.marketingType)
      window.localStorage.setItem('marketingId',this.marketingId)
      this.getData()
    }else{
      this.src = localStorage.getItem('src')
      this.title = localStorage.getItem('title')
      this.marketingType = localStorage.getItem('marketingType')
      this.marketingId = localStorage.getItem('marketingId')
      // this.list = JSON.parse(localStorage.getItem('list')) 
      this.getData()
    }
    
    // window.localStorage.setItem("activityId", id);
    // let baseUrl = "/static/activityData/";
    // let url = baseUrl + id + ".xlsx";
    // that.readWorkbookFromRemoteFile(url);
    // //页面滚动高度
    window.addEventListener("scroll", that.fixedHead);
    // console.log('-----------------', that.$route)
    // if (that.$route.query.id == 0) {
    //   that.list = old.old
    // } else if (that.$route.query.id == 1){
    //   that.list = old.study
    // } else if (that.$route.query.id == 3){
    //   that.list = old.study2
    //   that.src = 'https://sanyi-images.oss-cn-hongkong.aliyuncs.com/201908280911023450.jpg'
    //  }
    this.getData()
  },
  watch: {
    headerImg(val) {
      let that = this;
      if (val) {
        that.headerUrl = val[0].bannerUrl;
      }
    },
    banners(val) {
      let that = this;
      console.log("-----------------val", val);
      if (val && val.length > 0) {
        that.shopList = val;
        that.showStore = true;
      } else {
        that.showStore = false;
      }
    },
    goods(val) {
      let that = this;
      if (val) {
        that.goodsList = val;
      }
    }
  },
  data() {
    return {
      title:'',
      showTop: false,
      showStore: false,
      tableData: [],
      card: [],
      cardActive: "",
      workbook: {},
      headerImg: [],
      headerUrl: "",
      banners: [],
      shopList: [],
      goods: [],
      goodsList: [],
      shopshow:false,
      list:[],
      src:'',
      marketingType:'',
      marketingId:'',
      loading:true,
      finished:false,
      isLoading: false,
      pageNum:1
    };
  },
  beforeRouteLeave(to,from,next){
        console.log("****************Test1****Leave**************");
        console.log(this, 'Leave'); //当前组件实例
        console.log('to', to);
        console.log('from', from);
        console.log('next', next);
     
          if(to.path == '/goods-detail'){
                //缓存
              from.meta.keepAlive = true;
          }else{
                //不缓存
              from.meta.keepAlive = false ;
          }
          next()
      },
  methods: {
    handleSelectedFile(convertedData) {
      console.log(convertedData);
    },
    
    //回到顶部
    goTop() {
      //动画版回到顶部
      setTimeout(() => {
        (function smoothscroll() {
          let currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      }, 100);
    },
    //页面滚动高度
    fixedHead() {
      let that = this;
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll > 150) {
        that.showTop = true;
      } else {
        that.showTop = false;
      }
    },
    // //读取excel文件转json
    // readWorkbookFromRemoteFile: function(url) {
    //   let xhr = new XMLHttpRequest();
    //   xhr.open("get", url, true);
    //   xhr.responseType = "arraybuffer";
    //   let that = this;
    //   xhr.onload = function(e) {
    //     if (xhr.status === 200) {
    //       let data = new Uint8Array(xhr.response);
    //       let workbook = XLSX.read(data, { type: "array" });

    //       let sheetNames = workbook.SheetNames; // 工作表名称集合
    //       that.workbook = workbook;
    //       that.card = sheetNames;
    //       sheetNames.forEach(e => {
    //         that.getTable(e);
    //       });
    //     }
    //   };
    //   xhr.send();
    // },
    getTable(sheetName) {
      let that = this;
      let worksheet = that.workbook.Sheets[sheetName];
      let data = XLSX.utils.sheet_to_json(worksheet);
      switch (sheetName) {
        case "Banners":
          that.headerImg = data;
          break;
        case "shops":
          that.banners = data;
          break;
        case "goods":
          that.goods = data;
          break;
      }
    },
    // 跳转店铺首页
    goStore(item) {
      let that = this;
      window.localStorage.setItem("storeId", that.storeId);
      that.$router.push({
        name: "store",
        params: {
          storeId: item.storeId
        }
      });
    },
    //跳转详情
    goDetail(item) {
      let that = this;
      console.log(item)
      // let goodsInfoId = item.key1.split('/')[1];
      // window.localStorage.setItem("goodsInfoId", goodsInfoId);
      that.$router.push({
        name:'goods_detail',
        params: {
          goodsInfoId:item.goodsId
        }
      });
    },
    // 返回
    goBack: function() {
      let that = this;
      that.$router.back(-1);
    },

    getData(){
      let that = this
      that.$post(
        api.getMarketingGoods,
        {
          "marketingType":that.marketingType,
          "pageSize":24,
          "pageNumber":that.pageNum,
          "marketingId":that.marketingId
        }
      ).then((res) => {

        // that.activityList=that.textarr[0]
        console.log('<<<<<<<<<>>>>>>>>>>', res);
        
        if (res.code == 200) {
          that.isLoading = true;
          let _list = res.context.data;
          that.list = that.list.concat(_list);
          // 数据全部加载完成
          if (res.context.lastPage) {
            that.finished = true;
          }
          // 加载状态结束
          that.loading = false;
        } else {
          // 加载状态结束
          that.loading = false;
          Toast(res.message);
        }
      })
    },
    onLoad() {
      let that = this;
      // 异步更新数据
      if (that.isLoading) {
        setTimeout(() => {
          that.pageNum++;
          that.getdata();
        }, 500);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.app-activity {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  position: relative;
  .goBack {
    width: 31px;
    height: 31px;
    position: absolute;
    top: 26px;
    left: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .top-img {
    width: 100%;
    height: 220px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .shopContainer {
    width: 100%;
    .movement-container {
      width: 100%;
      
      .name-container {
        width: 230px;
        margin: 0 auto;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 20px;
        .bowen {
          width: 32px;
          height: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .module-name {
        font-size: 17px;
        font-family: PingFangSC-Medium;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin: 0;
        padding: 20px 0;
        text-align: center;
      }
      .shop-list {
        width: 100%;
        padding: 0 6px;
        box-sizing: border-box;
        overflow-x: auto;
        .movement-list {
          display: flex;
          justify-content: space-between;
          .movement-item {
            text-align: center;
            box-sizing: border-box;
            background: #fff;
            padding-bottom: 14px;
            margin: 0 4px;
            .img-container {
              width: 170px;
              height: 170px;
              margin: 0 auto;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .goods-name {
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: keep-all;
              white-space: nowrap;
            }
            .tips {
              font-size: 10px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
            }
          }
        }
      }
      .shop-list::-webkit-scrollbar {
        display: none;
      }
      .goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 10px;
        box-sizing: border-box;
        .goods-item {
          width: 170px;
          text-align: left;
          margin-bottom: 15px;
          background: #fff;
          box-sizing: border-box;
          .img-container {
            width: 173px;
            height: 173px;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .goods-info {
            padding: 0 5px;
            margin-top: 6px;
            .goods-name {
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 22px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .now-price {
              display: flex;
              justify-content: start;
              align-items: center;
              margin-top: 5px;
              .price {
                font-size: 14px;
                color: #ee6734;
                font-weight: bold;
                margin: 0;
                margin-right: 5px;
              }
              .tips {
                width: 30px;
                height: 12px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .foot-price {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .price {
                font-size: 10px;
                color: #9f9f9f;
                margin: 0 0 8px 0;
                position: relative;
                .line {
                  width: 100%;
                  height: 1px;
                  background: #9f9f9f;
                  position: absolute;
                  top: -4px;
                  left: 2px;
                }
              }
            }
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


