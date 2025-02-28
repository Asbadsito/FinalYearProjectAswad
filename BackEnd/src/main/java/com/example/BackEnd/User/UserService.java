package com.example.BackEnd.User;
import com.example.BackEnd.Util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Random;
import java.util.logging.Logger;

@Service
public class UserService {
	private final UserRepository userRepository;
  private final Logger logger = Logger.getLogger(UserService.class.getName());

	private final PasswordUtil passwordUtil;
	private final int USER_ID_LENGTH = 5;
	private final String ALPHA_NUMERICAL_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	// More fields as needed

	@Autowired
	public UserService(UserRepository userRepository, PasswordUtil passwordUtil){
		this.userRepository = userRepository;
		this.passwordUtil = passwordUtil;
	}
	public Optional<User> getUserByName(String username){
		return userRepository.findByUsername(username);
	}

	public String registerUser(String username , String password){
		User user = new User();
		user.setUsername(username);

		if(passwordUtil.validatePassword(password)) {
			password = passwordUtil.encodePassword(password);
			user.setPassword(password);
		}
		else{
			return "Issue (Password not validated)";
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
