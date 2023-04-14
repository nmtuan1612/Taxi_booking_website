// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
const BOT_TOKEN = "5913378949:AAFIYEJWP14FlfRCxFQ1D-oP6yd4VgN8qEo";
// const API = axios.create({ baseUrl: })
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export const getChatId = async () => {
  try {
    const response = await axios.get(`${TELEGRAM_API_URL}/getUpdates`);
    // const chatId = response.data.result[0].message.chat.id;
    // console.log(`Chat ID: ${chatId}`);
    console.log("result:", response.data.result);
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage = async (formProps) => {
  try {
    console.log(formProps);
    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: "-936727249",
      text: 
      `Thông tin chuyến xe:
  * Quãng đường(${formProps?.direction_option} chiều): ${formProps?.distance?.text}
  * Thu khách: ${formProps?.price}
  * Điểm đón: ${formProps?.pickup_location}
  * Điểm đến: ${formProps?.drop_location}
  * Loại xe: ${formProps?.car_option} chỗ
  * Tên khách: ${formProps?.fullName}
  * SĐT: ${formProps?.phonenumber}
  * Ngày đón: ${formProps?.departure_date} - Giờ đón: ${formProps?.departure_time}
  * Ghi chú: ${formProps?.note}
    `,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
