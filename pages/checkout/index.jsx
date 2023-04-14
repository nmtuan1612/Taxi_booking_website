import { useContext, useMemo, useRef } from "react";
import { BsFillGeoAltFill, BsFillGeoFill } from "react-icons/bs";
import { HiBadgeCheck } from "react-icons/hi";
import { BookingContext } from "../api/store";
import { sendMessage } from "../api/telegram";

const CheckoutPage = () => {
  const { booking } = useContext(BookingContext);
  const formRef = useRef();

  const data = useMemo(() => {
    if (booking?.pickup_location) {
      // console.log(true);
      return booking;
    } else if (typeof window !== "undefined") {
      const taxiData = JSON.parse(localStorage.getItem("taxi_booking"));
      // console.log(taxiData);
      return taxiData ? taxiData : booking;
    } else {
      return booking;
    }
  }, [booking]);

  const handleBookTaxi = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formProps = Object.fromEntries(formData);

    const bookingInfo = { ...booking, ...formProps };

    sendMessage(bookingInfo);
  };

  return (
    <div className="checkout__page section__padding">
      <div className="checkout__wrap">
        <div className="checkout__left">
          <h4 className="checkout__tittle">THÔNG TIN CHUYẾN ĐI</h4>
          <p className="location__info">
            <BsFillGeoFill />
            {data?.pickup_location}
          </p>
          <p className="location__info">
            <BsFillGeoAltFill />
            {data?.drop_location}
          </p>
          <p className="booking__text-info">
            <span className="text__info-title">Thời gian đi : </span>{" "}
            {data?.departure_date} {data?.departure_time}
          </p>
          {/* separator */}
          <div className="separator" />
          <p className="booking__text-info">
            <span className="text__info-title">Hình thức : </span>{" "}
            {`${data?.direction_option} chiều`}
          </p>
          <p className="booking__text-info">
            <span className="text__info-title">Loại xe : </span>{" "}
            {`Xe ${data?.car_option} chỗ`}
          </p>
          <div className="separator" />
          <div className="checkout__note">
            <HiBadgeCheck
              fontSize={16}
              style={{
                position: "relative",
                top: "2px",
              }}
            />{" "}
            Giá trên chưa bao gồm phí cao tốc
          </div>
        </div>

        {/* <div className="section__separator">Vui lòng nhập thông tin đặt chuyển</div> */}
        {/* <div className="section__separator">-----</div> */}

        {/* right */}
        <div className="checkout__right">
          <form ref={formRef} onSubmit={handleBookTaxi}>
            <div className="c__form-input">
              <label className="c__input-label" htmlFor="c_name">
                Họ và tên
              </label>
              <input
                type="text"
                className="c__input"
                name="fullName"
                id="c_name"
              />
            </div>
            <div className="c__form-input">
              <label className="c__input-label" htmlFor="c_phone">
                Số điện thoại
              </label>
              <input
                type="text"
                className="c__input"
                name="phonenumber"
                id="c_phone"
              />
            </div>
            <div className="c__form-input">
              <label className="c__input-label" htmlFor="c_note">
                Ghi chú
              </label>
              <textarea
                type="text"
                id="c_note"
                className="c__input"
                name="note"
                placeholder="VD: tài xế trẻ, lịch sự"
              />
            </div>

            <h5 className="c__payment">
              Hình thức thanh toán: <span>Tiền mặt</span>
            </h5>

            <div className="checkout__price">
              <span className="text__info-title">Tổng giá : </span>
              <span className="total__price">{data?.price}</span>
            </div>

            <div className="c__form-submit">
              <button type="submit" className="button__base c__submit-btn">
                XÁC NHẬN ĐẶT XE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
