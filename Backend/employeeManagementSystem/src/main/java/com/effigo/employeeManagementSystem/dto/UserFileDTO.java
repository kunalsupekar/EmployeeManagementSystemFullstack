package com.effigo.employeeManagementSystem.dto;

import lombok.Data;

@Data
public class UserFileDTO {
	private int documentId;
    private String fileName;
    private String fileUrl;
}
