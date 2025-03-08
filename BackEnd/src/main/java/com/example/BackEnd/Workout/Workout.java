package com.example.BackEnd.Workout;


import com.example.BackEnd.User.User;
import com.example.BackEnd.User.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

	private String type;

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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@JsonIgnore
	public User getUser() {
		return user;
	}

	@JsonProperty("user")
	public UserDTO getUserDTO(){
		return new UserDTO(this.user.getUsername() , this.user.getId());
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

	public List<Exercise> getListOfExercises() {
		return listOfExercises;
	}

	public void setListOfExercises(List<Exercise> listOfExercises) {
		this.listOfExercises = listOfExercises;
	}
}
