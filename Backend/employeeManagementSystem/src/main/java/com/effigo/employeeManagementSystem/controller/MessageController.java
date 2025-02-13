package com.effigo.employeeManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.effigo.employeeManagementSystem.dto.MessageDto;
import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.service.MessageService;
import com.effigo.employeeManagementSystem.service.UserService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

	@Autowired
	private MessageService messageService;

	@Autowired
	private UserService userService;

	@PostMapping("/send")
	public MessageDto sendMessage(@RequestBody MessageDto messageDto) {
		UserDto sender = userService.getUserById(messageDto.getSenderId());
		UserDto receiver = userService.getUserById(messageDto.getReceiverId());
		return messageService.sendMessage(sender, receiver, messageDto.getMessage());
	}

}
