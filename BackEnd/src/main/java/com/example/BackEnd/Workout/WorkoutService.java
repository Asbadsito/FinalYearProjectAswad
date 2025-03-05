package com.example.BackEnd.Workout;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkoutService {

	private final WorkoutRepository workoutRepository;

	@Autowired
	public WorkoutService(WorkoutRepository workoutRepository){
		this.workoutRepository = workoutRepository;
	}
	public void saveWorkout(Workout workout){
		workoutRepository.save(workout);
	}
}
