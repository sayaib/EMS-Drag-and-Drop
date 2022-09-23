import { React, useState, useEffect } from "react";
import "../css/MaterialTable.scss";
import MaterialTable from "material-table";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import tableIcons from "../components/MaterialTableIcons";

// import Footer from "./Footer";

// material-table for dashboard page

function LogManagement() {
  const [tableData, setTableData] = useState([]);

  const fetchLogInfo = async () => {
    try {
      const res = await fetch("/getLogInfo", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setTableData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogInfo();
  }, []);

  // material-table columns

  const columns = [
    {
      title: "Sr. No.",
      render: (rowData) => `${rowData.tableData.id + 1}`,
      width: "10%",
      align: "center",
    },
    { title: "Timestamp", field: "dateTime", align: "center", width: "30  %" },
    {
      title: "Message",
      field: "message",
      align: "left",
      width: "60%",
    },
  ];
  return (
    <>
      <div style={{ minHeight: "85vh", maxWidth: "100%", padding: "1rem" }}>
        <div className="pageCard">
          <MaterialTable
            icons={tableIcons}
            columns={columns}
            data={tableData}
            title="Log Management"
            options={{
              paging: true,
              sorting: false,
              search: true,
              exportButton: true,
              pageSize: 7,
              exportAllData: true,
              // pageSizeOptions: [10, 20, 30, 50, 75, 100],
              pageSizeOptions: false,
              paginationType: "stepped",
              headerStyle: {
                position: "sticky",
                top: "0",
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default LogManagement;
