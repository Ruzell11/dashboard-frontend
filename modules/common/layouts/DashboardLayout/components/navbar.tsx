import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { AiOutlineClose } from "react-icons/ai";
import DropdownMenu from "./dropdown";

interface NavbarProps {
  setActiveMenu: (menuOpen: boolean) => void;
  activeMenu: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ setActiveMenu, activeMenu }) => {
  return (
    <ul className="flex justify-between items-center ">
      <li
        className="text-xl mt-2 cursor-pointer text-white"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        {activeMenu ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </li>

      <DropdownMenu />
    </ul>
  );
};
export default Navbar;
