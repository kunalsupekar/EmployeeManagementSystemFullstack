package com.effigo.employeeManagementSystem.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImportUserService {
	
	public void importUserFromFile(MultipartFile file);
}
