import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import logoImg from "../../public/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { BookingContext } from "../../pages/api/store";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useRouter();
  const { booking, setBooking } = useContext(BookingContext);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-big-screen">
        <div className="app__navbar-logo">
          <Image
            src={logoImg}
            alt="app-logo"
            priority
            onClick={() => router.replace("/")}
          />
        </div>
        <ul className="app__navbar-links">
          {/* <li className="p__opensans">
            <h4 onClick={() => setBooking(prev => ({...prev}))}>Trang chủ</h4>
          </li> */}
          <li className="p__opensans">
            <Link href="/dat-xe-san-bay" onClick={() => setToggleMenu(false)}>
              <h4>Đặt xe sân bay</h4>
            </Link>
          </li>
          <li className="p__opensans">
            <Link href="/dat-xe-ghep" onClick={() => setToggleMenu(false)}>
              <h4>Đặt xe ghép</h4>
            </Link>
          </li>
          <li className="p__opensans">
            <Link href="/" onClick={() => setToggleMenu(false)}>
              <h4>Đặt xe đường dài</h4>
            </Link>
          </li>
        </ul>
        <div className="app__navbar-hotline p__opensans">
          <Link href="tel:086 955 5598" className="button__base">
            <AiOutlinePhone fontSize={24} className="hotline__icon" />
            HOTLINE: 086 955 5598
          </Link>
        </div>
      </div>
      <div className="app__navbar-smallscreen">
        <div className="app__navbar-logo">
          <Image
            src={logoImg}
            alt="app-logo"
            priority
            onClick={() => router.replace("/")}
          />
        </div>
        <GiHamburgerMenu
          color="#258be1"
          cursor="pointer"
          fontSize={27}
          onClick={() => setToggleMenu(!toggleMenu)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            {/* <AiOutlineClose
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            /> */}
            <ul className="app__navbar-smallscreen_links">
              {/* <li className="">
                <Link href="/">Trang chủ</Link>
              </li> */}
              <li className="p__opensans">
                <Link
                  href="/dat-xe-san-bay"
                  onClick={() => setToggleMenu(false)}
                >
                  <h4>Đặt xe sân bay</h4>
                </Link>
              </li>
              <li className="p__opensans">
                <Link href="/dat-xe-ghep" onClick={() => setToggleMenu(false)}>
                  <h4>Đặt xe ghép</h4>
                </Link>
              </li>
              <li className="p__opensans">
                <Link href="/" onClick={() => setToggleMenu(false)}>
                  <h4>Đặt xe đường dài</h4>
                </Link>
              </li>
            </ul>
            <div className="app__navbar-hotline">
              <a href="tel:086 955 5598" className="button__base">
                <AiOutlinePhone fontSize={24} className="hotline__icon" />
                HOTLINE: 086 955 5598
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
