import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import { User } from '../../../ObjectInterface';
import UserColumns from '../columnStructure/UserColumns';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AdminEditUserModal from './AdminEditUserModal';
import AdminDeleteUsersModal from './AdminDeleteUsersModal';
import DataGridMaker from '../DataGridMaker';
import AdminMakePublisherModal from './AdminMakePublisherModal';
import AdminMakeAdminModal from './AdminMakeAdminModal';
import AdminRemovePublisherModal from './AdminRemovePublisherModal';

export default function AdminUserManager() {
	const [rows, setRows] = useState<User[]>([]);
	const [selected, setSelected] = useState<User[]>([]);
	const [refresh, setRefresh] = useState<number>(0);
	const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
	const { open: publishOpen, handleClick: handleOpenPublish, handleClose: handleClosePublish } = useOpen();
	const { open: removePublishOpen, handleClick: handleOpenRemovePublish, handleClose: handleCloseRemovePublish } = useOpen();
	const { open: adminOpen, handleClick: handleOpenAdmin, handleClose: handleCloseAdmin } = useOpen();
	const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

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

	function notifyChange() {
		setRefresh(p => p + 1);
	}

	useEffect(() => {
		fetchAdmins();
	}, [refresh])

	function UserToolbar() {
		return (
			<GridToolbarContainer style={{ display: "flex", justifyContent: "space-around" }}>
				{selected.length === 1 && <Button color="secondary" variant="contained" onClick={handleOpenEdit} endIcon={<EditIcon />} >Edit User</Button>}
				{selected.length > 0 && <Button color="primary" variant="contained" onClick={handleOpenAdmin} endIcon={<PersonAddAlt1Icon />} >Make Admin</Button>}
				{selected.length > 0 && <Button color="success" variant="contained" onClick={handleOpenPublish} endIcon={<AddIcon />} >Make Publisher</Button>}
				{selected.length > 0 && <Button color="warning" variant="contained" onClick={handleOpenRemovePublish} endIcon={<RemoveIcon />} >Remove Publisher</Button>}
				{selected.length > 0 && <Button color="error" variant="contained" onClick={handleOpenDelete} endIcon={<DeleteIcon />} >Delete User</Button>}
			</GridToolbarContainer>
		);
	}

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGridMaker rows={rows} columns={UserColumns} setSelected={setSelected} CustomToolbar={UserToolbar} />

			{/* Edit Modal */}
			{
				selected.length === 1
					?
					<AdminEditUserModal
						user={selected[0]}
						notifyChange={notifyChange}
						editOpen={editOpen}
						handleCloseEdit={handleCloseEdit}
					/>
					:
					<></>
			}

			<AdminMakePublisherModal
				userID={selected.map(user => user.uid!)}
				notifyChange={notifyChange}
				publishOpen={publishOpen}
				handleClosePublish={handleClosePublish}
				type={"user"}
			/>

			<AdminRemovePublisherModal
				userID={selected.map(user => user.uid!)}
				notifyChange={notifyChange}
				publishOpen={removePublishOpen}
				handleClosePublish={handleCloseRemovePublish}
				type={"user"}
			/>

			<AdminMakeAdminModal
				userID={selected.map(user => user.uid!)}
				notifyChange={notifyChange}
				adminOpen={adminOpen}
				handleCloseAdmin={handleCloseAdmin}
				type={"user"}
			/>

			<AdminDeleteUsersModal
				userID={selected.map(user => user.id)}
				notifyChange={notifyChange}
				deleteOpen={deleteOpen}
				handleCloseDelete={handleCloseDelete}
				type={"user"}
			/>

		</div>
	)
}
