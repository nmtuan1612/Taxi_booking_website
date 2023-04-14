import { AiOutlinePhone } from "react-icons/ai";
import { BsGeoAlt } from "react-icons/bs";
import { HiBadgeCheck } from "react-icons/hi";
import styles from "./AboutUs.module.scss";

const AboutUs = () => {
  return (
    <div className={styles.about__us}>
      <h2>Tại sao chọn chúng tôi ?</h2>
      <div className={styles.about__wrap}>
        <div className={`${styles.about__item} flex__center`}>
          <div className={styles.about__icon}>
            <AiOutlinePhone />
          </div>
          <div className={styles.about__text}>
            Chúng tôi sẽ tiếp nhận đặt xe trong toàn bộ khung giờ
          </div>
        </div>
        <div className={`${styles.about__item} flex__center`}>
          <div className={styles.about__icon}>
            <BsGeoAlt />
          </div>
          <div className={styles.about__text}>
            Không giới hạn khoảng cách, điểm đến và lộ trình đi, linh hoạt.
            Chúng tôi sẽ đáp ứng và phục vụ nhu cầu của quý khách
          </div>
        </div>
        <div className={`${styles.about__item} flex__center`}>
          <div className={styles.about__icon}>
            <HiBadgeCheck />
          </div>
          <div className={styles.about__text}>
            Đội ngũ lái xe trên 5 năm kinh nghiệm lái xe đường dài. đảm bảo An
            Toàn và thời gian tối ưu nhất
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
