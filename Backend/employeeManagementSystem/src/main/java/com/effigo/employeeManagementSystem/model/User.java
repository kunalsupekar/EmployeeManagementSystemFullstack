package com.effigo.employeeManagementSystem.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users") 
public class User {

    public enum STATUS { PENDING, ACTIVE, DEACTIVE, REJECTED }
    public enum ROLES { ADMIN, USER }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private STATUS status;

    @Enumerated(EnumType.STRING)
    private ROLES role;

    private String mobileNo;
    private LocalDateTime registeredAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true
    		,fetch = FetchType.LAZY)
    @JsonManagedReference 
    private List<UserFile> files;

	
	
	@Override
	public String toString() {
	    return "User [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
	            + ", password=" + password + ", status=" + status + ", role=" + role + ", mobileNo=" + mobileNo
	            + ", registeredAt=" + registeredAt + "]";
	}
	
    
}
