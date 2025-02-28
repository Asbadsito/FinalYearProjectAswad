package com.example.BackEnd.Filter;


import com.example.BackEnd.User.User;
import com.example.BackEnd.User.UserService;
import com.example.BackEnd.Util.CustomUserDetails;
import com.example.BackEnd.Util.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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

	private final JWTService jwtService;
	private final UserService userService;

	@Autowired
	public JWTFilter (@Lazy JWTService jwtService , UserService userService){
		this.jwtService = jwtService;
		this.userService = userService;
	}
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		//We continue the filter chain without making use of the JWTfilter for login or registration endpoints
		if (request.getServletPath().contains("/registration") || request.getServletPath().contains("/login")) {
			filterChain.doFilter(request, response);
			return;
		}

		final String authorizationHeader = request.getHeader("Authorization");

		String jwtToken = null;
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			jwtToken = authorizationHeader.substring(7);
		}

		if (jwtToken != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			String username = jwtService.extractUsername(jwtToken);

			if (username != null && userService.getUserByName(username).isPresent()) {
				User user = userService.getUserByName(username).orElseThrow(() -> new ServletException("User not found"));
				CustomUserDetails userDetails = new CustomUserDetails(user);

				if (jwtService.validateToken(jwtToken, userDetails)) {
					UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
									userDetails, null, userDetails.getAuthorities());
					authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				}
			}
		}
		filterChain.doFilter(request, response);
	}
}

