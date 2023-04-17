import { BsFillGeoAltFill } from "react-icons/bs";
import { getPlaceInfo } from "../../pages/api/generateData";
import { forwardRef } from "react";

const PlacesList = ({ id, data, setLocation, setPlaces }, ref) => {
  const selectPlace = async (place) => {
    const { result } = await getPlaceInfo(place?.place_id);
    ref.current.value = place?.description;
    setLocation(result);
    setPlaces([]);
  };

  return (
    <div className="" style={{ display: "none" }} id={id}>
      {data?.length > 0 && (
        <ul
          className="place__list"
          style={{
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,.3)",
            width: "90%",
            position: "absolute",
            left: 0,
            zIndex: 1000,
            borderRadius: 2,
            // borderTop: "1px solid #d9d9d9",
          }}
        >
          {data.map((place) => (
            <li
              key={place?.place_id}
              onClick={() => selectPlace(place)}
              className="hover__darken"
              style={{
                cursor: "pointer",
                fontFamily: "var(--font-alt)",
                fontSize: "12px",
                padding: "0 6px",
                fontWeight: "500",
                color: "#515151",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                lineHeight: "30px",
                textAlign: "left",
                borderTop: "1px solid #e6e6e6",
                display: "flex",
                gap: "6px",
                alignItems: "center",
              }}
            >
              <BsFillGeoAltFill fontSize={12} style={{ width: 12 }} />
              <span
                style={{
                  flex: 1,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {place?.description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default forwardRef(PlacesList);
