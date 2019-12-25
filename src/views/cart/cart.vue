<template>
<div class="app-cart">
  <van-nav-bar :title="$t('cart.cart')" />
  <div class="cart-body" v-if="!isEmpty">
    <ul class="cart-list">
      <li class="cart-item" v-for="(item,index) in cartList" :key="index">
        <div class="store-name" @click="chooseStore(item,index)">
          <label class="checkBox" :for="index">
              <!-- <input class="check" type="checkbox" :id="index" v-model="item.isChecked" /> -->
              {{item.storeName}}
            </label>
        </div>
        <div class="store-goods">
          <div class="goods-item" v-for="(itm, idx) in item.goodsList" :key="idx">
            <div class="checkBox" @click="chooseGoods(itm,idx,index)">
              <input type="checkbox" v-model="itm.checked" />
              <!-- <van-checkbox v-model="itm.checked">复选框</van-checkbox> -->
            </div>
            <div class="goods-container">
              <div class="img-container" @click="goDetail(itm)">
                <img v-lazy="itm.sku.goodsInfoImg" alt />
              </div>
              <div class="goods-info">
                <div @click="goDetail(itm.sku)">
                  <div class="goods-name">{{itm.sku.goodsInfoName}}</div>
                  <div class="skus" v-if="itm.sku.specText!=null">
                    <span>{{itm.sku.specText}}</span>
                  </div>
                </div>
                <!-- <div class="skusT" v-if="itm.sku.specText==null">{{$t('cart.guige')}}</div> -->
                <div class="skusT" v-if="itm.skuVal!==null">{{itm.skuVal}}</div>

                <div class="price-num">
                  <div class="price">￥{{itm.sku.marketPrice}}</div>
                  <van-stepper v-model="itm.number" :disable-input=true integer @plus="addNum(itm)" @minus="delNum(itm)" />

                  <div class="del" @click="delGoods(itm.id)">{{$t('cart.del')}}</div>
                  <!-- <div class="favorite" @click="delGoods(itm.id)">{{$t('cart.favorite')}}</div> -->
                </div>

              </div>
              <div class="favorite" @click="favorite(itm,itm.sku)">{{$t('cart.favorite')}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="cart-all" v-if="!isEmpty">
    <label class="checkBox" for="cartAll">
        <input class="check" type="checkbox" id="cartAll" v-model="allChecked" @click="chooseAll" />
        {{$t('cart.chooseAll')}}
      </label>
    <div class="all-price" v-if="!isEmpty">
      <div class="price-content">
        <span>{{$t('cart.totle')}}:</span>
        <span class="price">￥{{allPrice}}</span>
      </div>
      <div class="submit-btn" @click="submitOrder">{{$t('cart.Settlement')}}({{allNum}})</div>
    </div>
  </div>
  <!-- Loading -->
  <van-loading v-if="isLoading" class="loading" type="spinner" vertical>{{$t('supply.loadding')}}...</van-loading>
  <!-- 空白页 -->
  <Empty v-if="isEmpty" :isGoods="true"></Empty>
  <!-- 底部导航 -->
  <navFoot ></navFoot>
</div>
</template>

<script src='./index.ts'>


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import './index.scss';
</style>

