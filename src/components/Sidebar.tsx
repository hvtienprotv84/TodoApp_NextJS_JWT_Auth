"use client";

import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { setIsLogin, setUserName } from "@/actions/userActions";
import { toggleMenu } from "@/actions/appActions";
import menu from "@/utils/menu";
import handleToast from "@/utils/toast";
import Logout from "@/server/auth/logout";
import { arrowLeft, bars, logout } from "@/utils/icons";
import user from "@/assets/user.svg";
import "@/styles/Sidebar.css";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector((state: RootState) => state.user.userName);
  const ismenu = useSelector((state: RootState) => state.app.menu);

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Logout()
      .then(() => {
        dispatch(setIsLogin(false));
        dispatch(setUserName(""));
        handleToast(1, "Đã Đăng Xuất Thành Công!");
        router.push("/");
      })
      .catch(() => {
        handleToast(0, "Something went wrong!");
      });
  };

  return (
    <>
      <nav
        className={`sidebar relative flex w-[15rem] flex-col justify-between rounded-[1rem] border-2 border-solid border-[#f9f9f914] bg-[#212121] text-[#6c7983] max-md:fixed max-md:z-[100] max-md:h-[calc(100vh-2rem)] ${ismenu ? "max-md:translate-x-0" : "max-md:-translate-x-[107%]"}`}
      >
        <button
          className="nav-icon absolute -right-[69px] top-[1.8rem] m-[1.5rem] hidden rounded-br-[1rem] rounded-tr-[1rem] border-y-2 border-l-0 border-r-2 border-solid border-[#f9f9ff14] bg-[#212121] px-[0.9rem] py-[0.8rem] max-md:block"
          onClick={() => {
            dispatch(toggleMenu(!ismenu));
          }}
        >
          {ismenu ? arrowLeft : bars}
        </button>
        <div className="profile relative m-[1.5rem] flex cursor-pointer items-center rounded-[1rem] px-[0.8rem] py-[1rem] font-[500] text-[#f8f8f8]">
          <div className="profile-overlay absolute left-0 top-0 z-0 h-full w-full rounded-[1rem] border-2 border-solid border-[#f9f9f914] bg-[#181818] opacity-[0.2]"></div>
          <div className="image relative z-[1] inline-block h-[70px] w-[70px] shrink-0 overflow-hidden rounded-[100%]">
            <Image
              src={user}
              priority
              alt="profile"
              className="img rounded-[100%] bg-[#181818]"
            />
          </div>
          <h1 className="relative z-[1] ml-[0.8rem] flex flex-col text-[clamp(1.2rem,4vw,1.4rem)] leading-[100%]">
            {userName}
          </h1>
        </div>
        <ul>
          {menu.map((item) => {
            const link = item.link;
            return (
              <Link
                href={link}
                key={item.id}
                className={`nav-item relative mx-0 my-[0.3rem] grid cursor-pointer grid-cols-[40px,1fr] items-center pb-[0.9rem] pl-[2.1rem] pr-[1rem] pt-[0.8rem] ${pathname === link ? "active" : ""}`}
              >
                <div className="nav-icon flex items-center text-[#f9f9f959]">
                  {item.icon}
                </div>
                <div className="nav-link font-[500]">{item.title}</div>
              </Link>
            );
          })}
        </ul>
        <div className="relative m-6">
          <button
            className="signout z-[5] flex cursor-pointer items-center rounded-[0.8rem] px-[0.8rem] py-[0.4rem] text-[1.2rem] font-[500] text-[#b2becd] hover:text-[#f8f8f8]"
            onClick={handleLogout}
          >
            <div className="nav-icon mr-[1.5rem]">{logout}</div>
            Đăng Xuất
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
