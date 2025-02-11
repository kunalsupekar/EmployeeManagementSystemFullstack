package com.effigo.employeeManagementSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.service.UserService;

@RestController
@RequestMapping("/api/users") // Changed to plural form for REST convention
public class UserController {

    @Autowired
    private UserService userService;
    
    

    @GetMapping("/email")
    public String sendEmail() {
    	//emailService.sendEmail();
		return "email send succesfuly";
	}
    
  
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable int userId) {
        UserDto returnDto = userService.getUserById(userId);
        return ResponseEntity.ok().body(returnDto);
    }

    @GetMapping("/email/{userEmail}")
    public ResponseEntity<UserDto> getUserByEmailAddress(@PathVariable String  userEmail) {
        UserDto returnDto = userService.getUserByEmail(userEmail);
        return ResponseEntity.ok().body(returnDto);
    }
    
    
    @PostMapping("/register")//api/user/register
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto createdUser = userService.addUser(userDto);
        return ResponseEntity.status(201).body(createdUser); // HTTP 201 Created
    }

    
    
    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable int userId, @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(userId, userDto);
        return ResponseEntity.ok(updatedUser);
    }
}
