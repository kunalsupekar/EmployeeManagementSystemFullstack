package com.effigo.employeeManagementSystem.service;

import java.util.List;

import com.effigo.employeeManagementSystem.model.User.STATUS;

public interface EmailService {

    
    void sendEmailToAdmins(List<String> adminEmails, String newUserFirstName);

    void sendEmailToAdminsWhenUserImported(List<String> adminEmails, String newUserFirstName);

    
    void sendEmailToUser(String to, String firstname, String password);

    void sendEmailToUserWhenStatusChange(String email, String firstName, STATUS status);
}
