package com.example.BackEnd.Auth.Registration;

import com.example.BackEnd.User.User;
import com.example.BackEnd.User.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class RegisterControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void registerNewUser() throws Exception{

		// We create 3 random user classes.
		User user1 = new User("test_username1" , "randomPassword1");
		User user2 = new User("test_username2" , "randomPassword2");
		User user3 = new User("test_username3" , "randomPassword3");

		// Here I test http responses for this controller to see if users are being created using mockMVC
		String user1_json = objectMapper.writeValueAsString(user1);
		String user2_json = objectMapper.writeValueAsString(user2);
		String user3_json = objectMapper.writeValueAsString(user3);

		this.mockMvc.perform(post("/registration/registerUser")
						.contentType(MediaType.APPLICATION_JSON)
						.content(user1_json))
						.andExpect(status().isCreated()
		);

		this.mockMvc.perform(post("/registration/registerUser")
						.contentType(MediaType.APPLICATION_JSON)
						.content(user2_json))
						.andExpect(status().isCreated()
		);

		this.mockMvc.perform(post("/registration/registerUser")
						.contentType(MediaType.APPLICATION_JSON)
						.content(user3_json))
						.andExpect(status().isCreated()
						);
	}
}