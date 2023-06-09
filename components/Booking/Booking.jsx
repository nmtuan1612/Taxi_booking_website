import { AiOutlineCheck } from "react-icons/ai";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import SearchForm from "../SearchForm/SearchForm";
import ListTaxiCard from "../TaxiCard/ListTaxiCard";

const Booking = ({ title, noQuote }) => {
  const scrollDown = () => {
    window.scroll({
      top: 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="home__booking">
      <div className="booking__form">
        {/* Child components, such as markers, info windows, etc. */}
        <div className="booking__form-wrap">
          <div className="booking__form-main section__padding flex__center">
            {/* Title */}
            <div className="booking__form-title p__opensans flex__center">
              <h1>{title ? title : "Nền tảng đặt xe trực tuyến uy tín"}</h1>
              <div
                style={{
                  width: 120,
                  height: 2,
                  background: "var(--color-white)",
                  margin: "16px 0",
                }}
              />
              {!noQuote ? (
                <>
                  <h5 className="flex__center">
                    <AiOutlineCheck style={{ marginRight: 8 }} /> An toàn, Đúng
                    hẹn
                  </h5>
                </>
              ) : (
                ""
              )}
              <h5 className="flex__center">
                <AiOutlineCheck style={{ marginRight: 8 }} /> Sang trọng, lịch
                sự
              </h5>
            </div>
            {/* <BookingForm scrollDown={scrollDown} /> */}
            <SearchForm scrollDown={scrollDown} />
          </div>
          <div className="scroll-down__arrow" onClick={scrollDown}>
            <MdKeyboardDoubleArrowDown />
          </div>
        </div>
        {/* </GoogleMap> */}
      </div>
      <ListTaxiCard />
    </div>
  );
};

export default Booking;
