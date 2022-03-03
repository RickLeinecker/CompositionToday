import { Button } from "@mui/material";
import { DataGrid, GridColumns, GridToolbarContainer } from "@mui/x-data-grid";
import { useState } from "react";
import { TagType, User } from "../../ObjectInterface";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';


type Selectables = User | TagType;

type Props = {
    rows: Selectables[];
    columns: GridColumns;
    type: string;
    handleOpenRemove?: () => void;
}

/**
 * Instantiates the DataGrid.
 * Here, you can add different
 * CustomToolbars to appear when selecting a row.
 */
const DataGridMaker = ({ rows, columns, type, handleOpenRemove }: Props) => {
    const [selected, setSelected] = useState<Selectables[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);

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

    let CustomToolbar: () => JSX.Element;

    switch (type) {
        case 'admin':
            CustomToolbar = AdminToolbar;
            break;
        default:
            CustomToolbar = () => <></>;
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
                    Toolbar: CustomToolbar,
                }}
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRows = rows.filter((row: Selectables) => selectedIDs.has(row.id));
                    setSelected(selectedRows);
                }}
                rowsPerPageOptions={[10, 50, 100]}
                checkboxSelection
            />
        </div>
    );
}

export default DataGridMaker;