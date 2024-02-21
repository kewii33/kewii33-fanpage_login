import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  userData: {
    avatar: null,
    nickname: null,
    id: null,
  },
};

const storedAccessToken = localStorage.getItem('accessToken');
if (storedAccessToken) {
  const storedAvatar = localStorage.getItem('avatar');
  const storedNickname = localStorage.getItem('nickname');
  const storedId = localStorage.getItem('id');

  initialState.loggedIn = true;
  initialState.userData = {
    avatar: storedAvatar,
    nickname: storedNickname,
    id: storedId,
  };
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { avatar, nickname, id } = action.payload;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('avatar', avatar);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('id', id);

      return {
        ...state,
        loggedIn: true,
        userData: {
          avatar,
          nickname,
          id,
        },
      };
    },
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('avatar');
      localStorage.removeItem('nickname');
      localStorage.removeItem('id');

      return {
        ...state,
        loggedIn: false,
        userData: {
          avatar: null,
          nickname: null,
          id: null,
        },
      };
    },
  },
});

// selectUserId 선택기 추가
export const selectUserId = (state) => state.auth?.userData?.id;

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
