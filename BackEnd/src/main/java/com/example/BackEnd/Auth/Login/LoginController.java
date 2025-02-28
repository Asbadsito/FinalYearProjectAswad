package com.example.BackEnd.Auth.Login;

import com.example.BackEnd.User.User;
import com.example.BackEnd.User.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

	private final UserService userService;

	public LoginController(UserService userService){
		this.userService = userService;
	}

	@PostMapping("/loginUser")
	public ResponseEntity<String> loginNewUser(@Valid @RequestBody User user){
		String message = userService.loginUser(user.getUsername() , user.getPassword());

		if(message.equalsIgnoreCase("success")){
			return ResponseEntity.status(HttpStatus.OK).body(message);
		}
		else{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
		}
	}
}

