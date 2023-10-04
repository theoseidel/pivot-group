import { AgGridReact } from "ag-grid-react"
import "ag-grid-enterprise"
import "ag-grid-community/styles/ag-theme-alpine.css"
import "ag-grid-community/styles/ag-grid.css"
import "../styles.css"

import { useMemo } from "react"
import { ColDef } from "ag-grid-community"

export interface Column {
  name: string
  label: string
  jsType: "date" | "string" | "number"
}

interface TableProps {
  rows: object[]
  columns: Column[]
}

function Table({ rows, columns }: TableProps) {
  const columnDefs: ColDef[] = useMemo(
    () =>
      columns.map((column) => ({
        headerName: column.label,
        field: column.name,
      })),
    [columns]
  )

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
      enableRowGroup: true,
      deboounceMS: 0,
    }),

    []
  )

  return (
    <div style={{ height: 302, width: 1200 }} className="ag-theme-alpine">
      <AgGridReact
        rowGroupPanelShow="always"
        rowData={rows}
        columnDefs={columnDefs}
        animateRows={true}
        pagination={true}
        paginationPageSize={10}
        sideBar={"columns"}
        defaultColDef={defaultColDef}
        groupDisplayType="multipleColumns"
      />
    </div>
  )
}

export default Table
