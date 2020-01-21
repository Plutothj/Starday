<template>
  <div>
    <van-nav-bar class="nav1" :title="$t('returnGoods.return')" left-arrow @click-left="onClickLeft" />
    <div class="cell">
      <van-cell-group>
        <!-- <van-cell title="退款类型" is-link :value='msg' clickable @click="tap"/> -->

        <van-cell :title="$t('returnGoods.returnmsg')" is-link :value="msg1" clickable @click="tap1" />
      </van-cell-group>
      <p class="returnmoney">{{$t('returnGoods.returnPice')}}￥{{price}}</p>
      
      <p class="returnmoney">
        
        <van-radio-group v-model="radio">
        <van-radio checked-color="#ed5821" name="0" class="radio">{{$t('user_main.returnMoney')}}</van-radio>
        <van-radio checked-color="#ed5821" name="1">{{$t('user_main.return')}}</van-radio>
      </van-radio-group>
        
      </p>
      <van-cell-group>
        <van-field
          v-model="message"
          :label="$t('returnGoods.returnInfo')"
          type="textarea"
          :placeholder="$t('returnGoods.changge')"
          rows="1"
          autosize
        />
      </van-cell-group>
    </div>
    <div>
      <van-panel :title="$t('returnGoods.upinfo')">
        <div>
          <van-uploader
            class="uploder"
            v-model="fileList"
            multiple
            icon="photograph"
            :max-count="3"
            :after-read="afterRead"
          />{{$t('returnGoods.three')}}
        </div>
      </van-panel>
    </div>
    <van-button size="large" class="button" @click="sunmbit">{{$t('returnGoods.submit')}}</van-button>
    <!-- <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
        @cancel="onCancel"
    />-->
    <van-action-sheet
      v-model="show1"
      :actions="actions1"
      :cancel-text="$t('returnGoods.cancel')"
      @select="onSelect1"
      @cancel="onCancel1"
    />
  </div>
</template>

<script>

import api from "../../request/api";
import ConstKey from "../../until/const_key"
import Vue from "vue";
import { Cell, CellGroup, Toast,NavBar, Panel ,Button,ActionSheet,Uploader,Field,RadioGroup, Radio} from "vant";

Vue.use(Cell).use(CellGroup).use(Toast).use(NavBar).use(Panel).use(Button).use(ActionSheet).use(Uploader).use(Field)
Vue.use(RadioGroup);
Vue.use(Radio);


export default {
  name: "returngoods",
  data() {
    return {
      radio:'1',
      price: "",
      message: "",
      fileList: [],
      show: false,
      show1: false,
      msg: "请选择退款类型",
      msg1: this.$t('returnGoods.returnType'),
      //   actions: [
      //     { name: "返品理由を選択してください" },
      //     { name: "注文した商品とは違う商品が届いた" },
      //     { name: "サイト上の説明と違った" },
      //     { name: "毀損、汚損、紛失" },
      //     { name: "性能や品質が良くない6.そのほか" }
      //   ],
      actions1: [
        { name: "返品理由を選択してください" },
        { name: "注文した商品とは違う商品が届いた" },
        { name: "サイト上の説明と違った" },
        { name: "毀損、汚損、紛失" },
        { name: "性能や品質が良くない6.そのほか" }
      ],
      id: "",
      returnReason: "",
      images: [],
      imginfo: {
        returnImg: ""
      },
      skuId: '',
      spuId: '',
      storeId: '',
      skuNo: '',
      returnType:[]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-2);
    },
    // onSelect(value){
    //     console.log(value.name)
    //     this.msg= value.name
    //     this.show = false
    // },
    onSelect1(value) {
      console.log(this.actions1.indexOf(value));
      this.returnReason = this.actions1.indexOf(value);
      this.msg1 = value.name;
      this.show1 = false;
    },
    onCancel() {},
    onCancel1() {},
    tap() {
      this.show = true;
    },
    tap1() {
      this.show1 = true;
    },
    afterRead(file) {
      
      console.log(file);

      
      this.$post(
          api.upImage,
          {
            filedir:file.content,
            suffix:'returnGoods'
          }
        )
        .then(res => {
          console.log(res);
          this.imginfo.returnImg = res.context;
          this.images.push(this.imginfo);
        });
    },
    sunmbit() {
      let that = this;
      let key = this.returnReason;
      
      this.$post(
        
        api.SubmitreturnOrder,
        {
          orderNumber:that.skuNo,
          orderId:that.id,
          returnReason: that.returnReason,
          refundExplain: that.message,
          imgList: that.images,
          refundType:that.radio
        }
      ).then(res => {
        console.log(res);
        if (res.code == '200'){
            
            that.$router.push('/returnlist')
        }else {
          // Toast(res.message)
        }
      });
    },
    getReasons(){
      let that = this;
      that.$fetch(
        api.getReasons
      ).then(res=>{
        // console.log('tag', res)
        
      })
    },
    getData(){
      this.id = this.$route.query.orderId;
      
      this.skuNo = this.$route.query.orderInfoNumber
      this.$fetch(
        api.getorderDetail,
        {
          orderInfoNumber: this.skuNo,
          orderId: this.id
        }
      ).then(res=>{
        console.log('tag', res)
        if (res.code == '200'){
          this.price = res.context.orderInfoDTO.amount
        }
        
      })
    },
    getReturnType(){
      let that = this;
      that.$fetch(
        api.getReturnType
      ).then(res=>{
        console.log('tag', res)
        that.returnType = res.context
      })
    }
  },
  mounted() {
    this.getReasons()
    this.getData()
    this.getReturnType()
    // console.log(this.$route.query)
    
  }
};
</script>

<style lang="scss" scoped>
.nav1 {
  width: 400px;
  height: 44px;
  position: fixed;
  top: 0;
  .van-ellipsis {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
    margin-left: 60px;
  }
  .van-nav-bar__left i {
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.cell {
  margin-top: 70px;
}
.returnmoney {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding-left: 15px;
}
.uploder {
  padding-left: 10px;
}
.button {
  background-color: #ed5821;
  width: 100%;
  height: 49px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 49px;
  position: absolute;
  bottom: 0;
}
.radio{
  margin-bottom: 20px;
}
</style>