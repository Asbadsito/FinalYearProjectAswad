package com.example.BackEnd.Auth.Login;

import com.example.BackEnd.User.User;
import com.example.BackEnd.User.UserService;
import com.example.BackEnd.Util.JWTService;
import jakarta.validation.Valid;
import org.hibernate.internal.build.AllowNonPortable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/login")
public class LoginController {

	private final UserService userService;
	private final JWTService jwtService;

	@Autowired
	public LoginController(UserService userService, JWTService jwtService) {
		this.userService = userService;
		this.jwtService = jwtService;
	}

	@PostMapping("/loginUser")
	public ResponseEntity<String> loginNewUser(@Valid @RequestBody User user) {
		String message = userService.loginUser(user.getUsername(), user.getPassword());

		if (message.equalsIgnoreCase("success")) {
			String jsonToken = jwtService.generateToken(user.getUsername());
			return ResponseEntity.status(HttpStatus.OK)
							.header(HttpHeaders.AUTHORIZATION, "Bearer " + jsonToken)
							.body(user.getUsername());

		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
		}
	}
}



