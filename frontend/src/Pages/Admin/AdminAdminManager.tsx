import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import { User } from '../../ObjectInterface';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericModal from '../../Helper/Generics/GenericModal';
import useOpen from '../../Helper/CustomHooks/useOpen';
import AdminColumns from './columnStructure/AdminColumns';

export default function AdminAdminManager() {
    const [row, setRow] = useState<User[]>([]);
    const [user, setUser] = useState<User>();
	const [pageSize, setPageSize] = useState<number>(10);
	const { open: removeOpen, handleClick: handleOpenRemove, handleClose: handleCloseRemove } = useOpen();

    const handleButtonClick = (userData: GridRenderCellParams<any, any, any>, type: string) => {
		console.log("Admindata",userData);
		setUser(userData.row);
		if (type === "remove") handleOpenRemove();
	}

	const columns = AdminColumns(handleButtonClick);

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

    // const handleClick = () => {
    //     handleOpenAdd();
    // }

    // const handleRowClick = (params: GridRowParams<{[key: string]: any;}>) => {
	// 	console.log("Clicked", params.row);
	// 	setUser(params.row as User);
	// 	handleOpenAdd();
	// }

    // UserColumns();

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={row}
                columns={columns}
				pageSize={pageSize}
				onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
				onCellEditCommit={(params) => {console.log("Commited", params);}}
				// onRowClick={handleRowClick}
				rowsPerPageOptions={[10, 50, 100]}
            />

            {/* <div style={{ display: "flex", justifyContent: "space-around", marginTop: "50px" }}>
                <Button color={"primary"} variant="contained" endIcon={<AddIcon />} onClick={handleClick}>
                    Make User an Admin
                </Button>
                <Button color={"error"} variant="contained" endIcon={<DeleteIcon />} onClick={handleClick}>
                    Remove an Admin
                </Button>
            </div> */}
            <GenericModal
				show={removeOpen}
				title={"Demote Admin to User"}
				onHide={handleCloseRemove}
				confirm={() => { }}
				actionText={"Save"}
				checkForErrors={() => false}
			>
				<div>
                    <pre>
					    {JSON.stringify(user)}
                    </pre>
				</div>
			</GenericModal>
        </div>
    )
}
