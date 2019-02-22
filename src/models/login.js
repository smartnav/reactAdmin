import {login, forgot, resetpass} from '../services/api'
import {message} from 'antd'; 
export default {
  namespace: 'login',

  state: {
    data: null,},

  subscriptions: {
    setup({ dispatch, history }) { 
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response1 = yield call(login, payload);
	  const response = {status:1, data:{token:'dsfsdf465sd4f6a4f6sf6s'}}
      if(response.status === 0) {message.error(response.message, 5);}
      if(response.status === 1){localStorage.setItem('token',response.data.token);}
      yield put({ 
        type: 'save',
        ...response
      });
    },
    *forgot({ payload }, { call, put }) {
      const response = yield call(forgot, payload); 
      if(response.status === 0) {message.error(response.message, 5);} 
      if(response.statusCode === 1) {message.success(response.message, 5);} 
      localStorage.removeItem('token')   
      yield put({ 
        type: 'forgotinfo',
        ...response
      });
    },
    *reset({ payload }, { call, put }) { 
      const response = yield call(resetpass, payload);
      if(response.status === 0) {message.error(response.message, 5);}
      if(response.statusCode === 1) {message.success(response.message, 5);}
      yield put({ 
        type: 'resetpassword',
        ...response
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state,
        data:action };
    },
    forgotinfo(state, action) {
      return { ...state,
        forgot:action };
    },
    resetpassword(state, action) {
      return { ...state,
        reset:action };
    },
  },
};