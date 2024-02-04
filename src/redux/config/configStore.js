import { createStore } from 'redux';
import { combineReducers } from 'redux';
import letters from '../config/letters';
import filters from '../config/filters';

const rootReducer = combineReducers({
  letters: letters,
  filters: filters,
});
const store = createStore(rootReducer);

export default store;
