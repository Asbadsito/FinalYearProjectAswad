package com.example.BackEnd.User;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@GetMapping("api/users")
	public String sayHelloToUsers() {
		return "Hello users";
	}
}
