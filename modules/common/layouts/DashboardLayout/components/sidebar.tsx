import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

import { AiOutlineClose } from "react-icons/ai";
import React from "react";

interface NavbarProps {
  setActiveMenu: (menuOpen: boolean) => void;
  activeMenu: boolean;
}

const Sidebar: React.FC<NavbarProps> = ({ setActiveMenu, activeMenu }) => {
  const links = [
    {
      id: "Overall Overview",
      items: ["Charts"],
    },
    {
      id: "Sales",
      items: ["Sales Chart", "Sales List"],
    },
    {
      id: "Products",
      items: ["Product List"],
    },
    {
      id: "Dashboard",
      items: ["Leads Chart", "Leads List"],
    },
    {
      id: "Settings",
      items: ["My Profile", "My Team"],
    },
  ];
  return (
    <div>
      <div className="flex justify-start items-center text-white pt-6 md:pt-7 px-7  gap-10">
        <div id="Brand" className="flex justify-between items-center">
          <p className="text-white font-semibold text-lg md:text-xl">
            Retail <span className="text-[#77b900] font-extrabold">Geniu$</span>
          </p>
        </div>
        <p
          className="text-xl mt-2 cursor-pointer text-white block "
          onClick={() => setActiveMenu(!activeMenu)}
        >
          {activeMenu ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </p>
        <div></div>
      </div>
      <div className="flex flex-col justify-start items-start pt-10  font-light mx-4 opacity-70">
        {links.map((item) => (
          <div key={item.id}>
            <p className="text-gray-400  text-lg m-3 mt-4 uppercase">
              {item.id}
            </p>
            {item.items.map((link) => (
              <Link
                key={link}
                href={`/dashboard/${link
                  .toLocaleLowerCase()
                  .replace(" ", "-")}`}
              >
                <p className="capitalize flex font-semibold justify-between items-center gap-10 text-white mx-3 hover:text-green-400 duration-200 ease-in">
                  {link}
                </p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
