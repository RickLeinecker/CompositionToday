import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import useOpen from '../../Helper/CustomHooks/useOpen';
import GenericModal from '../../Helper/Generics/GenericModal';
import { User } from '../../ObjectInterface';
import UserColumns from './columnStructure/UserColumns';

export default function AdminUserManager() {
	const [row, setRow] = useState<User[]>([]);
	const [user, setUser] = useState<User>();
	const [pageSize, setPageSize] = useState<number>(10);
	const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
	const { open: publishOpen, handleClick: handleOpenPublish, handleClose: handleClosePublish } = useOpen();
	const { open: adminOpen, handleClick: handleOpenAdmin, handleClose: handleCloseAdmin } = useOpen();
	const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

	/**
	 * This is strangely complex and long-winded because columns needs the useState,
	 * and only has access to it if is same scope. I abstracted the columns into another
	 * file (to keep this file short) and we're using this function to retrieve and know the function of the clicked button.
	 */
	const handleButtonClick = (userData: GridRenderCellParams<any, any, any>, type: string) => {
		console.log("Userdata", userData);
		setUser(userData.row);
		if (type === "edit") handleOpenEdit();
		if (type === "publisher") handleOpenPublish();
		if (type === "admin") handleOpenAdmin();
		if (type === "delete") handleOpenDelete();
	}

	const columns = UserColumns(handleButtonClick);

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
				pageSize={pageSize}
				onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
				onCellEditCommit={(params) => { console.log("Commited", params); }}
				rowsPerPageOptions={[10, 50, 100]}
				disableSelectionOnClick
				// checkboxSelection
			/>

			{/* Edit Modal */}
			<GenericModal
				show={editOpen}
				title={`Edit ${user?.username}`}
				onHide={handleCloseEdit}
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

			{/* Publisher Modal */}
			<GenericModal
				show={publishOpen}
				title={`Make ${user?.username} a Publisher`}
				onHide={handleClosePublish}
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

			{/* Admin Modal */}
			<GenericModal
				show={adminOpen}
				title={`Make ${user?.username} an Admin`}
				onHide={handleCloseAdmin}
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

			{/* Delete Modal */}
			<GenericModal
				show={deleteOpen}
				title={`Delete ${user?.username}`}
				onHide={handleCloseDelete}
				confirm={() => { }}
				actionText={"Delete"}
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
