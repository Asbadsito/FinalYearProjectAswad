package com.example.BackEnd.Filter;


import com.example.BackEnd.User.User;
import com.example.BackEnd.User.UserService;
import com.example.BackEnd.Util.CustomUserDetails;
import com.example.BackEnd.Util.JWTService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

	private static final Logger logger = LoggerFactory.getLogger(JWTFilter.class);
	private final JWTService jwtService;
	private final UserService userService;

	@Autowired
	public JWTFilter (@Lazy JWTService jwtService , UserService userService){
		this.jwtService = jwtService;
		this.userService = userService;
	}
	@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

		logger.info("If user has reached here the filter has started :");
		//Here it continues the filter chain without making use of the JWTfilter for login or registration endpoints
		if (request.getServletPath().equals("/registration/registerUser") || request.getServletPath().equals("/login/loginUser")) {
			filterChain.doFilter(request, response);
			logger.info("THe user has skipped the jwt filter!");
			return;
		}


		final String authorizationHeader = request.getHeader("Authorization");

		String jwtToken = null;
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			jwtToken = authorizationHeader.substring(7);
			logger.info("1.A user has tried to access and its token has been found and extracted");
			logger.info("Token is this : " + jwtToken);
		}

		if (jwtToken != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			String username = null;

			try {
				username = jwtService.extractUsername(jwtToken);
				logger.info("2.Username extracted : " + username);
			}
			catch(ExpiredJwtException e){
				logger.info("JWT token has expired: " + e.getMessage());
			}
			catch (Exception e){
				logger.info("Failed to extract username");
			}

			if (username != null && userService.getUserByName(username).isPresent()) {
				User user = userService.getUserByName(username).orElseThrow(() -> new ServletException("The user was not found"));
				CustomUserDetails userDetails = new CustomUserDetails(user);
				logger.info("3.Username found for this token");

				if (jwtService.validateToken(jwtToken, userDetails)) {
					logger.info("3.5.Starting the security authentication!");
					UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
									userDetails, null, userDetails.getAuthorities());
					authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
					logger.info("4.Token was validated and user was authenticated");
				}
				else{
					logger.info("Token was not validated");
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					response.getWriter().write("If this is the message it means that the token was not validated");
					return;
				}
			}
			else{
				logger.info("Username could not be found for that token");
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				response.getWriter().write("Username could not be found for that token. Could not authenticate");
				return;
			}
		}
		else {
			logger.info("JWT Error - JWT filter ");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write("JWT token error. Could not authenticate");
			return;
		}
		filterChain.doFilter(request, response);
	}
}

