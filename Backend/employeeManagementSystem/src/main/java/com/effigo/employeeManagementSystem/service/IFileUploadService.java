package com.effigo.employeeManagementSystem.service;

import org.springframework.web.multipart.MultipartFile;

public interface IFileUploadService {
	 String uploadFile(MultipartFile file, int userId);
}
