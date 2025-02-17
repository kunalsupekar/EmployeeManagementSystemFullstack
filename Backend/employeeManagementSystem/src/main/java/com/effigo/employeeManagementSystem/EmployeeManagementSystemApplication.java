package com.effigo.employeeManagementSystem;

import java.security.PrivateKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.effigo.employeeManagementSystem.service.IFileUploadService;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class EmployeeManagementSystemApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagementSystemApplication.class, args);
	
		

		//System.out.println("hi");
	}

	
	
}
