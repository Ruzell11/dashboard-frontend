import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import ContentLayout from "../common/layouts/ContentLayout";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "permission",
    headerName: "Permission",
    type: "number",
    width: 90,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", permission: "Sub Admin" },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    permission: "Read Only",
  },
  { id: 3, lastName: "Lannister", firstName: "Jaime", permission: "Sub Admin" },
  { id: 4, lastName: "Stark", firstName: "Arya", permission: "Sub Admin" },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    permission: "Sub Admin",
  },
  { id: 6, lastName: "Melisandre", firstName: null, permission: "Read Only" },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    permission: "Sub Admin",
  },
  { id: 8, lastName: "Frances", firstName: "Rossini", permission: "Sub Admin" },
  { id: 9, lastName: "Roxie", firstName: "Harvey", permission: "Sub Admin" },
];

export default function TeamList() {
  return (
    <ContentLayout>
      <div style={{ height: 600, width: "100%" }}>
        <h1 className="m-4">
          This list contains information about our team and their permission on
          our crm.
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
