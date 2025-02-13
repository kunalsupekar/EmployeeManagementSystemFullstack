package com.effigo.employeeManagementSystem.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.effigo.employeeManagementSystem.dto.LoginHistoryDTO;
import com.effigo.employeeManagementSystem.model.LoginHistory;
import com.effigo.employeeManagementSystem.model.User;
import com.effigo.employeeManagementSystem.model.User.ROLES;
import com.effigo.employeeManagementSystem.repository.LoginHistoryRepository;
import com.effigo.employeeManagementSystem.service.LoginHistoryService;

@Service
public class LoginHistoryServiceImpl implements LoginHistoryService{
    
	@Autowired
    private LoginHistoryRepository loginHistoryRepository;

	@Override
    public List<LoginHistoryDTO> getLoginHistoryForUsers() {
        return loginHistoryRepository.findAllForUsers(ROLES.USER)
                .stream()
                .map(loginHistory -> new LoginHistoryDTO(
                        loginHistory.getId(),
                        loginHistory.getUser().getUserId(),
                        loginHistory.getUser().getUsername(),
                        loginHistory.getLoginTime(),
                        loginHistory.getLogoutTime()))
                .collect(Collectors.toList());
    }
	
	
    public void saveLogin(User user) {
        LoginHistory loginHistory = new LoginHistory();
        loginHistory.setUser(user);
        loginHistory.setLoginTime(LocalDateTime.now());
   //     loginHistory.setLoginTime(LocalDateTime.now().minusDays(1));

        loginHistoryRepository.save(loginHistory);
    }

    public void saveLogout(User user) {
        LoginHistory loginHistory = loginHistoryRepository
                .findTopByUserOrderByLoginTimeDesc(user)
                .orElse(null);

        if (loginHistory != null && loginHistory.getLogoutTime() == null) {
            loginHistory.setLogoutTime(LocalDateTime.now());
            loginHistoryRepository.save(loginHistory);
        }
    }
    
    
    
    
}