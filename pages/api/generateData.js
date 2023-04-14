import {
  NGUONG_1,
  NGUONG_2,
  NGUONG_3,
  GIA_1,
  GIA_2,
  GIA_3,
  TI_LE_GIAM,
  cars,
} from "./constant";

const form = {
  booking_type: "xeduongdai",
  car_option: "4",
  departure_date: "14/4/2023",
  departure_time: "00:27",
  direction_option: "1",
  distance: { text: "2,9 km", value: 2902 },
  drop_location: "318 Đường La Thành, Ô Chợ Dừa, Đống Đa, Hà Nội, Việt Nam",
  pickup_location: "81 Phố Láng Hạ, Thành Công, Ba Đình, Hà Nội, Việt Nam",
};

export const getPrices = (formData = form) => {
  const km = parseFloat(formData.distance.value) / 1000;
  const [hours] = formData.departure_time.split(":");

  const bookType = formData.booking_type;

  let price = 0;

  if (bookType === "xedisanbay") {
    if (km < 30) {
      price = 250000;
    } else {
      price = 312000;
    }
  } else if (bookType === "xesanbayve") {
    if (km < 30) {
      price = 300000;
    } else {
      price = 362000;
    }
  } else {
    if (km <= NGUONG_1) {
      price = km * GIA_1;
    } // km > NGUONG_1
    else {
      if (km <= NGUONG_2) {
        price = NGUONG_1 * GIA_1 + (km - NGUONG_1) * GIA_2;
      } // km > NGUONG_2
      else {
        price =
          NGUONG_1 * GIA_1 +
          (NGUONG_2 - NGUONG_1) * GIA_2 +
          (km - NGUONG_2) * GIA_3;

        if (km > NGUONG_3) {
        }
      }
    }
  }

  if (0 < parseInt(hours, 10) && parseInt(hours, 10) < 8) {
    price = price + 20000;
  }

  if (formData.direction_option === "2") {
    price = price * 1.8;
  }

  const priceData = cars.map((car) => {
    const oldPrice = price * car.heSoGia;
    const newPrice = oldPrice * (1 - TI_LE_GIAM);
    return {
      ...car,
      oldPrice: oldPrice
        .toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })
        .replace("VND", "đ"),
      newPrice: newPrice
        .toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })
        .replace("VND", "đ"),
    };
  });

  return priceData;
};
