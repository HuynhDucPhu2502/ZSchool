import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { Button } from "../../components/ui/button";

import Logo from "../../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="hidden md:block">
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
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</Button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 rounded-lg shadow-lg border-gray-300 border-2">
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
