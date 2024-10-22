import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./css/HorizontalCards.css";
import { getAllProducts } from "../http/getAPI";
import { useQuery } from "@tanstack/react-query";

function NewProductSlider( { productData }) {

  return (
    <div className="horizontal-sec">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerGroup={3}
        navigation={true}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1440: { slidesPerView: 6 },
        }}
      >
        {productData?.data?.map((item) => (
          <SwiperSlide key={item.id} className="swiper-slide">
            <div
              className="swiper-slide-inner"
            >
              <img src={item.image} alt={item.title}/>
            
              <div className="swiper-overlay">
                <span>{item.title}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default NewProductSlider;
