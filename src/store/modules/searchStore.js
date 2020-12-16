import { getPackagesFromServer, getPackageFromServer } from '../../api/api';

export default {
  actions: {
    async fetchPackages(ctx, query) {
      ctx.commit("updateState", {
        prop: "searchResult",
        result: await getPackagesFromServer(query, 20),
      });
    },
    async fetchPackage(ctx, query) {
      ctx.commit("updateState", {
        prop: "currentPackage",
        result: await getPackageFromServer(query.text, query.version),
      });
    },
  },
  mutations: {
    updateState(state, newState) {
      state[newState.prop] = newState.result;
    },
  },
  state: {
    currentPackage: null,
    searchResult: [],
  },
  getters: {
    getPackages(state) {
      return state.searchResult.objects;
    },
    getPackage(state) {
      return state.currentPackage;
    },
  },
};
