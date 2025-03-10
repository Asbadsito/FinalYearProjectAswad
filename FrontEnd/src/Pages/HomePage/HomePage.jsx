import React, { useState } from 'react'
import './Homepage.css'
import WorkoutSlider from '../../Components/HomePage/Workouts/WorkoutSlider'
import CreateWorkout from '../../Components/HomePage/Workouts/CreateWorkout'

const workoutTypes = {
  CARDIO: {src:"/workout_icons/cardio.png" },
  ENDURANCE: {src:"/workout_icons/endurance.png" },
  EXPLOSIVE: {src:"/workout_icons/explosive.png" },
  FLEXIBILITY: {src:"/workout_icons/flexibility.png" },
  HIIT: {src:"/workout_icons/hiit.png" },
  RECOVERY: {src:"/workout_icons/recovery.png" },
  RESISTANCE: {src:"/workout_icons/resistance.png" },
  STRENGTH: {src:"/workout_icons/strength.png"}
}

const HomePage = ( {setOverlay} ) => {

  const[showWorkoutDetails , setShowWorkoutDetails] = useState(false);
  const[selectedWorkout , setSelectedWorkout] = useState(null);
  const workoutImage = selectedWorkout?.type ? workoutTypes[selectedWorkout.type]?.src : '/workout_icons/default.png';
  const[showCreateWorkout , setShowCreateWorkout] = useState(false);



  return (
    <>
      <div className='w-full h-full grid grid-cols-1 lg:grid lg:grid-cols-5 lg:grid-rows-6 gap-4 relative'>
        <div className='workout-container
        lg:col-span-3 content-container w-full rounded-lg sm:w-[80%] md:w-[80%] lg:w-[100%] mx-auto lg:row-span-2 h-44 lg:h-full'>
          <div className='w-full h-full flex flex-col'>
            <div className='workouts-header w-full h-[25%] flex rounded-t-lg'>
              <div className='workouts-title pl-4 w-[20%] h-full text-[14px] sm:text-[12px] md:text-[18px]'>Workouts:</div>
              <div className='workouts-search w-[50%] h-full'>
                <input className="workoutSearchInput
                w-24 ml-5 md:ml-0 h-[50%] sm:w-44 sm:h-[60%] md:w-72 lg:w-80 xl:w-[30rem] 
                px-4 py-2 rounded-md border border-gray-600 
                focus:outline-none focus:ring-0 focus:border-transparent
                transition-all duration-300 ease-in-out
                text-[11px] sm:text-[12px] md:text-[14px] leading-[1.5]"
                 type='text' placeholder='Search workout....'>

                 </input>
              </div>
              <div className='w-[30%] h-full flex justify-center items-center'>
                <button className='createWorkoutButton w-20 sm:w-24 md:w-32 lg:w-36 h-[60%] 
                text-[8px] sm:text-[8px] md:text-[12px] lg:text-[13px]' onClick={() => {setShowCreateWorkout(true) ; setOverlay(true)}}>Create Workout</button>
              </div>
            </div>
            {/* End of workout header : just for my reference so that i dont get lost/}
            {/* Here we call the workout slider with all the workouts fetched */}
              <WorkoutSlider setOverlay={setOverlay} setShowWorkoutDetails={setShowWorkoutDetails} setSelectedWorkout={setSelectedWorkout}/>
          </div>
        </div>

        <div className='lg:row-start-3 content-container w-full rounded-lg sm:w-[80%] md:w-[80%] lg:w-[100%] mx-auto lg:col-span-3 lg:row-span-2 h-44 lg:h-full'>
          <div className='w-full h-full flex flex-col'>
            <div className='diets-header w-full h-[25%] flex rounded-t-lg'>
                <div className='workouts-title pl-4 w-[20%] h-full text-[14px] sm:text-[12px] md:text-[18px]'>Diets:</div>
            </div>
          </div>
        </div>

        <div className='content-container w-full rounded-lg h-auto lg:col-span-2 lg:row-span-4 lg:col-start-4 '>
          <div className='w-full h-full flex flex-col'>
            <div className='sharing-header w-full h-[12%] flex rounded-t-lg'>
                <div className='workouts-title pl-4 w-[50%] h-full text-[14px] sm:text-[12px] md:text-[18px]'>Sharing:</div>
            </div>
          </div>
        </div>

        <div className='content-container w-full rounded-lg h-auto lg:col-span-3 lg:row-span-2 lg:col-start-3 lg:row-start-5'>
        </div>

        <div className='content-container w-full rounded-lg h-auto lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-5'>
          <div className='w-full h-full flex flex-col'>

          </div>
        </div>


        {/* Here is the absolute div that shows the details of the selectedWorkout*/}
        <div className={`lg:w-96 lg:h-[450px] sm:w-72 sm:h-80 w-52 h-60 bg-gray-200 absolute z-50 
              top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg
              transition-all duration-300 ease-in-out
              ${showWorkoutDetails ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none invisible"}`}>

            <div className='w-full h-full flex flex-col items-center relative'>
                <i class="close fa-solid fa-x absolute top-4 right-6" onClick={() => {setOverlay(prev => !prev) ; setShowWorkoutDetails(false)}}></i>
                <div className='workoutTitle w-full flex justify-center mt-4 text-[9px] sm:text-[9px] md:text-[12px] lg:text-[16px]'>{selectedWorkout ? selectedWorkout.workoutName : "IT dosnest wooookr"}</div>
                <div className='workoutType w-full flex justify-center mt-4 text-[9px] sm:text-[9px] md:text-[12px] lg:text-[16px]'>{selectedWorkout ? selectedWorkout.type : "There is no type - Error"}</div>
                <div className='w-full flex justify-center mt-4'>
                  <img src={workoutImage} className='w-9 h-auto'></img>
                </div>

                <div class="exerciseContainer w-[90%] h-screen overflow-hidden flex mt-4 mb-4">
                <div class="child w-full h-full flex relative overflow-hidden">
                  <div class="main-content w-full h-full overflow-y-auto">
                     {selectedWorkout?.listOfExercises?.map((exercise, index) => (
                    <div key={index} className='workoutExercise w-full h-[20%] flex items-center justify-start bg-gray-100'>
                      <img src={exercise.imgUrl} alt={exercise.name} className="exerciseImage w-12 h-12 rounded-full mr-4" />
                      <span className="exerciseName text-sm">{exercise.name}</span>
                      <span>{}</span>
                    </div>))}
                  </div>
                </div>
              </div>
            </div> 

        </div>

        {/* Here is the absolute div that pops up when we create a new workout, I will make it a component probably*/}
        <CreateWorkout showCreateWorkout={showCreateWorkout} setShowCreateWorkout={setShowCreateWorkout} setOverlay={setOverlay}/>

      </div>
    </>
  )
}

export default HomePage