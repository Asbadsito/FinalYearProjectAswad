package com.example.BackEnd.Workout;

public class InvalidWorkoutException extends RuntimeException{
	public InvalidWorkoutException(String message){
		super(message);
	}
	public InvalidWorkoutException(String message, Throwable cause) {
		super(message, cause);
	}

}
