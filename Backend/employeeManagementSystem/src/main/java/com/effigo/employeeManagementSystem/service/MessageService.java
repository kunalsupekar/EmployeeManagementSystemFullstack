package com.effigo.employeeManagementSystem.service;

import com.effigo.employeeManagementSystem.dto.MessageDto;
import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.model.Message;
import com.effigo.employeeManagementSystem.model.User;

import java.util.List;

public interface MessageService {
  
	
	//public MessageDto sendMessage(User sender, User receiver, String message);
    List<Message> getMessagesBetweenUsers(User sender, User receiver);
    List<Message> getUnreadMessages(User receiver);
    void markMessageAsRead(int messageId);
	MessageDto sendMessage(UserDto sender, UserDto receiver, String content);
}
