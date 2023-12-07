import { createSlice } from "@reduxjs/toolkit";
import {
  findAllUsersThunk,
  findUserByIdThunk,
  loginThunk,
  logoutThunk,
  profileThunk,
  registerThunk,
  updateProfileThunk,
  updateUserThunk,
} from "./users-thunk";

const usersReducer = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    currentUser: null,
    publicProfile: null,
    errorLogin: false,
    errorRegister: false,
  },
  extraReducers: {
    [findUserByIdThunk.fulfilled]: (state, action) => {
      state.errorLogin = false;
      state.errorRegister = false;
      state.publicProfile = action.payload;
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.errorLogin = false;
      state.errorRegister = false;
      state.currentUser = null;
    },
    [profileThunk.fulfilled]: (state, action) => {
      state.errorLogin = false;
      state.errorRegister = false;
      state.currentUser = action.payload;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.errorLogin = false;
      state.errorRegister = false;
      state.currentUser = action.payload;
    },
    [registerThunk.rejected]: (state, action) => {
      state.errorRegister = true;
      state.errorLogin = false;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.errorLogin = false;
      state.errorRegister = false;
      state.currentUser = action.payload;
    },
    [loginThunk.rejected]: (state, action) => {
      state.errorLogin = true;
      state.errorRegister = false;
    },
    [findAllUsersThunk.fulfilled]: (state, action) => {
      state.errorLogin = false;
      state.errorRegister = false;
      state.users = action.payload;
      state.loading = false;
    },
    [updateUserThunk.fulfilled]: (state, { payload }) => {
      state.errorLogin = false;
      state.errorRegister = false;
      state.loading = false;
      const userNdx = state.users.findIndex((user) => user.uid === payload.uid);
      state.users[userNdx] = {
        ...state.users[userNdx],
        ...payload,
      };
    },
    [updateProfileThunk.fulfilled]: (state, { payload }) => {
      state.errorLogin = false;
      state.errorRegister = false;
      state.loading = false;
      state.currentUser = payload;
    },
  },
});

export default usersReducer.reducer;
