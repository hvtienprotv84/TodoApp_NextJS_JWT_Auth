"use server";

import { cookies } from "next/headers";
import User from "@/server/models/userSchema";
import jwt from "jsonwebtoken";

type AuthType = () => Promise<{
  userName: string;
  isAuthenticated: boolean;
}>;

interface JwtPayload {
  _id: string;
}

const Authenticate: AuthType = async () => {
  try {
    const token = cookies().get("auth_token");

    if (token) {
      const { _id } = jwt.verify(
        token.value,
        process.env.SECRET_KEY as string,
      ) as JwtPayload;

      const user = await User.findOne(
        {
          _id: _id,
          "tokens.token": token.value,
        },
        {
          email: 0,
          password: 0,
          securityInfo: 0,
          tokens: 0,
          _id: 0,
        },
      );
      return { userName: user?.userName || "", isAuthenticated: true };
    }
    return { userName: "", isAuthenticated: false };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    return { userName: "", isAuthenticated: false };
  }
};

export default Authenticate;
