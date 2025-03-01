package com.example.BackEnd.Auth.Login;

import com.example.BackEnd.User.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.startsWith;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@Transactional
@SpringBootTest
class LoginControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Test
	void loginUserThatDoesNotExist() throws Exception {
		String username = "testingUser1";
		String password = "testingPassword1";

		User user1 = new User(username, password);

		String jsonUser = objectMapper.writeValueAsString(user1);

		this.mockMvc.perform(post("/login/loginUser")
										.contentType(MediaType.APPLICATION_JSON)
										.content(jsonUser))
						.andExpect(status().isBadRequest());
	}

	@Test
	void loginUserThatExists() throws Exception {

		String username = "testingUser2";
		String password = "testingPassword2";

		User user2 = new User(username, password);

		String jsonUser = objectMapper.writeValueAsString(user2);

		this.mockMvc.perform(post("/registration/registerUser")
										.contentType(MediaType.APPLICATION_JSON)
										.content(jsonUser))
						.andExpect(status().isCreated());


		mockMvc.perform(post("/login/loginUser")
										.contentType(MediaType.APPLICATION_JSON)
										.content(jsonUser))
						.andExpect(status().isOk());
	}

	@Test
	void testTokenForExistingUser() throws Exception {
		String username = "testingUser3";
		String password = "testingPassword3";

		User user2 = new User(username, password);

		String jsonUser = objectMapper.writeValueAsString(user2);

		this.mockMvc.perform(post("/registration/registerUser")
										.contentType(MediaType.APPLICATION_JSON)
										.content(jsonUser))
						.andExpect(status().isCreated());

		this.mockMvc.perform(post("login/loginUser")
										.contentType(MediaType.APPLICATION_JSON)
										.content(jsonUser))
						.andExpect(status().isOk())
						.andExpect(header().string("Authorization", startsWith("Bearer ")));
	}


}