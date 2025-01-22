import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/bundle'; // This will import all Swiper styles, including Autoplay
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; // Import styles for fade effect

import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'; // Import the fade effect

const ImageSlider = () => {
  return (
    <Swiper
      spaceBetween={0} 
      slidesPerView={1} 
      loop={true} 
      autoplay={{
        delay: 3000, 
        disableOnInteraction: false, 
      }}
      speed={1500} 
      modules={[Autoplay]} 
      className="w-full h-full" 
    >
      <SwiperSlide>
        <img
          src="/images/slider1.jpg"
          alt="Slider Image 1"
          className="w-full h-full object-cover" 
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider2.jpg"
          alt="Slider Image 2"
          className="w-full h-full object-cover" 
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider3.jpg"
          alt="Slider Image 3"
          className="w-full h-full object-cover" 
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider4.jpg"
          alt="Slider Image 4"
          className="w-full h-full object-cover" 
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSlider;
