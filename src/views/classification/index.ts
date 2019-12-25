import Vue from "vue";
import {
  Tabbar,
  TabbarItem,
  Collapse,
  CollapseItem,
  Cell,
  CellGroup,
  Toast,
  Search
} from "vant";
import navFoot from "../../components/footer.vue";
import api from "../../request/api";
import ConstKey from "../../until/const_key"
Vue.use(Tabbar).use(TabbarItem).use(Collapse).use(CollapseItem).use(Cell).use(CellGroup).use(Toast).use(Search)
import Component from 'vue-class-component'

@Component({
  components: {
    navFoot
  }
})
export default class Classification extends Vue {

  searchValue: String = ""
  activeName: String = "1"
  activeTwo: String = "1"
  navList: Array < any >= []


  // 搜索
  onSearch() {
    this.$router.push("/search");
  }
  // 全部分类
  getAllClass() {
    let that = (this as any);
    var cache_cate = localStorage.getItem(ConstKey.CACHE_ALL_CATEGORY);
    var cache_cate_expir = localStorage.getItem(ConstKey.CACHE_ALL_CATEGORY_EXPIR);
    if ((cache_cate_expir != null && cache_cate_expir > String(Date.now())) && cache_cate != null) {
      that.navList = JSON.parse(cache_cate);
      let list = JSON.parse(cache_cate);
      return;
    }
    //首次加载
    if (cache_cate_expir == null) {
      that.navList = cache_cate;
    }
    that.$fetch(api.HomeCate)
      .then((res:any) => {
        console.log("-------------全部分类--res", res);
        if (res.code == ConstKey.SUCCESS) {

          that.navList = res.context;
          let list = JSON.stringify(res.context);


          localStorage.setItem(ConstKey.CACHE_ALL_CATEGORY, list);
          localStorage.setItem(ConstKey.CACHE_ALL_CATEGORY_EXPIR, String(Date.now() + 1000 * 60 * 24)); //60分钟*24

        } else {
          Toast(res.message);
        }
      });
  }
  //跳转三级分类
  goThreeClass(e:any, m:any) {
    let that = (this as any);
    console.log("----------e", e, m)
    // 传递该三级分类 及 同级分类
    that.$router.push({
      path: 'threeClass',
      name: 'threeClass',
      params: {
        nowClass: e,
        sameClass: m
      }
    })
    let threeClass = JSON.stringify(e)
    let sameClass = JSON.stringify(m)
    window.localStorage.setItem('threeClass', threeClass)
    window.localStorage.setItem('sameClass', sameClass)
  }

  mounted() {
    let that = this;
    that.getAllClass();

  }
}

