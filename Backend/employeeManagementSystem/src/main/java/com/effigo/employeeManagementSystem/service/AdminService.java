package com.effigo.employeeManagementSystem.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.model.User.ROLES;


public interface AdminService {

	
	public String uploadFileForUser(int userId,MultipartFile document);

	public List<UserDto> getAllUsers();
	
	public UserDto updateUser(int userId,UserDto userDto);
	
	//g. Assign user roles (normal user/admin user)
	public UserDto assignRole(int userId,ROLES role);

	
	
}
