import React from "react";
// internal imports
import Header from "../header/Header";

const SiteLayout = ({ children }) => (
  <>
    <header>
      <Header />
    </header>
    <main style={{ marginTop: "80px" }}>{children}</main>
  </>
);

export default SiteLayout;
