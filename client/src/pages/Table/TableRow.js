import DeleteIcon from "@mui/icons-material/Delete";



function TableRow({ rowsData, deleteTableRows, handleChange }) {



    const tableStyle = {
        color: "#919191",
        fontWeight: "550",
        textAlign: "center",
        border: "2px solid #ababab",
    }
    return (

        rowsData.map((data, index) => {
            const { deviceId, deviceName, status } = data;
            return (
                <tr key={index} >
                    <td
                        style={tableStyle}
                    >
                        {index}
                    </td>
                    <td style={tableStyle}><input type="text" value={deviceId} onChange={(evnt) => (handleChange(index, evnt))} name="deviceId" /> </td>
                    <td style={tableStyle}><input type="text" value={deviceName} onChange={(evnt) => (handleChange(index, evnt))} name="deviceName" /> </td>
                    <td style={tableStyle}><input type="text" value={status} onChange={(evnt) => (handleChange(index, evnt))} name="status" /> </td>

                    <td style={tableStyle}><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}><DeleteIcon /></button></td>
                </tr>
            )
        })

    )

}
export default TableRow;