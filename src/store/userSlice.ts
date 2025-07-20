import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userLogin: string | null;
}

const initialState: UserState = {
  userLogin: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.userLogin = action.payload;
    },
    logout(state) {
      state.userLogin = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
