import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import RightNavbar from "./components/RightNavbar/RightNavbar";


import Charts from "./pages/ChartComponent/Charts";
import Meter from './pages/Meters/Meters'
import ProfileSection from "./pages/Profile/ProfileSection";
import DemoProfile from "./pages/Profile/DemoProfile";
import DeviceManagement from "./pages/DeviceManagement";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend'
import $ from "jquery";
import NavContext from "./Context/NavContext";
import Dropdown from 'react-bootstrap/Dropdown';
import Brightness4Icon from '@mui/icons-material/Brightness4';
//Theme
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./components/theme/theme";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, useNavigate } from "react-router-dom";

//Pages

import DashboardOne from "./pages/DashboardOne"
import DashboardTwo from "./pages/DashboardTwo";
import DashboardThree from './pages/DashboardThree'
import UserManagement from "./pages/UserManagement";
import LogManagement from "./pages/LogManagement";
import Status from "./pages/Status";


const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const changeTheme = styled.div`
background: ${(props) => props.theme.background};
`

function App() {

  const [nav, setNav] = useState(false);

  const [theme, setTheme] = useState("light");



  const [userData, setUserData] = useState({});
  // const value = { nav, setNav };

  const navigate = useNavigate();




  const callMainPage = async () => {
    try {
      const res = await fetch("/mainpage", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
    } catch (error) {
      console.log("No data found ( Unauthorized ) !!!");
      navigate("/");
    }
  };


  const isCurrentUser = async () => {
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
      console.log(data)
      // console.log(data.emp_group);
      setUserData(data);

      if (res.status === 400 || res.status === 422 || !data) {
        return res.status(422).send("Data not recieved !!!");
      }
    } catch (error) {
      console.log("No data found ( Unauthorized ) !!!");
    }
  };
  // if (userData.moduleType === "M2") {
  //   console.log("_________M2________")
  // } else {
  //   console.log("_________M1________")

  // }
  // console.log(userData.moduleType)



  const darkToggler = () => {
    // theme === "light" ? setTheme("dark") : setTheme("light");
    theme === "light" ? setTheme("dark") : null
  }


  const lightToggler = () => {
    theme === "dark" ? setTheme("light") : null
  }

  const value = { nav, setNav };

  useEffect(() => {

    callMainPage();
    isCurrentUser();
  }, [])

  const options = {
    enableMouseEvents: true
  }
  const isTouchScreen = window.innerWidth < 1024;


  console.log(userData)
  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>




          <DndProvider backend={isTouchScreen ? TouchBackend : HTML5Backend}>
            <div className="App">



              <NavContext.Provider value={value}>

                <Navbar />

                <Container

                  stickyNav={<RightNavbar component={
                    window.innerWidth > 1024 ?
                      <changeTheme >
                        {/* <p onClick={() => themeToggler()}><Brightness4Icon /> Change Theme</p> */}
                        <Dropdown >
                          <Dropdown.Toggle size="sm"
                            // style={{ padding: "0 " }}
                            variant="secondary" id="dropdown-basic">
                            Choose Theme
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={darkToggler}>Dark</Dropdown.Item>
                            <Dropdown.Item onClick={lightToggler}>Light</Dropdown.Item>

                          </Dropdown.Menu>
                        </Dropdown>
                      </changeTheme>
                      :
                      <changeTheme style={{ cursor: "pointer", position: "absolute", left: "60px", top: "17px", zIndex: "11" }}>
                        {/* <p onClick={() => themeToggler()}><Brightness4Icon /> Change Theme</p> */}
                        <Dropdown>
                          <Dropdown.Toggle size="sm"
                            variant="secondary" id="dropdown-basic">
                            Choose
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={darkToggler}>Dark</Dropdown.Item>
                            <Dropdown.Item onClick={lightToggler}>Light</Dropdown.Item>

                          </Dropdown.Menu>
                        </Dropdown>
                      </changeTheme>
                  } />}
                  content={
                    <Routes>
                      <Route path="/" element={<DashboardOne />} />
                      <Route path="/dashboardTwo" element={<DashboardTwo />} />
                      <Route path="/dashboardThree" element={<DashboardThree />} />
                      <Route path="/deviceManagement" element={<DeviceManagement />} />
                      <Route path="/userManagement" element={<UserManagement />} />
                      <Route path="/charts" element={<Charts />} />
                      <Route path="/status" element={<Status />} />


                      <Route path="/meter" element={<Meter />} />
                      <Route path="/profile" element={<ProfileSection />} />
                      <Route path="/logManagement" element={<LogManagement />} />
                      <Route path="/dp" element={<DemoProfile />} />




                    </Routes>
                  }
                />
              </NavContext.Provider>

            </div>
          </DndProvider>
        </StyledApp>
      </ThemeProvider>
    </>

  );
}

export default App;
