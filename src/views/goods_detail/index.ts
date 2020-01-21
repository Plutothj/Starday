import api from "../../request/api";
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Sku,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Toast,
  Button,
  Tag
} from "vant";
import navFoot from "../../components/footer.vue";

import ConstKey from "../../until/const_key";
import Empty from "../empty/empty.vue";
Vue.use(Tag).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(Sku).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Toast).use(Button)
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
@Component({
    components: {
    navFoot,
    Empty
  }
})
export default class Index extends Vue {
      //data
      colorWidth:any= null //颜色预览--宽度
      storeId:any=  null //店铺ID
      storeInfo:object= {} //店铺信息
      evaluateNum:Number= 0 //评论数量
      isCollect:Boolean= false//是否已收藏
      carNum:Number= 0 //mini购物车数量
      goodsName:String= "" //商品名称
      goodsInfoId:any=  null //goodsInfoId
      goodsId:any=  null //商品ID
      linePrice:any=  null //划线价
      goodsPrice:any=  null //售价
      saleNum:any=  null //销量
      stock:any=  null //库存
      goodsDetail:any=  null //底部商品详情
      bannerList:Array<any>= []
      bannerNum:any=  null //轮播图数量
      private colorList:Array<any>= []
      goodsList:Array<any>= []
      marketingList:Array<any> = []
      skuid:String= ""
      // 颜色尺码弹窗数据
      skuShow:Boolean= false
      isTwoBtn:Boolean= false //弹窗是否显示 两个按钮
      isChoose:Boolean= false //是否已选过尺寸
      isBuyNow:Boolean= false //是否立即购买
      isAddCart:Boolean= false //是否加入购物车

      buyNum:Number= 1 //购买数量

      sku:object= {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [],
        hide_stock: false // 是否隐藏剩余库存
      }
      goods:object= {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg"
      }
      goodspec:Array<any>=[]
      //默认选中
      initialSku:object= {}

      //watch
      @Watch('colorList',{
        deep:true
      })

      private colorList1(colorList:any) {
        let that = (this as any);
        if (colorList) {
          //处理颜色列表 宽度
          that.colorWidth = colorList.length * (43 + 17) + "px";
        }
      }


      //mounted
        mounted() {
        let that = (this as any);

        that.skuid = that.$route.params.goodsInfoId ||that.$route.params.id ||window.localStorage.getItem("goodsInfoId");

        console.log("-------skuid", that.skuid);
        //获取产品详情信息
        that.getData();
        //获取mini购物车数量
        
        if (localStorage.getItem('storeId')||localStorage.getItem('accountid')) {
          that.getStoreGoods()
          that.getMiniPurchases();
        }else{
          return;
        }
        
        //是否已关注
        // that.isGoodsFollow();
      }

      beforeRouteLeave(to:any,from:any,next:any){
        
     
          if(to.path == '/commentlist'){
                //缓存
              from.meta.keepAlive = true;
          }else{
                //不缓存
              from.meta.keepAlive = false ;
          }
          next()
      }


