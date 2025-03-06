import { useState } from "react";

import { Button } from "../../ui/button";

import HeaderMenu from "./HeaderMenu";
import HeaderLogo from "./HeaderLogo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className=" bg-white shadow-lg rounded-lg">
        <div className="mx-2 flex justify-between items-center lg:p-4">
          <HeaderLogo />

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
