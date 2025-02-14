package com.effigo.employeeManagementSystem.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.effigo.employeeManagementSystem.dto.MessageDto;
import com.effigo.employeeManagementSystem.dto.UserDto;
import com.effigo.employeeManagementSystem.model.Message;
import com.effigo.employeeManagementSystem.model.User;
import com.effigo.employeeManagementSystem.repository.MessageRepository;
import com.effigo.employeeManagementSystem.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	@Override
	public MessageDto sendMessage(UserDto sender, UserDto receiver, String content) {
		Message message = new Message();
		User senderUser=modelMapper.map(sender,User.class);
		User receiverUser=modelMapper.map(receiver,User.class);

		message.setSender(senderUser);
		message.setReceiver(receiverUser);
		message.setMessage(content);
		message.setTimestamp(LocalDateTime.now());
		message.setStatus(Message.MESSAGE_STATUS.UNREAD);
		Message message1=messageRepository.save(message);
		return modelMapper.map(message1, MessageDto.class);
	}

	@Override
	public List<Message> getMessagesBetweenUsers(User sender, User receiver) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Message> getUnreadMessages(User receiver) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void markMessageAsRead(int messageId) {
		// TODO Auto-generated method stub

	}
	
	
	public List<MessageDto> getMessagesForReceiver(int receiverId) {
        List<Message> messages = messageRepository.findByReceiver_userIdOrderByTimestampDesc(receiverId);
        
        // Convert Message entities to DTOs
        return messages.stream()
                .map(message -> modelMapper.map(message, MessageDto.class))
                .collect(Collectors.toList());
    }

}
