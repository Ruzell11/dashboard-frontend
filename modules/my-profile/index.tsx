import { Button } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ConfirmationModal from "../common/ConfirmationModal";
import ContentLayout from "../common/layouts/ContentLayout";
import ModalFormComponent from "../common/ModalFormComponent";
import { userProfileRequest } from "./services";

const MyProfilePage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: "user-data",
    queryFn: async () => userProfileRequest(),
  });

  if (isSuccess) {
    const { user_profile } = data?.data;

    const getPermission = (role_id: number) => {
      switch (role_id) {
        case 1:
          return "Super Admin";
        case 2:
          return "Admin Account";
        default:
          return "Read Only(Members)";
      }
    };

    return (
      <ContentLayout>
        <ModalFormComponent
          isOpen={isEditing}
          setIsOpen={setIsEditing}
          userData={user_profile}
          isShowPermission={false}
        />
        <ConfirmationModal
          open={isDeleting}
          setOpen={setIsDeleting}
          userData={user_profile}
        />
        <div className="container mx-auto mt-8 px-4">
          <h1 className="text-3xl font-bold mb-4">My Profile</h1>
          <div className="r p-6">
            <p className="text-gray-600 text-lg mb-2">
              Username:{" "}
              <span className="font-semibold">{user_profile.username}</span>
            </p>
            <p className="text-gray-600 text-lg mb-2">
              Email: <span className="font-semibold">{user_profile.email}</span>
            </p>
            <p className="text-gray-600 text-lg mb-2">
              Permission:{" "}
              <span className="font-semibold">
                {getPermission(user_profile.role_id)}
              </span>
            </p>
          </div>
          <div className="space-x-5">
            <Button className="bg-red-500" onClick={() => setIsDeleting(true)}>
              Delete
            </Button>
            <Button
              variant="contained"
              className="bg-blue-600"
              onClick={() => setIsEditing(true)}
            >
              Update
            </Button>
          </div>
        </div>
      </ContentLayout>
    );
  }
};

export default MyProfilePage;
