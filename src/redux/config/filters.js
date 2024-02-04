export const SET_FILTER = 'SET_FILTER';

export const setFilter = (newFilter) => ({
  type: SET_FILTER,
  payload: newFilter,
});

const initialState = {
  filterList: ['혜인', '민지', '해린', '다니엘', '하니'],
  selectedFilter: '혜인',
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        selectedFilter: action.payload,
      };
    default:
      return state;
  }
};

export default filters;
