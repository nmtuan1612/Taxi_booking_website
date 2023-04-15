import React from "react";
import Image from "next/image";
import featuredImg from "../../public/images/featured_img.jpeg";
import style from "./Compose.module.scss";

const Featured = () => {
  return (
    <div className={style.featured}>
      <div className={style.featured__left}>
        <Image
          src={featuredImg}
          alt="ft-img"
          // width={380}
          height={350}
          className={style.featured__img}
        />
      </div>
      <div className={`${style.featured__right}`} style={{ padding: "2rem" }}>
        <h3>Chuyên tuyến BẮC GIANG – BẮC NINH – HÀ NỘI và ngược lại !</h3>
        <p>☎️ Hotline : 0869 5555 98</p>
        <p>⏰ Xe chạy liên tục tất cả các ngày trong tuần</p>

        <p>✅ Tần Suất Hoạt Động: gọi là có & lúc nào cũng có 30ph/chuyến</p>

        <p>✅ Nhà xe uy tín & an toàn, chu đáo</p>
        <p>✅ Đi Ghép Nhanh Chỉ Từ 200k - 250k(tuỳ điểm)</p>
        <p>✅ Ưu Tiên Bao Xe Chỉ Từ 300k - 500k(tuỳ điểm)</p>
        <p>✅ Nhận Đồ hỏa tốc 100k - 150k</p>
        <p>✅ Đặt Xe Nhanh – Luôn Sẵn Xe Phục Vụ</p>
        <p>* Đón và trả khách tận nơi *</p>
      </div>
    </div>
  );
};

export default Featured;
