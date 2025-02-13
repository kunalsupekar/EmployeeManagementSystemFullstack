package com.effigo.employeeManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.effigo.employeeManagementSystem.model.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

}
