"use server";

import { cookies } from "next/headers";
import User from "@/server/models/userSchema";
import jwt from "jsonwebtoken";

type LogoutType = () => Promise<void>;

interface JwtPayload {
  _id: string;
}

const Logout: LogoutType = async () => {
  try {
    const token = cookies().get("auth_token");

    if (token) {
      const { _id } = jwt.verify(
        token.value,
        process.env.SECRET_KEY as string,
      ) as JwtPayload;

      const userInfo = await User.findOne({ _id: _id });

      if (userInfo) {
        userInfo.tokens = userInfo.tokens.filter(
          (dbToken) => dbToken.token !== token.value,
        );
        await userInfo.save();
      }
      cookies().delete("auth_token");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export default Logout;
