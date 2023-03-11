import React from "react";
import { useQuery } from "react-query";
import ContentLayout from "../common/layouts/ContentLayout";
import { userProfileRequest } from "./services";

const MyProfilePage = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: "user-data",
    queryFn: async () => userProfileRequest(),
  });

  if (isSuccess) {
    const { user_details } = data?.data;

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
        <div className="container mx-auto mt-8 px-4">
          <h1 className="text-3xl font-bold mb-4">My Profile</h1>
          <div className="r p-6">
            <p className="text-gray-600 text-lg mb-2">
              Username:{" "}
              <span className="font-semibold">{user_details.username}</span>
            </p>
            <p className="text-gray-600 text-lg mb-2">
              Email: <span className="font-semibold">{user_details.email}</span>
            </p>
            <p className="text-gray-600 text-lg mb-2">
              Permission:{" "}
              <span className="font-semibold">
                {getPermission(user_details.role_id)}
              </span>
            </p>
          </div>
        </div>
      </ContentLayout>
    );
  }
};

export default MyProfilePage;
