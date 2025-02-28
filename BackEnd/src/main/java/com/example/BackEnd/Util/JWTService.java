package com.example.BackEnd.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

	public String generateToken(String userName) {
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, userName);
	}

	private String createToken(Map<String, Object> claims, String userName) {
		return Jwts.builder()
						.claims(claims)
						.subject(userName)
						.issuedAt(new Date())
						.expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // Token valid for 30 minutes
						.signWith(getSignKey(), Jwts.SIG.HS512)
						.compact();
	}

	private SecretKey getSignKey() {
		return Jwts.SIG.HS512.key().build();
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
		return (username.equals(userDetails.getUsername()) && !checkIfTokenIsExpired(token));
	}
}
