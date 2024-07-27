"use server";

import User from "@/server/models/userSchema";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

type ForgetPassword = (
  userName: string,
  email: string,
  securityAnswer: string,
) => Promise<{ code: Number; msg: string }>;

type NewPassword = (
  userName: string,
  newPassword: string,
) => Promise<{ code: Number; msg: string }>;

export const handleForgotPassword: ForgetPassword = async (
  userName,
  email,
  securityAnswer,
) => {
  try {
    const user = await User.findOne({ userName: userName, email: email });

    if (!user) {
      return { code: 0, msg: "Tên người dùng hoặc email không hợp lệ!" };
    }
    const isMatch = await bcrypt.compare(securityAnswer, user.securityInfo);

    if (!isMatch) {
      return { code: 0, msg: "Câu trả lời bảo mật không hợp lệ!" };
    }

    return { code: 1, msg: "Tạo mật khẩu mới" };
  } catch (err) {
    console.error(err instanceof Error && err.message);

    return { code: 0, msg: "Something went wrong. Please try again." };
  }
};

export const handleNewPassword: NewPassword = async (userName, newPassword) => {
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return { code: 0, msg: "Email hoặc mật khẩu không hợp lệ!" };
    }

    user.password = newPassword;
    await user.save();

    const token = await user.generateAuthToken();
    const cookieStore = cookies();

    const maxAge = 30 * 24 * 60 * 60;
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      maxAge,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return { code: 1, msg: "Đã cập nhật mật khẩu thành công!" };
  } catch (err) {
    console.error(err instanceof Error && err.message);

    return { code: 0, msg: "Something went wrong. Please try again." };
  }
};
