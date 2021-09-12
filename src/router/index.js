import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const checkAuth = required => (to, from, next) => {
  const isAuth = store.getters["isAuth"];
  if ((isAuth && required) || (!isAuth && !required)) {
    return next();
  } else {
    next("/auth/log-in");
  }
}
import Main from "../views/Main.vue";
import Auth from "../views/Auth.vue";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
      beforeEnter: checkAuth(true),
    },
    {
      path: '/auth/:path',
      name: 'auth',
      component: Auth,
      props: true,
      beforeEnter: checkAuth(false),
    },

  ]
})