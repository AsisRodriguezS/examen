import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    product: {},
    products: []
  },
  mutations: {
    setProduct: (state, product) => (state.product = product),
    setProducts: (state, products) => (state.products = products),
    addProduct: (state, product) => (state.products.push(product))
  },
  actions: {},
  modules: {}
});
