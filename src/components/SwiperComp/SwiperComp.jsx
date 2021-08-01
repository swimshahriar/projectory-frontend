import React, { useState } from "react";
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
// internal import
import CloudImage from "../CloudImage";
import "./swiperComp.css";

SwiperCore.use([Pagination, Navigation, Thumbs]);

const SwiperComp = ({ slides }) => {
  const [thumbSwiper, setThumbSwiper] = useState(null);
  const slidesList = [];
  const thumbs = [];

  for (let i = 0; i < slides.length; i += 1) {
    slidesList.push(
      <SwiperSlide key={`slide-${i}`} tag="li" style={{ listStyle: "none" }} className="swiperBig">
        <CloudImage
          publicId={slides[i]}
          uploadPreset="projectory_services"
          width="600"
          height="300"
          crop="fill"
        />
      </SwiperSlide>
    );

    thumbs.push(
      <SwiperSlide
        key={`slide-${i}`}
        tag="li"
        style={{ listStyle: "none" }}
        className="swiperThumb"
      >
        <CloudImage
          publicId={slides[i]}
          uploadPreset="projectory_services"
          width="200"
          height="100"
          crop="fill"
        />
      </SwiperSlide>
    );
  }
  return (
    <>
      <Swiper
        id="main"
        thumbs={{ swiper: thumbSwiper }}
        tag="section"
        wrapperTag="ul"
        navigation
        pagination
        spaceBetween={0}
        slidesPerView={1}
      >
        {slidesList}
      </Swiper>
      <Swiper
        id="thumbs"
        spaceBetween={10}
        slidesPerView={3}
        watchSlidesVisibility
        watchSlidesProgress
        onSwiper={setThumbSwiper}
        style={{ opacity: ".9", cursor: "pointer" }}
      >
        {thumbs}
      </Swiper>
    </>
  );
};

export default SwiperComp;
