import { NavLink } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import UserMenu from "./UserMenu";

type Props = {
  verticalMenu: boolean;
};

const HeaderMenu: React.FC<Props> = ({ verticalMenu }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const normalLinkStyle = "text-lg font-bold hover:text-blue-300";
  const activeLinkStyle = "text-lg font-bold text-blue-600 ";

  const menuStyle = verticalMenu
    ? "flex flex-col items-start justify-end space-y-2 p-4"
    : "flex flex-row items-center justify-center md:space-x-4 space-x-2";

  const menuItems: { name: string; link: string; style?: string }[] = [
    { name: "Trang chủ", link: "/zschool" },
    { name: "Khóa học", link: "/zschool/courses" },
    { name: "Liên hệ", link: "/zschool/contact" },
  ];

  if (!isAuthenticated)
    menuItems.push({
      name: "Đăng nhập/Đăng ký",
      link: "/zschool/auth?mode=login",
      style:
        "bg-blue-500 hover:bg-blue-600 px-2 py-1 text-white font-bold rounded-lg",
    });

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className={menuStyle}>
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `${isActive ? activeLinkStyle : normalLinkStyle} ${
                    item.style || ""
                  }`
                }
                end
              >
                {item.name}
              </NavLink>
            </NavigationMenuItem>
          ))}

          {isAuthenticated && (
            <NavigationMenuItem>
              <UserMenu />
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default HeaderMenu;
