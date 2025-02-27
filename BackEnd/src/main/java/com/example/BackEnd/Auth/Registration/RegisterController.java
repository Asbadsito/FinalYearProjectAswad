package com.example.BackEnd.Auth.Registration;


import com.example.BackEnd.User.User;
import com.example.BackEnd.User.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
public class RegisterController {

	private final UserService userService;

	@Autowired
	public RegisterController(UserService userService){
		this.userService = userService;
	}

	@PostMapping("/registerUser")
	public ResponseEntity<String> registerNewUser(@Valid @RequestBody User user){
		
      if(!(userService.doesUserExist(user.getUsername()))){
				 String message = userService.registerUser(user.getUsername(), user.getPassword());
				 if(message.equalsIgnoreCase("success")) {
					 return ResponseEntity.status(HttpStatus.CREATED)
									 .body("User has been created successfully, you can now Login");
				 }
				 else{
					 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
									 .body("There was an issue creating the user. Please try again.");
				 }
      }
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
										.body("The User with this username already exists, please Login");
	}

 }
