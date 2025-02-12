package com.effigo.employeeManagementSystem.security;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {
	
    private String token;
    private String role;
    
    public AuthenticationResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

}