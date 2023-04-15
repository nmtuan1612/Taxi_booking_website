import Image from "next/image";
import React from "react";
import zaloImg from "../../public/images/zalo_img.png";
import callImg from "../../public/images/phone_img.png";

const ButtonContact = () => {
  return (
    <div className="list__button-contact">
      <div className="button__contact">
        <div className="icon__vr">
          <div
            className="circle__filled"
            style={{
              boxShadow: "0 0 0 0 var(--color-primary)",
              backgroundColor: "#258be1",
            }}
          >
            <div
              className="image__circle"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <a target="_blank" href="https://zalo.me/0869555598">
                <Image src={zaloImg} alt="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="button__contact">
        <div className="icon__vr">
          <div className="circle__filled">
            <div className="image__circle">
              <a href="tel:0869555598">
                <Image src={callImg} alt="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonContact;
