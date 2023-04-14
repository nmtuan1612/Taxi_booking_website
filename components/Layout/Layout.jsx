import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ButtonContact from "../ButtonContact/ButtonContact";
import AboutUs from "../AboutUs/AboutUs";
import Featured from "../../pages/dat-xe-ghep/Featured";

const Layout = ({ children }) => {
  return (
    <div className="page__layout">
      <Navbar />
      <main>
        {children}
        <AboutUs />
        <Featured />
        <ButtonContact />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
