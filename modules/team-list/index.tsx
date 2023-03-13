import { useState } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import ContentLayout from "../common/layouts/ContentLayout";
import { Button, IconButton } from "@mui/material";
import { userTeamListRequest } from "./services";
import { useQuery } from "react-query";
import LoadingComponent from "../common/LoadingComponent";
import { Config } from "../common/globals/constants";
import { Edit } from "@material-ui/icons";
import { Delete } from "@mui/icons-material";
import ModalFormComponent from "../common/ModalFormComponent";
import { roleIdProps } from "../types";
import ConfirmationModal from "../common/ConfirmationModal";

interface UserDataProps {
  row: {
    created_by: string;
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    role_id: number;
    username: string;
    __v: number;
  };
}

export default function TeamList({ role_id }: roleIdProps) {
  const isAdmin = role_id === Config.ADMIN_ROLE_ID;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataProps["row"] | undefined>(
    undefined
  );

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: "user-data",
    queryFn: async () => userTeamListRequest(),
  });

  const handleEditing = (data: UserDataProps) => {
    setUserData(data.row);
    setIsEditing(true);
  };

  const handleDelete = (data: UserDataProps) => {
    setUserData(data.row);
    setIsDeleting(true);
  };

  function getRoleName(roleId: number) {
    switch (roleId) {
      case 1:
        return "Super Admin";
      case 2:
        return "Admin Account";
      default:
        return "Read Only(Members)";
    }
  }
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "email",
      headerName: "Email",
      width: 170,
      description: "This column has a value getter and is not sortable.",
      sortable: false,
    },
    {
      field: "first_name",
      headerName: "First name",
      width: 170,
      description: "This column has a value getter and is not sortable.",
      sortable: false,

      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.first_name || ""} ${params.row.last_name || ""}`,
    },
    {
      field: "last_name",
      headerName: "Last name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.last_name || ""}`,
    },
    {
      field: "role_id",
      headerName: "Permission",
      description:
        "If the user is an admin, they can add new members, edit products, and delete their team members' accounts. If the user has read-only access, they can only view the content of the dashboard and cannot perform any actions.Super Admin users can add products and edit or delete only the products they have uploaded. The super admin has access to all features and can perform any action.",
      type: "number",
      width: 170,
      valueGetter: (params) => getRoleName(params.row.role_id),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <>
          <IconButton onClick={() => handleEditing(params)}>
            <Edit style={{ color: "black" }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params)}>
            <Delete style={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isSuccess) {
    const columnData = data.data.listOfMembers;

    return (
      <ContentLayout>
        <ModalFormComponent
          isOpen={isEditing}
          setIsOpen={setIsEditing}
          userData={userData}
        />
        <ConfirmationModal
          open={isDeleting}
          setOpen={setIsDeleting}
          userData={userData}
        />
        <div style={{ height: 600, width: "100%" }}>
          <div className="mt-4 mx-5">
            {isAdmin ? (
              <Button variant="contained" href="/dashboard/create-account">
                Add Admin Account
              </Button>
            ) : (
              <Button variant="contained" href="/dashboard/create-account">
                Add Team Members
              </Button>
            )}
          </div>
          <h1 className="m-4">
            This list contains information about our team and their permission
            on our crm.
          </h1>
          {columnData === undefined || columnData.length === 0 ? (
            <DataGrid
              rows={[]}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          ) : (
            <DataGrid
              rows={columnData}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          )}
        </div>
      </ContentLayout>
    );
  }
}
