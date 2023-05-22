import xe4cho from "../../public/images/xe-4-cho.png";
import xe7cho from "../../public/images/xe-7-cho.png";
import xe16cho from "../../public/images/xe-16-cho.png";
import xe29cho from "../../public/images/xe-29-cho.png";

export const NGUONG_1 = 10;
export const NGUONG_2 = 30;
export const NGUONG_3 = 120;
export const TI_LE_GIAM = 0.2;
export const GIA_1 = 12500;
export const GIA_2 = 10000;
export const GIA_3 = 8750;

export const cars = [
  {
    id: "xe4cho",
    name: "Xe Taxi 4 chỗ",
    image: xe4cho,
    description: "Xe sedan: Vios, Honda city, Elantra, Mazda...",
    people: 4,
    vali: 2,
    heSoGia: 1,
  },
  {
    id: "xe7cho",
    name: "Xe Taxi 7 chỗ",
    image: xe7cho,
    description: "Xe Innova, Avanza, Cross Veloz, Xpander...",
    people: 7,
    vali: 2,
    heSoGia: 1.5,
  },
  // {
  //   id: "xe16cho",
  //   name: "Xe Taxi 16 chỗ",
  //   image: xe16cho,
  //   description: "Xe Fortransit đời mới",
  //   people: 16,
  //   vali: 4,
  //   heSoGia: 1.65,
  // },
  // {
  //   id: "xe29cho",
  //   name: "Xe Taxi 29 chỗ",
  //   image: xe29cho,
  //   description: "Xe Samco, Thaco, Hyundai County...",
  //   people: 29,
  //   vali: 6,
  //   heSoGia: 2.1,
  // },
];

export const NoiBaiInfo = {
  geometry: {
    location: {
      lat: "21.2187149",
      lng: "105.8041709",
    },
  },
};
