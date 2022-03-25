import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import { User } from '../../../ObjectInterface';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import AdminColumns from '../columnStructure/AdminColumns';
import AdminRemoveModal from './AdminRemoveModal';
import DataGridMaker from '../DataGridMaker';

export default function AdminAdminManager() {
    const [rows, setRows] = useState<User[]>([]);
    const [selected, setSelected] = useState<User[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const { open: removeOpen, handleClick: handleOpenRemove, handleClose: handleCloseRemove } = useOpen();

    async function fetchAdmins() {
        try {
            let answer: any = (await GenericGetHandler("listAdmins"));
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

    function AdminToolbar() {
        return (
            <GridToolbarContainer style={{ display: "flex", justifyContent: "space-around" }}>
                {
                    selected.length === 1 &&
                    <Button color="error" variant="contained" onClick={handleOpenRemove} endIcon={<PersonRemoveIcon />}>
                        Remove Admin
                    </Button>
                }
            </GridToolbarContainer>
        );
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGridMaker rows={rows} columns={AdminColumns} setSelected={setSelected} CustomToolbar={AdminToolbar} />

            <AdminRemoveModal
                userID={selected.map((user: User) => user.uid!)}
                notifyChange={notifyChange}
                deleteOpen={removeOpen}
                handleCloseDelete={handleCloseRemove} type={'admin'}
            />
        </div>
    )
}
