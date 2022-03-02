import { GridColDef } from '@mui/x-data-grid';

/**
 * Retrieves user columns
 * @returns 
 */
const UserColumns = () => {
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'userName', headerName: 'Username', width: 130 },
		{ field: 'firstName', headerName: 'First name', width: 130 },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
	];
	return columns
}

export default UserColumns;