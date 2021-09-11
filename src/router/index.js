import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from './../components/Main.vue';
import Auth from './../components/Auth.vue';

Vue.use(VueRouter);


export default new VueRouter({
  mode: "history",
  routes: [
    { path: '/', component: Main },
    { path: '/auth/:path', component: Auth, props: true }
  ]
})