import { React, useEffect, useState } from "react";
import "../css/MaterialTable.scss";
import MaterialTable from "material-table";
import tableIcons from "../components/MaterialTableIcons";

let checktype;

function UserManagement() {
  const [tableData, setTableData] = useState([]);
  const [userData, setUserData] = useState({});
  const [user_type, setUserType] = useState("");
  //fetch the user data and show on user management table
  const fetchUserInfo = async () => {
    try {
      const res = await fetch("/displayUser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
      setTableData(data);
    } catch (error) {
      console.log(error);
    }
  };

  //delete the data of the user using user id
  const deleteUserInfo = async (selectedRow) => {
    const userId = selectedRow.user_id;
    console.log(userId);
    try {
      const res = await fetch("/deleteUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
        }),
      });
      const data = await res.json();
      if (res.status === 400 || res.status === 422 || !data) {
        window.alert("Invalid");
      } else {
        window.alert("User Deleted Successful");
        // console.log("hello");
        refreshPage();
        const dateAndTime = timeStamp();
        const addMessage = `${selectedRow.user_name} user deleted`;
        logData(dateAndTime, addMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //add new user in user management table
  const postData = async (newRow) => {
    const name = newRow.user_name;
    // const id = newRow.user_id;
    const email = newRow.email;
    const userType = checktype ? checktype : 3;
    console.log(user_type);
    try {
      const res = await fetch("/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // user_id: id,
          user_name: name,
          email: email,
          user_type: userType,
          company_id: userData.company_id,
        }),
      });

      const data = await res.json();

      if (res.status === 400 || res.status === 422 || !data) {
        window.alert("Invalid");
      } else if (res.status === 408) {
        window.alert("Email is not valid");
        refreshPage();
      } else if (res.status === 409) {
        window.alert("Email or user name already exists");
        refreshPage();
      } else {
        console.log("Data Added Successful");
        refreshPage();
        const dateAndTime = timeStamp();
        const addMessage = `${newRow.user_name} added as a new user`;
        logData(dateAndTime, addMessage); // send the log data to log management table
        newPasswordLink(newRow); // to send email for new password
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update the data of the user using user id
  const updateUserInfo = async (updatedRow) => {
    const name = updatedRow.user_name;
    const id = updatedRow.user_id;
    const email = updatedRow.email;
    const userType = checktype ? checktype : 3;
    try {
      const res = await fetch("/updateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: id,
          user_name: name,
          email: email,
          user_type: userType,
        }),
      });

      const data = await res.json();

      if (res.status === 400 || res.status === 422 || !data) {
        window.alert("Invalid");
      } else if (res.status === 409) {
        window.alert("user already exists");
        refreshPage();
      } else {
        console.log("Data Updated Successful");
        refreshPage();
        const dateAndTime = timeStamp();
        const addMessage = `${updatedRow.user_name} user updated`;
        logData(dateAndTime, addMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get the date and time
  const timeStamp = () => {
    let date = new Date();
    let getDate = date.toLocaleDateString();
    let getTime = date.toLocaleTimeString();

    return `${getDate} - ${getTime}`;
  };

  //send the log data to log management table
  const logData = async (dateAndTime, addMessage) => {
    const dateTime = dateAndTime;
    const message = addMessage;
    // console.log(dateTime);
    // console.log(message);
    try {
      const res = await fetch("/logData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateTime: dateTime,
          message: message,
        }),
      });
      const data = await res.json();

      if (res.status === 400 || res.status === 422 || !data) {
        window.alert("Invalid");
      } else {
        window.alert("Log data added Successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function for password generation
  // this function only run when the operator user added into the table
  const newPasswordLink = async (newRow) => {
    const email = newRow.email;

    const res = await fetch("/resetPass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    });

    const data = res.json();

    if (res.status === 400 || res.status === 422 || !data) {
      window.alert("Invalid email address !!!!");
    } else {
      //window.alert("Password reset link sent to your email account");
      console.log("Link send");
    }
  };

  //
  const IsUserOrAdmin = async () => {
    try {
      const res = await fetch("/userOrAdmin", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data.user_type);
      setUserData(data);

      if (res.status === 400 || res.status === 422 || !data) {
        return res.status(422).send("Data not recieved !!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    IsUserOrAdmin();
  }, []);
  const userTypeLookups = [
    {
      label: "Admin",
      value: 2,
    },
    {
      label: "Operator",
      value: 3,
    },
  ];
  const columns = [
    {
      title: "User Id",
      field: "user_id",
      editable: false,
      filtering: false,
      align: "center",
    },
    {
      title: "User Name",
      field: "user_name",
      filtering: false,
      align: "center",
    },
    { title: "Email", field: "email", filtering: false, align: "center" },
    {
      title: "User Type",
      field: "user_type",
      lookup: { 1: "Admin", 2: "Admin", 3: "Operator" },
      editComponent: (props) => {
        return (
          <select
            required
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
            id="standard-select-currency"
            name="user_type"
            className="textField"
            // fullWidth
            select // label="Select"
            autoComplete="off"
            value={checktype}
            onChange={(e) => {
              checktype = e.target.value;
            }}
            // error={formik.touched.WO_To && Boolean(formik.errors.WO_To)}
            // helperText={formik.touched.WO_To && formik.errors.WO_To}
            // variant="standard"
          >
            <option selected disabled value="">
              {/* {tableData.user_type === 0 ? "Admin" : "User"} */}
              {userTypeLookups[1].label}
            </option>
            {userTypeLookups.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      },
      align: "center",
      width: "10%",
    },
  ];

  // if (checktype) {
  //   setUserType(checktype);
  // }
  const refreshPage = () => {
    window.location.reload();
  };
  // console.log(tableData[1]["user_type"]);

  return (
    <>
      <div style={{ minHeight: "85vh", maxWidth: "100%", padding: "1rem" }}>
        <div className="pageCard">
          {userData.user_type === 1 ? (
            <MaterialTable
              icons={tableIcons}
              columns={columns}
              data={tableData}
              title="User Management"
              // tableRef={this.tableRef.current.onQueryChange()}

              editable={{
                isDeleteHidden: (rowData) => rowData.tableData.id === 0,
                isEditHidden: (rowData) => rowData.tableData.id === 0,

                onRowAdd: (newRow) =>
                  new Promise((resolve, reject) => {
                    const updatedRows = [
                      ...tableData,
                      { user_id: "", ...newRow },
                    ];

                    // console.log(newRow.user_name);
                    // console.log(tableData);
                    // console.log(newRow);
                    //This function is called when we clicked on right in mt table.

                    /* console.log(newRow.email);
                  let userType = true;
                  if (userType == true) {
                    postData(newRow);
                    newPasswordLink(newRow);
                  } else {
                    postData(newRow);
                  } */

                    postData(newRow);

                    setTimeout(() => {
                      setTableData(updatedRows);
                      resolve();
                    }, 500);
                    //refreshPage();
                  }),

                onRowDelete: (selectedRow) =>
                  new Promise((resolve, reject) => {
                    const index = selectedRow.tableData.id;
                    const updatedRows = [...tableData];
                    updatedRows.splice(index, 1);

                    //call the delete user function and pass the user data
                    deleteUserInfo(selectedRow);

                    setTimeout(() => {
                      setTableData(updatedRows);
                      resolve();
                    }, 500);
                  }),
                onRowUpdate: (updatedRow, oldRow) =>
                  new Promise((resolve, reject) => {
                    const index = oldRow.tableData.id;
                    const updatedRows = [...tableData];
                    updatedRows[index] = updatedRow;
                    //call the update user function and pass the user data
                    updateUserInfo(updatedRow);
                    setTimeout(() => {
                      setTableData(updatedRows);
                      resolve();
                    }, 500);
                    //refreshPage();
                  }),
              }}
              options={{
                paging: true,
                sorting: false,
                search: true,
                filtering: false,
                exportButton: true,
                exportAllData: true,

                actionsColumnIndex: -1,
                pageSize: 5,
                pageSizeOptions: false,
                paginationType: "stepped",
                addRowPosition: "first",
                headerStyle: {
                  position: "sticky",
                  top: "0",
                },
              }}
            />
          ) : userData.user_type === 2 ? (
            <MaterialTable
              icons={tableIcons}
              columns={columns}
              data={tableData}
              title="User Management"
              // tableRef={this.tableRef.current.onQueryChange()}

              editable={{
                // isDeleteHidden: (rowData) =>rowData.tableData.id === 0,
                // isEditHidden: (rowData) => rowData.tableData.id === 0,
                isDeleteHidden: (rowData) => {
                  return rowData.user_type === 2 || rowData.tableData.id === 0;
                },
                isEditHidden: (rowData) => {
                  return rowData.user_type === 2 || rowData.tableData.id === 0;
                },
                onRowAdd: (newRow) =>
                  new Promise((resolve, reject) => {
                    const updatedRows = [
                      ...tableData,
                      { user_id: "", ...newRow },
                    ];

                    // console.log(newRow.user_name);
                    // console.log(tableData);
                    // console.log(newRow);
                    //This function is called when we clicked on right in mt table.

                    /* console.log(newRow.email);
                  let userType = true;
                  if (userType == true) {
                    postData(newRow);
                    newPasswordLink(newRow);
                  } else {
                    postData(newRow);
                  } */

                    postData(newRow);

                    setTimeout(() => {
                      setTableData(updatedRows);
                      resolve();
                    }, 500);
                    //refreshPage();
                  }),

                onRowDelete: (selectedRow) =>
                  new Promise((resolve, reject) => {
                    const index = selectedRow.tableData.id;
                    const updatedRows = [...tableData];
                    updatedRows.splice(index, 1);

                    //call the delete user function and pass the user data
                    deleteUserInfo(selectedRow);

                    setTimeout(() => {
                      setTableData(updatedRows);
                      resolve();
                    }, 500);
                  }),
                onRowUpdate: (updatedRow, oldRow) =>
                  new Promise((resolve, reject) => {
                    const index = oldRow.tableData.id;
                    const updatedRows = [...tableData];
                    updatedRows[index] = updatedRow;
                    //call the update user function and pass the user data
                    updateUserInfo(updatedRow);
                    setTimeout(() => {
                      setTableData(updatedRows);
                      resolve();
                    }, 500);
                    //refreshPage();
                  }),
              }}
              options={{
                paging: true,
                sorting: false,
                search: true,
                filtering: false,
                exportButton: true,
                exportAllData: true,

                actionsColumnIndex: -1,
                pageSize: 5,
                pageSizeOptions: false,
                paginationType: "stepped",
                addRowPosition: "first",
                headerStyle: {
                  position: "sticky",
                  top: "0",
                },
              }}
            />
          ) : (
            <MaterialTable
              icons={tableIcons}
              columns={columns}
              data={tableData}
              title="User Management"
              // tableRef={this.tableRef.current.onQueryChange()}
              options={{
                paging: true,
                sorting: false,
                search: true,
                filtering: false,
                exportButton: true,
                exportAllData: true,

                actionsColumnIndex: -1,
                pageSizeOptions: false,
                pageSize: 5,
                paginationType: "stepped",
                addRowPosition: "first",
                headerStyle: {
                  position: "sticky",
                  top: "0",
                },
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default UserManagement;
