package com.effigo.employeeManagementSystem.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.exception.UserNotFoundException;
import com.effigo.employeeManagementSystem.model.User;
import com.effigo.employeeManagementSystem.model.User.ROLES;
import com.effigo.employeeManagementSystem.model.User.STATUS;
import com.effigo.employeeManagementSystem.repository.UserRepository;
import com.effigo.employeeManagementSystem.service.EmailService;
import com.effigo.employeeManagementSystem.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
    private PasswordEncoder passwordEncoder; // Autowired instead of creating a new instance
	
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private EmailService emailService;

	@Override
	public UserDto getUserById(int userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));
		return userToUserDto(user);
	}

	
	
	@Override
	public UserDto getUserByEmail(String userEmail) {
		User user = userRepository.findByEmail(userEmail)
				.orElseThrow(() -> new UserNotFoundException("User with email " + userEmail + " not found"));
		return userToUserDto(user);
	}
	
	@Override
	public UserDto addUser(UserDto userDto) {
	//	userDto.setRole(ROLES.USER);
		userDto.setRole(ROLES.ADMIN);
		userDto.setStatus(STATUS.ACTIVE);
		userDto.setRegisteredAt(LocalDateTime.now());
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

		User user = dtoToUser(userDto);
		

		User savedUser = userRepository.save(user);
	    List<String> adminEmails = userRepository.findEmailsByRole(User.ROLES.ADMIN);
	   emailService.sendEmailToAdmins(adminEmails, user.getFirstName());
		return modelMapper.map(savedUser, UserDto.class);
	}

	

    @Override
	public UserDto updateUser(int userId, UserDto userDto) {
		User existingUser = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));

		// Update fields
		existingUser.setFirstName(userDto.getFirstName());
		existingUser.setLastName(userDto.getLastName());
		//existingUser.setEmail(userDto.getEmail());
		existingUser.setMobileNo(userDto.getMobileNo());
		//existingUser.setStatus(userDto.getStatus());
		//existingUser.setRole(userDto.getRole());

		User updatedUser = userRepository.save(existingUser);
		// return modelMapper.map(updatedUser, UserDto.class);
		return modelMapper.map(updatedUser,UserDto.class);
	}

    
	
	



	
	private User dtoToUser(UserDto userDto) {
		return modelMapper.map(userDto, User.class);
	}

	private UserDto userToUserDto(User user) {
		return modelMapper.map(user, UserDto.class);
	}
	
	
	

}
