package com.example.BackEnd.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.function.Function;

@Service
public class JWTService {

	@Value("${jwt.secret}")
	private String secret;

	private static final Logger logger = LoggerFactory.getLogger(JWTService.class);

	public String generateToken(String userName, List<String> roles) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("roles", roles);
		return createToken(claims, userName);
	}

	private String createToken(Map<String, Object> claims, String userName) {
		return Jwts.builder()
						.claims(claims)
						.subject(userName)
						.issuedAt(new Date())
						.expiration(new Date(System.currentTimeMillis() + 10 * 60 * 60 * 1000))
						.signWith(getSignKey(), Jwts.SIG.HS512)
						.compact();
	}

	private SecretKey getSignKey() {
		return new SecretKeySpec(secret.getBytes(), "HmacSHA512");
	}
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaims(token);
		return claimsResolver.apply(claims);
	}
	private Claims getAllClaims(String token) {
		return Jwts.parser()
						.verifyWith(getSignKey())
						.build()
						.parseSignedClaims(token)
						.getPayload();
	}

	private Boolean checkIfTokenIsExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		logger.info("Extracted username from token: " + username);
		logger.info("Username from userDetails: " + userDetails.getUsername());
		return (username.equals(userDetails.getUsername()) && !checkIfTokenIsExpired(token));
	}
}
