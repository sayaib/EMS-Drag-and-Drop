import { React, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../../css/ProfileCard.css";

import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { replace } from "formik";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";

// Theme
import styled from "styled-components";
import {
  lightTheme,
  darkTheme,
  GlobalStyles,
} from "../../components/theme/theme";

const deviceCard = styled.div`
  background: ${(props) => props.theme.notificationBackground};
`;

const DeviceCard = () => {
  return (
    <>
      <div className="header">
        <div className="ems_logo"></div>
        <div className="sections">
          <div className="profile">
            <GasMeterIcon fontSize="large" />
            <div id="device_card">
              <div className="meters">
                <p>
                  <ElectricMeterIcon />
                </p>
                <p>Meter 1</p>
              </div>
              <div className="meters">
                <p>
                  <ElectricMeterIcon />
                </p>
                <p>Meter 2</p>
              </div>
              <div className="meters">
                <p>
                  <ElectricMeterIcon />
                </p>
                <p>Meter 3</p>
              </div>
              <div className="meters">
                <p>
                  <ElectricMeterIcon />
                </p>
                <p>Meter 4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceCard;
