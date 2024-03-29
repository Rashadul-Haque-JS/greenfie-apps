import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer