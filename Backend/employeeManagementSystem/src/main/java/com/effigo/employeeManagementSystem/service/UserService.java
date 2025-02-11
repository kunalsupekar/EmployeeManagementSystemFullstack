package com.effigo.employeeManagementSystem.service;

import java.util.List;

import com.effigo.employeeManagementSystem.dto.UserDto;

public interface UserService {

	
	//public List<UserDto> getAllUsers();
	
	
	
	
	
	
	public UserDto addUser(UserDto userDto);

	public UserDto getUserById(int userId);



	public UserDto getUserByEmail(String userEmail);



	public UserDto updateUser(int userId, UserDto userDto);
	

	
}
