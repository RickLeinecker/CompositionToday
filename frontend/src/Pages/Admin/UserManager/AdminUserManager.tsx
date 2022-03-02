import { Button } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericModal from '../../../Helper/Generics/GenericModal';
import { User } from '../../../ObjectInterface';
import UserColumns from '../columnStructure/UserColumns';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AdminEditUserModal from './AdminEditUserModal';
import AdminDeleteUsersModal from './AdminDeleteUsersModal';
import AdminMakeAdminModal from './AdminMakeAdminModal';
import AdminMakePublisherModal from './AdminMakePublisherModal';

export default function AdminUserManager() {
	const [rows, setRows] = useState<User[]>([]);
	const [selected, setSelected] = useState<User[]>([]);
	const [pageSize, setPageSize] = useState<number>(10);
	const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
	const { open: publishOpen, handleClick: handleOpenPublish, handleClose: handleClosePublish } = useOpen();
	const { open: adminOpen, handleClick: handleOpenAdmin, handleClose: handleCloseAdmin } = useOpen();
	const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

	const columns = UserColumns;

	async function fetchAdmins() {
		try {
			let answer: any = (await GenericGetHandler("getUsers"));
			if (!!answer.error) {
				return;
			}

			const result = await answer.result;
			setRows(result);
		} catch (e: any) {
			console.error("Frontend Error: " + e);
		}
	}

	useEffect(() => {
		fetchAdmins();
	}, [])

	function UserToolbar() {
		return (
			<GridToolbarContainer style={{ display: "flex", justifyContent: "space-around" }}>
				{selected.length === 1 && <Button color="primary" variant="contained" onClick={handleOpenEdit} endIcon={<EditIcon />} >Edit User</Button>}
				{selected.length > 0 && <Button color="success" variant="contained" onClick={handleOpenPublish} endIcon={<AddIcon />} >Make Publisher</Button>}
				{selected.length > 0 && <Button color="warning" variant="contained" onClick={handleOpenAdmin} endIcon={<PersonAddAlt1Icon />} >Make Admin</Button>}
				{selected.length > 0 && <Button color="error" variant="contained" onClick={handleOpenDelete} endIcon={<DeleteIcon />} >Delete User</Button>}
			</GridToolbarContainer>
		);
	}

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				sx={{
					"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
						display: "none"
					}
				}}
				rows={rows}
				columns={columns}
				pageSize={pageSize}
				onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
				components={{
					Toolbar: UserToolbar,
				}}
				onSelectionModelChange={(ids) => {
					const selectedIDs = new Set(ids);
					const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
					setSelected(selectedRows);
				}}
				// disableSelectionOnClick
				rowsPerPageOptions={[10, 50, 100]}
				checkboxSelection
			/>

			{selected.length === 1 ?
				<AdminEditUserModal
					user={selected[0]}
					notifyChange={() => { }}
					editOpen={editOpen}
					handleCloseEdit={handleCloseEdit}
				/>
				:
				<></>
			}

			<AdminMakePublisherModal
				userID={selected.map(user => user.id)}
				notifyChange={() => { }}
				publishOpen={publishOpen}
				handleClosePublish={handleClosePublish}
				type={"user"}
			/>

			<AdminMakeAdminModal
				userID={selected.map(user => user.id)}
				notifyChange={() => { }}
				adminOpen={adminOpen}
				handleCloseAdmin={handleCloseAdmin}
				type={"user"}
			/>

			<AdminDeleteUsersModal
				userID={selected.map(user => user.id)}
				notifyChange={() => { }}
				deleteOpen={deleteOpen}
				handleCloseDelete={handleCloseDelete}
				type={"user"}
			/>

		</div>
	)
}
