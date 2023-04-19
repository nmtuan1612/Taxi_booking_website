import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { BiCar, BiChevronDown, BiDirections, BiX } from "react-icons/bi";
import {
  BsFillArrowRightCircleFill,
  BsFillGeoAltFill,
  BsFillGeoFill,
} from "react-icons/bs";
import { MdOutlineSyncAlt } from "react-icons/md";
import { NoiBaiInfo } from "../../pages/api/constant";
import {
  getDistance,
  getPlaces,
  getPrices,
} from "../../pages/api/generateData";
import { BookingContext } from "../../pages/api/store";
import bannerImg from "../../public/images/banner-img.png";
import CustomTimePicker from "../Booking/CustomTimePicker";
import PlacesList from "./PlacesList";

function MyComponent({ scrollDown }) {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [bookType, setBookType] = useState("xeduongdai");
  const [places, setPlaces] = useState([]);
  const [pending, startTransition] = useTransition();

  const { setBooking, setPriceData } = useContext(BookingContext);

  const originInputRef = useRef();
  const destinationInputRef = useRef();
  const typeTimeoutRef = useRef();

  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("dat-xe-san-bay")) {
      setBookType("xedisanbay");
      setDestination(NoiBaiInfo);
    }
  }, [router, destinationInputRef]);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.id !== "origin_search_result") {
        document.getElementById("origin_search_result").style.display = "none";
      }
      if (e.target.id !== "destination_search_result") {
        document.getElementById("destination_search_result").style.display =
          "none";
      }
      if (e.target.id === "origin_input") {
        const list = document.getElementById("origin_search_result");
        if (list) list.style.display = "block";
      }
      if (e.target.id === "destination_input") {
        document.getElementById("destination_search_result").style.display =
          "block";
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const onOriginPlacesChanged = (e) => {
    const value = e.target.value;
    if (typeTimeoutRef.current) {
      clearTimeout(typeTimeoutRef.current);
    }
    typeTimeoutRef.current = setTimeout(async () => {
      const { predictions } = await getPlaces(value);
      setPlaces(predictions);
    }, 500);
    // startTransition(async () => {
    //   const { predictions } = await getPlaces(e.target.value);
    //   setPlaces(predictions);
    // });
  };

  const onDestinationPlacesChanged = async (e) => {
    const value = e.target.value;
    if (typeTimeoutRef.current) {
      clearTimeout(typeTimeoutRef.current);
    }
    typeTimeoutRef.current = setTimeout(async () => {
      const { predictions } = await getPlaces(value);
      setPlaces(predictions);
    }, 500);
  };

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

  const computeDistance = async (origin, destination) => {
    if (origin && destination) {
      const originLat = origin.geometry.location.lat;
      const originLng = origin.geometry.location.lng;
      const destinationLat = destination.geometry.location.lat;
      const destinationLng = destination.geometry.location.lng;

      const { rows } = await getDistance(
        `${originLat},${originLng}`,
        `${destinationLat},${destinationLng}`
      );
      const { distance, status } = rows[0].elements[0];
      if (status === "OK") {
        return distance;
      }
    }
    return 0;
  };

  const handleSelectSchedule = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formProps = Object.fromEntries(formData);

    if (
      formProps.departure_date !== "" &&
      formProps.departure_time !== "" &&
      formProps.pickup_location != "" &&
      formProps.drop_location != ""
    ) {
      const currentDate = new Date().getDate();
      const [year, month, day] = formProps.departure_date.split("-");
      const [hours, minutes] = formProps.departure_time.split(":");
      const departureDate = new Date(year, month, day, 0, 0, 0).getDate();
      const minutesDifference = parseInt(minutes) - new Date().getMinutes();
      const departure_date = `${day}/${month}/${year}`;

      const distance = await computeDistance(origin, destination);

      if (departureDate > currentDate) {
        // console.log(true);
        localStorage.setItem(
          "taxi_booking",
          JSON.stringify({
            ...formProps,
            distance: distance,
            booking_type: bookType,
            departure_date,
          })
        );
        setBooking({
          ...formProps,
          distance: distance,
          booking_type: bookType,
          departure_date,
        });
        const prices = getPrices({
          ...formProps,
          distance: distance,
          booking_type: bookType,
          departure_date,
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
              departure_date,
            })
          );
          setBooking({
            ...formProps,
            distance: distance,
            booking_type: bookType,
            departure_date,
          });
          const prices = getPrices({
            ...formProps,
            distance: distance,
            booking_type: bookType,
            departure_date,
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
    // sendMessage({...formProps, distance: distance});
  };

  return (
    /* Form */
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
            <div className="form__swap-btn flex__center">
              <MdOutlineSyncAlt
                onClick={handleSwapSchedule}
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
            <div className="form__input-item full__with flex__center">
              <BsFillGeoAltFill />
              <div className="booking__input">
                <input
                  onChange={onDestinationPlacesChanged}
                  type="text"
                  ref={destinationInputRef}
                  name="drop_location"
                  placeholder="Nhập điểm đến"
                  className=""
                  autoComplete="off"
                  id="destination_input"
                  defaultValue={
                    router.pathname.includes("dat-xe-san-bay")
                      ? "Cảng hàng không quốc tế Nội Bài (HAN), Sóc Sơn, Hà Nội"
                      : ""
                  }
                />
                <PlacesList
                  ref={destinationInputRef}
                  data={places}
                  setLocation={setDestination}
                  setPlaces={setPlaces}
                  id="destination_search_result"
                />
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

          <div
            className="form__input-group booking__options"
            style={{ marginBottom: "6px" }}
          >
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
            <CustomTimePicker />
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
  );
}

export default React.memo(MyComponent);
