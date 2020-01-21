<template>
<div class="index">
  <van-loading class="jsLoading" size="24px" type="spinner" v-if="showLoading=='true'">{{$t('supply.loadding')}}...</van-loading>
  <div :class="{'closePadding':!isClose}">
    <van-sticky>
    <div class="header">
      <img :src="logoUrl" width="100%" />
    </div>
    </van-sticky>
    <div class="search_container">
      <div class="search">
        <form action="/">
          <van-search v-model="searchValue" :placeholder="$t('supply.p4')" @click="goSearch" disabled="true" />
        </form>
      </div>
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in bannerList" :key="index">
            <van-image width="94%" height="161" touchable stop-propagation	 :src='item.img'  @click="tapBanner(item)" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="shopContainer">
      <van-grid :column-num="4"  square icon-size='50px' clickable :border='false'>
        <van-grid-item v-for="(item,index) in shopList" :key="index" @click="toggleCate(item)" :icon="item.cateImg" :text="item.cateNameJp" />
      </van-grid>

    <div class="movement-container">
        <p class="module-name">{{activityList.title}}</p>
        <ul class="movement-list" id="movement-list">
          <li class="movement-item" v-for="(item,index) in activityList.details" :key="index"  @click="goLinkUrl(item)">
            <div class="img-container">
              <img class="activityimg" v-lazy="WebpToJpg(item.img)" />
            </div>
          </li>
        </ul>
        <!-- <div class="showMore" @click="moreMove(item)">
          <p>{{$t('index.viewmore')}}</p>
          <div class="img-container">
            <img src="../../../static/images/index/more.png" alt />
          </div>
        </div> -->
      </div>

    

      <div class="movement-container" :id="main_item.type == 2?'hotimg':''" v-for="(main_item,index) in subGoodsList" :key="index" >
        <p class="module-name">{{main_item.titleJp}}</p>
        <ul class="movement-list" >
          <li class="movement-item"   v-for="(item,index) in main_item.details" :key="index" @click="goLinkUrl(item)">
            <div class="img-container" >
              <img v-lazy="WebpToJpg(item.goods?item.goods.goodsImg:item.img)" />
            </div>
            <div >
              <div class="goods-name">
                {{item.goods?item.goods.goodsName:''}}
              </div>
              <div class="now-price"  v-if="item.goods">
                <p class="price">{{item.marketPrice?'￥'+item.marketPrice:''}}</p>
                <div class="tips" v-if="item.goods">
                  <img src="../../../static/images/index/tips.png" alt />
                </div>
              </div>
                <!-- <div class="foot-price">
                  <div class="price">
                    ￥
                    <p class="line"></p>
                  </div>
                  <div class="tips">
                    <img src="../../../static/images/index/pr.png" alt />
                  </div>
                </div> -->
              </div>
            

          </li>
        </ul>
        <div class="showMore" v-if="main_item.details.length>9"  @click="moreMove(main_item)">
          <p>{{$t('index.viewmore')}}</p>
          <div class="img-container">
            <img src="../../../static/images/index/more.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showTop" class="goTop" @click="goTop">
    <img src="../../../static/images/index/zhiding.png" alt />
  </div>
  <navFoot :active="active"></navFoot>
  <!-- <div class="load" v-if="!isClose">
      <van-icon class="close" name="close" @click="closeLoad"/>
      <div class="tips">
        <div class="icon-img"></div>
        <div class="tipsText">{{$t('index.loadTips')}}</div>
      </div>
      <div class="load-it" @click="goLoad">{{$t('index.loadText')}}</div>
    </div>-->
</div>
</template>

<script src='./index.ts'>


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import './index.scss'
</style>

