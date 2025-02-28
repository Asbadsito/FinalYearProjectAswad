package com.example.BackEnd.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

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

	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public User(){

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
