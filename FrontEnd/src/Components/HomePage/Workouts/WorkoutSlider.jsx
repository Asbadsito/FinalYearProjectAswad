import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css'; 
import 'swiper/css/bundle'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade'; 
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'; 
import WorkoutComponent from './WorkoutComponent';
import { replace } from 'react-router-dom';
import axios from 'axios';
import { u } from 'framer-motion/client';

const WorkoutSlider = ( {setOverlay , setShowWorkoutDetails , setSelectedWorkout , setDeleteConfirmation , setWorkoutToDeleteId , reload , workoutInfo , setWorkoutInfo} ) => {

  useEffect(() => {
    console.log("useEffect triggered in WorkoutSlider, reload:", reload);
    getAllWorkouts();
  }, [reload]);

  useEffect(() => {
  if (workoutInfo.length > 0) {
    console.log("Updated Workouts State:", JSON.stringify(workoutInfo[0], null, 2));
  }
  }, [workoutInfo]); 

  const getAllWorkouts = async () => {
    
    const id = localStorage.getItem("userId");
    
    const token = localStorage.getItem("authToken")

    if(!token){
      console.log("no token found in the localStorage")
      return
    }
    if(!id){
      console.log("User id was not found - error")
      return
    }

    const cleanId = encodeURIComponent(id);
    const url = `http://localhost:8080/workout/getAllWorkoutsByUserId/${cleanId}`

    try{
        const response = await axios.get(url ,{
                headers: {
                  'Content-Type' : 'application/json',
                  'Authorization': `Bearer ${token}`
                },
        })

        setWorkoutInfo(response.data)

    }
    catch(error){
        console.log("workout fetching failed : ", error.response ? error.response.data : error.message)
    }

  }


  const workoutToDisplay = workoutInfo.length > 0 ? workoutInfo[0] : null;

  return (
    <div className='workoutSliderContainer w-full h-[75%] py-2 flex items-center justify-center rounded-b-lg relative'>
      <div className='absolute left-2 top-1/2 transform -translate-y-1/2 z-20 swiper-button-prev after:!text-xl after:!text-black'></div>
      
      <div className='relative w-full h-full px-6 sm:px-10'>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
              centeredSlides: false
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
              centeredSlides: false
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
              centeredSlides: false
            }
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop={false}
          className='h-full w-full relative'
        >
             {workoutInfo.length > 0 ? (
              workoutInfo.map((workout, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <WorkoutComponent workout={workout} setOverlay={setOverlay} setShowWorkoutDetails={setShowWorkoutDetails} setSelectedWorkout={setSelectedWorkout} setDeleteConfirmation={setDeleteConfirmation} setWorkoutToDeleteId={setWorkoutToDeleteId}/>
                </SwiperSlide>
              ))
            ) : (
              <div className="text-center">THERE ARE NO WORKOUTS IN HERE</div>
            )}
        
        </Swiper>
      </div>
      
      {/* Arrow psoition*/}
      <div className='absolute right-2 top-1/2 transform -translate-y-1/2 z-20 swiper-button-next after:!text-xl after:!text-black'></div>
    </div>
  );
};

export default WorkoutSlider;