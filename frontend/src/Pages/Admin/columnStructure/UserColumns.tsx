import { Button } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

type Props = (params: GridRenderCellParams<any, any, any>, type: string) => void;

/**
 * Retrieves user columns
 * @param openEdit callback to get user data
 * @returns 
 */
const UserColumns = (openEdit: Props) => {

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 70, editable: true },
		{ field: 'userName', headerName: 'Username', width: 130, editable: true },
		{ field: 'firstName', headerName: 'First name', width: 130, editable: true },
		{ field: 'lastName', headerName: 'Last name', width: 130, editable: true },
		{
			field: 'fullName', headerName: 'Full name', description: 'This column has a value getter and is not sortable.', sortable: false, width: 160,
			valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`, editable: true
		},
		{
			field: 'edit', headerName: 'Edit', description: 'Edit a User', sortable: false, width: 140, headerAlign: 'center', align: 'center',
			renderCell: (params) => { return <Button color="primary" variant="contained" onClick={() => openEdit(params, "edit")}>Edit User</Button>; }, editable: false
		},
		{
			field: 'publisher', headerName: 'Make Publisher', description: 'Make a User a Publisher', sortable: false, width: 160, headerAlign: 'center', align: 'center',
			renderCell: (params) => { return <Button color="success" variant="contained" onClick={() => openEdit(params, "publisher")}>Make Publisher</Button>; }, editable: false
		},
		{
			field: 'admin', headerName: 'Make Admin', description: 'Promote a User an Admin', sortable: false, width: 160, headerAlign: 'center', align: 'center',
			renderCell: (params) => { return <Button color="warning" variant="contained" onClick={() => openEdit(params, "admin")}>Make Admin</Button>; }, editable: false
		},
		{
			field: 'delete', headerName: 'Delete', description: 'Delete a User', sortable: false, width: 140, headerAlign: 'center', align: 'center',
			renderCell: (params) => { return <Button color="error" variant="contained" onClick={() => openEdit(params, "delete")}>Delete User</Button>; }, editable: false
		},
	];

	return columns
}

export default UserColumns;