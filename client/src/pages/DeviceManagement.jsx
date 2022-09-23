import { useState } from "react/cjs/react.development";
import TableRows from "../pages/Table/TableRow";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Table from "react-bootstrap/Table";
import "../css/DeviceManagement.css";

function DeviceManagement() {
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      fullName: "",
      emailAddress: "",
      salary: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  return (
    <div className="container mt-3">
      <h5>Device Management</h5>
      <button
        className="btn btn-outline-success"
        onClick={addTableRows}
        style={{ position: "absolute", right: "20px" }}
      >
        <AddBoxIcon />
      </button>
      <div className="row mt-2">
        <div className="m-2 mt-5">
          <Table responsive>
            <thead>
              <tr style={{ border: "2px solid #ababab" }}>
                <th style={{ border: "2px solid #ababab" }}>
                  <p id="table_head">No.</p>
                </th>
                <th style={{ border: "2px solid #ababab" }}>
                  <p id="table_head"> Device Id </p>
                </th>
                <th style={{ border: "2px solid #ababab" }}>
                  <p id="table_head">Device Name</p>
                </th>
                <th style={{ border: "2px solid #ababab" }}>
                  <p id="table_head"> Status</p>
                </th>
                <th style={{ border: "2px solid #ababab" }}>
                  <p id="table_head">Action </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRows
                rowsData={rowsData}
                deleteTableRows={deleteTableRows}
                handleChange={handleChange}
              />
            </tbody>
          </Table>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
}
export default DeviceManagement;
