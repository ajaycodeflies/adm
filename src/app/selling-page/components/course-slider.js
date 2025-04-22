import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function CourseSlider() {
  return (
    <div className="course-slider">
      <h2>Access ADM anywhere using your mobile device</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={"2"}
        centeredSlides={true}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        modules={[Navigation, Pagination]}
        className="custom-swiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="image-container">
            <Image
              src="/images/users/phone-4.png"
              alt="Phone 1"
              width={200}
              height={400}
              className="slider-image"
            />
          </div>
        </SwiperSlide>
        {/* Slide 2 */}
        <SwiperSlide>
          <div className="image-container">
            <Image
              src="/images/users/phone-2.png"
              alt="Phone 2"
              width={200}
              height={400}
              className="slider-image"
            />
          </div>
        </SwiperSlide>
        {/* Slide 3 */}
        <SwiperSlide>
          <div className="image-container">
            <Image
              src="/images/users/phone-3.png"
              alt="Phone 3"
              width={200}
              height={400}
              className="slider-image"
            />
          </div>
        </SwiperSlide>
        {/* Slide 4 */}
        <SwiperSlide>
          <div className="image-container">
            <Image
              src="/images/users/phone-4.png"
              alt="Phone 4"
              width={200}
              height={400}
              className="slider-image"
            />
          </div>
        </SwiperSlide>
        {/* Slide 5 */}
        {/* <SwiperSlide>
          <div className="image-container">
            <Image
              src="/images/users/phone-5.png"
              alt="Phone 5"
              width={200}
              height={400}
              className="slider-image"
            />
          </div>
        </SwiperSlide> */}
        {/* Custom Buttons */}
        <div className="swiper-nav-icons">
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </div>
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
}

export default CourseSlider;
