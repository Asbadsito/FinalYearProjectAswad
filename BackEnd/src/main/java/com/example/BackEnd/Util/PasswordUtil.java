package com.example.BackEnd.Util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordUtil {

	private final PasswordEncoder passwordEncoder;

	@Autowired
	public PasswordUtil(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}

	public String encodePassword(String password) {
		return this.passwordEncoder.encode(password);
	}

	public boolean validatePassword(String password){
		if(password.length() > 7
		&& password.matches("^(?=.*[0-9@$!%*?&]).{7,}$")
		&& password.length() < 30){
			return true;
		}
		return false;
	}
}
