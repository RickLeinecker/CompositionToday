import { Button } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";


/**
 * Retrieves admin columns
 * @returns 
 */
const AdminColumns = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', type: 'number', width: 70 },
        { field: 'username', headerName: 'username', width: 200 },
        { field: 'email', headerName: 'email', width: 300 },
        { field: 'uid', headerName: 'uid', width: 270 },
        {
            field: 'displayName',
            headerName: 'Display Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 250,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`
        },
    ];
    return columns;
}

export default AdminColumns;