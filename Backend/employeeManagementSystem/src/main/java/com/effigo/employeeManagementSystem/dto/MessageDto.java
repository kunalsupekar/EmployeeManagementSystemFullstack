package com.effigo.employeeManagementSystem.dto;

import java.time.LocalDateTime;

import com.effigo.employeeManagementSystem.model.Message.MESSAGE_STATUS;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private int id;
    private int senderId;
    private int receiverId;
    private String senderUsername;
    private String receiverUsername;
    private String message;
    private MESSAGE_STATUS status;
    private LocalDateTime timestamp;
}
