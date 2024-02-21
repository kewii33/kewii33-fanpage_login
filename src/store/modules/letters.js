import db from '../../db.json';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  letters: db.letters,
  filter: ['혜인'],
};

const lettersSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {
    addLetter: (state, action) => {
      const newLetters = [...state.letters, action.payload];
      return {
        ...state,
        letters: newLetters,
      };
    },
    updateLetter: (state, action) => {
      const updatedLetter = state.letters.map((l) =>
        l.id === action.payload.id ? action.payload : l
      );
      return {
        ...state,
        letters: updatedLetter,
      };
    },
    deleteLetter: (state, action) => {
      const remainingLetters = state.letters.filter(
        (letter) => letter.id !== action.payload
      );
      return {
        ...state,
        letters: remainingLetters,
      };
    },
  },
});

export const { addLetter, updateLetter, deleteLetter } = lettersSlice.actions;
export default lettersSlice.reducer;
