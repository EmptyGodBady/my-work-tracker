import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userLogin: string | null;
  userFirstName: string | null;
  userLastName: string | null;
  userId: number | null;
}

const initialState: UserState = {
  userLogin: null,
  userFirstName: null,
  userLastName: null,
  userId: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin(state, action: PayloadAction<string>) {
      state.userLogin = action.payload;
    },
    setUserFirstName(state, action: PayloadAction<string>) {
      state.userFirstName = action.payload;
    },
    setUserLastName(state, action: PayloadAction<string>) {
      state.userLastName = action.payload;
    },
    setUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
    logout(state) {
      state.userLogin = null;
    },
  },
});

export const {
  setUserLogin,
  setUserFirstName,
  setUserLastName,
  setUserId,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