          // 返回
    goBack() {
      let that = (this as any);
      
      if (window.history.length <= 1) {
                that.$router.push({path:'/'})
                return false
            } else {
                that.$router.go(-1)
      }
      
    }
    //款式预览-处理轮播
    chooseIt(item:any, idx:any) {
      let that = (this as any);
      that.bannerList.length = that.bannerNum
      that.colorList[idx].checked = true;
      that.colorList.forEach((e:any, index:any) => {
        if (idx !== index) {
          e.checked = false;
        }
      });
      let ArtworkUrl = {
        artworkUrl:''
      };
      ArtworkUrl.artworkUrl = that.colorList[idx].goodsInfoImg
      let length = that.bannerNum;
      that.bannerList.push(ArtworkUrl);
      console.log(that.bannerList)
      //轮播跳转最后一张
      let index = that.bannerList.length - 1;
      that.$refs.swipe.swipeTo(index);
    }
    //跳转全部评价
    goMomment() {
      let that = (this as any);
      that.$router.push({
        name: 'commentlist',
        params: {
          goodsId: that.goodsId
        }
      });
    }
    //跳转店铺首页
    goStore() {
      let that = (this as any);
      window.localStorage.setItem("storeId", that.storeId);
      that.$router.push({
        name: "store",
        params: {
          storeId: that.storeId
        }
      });
    }
    //选择尺码
    chooseSize() {
      console.log("-------选择尺码");
      let that = (this as any);
      that.skuShow = true;
      that.isTwoBtn = true;

      //处理剩余数量 日文
      setTimeout(() => {
        let remain = document.getElementsByClassName("van-sku__stock");
        console.log("----------remain", remain);

        if (that.initialSku.stock_num) {
          remain[0].innerHTML = "残り" + that.initialSku.stock_num + "点";
        } else {
          remain[0].innerHTML = "残り" + 0 + "点";
        }
        let text = document.getElementsByClassName("van-toast__text");
        console.log("-------------text", text);
        if (text) {
          text[0].innerHTML = "少なくとも１つを選択します";
        }
      }, 600);
    }
    // 商品详情
    getData() {
      let that = (this as any);
      let skuid = that.skuid;
      that.$post(
          api.getGoodsDetails,
          {
            customerId:localStorage.getItem('accountid'),
            // goodsId:'2c9feb446b1ce3a8016b77cbe5f16e91'
            // goodsId:'2c9feb446aea03c6016af7c5ccc30035'
            // goodsId: '8000016ed58b661274cf20f6147fe67a'
            goodsId:skuid
          }
        )
        .then((res :any)=> {
          console.log("-------------商品详情--res", res);
          if (res.code == ConstKey.SUCCESS&&res.context != 1) {
            let context = res.context;
            that.isCollect = context.follow.isFollow==0?false:true;
            that.bannerList = context.goodsImage;
            that.bannerNum = context.goodsImage.length;
            that.goodsDetail = context.goodsDetail;
            that.goodsName = context.goodsName;
            that.colorList = context.goodsInfoQuery;
            that.storeId = context.storeId;
            localStorage.setItem('storeId',context.storeId)
            that.goodsId = context.goodsId;
            that.goodsInfoId = context.goodsInfoQuery[0].goodsInfoId;
            that.storeInfo = context.storeResVo
            that.goodspec= context.goodsSpec
            that.evaluateNum =context.goodsEvaluateNum
            that.marketingList = context.marketingList
            //获取店铺信息
            // that.getStoreData();
            //获取商品评价数量
            // that.getEvaluate();

            //页面展示内容 未选择情况下 默认展示 第一件商品信息
            let firstInfo = context.goodsInfoQuery[0];
            that.linePrice = context.linePrice;
            that.goodsPrice = firstInfo.marketPrice;
            that.stock = firstInfo.stock;
            that.saleNum = firstInfo.goodsSalesNum || 0;
            
            //尺寸与颜色选择框 sku--tree数据结构
            let goodsSpecs = context.goodsSpec;
            
            let imgurl = context.goodsInfoQuery;
            let goodsInfoss = context.goodsInfos;
            let sku = that.sku;
            if(goodsSpecs.length < 1){
              that.sku.price = context.goodsInfoQuery[0].marketPrice
              that.sku.stock_num = context.goodsInfoQuery[0].stock
            }
            if (goodsSpecs && goodsSpecs.length > 0) {
              goodsSpecs.map((e:any, index:any) => {
                let treeItem:any = {
                  k: e.specName,
                  v: [],
                  k_s: "s" + (index + 1)
                };
                
                  e.goodsSpecDetails.forEach((m:any) => {
                    
                      m.id = m.specDetailId;
                      m.name = m.detailName;
                      
                      imgurl.forEach((w:any)=> {
                        if (
                          w.specDetailId.indexOf(m.specDetailId) >= 0 &&
                          w.specId.indexOf(m.specId) >= 0
                        ) {
                          m.imgUrl = w.goodsInfoImg;
                          
                        }
                      });
                      treeItem.v.push(m);
                    
                  });
                
                sku.tree.push(treeItem);
                
               
                
              });
            }
            console.log("-----tree", sku.tree);

            that.goods.title = context.goodsName;
            that.goods.picture = firstInfo.goodsInfoImg;
            
            sku.stock_num =firstInfo.stock;
            //尺寸与颜色选择框 sku--list数据结构
            
            let goodsInfos = context.goodsInfoQuery;
            
             goodsInfos.forEach((e:any )=> {
              // let listItem = {};
              // listItem.id = e.cateId;
              // listItem.price = e.salePrice;
              // listItem.stock_num = e.stock;
              // listItem.s1 = e.mockSpecDetailIds[0] || "0";
              // listItem.s2 = e.mockSpecDetailIds[1] || "0";
              // listItem.s3 = e.mockSpecDetailIds[2] || "0";
              // listItem.s4 = e.mockSpecDetailIds[3] || "0";
              // listItem.s5 = e.mockSpecDetailIds[4] || "0";
              // listItem.s6 = e.mockSpecDetailIds[5] || "0";
              // sku.list.push(listItem);
              e.id = e.goodsInfoId;
              e.price = e.marketPrice;
              e.stock_num = e.stock;
              

              if (e.specDetailId && e.specDetailId.length > 0) {
                //多规格
                e.s1 = e.specDetailId[0] || "0";
                e.s2 = e.specDetailId[1] || "0";
                e.s3 = e.specDetailId[2] || "0";
                e.s4 = e.specDetailId[3] || "0";
                e.s5 = e.specDetailId[4] || "0";
                e.s6 = e.specDetailId[5] || "0";
                sku.list.push(e);
                //尺寸与颜色选择框 sku--initialSku数据结构 默认选中第一个
                // that.initialSku.s1 = sku.list[0].s1;
                // that.initialSku.s2 = sku.list[0].s2;
                that.initialSku = sku.list[0];
                that.initialSku.selectedNum = that.buyNum;
              }  else {
                
                //单品
                that.initialSku.goodsInfoId = e.goodsInfoId;
                that.initialSku.selectedNum = that.buyNum;
                that.initialSku.stock_num = e.stock;
                
              }
            });
            console.log("------------sku.list", sku);
          } else {
            Toast(res.message);
            setTimeout(() => {
              that.$router.push('/')
            }, 1000);
            
          }
        });
    }
    //选择sku
    changeSku(val:any) {
      console.log("-----选择sku", val);
      let that = (this as any);
      let isSku = true;

      for (let i in val.selectedSku) {
        console.log("-----------e", val.selectedSku[i]);
        if (!val.selectedSku[i]) {
          isSku = false;
        }
      }
      
      if (isSku) {
        that.sku.price = val.selectedSkuComb.marketPrice;
        that.initialSku = val.selectedSkuComb;
        that.initialSku.selectedNum = that.buyNum;
        that.initialSku.skuVal = val.skuValue.detailName
        //处理剩余数量 日文
        let remain = document.getElementsByClassName("van-sku__stock");
        console.log("----------remain", remain[0]);
        // remain[0].innerText = "残り" + val.selectedSkuComb.stock_num + "点";
      }
    }
    //修改数量
    changeNum(val:any) {
      console.log("--------选择数量", val);
      let that = (this as any);
      that.initialSku.selectedNum = val;
      that.buyNum = val;
      // let text=document.getElementsByClassName('van-toast__text');
      // console.log("---------text",text)
    }
    // 点击确定
    clickSure() {
      console.log("-----------点击确定");
      let that = (this as any);
      if (that.isAddCart) {
        that.addCart();
      } else if (that.isBuyNow) {
        that.buyNow();
      }
    }
    //点击添加购物车
    clickAddCart() {
      let that = (this as any);
      if (that.isChoose) {
        that.addCart();
      } else {
        console.log("------弹框");
        that.skuShow = true;
        that.isTwoBtn = false;
        that.isAddCart = true;
        that.isBuyNow = false;

        //处理剩余数量 日文
        setTimeout(() => {
          let remain = document.getElementsByClassName("van-sku__stock");
          console.log("----------remain", remain);
          console.log("----------that.initialSku", that.initialSku);
          remain[0].innerHTML = "残り" + that.initialSku.stock_num + "点";
        }, 500);
      }
    }
    // 添加购物车
    addCart() {
      
      
      let that = (this as any);
      let skuVal:any = ''
      
      // 检查是否登录
      console.log("--------dddd");
      that.isAddCart = false;
      that.isBuyNow = false;
      let initialSku = that.initialSku;
      //获取同级分类信息
      console.log('tag', that.initialSku)
      that.goodspec.map((item:any)=> {
        item.goodsSpecDetails.map((k:any)=>{
          if (initialSku.specDetailId.indexOf(k.specDetailId) > -1) {
            skuVal+=k.detailName
          }
        })
      })
      that.$post(
          
          api.addCart,
          {
           number: that.initialSku.selectedNum,
           shopType: 2,
           skuId: that.initialSku.goodsInfoId,
           skuVal: skuVal,
          }
        ).then((res :any)=> {
          console.log("-------------添加购物车--res", res);
          if (res.code == ConstKey.SUCCESS) {
            that.skuShow = false;
            that.getMiniPurchases();
            Toast("カートに入れました！");
          } else {
            that.skuShow = false;
            Toast(res.message);
          }
        });
    }
    //点击立即购买
    clickBuyNow() {
      let that = (this as any);
      if (that.isChoose) {
        that.buyNow();
      } else {
        console.log("------弹框");
        that.skuShow = true;
        that.isTwoBtn = false;
        that.isAddCart = false;
        that.isBuyNow = true;
        //处理剩余数量 日文
        setTimeout(() => {
          let remain = document.getElementsByClassName("van-sku__stock");
          console.log("----------remain", remain);
          remain[0].innerHTML = "残り" + that.initialSku.stock_num + "点";
        }, 500);
        console.log("------立即购买2");
      }
    }
    //立即购买
    buyNow() {
      // if (!this.checkIsLogin()) {
      //   this.$router.push("/login");
      //   return;
      // }
      console.log("------立即购买",this.initialSku);
      let that = (this as any);
      that.isAddCart = false;
      that.isBuyNow = false;
      let initialSku = that.initialSku;  
      console.log(that.initialSku)      
      //获取同级分类信息
      that.$post(
         
          api.buyNow,
          {
            accountId:localStorage.getItem('accountid'),
            skuId: initialSku.goodsInfoId,
            number: initialSku.selectedNum,
            skuVal: initialSku.skuVal?initialSku.skuVal:''
          }
        )
        .then((res:any)=> {
          console.log("-------------立即购买--res", res);
          if (res.code == ConstKey.SUCCESS) {
            that.skuShow = false;
            
            that.$router.push({
              name: 'confirmOrder',
              params: {
                info: res,
                type:1
              }
              });
          } else {
            that.skuShow = false;
            var msg = res.message;
            if (msg.indexOf("缺货商品") > -1) {
              msg =
                "すみません、ご注文した商品は今在庫切れで修正して改めて提出してください";
            }

            Toast(msg);
          }
        });
    }
    //跳转购物车
    goCart() {
      let that = (this as any);
      that.$router.push("/cart");
    }
    //获取购物车数量
    getMiniPurchases() {
      // if (!this.checkIsLogin()) {
      //   return;
      // }
      let that = (this as any);
      if (localStorage.getItem('accountid')) {
        that.$post(
          api.getCartGoods
        ).then((res :any)=> {
          console.log("-------------mini购物车--res",  Number(res.context.items.length) );
          if (res.code == ConstKey.SUCCESS) {
            that.carNum = Number(res.context.items.length) 
          } else {
            Toast(res.message);
          }
        });
      }else{
        that.carNum = 0
      }
      
    }
    
