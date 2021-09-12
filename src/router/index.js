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

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Main.vue'),
      beforeEnter: checkAuth(true),
    },
    {
      path: '/auth/:path',
      name: 'auth',
      component: () => import('../components/Auth.vue'),
      props: true,
      beforeEnter: checkAuth(false),
    },

  ]
})