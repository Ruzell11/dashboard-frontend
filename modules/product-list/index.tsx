import React, { useState } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useQuery } from "react-query";
import ContentLayout from "../common/layouts/ContentLayout";

import { getUserProductList } from "./services";
import { Config } from "../common/globals/constants";

import AddProductModalForm from "./components/AddProductModalForn";
import Image from "next/image";
import { roleIdProps } from "../types";

const columns: GridColDef[] = [
  { field: "product_name", headerName: "Product Name", flex: 1 },
  { field: "product_description", headerName: "Product Description", flex: 1 },
  { field: "product_price", headerName: "Price", flex: 1 },
  {
    field: "image_link",
    headerName: "Product Image",
    flex: 1,
    renderCell: (params: GridCellParams) => {
      console.log(params.row.image_link);
      return (
        <img
          className=" object-contain"
          src={params.row.image_link}
          alt={params.row.product_name}
        />
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 170,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: GridCellParams) => (
      <>
        {/* <ActionButtonsComponent<UserDataProps>
          handleEditing={handleEditing}
          params={params}
          handleDelete={handleDelete}
        /> */}
        <h1>Action Button</h1>
      </>
    ),
  },
];

const columnsAdmin: GridColDef[] = [
  { field: "product_name", headerName: "Product Name", flex: 1 },
  { field: "product_description", headerName: "Product Description", flex: 1 },
  { field: "product_price", headerName: "Price", flex: 1 },
  {
    field: "image_link",
    headerName: "Product Image",
    flex: 1,
    renderCell: (params) => {
      console.log(params.row.image_link);
      return (
        <img
          className=" object-contain"
          src={params.row.image_link}
          alt={params.row.product_name}
        />
      );
    },
  },
  { field: "created_by_username", headerName: "Created By Username", flex: 1 },
];

export default function ProductList({ role_id }: roleIdProps) {
  const isSuperAdmin = Config.ADMIN_ROLE_ID === role_id;
  const isAdmin = Config.SUB_ADMIN_ROLE_ID === role_id;
  console.log(isAdmin);
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);

  const { data, status } = useQuery("user-product-data", getUserProductList);

  const productList = data?.data?.productList || [];

  const handleAddProductClick = () => setIsAddingProduct(true);

  return (
    <ContentLayout>
      <AddProductModalForm
        isAddingProduct={isAddingProduct}
        setIsAddingProduct={setIsAddingProduct}
      />
      <div style={{ height: 600, width: "100%" }}>
        <div className="mt-4 mx-5">
          {isAdmin && (
            <Button
              variant="contained"
              className="bg-blue-500"
              onClick={handleAddProductClick}
            >
              Add Product
            </Button>
          )}
        </div>
        <h1 className="m-4">
          This list contains information about our products, including their
          name, description, and price.
        </h1>

        <DataGrid
          rows={productList}
          columns={isSuperAdmin ? columnsAdmin : columns}
          rowHeight={150}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
        {status === "loading" && <h1>LOADING....</h1>}
        {status === "error" && <h1>SOMETHING WENT WRONG</h1>}
        {status === "success" && productList.length === 0 && (
          <h1>No products found.</h1>
        )}
      </div>
    </ContentLayout>
  );
}
