<template>
  <div class="Addcard-wrap">
    <van-nav-bar :title="$t('address.editadress')" :left-text="$t('returnGoods.cancel')" left-arrow @click-left="onClickLeft" />
    <div>
      <van-field
        v-model="info.realName"
        class="reg_emile L0"
        clearable
        :placeholder="$t('addcard.name')"
        clickable
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('address.name2')"
      />
      <van-field
        v-model="info.postcode"
        class="reg_emile L0"
        clearable
        :placeholder="$t('address.postalCode')"
        clickable
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('address.postalCode2')"
      />
      <van-field
        v-model="info.address"
        disabled
        class="emile"
        :placeholder="str"
        right-icon="arrow-down"
        clickable
        @click-right-icon="toggle"
        :label="$t('address.local')"
      />
      <van-field
        v-model="info.deliveryAddress"
        class="reg_emile L0"
        clearable
        :placeholder="$t('address.detail')"
        clickable
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('address.detail2')"
      />
      <van-field
        v-model="info.mobile"
        class="reg_emile L0"
        clearable
        :placeholder="$t('address.phonenum')"
        clickable
        :error-message="errormsg"
        @input="Regemil"
        :label="$t('address.phone')"
      />
      <van-checkbox class="check" v-model="info.def" checked-color="#EC5820">{{$t('address.defalut')}}</van-checkbox>
    </div>
    <van-action-sheet v-model="show" :title="$t('address.change')" >
      <van-area :area-list="AreaList" @confirm="tap"  :confirm-button-text="$t('returnGoods.submit')" :cancel-button-text="$t('returnGoods.cancel')"/>
    </van-action-sheet>
    <!-- <van-button type="warning" size="large" to="/addadress">保存</van-button> -->
    <Button  :msg="$t('addcard.save')" @click="save" />
  </div>
</template>

<script lang='ts'>
import api from "../../request/api";
import Button from "../../components/Button.vue";
import AreaList from "../../../static/area/areas_all";
import ConstKey from '../../until/const_key'
import Vue from "vue";
import { NavBar,Field,Checkbox,ActionSheet,Area,Toast} from 'vant'
Vue.use(NavBar).use(Field).use(Checkbox).use(ActionSheet).use(Area).use(Toast)
import Component from 'vue-class-component'

@Component({
  components: {
    Button
  }
})
export default class Editadress extends Vue{

      str:string=''
      checked:boolean= false
      adress:string= ""
      name:string= ""
      number:string= ""
      errormsg:string= ""
      AreaList:any =AreaList
      detailadress:string= ""
      phone:string= ""
      show:boolean= false
      info:object={}
      areaid:string=""
      cityid:string= ""
      customerId:string= ""
      deliveryAddressId:string=''

    onClickLeft() {
      let that = (this as any)
      that.$router.go(-1);
    }
    Regemil() {}
    toggle() {
      let that = (this as any)
      that.show = true;
      that.adress = "";
    }
    tap(e:any) {
      console.log(e);
      
       
      this.adress += e[0].name + " "+ e[1].name;
     
      this.show = false;
      this.areaid = e[0].code;
      this.cityid = e[1].code;
    }
    save() {
      
      let that = (this as any)
      console.log('tag', that.info)
      that.$post(
        api.updateAdress,
        
        that.info
      ).then((res:any)=>{
        console.log(res)
        if (res.code == ConstKey.SUCCESS) {
          that.$toast(that.$t('user_info.success'))
          that.$router.go(-1)
        }else {
          that.$toast('supply.repeat')
        }
      });
      
    }

  created() {
     let that = (this as any)
    that.id = that.$route.query.id;
    
  }
  mounted() {
    let that = (this as any)
    console.log(that.$route.query.msg);
    that.info=that.$route.query.msg
  }
}

</script>
<style lang="scss" scoped>
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
