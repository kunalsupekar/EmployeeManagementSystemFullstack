 package com.effigo.employeeManagementSystem.controller;



import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.effigo.employeeManagementSystem.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class LoginController {

	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Map<String, String> request) {
	    String username = request.get("userEmail");
	    String password = request.get("password");

	    if ("kunalsupekar965@gmail.com".equals(username) && "123".equals(password)) {
	        System.out.println("call come");
	        return ResponseEntity.ok().body("ADMIN");  // ✅ Successful login (200 OK)
	    }
	    
	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized"); // ✅ 401 Unauthorized
	}

}

