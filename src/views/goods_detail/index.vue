<template>
<div class="goods_detail">


  <div class="detail-head">
    <van-swipe :autoplay="3000" indicator-color="white" ref="swipe">
      <van-swipe-item v-for="(item,index) in bannerList" :key="index">
        <img width="100%" height="375" v-lazy="item.artworkUrl" />
      </van-swipe-item>
    </van-swipe>
    <div class="goBack" @click="goBack">
      <img src="../../../static/images/detail/back.png" alt />
    </div>
    <div class="goods-color">
      <p class="color-title">{{$t('goodsdetail.view')}}</p>
      <div class="list-container">
        <ul class="color-list clear" :style="{'width':colorWidth}">
                      <li
              class="color-item"
              :class="{'active':item.checked}"
              v-for="(item,index) in colorList"
              :key="index"
              @click="chooseIt(item,index)"
            >

            <img v-lazy="item.goodsInfoImg" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="goods-info">
      <p class="goods-name">{{goodsName}}</p>
      <div class="prices">
        <div class="now-price">¥{{goodsPrice}}</div>
        <div class="line-price" v-if="linePrice!=null">
          ¥{{linePrice}}
          <p class="line"></p>
        </div>
      </div>
      <div class="sail-No">
        <div class="sail-content one">
          <span>{{$t('goodsdetail.Sales')}}</span>
          <span>{{saleNum}}</span>
        </div>
        <div class="sail-content">
          <span>{{$t('goodsdetail.Stock')}}</span>
          <span>{{stock}}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="activity" >
    <!-- <van-tag class="tag" type="warning" v-for="(item,index) in colorList[0].marketingGoodsDTO" :key='index'>{{item.marketingDto.marketingName}}</van-tag> -->
  </div>


  <div class="choose-size" @click="chooseSize">
    <div class="choose">{{$t('goodsdetail.select')}}</div>
    <div class="color-size">{{$t('goodsdetail.p1')}}</div>
    <div class="more">
      <img src="../../../static/images/detail/more.png" alt />
    </div>
  </div>
  <div class="comments">
    <div class="comments-No">{{$t('goodsdetail.goodsrate')}}（{{evaluateNum}}）</div>
    <div class="more" @click="goMomment">
      <img src="../../../static/images/detail/more.png" alt />
    </div>
    <div class="all-comments" @click="goMomment">{{$t('goodsdetail.allrate')}}</div>
  </div>
  <div class="shop-info">
    <div class="shop-name">
      <div class="shop-header">
        <img v-lazy="storeInfo.storeLogo" alt />
      </div>
      <div class="name">{{storeInfo.storeName}}</div>
      <div class="more" @click="goStore">
        <img src="../../../static/images/detail/more.png" alt />
      </div>
      <div class="goShop" @click="goStore">{{$t('goodsdetail.intoshop')}}</div>
    </div>
    <div class="score">
      <div class="score-content">
        <span>{{$t('goodsdetail.rate')}}</span>
        <span class="blod">5.0</span>
      </div>
      <div class="score-content">
        <span>{{$t('goodsdetail.deliver')}}</span>
        <span class="blod">5.0</span>
      </div>
      <div class="score-content">
        <span>{{$t('goodsdetail.server')}}</span>
        <span class="blod">5.0</span>
      </div>
    </div>
  </div>
  <div class="shop-goods">
    <ul class="goods-list">
              <li
          class="goods-item"
          v-for="(item,index) in goodsList"
          :key="index"
          @click="goDetail(item)"
        >

        <div class="goods-img">
          <img v-lazy="item.goodsImg" alt />
        </div>
        <div class="goods-name">{{item.goodsName}}</div>
        <div class="goods-price">¥{{item.skuMarketPrice}}</div>
      </li>
    </ul>
  </div>
  <div class="detail-info">
    <van-tabs line-width="0px">
      <van-tab :title="$t('supply.goodsdetail')">
        <div v-html="goodsDetail">{{goodsDetail}}</div>
      </van-tab>
      <!-- <van-tab :title="$t('goodsdetail.err')"> -->
        <!-- 空白页 -->
        <!-- <Empty :isGoods="false"></Empty> -->
      <!-- </van-tab> -->
    </van-tabs>
  </div>
  <!-- 选择颜色尺码弹窗 -->
  
  <van-sku 
  v-model="skuShow" 
  :sku="sku" 
  :goods="goods" 
  show-add-cart-btn 
  reset-stepper-on-hide 
  :initial-sku="initialSku" 
  :close-on-click-overlay="true" 
  :add-cart-text="$t('goodsdetail.addcart')" 
  :buy-text="$t('goodsdetail.nowpay')" 
  :stepper-title="$t('goodsdetail.buyNum')"
  :hide-stock="sku.hide_stock" 
  :disable-stepper-input="true" 
  @sku-selected="changeSku" 
  @stepper-change="changeNum" 
  @buy-clicked="buyNow" 
  @add-cart="addCart">
    <!-- 自定义 sku-header-price -->
    <template slot="sku-header-price" slot-scope="props">
        <div class="van-sku__goods-price">
          <span class="van-sku__price-symbol">￥</span>
          <!-- 组件自带价格展示有问题 无法注释 暂时隐藏掉 -->
          <span class="van-sku__price-num" style="display:none">{{ props.price }}</span>
          <span class="van-sku__price-num">{{ sku.price }}</span>
        </div>
</template>

      <!-- 自定义 sku actions -->
<template slot="sku-actions" v-if="!isTwoBtn">
<div class="van-sku-actions">
  <van-button square size="large" type="danger" @click="clickSure">{{$t('resetpwd.save')}}</van-button>
</div>
</template>
    </van-sku>
    <!-- 商品导航 -->
    <van-goods-action safe-area-inset-bottom>
      <van-goods-action-icon
        v-if="!isCollect"
        icon="like-o"
        :text="$t('goodsdetail.focus')"
        @click="careGoods"
      />
      <van-goods-action-icon
        v-if="isCollect"
        class="red-heart"
        icon="like"
        :text="$t('goodsdetail.focus')"
        @click="careGoods"
      />
      <van-goods-action-icon
        :info="carNum"
        icon="shopping-cart-o"
        :text="$t('goodsdetail.cart')"
        
        @click="goCart"
      />
      <van-goods-action-button
        type="warning"
        :text="$t('goodsdetail.addcart')"
        color='#FF976A'
        @click="clickAddCart"
        
      />
      <van-goods-action-button type="danger" color='#FF4444' :text="$t('goodsdetail.nowpay')" @click="clickBuyNow" />
    </van-goods-action>
  </div>
</template>

<script src='./index.ts'>


</script>


<style lang="scss">
@import './index.scss'

</style>

