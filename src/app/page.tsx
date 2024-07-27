"use client";

import UnAuth from "@/components/UnAuth";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  const pathname = usePathname();
  const isAuthRoute = ["/login", "/signup", "/forgot-password"].includes(
    pathname,
  );

  return !isLogin && !isAuthRoute && <UnAuth />;
};

export default Home;
