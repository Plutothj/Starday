import Vue from 'vue'
import VueRouter from 'vue-router'
import Common from '@/until/common'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: "/register",
    name: "Register",
    component: () => import('@/views/register/Register.vue')
  },
  
  {
    path: "/", //首页
    name: "index",
    component: () => import('@/views/index/index.vue')
  },

  {
    path: "/usermain",
    name: "Usermain",
    component: () => import('@/views/userMain/User-main.vue')
  },
  {
    path: "/userinfo",
    name: "UserInfo",
    component: () => import('@/views/userInfo/User-info.vue')
  },
  {
    //设置
    path: "/setting",
    name: "Setting",
    component: () => import("@/views/setting/Setting.vue")
  },
  {
    path: "/cart", //购物车
    name: "cart",
    component: () => import('@/views/cart/cart.vue')
  },
  {
      //关于我们
      path: "/empty",
      name: "empty",
      component: () => import('@/views/empty/empty.vue')
  },
  {
    path: "/classification", //分类
    name: "classification",
    component: () => import('@/views/classification/classification.vue')
  },
  {
    path: "/threeClass", //三级分类页面
    name: "threeClass",
    component: ()=> import('@/views/threeClass/threeClass.vue')
  },
  {
    path: "/goods-detail", //商品详情
    name: "goods_detail",
    component: () => import('@/views/goods_detail/index.vue')
  },
  {
    path: "/search", //搜索页
    name: "search",
    component: () => import('@/views/search/index.vue')
  },
  {
    path: "/search/result/:keyword", //搜索页
    name: "searchResult",
    component: () => import('@/views/search/searchResult.vue')
  },
  {
      path: "/foundpwd",
      name: "Foundpwd",
      component: () => import('@/views/foundpwd/Foundpwd.vue')
  },
  {
    //充值记录
    path: "/Membership",
    name: "Membership",
    component: () => import('@/views/memberShip/Membership.vue')
  },
  {
    //添加礼品卡
    path: "/addgifcard",
    name: "Addgifcard",
    component: () => import('@/views/addGifcard/Addgifcard.vue')
  },
  {
    //信用卡信息
    path: "/creditcard",
    name: "Creditcard",
    component: () => import('@/views/creditCard/Credit-card.vue')
  },
  {
    //喜欢商品列表
    path: "/like",
    name: "Like",
    component: () => import('@/views/like/Like.vue')
  },
  {
    path: "/addcard",
    name: "Addcard",
    component: () => import("@/views/addCard/Addcard.vue")
  },
  {
    path: "/adress",
    name: "adress",
    redirect: "/adressmanage",
    component: () => import('@/views/adress/index.vue'),
    children: [
      {
        path: "/adressmanage",
        name: "adressmanage",
        component: () => import('@/views/adress/Adress-manage.vue')
      },
      {
        path: "/addadress",
        name: "Addadress",
        component: () => import('@/views/adress/Addadress.vue')
      },
      {
        path: "/editadress",
        name: "Editadress",
        component: () => import('@/views/adress/Editadress.vue')
      }
    ]
  },
  {
    //优惠券
    path: "/couponcenter",
    name: "Couponcenter",
    component: () => import('@/views/couponCenter/couponcenter.vue')
  },
  {
    //优惠券列表
    path: "/couponlist",
    name: "CouponList",
    component: () => import('@/views/coupon/coupon.vue')
  },
  {
    path: "/returnlist",
    name: "ReturnList",
    component: () => import("@/views/returnList/Return-list.vue")
  },
  {
    path: "/returndetail",
    name: "Returndetail",
    component: () => import("@/views/returnDetail/Return-detail.vue")
  },
  {
    path: "/order", //订单
    name: "order",
    redirect: "/orderlist",
    component: () => import("@/views/order/index.vue"),
    children: [
      {
        path: "/confirmOrder", //确认订单页
        name: "confirmOrder",
        component: () => import("@/views/order/confirmOrder.vue")
      },
      {
        path: "/payDetail", //订单支付页
        name: "payDetail",
        component: () => import("@/views/order/payDetail.vue")
      },
      {
        path: "/payStyle", //付款方式
        name: "payStyle",
        component: () => import("@/views/order/payStyle.vue" )
      },
      {
        path: "/orderdetail", //订单详情
        name: "Orderdetail",
        component: () => import('@/views/order/Order-detail.vue')
      },
      // {
      //   path: "/orderlist", //付款方式
      //   name: "Orderlist",
      //   component: resolve => require(['@/views/order/Orderlist'], resolve)
      // },
      {
        path: "/orderlistshow",//付款方式
        name: "OrderListShow",
        component: () => import('@/views/order/OrderListShow.vue')
      },
      {
        path: "/useIntro",
        name: "useIntro",
        component: () => import('@/views/order/useIntro.vue')
      }
      
    ]
  },
  {
    path: "/returnGoods", //t退款申请
    name: "returnGoods",
    component: () => import('@/views/returnGoods/Return-goods.vue')
  }, 
  {
    path: "/store", //店铺首页
    name: "store",
    component: () => import('@/views/store/store.vue')
  }, 
  {
    path: "/store/:storeId", //店铺首页
    name: "store",
    component: () => import('@/views/store/store.vue')
  },
  {
    path: "/commont", 
    name: "Comment",
    component: () => import('@/views/comment/Commont.vue')
  },
  {
    path: "/commentlist", 
    name: "commentlist",
    component: () => import('@/views/commentList/comment-list.vue')
  },
  {
    path: "/assess",
    name: "Assess",
    component: () => import("@/views/assess/Assess.vue")
  },
  {
    //关于我们
    path: "/about_us",
    name: "about_us",
    component: () => import("@/views/abouts/about_us.vue")
  },
  {
    //关于联系人
    path: "/about_contant",
    name: "about_contant",
    component: () => import("@/views/abouts/about_contant.vue")
  },
  {
    //关于发货
    path: "/about_deliver",
    name: "about_deliver",
    component: () => import("@/views/abouts/about_deliver.vue")
  },
  {
    //关于我们
    path: "/about_pay",
    name: "about_pay",
    component: () => import("@/views/abouts/about_pay.vue")
  },
  {
    //关于我们
    path: "/about_privacy",
    name: "about_privacy",
    component: () => import("@/views/abouts/about_privacy.vue")
  },
  {
    //关于我们
    path: "/about_reback",
    name: "about_reback",
    component: () => import("@/views/abouts/about_reback.vue")
  },
  {
    //关于我们
    path: "/about_times",
    name: "about_times",
    component: () => import("@/views/abouts/about_times.vue")
  },

]

const router = new VueRouter({
  routes
})

export default router
