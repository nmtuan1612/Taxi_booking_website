import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ButtonContact from "../ButtonContact/ButtonContact";
import AboutUs from "../AboutUs/AboutUs";
import Featured from "../../pages/dat-xe-ghep-bac-giang-bac-ninh-ha-noi/Featured";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <div className="page__layout">
      <Navbar />
      <main>
        {children}
        {pathname.includes("dat-xe-thanh-cong") ||
        pathname.includes("xac-nhan-dat-xe") ? (
          ""
        ) : (
          <>
            <AboutUs />
            <Featured />
          </>
        )}
        <ButtonContact />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
