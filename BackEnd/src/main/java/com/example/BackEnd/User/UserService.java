package com.example.BackEnd.User;
import com.example.BackEnd.Util.CustomUserDetails;
import com.example.BackEnd.Util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Random;
import java.util.logging.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserService {
	private final UserRepository userRepository;
  private final Logger logger = Logger.getLogger(UserService.class.getName());

	private final PasswordEncoder passwordEncoder;

	private final PasswordUtil passwordUtil;
	private final int USER_ID_LENGTH = 7;
	private final String ALPHA_NUMERICAL_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	// More fields as needed

	@Autowired
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, PasswordUtil passwordUtil){
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.passwordUtil = passwordUtil;
	}
	public Optional<User> getUserByName(String username){
		return userRepository.findByUsername(username);
	}

	// This method might not be necessary in the jwt filter, spring security uses UserDetails ,  so I thought of wrapping my user just in case
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<User> user = userRepository.findByUsername(username);

		if(user.isEmpty()){
			throw new UsernameNotFoundException("User not found");
		}
		return new CustomUserDetails(user.get());
	}

	public String registerUser(String username , String password){
		User user = new User();
		user.setUsername(username);

		if(passwordUtil.validatePassword(password)) {
			password = passwordUtil.encodePassword(password);
			user.setPassword(password);
		}
		else{
			return "Please enter a password of at least 7 characters AND 1 non-letter character";
		}
		user.setId(createRandomId());

	 try{
		 userRepository.save(user);
		 logger.info("User : " + user.getUsername() + " has been saved to the database successfully !");
		 return "success";
	 }
	 catch (Exception e){

		  String errorMessage = "Issue";
			logger.info(errorMessage + user);
			logger.info(e.getMessage());
			return errorMessage;
	 }
	}

	public String loginUser(String username , String password){

		Optional<User> possibleUser = userRepository.findByUsername(username);
		if(possibleUser.isEmpty()){
			return "User was not found. Please register";
		}
		User user1 = possibleUser.get();

		if(!(passwordUtil.validatePassword(password))){
			return "This is not a valid password";
		}

		if(passwordEncoder.matches(password , user1.getPassword())){
			logger.info("A user has logged in!");
			return "success";
		}
		else {
			return "Password was incorrect, please try again";
		}
	}

	public boolean doesUserExist(String username){
		return userRepository.findByUsername(username).isPresent();
	}

	private String createRandomId() {
		String id = "#" + getRandomString();

		if(userRepository.existsById(id)){
			while (userRepository.existsById(id)){
				id = "#" + getRandomString();
			}
		}
		return id;
	}

	private String getRandomString(){

		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		for (int i = 0; i < USER_ID_LENGTH ; i++) {
			int index = random.nextInt(ALPHA_NUMERICAL_CHARACTERS.length());
			sb.append(ALPHA_NUMERICAL_CHARACTERS.charAt(index));
		}

		return sb.toString();

	}

}
