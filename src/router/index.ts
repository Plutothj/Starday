import Vue from 'vue'
import VueRouter from 'vue-router'
import Common from '@/until/common'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import('@/views/register/Register.vue'),
    meta:{
      keepAlive:false
    }
  },
  
  {
    path: "/", //首页
    name: "index",
    component: () => import('@/views/index/index.vue'),
    meta:{
      keepAlive:false
    }
  },

  {
    path: "/usermain",
    name: "Usermain",
    component: () => import('@/views/userMain/User-main.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/activity",
    name: "oldman",
    component: () => import('@/views/activity/oldman.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/userinfo",
    name: "UserInfo",
    component: () => import('@/views/userInfo/User-info.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    //设置
    path: "/setting",
    name: "Setting",
    component: () => import("@/views/setting/Setting.vue"),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/cart", //购物车
    name: "cart",
    component: () => import('@/views/cart/cart.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
      //关于我们
      path: "/empty",
      name: "empty",
      component: () => import('@/views/empty/empty.vue'),
      meta:{
      keepAlive:false
    }
  },
  {
    path: "/classification", //分类
    name: "classification",
    component: () => import('@/views/classification/classification.vue'),
    meta:{
      keepAlive:true
    }
  },
  {
    path: "/threeClass", //三级分类页面
    name: "threeClass",
    component: ()=> import('@/views/threeClass/threeClass.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/viewmore", //查看更多页面
    name: "viewMore",
    component: ()=> import('@/views/viewmore/viewmore.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/goods-detail", //商品详情
    name: "goods_detail",
    component: () => import('@/views/goods_detail/index.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/search", //搜索页
    name: "search",
    component: () => import('@/views/search/index.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/search/result/:keyword", //搜索页
    name: "searchResult",
    component: () => import('@/views/search/searchResult.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
      path: "/foundpwd",
      name: "Foundpwd",
      component: () => import('@/views/foundpwd/Foundpwd.vue'),
      meta:{
      keepAlive:false
    }
  },
  {
    //充值记录
    path: "/Membership",
    name: "Membership",
    component: () => import('@/views/memberShip/Membership.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    //添加礼品卡
    path: "/addgifcard",
    name: "Addgifcard",
    component: () => import('@/views/addGifcard/Addgifcard.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    //信用卡信息
    path: "/creditcard",
    name: "Creditcard",
    component: () => import('@/views/creditCard/Credit-card.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    //喜欢商品列表
    path: "/like",
    name: "Like",
    component: () => import('@/views/like/Like.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/addcard",
    name: "Addcard",
    component: () => import("@/views/addCard/Addcard.vue"),
    meta:{
      keepAlive:false
    }
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
        component: () => import('@/views/adress/Adress-manage.vue'),
        meta:{
          keepAlive:false
        }
      },
      {
        path: "/addadress",
        name: "Addadress",
        component: () => import('@/views/adress/Addadress.vue'),
        meta:{
          keepAlive:false
        }
      },
      {
        path: "/editadress",
        name: "Editadress",
        component: () => import('@/views/adress/Editadress.vue'),
        meta:{
          keepAlive:false
        }
      }
    ]
  },
  {
    //优惠券
    path: "/couponcenter",
    name: "Couponcenter",
    component: () => import('@/views/couponCenter/couponcenter.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    //优惠券列表
    path: "/couponlist",
    name: "CouponList",
    component: () => import('@/views/coupon/coupon.vue'),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/returnlist",
    name: "ReturnList",
    component: () => import("@/views/returnList/Return-list.vue"),
    meta:{
      keepAlive:false
    }
  },
  {
    path: "/returndetail",
    name: "Returndetail",
    component: () => import("@/views/returnDetail/Return-detail.vue"),
    meta:{
      keepAlive:false
    }
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
        component: () => import("@/views/order/confirmOrder.vue"),
        meta:{
          keepAlive:false
        }
      },
      {
        path: "/payDetail", //订单支付页
        name: "payDetail",
        component: () => import("@/views/order/payDetail.vue"),
        meta:{
          keepAlive:false
        }
      },
      {
        path: "/payStyle", //付款方式
        name: "payStyle",
        component: () => import("@/views/order/payStyle.vue" ),
        meta:{
          keepAlive:false
        }
      },
      {
        path: "/orderdetail", //订单详情
        name: "Orderdetail",
        component: () => import('@/views/order/Order-detail.vue'),
        meta:{
          keepAlive:false
        }
      },
      // {
      //   path: "/orderlist", //付款方式
      //   name: "Orderlist",
      //   component: resolve => require(['@/views/order/Orderlist'], resolve)
      // },
      {
        path: "/orderlistshow",//付款方式
        name: "OrderListShow",
        component: () => import('@/views/order/OrderListShow.vue'),
        meta:{
          keepAlive:false
        }
      },
      {
        path: "/useIntro",
        name: "useIntro",
        component: () => import('@/views/order/useIntro.vue'),
        meta:{
          keepAlive:false
        }
      }
      
    ]
  },
  {
    path: "/returnGoods", //t退款申请
    name: "returnGoods",
    component: () => import('@/views/returnGoods/Return-goods.vue'),
    meta:{
          keepAlive:false
        }
  }, 
  {
    path: "/store", //店铺首页
    name: "store",
    component: () => import('@/views/store/store.vue'),
    meta:{
          keepAlive:false
        }
  }, 
  {
    path: "/store/:storeId", //店铺首页
    name: "store",
    component: () => import('@/views/store/store.vue'),
    meta:{
          keepAlive:false
        }
  },
  {
    path: "/commont", 
    name: "Comment",
    component: () => import('@/views/comment/Commont.vue'),
    meta:{
          keepAlive:false
        }
  },
  {
    path: "/commentlist", 
    name: "commentlist",
    component: () => import('@/views/commentList/comment-list.vue'),
    meta:{
          keepAlive:false
        }
  },
  {
    path: "/assess",
    name: "Assess",
    component: () => import("@/views/assess/Assess.vue"),
    meta:{
          keepAlive:false
        }
  },
  {
    path: "/Changepwd",
    name: "Changepwd",
    component: () => import("@/views/changePwd/Change-pwd.vue"),
    meta:{
          keepAlive:false
        }
  },
  {
    //关于我们
    path: "/about_us",
    name: "about_us",
    component: () => import("@/views/abouts/about_us.vue"),
    meta:{
          keepAlive:false
        }
  },
  {
    //关于联系人
    path: "/about_contant",
    name: "about_contant",
    component: () => import("@/views/abouts/about_contant.vue"),
    meta:{
          keepAlive:false
        }
  },
  {
    //关于发货
    path: "/about_deliver",
    name: "about_deliver",
    component: () => import("@/views/abouts/about_deliver.vue"),
    meta:{
          keepAlive:false
        }
  },
  {
    //关于我们
    path: "/about_pay",
    name: "about_pay",
    component: () => import("@/views/abouts/about_pay.vue"),
    meta:{
          keepAlive:false
        }
  },
  {
    //关于我们
    path: "/about_privacy",
    name: "about_privacy",
    component: () => import("@/views/abouts/about_privacy.vue"),
    meta:{
          keepAlive:false
        }
  },
  {
    //关于我们
    path: "/about_reback",
    name: "about_reback",
    component: () => import("@/views/abouts/about_reback.vue"),
    meta:{
          keepAlive:false
        }
  },
  {
    //关于我们
    path: "/about_times",
    name: "about_times",
    component: () => import("@/views/abouts/about_times.vue"),
    meta:{
          keepAlive:false
        }
  },

]


  


const router = new VueRouter({
  routes
})
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if(isChunkLoadFailed){
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
      location.reload();
      // const targetPath = $router.history.pending.fullPath;
      // $router.replace(targetPath);
  }
})

export default router
