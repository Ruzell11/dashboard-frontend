import { Children } from "@/modules/types";
import { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

const DashboardLayout: React.FC<Children> = ({ children }: Children) => {
  const [activeMenu, setActiveMenu] = useState(true);

  const sidebarStyle = {
    transition: "width 0.5s",
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <aside
        className={
          activeMenu
            ? "bg-blue-900 fixed h-[100%] w-[100%] md:w-72 md:relative z-[100]"
            : "w-0"
        }
        style={sidebarStyle}
      >
        {activeMenu ? (
          <Sidebar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
        ) : null}
      </aside>

      {/* Main Content */}
      <div className="w-full flex flex-col">
        {/* Navbar */}
        <div className="bg-blue-900 text-white p-6">
          <Navbar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
