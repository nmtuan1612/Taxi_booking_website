import React from "react";
import styles from "./BookSuccess.module.scss";
import Link from "next/link";

const BookSuccess = () => {
  return (
    <div className={styles.book__success}>
      <div className={styles.noti__wrap}>
        <h3>ĐẶT XE THÀNH CÔNG</h3>
        <p>Quý khách đã đặt xe thành công</p>
        <p>chúng tôi sẽ liên lạc sớm nhất với bạn</p>
        <p style={{ color: "var(--color-primary)" }}>
          Chân thành cảm ơn quý khách !
        </p>

        <Link href="/">
          <button>Về trang chủ</button>
        </Link>
      </div>
    </div>
  );
};

export default BookSuccess;
