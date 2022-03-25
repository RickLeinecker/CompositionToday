import { GridColDef } from '@mui/x-data-grid';

export default [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'username', headerName: 'Username', width: 200 },
	{ field: 'email', headerName: 'Email', width: 250 },
	{ field: 'uid', headerName: 'UID', width: 280 },
	{ field: 'isPublisher', headerName: 'Publisher', width: 100 },
	// { field: 'firstName', headerName: 'First name', width: 130 },
	// { field: 'lastName', headerName: 'Last name', width: 130 },
] as GridColDef[];