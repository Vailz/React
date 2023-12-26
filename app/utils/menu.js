import { list, check, todo, home } from "./Icons";

const menu = [
  {
    id: 1,
    title: "Все",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Важные",
    icon: list,
    link: "/important",
  },
  {
    id: 3,
    title: "Выполненные",
    icon: check,
    link: "/completed",
  },
  {
    id: 4,
    title: "Невыполненные",
    icon: todo,
    link: "/incomplete",
  },
];

export default menu;