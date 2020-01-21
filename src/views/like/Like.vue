<template>
  <div class="Like-wrap">
    <van-nav-bar class="nav" :title="$t('like.love')" left-arrow @click-left="onClickLeft" />
    
    <van-tabs v-model="active" class="tab">
      <van-tab :title="$t('like.likeGoods')">
        <div class="goods-wrap">
      <div class="goods" v-for="(item,index) in likelist" :key="index">
        <img :src="item.goods.goodsImg" alt  @click="godetail(item.goodsId)"/>
        <p class="goods_title">{{item.goods.goodsName}}</p>
        <p class="goods_price">
          ¥{{item.goods.marketPrice?item.goods.marketPrice:item.goods.skuMarketPrice}}
          <span v-if="item.goods.linePrice>item.goods.marketPrice">￥{{item.goods.linePrice}}</span>
          <!-- <van-checkbox
            v-model="checked[index]"
            :name="index"
            class="islike"
            @click="cancle(item.goods,index)"
          >
            <img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive" />
          </van-checkbox> -->
        </p>
      </div>
    </div>


      </van-tab>
      <van-tab :title="$t('like.likeStores')">
           <div class="goods-wrap">
            <div class="goods" v-for="(item,index) in storeList" :key="index">
              <img :src="item.store.storeLogo" alt  @click="goStoredetail(item.storeId)"/>
              <p class="goods_title">{{item.store.storeName}}</p>
              <p class="goods_price">
                <!-- <van-checkbox
                  v-model="checked[index+50]"
                  :name="index+50"
                  class="islike"
                  @click="cancle(item.store,index)"
                >
                  <img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive" />
                </van-checkbox> -->
              </p>
            </div>
          </div>
    </van-tab>

      
    </van-tabs>

  </div>
</template>

<script src='./index.ts'>

</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
