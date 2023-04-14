import Image from "next/image";
import Link from "next/link";
import { BiCar } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { HiBadgeCheck, HiUser } from "react-icons/hi";
import { MdOutlineLuggage } from "react-icons/md";
import styles from "./TaxiCard.module.scss";
import { useContext } from "react";
import { BookingContext } from "../../pages/api/store";
import { useRouter } from "next/router";

const TaxiCard = ({ data }) => {
  const { setBooking } = useContext(BookingContext);
  const router = useRouter();
  const handleSelectCar = (price, car_option) => {
    setBooking((prev) => ({
      ...prev,
      car_option,
      price,
    }));
    router.replace("/checkout", "xac-nhan-dat-xe");
  };

  return (
    <div className={styles.taxi__card}>
      <div className={styles["taxi__card-desktop"]}>
        <div className={styles.card__img}>
          <Image src={data?.image} alt="xe4cho" />

          <h5 className={styles["card__img-name"]}>
            {data?.name?.replace("Taxi ", "")}{" "}
            <span style={{ color: "var(--color-orange)" }}>VIP</span>
          </h5>
        </div>
        <div className={styles.card__info}>
          <div className={styles["card__info-header"]}>
            <div className={`${styles["info__header-left"]} p__opensans`}>
              <h4 className={styles["header__left-title"]}>{data?.name}</h4>
              <div className={styles["header__left-rate"]}>
                <BsStarFill fontSize={12} style={{ marginRight: "2px" }} />
                <BsStarFill fontSize={12} style={{ marginRight: "2px" }} />
                <BsStarFill fontSize={12} style={{ marginRight: "2px" }} />
                <BsStarFill fontSize={12} style={{ marginRight: "2px" }} />
                <BsStarHalf fontSize={12} style={{ marginRight: "2px" }} />
              </div>
            </div>
            <div className={`${styles["info__header-right"]} p__opensans`}>
              <h4 className={styles["header__price-old"]}>{data?.oldPrice}</h4>
              <h4 className={styles["header__price-new"]}>{data?.newPrice}</h4>
            </div>
          </div>
          {/* bottom desktop */}
          <div className={styles["card__info-bottom-desktop"]}>
            <div className={`${styles["info__bottom-left"]} p__opensans`}>
              <h5 className="">
                <BiCar
                  fontSize={16}
                  style={{
                    position: "relative",
                    top: "2px",
                    marginRight: "4px",
                  }}
                />{" "}
                {data?.description}
              </h5>
              <div className={`${styles.detail__client} flex__align-center`}>
                <h4
                  className={`${styles["detail__client-text"]} flex__align-center`}
                >
                  <HiUser
                    fontSize={18}
                    style={{
                      color: "var(--color-green)",
                      position: "relative",
                      bottom: "1px",
                      marginRight: "4px",
                    }}
                  />{" "}
                  {data?.people} Khách
                </h4>
                <h4
                  className={`${styles["detail__client-text"]} flex__align-center`}
                >
                  <MdOutlineLuggage
                    fontSize={18}
                    style={{
                      color: "var(--color-green)",
                      position: "relative",
                      bottom: "1px",
                      marginRight: "4px",
                    }}
                  />{" "}
                  {data?.vali} Vali
                </h4>
              </div>
              <h6 className={styles.detail__note}>
                <HiBadgeCheck
                  fontSize={12}
                  style={{
                    color: "var(--color-green)",
                    position: "relative",
                    top: "2px",
                  }}
                />{" "}
                Giá trên chưa bao gồm phí cao tốc
              </h6>
            </div>
            <div className={styles["info__bottom-right"]}>
              <button
                className="button__base"
                onClick={() => handleSelectCar(data?.newPrice, data?.people)}
              >
                Đặt xe ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* bottom mobile */}
      <div className={styles["card__info-bottom-mobile"]}>
        <div className={`${styles["info__bottom-left"]} p__opensans`}>
          <h5 className="">
            <BiCar
              fontSize={16}
              style={{ position: "relative", top: "2px", marginRight: "4px" }}
            />{" "}
            {data?.description}
          </h5>
          <div className={`${styles.detail__client} flex__align-center`}>
            <h4
              className={`${styles["detail__client-text"]} flex__align-center`}
            >
              <HiUser
                fontSize={18}
                style={{
                  color: "var(--color-green)",
                  position: "relative",
                  bottom: "1px",
                  marginRight: "4px",
                }}
              />{" "}
              {data?.people} Khách
            </h4>
            <h4
              className={`${styles["detail__client-text"]} flex__align-center`}
            >
              <MdOutlineLuggage
                fontSize={18}
                style={{
                  color: "var(--color-green)",
                  position: "relative",
                  bottom: "1px",
                  marginRight: "4px",
                }}
              />{" "}
              {data?.vali} Vali
            </h4>
          </div>
          <h6 className={styles.detail__note}>
            <HiBadgeCheck
              fontSize={12}
              style={{
                color: "var(--color-green)",
                position: "relative",
                top: "2px",
              }}
            />{" "}
            Giá trên chưa bao gồm phí cao tốc
          </h6>
        </div>
        <div className={styles["info__bottom-mobile-btn"]}>
          <button
            className="button__base"
            onClick={() => handleSelectCar(data?.newPrice, data?.people)}
          >
            Đặt xe ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxiCard;
