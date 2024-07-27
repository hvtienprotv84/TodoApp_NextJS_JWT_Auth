"use server";

import User from "@/server/models/userSchema";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

type Login = (
  email: string,
  password: string,
) => Promise<{ code: Number; msg: string }>;

const handleLogin: Login = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { code: 0, msg: "Email hoặc mật khẩu không hợp lệ!" };
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { code: 0, msg: "Email hoặc mật khẩu không hợp lệ!" };
    }
    const token = await user.generateAuthToken();
    const cookieStore = cookies();

    const maxAge = 30 * 24 * 60 * 60;
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      maxAge,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return { code: 1, msg: "Đăng nhập thành công!" };
  } catch (err) {
    console.error(err instanceof Error && err.message);

    return { code: 0, msg: "Something went wrong. Please try again." };
  }
};

export default handleLogin;
