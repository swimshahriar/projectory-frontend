import React from "react";
import Header from "../Header/Header";

const SiteLayout = ({ children }) => (
  <>
    <header>
      <Header />
    </header>
    <main style={{ marginTop: "80px" }}>{children}</main>
    <footer>Footer</footer>
  </>
);

export default SiteLayout;
