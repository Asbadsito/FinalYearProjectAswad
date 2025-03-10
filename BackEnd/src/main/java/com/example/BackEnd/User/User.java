package com.example.BackEnd.User;

import com.example.BackEnd.Workout.Workout;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "app_user")
public class User {

	@Id
	@Column(nullable = false , unique = true)

	private String id;
	@Column(nullable = false, unique = true)
	@NotNull(message = "Username cannot be null")
	@Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters")
	private String username;

	@NotNull(message = "Password cannot be null")
	@Size(min = 8, message = "Password must be at least 8 characters")
	private String password;

	@Column(nullable = false)
	private String role;


	public User(String username, String password) {
		this.username = username;
		this.password = password;
		this.role = "ROLE_USER";
	}

	public User(){
		this.role = "ROLE_USER";
	}

	public String getRole() {
		return role;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
