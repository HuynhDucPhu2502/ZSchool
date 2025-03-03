import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { Button } from "../../components/ui/button";

import Logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ChevronDown, ChevronUp } from "lucide-react";

const Header = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const normalLinkStyle = "text-lg font-bold hover:text-blue-300";
  const activeLinkStyle = "text-lg font-bold text-blue-600 ";

  return (
    <>
      <nav className=" bg-white shadow-lg rounded-lg">
        <div className="mx-2 flex justify-between items-center lg:p-4">
          <div>
            <Link to="/" className="flex flex-row items-center lg:gap-4">
              <img src={Logo} alt="" className="w-24 h-24" />
              <div className="flex flex-col">
                <h1 className="text-xl md:text-3xl text-blue-400 font-bold">
                  ZSchool
                </h1>
                <p className="md:text-lg">Học hôm nay, dẫn đầu ngày mai</p>
              </div>
            </Link>
          </div>

          {/* FULL MENU */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="flex md:space-x-4 space-x-2">
                <NavigationMenuItem>
                  <NavLink
                    to="/zschool"
                    className={({ isActive }) =>
                      isActive ? activeLinkStyle : normalLinkStyle
                    }
                    end
                  >
                    Trang chủ
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink
                    to="/zschool/courses"
                    className={({ isActive }) =>
                      isActive ? activeLinkStyle : normalLinkStyle
                    }
                    end
                  >
                    Khóa học
                  </NavLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavLink
                    to="/zschool/contact"
                    className={({ isActive }) =>
                      isActive ? activeLinkStyle : normalLinkStyle
                    }
                    end
                  >
                    Liên hệ
                  </NavLink>
                </NavigationMenuItem>

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
                      Đăng xuất
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
                          <button className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left">
                            Đăng xuất
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* MOBILE MENU */}
          <div className="lg:hidden">
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</Button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 rounded-lg shadow-lg border-gray-300 border-2">
          <div className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              className="text-lg font-bold hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/courses"
              className="text-lg font-bold hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Khóa học
            </Link>
            <Link
              to="/contact"
              className="text-lg font-bold hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Liên hệ
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
