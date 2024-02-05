import { createStore } from 'redux';
import { combineReducers } from 'redux';
import letters from '../config/letters';
import filters from '../config/filters';
import { devToolsEnhancer } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  letters: letters,
  filters: filters,
});
const store = createStore(rootReducer, devToolsEnhancer());

export default store;
