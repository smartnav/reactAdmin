//import {login, forgot, resetpass} from '../services/api'
export default {
  namespace: 'global',
  state:{toggleval:false},
  subscriptions: {
    setup({ dispatch, history }) { 
    },
  },
  // effects: {
  //   *togglemenu({ payload }, { put }) { 

  //     yield put({type: 'toggle', ...payload});
  //   },
  // },
  reducers: {
    toggle(val) { 
      console.log(val);
      return {toggleval:!val.toggleval};
    },
    minus(count) { return count - 1 },
  },
};
