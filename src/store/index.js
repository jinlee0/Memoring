import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    userId: null,
    userEmail: null,
    userNick: null,
  },
  getters: {
    getIsAuth(state) {
      return state.isAuth;
    },
    getUserNick(state) {
      return state.userNick;
    },
    getUserEmail(state) {
      return state.userEmail;
    },
    getUserId(state) {
      return state.userId;
    },
    getUser(state) {
      return {
        id: state.userId, email: state.userEmail, nick: state.userNick
      }
    }
  },
  mutations: {
    setIsAuth(state, payload) {
      state.isAuth = payload;
    },
    setUser(state, { email = state.userEmail, nick = state.userNick, id = state.userId }) {
      state.userEmail = email; state.userNick = nick; state.userId = id;
    },
    setUserNick(state, payload) {
      state.userNick = payload;
    }
  }
});