import axios from "axios";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import SearchForm from "../../components/SearchForm/SearchForm";
function MapWithSearch({ title }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const scrollDown = () => {
    window.scroll({
      top: 400,
      behavior: "smooth",
    });
  };

  async function handleSearch(e) {
    e.preventDefault();

    const url = `https://places.goong.io/v3/places/text?text=${query}&api_key=imXyU1qZz8kS3nHiMDhLnhmywrmhWmTv1Y5D5nbH`;

    const response = await axios.get(url);
    setResult(response.data);
  }

  console.log(result);

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
              <h5 className="flex__center">
                <AiOutlineCheck style={{ marginRight: 8 }} /> An toàn, Đúng hẹn
              </h5>
              <h5 className="flex__center">
                <AiOutlineCheck style={{ marginRight: 8 }} /> Giá trọn gói,
                không phát sinh
              </h5>
            </div>
            <SearchForm scrollDown={scrollDown} />
          </div>
          <div className="scroll-down__arrow" onClick={scrollDown}>
            <MdKeyboardDoubleArrowDown />
          </div>
        </div>
        {/* </GoogleMap> */}
      </div>
    </div>
  );
}

export default MapWithSearch;
