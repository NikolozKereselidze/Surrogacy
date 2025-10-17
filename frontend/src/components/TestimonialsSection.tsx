import { useTranslation } from "react-i18next";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import styles from "../styles/TestimonialsSection.module.css";

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t("testimonials.review1.name"),
      text: t("testimonials.review1.text"),
      rating: 5,
      location: "Georgia",
      verified: true,
    },
    {
      name: t("testimonials.review2.name"),
      text: t("testimonials.review2.text"),
      rating: 5,
      location: "Madrid, Spain",
      verified: true,
    },
    {
      name: t("testimonials.review3.name"),
      text: t("testimonials.review3.text"),
      rating: 5,
      location: "Spain",
      verified: true,
    },
    {
      name: t("testimonials.review4.name"),
      text: t("testimonials.review4.text"),
      rating: 5,
      location: "Georgia",
      verified: true,
    },
    {
      name: t("testimonials.review5.name"),
      text: t("testimonials.review5.text"),
      rating: 5,
      location: "Georgia",
      verified: true,
    },
    {
      name: t("testimonials.review6.name"),
      text: t("testimonials.review6.text"),
      rating: 5,
      location: "Georgia",
      verified: true,
    },
  ];

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${styles.star} ${
          i < rating ? styles.starFilled : styles.starEmpty
        }`}
      />
    ));

  return (
    <section className={`${styles.testimonialsSection} section`}>
      <div className="content">
        <h2 className="title">{t("testimonials.title")}</h2>
        <p className="subtitle">{t("testimonials.subtitle")}</p>
      </div>

      <Swiper
        modules={[Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={30}
        loop
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className={styles.testimonialsSwiper}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <div className={styles.stars}>
                  {renderStars(testimonial.rating)}
                </div>
                {testimonial.verified && (
                  <span className={styles.verifiedBadge}>
                    {t("testimonials.verified")}
                  </span>
                )}
              </div>

              <div className={styles.testimonialContent}>
                <FaQuoteLeft className={styles.quoteIcon} />
                <p className={styles.testimonialText}>{testimonial.text}</p>
              </div>

              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{testimonial.name}</h4>
                  <p className={styles.authorLocation}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialsSection;
