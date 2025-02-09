package com.effigo.employeeManagementSystem;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class EmployeeManagementSystemApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagementSystemApplication.class, args);
	
	}

	
	@Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
