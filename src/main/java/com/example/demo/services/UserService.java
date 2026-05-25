package com.example.demo.services;

import java.util.List;
import com.example.demo.payloads.UserDto;

public interface UserService {
	
	UserDto registerNewUser(UserDto user);
	
	UserDto createUser(UserDto user);
	
	UserDto updateUser(UserDto user, Integer userId);
	
	UserDto getUserById(Integer userId);
	UserDto getUserByEmail(String email);
	
	List<UserDto> getAllUsers();
	
	void deleteUser(Integer userId);
}
