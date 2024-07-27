"use client";

import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import handleLogin from "@/server/auth/login";
import Authenticate from "@/server/auth/authenticate";
import { setIsLogin, setUserName } from "@/actions/userActions";
import handleToast from "@/utils/toast";
import Link from "next/link";
import "@/styles/Auth.css";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    handleLogin(email.toLowerCase(), password)
      .then(({ code, msg }) => {
        if (code === 1) {
          Authenticate().then(({ userName, isAuthenticated }) => {
            dispatch(setIsLogin(isAuthenticated));
            dispatch(setUserName(userName));

            router.push("/tasks");
            handleToast(1, msg);
          });
        } else {
          handleToast(0, msg);
        }
      })
      .catch(() => {
        handleToast(0, "Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center px-4 text-[#f8f8f8]">
        <form
          onSubmit={handleForm}
          className="form-container flex flex-col items-center gap-4 rounded-lg bg-[#1c1c1c] p-6 shadow-md"
        >
          <h1 className="form-header">Đăng Nhập vào TodoApp</h1>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              required
              autoComplete="on"
              placeholder=" "
              className="form-control"
            />
            <label htmlFor="email" className="form-label">
              Nhập địa chỉ email của bạn
            </label>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder=" "
              className="form-control"
            />
            <label htmlFor="password" className="form-label">
            Nhập mật khẩu của bạn
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`form-button bg-blue-500 text-white ${isLoading ? "opacity-50" : "opacity-100 hover:bg-blue-700"}`}
          >
            Đăng Nhập
          </button>
          <Link href="/forgot-password" className="link">
            Quên mật khẩu?
          </Link>
          <Link
            href="/signup"
            className="form-button mt-4 bg-green-500 text-center text-white hover:bg-green-700"
          >
            Chưa có tài khoản? Đăng ký
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
