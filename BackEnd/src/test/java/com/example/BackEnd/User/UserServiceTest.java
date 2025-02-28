package com.example.BackEnd.User;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.any;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class UserServiceTest {

	@Mock
	private UserRepository userRepository;

	@InjectMocks
	private UserService userService;

	@Test
	void itShouldRegisterUser() {
			User user1 = new User("TestingUser" , "TestingUserPassword1" );
			when(userRepository.save(ArgumentMatchers.any(User.class))).thenReturn(user1);

			//Testing the method register here :

			String messageOfRegistration = userService.registerUser(user1.getUsername() , user1.getPassword());
			assertEquals("success", messageOfRegistration);
	}

	@Test
	void itShouldFailRegistration(){
		User user2 = new User("TestingUser" , "TestingUserPassword");

		//Here I mock a run time exception when saving the user,so that registerUser handles it and returns the issue message as expected
		when(userRepository.save(ArgumentMatchers.any(User.class))).thenThrow(new RuntimeException("Database error. User could not be saved"));

		String messageOfRegistration = userService.registerUser(user2.getUsername() , user2.getPassword());
		assertEquals("Issue" , messageOfRegistration);
	}
}