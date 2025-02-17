package com.effigo.employeeManagementSystem.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.effigo.employeeManagementSystem.model.User.ROLES;
import com.effigo.employeeManagementSystem.model.User.STATUS;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class UserDto {
	
	 private int userId;
	    private String firstName;
	    private String lastName;
	    
	    
	    private String email;
	    private String password;
	    private STATUS status;
	    private ROLES role;
	    private String mobileNo;
	    private LocalDateTime registeredAt;
	    private List<UserFileDTO> files;
}
