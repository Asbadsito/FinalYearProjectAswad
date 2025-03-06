package com.example.BackEnd.Workout;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workout")
public class WorkoutController {

	private final WorkoutService workoutService;

	@Autowired
	public WorkoutController(WorkoutService workoutService) {
		this.workoutService = workoutService;
	}

	@PostMapping("/createWorkout/{userId}")
	public ResponseEntity<Workout> createNewWorkout(@RequestBody Workout workout , @PathVariable String userId){

	 if(workoutService.createNewWorkout(workout , userId) != null){
		 return ResponseEntity.status(HttpStatus.CREATED).body(workout);
	 }
	 else{
		 return ResponseEntity.badRequest().build();
	 }
	}

	@GetMapping("/getWorkoutById/{id}")
	public ResponseEntity<Workout> getWorkoutById(@PathVariable Long id){
		Workout workout = workoutService.getWorkoutById(id);
		if(workout != null){
			return ResponseEntity.status((HttpStatus.OK)).body(workout);
		}
		else{
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/deleteWorkoutById/{id}")
	public ResponseEntity<String> deleteWorkoutById(@PathVariable Long id){
		String message = workoutService.deleteWorkoutById(id);

		if(message.equalsIgnoreCase("success")){
			return ResponseEntity.status(HttpStatus.OK).body("Workout was deleted successfully");
		}
		else{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
		}
	}

	@PutMapping("/editWorkoutById/{id}")
	public ResponseEntity<String> editWorkoutById(@PathVariable Long id , @RequestBody Workout updatedWorkout){
		String message = workoutService.editWorkoutById(id , updatedWorkout);

		if(message.equalsIgnoreCase("success")){
			return ResponseEntity.status(HttpStatus.OK).body("Workout was edited successfully");
		}
		else{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
		}
	}

 @GetMapping("/getAllWorkoutsByUserId/{id}")
	public ResponseEntity<List> getAllWorkoutsByUserId(@PathVariable String id){

		List<Workout> listOfWorkout = workoutService.getAllWorkoutsByUserId(id);

		if(listOfWorkout.size() <= 0){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(listOfWorkout);
		}
		else{
			return ResponseEntity.status(HttpStatus.OK).body(listOfWorkout);
		}
 }

	@PostMapping("/test/{id}")
	public ResponseEntity<?> testEndpoint(@PathVariable String id) {
		return ResponseEntity.ok("JWT authentication worked!" + id);
	}
}
