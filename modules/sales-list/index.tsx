import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import ContentLayout from "../common/layouts/ContentLayout";

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Customer name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },

  {
    field: "price",
    headerName: "Product Price",
    type: "number",
    width: 110,
  },
  {
    field: "date_bought",
    headerName: "Date Bought",
    type: "number",
    width: 110,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", price: "Sub Admin" },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    price: "Read Only",
  },
  { id: 3, lastName: "Lannister", firstName: "Jaime", price: "Sub Admin" },
  { id: 4, lastName: "Stark", firstName: "Arya", price: "Sub Admin" },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    price: "Sub Admin",
  },
  { id: 6, lastName: "Melisandre", firstName: null, price: "Read Only" },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    price: "Sub Admin",
  },
  { id: 8, lastName: "Frances", firstName: "Rossini", price: "Sub Admin" },
  { id: 9, lastName: "Roxie", firstName: "Harvey", price: "Sub Admin" },
];

export default function SalesList() {
  return (
    <ContentLayout>
      <div style={{ height: 600, width: "100%" }}>
        <h1 className="m-4">
          This list contains information about our team and their price on our
          crm.
        </h1>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </ContentLayout>
  );
}
