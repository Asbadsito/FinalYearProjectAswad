import React from 'react'
import './CreateWorkout.css'
import { useState } from 'react';

const CreateWorkout = ( {showCreateWorkout , setShowCreateWorkout , setOverlay} ) => {

  const [selectedWorkoutType, setSelectedWorkoutType] = useState("");
  const[createWorkoutName , setCreateWorkoutName] = useState("");

    const workoutTypes = [
    "CARDIO",
    "ENDURANCE",
    "EXPLOSIVE",
    "FLEXIBILITY",
    "HIIT",
    "RECOVERY",
    "RESISTANCE",
    "STRENGTH"
    ];


    console.log(showCreateWorkout);


  return (
    <div className={`createWorkoutContainer lg:w-[600px] lg:h-[500px] sm:w-96 sm:h-80 w-52 h-60  absolute z-50 
              top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg
              transition-all duration-300 ease-in-out
              ${showCreateWorkout ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none invisible"}`}>
       <div className='createTitle mt-4 text-[10px] sm:text-[11px] lg:text-[18px] w-full flex justify-center'>Create Workout</div>
         <div className='w-full flex justify-center mt-4'>
              <input className="createWorkoutName text-[9px] w-[130px] h-8 sm:w-[200px] lg:w-[50%] lg:text-[16px] " placeholder='Name : '
                     value={createWorkoutName}
                     onChange={(e) => setCreateWorkoutName(e.target.value)}
              ></input>
        </div>
        <div className='w-full flex justify-center mt-4'>
          <label className="block text-[11px] sm:text-[12px] lg:text-[15px] font-semibold mt-4 mr-4">Select Workout Type:</label>
          <select
            className="selectionBox mt-2 p-2 border text-[14px] rounded-lg w-[20%] h-9"
            value={selectedWorkoutType}
            onChange={(e) => setSelectedWorkoutType(e.target.value)}
          >
            {workoutTypes.map((type) => (
              <option key={type} value={type} className='text-[14px]'>
                {type}
              </option>
            ))}
          </select>
        </div>
            <i class="close fa-solid fa-x absolute top-4 right-6" onClick={() => {setOverlay(prev => !prev) ; setShowCreateWorkout(false)}}></i>
   </div>
  )

}

export default CreateWorkout
