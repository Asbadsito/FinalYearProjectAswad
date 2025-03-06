package com.example.BackEnd.protectedEndpointExample;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/protectedResource")
public class protectedEndPointController {

	@GetMapping("/item")
	public ResponseEntity<String> protectedResourceExample() {
		return ResponseEntity.status(HttpStatus.OK).body("Hi im a protected resource");
	}

	@PostMapping("/createItem")
	public String protectedPostResource(){
		return "Your post request was successful";
	}

}
