package com.effigo.employeeManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.effigo.employeeManagementSystem.model.AuthenticationResponse;
import com.effigo.employeeManagementSystem.model.User;
import com.effigo.employeeManagementSystem.security.JwtUtil;
import com.effigo.employeeManagementSystem.service.CustomUserDetailsService;
import com.effigo.employeeManagementSystem.service.LoginHistoryService;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private LoginHistoryService loginHistoryService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody User authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        User user = (User) userDetails;
        // Get the user role
        String role = user.getRole().name();
        int userId=user.getUserId();
        loginHistoryService.saveLogin(user);
       
        // Return the token and role in the response
        return ResponseEntity.ok(new AuthenticationResponse(jwt, role,userId));
        
    }
}