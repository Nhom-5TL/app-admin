import React from "react";
import Header from "./Admin/Header";
import Footer from "./Admin/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <Header />
        </div>
        <div className="col-lg-9">
          <Outlet />
          <Footer />
        </div>
      </div>

    
    </>
  );
};

export default Layout;
