 package com.effigo.employeeManagementSystem.controller;

 import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
 import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
 import org.springframework.web.bind.annotation.RequestParam;
 import org.springframework.web.bind.annotation.RestController;
 import org.springframework.web.multipart.MultipartFile;

import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.service.AdminService;

import java.util.List;

import org.slf4j.Logger;
 import org.slf4j.LoggerFactory;

 @RestController
 @RequestMapping("/api/admin")
 public class AdminController {

   private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

   private final AdminService adminService;

   public AdminController(AdminService adminService) {
     this.adminService = adminService;
   }
   
   
   
   @GetMapping("/users")
   public ResponseEntity<List<UserDto>> getAllUsers() {
       return ResponseEntity.ok(adminService.getAllUsers());
   }
   
   @PutMapping("/users/{userId}")
   public ResponseEntity<UserDto> updateUser(@PathVariable int userId, @RequestBody UserDto userDto) {
       UserDto updatedUser = adminService.updateUser(userId, userDto);
       return ResponseEntity.ok(updatedUser);
   }

   

   
   

   @PostMapping("/users/uploadFile/{userId}")
   public ResponseEntity<String> uploadFile(
       @PathVariable int userId,
       @RequestParam("file") MultipartFile file) {

     logger.info("Received upload request for userId: {}", userId);
     logger.info("File name: {}", file.getOriginalFilename());
     logger.info("File size: {}", file.getSize());

     String fileUrl = adminService.uploadFileForUser(userId, file);
     return ResponseEntity.ok("File uploaded: " + fileUrl);
   }
   
   
 }
