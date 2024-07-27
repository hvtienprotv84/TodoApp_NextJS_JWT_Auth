"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setIsLogin, setUserName } from "@/actions/userActions";
import { useEffect } from "react";
import Authenticate from "./authenticate";

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Authenticate().then(({ userName, isAuthenticated }) => {
      dispatch(setIsLogin(isAuthenticated));
      dispatch(setUserName(userName));
    });
  }, [dispatch]);

  return null;
};

export default Auth;
