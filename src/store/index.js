import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false
  },
  getters: {
    getIsAuth(state) {
      return state.isAuth;
    }
  },
  mutations: {
    setIsAuth(state, payload) {
      state.isAuth = payload;
    }
  }
});