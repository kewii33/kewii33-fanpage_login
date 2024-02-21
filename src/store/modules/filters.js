import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterList: ['혜인', '민지', '해린', '다니엘', '하니'],
  selectedFilter: '혜인',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return {
        ...state,
        selectedFilter: action.payload,
      };
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
