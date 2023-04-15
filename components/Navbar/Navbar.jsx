import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import logoImg from "../../public/images/logo.png";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useRouter();

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
              <h4>Đặt xe ghép Bắc Ninh, Bắc Giang</h4>
            </Link>
          </li>
          <li className="p__opensans">
            <Link href="/" onClick={() => setToggleMenu(false)}>
              <h4>Đặt xe đường dài</h4>
            </Link>
          </li>
        </ul>
        <div className="app__navbar-hotline p__opensans">
          <Link href="tel:0869555598" className="button__base">
            <AiOutlinePhone fontSize={24} className="hotline__icon" />
            HOTLINE: 0869 5555 98
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
                  <h4>Đặt xe ghép Bắc Ninh, Bắc Giang</h4>
                </Link>
              </li>
              <li className="p__opensans">
                <Link href="/" onClick={() => setToggleMenu(false)}>
                  <h4>Đặt xe đường dài</h4>
                </Link>
              </li>
            </ul>
            <div className="app__navbar-hotline">
              <a href="tel:0869555598" className="button__base">
                <AiOutlinePhone fontSize={24} className="hotline__icon" />
                HOTLINE: 0869 5555 98
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
