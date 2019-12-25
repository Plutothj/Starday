<template>
  <div class="Commont-wrap">
    <van-nav-bar class="nav1" :title="$t('supply.send')" left-arrow @click-left="onClickLeft" />
    <div class="pancel">
      <div class="rate">
        <img class="shop_img" :src="info.img" alt />
        <span>{{$t('commont.goodsrate')}}</span>
        <van-rate v-model="value" @change="score" />
        <span>{{$t('commont.serverrate')}}</span>
        <van-rate v-model="value1" @change="score" />
        <span>{{$t('commont.deliverrate')}}</span>
        <van-rate v-model="value2" @change="score" />
        <p>{{mark}}</p>
      </div>

      <van-cell-group>
        <van-field
          v-model="message"
          :label="$t('commont.rate')"
          type="textarea"
          :placeholder="$t('commont.inputrate')"
          rows="3"
          autosize
        />
      </van-cell-group>
      <van-uploader

        v-model="fileList"
        multiple
        :max-count="3"
        class="upimg"
        :after-read="afterRead"
      />
      <van-divider :style="{ color: '#E5E5E5', borderColor: '#E5E5E5', padding: '0 15px' }" />
      <van-checkbox v-model="checked" checked-color="#EC581E" class="noname">{{$t('commont.noname')}}</van-checkbox>
    </div>
    <van-button size="large" class="button" @click="submit">{{$t('commont.submint')}}</van-button>
  </div>
</template>

<script>
import api from "../../request/api";
import ConstKey from '../../until/const_key'
import Vue from 'vue'
import {NavBar,CellGroup,Field,Uploader,Divider,Checkbox,Button,Rate} from 'vant'
Vue.use(NavBar).use(CellGroup).use(Field).use(Uploader).use(Divider).use(Checkbox).use(Button).use(Rate)
export default {
  name: "Commont",
  data() {
    return {
      value: 0,
      value1: 0,
      value2: 0,
      fileList: [],
      message: "",
      checked: "",
      mark: "",
      info: {},
      imglist:[],
      imginfo:{
        imageName:'',
        artworkUrl:''
      }
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    afterRead(file) {
      let formfile = new FormData();
      console.log(file.file.name)
      
      formfile.append("uploadFile", file.file);
      this.$axios
        .post('common/uploadResource?resourceType=IMAGE', formfile)
        .then(res => {
          console.log(res);
          this.imginfo.imageName = file.file.name
          this.imginfo.artworkUrl = res.data.context[0]
          this.imglist.push(this.imginfo)
        });
        
    },
    submit() {
      console.log(this.imglist)
      let that = this;
      this.$post(
        api.goodsEvaluate,
        
        {
          goodsInfoId: "8000016e860e149d3572526fcc748670",
          orderNumber: "3191217152841138",
          orderId: "683",
          customerId: "8000016ed3068c7a06ecd06680700439",
          goodsImg: "https://sanyi-images.oss-cn-hongkong.aliyuncs.com/refund/20191217154048/8000016f6dcd657612878050d96b3ddb.jpeg",
          evaluateScore: 5,
          evaluateContent: "323213123",
          
        }
      ).then(res=>{
        console.log(res)
        if (res.code == ConstKey.SUCCESS) {
          this.$toast(this.$t('commont.success'))
          this.$router.go(-1)
        } else {
          this.$toast(res.message)
        }
      });
      ;
    },
    score(num) {
      if (num == 5) {
        this.mark = this.$t('commont.p1');
      } else if (num == 4) {
        this.mark = this.$t('commont.p2');
      } else if (num == 3) {
        this.mark = this.$t('commont.p3');
      } else if (num == 2) {
        this.mark = this.$t('commont.p4');
      } else {
        this.mark = this.$t('commont.p5');
      }
    }
  },
  mounted() {
    console.log(this.$route.query);
    this.info = this.$route.query;
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
.pancel {
  overflow: hidden;
  margin-top: 70px;
  padding-left: 15px;
  span {
    float: left;
    width: 45px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    margin-left: 10px;
  }
  p {
    height: 33px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-left: 110px;
  }
  .noname {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .van-checkbox__label {
    color: rgba(153, 153, 153, 1);
  }
}
.shop_img {
  width: 84px;
  height: 84px;
  display: block;
  float: left;
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
.rate {
  span {
    width: 100px;
  }
}
</style>
