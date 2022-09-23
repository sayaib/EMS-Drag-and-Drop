import { React, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../../css/ProfileCard.css";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { replace } from "formik";

const ProfileCard = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  //display username on profile pop-up
  const callHeaderIcon = async () => {
    try {
      const res = await fetch("/HeaderIcon", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      setUserData(data);

      if (res.status === 400 || res.status === 422 || !data) {
        return res.status(422).send("Data not recieved !!!");
      }
    } catch (error) {
      console.log("No data found ( Unauthorized ) !!!");
    }
  };

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 100);
  }
  useEffect(() => {
    callHeaderIcon();
  }, []);

  console.log(userData);

  return (
    <>
      <div className="header">
        <div className="ems_logo"></div>
        <div className="sections">
          <div className="profile">
            <AccountCircleIcon fontSize="large" />
            <div id="profile_card">
              <h5>{userData.user_name}</h5>
              <p>{userData.email}</p>
              <a href="/updatePassword">
                <Button
                  variant="primary"
                  size="sm"
                  style={{ marginLeft: "-0.5rem" }}
                >
                  Update password
                </Button>
              </a>
              <br />
              {/* <button className="logout" onClick={logout}>
                <LogoutIcon
                  fontSize="small"
                  style={{ marginLeft: "0rem", textAlign: "left" }}
                />
                Logout
              </button> */}

              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
