import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

import { AiOutlineClose } from "react-icons/ai";
import React from "react";
import { useRouter } from "next/router";
import jsCookie from 'js-cookie';
import { Config } from "@/modules/common/globals/constants";

interface NavbarProps {
  setActiveMenu: (menuOpen: boolean) => void;
  activeMenu: boolean;
  
}

const Sidebar: React.FC<NavbarProps> = ({ setActiveMenu, activeMenu }) => {
  const router = useRouter();
  const role_id = jsCookie.get('role_id');

  const url = router.pathname.split("/").pop();
  const isAdmin = role_id == Config.ADMIN_ROLE_ID;
  const isSuperAdmin = role_id == Config.SUB_ADMIN_ROLE_ID;



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
    isAdmin || isSuperAdmin ? 
    {
      id: "Settings",
      items:["My Profile", "My Team"]
    } :  {
      id: "Settings",
      items:["My Profile"]
    }
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
        {links.map((item) => {
          return (
            <div key={item.id}>
              <p className="text-gray-400  text-lg m-3 mt-4 uppercase">
                {item.id}
              </p>
              {item.items.map((link) => {
                const currentActive = link
                  .toLocaleLowerCase()
                  .replace(" ", "-");
                const isActive = url === currentActive;
                return (
                  <Link key={link} href={`/dashboard/${currentActive}`}>
                    <p
                      className={
                        isActive
                          ? "capitalize flex font-semibold justify-between items-center gap-10  mx-3 text-green-400 duration-200 ease-in "
                          : "capitalize flex font-semibold justify-between items-center gap-10 text-white mx-3 hover:text-green-400 duration-200 ease-in"
                      }
                    >
                      {link}
                    </p>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
