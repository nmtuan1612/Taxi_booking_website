import { useContext } from "react";
import TaxiCard from "./TaxiCard";
import styles from "./TaxiCard.module.scss";
import { BookingContext } from "../../pages/api/store";

const ListTaxiCard = () => {
  const { booking, priceData } = useContext(BookingContext);

  return (
    <div className={`${styles["list__taxi-card"]}`}>
      {priceData?.length > 0 && (
        <>
          <h1
            className="p__opensans"
            style={{ fontSize: "20px", fontWeight: 700 }}
          >
            Danh sách xe phù hợp
          </h1>
          {priceData.map((price) => (
            <TaxiCard key={price.id} data={price} />
          ))}
        </>
      )}
    </div>
  );
};

export default ListTaxiCard;
