import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useState } from "react";

type Props<T extends {id: number}> = {
    rows: T[];
    columns: GridColumns;
    setSelected: React.Dispatch<React.SetStateAction<T[]>>;
    CustomToolbar?: React.JSXElementConstructor<any>;
}

/**
 * Instantiates the DataGrid.
 * Here, you can add different
 * CustomToolbars to appear when selecting a row.
 */
const DataGridMaker = <T extends {id: number}>({ rows, columns, setSelected, CustomToolbar= () => <></> }: Props<T>) => {
    const [pageSize, setPageSize] = useState<number>(10);

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
                    const selectedRows = rows.filter((row: T) => selectedIDs.has(row.id));
                    setSelected(selectedRows);
                }}
                rowsPerPageOptions={[10, 50, 100]}
                checkboxSelection
            />
        </div>
    );
}

export default DataGridMaker;