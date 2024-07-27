"use client";

import { FormEvent, useState } from "react";
import {
  handleForgotPassword,
  handleNewPassword,
} from "@/server/auth/forgotPassword";
import handleToast from "@/utils/toast";
import Link from "next/link";
import Authenticate from "@/server/auth/authenticate";
import { setIsLogin, setUserName } from "@/actions/userActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import "@/styles/Auth.css";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<"verify" | "reset">("verify");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState<{
    newPassword: string;
    confirmNewPassword: string;
  }>({ newPassword: "", confirmNewPassword: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleVerification = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const userName = formData.get("username") as string;
    const email = formData.get("email") as string;
    const securityAnswer = formData.get("securityAnswer") as string;

    const { code, msg } = await handleForgotPassword(
      userName,
      email.toLowerCase(),
      securityAnswer,
    );

    setIsLoading(false);
    if (code === 1) {
      setUsername(userName);
      setStep("reset");
    } else {
      handleToast(0, msg);
    }
  };

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const { newPassword, confirmNewPassword } = password;

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]\/\\`~'_;+-=])[A-Za-z\d!@#$%^&*(),.?":{}|<>[\]\/\\`~'_;+-=]{8,}$/;

    if (newPassword !== confirmNewPassword) {
      setIsLoading(false);
      handleToast(0, "Mật khẩu không hợp lệ!");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setIsLoading(false);
      handleToast(
        0,
        "Mật khẩu phải dài ít nhất 8 ký tự và bao gồm ít nhất một chữ cái, một số và một ký tự đặc biệt!",
      );
      return;
    }

    handleNewPassword(username, newPassword)
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
        {step === "verify" ? (
          <form
            onSubmit={handleVerification}
            className="form-container flex flex-col items-center gap-4 rounded-lg bg-[#1c1c1c] p-6 shadow-md"
          >
            <h1 className="form-header">Xác minh danh tính của bạn</h1>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder=" "
                autoComplete="on"
                id="username"
                required
                className="form-control"
              />
              <label htmlFor="username" className="form-label">
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
                type="text"
                name="securityAnswer"
                id="securityAnswer"
                placeholder=" "
                autoComplete="on"
                required
                className="form-control"
              />
              <label htmlFor="securityAnswer" className="form-label">
              Trả lời câu hỏi bảo mật của bạn
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`form-button bg-blue-500 text-white ${isLoading ? "opacity-50" : "opacity-100 hover:bg-blue-700"}`}
            >
              Xác minh
            </button>
          </form>
        ) : (
          <form
            onSubmit={handlePasswordReset}
            className="form-container flex flex-col items-center gap-4 rounded-lg bg-[#1c1c1c] p-6 shadow-md"
          >
            <h1 className="form-header">Đặt lại mật khẩu của bạn</h1>
            <div className="form-group">
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                autoComplete="new-password"
                id="newPassword"
                placeholder=" "
                required
                onChange={(e) => {
                  setPassword({
                    ...password,
                    newPassword: e.target.value,
                  });
                }}
                className="form-control"
              />
              <label htmlFor="newPassword" className="form-label">
              Nhập mật khẩu mới của bạn
              </label>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                value={password.confirmNewPassword}
                autoComplete="new-password"
                placeholder=" "
                required
                onChange={(e) => {
                  setPassword({
                    ...password,
                    confirmNewPassword: e.target.value,
                  });
                }}
                className="form-control"
              />
              <label htmlFor="confirmNewPassword" className="form-label">
              Xác nhận mật khẩu mới của bạn
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`form-button bg-green-500 text-white ${isLoading ? "opacity-50" : "opacity-100 hover:bg-green-700"}`}
            >
              Đặt lại mật khẩu
            </button>
          </form>
        )}
        <Link href="/login" className="mt-4 text-sm text-blue-500 underline">
        Quay lại đăng nhập
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
