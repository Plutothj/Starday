import api from "../../request/api";
import Vue from "vue";
import {
  NavBar,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Toast,
  Loading,
  Notify 
} from "vant";
Vue.use(NavBar).use(Checkbox).use(CheckboxGroup).use(Stepper).use(Toast).use(Loading).use(Notify);

import navFoot from "../../components/footer.vue";
import Empty from "../empty/empty.vue";
import {
  Inject
} from 'vue-property-decorator'
import Component from "vue-class-component";

@Component({
  components: {
    navFoot,
    Empty
  },
})

export default class cart extends Vue {

  @Inject() 
  reload = (this as any).reload
  allChecked: boolean = false //全选
  cartList: Array<any> = []
  checkedList: Array<any> = []
  allPrice: number = 0
  allNum: number = 0
  tradeItems: Array<any> = [] //提交订单集合
  isEmpty: boolean = false
  isLoading: boolean = true
  liststore: Array<any> = []
  goodsChecked:boolean = false

  mounted() {
    let that = (this as any);
    // 购物车信息
    that.getData();
    
  }

  //method

  favorite(item: any, goods: any): void {
    console.log("--------item", item, goods);
    let that = (this as any);
    let cartId = item.id;
    let goodsId = goods.goodsId
    let accountId = localStorage.getItem('accountid')
    that.$post(

      api.favorite, {
      cartId: cartId,
      goodsId: goodsId,
      accountId: accountId
    }
    ).then((res: any) => {
      console.log("-------------收藏商品--res", res);
      if (res.code == "200") {

        that.reload();
        that.getData();
        // Toast(that.$t('address.p2'));
        Toast('该商品已移入收藏夹！');
      } else {
        // Toast(res.data.message);
      }
    });
  }
  //跳转商品详情
  goDetail(item: any) {
    console.log("----------商品详情", item);
    let that = (this as any);
    let goodsInfoId = item.goodsId;
    window.localStorage.setItem('goodsInfoId', goodsInfoId)
    that.$router.push({
      name: "goods_detail",
      params: {
        goodsInfoId: goodsInfoId
      }
    });
  }
  

