import React, { Fragment } from "react";
import Header from "./Header";
import RootRoutes from "../RootRoutes";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <RootRoutes />
      </div>
    </Fragment>
  );
}

export default Layout;
