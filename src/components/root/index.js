import React from "react";
import Header from "../header/header";
import SideNav from "../sideNav/sideNav";
import { Outlet } from "react-router-dom";
import './index.css';

const Root = () => {
    return (
        <>
            <Header/>
                <main className="main">
                    <Outlet/>
                </main>
            <SideNav /> 
        </>
    )
}

export default Root;