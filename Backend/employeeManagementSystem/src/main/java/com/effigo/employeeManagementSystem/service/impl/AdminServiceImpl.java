package com.effigo.employeeManagementSystem.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.exception.CustomException;
import com.effigo.employeeManagementSystem.exception.UserNotFoundException;
import com.effigo.employeeManagementSystem.model.User;
import com.effigo.employeeManagementSystem.model.UserFile;
import com.effigo.employeeManagementSystem.model.User.ROLES;
import com.effigo.employeeManagementSystem.repository.UserFileRepository;
import com.effigo.employeeManagementSystem.repository.UserRepository;
import com.effigo.employeeManagementSystem.service.AdminService;
import com.effigo.employeeManagementSystem.service.IFileUploadService;

import jakarta.transaction.Transactional;

@Service
public class AdminServiceImpl implements AdminService {
    
    private final IFileUploadService fileUploadService;
    private final UserRepository userRepository;
    private final UserFileRepository userFileRepository;
	private final ModelMapper modelMapper;
    
    public AdminServiceImpl(IFileUploadService fileUploadService, UserRepository userRepository, 
    		UserFileRepository userFileRepository,ModelMapper modelMapper) {
        this.fileUploadService = fileUploadService;
        this.userRepository = userRepository;
        this.userFileRepository = userFileRepository;
        this.modelMapper=modelMapper;
    }
    
    @Override
	public List<UserDto> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream().map(user -> modelMapper.map(user,UserDto.class)).collect(Collectors.toList());
	}

    //modelMapper.map(savedUser, UserDto.class);
    
    
    @Override
	public UserDto updateUser(int userId, UserDto userDto) {
		User existingUser = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));

		// Update fields
		existingUser.setFirstName(userDto.getFirstName());
		existingUser.setLastName(userDto.getLastName());
		existingUser.setEmail(userDto.getEmail());
		existingUser.setMobileNo(userDto.getMobileNo());
		existingUser.setStatus(userDto.getStatus());
		existingUser.setRole(userDto.getRole());

		User updatedUser = userRepository.save(existingUser);
		// return modelMapper.map(updatedUser, UserDto.class);
		return modelMapper.map(updatedUser,UserDto.class);
	}

    
     @Override
    public UserDto assignRole(int userId, ROLES role) {
    	 User existingUser = userRepository.findById(userId)
                 .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));
    	
    	 existingUser.setRole(role);

 		User updatedUser = userRepository.save(existingUser);
    	return modelMapper.map(updatedUser, UserDto.class);
    }
    
    
    @Override
    @Transactional
    public String uploadFileForUser(int userId, MultipartFile document) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));

        try {
            String fileUrl = fileUploadService.uploadFile(document, userId);
            
            // Save file details to user_files table
            UserFile userFile = new UserFile(existingUser, document.getOriginalFilename(), fileUrl);
            userFileRepository.save(userFile);

            return fileUrl;
        } catch (Exception e) {
            throw new CustomException("File upload failed for user ID " + userId + ": " + e.getMessage());
        }
    }
    
    
    
}
