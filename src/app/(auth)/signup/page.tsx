"use client";

import { FormEvent, useState } from "react";
import handleSignUp from "@/server/auth/signup";
import Authenticate from "@/server/auth/authenticate";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setIsLogin, setUserName } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import handleToast from "@/utils/toast";
import Link from "next/link";
import "@/styles/Auth.css";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const securityInformation = formData.get("securityInformation") as string;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]\/\\`~'_;+-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>[\]\/\\`~'_;+-=]{8,}$/;

    if (!emailRegex.test(email)) {
      setIsLoading(false);
      handleToast(0, "Định dạng email không hợp lệ!");
      return;
    }

    if (!passwordRegex.test(password)) {
      setIsLoading(false);
      handleToast(
        0,
        "Mật khẩu phải dài ít nhất 8 ký tự và bao gồm ít nhất một chữ cái, một số và một ký tự đặc biệt!",
      );
      return;
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      handleToast(0, "Mật khẩu không hợp lệ!");
      return;
    }

    handleSignUp(
      userName,
      email.toLowerCase(),
      password,
      securityInformation.toLowerCase(),
    )
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
          <h1 className="form-header">Đăng Ký vào TodoApp</h1>
          <div className="form-group">
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder=" "
              autoComplete="on"
              required
              className="form-control"
            />
            <label htmlFor="userName" className="form-label">
              Nhập tên người dùng của bạn
            </label>
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" "
              autoComplete="on"
              required
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
              placeholder=" "
              required
              className="form-control"
            />
            <label htmlFor="password" className="form-label">
            Nhập mật khẩu của bạn
            </label>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder=" "
              required
              className="form-control"
            />
            <label htmlFor="confirmPassword" className="form-label">
            Xác nhận mật khẩu của bạn
            </label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="securityInformation"
              id="securityInformation"
              placeholder=" "
              autoComplete="on"
              required
              className="form-control"
            />
            <label htmlFor="securityInformation" className="form-label">
              Món ăn yêu thích của bạn là gì?
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`form-button bg-green-500 text-white ${isLoading ? "opacity-50" : "opacity-100 hover:bg-green-700"}`}
          >
            Đăng Ký
          </button>
          <Link
            href="/login"
            className="form-button mt-4 bg-blue-500 text-center text-white hover:bg-blue-700"
          >
            Đã có tài khoản? Đăng Nhập
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
