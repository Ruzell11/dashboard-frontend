import React from "react";
import ContentLayout from "../common/layouts/ContentLayout";

const MyProfilePage = () => {
  return (
    <ContentLayout>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <div className="r p-6">
          <p className="text-gray-600 text-lg mb-2">
            Username: <span className="font-semibold">exampleuser</span>
          </p>
          <p className="text-gray-600 text-lg mb-2">
            Email:{" "}
            <span className="font-semibold">exampleuser@example.com</span>
          </p>
          <p className="text-gray-600 text-lg mb-2">
            Phone: <span className="font-semibold">555-555-5555</span>
          </p>
        </div>
      </div>
    </ContentLayout>
  );
};

export default MyProfilePage;
