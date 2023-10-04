import { useMemo } from "react"
import Table, { Column } from "../components/Table"
import mData from "../MOCK_DATA.json"
import { flexRender } from "@tanstack/react-table"

function Home() {
  const data = useMemo(() => mData, [])
  const columns: Column[] = [
    { name: "athlete_id", label: "Athlete ID", jsType: "number" },

    { name: "first_name", label: "First Name", jsType: "string" },
    { name: "last_name", label: "Last Name", jsType: "string" },
    {
      name: "age",
      label: "Age",
      jsType: "number",
    },
    { name: "country", label: "Country", jsType: "string" },
    { name: "medal_count", label: "Medal Count", jsType: "number" },
  ]
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Pivot and Group By Table</h1>
        <Table rows={data} columns={columns} />
      </div>
    </>
  )
}

export default Home
