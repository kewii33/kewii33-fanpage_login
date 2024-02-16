import fakeData from 'assets/fakeData.json';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  letters: JSON.parse(localStorage.getItem('fanletters')) || fakeData,
  filter: ['혜인'],
};

const lettersSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addLetter: (state, action) => {
      const newLetters = [...state.letters, action.payload];
      localStorage.setItem('fanletters', JSON.stringify(newLetters));
      return {
        ...state,
        letters: newLetters,
      };
    },
    updateLetter: (state, action) => {
      const updatedLetter = state.letters.map((l) =>
        l.id === action.payload.id ? action.payload : l
      );
      localStorage.setItem('fanletters', JSON.stringify(updatedLetter));
      return {
        ...state,
        letters: updatedLetter,
      };
    },
    editLetter: (state, action) => {
      const updatedLetters = state.letters.map((letter) =>
        letter.id === action.payload.letterId
          ? { ...letter, content: action.payload.editedContent }
          : letter
      );
      localStorage.setItem('fanletters', JSON.stringify(updatedLetters));
      return {
        ...state,
        letters: updatedLetters,
      };
    },
    deleteLetter: (state, action) => {
      const remainingLetters = state.letters.filter(
        (letter) => letter.id !== action.payload
      );
      localStorage.setItem('fanletters', JSON.stringify(remainingLetters));
      return {
        ...state,
        letters: remainingLetters,
      };
    },
  },
});

export const { addLetter, updateLetter, editLetter, deleteLetter } =
  lettersSlice.actions;
export default lettersSlice.reducer;
