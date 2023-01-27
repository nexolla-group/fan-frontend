import {
  AiOutlineWindows,
  AiTwotoneNotification,
  AiOutlineGlobal,
} from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "ecommerce",
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: "Posts",
    links: [
      {
        name: "Matches",
        icon: <AiOutlineGlobal />,
      },
      {
        name: "News",
        icon: <AiTwotoneNotification />,
      },
      {
        name: "Fixtures",
        icon: <AiOutlineWindows />,
      },
    ],
  },
];
