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
      <div className="flex flex-col w-100 justify-center  h-[100%] bg-gray-100/70 p-10 rounded-md ">
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Dashboard</Link>

          <Typography color="text.primary ">
            <span className="capitalize cursor-pointer">
              {segments[segments.length - 1].replace("-", " ")}
            </span>
          </Typography>
        </Breadcrumbs>
        <div className="">{children}</div>
      </div>
    </DashboardLayout>
  );
};

export default ContentLayout;
