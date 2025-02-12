package com.effigo.employeeManagementSystem.service.impl;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.model.User;
import com.effigo.employeeManagementSystem.model.User.ROLES;
import com.effigo.employeeManagementSystem.model.User.STATUS;
import com.effigo.employeeManagementSystem.repository.UserRepository;
import com.effigo.employeeManagementSystem.service.EmailService;
import com.effigo.employeeManagementSystem.service.ImportUserService;

import jakarta.transaction.Transactional;

@Service
public class ImportUserServiceImpl implements ImportUserService {

	
	@Autowired
     private PasswordEncoder passwordEncoder;
	
     @Autowired
 	private UserRepository userRepository;
     
     @Autowired
     private EmailService emailService;
     
     @Autowired
     private ModelMapper modelMapper;
     
	@Override
	@Transactional
	public void importUserFromFile(MultipartFile file) {

		int count=0;
		List<String> adminList = new ArrayList<>();
		try (InputStream inputStream = file.getInputStream();
				BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
				CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {
			
			for (CSVRecord csvRecord : csvParser) {
				UserDto userDto = new UserDto();
				
				if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
					continue; // Skip if user already exists
				}
				// Mapping CSV fields to UserDto
				count++;
				userDto.setFirstName(csvRecord.get("firstName"));
				userDto.setLastName(csvRecord.get("lastName"));
				userDto.setEmail(csvRecord.get("email"));
				userDto.setMobileNo(csvRecord.get("mobileNo"));
				userDto.setPassword(csvRecord.get("password"));

				userDto.setStatus(STATUS.PENDING); // Default status set as PENDING

				userDto.setRole(ROLES.USER);
				// If user already exists, skip
				
			    userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

				// Convert UserDto to User entity
				User user=modelMapper.map(userDto, User.class);

				user.setRegisteredAt(LocalDateTime.now());
				// Save user
				User savedUser = userRepository.save(user);

				// Send email notification to admins
				
				adminList.add("abhishek.bhosale@mitaoe.ac.in");

				
			}

		} catch (Exception e) {
			throw new RuntimeException("Failed to process CSV file: " + e.getMessage());
		}finally {
			emailService.sendEmailToAdminsWhenUserImported(adminList, String.valueOf(count));
		}

	}
}
