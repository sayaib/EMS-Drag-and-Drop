import { React, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../../css/ProfileCard.css";

import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { replace } from "formik";
import PaletteIcon from "@mui/icons-material/Palette";

const colorPalateOne = () => {
  document.getElementById("main_div").style.backgroundColor = "#f8c8c8";
  document.getElementById("nav_con").style.background =
    "linear-gradient(to right, #c04848, #480048)";
  document.getElementById("upperBar").style.background =
    "linear-gradient(to left, #c04848, #480048)";
  document.getElementById("dashboard").style.background =
    "linear-gradient(to left, #c04848, #480048)";

  console.log("hello");
};

const ColorPalate = () => {
  return (
    <>
      <div className="header">
        <div className="ems_logo"></div>
        <div className="sections">
          <div className="profile">
            <PaletteIcon fontSize="large" />
            <div id="profile_card">
              <div className="meters">
                <p onClick={colorPalateOne}>Color 1</p>
              </div>
              <div className="meters">
                <p>Color 2</p>
              </div>
              <div className="meters">
                <p>Color 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorPalate;
