package com.example.BackEnd.Auth.Login;

import com.example.BackEnd.User.User;
import com.example.BackEnd.User.UserDTO;
import com.example.BackEnd.User.UserRepository;
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

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/login")
public class LoginController {

	private final UserService userService;
	private final JWTService jwtService;
	private final UserRepository userRepository;

	@Autowired
	public LoginController(UserService userService, JWTService jwtService , UserRepository userRepository) {
		this.userService = userService;
		this.jwtService = jwtService;
		this.userRepository = userRepository;
	}

	@PostMapping("/loginUser")
	public ResponseEntity<UserDTO> loginNewUser(@Valid @RequestBody User user) {
		String message = userService.loginUser(user.getUsername(), user.getPassword());

		if (message.equalsIgnoreCase("success")) {

			List<String> roles = Arrays.asList(user.getRole());

			Optional<User> user1 = userRepository.findByUsername(user.getUsername());

			if(user1.isPresent()) {
				String jsonToken = jwtService.generateToken(user.getUsername(), roles);
				UserDTO userDTO = new UserDTO(user1.get().getUsername() , user1.get().getId());
				return ResponseEntity.status(HttpStatus.OK)
								.header(HttpHeaders.AUTHORIZATION, "Bearer " + jsonToken)
								.body(userDTO);
			}
			else{
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserDTO(message, ""));
			}
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserDTO(message , ""));
		}
	}
}



