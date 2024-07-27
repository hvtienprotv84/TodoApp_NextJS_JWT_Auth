import { list, check, todo, home } from "./icons";

const menu = [
  {
    id: 1,
    title: "Tất Cả Tasks",
    icon: home,
    link: "/tasks",
  },
  {
    id: 2,
    title: "Quan Trọng!",
    icon: list,
    link: "/important",
  },
  {
    id: 3,
    title: "Đã Hoàn Thành!",
    icon: check,
    link: "/completed",
  },
  {
    id: 4,
    title: "Đang Thực Hiện",
    icon: todo,
    link: "/incomplete",
  },
];

export default menu;
