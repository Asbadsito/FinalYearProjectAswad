package com.example.BackEnd.Workout;
import com.example.BackEnd.User.User;
import com.example.BackEnd.User.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

	private final WorkoutRepository workoutRepository;
	private final Logger logger = LoggerFactory.getLogger(WorkoutService.class);
	private final UserRepository userRepository;
	@Autowired
	public WorkoutService(WorkoutRepository workoutRepository , UserRepository userRepository){
		this.workoutRepository = workoutRepository;
		this.userRepository = userRepository;
	}
	public void saveWorkout(Workout workout){
		try{
			workoutRepository.save(workout);
		}
		catch (Exception e){
			logger.info("Saving the user was unsuccessful, there was an issue:  " + e.getMessage() );
		}
	}


	public Workout getWorkoutById(Long id){
		Optional <Workout> workout = workoutRepository.findById(id);

		if(workout.isEmpty()){
			throw new RuntimeException("You tried to access a workout that does not exist");
		}

		return workout.get();
	}

	public Workout createNewWorkout(Workout workout, String userId){
		if(checkIfWorkoutIsValid(workout)){
			try{
				Optional<User> user1 = userRepository.findById(userId);
				if(user1.isPresent()) {
					workout.setUser(user1.get());
					return workoutRepository.save(workout);
				}
			}
			catch (Exception e){
				logger.info("Issue saving workout : " + e.getMessage());
			}
		}
		else{
			logger.info("Workout was not valid");
			throw new InvalidWorkoutException("Workout was not valid");
		}
		throw new IllegalStateException("Something unexpected happened while creating a new workout");
	}

	public String editWorkoutById(Long id , Workout updatedWorkout){
		Optional<Workout> workout = workoutRepository.findById(id);

		if(workout.isEmpty()){
			return "failed";
		}
		else{
			workout.get().setWorkoutName(updatedWorkout.getWorkoutName());
			workout.get().setListOfExercises(updatedWorkout.getListOfExercises());

			workoutRepository.save(workout.get());
			return "success";
		}
	}

	@Transactional
	public String deleteWorkoutById(Long id){
		Optional<Workout> workout = workoutRepository.findById(id);

		if(workout.isEmpty()){
			throw new InvalidWorkoutException("Workout not found");
		}

		try{
			workoutRepository.deleteWorkoutById(id);
			return "success";
		}
		catch (Exception e){
			logger.info("Workout deletion went wrong : " + e.getMessage());
			return "failed";
		}

	}
	public boolean checkIfWorkoutIsValid(Workout workout) {
		if (workout == null ) {
			logger.info("Workout was null, its name was null or the list of exercises was too small");
			return false;
		}
		if(workout.getWorkoutName() == null){
			logger.info("Name was null");
			return false;
		}
		if(workout.getListOfExercises() == null || workout.getListOfExercises().isEmpty()){
			logger.info("List of exercises was null or empty");
			return false;
		}
		return true;
	}

	public List<Workout> getAllWorkoutsByUserId(String id){
		if(userRepository.findById(id).isEmpty()){
			throw new RuntimeException("Tried to access a user that does not exist");
		}
		// Here just to know that theree exists a user with that Id. Then I'll retrieve the workouts from the repo

		try{
			return workoutRepository.findAllWorkoutsByUserId(id);
		}
		catch (Exception e ){
			logger.info("Database operation failed to get all workouts by user id : " + e.getMessage());
		}
		throw new RuntimeException("Something unexpected happened");
	}
}
