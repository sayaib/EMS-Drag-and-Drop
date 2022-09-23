import './App.css';
import React, { useEffect, useState } from 'react'
import HashLoader from "react-spinners/HashLoader";

import { Routes, Route, Link } from "react-router-dom";
// import UpdatePassword from './pages/Login/UpdatePassword';
import AppPage from "./App"
import LoginPage from './pages/Login/LoginPage';
function Router() {
    const [isLoading, setIsLoading] = useState(false)

    const [auth, setauth] = useState()
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
            setauth(data)
        } catch (error) {
            console.log("No data found ( Unauthorized ) !!!");
            // navigate("/login");
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
            // console.log(data.emp_group);
            console.log(data)
            setauth(data);

            if (res.status === 400 || res.status === 422 || !data) {
                return res.status(422).send("Data not recieved !!!");
            }
        } catch (error) {
            console.log("No data found ( Unauthorized ) !!!");
        }
    };

    useEffect(() => {
        isCurrentUser();
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])



    console.log(auth)
    return (
        <>
            {/* <MainPage /> */}


            {isLoading ? <div className="animationScreen">
                <HashLoader color="#FF7700" loading={isLoading} size={100} /></div> :
                <Routes>


                    <Route path="/*" element={auth === undefined ? <LoginPage /> : <AppPage />} />
                    {/* <Route path="/updatePassword" element={< UpdatePassword />} /> */}
                    {/* <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<AppPage />} /> */}
                </Routes>

            }
        </>
    );
}

export default Router;
