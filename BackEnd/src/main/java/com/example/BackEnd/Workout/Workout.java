package com.example.BackEnd.Workout;


import com.example.BackEnd.User.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Workout")
public class Workout {

	@Id
	@Column(nullable = false , unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
	private User user;

	private LocalDate timeOfCreation = LocalDate.now();
	@Column(nullable = false)
	@NotNull(message = "name of the workout cannot be null")
	@Size(min = 1 , max = 30)
	private String workoutName;

	@ElementCollection
	@CollectionTable(name = "workout_exercises", joinColumns = @JoinColumn(name = "workout_id"))
	private List<Exercise> listOfExercises = new ArrayList<>();

	public Workout(User user, LocalDate timeOfCreation, String workoutName, List<Exercise> listOfExercises) {
		this.user = user;
		this.timeOfCreation = timeOfCreation;
		this.workoutName = workoutName;
		this.listOfExercises = listOfExercises;
	}

	public Workout (){

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LocalDate getTimeOfCreation() {
		return timeOfCreation;
	}

	public void setTimeOfCreation(LocalDate timeOfCreation) {
		this.timeOfCreation = timeOfCreation;
	}

	public String getWorkoutName() {
		return workoutName;
	}

	public void setWorkoutName(String workoutName) {
		this.workoutName = workoutName;
	}

	public List<Exercise> getListOfExcercises() {
		return listOfExercises;
	}

	public void setListOfExcercises(List<Exercise> listOfExercises) {
		this.listOfExercises = listOfExercises;
	}
}
