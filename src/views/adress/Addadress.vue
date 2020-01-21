<template>
  <div class="Addcard-wrap">
    <van-nav-bar class="nav1" :title="$t('address.address')"  left-arrow @click-left="onClickLeft" />
    <div>
      <van-field
        v-model="name"
        class="reg_emile L0"
        clearable
        :placeholder="$t('addcard.name')"
        clickable
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('address.name2')"
      />
      <van-field
        v-model="number"
        class="reg_emile L0"
        type="number"
        clearable
        maxlength=7
        :placeholder="$t('address.postalCode')"
        clickable
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('address.postalCode2')"
      />
      <van-field
        v-model="adress"
        disabled
        class="emile"
        :placeholder="str"
        right-icon="arrow-down"
        clickable
        @click="toggle"
        :label="$t('address.local')"
      />
      <van-field
        v-model="detailadress"
        class="reg_emile L0"
        clearable
        :placeholder="$t('address.detail')"
        clickable
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('address.detail2')"
      />
      <van-field
        v-model="phone"
        class="reg_emile L0"
        clearable
        :placeholder="$t('address.phonenum')"
        clickable
        type="number"
        maxlength=11
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('address.phone')"
      />
      <van-checkbox class="check" v-model="checked" checked-color="#EC5820">{{$t('address.defalut')}}</van-checkbox>
    </div>
    <van-action-sheet v-model="show" :title="$t('address.change')" >
      <van-area :area-list="areaList" @confirm="tap"  :confirm-button-text="$t('returnGoods.submit')" :cancel-button-text="$t('returnGoods.cancel')"/>
    </van-action-sheet>

    <Button :msg="$t('address.use')" @click="addadress" />
  </div>
</template>

<script lang='ts'>
import Button from "../../components/Button.vue";
import AreaList from "../../../static/area/areas_all";
import api from "../../request/api";
import ConstKey from "../../until/const_key"
import Vue from "vue";
import { NavBar,Field,Checkbox,ActionSheet,Area,Toast} from 'vant'
import Component from 'vue-class-component';
Vue.use(NavBar).use(Field).use(Checkbox).use(ActionSheet).use(Area).use(Toast)

@Component({
  components:{
    Button
  }
})
export default class Addcard extends Vue{


      checked:string= ""
      str:string= ""
      name:string= ""
      number:string= ""
      errormsg:string= ""
      adress:string= ""
      detailadress:string= ""
      phone:string= ""
      show:boolean= false
      areaList:any= AreaList
      areaid:string= ""
      cityid:string= ""
      provinceId:string = ""
      customerId:string= ""
      id:string=''


    onClickLeft() {
      let that = this as any
      that.$router.go(-1);
    }
    Regemil() {}
    toggle() {
      this.show = true;
      this.str = "";
    }
    tap(e:any) {
      console.log(e)
      this.str = "";
      let city:string = ''
      if(e[1].name ==e[2].name ){
        city = e[1].name
      }else{
        city = e[1].name + " " +e[2].name
      }
      this.str += e[0].name + " "+ city
      this.show = false;
      this.areaid = e[1].code;
      this.cityid = e[2].code;
      this.provinceId =e[0].code
    }
    addadress() {
      let that = this as any
      let emile= that.number.slice(0,3)+'-'+that.number.slice(3,7)
      console.log(emile)
      if (emile.length==8&&that.phone.length>=6&&that.phone.length<=15&&that.name.length&&that.number.length&&that.detailadress.length) {
        that.$post(
        api.updateAdress,
        {
          

          accountId: that.id,
          address: that.str,
          areaId: that.areaid,
          cityId: that.cityid,
          def: that.checked,
          deliveryAddress: that.detailadress,
          id: "",
          mobile: that.phone,
          postcode: emile,
          provinceId: that.provinceId,
          realName: that.name
        }
      ).then((res:any)=>{
        console.log(res)
        if (res.code == ConstKey.SUCCESS) {
          Toast(that.$t('address.success'))
          that.$router.go(-1)
        } else {
          Toast(res.message)
        }
      });
      }else{
        Toast(that.$t('address.postcode'))
      }
      
    }
    mounted() {
      let that = this as any
    that.id = localStorage.getItem('accountid')
    }
}

</script>
<style lang="scss" scoped>
.nav1 {
 
  .van-nav-bar__left i {
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.check {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-left: 15px;
  margin-top: 25px;
}
button {
  position: absolute;
  bottom: 0;
  background: rgba(236, 88, 30, 1);
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 42px;
  margin-top: 16px;
}
</style>
