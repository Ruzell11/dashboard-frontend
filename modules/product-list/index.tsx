import React, { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import ContentLayout from "../common/layouts/ContentLayout";
import DropdownMenu from "../common/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@mui/material";
import AddProductModalForm from "./components/AddProductModalForn";
import { isError, useQuery } from "react-query";
import { getUserProductList } from "./services";

export default function LeadsList() {
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: "user-product-data",
    queryFn: async () => getUserProductList(),
  });

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "product_name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "product_description",
      headerName: "Product Description",
      flex: 1,
    },
    { field: "product_price", headerName: "Price", flex: 1 },
    // {
    //   field: "created_by",
    //   headerName: "Created By",
    //   flex: 1,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     params.row?._doc?.created_by?.username || "N/A",
    // },
  ];

  if (isLoading) {
    return <h1>LOADING....</h1>;
  }

  if (isError) {
    return <h1>SOMETHING WENT WRONG</h1>;
  }

  if (data?.data.productList != null) {
    const productData = data?.data.productList.map((product) => product._doc);

    return (
      <ContentLayout>
        <AddProductModalForm
          isAddingProduct={isAddingProduct}
          setIsAddingProduct={setIsAddingProduct}
        />
        <div style={{ height: 600, width: "100%" }}>
          <div className="mt-4 mx-5">
            <Button
              variant="contained"
              className="bg-blue-500"
              onClick={() => setIsAddingProduct(true)}
            >
              Add Product
            </Button>
          </div>
          <h1 className="m-4">
            This list contains information about our customers from our dummy
            ecommerce, including their name, phone number, and age.
          </h1>
          {console.log(productData)}
          <DataGrid
            rows={productData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            getRowId={(row) => {
              console.log("this is the row ", row);
              return row._id;
            }}
          />
        </div>
      </ContentLayout>
    );
  }
  return (
    <ContentLayout>
      <AddProductModalForm
        isAddingProduct={isAddingProduct}
        setIsAddingProduct={setIsAddingProduct}
      />
      <div style={{ height: 600, width: "100%" }}>
        <div className="mt-4 mx-5">
          <Button
            variant="contained"
            className="bg-blue-500"
            onClick={() => setIsAddingProduct(true)}
          >
            Add Product
          </Button>
        </div>
        <h1 className="m-4">
          This list contains information about our customers from our dummy
          ecommerce, including their name, phone number, and age.
        </h1>

        <DataGrid
          rows={[]}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </ContentLayout>
  );
}
