<template>
<div class="classification">
  <div class="search-head">
    <form action="/">
      <van-search v-model="searchValue" :placeholder="$t('classification.search')" shape="round" @click="onSearch"></van-search>
    </form>
  </div>
  <div class="class-list">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item v-for="(item,index) in navList" :key="index" :name="index+1">
        <div slot="title" class="title-container">
          <div class="img-container">
            <img v-lazy="item.cateImg" alt />
          </div>
          <div>{{item.cateName}}</div>
        </div>
        <div class="class-content">
          <van-collapse v-model="activeTwo" accordion>
            <van-collapse-item v-for="(m,idx) in item.goodsCateDTO" :key="idx" :name="idx+1" :title="m.cateName">
              <van-cell-group>
                <van-cell v-for="(v,ind) in m.goodsCateDTO" :key="ind" :title="v.cateName" is-link @click="goThreeClass(v,m)" />
              </van-cell-group>
            </van-collapse-item>
          </van-collapse>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>

  <!-- 底部导航 -->
  <navFoot></navFoot>
</div>
</template>

<script src='./index.ts'>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import './index.scss'
</style>

