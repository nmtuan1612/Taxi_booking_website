// import Head from 'next/head'
import { Inter } from "next/font/google";
import Booking from "../components/Booking/Booking";
import AboutUs from "../components/AboutUs/AboutUs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Booking />
      <AboutUs />
    </div>
  );
}
