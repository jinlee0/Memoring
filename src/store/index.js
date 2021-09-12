import Vue from 'vue';
import Vuex from 'vuex';
import auth from '../common/token';
import http from "../http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: !!auth.getAccessToken(),
    user: {
      id: null,
      email: null,
      createdAt: null,
    },
    tokens: {
      accessToken: auth.getAccessToken(),
      refreshToken: null,
    }
  },
  getters: {
    getTokens(state) {
      return state.tokens;
    },
    getAccessToken(state) {
      return state.tokens.accessToken;
    },
    getRefreshToken(state) {
      return state.tokens.refreshToken;
    },
    isAuth(state) {
      return state.isAuth;
    },
    getUserEmail(state) {
      return state.user.email;
    },
    getUserId(state) {
      return state.user.id;
    },
    getUser(state) {
      return {
        id: state.user.id, email: state.user.email, createdAt: state.user.createdAt
      }
    }
  },
  mutations: {
    login(state, payload) {
      state.user.id = payload.id;
      state.user.email = payload.email;
      state.user.createdAt = payload.createdAt;
      state.tokens.accessToken = payload.accessToken;
      state.isAuth = true;
      auth.setAccessToken(payload.accessToken);
    },
    logout(state) {
      state.tokens.accessToken = null;
      state.isAuth = false;
      auth.removeToken();
    },
    setTokens(state, payload) {
      state.tokens.accessToken = payload.accessToken; state.tokens.refreshToken = payload.refreshToken;
    },
    setIsAuth(state, payload) {
      state.isAuth = payload;
    },
    setUser(state, payload) {
      state.user.id = payload.id; state.user.email = payload.email; state.user.createdAt = payload.createdAt;
    },
  },
  actions: {
    signup(context, payload) {
      let { email, password } = payload;
      return new Promise((resolve, reject) => {
        http
          .post("/api/auth/join", { email, password })
          .then((res) => {
            context.commit("login", res.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
      })
    },
    login(context, payload) {
      let { email, password } = payload;
      return new Promise((resolve, reject) => {
        http
          .post("/api/auth/login", { email, password })
          .then((res) => {
            context.commit("login", res.data);
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          })
      })
    },
    logout(context, payload) {
      return new Promise((resolve) => {
        context.commit("logout", payload);
        resolve();
      })
    },
    getMe(context) {
      return new Promise((resolve, reject) => {
        http
          .get('/api/auth/me')
          .then((res) => {
            context.commit("setUser", res.data);
            resolve(res);
          }).catch((err) => {
            console.log(err);
            reject(err);
          })

      })
    }
  },
});