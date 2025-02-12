 package com.effigo.employeeManagementSystem.controller;

 import java.io.ObjectInputFilter.Status;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.effigo.employeeManagementSystem.model.User;
import com.effigo.employeeManagementSystem.model.User.STATUS;
import com.effigo.employeeManagementSystem.service.AdminService;
import com.effigo.employeeManagementSystem.service.ImportUserService;

 @RestController
 @RequestMapping("/api/admin")
 public class AdminController {

   private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

   private final AdminService adminService;
   	private final ImportUserService importUserService;
   
   public AdminController(AdminService adminService,ImportUserService importUserService) {
     this.adminService = adminService;
     this.importUserService=importUserService;
   }
   
   
   
   @GetMapping("/users")
   public ResponseEntity<List<UserDto>> getAllUsers() {
       return ResponseEntity.ok(adminService.getAllUsers());
   }
   
   @GetMapping("/users/{role}")
   public ResponseEntity<List<UserDto>> getAllUsersByTheirRole(@PathVariable("role") String roleString) {
       User.ROLES role = User.ROLES.valueOf(roleString.toUpperCase());
	   return ResponseEntity.ok(adminService.getAllUsersByRoles(role));
   }
   
   @PutMapping("/users/{userId}")
   public ResponseEntity<UserDto> updateUser(@PathVariable int userId, @RequestBody UserDto userDto) {
       UserDto updatedUser = adminService.updateUser(userId, userDto);
       return ResponseEntity.ok(updatedUser);
   }


   @DeleteMapping("/users/{userId}")
   public ResponseEntity<String> deleteUser(@PathVariable int userId) {
       adminService.deleteUserById(userId);
       return ResponseEntity.ok("User deleted successfully.");
   }
   
   
   @GetMapping("/users/status/{status}")
   public ResponseEntity<List<UserDto>> getAllUsersByTheirStatus(@PathVariable("status") String statusString) {
       User.STATUS status = User.STATUS.valueOf(statusString.toUpperCase());
	   return ResponseEntity.ok(adminService.getAllUsersByStatus(status));
   }

   
   @PostMapping("/users/changeStatus/{userId}")
   public ResponseEntity<UserDto> assignRoleToUser(@PathVariable("userId") int userId,@RequestBody String newStatus) {
      // System.out.println(newStatus);
	   STATUS newStatus1 = STATUS.valueOf(newStatus.toUpperCase());
	  // System.out.println("status assign");
       return ResponseEntity.ok(adminService.changeUserStatus(userId,newStatus1));
   }
   
   
   @PostMapping("/users/import")
   public ResponseEntity<Void> importUsersFromFile(@RequestParam("file") MultipartFile file) {
	   importUserService.importUserFromFile(file);
	   return ResponseEntity.ok().build();
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
