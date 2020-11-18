import { createStore } from 'vuex'

export default createStore({
  state: {
    countryid:'',
    memberId:'',
  },
  mutations: {
    changeCountry(state,data){
      state.countryid = data
    },
    changeMemberId(state,data){
      state.memberId = data
    }
  },
  actions: {
    chanageCountry:(ctx,data) =>{
      ctx.commit('changeCountry',data)
    },
    changeMemberId:(ctx,data) =>{
      ctx.commit('changeMemberId',data)
    }
  },
  modules: {
  }
})
