import Vue from "vue";
import {
  NavBar,
  Tab,
  Tabs,
  List,
  Toast,
  Icon
} from "vant";
import api from "../../request/api";
import ConstKey from "../../until/const_key";
Vue.use(NavBar).use(Tab).use(Tabs).use(List).use(Icon)
import Component from 'vue-class-component'

@Component({

})

export default class  ThreeClass extends Vue{
      
      nowClass:Object= {} //上个页面传的该分类
      sameClass:Object= {} //上个页面传的同级分类
      threeTitle:String= "" //顶部导航文字
      searchValue:String= ""
      active:Number= 0
      show:Number=0
      cateId2:String= ''
      carNum:Number= 0
      tabList:Array<any>= []//顶部同级分类
      tabListChild:Array<any>= [{
          name: "総合"
        },
        
        {
          name: "价格"
        },
        {
          name: "レビュー数"
        }
      ]
      goodsList:Array<any>= []
      cateId:String= "" //分类ID
      pageNum:Number= 1
      public pageSize:Number= 20
      sortFlag: Number= 0
      loading:Boolean= true
      finished:Boolean= false
      isLoading: Boolean=false //是否进行上拉加载
      isFixed:Boolean= false
      isUp: Boolean=false
      sorted:string =''
      sortOrder:string = 'asc'
  mounted() {
    let that = (this as any);
    let threeClass:any = window.localStorage.getItem("threeClass");
    let sameClass:any = window.localStorage.getItem("sameClass");

    that.nowClass = that.$route.params.nowClass || JSON.parse(threeClass);
    that.sameClass = that.$route.params.sameClass || JSON.parse(sameClass);

    that.threeTitle = that.nowClass.cateName;
    that.cateId = that.nowClass.cateId;
    that.cateId2 = that.sameClass.cateId

    console.log("----------nowClass", that.nowClass);
    console.log("----------that.sameClass", that.sameClass);
    that.tabList = that.sameClass.goodsCateDTO;
    //mini购物车
    // that.getMiniPurchases();
    //商品信息
    that.getData();
    //页面滚动高度
    window.addEventListener("scroll", that.fixedHead);
  }
  
 
 
    //页面滚动高度
    fixedHead() {
      let that = (this as any);
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll > 150) {
        that.isFixed = true;
      } else {
        that.isFixed = false;
      }
    }
    clickFather(title:any) {
      console.log("------------点击父", title);
      let that = (this as any);
      that.show = 0; //子级 重置第一个
      that.cateId = that.tabList[title].cateId;
      console.log("-----------that.cateId", that.cateId);
      console.log("-----------that.cateName", that.tabList[title].cateNameJp);
      that.threeTitle = that.tabList[title].cateName;
      that.pageNum = 0;
      that.goodsList = [];
      that.finished = false;
      that.loading = true;
      that.sortFlag = 0;
      that.isLoading = false;
      that.getData();
    }
    clickChild(title:any) {
      console.log("---------------点击子", title);
      let that = (this as any);
      that.pageNum = 0;
      that.goodsList = [];
      that.finished = false;
      that.loading = true;
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
    }

    //获取页面信息
    getData() {
      let that = (this as any);
      //获取同级分类信息
      that.$post(
        api.getCateGoods, {
          goodsCateId: that.cateId+','+that.cateId2,
          keywords: "",
          sorted: that.sorted,
          sortOrder: that.sortOrder,
          pageSize: ConstKey.PAGE_SIZE,
          pageNumber: that.pageNum,
        }
      ).then((res:any) => {
        console.log("-------------商品分页--res", res);
        if (res.code == '200') {
          that.isLoading = true;
          let esList = res.context.data;
          that.goodsList = that.goodsList.concat(esList);
          // 数据全部加载完成
          if (res.context.data.length == 0) {
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
      //未登录不读取
      // if (!this.checkIsLogin()) {
      //   return;
      // }
      let that = (this as any);
      that
        .$axios({
          method: "post",
          url: "site/miniPurchases",
          data: {}
        })
        .then((res:any) => {
          console.log("-------------mini购物车--res", res);
          if (res.data.code == ConstKey.SUCCESS) {
            that.carNum = res.data.context.num;
          } else {
            Toast(res.data.message);
          }
        });
    }
    // 返回
    goBack() {
      let that = (this as any);
      that.$router.back(-1);
    }
    //跳转详情
    goDetail(item:any) {
      let that = (this as any);
      console.log(item)
      let goodsInfoId = item.goodsInfos[0].goodsInfoId;
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
      let that = (this as any);
      that.$router.push("/search");
    }
    //跳转购物车
    goCart() {
      let that = (this as any);
      that.$router.push("/cart");
    }
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
  
};