import {createStore} from "vuex";

export default createStore({
  state() {
    return {
      tradingList: [],
      broker: {},
    }
  },
  mutations: {
    setTradingList(state, list){
      state.tradingList = list;
    },

    setBroker(state, brokerRef) {
      state.broker = brokerRef;
    },
  }
})
