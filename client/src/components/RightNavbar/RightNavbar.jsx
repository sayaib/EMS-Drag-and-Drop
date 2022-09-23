import { useState, useEffect } from "react";
import storage from "local-storage-fallback";
//STYLES
import styles from "./RightNavbar.module.scss";

//HOOKS
import { useContext } from "react";
import ChartCard from "../popup/ChartCard";
import $ from "jquery";

//CONTEXT
import NavContext from "../../Context/NavContext";

//Cards
import ProfileCard from "./ProfileCard";
import DeviceCard from "./DeviceCard";
import ColorPalate from "./ColorPalate";
//ICONS , IMAGES

import NotificationsIcon from "@mui/icons-material/Notifications";
import { motion } from "framer-motion";

import { MdOutlineMenu } from "react-icons/md";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { ThemeProvider, createGlobalStyle } from "styled-components";

//Components
import { useRef } from "react";
// import { useInView } from "framer-motion";
import { FaDove } from "react-icons/fa";
import styled, { ThemeProvider } from "styled-components";
import {
  lightTheme,
  darkTheme,
  GlobalStyles,
} from "../../components/theme/theme";

function Section({ children }) {
  const ref = useRef(null);
  // const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <span
      // style={{
      //   transform: isInView ? "none" : "translateX(-200px)",
      //   opacity: isInView ? 1 : 0,
      //   transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      // }}
      >
        {children}
      </span>
    </section>
  );
}

const RightNavbar = ({ component }) => {
  const { nav, setNav } = useContext(NavContext);

  // const darkMode = async (values) => {
  //   dark();
  //   // document.getElementById("chartName").style.color = "white";
  //   document.getElementById("profile_card").style.backgroundColor = "black";
  //   document.getElementById("nav_con").style.backgroundColor = "#222B45";
  //   document.getElementById("upperBar").style.backgroundColor = "#222B45";
  //   document.getElementById("logo_icons").style.color = "#fff";
  //   document.getElementById("actionsIc").style.backgroundColor = "#105b90c1";
  //   document.getElementById("actionsIc").style.color = "#fff";
  //   document.getElementById("dashboard").style.backgroundColor = "#191e35f0";
  //   document.getElementById("toggleOff").style.display = "none";
  //   document.getElementById("toggleOn").style.display = "block";
  //   document.getElementById("chartColor").style.backgroundColor = "#262B40";

  //   const res = await fetch("/darkMode", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       darkMode: "darkMode",
  //     }),
  //   });
  //   const data = res.json();
  //   console.log(data);

  //   // if (res.status === 400 || !data) {
  //   //   setInvalid("Invalid credentials !");

  //   //   document.getElementById("warnings").style.visibility = "visible";
  //   // } else if (res.status === 422) {
  //   //   setInvalid("You don't have access to this module !");
  //   //   document.getElementById("warnings").style.visibility = "visible";
  // };

  const UpperBar = styled.div`
    background: ${(props) => props.theme.background};
  `;
  const Notification = styled.div`
    background: ${(props) => props.theme.notificationBackground};
  `;

  return (
    <>
      <ChartCard />

      <UpperBar id="upperBar" className={styles.container}>
        {/* BURGER */}

        <div
          className={styles.burger_container}
          onClick={() => {
            setNav(!nav);
          }}
        >
          <MdOutlineMenu />
        </div>

        {/* ACTIONS */}
        <div>{component}</div>
        <div className={styles.actions}>
          <Notification
            // animate={{ scale: 1 }}
            // initial={{ scale: 0.9 }}
            // transition={{
            //   ease: "easeOut",
            //   duration: 0.3,
            // }}
            id="actionsIc"
            className={styles.actionsIcons}
          >
            {/* <ToggleOffIcon id="toggleOff" onClick={darkMode} />
            <ToggleOnIcon id="toggleOn" onClick={lightMode} /> */}
            {/* <PaletteIcon className={styles.paletteIcon} /> */}
            {/* <ColorPalate /> */}
            <NotificationsIcon />
            {/* <button onClick={() => themeToggler()}>Change Theme</button> */}
            {/* <DeviceCard /> */}
            <ProfileCard />
          </Notification>
        </div>
      </UpperBar>
    </>
  );
};

export default RightNavbar;
