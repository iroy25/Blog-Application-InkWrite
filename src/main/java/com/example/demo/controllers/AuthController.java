package com.example.demo.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.payloads.JwtAuthRequest;
import com.example.demo.payloads.JwtAuthResponse;
import com.example.demo.payloads.UserDto;
import com.example.demo.security.JwtTokenHelper;
import com.example.demo.services.UserService;


@RestController
@RequestMapping("/api/v1/auth/")
public class AuthController {
	
	@Autowired
	private JwtTokenHelper jwtTokenHelper;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> createToken(
			@RequestBody JwtAuthRequest request
			) throws Exception{
		System.out.println("EMAIL FROM FRONTEND = [" + request.getEmail() + "]");
		this.authenticate(request.getEmail(), request.getPassword());
		UserDetails userDetails=this.userDetailsService.loadUserByUsername(request.getEmail());
		
		String token = this.jwtTokenHelper.generateToken(userDetails);
		JwtAuthResponse response= new JwtAuthResponse();
		response.setToken(token);
		return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);
		
	}


	private void authenticate(String username, String password) throws Exception {
		
		UsernamePasswordAuthenticationToken authenticationToken 
		= new UsernamePasswordAuthenticationToken(username, password);
		try {
		this.authenticationManager.authenticate(authenticationToken);
		}catch(BadCredentialsException e){
			System.out.println("Invalid details!");
			throw new BadCredentialsException("Invalid username or password!");
			
		}
	}
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserDto userDto){
		try {
			UserDto registeredUser = this.userService.registerNewUser(userDto);
			return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/current-user")
	public ResponseEntity<UserDto> getCurrentUser(Principal principal) {
	    UserDto user = this.userService.getUserByEmail(principal.getName());
	    return ResponseEntity.ok(user);
	}

}



















