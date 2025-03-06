import { Link, NavLink } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import Modal from "../Modal";
import { CircleX } from "lucide-react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { logout } from "../../../services/authService";

type Props = {
  verticalMenu: boolean;
};

const HeaderMenu: React.FC<Props> = ({ verticalMenu }) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch<AppDispatch>();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutPromptVisible, setIsLogoutPromptVisible] = useState(false);

  const normalLinkStyle = "text-lg font-bold hover:text-blue-300";
  const activeLinkStyle = "text-lg font-bold text-blue-600 ";

  const menuStyle = verticalMenu
    ? "flex flex-col items-start justify-end space-y-2 p-4"
    : "flex flex-row items-center justify-center  md:space-x-4 space-x-2";

  type MenuMetadata = {
    name: string;
    link: string;
  };

  const handleShowLogoutPrompt = () => {
    setIsDropdownOpen(false);
    setIsLogoutPromptVisible(true);
  };

  const handleLogout = () => {
    logout();
    dispatch(authActions.logout());
    setIsLogoutPromptVisible(false);
  };

  const menuItems: MenuMetadata[] = [
    { name: "Trang chủ", link: "/zschool" },
    { name: "Khóa học", link: "/zschool/courses" },
    { name: "Liên hệ", link: "/zschool/contact" },
  ];

  return (
    <>
      {isLogoutPromptVisible && (
        <Modal>
          <div className="space-y-4">
            <div className="flex flex-row justify-between border-b-2 border-gray-200 pb-2">
              <h1 className="text-2xl text-red-400 font-bold">Đăng Xuất</h1>
              <button
                onClick={() => setIsLogoutPromptVisible(false)}
                className="text-red-400 hover:text-red-500 cursor-pointer"
              >
                <CircleX size={30} />
              </button>
            </div>

            <p>Bạn có chắc chắn muốn đăng xuất xuất không?</p>

            <div className="flex flex-row justify-end border-t-2 border-gray-200 pt-2 space-x-4">
              <button
                onClick={() => setIsLogoutPromptVisible(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400  text-black"
              >
                Thoát
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-400 hover:bg-red-500 text-white"
              >
                Đăng Xuất
              </button>
            </div>
          </div>
        </Modal>
      )}

      <NavigationMenu>
        <NavigationMenuList className={menuStyle}>
          {menuItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive ? activeLinkStyle : normalLinkStyle
                }
                end
              >
                {item.name}
              </NavLink>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem>
            {!isAuthenticated && (
              <NavLink
                to="/zschool/auth?mode=login"
                className={({ isActive }) =>
                  isActive
                    ? activeLinkStyle + "hidden lg:block"
                    : normalLinkStyle + "hidden lg:block"
                }
                end
              >
                Đăng nhập
              </NavLink>
            )}

            {isAuthenticated && (
              <div className="relative">
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  <p>{user?.name}</p>
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-50 bg-white border rounded-lg shadow-lg ">
                    <Link
                      to="/zschool/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Thông tin tài khoản
                    </Link>
                    <button
                      onClick={handleShowLogoutPrompt}
                      className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default HeaderMenu;
