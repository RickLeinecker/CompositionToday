import { Button } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import { User } from '../../ObjectInterface';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import GenericModal from '../../Helper/Generics/GenericModal';
import useOpen from '../../Helper/CustomHooks/useOpen';
import AdminColumns from './columnStructure/AdminColumns';

export default function AdminAdminManager() {
    const [rows, setRows] = useState<User[]>([]);
    const [selected, setSelected] = useState<User[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const { open: removeOpen, handleClick: handleOpenRemove, handleClose: handleCloseRemove } = useOpen();

    const columns = AdminColumns();

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

    useEffect(() => {
        fetchAdmins();
    }, [])

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
                    Toolbar: AdminToolbar,
                }}
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRows = rows.filter((row) => selectedIDs.has(row.id));
                    setSelected(selectedRows);
                }}
                rowsPerPageOptions={[10, 50, 100]}
                checkboxSelection
            />

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
                        {JSON.stringify(selected)}
                    </pre>
                </div>
            </GenericModal>
        </div>
    )
}
