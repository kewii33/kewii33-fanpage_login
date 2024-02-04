import fakeData from 'assets/fakeData.json';
import { SET_FILTER } from './filters';

export const ADD_LETTER = 'ADD_LETTER';
export const UPDATE_LETTER = 'UPDATE_LETTER';
export const EDIT_LETTER = 'EDIT_LETTER';
export const DELETE_LETTER = 'DELETE_LETTER';

export const addLetter = (newLetter) => {
  return { type: ADD_LETTER, payload: newLetter };
};

export const updateLetter = (updatedLetter) => {
  return {
    type: UPDATE_LETTER,
    payload: updatedLetter,
  };
};

export const editLetter = (letterId, editedContent) => ({
  type: EDIT_LETTER,
  payload: { letterId, editedContent },
});

export const deleteLetter = (letterId) => ({
  type: DELETE_LETTER,
  payload: letterId,
});

const initialState = {
  letters: JSON.parse(localStorage.getItem('fanletters')) || fakeData,
  filter: ['혜인'],
};

const letters = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LETTER:
      const newLetters = [...state.letters, action.payload];
      localStorage.setItem('fanletters', JSON.stringify(newLetters));
      return {
        ...state,
        letters: newLetters,
      };
    case UPDATE_LETTER:
      const updatedLetter = state.letters.map((l) =>
        l.id === action.payload.id ? action.payload : l
      );
      localStorage.setItem('fanletters', JSON.stringify(updatedLetter));
      return {
        ...state,
        letters: updatedLetter,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case EDIT_LETTER:
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
    case DELETE_LETTER:
      const remainingLetters = state.letters.filter(
        (letter) => letter.id !== action.payload
      );
      localStorage.setItem('fanletters', JSON.stringify(remainingLetters));
      return {
        ...state,
        letters: remainingLetters,
      };
    default:
      return state;
  }
};

export default letters;
