package com.effigo.employeeManagementSystem.service.impl;

import java.util.List;
import java.util.stream.Collectors;

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

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

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
	public UserDto addUser(UserDto userDto) {
		userDto.setRole(ROLES.USER);
		userDto.setStatus(STATUS.PENDING);
		User user = dtoToUser(userDto);
		

		User savedUser = userRepository.save(user);
	    List<String> adminEmails = userRepository.findEmailsByRole(User.ROLES.ADMIN);
	  // emailService.sendEmailToAdmins(adminEmails, user.getFirstName());
		return modelMapper.map(savedUser, UserDto.class);
	}

	

	@Override
	public void deleteUserById(int userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));
		userRepository.delete(user);
	}

	
	private User dtoToUser(UserDto userDto) {
		return modelMapper.map(userDto, User.class);
	}

	private UserDto userToUserDto(User user) {
		return modelMapper.map(user, UserDto.class);
	}

}
