package com.effigo.employeeManagementSystem.service;

import com.effigo.employeeManagementSystem.dto.LoginHistoryDTO;
import com.effigo.employeeManagementSystem.model.LoginHistory;
import com.effigo.employeeManagementSystem.model.User;
import java.util.List;

public interface LoginHistoryService {
	
    List<LoginHistoryDTO> getLoginHistoryForUsers();
    
    void saveLogin(User user);
    
    void saveLogout(User user);
}
