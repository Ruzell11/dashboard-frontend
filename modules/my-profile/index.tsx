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
            <button
              className="bg-red-500 p-2 w-25 rounded-md text-white "
              onClick={() => setIsDeleting(true)}
            >
              Delete
            </button>
            <button
              className="bg-blue-600 p-2 w-25 rounded-md text-white "
              onClick={() => setIsEditing(true)}
            >
              Update
            </button>
          </div>
        </div>
      </ContentLayout>
    );
  }
  return (
    <ContentLayout>
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> Something went wrong</span>
      </div>
    </ContentLayout>
  );
};

export default MyProfilePage;
