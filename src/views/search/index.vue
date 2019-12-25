<template>
  <div class="app-search">
    <div class="search-head">
      <div class="goBack" @click="goBack">
        <img src="../../../static/images/index/back.png" alt />
      </div>
      <form action="/">
        <van-search
          v-model="searchValue"
          :placeholder="$t('search.world')"
          show-action
          shape="round"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">{{$t('search.sea')}}</div>
        </van-search>
      </form>
    </div>
    <div class="search-body">
      <div class="body-head">{{$t('search.seahistory')}}</div>
      <ul class="tag-list">
        <li
          class="tag-item"
          v-for="(item,index) in searchList"
          :key="index"
          @click="checkHisWord(item)"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Search, Tag, Toast } from "vant";
import ConstKey from "../../until/const_key";
import api from "../../request/api";
import Component from 'vue-class-component'
Vue.use(Search).use(Tag).use(Toast)

@Component({

})
export default class Searchview extends Vue {
      //data
      searchValue:String= ""
      searchList:Array<any>= []


    onSearch() {
      console.log("---------搜索");
      if (this.searchValue == "") {
        Toast((this as any).$t('search.world'));
        return;
      }

      //添加到历史搜索记录
      let searchHisList:any|Array<any> = localStorage.getItem(ConstKey.SEARCH_HIS_KEYWORD);
      if (searchHisList == null) {
       searchHisList = new Array();
      } else {
       searchHisList = searchHisList.split("|");
      }
      //搜索重复项 不添加记录
      if (searchHisList.indexOf((this as any).searchValue) < 0) {
        searchHisList.push(this.searchValue);
      }
      localStorage.setItem(
        ConstKey.SEARCH_HIS_KEYWORD,
        searchHisList.join("|")
      );

      //跳转页面并执行搜索
      window.location.href = "/#/search/result/" + this.searchValue;
    }
    initData(){
      var searchHisList=localStorage.getItem(ConstKey.SEARCH_HIS_KEYWORD);
      if(searchHisList!=null){
      var listres=searchHisList.split('|');
      console.log(listres);
      this.searchList=listres;
      }
    }
    checkHisWord(item:any){
      this.searchValue=item;
    }
    goBack() {
      (this as any).$router.back(-1);
    }
    unique(arr:any) {
      // 根据唯一标识no来对数组进行过滤
      const res = new Map(); //定义常量 res,值为一个Map对象实例 //返回arr数组过滤后的结果，结果为一个数组   过滤条件是，如果res中没有某个键，就设置这个键的值为1
      return arr.filter((arr:any) => !res.has(arr.no) && res.set(arr.no, 0));
    }

    //mounted
      mounted() {
        let that = this;
        this.initData();
      }

}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.app-search {
  width: 100%;
  height: 100%;
  background: #fff;
  .search-head {
    width: 100%;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    .goBack {
      width: 10px;
      height: 17px;
      position: fixed;
      top: 20px;
      left: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .van-search {
      width: 340px;
      margin: 0 auto;
    }
  }
  .search-body {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .body-head {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      text-align: left;
      margin: 17px 0 20px 0;
    }
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      .tag-item {
        // width: 58px;
        height: 30px;
        line-height: 30px;
        padding: 0 8px;
        background: rgba(244, 244, 244, 1);
        border-radius: 3px;
        margin-right: 10px;
        margin-bottom: 10px;
        text-align: center;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
}
</style>

