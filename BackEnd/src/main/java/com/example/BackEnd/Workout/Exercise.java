package com.example.BackEnd.Workout;


import jakarta.persistence.Embeddable;

@Embeddable
public class Exercise {
	private String name;
	private EXCERCISE_TYPE exerciseType;

	private String img_URL;

	private Integer duration; // In seconds, this should be optional
	private Integer sets;
	private Integer reps;

	public Exercise(String name, EXCERCISE_TYPE exerciseType, String img_URL, Integer duration, Integer sets, Integer reps) {
		this.name = name;
		this.exerciseType = exerciseType;
		this.img_URL = img_URL;
		this.duration = (duration != null ? duration : 0);
		this.sets = (sets != null ? sets : 0);
		this.reps = (reps != null ? reps : 0);
	}

	public Exercise() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public EXCERCISE_TYPE getExerciseType() {
		return exerciseType;
	}

	public void setExerciseType(EXCERCISE_TYPE exerciseType) {
		this.exerciseType = exerciseType;
	}

	public String getImg_URL() {
		return img_URL;
	}

	public void setImg_URL(String img_URL) {
		this.img_URL = img_URL;
	}

	public int getDuration() {
		return duration == null ? 0 : duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public int getSets() {
		return  sets == null ? 0 : sets;
	}

	public void setSets(Integer sets) {
		this.sets = sets;
	}

	public int getReps() {
		return  reps == null ? 0 : reps;
	}

	public void setReps(Integer reps) {
		this.reps = reps;
	}

	@Override
	public String toString() {
		return "Excercise{" +
						"name='" + name + '\'' +
						", excerciseType=" + exerciseType +
						", img_URL='" + img_URL + '\'' +
						", duration=" + duration +
						", sets=" + sets +
						", reps=" + reps +
						'}';
	}
}
