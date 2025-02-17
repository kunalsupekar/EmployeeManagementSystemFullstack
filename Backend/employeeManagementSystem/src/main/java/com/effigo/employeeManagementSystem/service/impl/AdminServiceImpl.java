package com.effigo.employeeManagementSystem.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.exception.CustomException;
import com.effigo.employeeManagementSystem.exception.UserNotFoundException;
import com.effigo.employeeManagementSystem.model.User;
import com.effigo.employeeManagementSystem.model.User.ROLES;
import com.effigo.employeeManagementSystem.model.User.STATUS;
import com.effigo.employeeManagementSystem.model.UserFile;
import com.effigo.employeeManagementSystem.repository.UserFileRepository;
import com.effigo.employeeManagementSystem.repository.UserRepository;
import com.effigo.employeeManagementSystem.service.AdminService;
import com.effigo.employeeManagementSystem.service.EmailService;
import com.effigo.employeeManagementSystem.service.IFileUploadService;

import jakarta.transaction.Transactional;

@Service
public class AdminServiceImpl implements AdminService {
    
    private final IFileUploadService fileUploadService;
    private final UserRepository userRepository;
    private final UserFileRepository userFileRepository;
	private final ModelMapper modelMapper;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder; // Autowired instead of creating a new instance
	
    public AdminServiceImpl(IFileUploadService fileUploadService, UserRepository userRepository, 
    		UserFileRepository userFileRepository,ModelMapper modelMapper,PasswordEncoder passwordEncoder
    		,EmailService emailService) {
        this.fileUploadService = fileUploadService;
        this.userRepository = userRepository;
        this.userFileRepository = userFileRepository;
        this.modelMapper=modelMapper;
        this.passwordEncoder=passwordEncoder;
        this.emailService=emailService;
    }
    
    @Override
	public List<UserDto> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream().map(user -> modelMapper.map(user,UserDto.class)).collect(Collectors.toList());
	}

    //modelMapper.map(savedUser, UserDto.class);
    
    @Override
    public List<UserDto> getAllUsersByRoles(ROLES role) {
    	List<User> users = userRepository.findUsersByRole(role);
		return users.stream().map(user -> modelMapper.map(user,UserDto.class)).collect(Collectors.toList());
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
		existingUser.setRole(userDto.getRole());
		if (!existingUser.getStatus().equals(userDto.getStatus())) {
		   // System.out.println("status change");
			emailService.sendEmailToUserWhenStatusChange(existingUser.getEmail(),
					existingUser.getFirstName(), userDto.getStatus());
		}

	
		existingUser.setStatus(userDto.getStatus());


		User updatedUser = userRepository.save(existingUser);
		// return modelMapper.map(updatedUser, UserDto.class);
		return modelMapper.map(updatedUser,UserDto.class);
	}
    
    
    @Override //this method is accessed by admin and only user can see;
    public List<UserDto> getAllUsersByStatus(STATUS status) {
    	// TODO Auto-generated method stub
    	List<User> users = userRepository.findByStatus(status);
		return users.stream()
				.filter(user-> user.getRole()==ROLES.USER)
				.map(user -> modelMapper.map(user,UserDto.class)).collect(Collectors.toList());
    }

    
	@Override
	public void deleteUserById(int userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));
		
		
		fileUploadService.deleteUserFolder(userId);
		userRepository.delete(user);
	}
    
     @Override
    public UserDto changeUserStatus(int userId, STATUS status) {
    	 User existingUser = userRepository.findById(userId)
                 .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));
    	
    	 existingUser.setStatus(status);
    	 emailService.sendEmailToUserWhenStatusChange(existingUser.getEmail(),
    			 existingUser.getFirstName(),status);
    	 User updatedUser = userRepository.save(existingUser);
    	return modelMapper.map(updatedUser, UserDto.class);
    }
    
    
     @Override
    public UserDto registerUserByEmail(UserDto userDto) {
    	 userDto.setRole(ROLES.USER);
 		userDto.setStatus(STATUS.PENDING);
 		userDto.setRegisteredAt(LocalDateTime.now());
 		String password=userDto.getPassword();
         userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
         User user = modelMapper.map(userDto, User.class);
 		User savedUser = userRepository.save(user);
 	    //List<String> adminEmails = userRepository.findEmailsByRole(User.ROLES.ADMIN);
 	     emailService.sendEmailToUser(savedUser.getEmail() , user.getFirstName() ,password);
 		return modelMapper.map(savedUser, UserDto.class);// TODO Auto-generated method stub
  
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
