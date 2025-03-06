package com.example.BackEnd.Workout;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Repository
public interface WorkoutRepository extends JpaRepository<Workout , Long> {
	List<Workout> findAllWorkoutsByUserId(String id);

	void deleteWorkoutById (Long id);
}
