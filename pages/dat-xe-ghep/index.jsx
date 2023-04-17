import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BiCar, BiChevronDown, BiX } from "react-icons/bi";
import {
  BsFillArrowRightCircleFill,
  BsFillGeoAltFill,
  BsFillGeoFill,
} from "react-icons/bs";
import { MdKeyboardDoubleArrowDown, MdOutlineSyncAlt } from "react-icons/md";
import CustomTimePicker from "../../components/Booking/CustomTimePicker";
import PlacesList from "../../components/SearchForm/PlacesList";
import { BookingContext } from "../api/store";
import style from "./Compose.module.scss";

const DatXeGhep = () => {
  const [originSearchBox, setOriginSearchBox] = useState(null);

  const [origin, setOrigin] = useState(null);
  const [reverseDirection, setReverseDirection] = useState(false);
  const [places, setPlaces] = useState([]);

  const { booking, setBooking } = useContext(BookingContext);

  const originInputRef = useRef();

  const router = useRouter();

  const scrollDown = () => {
    window.scroll({
      top: 400,
      behavior: "smooth",
    });
  };

  const onOriginPlacesChanged = (e) => {
    startTransition(async () => {
      const { predictions } = await getPlaces(e.target.value);
      setPlaces(predictions);
    });
  };

  const handleSelectSchedule = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formProps = Object.fromEntries(formData);
    const booking_type = "xeghep";
    let car_option = "ghép 1";
    let price = "200.000 đ";

    if (formProps.car_option === "2") {
      price = "350.000 đ";
      car_option = "ghép 2";
    } else if (formProps.car_option === "3") {
      price = "450.000 đ";
      car_option = "ghép 3";
    } else if (formProps.car_option === "all") {
      price = "500.000 đ";
      car_option = "bao hết";
    }

    if (formProps.departure_date !== "" && formProps.departure_time !== "") {
      const currentDate = new Date().getDate();
      const [year, month, day] = formProps.departure_date.split("-");
      const [hours, minutes] = formProps.departure_time.split(":");
      const departureDate = new Date(year, month, day, 0, 0, 0).getDate();
      const minutesDifference = parseInt(minutes) - new Date().getMinutes();
      const departure_date = `${day}/${month}/${year}`;

      if (departureDate > currentDate) {
        localStorage.setItem(
          "taxi_booking",
          JSON.stringify({
            ...booking,
            ...formProps,
            price,
            departure_date,
            car_option,
            booking_type,
          })
        );
        setBooking((prev) => ({
          ...prev,
          ...formProps,
          price,
          departure_date,
          car_option,
          booking_type,
        }));

        router.replace("/checkout", "xac-nhan-dat-xe");
      } else if (departureDate === currentDate) {
        if (
          parseInt(hours) > new Date().getHours() ||
          (parseInt(new Date().getHours()) === parseInt(hours) &&
            minutesDifference >= 15)
        ) {
          localStorage.setItem(
            "taxi_booking",
            JSON.stringify({
              ...booking,
              ...formProps,
              price,
              departure_date,
              car_option,
              booking_type,
            })
          );
          setBooking((prev) => ({
            ...prev,
            ...formProps,
            price,
            departure_date,
            car_option,
            booking_type,
          }));

          router.replace("/checkout", "xac-nhan-dat-xe");
        } else {
          window.alert(
            "Thời gian khởi hành phải lớn hơn thời gian hiện tại 15 phút"
          );
          return;
        }
      }
    } else {
      window.alert("Vui lòng điền đầy đủ thông tin");
    }
  };
  return (
    <div className={style.compose__page}>
      <div className="booking__form">
        {/* Child components, such as markers, info windows, etc. */}
        <div className="booking__form-wrap">
          <div className="booking__form-main section__padding flex__center">
            {/* Title */}
            <div className="booking__form-title p__opensans flex__center">
              <h1>
                Đặt xe ghép Hà Nội - Bắc Ninh, Bắc Giang đồng giá 200k/Khách
              </h1>
              <div
                style={{
                  width: 120,
                  height: 2,
                  background: "var(--color-white)",
                  margin: "10px 0",
                }}
              />
              <h5 className="flex__center">
                <AiOutlineCheck style={{ marginRight: 8 }} /> Giá trọn gói,
                không phát sinh
              </h5>
            </div>
            {/* Form  */}
            <div>
              <div className="booking__form-content flex__center">
                <div className="form__content-left">
                  <h2 className="p__opensans">Đặt xe ghép</h2>

                  <form id="booking_form" onSubmit={handleSelectSchedule}>
                    {reverseDirection ? (
                      <div
                        className="form__input-group flex__center"
                        style={{ flexDirection: "column" }}
                      >
                        <div
                          className="form__input-item full__with flex__center"
                          style={{
                            justifyContent: "flex-start",
                            gap: "8px",
                            position: "relative",
                          }}
                        >
                          <BsFillGeoAltFill fontSize={16} />
                          <select
                            defaultValue="4"
                            name="pickup_location"
                            className="option__input"
                          >
                            <option value="Thành phố Bắc Ninh">
                              Thành phố Bắc Ninh
                            </option>
                            <option value="Thành phố Bắc Giang">
                              Thành phố Bắc Giang
                            </option>
                          </select>
                          <BiChevronDown className="option__input-icon" />
                        </div>
                        <div className="form__input-item full__with flex__center">
                          <BsFillGeoFill />
                          <div className="booking__input">
                            <input
                              onChange={onOriginPlacesChanged}
                              type="text"
                              ref={originInputRef}
                              name="pickup_location"
                              placeholder="Nhập điểm đón"
                              id="origin_input"
                              className=""
                              autoComplete="off"
                            />
                            <PlacesList
                              ref={originInputRef}
                              data={places}
                              setLocation={setOrigin}
                              setPlaces={setPlaces}
                              id="origin_search_result"
                            />
                          </div>
                          <BiX
                            fontSize={18}
                            style={{ cursor: "pointer" }}
                            onClick={() => (originInputRef.current.value = "")}
                          />
                        </div>
                        <div
                          className="form__swap-btn flex__center"
                          style={{ zIndex: "1000" }}
                        >
                          <MdOutlineSyncAlt
                            onClick={() =>
                              setReverseDirection(!reverseDirection)
                            }
                            style={{
                              transform: "rotate(90deg)",
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="form__input-group flex__center"
                        style={{ flexDirection: "column" }}
                      >
                        <div className="form__input-item full__with flex__center">
                          <BsFillGeoFill />
                          <div className="booking__input">
                            <input
                              onChange={onOriginPlacesChanged}
                              type="text"
                              ref={originInputRef}
                              name="pickup_location"
                              placeholder="Nhập điểm đón"
                              id="origin_input"
                              className=""
                              autoComplete="off"
                            />
                            <PlacesList
                              ref={originInputRef}
                              data={places}
                              setLocation={setOrigin}
                              setPlaces={setPlaces}
                              id="origin_search_result"
                            />
                          </div>
                          <BiX
                            fontSize={18}
                            style={{ cursor: "pointer" }}
                            onClick={() => (originInputRef.current.value = "")}
                          />
                        </div>
                        <div
                          className="form__swap-btn flex__center"
                          style={{ zIndex: "1000" }}
                        >
                          <MdOutlineSyncAlt
                            onClick={() =>
                              setReverseDirection(!reverseDirection)
                            }
                            style={{
                              transform: "rotate(90deg)",
                            }}
                          />
                        </div>
                        <div
                          className="form__input-item full__with flex__center"
                          style={{
                            justifyContent: "flex-start",
                            gap: "8px",
                            position: "relative",
                          }}
                        >
                          <BsFillGeoAltFill fontSize={16} />
                          <select
                            defaultValue="4"
                            name="drop_location"
                            className="option__input"
                          >
                            <option value="Thành phố Bắc Ninh">
                              Thành phố Bắc Ninh
                            </option>
                            <option value="Thành phố Bắc Giang">
                              Thành phố Bắc Giang
                            </option>
                          </select>
                          <BiChevronDown className="option__input-icon" />
                        </div>
                      </div>
                    )}

                    <div
                      style={{
                        height: 2,
                        background: "var(--color-grey)",
                        marginBottom: "1rem",
                      }}
                    />

                    {/* Select car */}
                    <div className="form__input-group" style={{}}>
                      <label
                        htmlFor="compose-input"
                        style={{
                          fontSize: "12px",
                          fontFamily: "var(--font-alt)",
                          color: "var(--color-grey)",
                          marginBottom: "6px",
                        }}
                      >
                        Chọn loại ghép
                      </label>
                      <div
                        className="form__input-item flex__center"
                        style={{
                          flex: 1,
                          justifyContent: "flex-start",
                          gap: "8px",
                          position: "relative",
                        }}
                      >
                        <BiCar fontSize={16} />
                        <select
                          defaultValue="1"
                          name="car_option"
                          id="compose-input"
                          className="option__input"
                        >
                          <option value="1">1 người</option>
                          <option value="2">2 người</option>
                          <option value="3">3 người</option>
                          <option value="all">bao xe</option>
                        </select>
                        <BiChevronDown className="option__input-icon" />
                      </div>
                    </div>

                    <div className="form__input-group">
                      <CustomTimePicker />
                    </div>

                    <div className="flex__center">
                      <button
                        type="submit"
                        // onClick={handleSelectSchedule}
                        className="booking__form-submit button__base"
                      >
                        Đặt xe
                        <BsFillArrowRightCircleFill
                          fontSize={14}
                          style={{ marginLeft: 8 }}
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-down__arrow" onClick={scrollDown}>
            <MdKeyboardDoubleArrowDown />
          </div>
        </div>
        {/* </GoogleMap> */}
      </div>
    </div>
  );
};

export default DatXeGhep;
