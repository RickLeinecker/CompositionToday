import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import { User } from '../../ObjectInterface';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericModal from '../../Helper/Generics/GenericModal';
import useOpen from '../../Helper/CustomHooks/useOpen';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', width: 70 },
    { field: 'username', headerName: 'username', width: 130 },
    { field: 'email', headerName: 'email', width: 300 },
    { field: 'uid', headerName: 'uid', width: 270 },


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

export default function AdminAdminManager() {
    const [row, setRow] = useState<User[]>([]);
	const { open: addOpen, handleClick: handleOpenAdd, handleClose: handleCloseAdd } = useOpen();

    async function fetchAdmins() {
        try {
            let answer: any = (await GenericGetHandler("listAdmins"));
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

    const handleClick = () => {
        handleOpenAdd();
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />

            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "50px" }}>
                <Button color={"primary"} variant="contained" endIcon={<AddIcon />} onClick={handleClick}>
                    Make User an Admin
                </Button>
                <Button color={"error"} variant="contained" endIcon={<DeleteIcon />} onClick={handleClick}>
                    Remove an Admin
                </Button>
            </div>
            <GenericModal
				show={addOpen}
				title={"Add a New Admin"}
				onHide={handleCloseAdd}
				confirm={() => { }}
				actionText={"Save"}
				checkForErrors={() => false}
			>
				<div>
				</div>
			</GenericModal>
        </div>
    )
}
