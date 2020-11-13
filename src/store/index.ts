import { createStore } from 'vuex'

export default createStore({
  state: {
    countryid:''
  },
  mutations: {
    changeCountry(state,data){
      state.countryid = data
    }
  },
  actions: {
    chanageCountry:(ctx,data) =>{
      ctx.commit('changeCountry',data)
    }
  },
  modules: {
  }
})
