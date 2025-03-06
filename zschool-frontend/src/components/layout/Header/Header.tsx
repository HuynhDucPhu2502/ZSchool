import { Link } from "react-router-dom";
import { useState } from "react";

import { Button } from "../../ui/button";

import Logo from "../../../assets/logo.png";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className=" bg-white shadow-lg rounded-lg">
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
            <HeaderMenu verticalMenu={false} />
          </div>

          {/* MOBILE MENU */}
          <div className="lg:hidden">
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 rounded-lg shadow-lg border-gray-300 border-2">
          <HeaderMenu verticalMenu={true} />
        </div>
      )}
    </>
  );
};

export default Header;