  // 购物车信息
  getData() {
    
    let that = (this as any);
    that.$post(api.getCartGoods).then((res: any) => {
        console.log("-------------购物车信息--res", res);
        if (res.code == "200") {
          that.isLoading=false;
          let context = res.context;
          if (context.storeResVo && context.storeResVo.length > 0) {
            that.isEmpty = false;
            that.cartList = context.storeResVo;
            let arr:any =[]
            let arr2:any = []
            let tradeItem:any = {
              skuId: '',
              num: ''
            };
            that.cartList.forEach((e:any) => {
              e.isChecked = false;
              e.goodsList = [];

              for (const key in context.group) {
                 if (e.storeId == key) {
                  e.goodsList.push(...context.group[key])
              
                 }
              
              }
              e.goodsList.map((item:any,index:any)=>{
                if (e.goodsList[index].checked) {
                  
                  
                  
                  tradeItem.skuId = e.goodsList[index].sku.goodsInfoId;
                  tradeItem.num = e.goodsList[index].number;
                  that.tradeItems.push(tradeItem);
                  that.allPrice += e.goodsList[index].price * e.goodsList[index].number;
                  that.allNum = that.tradeItems.length
                  console.log('>>>>>>>>>>',that.tradeItems)
                }
                arr.push(item.checked)
              })
              if (arr.indexOf(false) != -1) {
                e.isChecked = false
              }else{
                e.isChecked = true
              }
              arr2.push(e.isChecked)
              
              
            });
            if (arr2.indexOf(false) != -1) {
              that.allChecked = false;
            }else{
              that.allChecked = true;
            }
          } else {
            that.isEmpty = true;
            that.isLoading=false;
          }
          console.log("----------cartList-", that.cartList);
        } else {
          Toast(res.message);
        }
      });
  }
  //店铺全选
  chooseStore(item: any, index: any) {
    console.log("------index-item", item, index);
    let that = (this as any);
    if (item.isChecked) {
      //从订单集合中去除
      item.goodsList.forEach((e: any) => {
        that.tradeItems.forEach((m: any, inx: any) => {
          if (m.skuId == e.sku.goodsInfoId) {
            that.tradeItems.splice(inx, 1);
            return that.tradeItems;
          }
        });
       
        //价格+数量
        that.allPrice = that.allPrice - e.price * e.number;
        if (that.allNum >= 1) {
          that.allNum--;
        }
      });
      console.log("--------that.tradeItems444", that.tradeItems);

      that.allChecked = false;
      that.cartList[index].isChecked = false;
      that.cartList[index].goodsList.forEach((e: any) => {
        e.checked = false;
      });
    } else {
      //添加到订单集合
      item.goodsList.forEach((k: any) => {
        //判断是否存在 已选中项
        if (!k.checked) {
          let tradeItem:any = {
            skuId: '',
            num: ''
          };
          tradeItem.skuId = k.sku.goodsInfoId;
          tradeItem.num = k.number;
          that.tradeItems.push(tradeItem);
          
          //价格+数量
          that.allPrice = that.allPrice + k.price * k.number;
          that.allNum++;
        }
      });
      console.log("--------that.tradeItems333", that.tradeItems);
      that.cartList[index].isChecked = true;
      that.cartList[index].goodsList.forEach((e: any) => {
        e.checked = true;
      });
      //全选按钮选中
      that.cartList.forEach((e: any) => {
        e.goo
        if (e.isChecked) {
          that.allChecked = true;
        } else {
          that.allChecked = false;
        }
      });
      let allCheckedArray: Array<any> = [];
      that.cartList.forEach((e: any) => {
        allCheckedArray.push(e.isChecked)
      });
      if (allCheckedArray.indexOf(false) != -1) {
        that.allChecked = false;
      } else {
        that.allChecked = true;
      }
    }

    that.cartList = JSON.parse(JSON.stringify(that.cartList));
  }
  //选择商品
  chooseGoods(item: any, idx: any, index: any) {

    let that = (this as any);
    console.log("--------item", item, idx, index);
    that.$post(
      api.CheckedCart, {
      accountId:localStorage.getItem('accountid') ,
      cartIds: item.id,
      che: !item.checked
    }
    ).then((res: any) => {
      if (res.code == '200') {
        if (!res.context) {
          
          that.cartList[index].isChecked = false;
          that.allChecked = false;
          //从订单集合中去除
          that.tradeItems.forEach((e: any, inx: any) => {
            if (e.skuId == item.sku.goodsInfoId) {
              that.tradeItems.splice(inx, 1);
              return that.tradeItems;
            }
          });
          console.log("----------that.tradeItems222", that.tradeItems);
          //价格+数量
          that.allPrice = that.allPrice - item.price * item.number;
          if (that.allNum >= 1) {
            that.allNum--;
          }
        } else {
          
          //店铺显示全选
          let storeCheckedArray: Array<any> = [];
          that.cartList[index].goodsList.forEach((e: any) => {
            storeCheckedArray.push(e.checked)
          });
          if (storeCheckedArray.indexOf(false) != -1) {
            that.cartList[index].isChecked = false;
          } else {
            that.cartList[index].isChecked = true;
          }
          //全选按钮显示选中
          let allCheckedArray: Array<any> = [];

          that.cartList.forEach((e: any) => {
            e.goodsList.map((item:any,index:any)=>{
              allCheckedArray.push(item.checked)
            })
            

          });

          if (allCheckedArray.indexOf(false) != -1) {

            that.allChecked = false;
          } else {
            that.allChecked = true;
          }
          //添加到订单集合
          let tradeItem:any = {
            skuId: '',
            num: ''
          };
          tradeItem.skuId = item.sku.goodsInfoId;
          tradeItem.num = item.number;
          that.tradeItems.push(tradeItem);
          console.log("--------that.tradeItems111", that.tradeItems);
          //价格+数量
          that.allPrice = that.allPrice + item.price * item.number;
          that.allNum++;
        }
        that.cartList = JSON.parse(JSON.stringify(that.cartList));
      }
      console.log(res)
    })
    
    

  }
  // 全选
  chooseAll() {
     let that = (this as any);
     
    if (that.allChecked) {
      that.tradeItems = [];
      that.allPrice = 0;
      that.allNum = 0;
      let cateidtrue:Array<any> = []
      that.allChecked = false;
      that.cartList.forEach((e:any) => {
        e.isChecked = false;
        e.goodsList.forEach((k:any) => {
          k.checked = false;
          cateidtrue.push(k.id)
        });
      });
      that.$post(
        api.CheckedCart, 
        {
          accountId:localStorage.getItem('accountid') ,
          cartIds: cateidtrue.join(','),
          che: false
        }

      ).then((res:any)=>{
        console.log('>>>>>>>>>>>', res)
      })

    } else {
      that.tradeItems = [];
      that.allPrice = 0;
      that.allNum = 0;
      //将购物车所有商品 添加到订单集合
      let cateids:Array<any> = []
      that.cartList.forEach((e:any) => {
        e.goodsList.forEach((k:any) => {
          let tradeItem:any = {};
          tradeItem.skuId = k.goodsInfoId;
          tradeItem.num = k.number;
          that.tradeItems.push(tradeItem);
         
          cateids.push(k.id)

          
          //价格+数量
          that.allPrice = that.allPrice + k.price * k.number;
          that.allNum++;

        });
        
      });

      that.allChecked = true;
      that.cartList.forEach((e:any) => {
        e.isChecked = true;
        e.goodsList.forEach((k:any)=> {
          k.checked = true;
        });
      });
      that.$post(
        api.CheckedCart, 
        {
          accountId:localStorage.getItem('accountid') ,
          cartIds: cateids.join(','),
          che: true
        }

      ).then((res:any)=>{
        console.log('>>>>>>>>>>>', res)
      })
    }

  }
  // chooseAll() {
  //   let that = this;
  //   if (that.allChecked) {
  //     that.tradeItems = [];
  //     that.allPrice = 0;
  //     that.allNum = 0;

