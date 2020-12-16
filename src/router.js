import VueRouter from 'vue-router';
import Search from './components/Search';

export default new VueRouter({
  mode: "history",
  routes: [
    {
      name: "Search",
      path: "",
      component: Search,
      props: (route) => ({ query: route.query.q, page: route.query.page }),
    },
  ],
});
