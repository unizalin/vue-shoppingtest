import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'jquery'

Vue.use(Vuex)

export default new Vuex.Store({
  // state 屬於模組區域變數
  // actions mutations getters 屬於全域變數
  // 如同 data
  state: {
    isLoading: false,
    products: [],
    product: {},
    cart: {
      carts: [],
    },
    status: {
      loadingItem: '', // 判斷哪個元素/產品，讀取中
    },
    form: {
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: ''
    },
  },
  // 如同 methods，進行非同步的行為以及取得資料
  // 操作行為，不能直接操作資料狀態
  actions: {
    // 第一個固定為context vuex 固定參數
    // status 正確應該稱=> payload 載荷 =>外部參入的參數
    updateLoading(context, status) {
      //會從 mutations 取得要操作的行為
      context.commit('LOADING', status)
    },
    getProducts(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      // 直接從 Vuex 抓取判定
      // vm.$store.state.isLoading = true;
      // 更改為 vuex 用法
      // dispatch 連結 vuex 裡面的 actions
      // vm.$store.dispatch('updateLoading', true)
      context.commit('LOADING', true)
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products)
        console.log('getProducts', response);
        // vm.$store.state.isLoading = false;
        context.commit('LOADING', false)
      });
    },
    getProduct(context, id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      // vm.status.loadingItem = id; //針對單獨的購物選單做讀取
      console.log('getProduct', url)
      context.commit('STATUS', id)
      console.log('status', context.commit('STATUS', id))
      axios.get(url).then((response) => {
        // vm.product = response.data.product;
        context.commit('PRODUCT', response.data.product)
        $('#productModal').modal('show');
        console.log('getProduct', response);
        context.commit('STATUS', '')
      });
    },
    //須帶入 商品id 跟 數量
    addtoCart(context, { id, qty = 1 }) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      // vm.status.loadingItem = id;
      context.commit('LOADING', true)
      context.commit('STATUS', id)
      console.log('addtoCart', context.commit('STATUS', qty))
      const cart = {
        product_id: id,
        qty
      }
      axios.post(url, { data: cart }).then((response) => {
        console.log('addCart', response);
        // vm.status.loadingItem = '';
        context.commit('STATUS', '')
        // vm.getCart();
        context.dispatch('getCart')
        context.commit('LOADING', false)
        $('#productModal').modal('hide');
      });
    },
    getCart(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      // vm.$store.state.isLoading = true;
      // vm.$store.dispatch('updateLoading', true)
      context.commit('LOADING', true)
      axios.get(url).then((response) => {
        // vm.products = response.data.products;
        // vm.cart = response.data.data;
        context.commit('CART', response.data.data)
        console.log('getCart', response);
        // vm.$store.state.isLoading = false;
        // vm.$store.dispatch('updateLoading', false)
        context.commit('LOADING', false)
      });
    },
    removeCartItem(context, id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      // vm.$store.state.isLoading = true;
      // vm.$store.dispatch('updateLoading', true)
      context.commit('LOADING', true)
      axios.delete(url).then((response) => {
        // vm.products = response.data.products;
        // vm.cart = response.data.data;
        // vm.getCart();
        context.dispatch('getCart')
        console.log('removeCartItem', response);
        // vm.$store.state.isLoading = false;
        // vm.$store.dispatch('updateLoading', false)
        context.commit('LOADING', false)
      });
    },
  },
  // 改變資料內容
  // 操作狀態
  // 使用常數命名（大寫）取決於開發者，好辨識
  mutations: {
    //第一格固定為 state 為vuex 裡面state
    // 第二個參數跟 actions 一樣
    LOADING(state, status) {
      state.isLoading = status;
    },
    PRODUCTS(state, payload) {
      state.products = payload
    },
    PRODUCT(state, payload) {
      state.product = payload
    },
    CART(state, payload) {
      state.cart = payload
    },
    FORM(state, payload) {
      state.form = payload
    },
    STATUS(state, payload) {
      state.status = payload
      console.log(state.status)
    },
    COUPON_CODE(state, payload) {
      state.coupon_code = payload
    }
  },
  getters: {
    products(state) {
      return state.products
    },
    cart(state) {
      return state.cart
    },
    isLoading(state) {
      return state.isLoading
    },
    product(state) {
      return state.product
    },
    status(state) {
      return state.status
    },
    form(state) {
      return state.form
    }

  }
})