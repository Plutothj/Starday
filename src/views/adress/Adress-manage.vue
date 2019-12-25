<template>
  <div class="Adress-manage-wrap">
    <van-nav-bar class="nav1" :title="$t('address.adressmanger')" left-arrow @click-left="onClickLeft" />
    <div class="Adress-manage">
      <van-radio-group v-model="radio">
        <van-cell-group v-for="(item,index) in adresslist" :key="index">
          <div  class="adress">
            <van-radio
              @click="defalut(index,item.id)"
              slot="right-icon"
              :name="index+1"
              checked-color="#EC5820"
              class="right-icon"
              style="float:left"
              v-model="checked"
            />
            <p class="name">{{item.realName}}&nbsp;</p>
            <p class="detail">{{AreaList.province_list[item.areaId] + " " + AreaList.city_list[item.cityId]+' '}}{{item.deliveryAddress}}</p>
            <p class="phone">手机号：{{item.mobile}}</p>
            <p class="postcode">邮政编码：{{item.postcode}}</p>
            <span style="float:right" class="del" @click="deladress(item.id)">{{$t('address.del')}}</span>
            <span style="float:right" class="edit" @click="goedit(item)">{{$t('address.edit')}}</span>
            <van-divider />
          </div>
        </van-cell-group>
      </van-radio-group>
    </div>

    <div>
      <Button addadress="/addadress" :msg="$t('address.add')" class="button" />
    </div>
  </div>
</template>

<script lang='ts'>
import Button from "../../components/Button.vue";
import api from "../../request/api";
import AreaList from "../../../static/area/areas_all";

import ConstKey from '../../until/const_key'
import Vue from "vue";
import { NavBar,CellGroup,Cell,RadioGroup,Radio,Divider, Toast} from 'vant'
Vue.use(NavBar).use(Cell).use(Divider).use(Radio).use(RadioGroup).use(CellGroup)
import Component from 'vue-class-component'
import {Inject} from 'vue-property-decorator'
@Component({
  components:{
    Button
  }
})
export default class AdressManage extends Vue{
  @Inject() private reload = (this as any).reload

      radio:string= "1"
      adresslist:Array<any>= []
      deliveryAddressId:string= ""
      AreaList:any=AreaList
      checked:string='1'


      defalut(i:any,id:any){
      let that = this as any
      this.radio = i+1
      console.log(this.checked,id)
      that.$axios({
        url:`api/customer/updDefAddress/${id}`,
        method:'post'
      }).then((res:any)=>{
        console.log(res)
        if (res.data.code = "200") {
          that.$toast(that.$t('address.p1'))
          
          if (that.$route.params.type == 1) {
            that.$router.go(-1)
          }
        } 
      })
    }

    onClickLeft() {
      let that = this as any
      that.$router.go(-1);
    }
    goedit(info:any) {
      let that = this as any
      that.$router.push(
      {
        path:'/editadress',
        query:{
          msg:info
        }
      });
    }
    deladress(id:any){
      let that = this as any
      console.log(id)
      that.$fetch(
      `api/customer/delAddress/${id}`,
      
      
    ).then((res:any) => {
      console.log(res);
      if (res.code == '200') {
        Toast(that.$t('address.p2'))
        that.reload()
      }
      
    });
    }

    mounted() {
    let that = this as any;
    that.$fetch(
      api.getAdress,
    ).then((res:any) => {
      console.log(res);
      that.adresslist = res.context;
      that.adresslist.map((item:any) => {
        if (item.def) {
          let index = that.adresslist.indexOf(item);
          that.radio = index + 1;
        }
      });
      
    });
    // this.$axios({
    //   url:"customer/addressinfo",
    //   method: "get"
    // }).then(res => {
    //   console.log(res);
    //   this.deliveryAddressId = res.data.context.deliveryAddressId;
    // });
  }
}

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
.Adress-manage{
  margin-top: 58px;
}
.adress {
  p {
    margin-left: 53px;
  }
  .right-icon {
    margin-top: 30px;
    margin-left: 15px;
  }
  .name {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    height: 20px;
  }
  .detail {
    height: 20px;
    width: 260px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .phone {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .postcode{
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .del {
    margin-top: -110px;
    margin-right: 15px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .edit {
    margin-top: -70px;
    margin-right: 15px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(56, 151, 224, 1);
    line-height: 37px;
  }
}
</style>
