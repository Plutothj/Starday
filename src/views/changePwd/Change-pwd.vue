<template>
    <div>
        <van-icon class="icon" name="arrow-left" @click="onClickLeft"  style="font-size:24px"/>
        <h1>修改密码</h1>
        
        <div class="reset">
            <van-cell-group>
              <van-field
                    v-model="nowpwd"
                    class="reset_emile"
                    clearable
                    placeholder= '请输入现用密码'
                    clickable
                    
                />
                <van-field
                    v-model="newpwd"
                    class="reset_emile"
                    clearable
                    placeholder= '请输入新密码'
                    clickable
                    
                />
                <van-field
                    v-model="newpwd1"
                    class="reset_emile"
                    clearable
                    placeholder= '确认密码'
                    clickable
                    
                />
            </van-cell-group>
               
                <van-button type="warning" size="large" @click="send">确定</van-button>
                
        </div>
    </div>
</template>

<script>
import api from "../../request/api";
import Vue from "vue";
import { gettime } from '../../until/until'
import {
  NavBar,
  Icon,
  Cell,
  CellGroup,
  Button,
  Toast,
  Field
} from "vant";
Vue.use(NavBar).use(Icon).use(Field).use(Cell).use(CellGroup).use(Toast).use(Button)

export default {
    name: 'Resetpwd',
    data() {
        return {
            nowpwd:'',
            newpwd:'',
            newpwd1:''
            
        }
    },
    components:{
        
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        send(){
            let that = this
            if (that.nowpwd.length&&that.newpwd.length&&that.newpwd1.length){
             
            that.$post(
                api.updatePass,
                {
                    password:that.newpwd,
                    passwordRepeat:that.newpwd1,
                    oldPassword:that.nowpwd
                }
            ).then(res=>{
                if (res.code == 200){
                    Toast(res.message)
                    that.logout() 
                }else {
                    Toast(res.message)
                }
            })
            }else {
                Toast('正しい形式を入力してください')
            }
            
            
            
           
           
        },
        logout() {
            let that = this
            that.$post(
                api.logOut
            ).then((res)=>{
                if (res.code == '200') {
                that.$router.push("/login");
                }
            })
            
            }
    }

}
</script>

<style lang='scss' scoped>
    .icon{
        position: absolute;
        top:39px;
        margin-left: 20px;
        font-size: 18px;
        color: #999
    }
    h1{
        width:94px;
        height:22px;
        font-size:23px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:17px;
        margin-top: 95px;
        margin-left: 20px;
    }
    
    .reset{
        width: 335px;
        height: 44px;
        margin: 0 auto;
        margin-top: 64px;
        
        .reset_emile{
            height: 44px;
            margin-bottom: 10px;
            background-color: #F2F2F2;
            line-height:20px;
            font-size:16px;
            
        }
        button{
            background-color: #ED5821;
            height: 44px;
            font-size: 16px;
            margin-top: 30px;
            border-radius:5px;
            line-height: 44px;
        }
        
        
        
    }
    
</style>
