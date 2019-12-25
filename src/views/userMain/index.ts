import navFoot from "../../components/footer.vue";
import api from "../../request/api";
import common from "../../until/common";
import Vue from "vue";
import {
  Image,
  Icon,
  Cell,
  Tag
} from 'vant'
Vue.use(Image).use(Icon).use(Cell).use(Tag)
import Component from 'vue-class-component'



@Component({
  components: {
    navFoot,
  }
})

export default class UserMain extends Vue {

  //data
  userinfo: object = {}
  tag: String = ""
  active: String = '3'
 






  //methods
  setting(): void {
    this.$router.push('/setting')
  }
  assess(): void {
    (this as any).$router.push({
      path: "/assess",
      query: {
        index: 4
      }
    });
  }
  add(): void {
    console.log("aa");
    (this as any).$store.commit("add", 2);
    console.log("----------vuex", (this as any).$store.state.count);
  }
  //mounted
  mounted() {
    // if (!this.checkIsLogin()) {
    //   return;
    // }
    // console.log("----------------vuex", this.$store.state.count);
    (this as any).$fetch(

      api.getUserInfo

    ).then((res: any) => {
      console.log('----------个人信息', res);
      this.userinfo = res.context;

    });
    (this as any).$post(

      api.likeGoods, {
        customerId: localStorage.getItem('accountid')
      }
    ).then((res: any) => {
      console.log(res);
      this.tag = res.context.length;
    });
  }



}
