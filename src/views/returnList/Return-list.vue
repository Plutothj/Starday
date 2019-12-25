<template>
<div class="Return-list-wrap">
  <van-nav-bar class="nav1" :title="$t('user_main.return')" left-arrow @click-left="onClickLeft" />
  <div class="return_list">

    <!-- <van-tabs v-model="active">
      <van-tab :title="$t('user_main.returnMoney')">
        <van-panel :title="'No.'+ item.orderNumber" v-for="(item,index) in return1" :key="index" >
          <div v-for="(i,k) in item.returnOrderItem" :key="k">
            <van-card :num="i.number" :price="i.price" :desc="i.refundExplain" :title="i.goodsInfoName" :thumb="i.goodsInfoImg" :tag="returnStatus(item.state)">
              <div slot="footer">
                <p>
                  {{ $t("returnList.all") }}{{i.number}}{{ $t("returnList.goods") }}&nbsp;&nbsp;&nbsp; {{ $t("returnList.returnPice") }}
                  <span>￥{{item.amount}}</span>
                </p>
                <van-button size="small " @click="cancel(item.id)" class="button1" v-if="item.refundStatus == 'TODO'||item.returnFlowState == 'INIT' || item.returnFlowState == 'AUDIT'">{{$t("returnList.cancel")}}</van-button>
                

                <van-button size="small " class="button" @click="returndetail(item.order.id,i.orderNumber)">{{$t("returnList.detail")}}</van-button>
              </div>
            </van-card>
            
          </div>
        </van-panel>
      </van-tab>
      <van-tab :title="$t('user_main.return')"> -->
        <van-panel :title="'No.'+ item.orderNumber" v-for="(item,index) in returnlist" :key="index" >
          <div v-for="(i,k) in item.returnOrderItem" :key="k">
            <van-card :num="i.number" :price="i.price" :desc="i.refundExplain" :title="i.goodsInfoName" :thumb="i.goodsInfoImg" :tag="returnStatus(item.state)">
              
            </van-card>
          </div>
          <div slot="footer" class="slot">
                <p>
                  {{ $t("returnList.all") }}{{item.payChannel}}{{ $t("returnList.goods") }}&nbsp;&nbsp;&nbsp; {{ $t("returnList.returnPice") }}
                  <span>￥{{item.amount}}</span>
                </p>
                <van-button size="small "  @click="cancel(item.orderNumber)" class="button1" >{{$t("returnList.cancel")}}</van-button>
                <!-- <van-button size="small " class="button" v-if="item.tradeState.deliverStatus ==='NOT_YET_SHIPPED'">确认收货</van-button> -->

                <van-button size="small " class="button" @click="returndetail(item.order.id,item.orderNumber)">{{$t("returnList.detail")}}</van-button>
              </div>
        </van-panel>
      <!-- </van-tab>

    </van-tabs> -->


  </div>
</div>
</template>

<script src='./index.ts'>


</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
