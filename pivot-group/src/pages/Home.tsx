import { useMemo } from "react"
import Table, { Column } from "../components/Table"
import mData from "../MOCK_DATA.json"
import { flexRender } from "@tanstack/react-table"

function Home() {
  const data = useMemo(() => mData, [])
  const columns: Column[] = [
    { name: "order_id", label: "Order ID", jsType: "number" },

    {
      name: "product_name",
      label: "Product Name",
      jsType: "string",
      pivot: true,
    },
    {
      name: "quantity",
      label: "Quantity",
      jsType: "number",
    },
    { name: "price", label: "Price", jsType: "number", pivot: true },
    { name: "purchase_date", label: "Purchase Date", jsType: "date" },
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
