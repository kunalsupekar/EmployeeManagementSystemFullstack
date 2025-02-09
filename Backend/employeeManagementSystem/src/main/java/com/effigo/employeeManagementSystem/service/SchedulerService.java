package com.effigo.employeeManagementSystem.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.effigo.employeeManagementSystem.model.User;
import com.effigo.employeeManagementSystem.model.User.STATUS;
import com.effigo.employeeManagementSystem.repository.UserRepository;

@Service
public class SchedulerService {

	private static final Logger logger = LoggerFactory.getLogger(SchedulerService.class);

	@Autowired
	private UserRepository userRepository;

	@Scheduled(cron = "0 0 0 * * ?") //12 am midnight
	public void updateUserStatusToActive() {
		List<User> users = userRepository.findByStatus(STATUS.PENDING);

		for (User user : users) {
			user.setStatus(STATUS.ACTIVE);
			userRepository.save(user);
		}

		logger.info("Updated {} users to ACTIVE status.", users.size());
	}

//	@Scheduled(fixedRate = 10000) // 10000 milliseconds = 10 seconds
//	public void myTask() {
//		System.out.println("Running task every 10 seconds");
//	}
}
