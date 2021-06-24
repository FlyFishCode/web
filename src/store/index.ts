import { createStore } from 'vuex'

export default createStore({
  state: {
    countryid:'',
    memberId:'',
    location:"",
  },
  mutations: {
    changeCountry(state,data){
      state.countryid = data
    },
    changeMemberId(state,data){
      state.memberId = data
    },
    changeLocation(state,data){
      state.location = data
    }
  },
  actions: {
    chanageCountry:(ctx,data) =>{
      ctx.commit('changeCountry',data)
    },
    changeMemberId:(ctx,data) =>{
      ctx.commit('changeMemberId',data)
    },
    changeLocation:(ctx,data) =>{
      ctx.commit('changeLocation',data)
    }
  },
  modules: {
  }
})
