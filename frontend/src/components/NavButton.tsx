import { useSwiper } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const NavButton = ({
  type,
  className,
}: {
  type: "prev" | "next";
  className: string;
}) => {
  const swiper = useSwiper();
  return (
    <button
      className={className}
      onClick={() =>
        type === "prev" ? swiper.slidePrev() : swiper.slideNext()
      }
    >
      {type === "prev" ? <FaArrowLeft /> : <FaArrowRight />}
    </button>
  );
};

export default NavButton;
