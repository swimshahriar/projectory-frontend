import React from "react";
// internal imports
import Footer from "../Footer";
import Header from "../header/Header";

const SiteLayout = ({ children }) => (
  <>
    <header>
      <Header />
    </header>
    <main style={{ marginTop: "80px" }}>{children}</main>
    <footer>
      <Footer />
    </footer>
  </>
);

export default SiteLayout;
