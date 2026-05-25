package com.example.demo.services.impl;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.exceptions.* ;
import com.example.demo.config.AppConstants;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.payloads.UserDto;
import com.example.demo.repositories.RoleRepo;
import com.example.demo.repositories.UserRepo;
import com.example.demo.services.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepo roleRepo;
	
	
	@Override
	public UserDto registerNewUser(UserDto userDto) {
		User user=this.modelMapper.map(userDto , User.class);

		user.setPassword(this.passwordEncoder.encode(userDto.getPassword()));

		Role role= this.roleRepo.findById(AppConstants.NORMAL_USER).get();
		user.getRoles().add(role); 
		User newUser=this.userRepo.save(user);
		System.out.println("Raw password: " + userDto.getPassword());
		System.out.println("Encoded password: " + user.getPassword());
		return this.modelMapper.map(newUser, UserDto.class);
	}
	
	@Override
	public UserDto createUser(UserDto userDto) {
		
		User user=this.DtoToUser(userDto);
		User savedUser= this.userRepo.save(user);
		
		return this.UsertoDTO(savedUser);
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {
	    User user = this.userRepo.findById(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));

	    user.setName(userDto.getName());
	    user.setAbout(userDto.getAbout());

	  
	    if (!user.getEmail().equals(userDto.getEmail())) {

	        boolean emailTaken = this.userRepo.findByEmail(userDto.getEmail())
	        		.filter(existing -> !Integer.valueOf(existing.getUserId()).equals(Integer.valueOf(userId)))
	                .isPresent();

	        if (emailTaken) {
	            throw new ResourceNotFoundException("Email already in use", "email", 0);
	        }

	        user.setEmail(userDto.getEmail());
	    }

	
	    if (userDto.getPassword() != null && !userDto.getPassword().isBlank()) {
	        user.setPassword(this.passwordEncoder.encode(userDto.getPassword())); // ✅ encode it
	    }

	    User updatedUser = this.userRepo.save(user);
	    return this.UsertoDTO(updatedUser);
	}

	@Override
	public UserDto getUserById(Integer userId) {
		User user=this.userRepo.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("User","Id",userId));
		
		return this.UsertoDTO(user);
	}
	@Override
	public UserDto getUserByEmail(String email) {
	    User user = this.userRepo.findByEmail(email)
	        .orElseThrow(() -> new ResourceNotFoundException("User", "Email", 0));
	    return this.UsertoDTO(user);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users=this.userRepo.findAll();
		List<UserDto> UserDtos = users.stream().map(user->this.UsertoDTO(user)).collect(Collectors.toList());
				
		return UserDtos;
	}

	@Override
	public void deleteUser(Integer userId) {
		User user = this.userRepo.findById(userId)
		.orElseThrow(()-> new ResourceNotFoundException("User","Id",userId));
		user.getRoles().clear();
		this.userRepo.save(user);
		this.userRepo.delete(user);
	}
	
	public User DtoToUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);		
		return user;
	}
	
	public UserDto UsertoDTO(User user) {
		UserDto userDto= this.modelMapper.map(user, UserDto.class);
		return userDto ;
	}


}































