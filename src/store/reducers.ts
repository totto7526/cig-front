import authReducer from './auth/auth.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer
});
