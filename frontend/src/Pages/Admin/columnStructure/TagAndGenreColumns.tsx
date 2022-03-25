import { GridColDef } from "@mui/x-data-grid";

export default [
    { field: 'id', headerName: 'ID', type: 'number', width: 70 },
    { field: 'tagName', headerName: 'Tags', width: 200 },
] as GridColDef[];