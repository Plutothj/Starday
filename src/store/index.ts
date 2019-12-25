import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmile: '',
    accountid:'',
    userName:''
  },
  mutations: {
    Emile(state,emile:string){
      state.userEmile = emile
    },
    Accountid(state,id:string){
      state.accountid = id
    },
    UserName(state,name:string){
      state.userName = name
    }
    
  },
  actions: {
    saveEmile({commit},emile:string){
      commit('Emile',emile)
    },
    saveId({commit},id:string){
      commit('Accountid',id)
    },
    saveName({commit},name:string){
      commit('UserName',name)
    },
   
  },
  modules: {
  }
})