    //获取店铺推荐商品列表

    getStoreGoods() {
      let that = (this as any);
      that.$post(
          
          api.getDetailStoreGoods,
          {
            storeId: localStorage.getItem('storeId')
            
          }
        )
        .then((res :any)=> {
          console.log("-------------店铺推荐商品列表--res", res);
          if (res.code == ConstKey.SUCCESS) {
            that.goodsList = res.context;
          } else {
            Toast(res.message);
          }
        });
    }
    
    //点击店铺商品推荐列表
    goDetail(item:any) {
      console.log("---------item", item);
      let that = (this as any);
      that.skuid = item.goodsId;
      console.log("----------goodsInfoId", that.skuid);
      window.localStorage.setItem("goodsInfoId", that.skuid);
      //清除sku信息
      that.sku.tree = [];
      that.sku.list = [];
      //获取产品详情信息
      that.getData();
      //获取mini购物车数量
      that.getMiniPurchases();
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
      }, 800);
    }
    //喜欢商品
    careGoods() {
      // if (!this.checkIsLogin()) {
      //   this.$router.push("/login");
      //   return;
      // }
      let that = (this as any);
      let isCollect = that.isCollect;
      if (isCollect) {
        that.$post(
            
            api.Goodslike,
            {
              goodsId: that.goodsId,
              customerId:localStorage.getItem('accountid')
            }
          )
          .then((res :any)=> {
            console.log("-------------取消喜欢商品--res", res);
            if (res.code == ConstKey.SUCCESS) {
              that.isCollect = false;
            } else {
              Toast(res.message);
            }
          });
      } else {
        that.$post(
           
           api.Goodslike,
            {
              goodsId: that.goodsId,
              customerId:localStorage.getItem('accountid')
            }
          )
          .then((res :any)=> {
            console.log("-------------喜欢商品--res", res);
            if (res.code == ConstKey.SUCCESS) {
              that.isCollect = true;
            } else {
              Toast(res.message);
            }
          });
      }
    
}
}
