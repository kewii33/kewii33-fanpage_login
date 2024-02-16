import { createStore } from 'redux';
import { combineReducers } from 'redux';
import letters from 'store/modules/letters';
import filters from 'store/modules/filters';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

// const rootReducer = combineReducers({
//   letters,
//   filters,
// });
// const store = createStore(rootReducer, devToolsEnhancer());

const store = configureStore({
  reducer: {
    letters,
    filters,
  },
});

export default store;
