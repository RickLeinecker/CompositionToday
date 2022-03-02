import { Button } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";

type Props = (params: GridRenderCellParams<any, any, any>, type: string) => void;

/**
 * Retrieves admin columns
 * @param openEdit callback to get user data
 * @returns 
 */
const AdminColumns = (openEdit: Props) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', type: 'number', width: 70 },
        { field: 'username', headerName: 'username', width: 200, editable: true },
        { field: 'email', headerName: 'email', width: 300, editable: true },
        // { field: 'uid', headerName: 'uid', width: 270, editable: true },

        {
            field: 'displayName',
            headerName: 'Display Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 250,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
            editable: true
        },
        {
			field: 'admin', headerName: 'Remove Admin', description: 'Demote Admin to a User', sortable: false, width: 160, headerAlign: 'center', align: 'center',
			renderCell: (params) => { return <Button color="error" variant="contained" onClick={() => openEdit(params, "remove")}>Remove Admin</Button>; }, editable: false
		},
    ];
    return columns;
}

export default AdminColumns;