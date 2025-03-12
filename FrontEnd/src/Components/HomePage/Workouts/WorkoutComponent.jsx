import React from 'react'
import './Workout.css'

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


const WorkoutComponent = ( {workout , setOverlay , setShowWorkoutDetails , setSelectedWorkout , setDeleteConfirmation , setWorkoutToDeleteId} ) => {

  const workoutImage = workoutTypes[workout.type] ? workoutTypes[workout.type].src : '/workout_icons/default.png';

  return (
    <div className='workoutComponentContainer w-28 h-[95%] bg-white ml-1 flex flex-col rounded-sm relative'>
        <div className="type bg-gray-200 w-full h-[50%] flex justify-center items-center">
          <img src={workoutImage} className="workoutImage w-12 h-auto" />
        </div>
        <div className='workoutName w-full h-[25%] text-[11px] flex justify-center text-center mt-1'>{workout.workoutName} </div>
        <div className='w-auto h-[25%] flex justify-center items-center'>
          <button className='viewDetails text-[11px] w-[70%] h-5 mb-2' onClick={() => {setOverlay(prev => !prev) ; setShowWorkoutDetails(true) ; setSelectedWorkout(workout)}}>View details</button>
        </div>
        <i className="absolute text-[10px] text-blue-900 hover:opacity-50 cursor-pointer top-1 right-1 fa-solid fa-trash" onClick={() => {setDeleteConfirmation(true) ; setOverlay(prev => !prev) ; setWorkoutToDeleteId(workout.id)}}></i>
    </div>


  )
}

export default WorkoutComponent