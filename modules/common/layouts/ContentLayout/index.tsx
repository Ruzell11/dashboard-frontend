import { Children } from "@/modules/types";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import DashboardLayout from "../DashboardLayout";

const ContentLayout = ({ children }: Children) => {
  const router = useRouter();
  const url = router.pathname;
  const segments = url.split("/");
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full justify-center md:p-10 md:min-h-[500px] bg-gray-100/70 rounded-md">
        {/* Breadcrumbs */}
        <div className="w-full md:w-auto md:pr-6">
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/">Dashboard</Link>

            <Typography color="text.primary ">
              <span className="capitalize cursor-pointer">
                {segments[segments.length - 1].replace("-", " ")}
              </span>
            </Typography>
          </Breadcrumbs>
        </div>

        {/* Page Content */}
        <div className="w-full md:flex-grow">{children}</div>
      </div>
    </DashboardLayout>
  );
};

export default ContentLayout;
