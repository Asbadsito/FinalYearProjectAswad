import React from 'react'
import './CreateWorkout.css'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const CreateWorkout = ( {showCreateWorkout , setShowCreateWorkout , setOverlay} ) => {

  {/* SELECTED WORKOUT info for sending via the post request for the workout creation */}
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("");
  const[createWorkoutName , setCreateWorkoutName] = useState("");
  const[listOfExerciseForWorkout , setListOfExerciseForWorkout] = useState([]);


  const[showExercisePage , setShowExercisePage] = useState(false);
  const[exerciseData , setExercisesData] = useState([]);

  {/* Selected EXERCISE info to set up a exercise*/}
    const [selectedExerciseName, setSelectedExerciseName] = useState(null);
    const [selectedExerciseImage, setSelectedExerciseImage] = useState(null);
    const [selectedExerciseType, setSelectedExerciseType] = useState("SET_BASED");
    const [sets, setSets] = useState(null);
    const [reps, setReps] = useState(null);
    const [duration, setDuration] = useState(null);


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

    useEffect (() => {

    getAPIforExercises();
    
  } , [])

   useEffect(() => {
    fetch('/exercises/exercises.json')
      .then(response => response.json())
      .then(data => {setExercisesData(data) ; console.log(data)})
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);


    console.log(showCreateWorkout);

    const getAPIforExercises = async () => {

    const options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises',
      params: {
        limit: '0',
        offset: '0'
      },
      headers: {
        'x-rapidapi-key': '4cbea9721fmsh9fc17eb8027aab9p1f0303jsn0654b11c6c3b',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const filteredData = response.data.map(exercise => ({
      name: exercise.name,
      gifUrl: exercise.gifUrl 
    }));

    localStorage.setItem('exercises', JSON.stringify(filteredData));
    } catch (error) {
      console.error(error);
    }
    
  }


  return (
    <div className={`createWorkoutContainer lg:w-[600px] lg:h-[500px] sm:w-[500px] sm:h-[500px] w-[350px] h-[450px] absolute z-50 
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
        <div className='w-full flex justify-center mt-4'>
          <button className='addExerciseButton w-28 text-[13px] h-6' onClick={() => {setShowExercisePage(true)}}>Add Exercise</button>
        </div>

            {/* The absolute divs are below this, anything that is supposed to be in the 
            container and not conditionally shown SHOULD NOT be below this part to keep it organsied,otherwise it would be too hard
            to read*/ }

            <i class="close fa-solid fa-x absolute top-4 right-6" onClick={() => {setOverlay(prev => !prev) ; setShowCreateWorkout(false) ; setShowExercisePage(false)}}></i>
            {showExercisePage && (<div className='excercisePage absolute w-[90%] h-[65%] border top-12 bg-white left-[5%] z-60 overflow-auto'>
              
                <div className="exerciseGrid flex flex-wrap justify-center gap-4 p-4 ">
                    {exerciseData.map((exercise, index) => (
                      <div
                        key={index}
                        className="exerciseCard w-[15%] h-[15%] bg-white p-4 flex flex-col items-center justify-center border rounded-lg cursor-pointer"
                        onClick={() => {
                          setSelectedExerciseName(exercise.name);
                          setSelectedExerciseImage(exercise.imgUrl);
                        }}
                      >
                        <img
                          src={exercise.imgUrl}
                          alt={exercise.name}
                          className="w-full h-full object-contain mb-2 rounded-lg"
                        />
                        <div className="exerciseName text-center text-[9px]">{exercise.name}</div>
                      </div>
                    ))}
                  </div>

            </div>)}

            {showExercisePage && (<div className='containerSelection absolute bg-white w-[90%] h-[25%] border bottom-11 left-[5%] z-60 flex'> 

              <div className='w-[22%] h-[80%] border-2 rounded-lg mt-2 ml-4'>
                <img src={selectedExerciseImage} className='w-full h-full'></img>
              </div>

              <div className='text-[14px] w-[70%] h-[80%] ml-2 mt-3 flex relative'>
                <span className='spanExName ml-4 h-[60px] w-28 text-[14px]'>{selectedExerciseName}</span>
                <div className="absolute w-48 h-8 top-1 right-9 flex pl-8">
                  <div className={`px-2 py-1 text-[11px] w-36 h-6 bg-gray-100 text-black cursor-pointer hover:opacity-90 text-center ${selectedExerciseType === "SET_BASED" ? "text-white bg-blue-900" : ""}`}
                       onClick={() => {setSelectedExerciseType("SET_BASED")}}
                  >
                    SET BASED
                  </div>
                  <div className={`px-2 py-1 text-[11px] w-36 h-6 bg-gray-100 text-black  cursor-pointer hover:opacity-90 text-center ${selectedExerciseType === "TIMED" ? "text-white bg-blue-900" : ""}`}
                       onClick={() => {setSelectedExerciseType("TIMED")}}
                  >
                    TIMED
                  </div>
                </div>
              </div>

            </div>)}
   </div>
  )

}

export default CreateWorkout
