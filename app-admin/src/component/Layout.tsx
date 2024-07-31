import React from "react";
import Header from "./Admin/Header";

import { Outlet } from "react-router-dom";

const Layout = () => {
  
  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <Header />
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
