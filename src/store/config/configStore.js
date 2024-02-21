import { createStore } from 'redux';
import letters from 'store/modules/letters';
import filters from 'store/modules/filters';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    letters,
    filters,
  },
});

export default store;
