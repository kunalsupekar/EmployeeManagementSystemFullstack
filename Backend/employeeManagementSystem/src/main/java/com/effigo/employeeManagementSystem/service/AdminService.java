package com.effigo.employeeManagementSystem.service;

import java.io.ObjectInputFilter.Status;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.model.User.ROLES;
import com.effigo.employeeManagementSystem.model.User.STATUS;


public interface AdminService {

	
	public String uploadFileForUser(int userId,MultipartFile document);

	public List<UserDto> getAllUsers();
	
	public UserDto updateUser(int userId,UserDto userDto);
	
	//g. Assign user roles (normal user/admin user)
	public UserDto changeUserStatus(int userId,STATUS status);

	public List<UserDto> getAllUsersByRoles(ROLES role);
	
	public List<UserDto> getAllUsersByStatus(STATUS status);

	
	public void deleteUserById(int userId);
	
	
}
