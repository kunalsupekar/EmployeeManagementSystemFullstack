package com.effigo.employeeManagementSystem.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {
	
    private String token;
    private String role;
    private int userId;
    
    public AuthenticationResponse(String token, String role,int userId) {
        this.token = token;
        this.role = role;
        this.userId=userId;
    }

}