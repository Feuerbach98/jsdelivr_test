import Vue from 'vue';
import searchStore from './modules/searchStore';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    searchStore
  }
})
