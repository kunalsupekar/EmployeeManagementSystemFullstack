package com.effigo.employeeManagementSystem.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
import java.util.Collection;
import java.util.Collections;

@Entity
@Getter
@Setter
@Table(name = "users") 
public class User implements UserDetails {

    public enum STATUS { PENDING, ACTIVE, DEACTIVE, REJECTED }
    public enum ROLES { ADMIN, USER }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String firstName;
    private String lastName;
    
    @Column(unique = true, nullable = false)
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
	
    
	
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(() -> "ROLE_" + role.name());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status == STATUS.ACTIVE;
    }
	
	
}
