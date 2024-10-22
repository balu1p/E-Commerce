import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "../css/HeroSection.css"; // Optional: Add your own additional styling if needed.
import { Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../http/getAPI";
import NewProductSlider from "../NewProductSlider";
import AllProducts from "../AllProducts";
import banner1 from '../../../assets/Banner/banner1.jpg';
import banner2 from '../../../assets/Banner/banner2.jpg';
import banner3 from '../../../assets/Banner/banner3.jpg';
import banner4 from '../../../assets/Banner/banner4.jpg';

function NewHeroSection() {

  const bannersPath = [
    banner1, banner2, banner3, banner4
  ]
    const {
        data: productData,
        isLoading: productDataIsLoading,
        refetch: productDataRefetch,
      } = useQuery({
        queryKey: ["get-products"],
        queryFn: getAllProducts,
        staleTime: 0,
        gcTime: Infinity,
      });

  const slides = bannersPath?.map((item, index) => (
    <SwiperSlide key={index}>
      <img
        src={item}
        className="w-full h-auto object-contain rounded-lg"
      />
    </SwiperSlide>
  ));

  return (
    <>
    <div className="top-slides w-full mx-auto">
      <Swiper
        slidesPerView={1.3}
        spaceBetween={10}
        centeredSlides={true}
        loop={true}
        loopedSlides={4}
        watchSlidesProgress={true}
        watchSlidesVisibility={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        slideToClickedSlide={true}
      >
        {slides}
      </Swiper>
    </div>
    <NewProductSlider productData={productData}/>
    <AllProducts />
  </>
  );
}

export default NewHeroSection;
