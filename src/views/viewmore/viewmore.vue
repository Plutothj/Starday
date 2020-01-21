<template>
<div class="app-store">
  <van-nav-bar class="store-title" :title="threeTitle" left-arrow @click-left="goBack">
    <div slot="right" class="title-right">
      <div class="img-container right" @click="goSearch">
        <img src="@s/images/index/search.png" alt />
      </div>
      <div class="img-container" @click="goCart">
        <img src="@s/images/index/car.png" alt />
      </div>
      <div class="info">{{carNum}}</div>
    </div>
  </van-nav-bar>
  <div class="store-goods">
    <!-- <van-tabs v-model="active" title-active-color="#ED5D28" color="#ED5D28" line-width="28px" @click="clickFather">
      <van-tab v-for="(item,index) in tabList" :key="index" :title="(item.cateNameJp==null?item.cateName:item.cateNameJp)"> -->
        <div class="tabs-content">
          <van-tabs v-model="show" title-active-color="#ED5D28" color="#ED5D28" line-width="28px" @click="clickChild">
            <van-tab v-for="(v,idx) in tabListChild" :key="idx">
              <div slot="title">
                {{v.name}}
                <van-icon name="arrow-up" :class="{'active':!isUp}" v-if="idx==1||idx==2" />
                <van-icon name="arrow-down" :class="{'active':isUp}" v-if="idx==1||idx==2" />
              </div>
              <van-list class="goods-list" :loading-text="$t('supply.loadding')" v-model="loading" :finished="finished" :immediate-check="false" :finished-text="$t('threeClass.finished')" @load="onLoad">
                <div class="goods-item" v-for="(m,inx) in goodsList" :key="inx" @click="goDetail(m)">
                  <div class="img-container">
                    <img v-lazy="m.goods.goodsImg" alt />
                  </div>
                  <div class="goods-name">{{m.goods.goodsName}}</div>
                  <div class="prices">
                    <div class="now-price">¥{{m.goods.marketPrice}}</div>
                    <!-- <div class="line-price">
                        ¥{{m.goodsInfos[0].marketPrice}}
                        <p class="line"></p>
                      </div>-->
                  </div>
                </div>
              </van-list>
            </van-tab>
          </van-tabs>
        </div>
      <!-- </van-tab>
    </van-tabs> -->
    <div class="tabsFixed" v-if="isFixed">
      <!-- <van-tabs v-model="active" title-active-color="#ED5D28" color="#ED5D28" line-width="28px" @click="clickFather">
        <van-tab v-for="(item,index) in tabList" :key="index" :title="(item.cateNameJp==null?item.cateName:item.cateNameJp)"> -->
          <div class="tabs-content">
            <van-tabs v-model="show" title-active-color="#ED5D28" color="#ED5D28" line-width="28px" @click="clickChild">
              <van-Tab v-for="(v,idx) in tabListChild" :key="idx">
                <div slot="title">
                  {{v.name}}
                  <van-icon name="arrow-up" :class="{'active':!isUp}" v-if="idx==1||idx==2" />
                  <van-icon name="arrow-down" :class="{'active':isUp}" v-if="idx==1||idx==2" />
                </div>
              </van-Tab>
            </van-tabs>
          </div>
        <!-- </van-tab>
      </van-tabs> -->
    </div>
  </div>
  <div v-if="isFixed" class="goTop" @click="goTop">
    <img src="@s/images/index/zhiding.png" alt />
  </div>
</div>
</template>

<script src='./index.ts'>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import './index.scss';
</style>

