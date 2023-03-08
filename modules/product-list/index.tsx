import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import ContentLayout from "../common/layouts/ContentLayout";
import DropdownMenu from "../common/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";

const DropdownMenuArray = [
  {
    name: "Edit",
    link: "edit",
  },
  {
    name: "delete",
    link: "delete",
  },
];
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    renderCell: (params) => (
      <DropdownMenu
        DropdownMenuArray={DropdownMenuArray}
        icon={(props: React.SVGProps<SVGSVGElement>) => (
          <BsThreeDotsVertical {...props} />
        )}
        iconStyle={"text-black"}
      />
    ),
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function LeadsList() {
  return (
    <ContentLayout>
      <div style={{ height: 600, width: "100%" }}>
        <h1 className="m-4">
          This list contains information about our customers from our dummy
          ecommerce, including their name, phone number, and age.
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
