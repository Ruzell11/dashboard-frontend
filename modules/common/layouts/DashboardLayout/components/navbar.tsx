import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import DropdownMenu from "@/modules/common/Dropdown";
import { BsPersonFill } from "react-icons/bs";

interface NavbarProps {
  setActiveMenu: (menuOpen: boolean) => void;
  activeMenu: boolean;
  isLogin: string | undefined;
}

interface ArrayProps {
  name: string;
  link: string;

}

const DropdownMenuArray: Array<ArrayProps> = [
  {
    name: "Profile",
    link: "my-profile",
  },
  {
    name: "Login",
    link: "login",
  },
];

const Navbar: React.FC<NavbarProps> = ({
  setActiveMenu,
  activeMenu,
  isLogin,

}) => {
  return (
    <ul className="flex justify-between items-center ">
      <li
        className="text-xl mt-2 cursor-pointer text-white"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        {activeMenu ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </li>

      <DropdownMenu
        DropdownMenuArray={DropdownMenuArray}
        iconStyle={"text-white text-2xl"}
        icon={(props: React.SVGProps<SVGSVGElement>) => (
          <BsPersonFill {...props} />
        )}
        isLogin={isLogin}
      />
    </ul>
  );
};

export default Navbar;
