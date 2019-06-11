import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 如同 data
  state: {
    isLoading: false,
  },
  // 如同 methods，進行非同步的行為以及取得資料
  // 操作行為，不能直接操作資料狀態
  actions: {
    // 第一個固定為context vuex 固定參數
    // status 正確應該稱=> payload 載荷 =>外部參入的參數
    updateLoading(context, status) {
      //會從 mutations 取得要操作的行為
      context.commit('LOADING', status)
    }
  },
  // 改變資料內容
  // 操作狀態
  // 使用常數命名（大寫）取決於開發者，好辨識
  mutations: {
    //第一格固定為 state 為vuex 裡面state
    // 第二個參數跟 actions 一樣
    LOADING(state, status) {
      state.isLoading = status;
    }
  }
})