package com.effigo.employeeManagementSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.effigo.employeeManagementSystem.dto.MessageDto;
import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.model.Message;
import com.effigo.employeeManagementSystem.repository.MessageRepository;
import com.effigo.employeeManagementSystem.service.MessageService;
import com.effigo.employeeManagementSystem.service.UserService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

	@Autowired
	private MessageService messageService;

	@Autowired
	private UserService userService;
	@Autowired
	private MessageRepository messageRepository;

	@PostMapping("/send")
	public MessageDto sendMessage(@RequestBody MessageDto messageDto) {
		UserDto sender = userService.getUserById(messageDto.getSenderId());
		UserDto receiver = userService.getUserById(messageDto.getReceiverId());
		return messageService.sendMessage(sender, receiver, messageDto.getMessage());
	}

	
	 @GetMapping("/receiver/{receiverId}")
	    public List<MessageDto> getMessagesForReceiver(@PathVariable int receiverId) {
	        return messageService.getMessagesForReceiver(receiverId);
	    }
	 
	 
	 @GetMapping("/user/{userId}")
	 public ResponseEntity<List<Message>> getMessagesForUser(@PathVariable Long userId) {
	     List<Message> messages = messageRepository.findMessagesForUser(userId);
	     return ResponseEntity.ok(messages);
	 }
}