  //     that.allChecked = false;
  //     that.cartList.forEach(e => {
  //       e.isChecked = false;
  //       e.goodsList.forEach(k => {
  //         k.goodsChecked = false;
  //       });
  //     });
  //   } else {
  //     //将购物车所有商品 添加到订单集合
  //     that.cartList.forEach(e => {
  //       e.goodsList.forEach(k => {
  //         let tradeItem = {};
  //         tradeItem.skuId = k.goodsInfoId;
  //         tradeItem.num = k.buyCount;
  //         that.tradeItems.push(tradeItem);
  //         //价格+数量
  //         that.allPrice = that.allPrice + k.salePrice * k.buyCount;
  //         that.allNum++;
  //       });
  //     });

  //     that.allChecked = true;
  //     that.cartList.forEach(e => {
  //       e.isChecked = true;
  //       e.goodsList.forEach(k => {
  //         k.goodsChecked = true;
  //       });
  //     });
  //   }
  // }
  //结算 提交订单
  submitOrder() {
    let that = (this as any);
    that.cartList.map((item:any)=>{
      if(that.allNum>=1) {
         that.$post(

      api.cartSubmilt,

    )
      .then((res: any) => {
        console.log("-------------提交订单--res", res);
        if (res.code == "200") {
          that.$router.push({
            name: 'confirmOrder',
            params: {
              info: res,
              type:2
            }
          })
        } else {
          Toast(res.message);
        }
      });
      }else{
        Notify({ type: 'warning', message: that.$t('newAdd.cartSubmit') });
      }
    })
      
    
   
    // that.$router.push({
    //   name:'confirmOrder',
    //   params:{
    //     tradeItems:that.tradeItems,
    //     price:that.allPrice
    //   }
    // })
  }
  //增加数量
  addNum(item: any) {
    let that = (this as any);
    console.log("------------item", item);
    that.tradeItems.forEach((e: any) => {
      if (e.skuId == item.sku.goodsInfoId) {
        e.num = item.number;
      }
    });

    that.$post(

      api.addCartNumber, {

      cartId: item.id,
      number: ++item.number,
    }
    )
      .then((res: any) => {
        console.log("-------------增加数量--res", res);
        if (res.code == "200") {
          if (item.checked) {
            that.allPrice = that.allPrice + item.price;
          }
        } else {
          Toast(res.message);
        }
      });
  }
  //减少数量
  delNum(item: any) {
    let that = (this as any);
    that.tradeItems.forEach((e: any) => {
      if (e.skuId == item.sku.goodsInfoId) {
        e.num = item.number;
      }
    });
    that.$post(

      api.addCartNumber, {

      cartId: item.id,
      number: --item.number,
    }
    )
      .then((res: any) => {
        console.log("-------------增加数量--res", res);
        if (res.code == "200") {
          if (item.checked) {
            that.allPrice = that.allPrice - item.price;
          }
        } else {
          Toast(res.message);
        }
      });
  }
  //删除商品
  delGoods(id: any) {
    console.log("--------item", id);
    let that = (this as any);
    let goodsInfoIds = [];
    goodsInfoIds.push(id);
    that.$axios({
      method: "DELETE",
      url: api.delCartGoods,
      data: {
        cartId: id
      }
    })
      .then((res: any) => {
        console.log("-------------删除商品--res", res);
        if (res.data.code == "200") {

          that.reload;
          that.getData();
          Toast(that.$t('address.p2'));
        } else {
          // Toast(res.data.message);
        }
      });
  }


}
