import { Children } from "@/modules/types";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

const DashboardLayout: React.FC<Children> = ({ children }: Children) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const router = useRouter();

  const mainContentStyle = {
    marginLeft: activeMenu ? "72px" : "0", // adjust margin left based on active menu
    transition: "margin 0.5s",
  };

  const accessToken = Cookies.get("access-token");

  const isLogin = accessToken;

  useEffect(() => {
    if (!isLogin) router.push("/login");
  }, []);

  if (!isLogin) {
    return (
      <div className="flex h-screen items-center w-100 justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:h-screen md:w-screen">
      {/* Sidebar */}
      <aside
        className={
          activeMenu
            ? "bg-blue-900 w-100 z-50 fixed top-0 bottom-0"
            : "w-0 fixed bottom-0 top-0"
        }
      >
        {activeMenu ? (
          <Sidebar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
        ) : null}
      </aside>

      {/* Main Content */}
      <div className="w-full flex flex-col" style={mainContentStyle}>
        {/* Navbar */}
        <div className="bg-blue-900 text-white p-6">
          <Navbar
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
            isLogin={isLogin}
          />
        </div>

        {/* Page Content */}
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
