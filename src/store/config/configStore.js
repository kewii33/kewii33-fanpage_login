import letters from 'store/modules/letterSlice';
import filters from 'store/modules/filterSlice';
import authSlice from 'store/modules/authSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  letters,
  filters,
  authSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
