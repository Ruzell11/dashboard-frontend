import { Children } from "@/modules/types";
import { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

const DashboardLayout: React.FC<Children> = ({ children }: Children) => {
  const [activeMenu, setActiveMenu] = useState(true);

  const sidebarStyle = {
    transition: "width 0.5s",
    position: "fixed", // add this line to make sidebar fixed
    top: 0, // add this line to position the sidebar at the top
    bottom: 0, // add this line to stretch the sidebar to the bottom
  };

  const mainContentStyle = {
    marginLeft: activeMenu ? "72px" : "0", // adjust margin left based on active menu
    transition: "margin 0.5s",
  };

  return (
    <div className="flex flex-col md:flex-row md:h-screen md:w-screen">
      {/* Sidebar */}
      <aside
        className={activeMenu ? "bg-blue-900 w-72 md:relative z-50" : "w-0"}
        style={sidebarStyle}
      >
        {activeMenu ? (
          <Sidebar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
        ) : null}
      </aside>

      {/* Main Content */}
      <div className="w-full flex flex-col" style={mainContentStyle}>
        {/* Navbar */}
        <div className="bg-blue-900 text-white p-6">
          <Navbar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
        </div>

        {/* Page Content */}
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
