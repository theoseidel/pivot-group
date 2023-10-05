import { AgGridReact } from "ag-grid-react"
import "ag-grid-enterprise"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import "../styles.css"

import { useCallback, useMemo, useRef, useState } from "react"
import { ColDef } from "ag-grid-community"

export interface Column {
  name: string
  label: string
  jsType: "date" | "string" | "number"
  pivot?: boolean
}

interface TableProps {
  rows: object[]
  columns: Column[]
}

function Table({ rows, columns }: TableProps) {
  const gridRef = useRef<AgGridReact>(null)
  const [sidebar, setSidebar] = useState("filters")
  const [theme, setTheme] = useState("ag-theme-alpine-dark")

  const columnDefs: ColDef[] = useMemo(
    () =>
      columns.map((column) => ({
        headerName: column.label,
        field: column.name,
        filter: column.jsType === "date" ? "agDateColumnFilter" : true,
        pivot: column.pivot,
      })),
    [columns]
  )
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === "ag-theme-alpine"
        ? "ag-theme-alpine-dark"
        : "ag-theme-alpine"
    )
  }, [])

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      resizable: true,
      debounceMs: 0,
      sortable: true,
      enableRowGroup: true,
      enableValue: true,
      enablePivot: true,
    }),
    []
  )

  const clearFilters = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.setFilterModel(null)
    }
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebar((prevSidebar) =>
      prevSidebar === "columns" ? "filters" : "columns"
    )
  }, [])

  return (
    <div className={theme + " table-wrapper"}>
      <div className="table-options">
        <button className="filter-button" onClick={clearFilters}>
          Clear Filters
        </button>
        <button className="filter-button" onClick={toggleSidebar}>
          Toggle Sidebar
        </button>
      </div>
      <AgGridReact
        ref={gridRef}
        defaultColDef={defaultColDef}
        rowData={rows}
        columnDefs={columnDefs}
        animateRows={true}
        pagination={true}
        paginationPageSize={10}
        rowGroupPanelShow="always"
        sideBar={sidebar}
        domLayout="autoHeight"
      />
      <button
        style={{ marginTop: 5 }}
        className="filter-button"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
    </div>
  )
}

export default Table
