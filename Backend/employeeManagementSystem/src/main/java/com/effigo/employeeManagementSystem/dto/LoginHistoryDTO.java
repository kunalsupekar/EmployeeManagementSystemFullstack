package com.effigo.employeeManagementSystem.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LoginHistoryDTO {
    private int id;
    private int userId; // Instead of exposing the full User object
    private String username; // Fetch username for better readability
    private LocalDateTime loginTime;
    private LocalDateTime logoutTime;

    public LoginHistoryDTO(int id, int userId, String username, LocalDateTime loginTime, LocalDateTime logoutTime) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.loginTime = loginTime;
        this.logoutTime = logoutTime;
    }
}
