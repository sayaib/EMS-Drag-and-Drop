import {
  useState,
  useEffect,
  useContext,
  NavLink,
  motion,
  ElectricMeterIcon,
  MdOutlineLogout,
  FaTimes,
  AccountCircleIcon,
  PieChartIcon,
  PhonelinkSetupIcon,
  DashboardIcon,
  styled,
  useNavigate,
} from "../../modules/ImportModules";
import styles from "./Navbar.module.scss";
import NavContext from "../../Context/NavContext";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Component } from "react/cjs/react.development";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import EvStationIcon from "@mui/icons-material/EvStation";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import LogoutIcon from "@mui/icons-material/Logout";
import userImg from "../../pics/user.png";

const NavUrl = ({ url, icon, description }) => {
  const { nav, setNav } = useContext(NavContext);
  const checkWindowSize = () => {
    if (window.innerWidth < 1024) setNav(!nav);
  };

  var row;

  function start() {
    row = event.target;
  }
  function dragover() {
    var e = event;
    e.preventDefault();

    let children = Array.from(e.target.parentNode.parentNode.children);

    if (children.indexOf(e.target.parentNode) > children.indexOf(row))
      e.target.parentNode.after(row);
    else e.target.parentNode.before(row);
  }

  // API

  return (
    <motion.li
      // animate={{ scale: 1 }}
      // initial={{ scale: 0.5 }}
      // transition={{
      //   ease: "easeIn",
      //   duration: 1,
      // }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className={styles.li_navlink}
    >
      <NavLink
        // draggable="true"
        // onDragStart={start}
        // onDragOver={dragover}
        to={`${url}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        onClick={() => checkWindowSize()}
      >
        {icon}
        <span className={styles.description}>{description}</span>
      </NavLink>
    </motion.li>
  );
};

const Navbar = ({ component }) => {
  const { nav, setNav } = useContext(NavContext);
  const [theme, setTheme] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  console.log(component);

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
        return res.status(422).send("Data not received !!!");
      }
    } catch (error) {
      console.log("No data found ( Unauthorized ) !!!");
    }
  };

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  }

  // Clear all the tokens
  const clearTokens = async () => {
    try {
      const res = await fetch("/clearTokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
        }),
      });
      const data = await res.json();

      if (res.status === 400 || res.status === 422 || !data) {
        console.log("Invalid");
      } else {
        console.log("Data post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //logout all the users
  const logout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 400 || res.status === 422) {
        return res.status(422).send("Data not recieved !!!");
      }
      // console.log("cheking end point !!!");
      clearTokens();
      navigate("/", { replace: true });
      refreshPage();
    } catch (error) {
      console.log("No data found ( Unauthorized ) !!!");
    }
  };

  const toggler = () => {
    const dropdownContent = document.getElementById("dropdown-menu");

    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      // setTheme(<ArrowDropDownIcon />);
    } else {
      dropdownContent.style.display = "block";
      // setTheme(<ArrowDropUpIcon />);
      // setTheme(<ArrowDropDownIcon />);
    }
  };

  useEffect(() => {
    callHeaderIcon();
  }, []);

  const NavbarStyle = styled.div`
    background: ${(props) => props.theme.background};
  `;
  return (
    <NavbarStyle
      // id="nav_con"
      className={`${styles.navbar_container} ${
        nav ? styles.navbar_mobile_active : undefined
      }`}
    >
      <nav
        className={
          // nav ? undefined : styles.nav_small

          //if window size < 1024px than user (nav? undefined : styles.nav_small) else (nav? styles.nav_small: undefined)
          window.innerWidth < 1024
            ? nav
              ? undefined
              : styles.nav_small
            : nav
            ? styles.nav_small
            : undefined
        }
      >
        {/* LOGO */}
        <div className={styles.logo}>
          <h6 id="logo_icons" className={styles.logo_icon}>
            EMS
          </h6>
          <div>{component}</div>
          {/* <VscDashboard className={styles.logo_icon} /> */}
          <FaTimes
            className={styles.mobile_cancel_icon}
            onClick={() => {
              setNav(!nav);
            }}
          />
        </div>

        {/* MENU */}
        <ul className={styles.menu_container}>
          <a
            className={styles.dropdownBtn}
            onClick={toggler}
            // onClick={setTheme(!theme)}
            // icon={theme}
          >
            <DashboardIcon className={styles.dashboardIcon} />
            <span className={styles.spanTitle}>Dashboard</span>
            <ArrowDropDownIcon className={styles.arrow} />
          </a>
          <div id="dropdown-menu" className={styles.dropdownContainer}>
            <NavUrl
              url="/"
              icon={<ElectricMeterIcon style={{ color: "#54bab880" }} />}
              description="Parameter wise"
            />

            <NavUrl
              url="dashboardTwo"
              icon={<EvStationIcon style={{ color: "#54bab880" }} />}
              description="Current & Voltage"
            />
            <NavUrl
              url="dashboardThree"
              icon={<BatteryChargingFullIcon style={{ color: "#54bab880" }} />}
              description="Total P & E"
            />
          </div>
          <NavUrl
            url="charts"
            icon={<PieChartIcon style={{ color: "#f8747484" }} />}
            description="Charts"
          />
          <NavUrl
            url="status"
            icon={<ModelTrainingIcon style={{ color: "#1b651370" }} />}
            description="Status"
          />
          {/* <NavUrl
            url="meter"
            icon={<ElectricMeterIcon style={{ color: "#fc92077b" }} />}
            description="Meters"
          /> */}
          <NavUrl
            url="userManagement"
            icon={<ManageAccountsIcon style={{ color: "#f7c5217a" }} />}
            description="User Management"
          />
          {/* <NavUrl
            url="deviceManagement"
            icon={<PhonelinkSetupIcon style={{ color: "#f77e217b" }} />}
            description="Device Management"
          /> */}
          <NavUrl
            url="logManagement"
            icon={<ReceiptLongIcon style={{ color: "#f7c5217a" }} />}
            description="Log Management"
          />
          <NavUrl
            url="profile"
            icon={<AccountCircleIcon style={{ color: "#1d5c637d" }} />}
            description="Profile"
          />
        </ul>

        <div className={styles.btn_logout}>
          <div class="navigation">
            <a class="button">
              {/* <img className="profileImages" src={userImg} /> */}
              <LogoutIcon className="profileImages" />

              <div onClick={logout} class="logout">
                LOGOUT
              </div>
            </a>
          </div>
          <div
            onClick={() => {
              setNav(!nav);
            }}
            style={{ marginTop: "0.5rem" }}
          >
            {/* <MdOutlineLogout /> */}
          </div>
        </div>
      </nav>

      <div
        className={nav ? styles.mobile_nav_background_active : undefined}
        onClick={() => {
          setNav(!nav);
        }}
      ></div>
    </NavbarStyle>
  );
};

export default Navbar;
