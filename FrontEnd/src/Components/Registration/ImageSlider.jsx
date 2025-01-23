import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css'; 
import 'swiper/css/bundle'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; 

import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'; 

const ImageSlider = () => {
  return (
    <div className='w-full h-full'>
    <Swiper
      spaceBetween={0} 
      slidesPerView={1} 
      loop={true} 
      autoplay={{
        delay: 3000, 
        disableOnInteraction: false, 
      }}
      speed={1000} 
      modules={[Autoplay]} 
      className="w-full h-full" 
    >
      <SwiperSlide>
        <img
          src="/images/slider1.jpg"
          alt="Slider Image 1"
          className="w-full h-full object-cover shadow-right " 
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider2.jpg"
          alt="Slider Image 2"
          className="w-full h-full object-cover shadow-right " 
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider3.jpg"
          alt="Slider Image 3"
          className="w-full h-full object-cover shadow-right " 
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/images/slider4.jpg"
          alt="Slider Image 4"
          className="w-full h-full object-cover shadow-right"
        />
      </SwiperSlide>
    </Swiper>
    </div>
  );
};

export default ImageSlider;
