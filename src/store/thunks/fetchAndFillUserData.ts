import { Dispatch } from "@reduxjs/toolkit";
import {
  setUserFirstName,
  setUserId,
  setUserLastName,
  setUserLogin,
} from "../userSlice";

export default function fetchAndFillAllUserData() {
  return async (dispatch: Dispatch) => {
    try {
      const res = await fetch("/api/auth/getUser");
      const data = await res.json();
      dispatch(setUserFirstName(data.firstName));
      dispatch(setUserLastName(data.lastName));
      dispatch(setUserLogin(data.login));
      dispatch(setUserId(data.id));
    } catch (error) {
      console.error(error);
    }
  };
}
