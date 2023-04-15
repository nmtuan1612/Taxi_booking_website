import React from "react";
import { getChatId, sendMessage } from "../../pages/api/telegram";
import { getPrices } from "../../pages/api/generateData";
import logoImg from "../../public/images/logo.png";
import Image from "next/image";
import { BsFillGeoAltFill, BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__top">
        <div className="company__info">
          <Image src={logoImg} alt="app-logo" priority />
          <div className="address">
            <div className="address__item">
              <BsFillGeoAltFill style={{ marginRight: 4 }} /> Địa chỉ: 45 đường
              Thân Nhân Vũ, phường Ngô Quyền, TP Bắc Giang
            </div>
            <div className="address__item">
              <BsFillTelephoneFill style={{ marginRight: 4 }} /> Điện thoại :
              086 955 5598
            </div>
            <div className="address__item">
              <AiOutlineMail
                style={{ marginRight: 4, position: "relative", top: 2 }}
              />{" "}
              Email: xecongnghego@gmail.com
            </div>
          </div>
        </div>

        <div className="services">
          <h3>Dịch vụ</h3>
          <div className="services__list">
            <Link href="/dat-xe-san-bay">
              <h4 className="flex__align-center" style={{ padding: "8px 0" }}>
                <FaLongArrowAltRight style={{ margin: "0 6px" }} /> Đặt xe sân
                bay
              </h4>
            </Link>
            <Link href="/dat-xe-ghep">
              <h4 className="flex__align-center" style={{ padding: "8px 0" }}>
                <FaLongArrowAltRight style={{ margin: "0 6px" }} /> Đặt xe ghép
                Bắc Ninh, Bắc Giang
              </h4>
            </Link>
            <Link href="/">
              <h4 className="flex__align-center" style={{ padding: "8px 0" }}>
                <FaLongArrowAltRight style={{ margin: "0 6px" }} /> Đặt xe đường
                dài
              </h4>
            </Link>
          </div>
        </div>
      </div>

      <p className="footer__quote">
        Chúng tôi cam kết dịch vụ Taxi Sân Bay, đi tỉnh đường dài với chính sách
        giá cam kết rẻ và chất lượng phục vụ tốt nhất.
      </p>
    </div>
  );
};

export default Footer;
