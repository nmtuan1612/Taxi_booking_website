import React, { useState, useRef, useContext, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import Image from "next/image";
import { MdOutlineSyncAlt } from "react-icons/md";
import {
  BsFillGeoAltFill,
  BsFillGeoFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { BiDirections, BiCar, BiX, BiChevronDown } from "react-icons/bi";
import CustomTimePicker from "./CustomTimePicker";
import bannerImg from "../../public/images/banner-img.png";
import { useRouter } from "next/router";
import { BookingContext } from "../../pages/api/store";
import { getPrices } from "../../pages/api/generateData";
import { NoiBaiInfo } from "../../pages/api/constant";

// const key = "AIzaSyB4pAPBWaiRtjgAdi8qcboCqjI5hIjS-dQ";
// const key = "AIzaSyC1AI_RVmR6014jXaOtGJbQalCHHaj7m_o";
// const key = "AIzaSyCno8JIwvREk5pLjPSNAUJghYngxs18xec";
const key = "AIzaSyAsS1cQogLlfLT9iGPwPmzd5HZ06ft0WUA";
const libraries = ["places"];
const containerStyle = {};

const center = {
  lat: 0,
  lng: 0,
};

function MyComponent({ scrollDown }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
    libraries: libraries,
  });

  const [originSearchBox, setOriginSearchBox] = useState(null);
  const [destinationSearchBox, setDestinationSearchBox] = useState(null);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState({ text: "", value: 0 });
  const [timePicker, setTimePicker] = useState({ date: "", time: "" });
  const [bookType, setBookType] = useState("xeduongdai");

  const { setBooking, setPriceData } = useContext(BookingContext);

  const originInputRef = useRef();
  const destinationInputRef = useRef();

  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("dat-xe-san-bay")) {
      setBookType("xedisanbay");
      setDestination(NoiBaiInfo);
    }
  }, [router, destinationInputRef]);

  const onOriginSearchBoxLoad = (ref) => {
    setOriginSearchBox(ref);
  };

  const onDestinationSearchBoxLoad = (ref) => {
    setDestinationSearchBox(ref);
  };

  const onUnmount = React.useCallback(function callback(map) {
    // setMap(null);
  }, []);

  const onOriginPlacesChanged = () => {
    const place = originSearchBox.getPlaces()[0];
    computeDistance(place, destination);
    setOrigin(place);
  };

  const onDestinationPlacesChanged = () => {
    const place = destinationSearchBox.getPlaces()[0];
    computeDistance(origin, place);
    setDestination(place);
  };
  console.log(bookType);

  const handleSwapSchedule = () => {
    const tempText = originInputRef.current.value || "";
    originInputRef.current.value = destinationInputRef.current.value || "";
    destinationInputRef.current.value = tempText;
    setBookType((prev) =>
      prev === "xedisanbay" ? "xesanbayve" : "xedisanbay"
    );

    const tempLocation = origin;
    setOrigin(destination);
    setDestination(tempLocation);
  };

  const computeDistance = (origin, destination) => {
    if (origin && destination) {
      const originLatLng = new window.google.maps.LatLng(
        origin.geometry.location.lat(),
        origin.geometry.location.lng()
      );
      const destinationLatLng = new window.google.maps.LatLng(
        destination.geometry.location.lat(),
        destination.geometry.location.lng()
      );
      const distanceService = new window.google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix(
        {
          origins: [originLatLng],
          destinations: [destinationLatLng],
          travelMode: "DRIVING",
        },
        (response, status) => {
          if (status === "OK") {
            let { text, value } = response.rows[0].elements[0].distance;
            setDistance({ text, value });
          } else {
            console.log("Error:", status);
          }
        }
      );
    }
  };

  const handleSelectSchedule = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formProps = Object.fromEntries(formData);
    // console.log(formProps);

    if (formProps.departure_date !== "" && formProps.departure_time !== "") {
      // console.log(true);
      const currentDate = new Date().getDate();
      const [day, month, year] = formProps.departure_date.split("/");
      const [hours, minutes] = formProps.departure_time.split(":");
      const departureDate = new Date(year, month, day, 0, 0, 0).getDate();
      const minutesDifference = parseInt(minutes) - new Date().getMinutes();

      if (departureDate > currentDate) {
        localStorage.setItem(
          "taxi_booking",
          JSON.stringify({
            ...formProps,
            distance: distance,
            booking_type: bookType,
          })
        );
        setBooking({
          ...formProps,
          distance: distance,
          booking_type: bookType,
        });
        const prices = getPrices({
          ...formProps,
          distance: distance,
          booking_type: bookType,
        });
        setPriceData(prices);
        scrollDown();
      } else if (departureDate === currentDate) {
        if (
          parseInt(hours) > new Date().getHours() ||
          (parseInt(new Date().getHours()) === parseInt(hours) &&
            minutesDifference >= 15)
        ) {
          localStorage.setItem(
            "taxi_booking",
            JSON.stringify({
              ...formProps,
              distance: distance,
              booking_type: bookType,
            })
          );
          setBooking({
            ...formProps,
            distance: distance,
            booking_type: bookType,
          });
          const prices = getPrices({
            ...formProps,
            distance: distance,
            booking_type: bookType,
          });
          setPriceData(prices);
          scrollDown();
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
    console.log({
      ...formProps,
      distance: distance,
      booking_type: bookType,
    });
    // sendMessage({...formProps, distance: distance});
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      // options={options}
      onUnmount={onUnmount}
      className="map__container"
    >
      {/* Form */}
      <div className="booking__form-content flex__center">
        <div className="form__content-left">
          <h2 className="p__opensans">Đặt xe trực tuyến</h2>

          <form id="booking_form" onSubmit={handleSelectSchedule}>
            <div
              className="form__input-group flex__center"
              style={{ flexDirection: "column" }}
            >
              <div className="form__input-item full__with flex__center">
                <BsFillGeoFill />
                <div className="booking__input">
                  <StandaloneSearchBox
                    onLoad={onOriginSearchBoxLoad}
                    onPlacesChanged={onOriginPlacesChanged}
                  >
                    <input
                      type="text"
                      ref={originInputRef}
                      name="pickup_location"
                      placeholder="Nhập điểm đón"
                      className=""
                    />
                  </StandaloneSearchBox>
                </div>
                <BiX
                  fontSize={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => (originInputRef.current.value = "")}
                />
              </div>
              <div className="form__swap-btn flex__center">
                <MdOutlineSyncAlt
                  onClick={handleSwapSchedule}
                  style={{ transform: "rotate(90deg)" }}
                />
              </div>
              <div className="form__input-item full__with flex__center">
                <BsFillGeoAltFill />
                <div className="booking__input">
                  <StandaloneSearchBox
                    onLoad={onDestinationSearchBoxLoad}
                    onPlacesChanged={onDestinationPlacesChanged}
                  >
                    <input
                      type="text"
                      ref={destinationInputRef}
                      name="drop_location"
                      placeholder="Nhập điểm đến"
                      className=""
                      defaultValue={
                        router.pathname.includes("dat-xe-san-bay")
                          ? "Cảng hàng không quốc tế Nội Bài (HAN), Sóc Sơn, Hà Nội"
                          : ""
                      }
                    />
                  </StandaloneSearchBox>
                </div>
                <BiX
                  fontSize={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => (destinationInputRef.current.value = "")}
                />
              </div>
            </div>
            <input type="text" name="distance" style={{ display: "none" }} />
            <div
              style={{
                height: 2,
                background: "var(--color-primary)",
                marginBottom: "1rem",
              }}
            />

            <div className="form__input-group booking__options">
              <div
                className="form__input-item flex__center"
                style={{
                  width: "calc(50% - 8px)",
                  justifyContent: "flex-start",
                  gap: "8px",
                  position: "relative",
                }}
              >
                <BiDirections fontSize={16} />
                <select
                  defaultValue="1"
                  name="direction_option"
                  className="option__input"
                >
                  <option value="1">1 chiều</option>
                  <option value="2">2 chiều</option>
                </select>
                <BiChevronDown className="option__input-icon" />
              </div>
              <div
                className="form__input-item flex__center"
                style={{
                  width: "calc(50% - 8px)",
                  justifyContent: "flex-start",
                  gap: "8px",
                  position: "relative",
                }}
              >
                <BiCar fontSize={16} />
                <select
                  defaultValue="4"
                  name="car_option"
                  className="option__input"
                >
                  {/* <option value="xe ghép">Xe ghép</option> */}
                  <option value="4">Xe 4 chỗ</option>
                  <option value="7">Xe 7 chỗ</option>
                  <option value="16">Xe 16 chỗ</option>
                  <option value="29">Xe 29 chỗ</option>
                </select>
                <BiChevronDown className="option__input-icon" />
              </div>
            </div>
            <div className="form__input-group">
              <div className="form__input-item flex__center">
                {/* <label htmlFor="departure__input">Chọn giờ đón</label>
                        <input type="datetime-local" name="" id="departure__input" style={{ flex:1 }} lang="vi" /> */}
                <CustomTimePicker
                  timePicker={timePicker}
                  setTimePicker={setTimePicker}
                />
              </div>
            </div>

            <div className="flex__center">
              <button
                type="submit"
                // onClick={handleSelectSchedule}
                className="booking__form-submit button__base"
              >
                Kiểm Tra Giá
                <BsFillArrowRightCircleFill
                  fontSize={14}
                  style={{ marginLeft: 8 }}
                />
              </button>
            </div>
          </form>
        </div>

        <div className="form__content-right">
          <Image
            src={bannerImg}
            alt="banner-img"
            width={400}
            height={247}
            priority
          />
        </div>
      </div>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
