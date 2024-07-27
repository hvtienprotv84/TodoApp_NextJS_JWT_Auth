import * as actionTypes from "@/action-type/userActionTypes";
import { PayloadAction } from "@reduxjs/toolkit";

export type UserActions = PayloadAction<boolean | string>;

export const setIsLogin = (isLogin: boolean): UserActions => ({
  type: actionTypes.SET_IS_LOGIN,
  payload: isLogin,
});

export const setUserName = (userName: string): UserActions => ({
  type: actionTypes.SET_USERNAME,
  payload: userName,
});
