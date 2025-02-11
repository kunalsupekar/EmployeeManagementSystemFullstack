//package com.effigo.employeeManagementSystem.security;
//
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Component;
//
//@Component
//public class PasswordEncoderUtil {
//
//	private static final BCryptPasswordEncoder 	passwordEncoder = new BCryptPasswordEncoder();
//
//	public String encryptPassword(String rawPassword) {
//        return passwordEncoder.encode(rawPassword);
//    }
//
//	public boolean verifyPassword(String rawPassword, String encryptedPassword) {
//        return passwordEncoder.matches(rawPassword, encryptedPassword);
//    }
//}
