import VueRouter from 'vue-router';
import Search from './components/Search';

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "Search",
      path: "/",
      component: Search,
      props: (route) => ({ query: route.query.q, page: route.query.page }),
    },
  ],
});
