import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import { User } from '../../ObjectInterface';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'userName', headerName: 'Username', width: 130 },
	{ field: 'firstName', headerName: 'First name', width: 130 },
	{ field: 'lastName', headerName: 'Last name', width: 130 },
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 90,
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.row.firstName || ''} ${params.row.lastName || ''}`,
	},
];

const rows = [
	{ id: 1, userName: "helo10", lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, userName: "helo10", lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, userName: "helo10", lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	{ id: 4, userName: "helo10", lastName: 'Stark', firstName: 'Arya', age: 16 },
	{ id: 5, userName: "helo10", lastName: 'Targaryen', firstName: 'Daenerys', age: null },
	{ id: 6, userName: "helo10", lastName: 'Melisandre', firstName: null, age: 150 },
	{ id: 7, userName: "helo10", lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: 8, userName: "helo10", lastName: 'Frances', firstName: 'Rossini', age: 36 },
	{ id: 9, userName: "helo10", lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function AdminUserManager() {
    const [row, setRow] = useState<User[]>([]);

	async function fetchAdmins() {
        try {
            let answer: any = (await GenericGetHandler("getUsers"));
            if (!!answer.error) {
                return;
            }

            const result = await answer.result;
            setRow(result);
        } catch (e: any) {
            console.error("Frontend Error: " + e);
        }
    }

    useEffect(() => {
        fetchAdmins();
    }, [])

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={row}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
		</div>
	)
}
