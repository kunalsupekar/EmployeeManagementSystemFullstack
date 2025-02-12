	package com.effigo.employeeManagementSystem.service;
	
	import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.effigo.employeeManagementSystem.repository.UserRepository;
	
	@Service
	public class EmailService {
	
	    @Autowired
	    private JavaMailSender mailSender;
	    
	   
	
	    @Async
	    public void sendEmailToAdmins(List<String> adminEmails, String newUserFirstName) {
	        if (adminEmails.isEmpty()) {
	            return; // No admin emails found, skip sending email
	        }

	        SimpleMailMessage message = new SimpleMailMessage();
	        StringBuilder content = new StringBuilder("Hello Admin,\n\n");
	        content.append("A new user, ");
	        content.append(newUserFirstName);
	        content.append(", has just registered. Please review their approval request.");

	        message.setTo(adminEmails.toArray(new String[0])); // Convert list to array
	        message.setSubject("New User Registration Approval Required");
	        message.setText(content.toString());

	        mailSender.send(message);
	    }
	    
	    
	    @Async
	    public void sendEmailToAdminsWhenUserImported(List<String> adminEmails, String newUserFirstName) {
	        if (adminEmails.isEmpty()) {
	            return; // No admin emails found, skip sending email
	        }

	        SimpleMailMessage message = new SimpleMailMessage();
	        StringBuilder content = new StringBuilder("Hello Admin,\n\n");
	        content.append(newUserFirstName);

	        content.append(" New bulk users Imported ,");
	        content.append("Please review their approval request.");
	        message.setTo(adminEmails.toArray(new String[0])); // Convert list to array
	        message.setSubject("Bulk UsersRegistration Approval Requests");
	        message.setText(content.toString());

	        mailSender.send(message);
	    }
	    
	    
	}


