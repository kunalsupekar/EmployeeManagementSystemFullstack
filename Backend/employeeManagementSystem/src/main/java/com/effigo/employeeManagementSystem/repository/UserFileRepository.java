package com.effigo.employeeManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.effigo.employeeManagementSystem.model.UserFile;

@Repository
public interface UserFileRepository extends JpaRepository<UserFile, Integer> {
   
	//List<UserFile> findByUserId(int userId); 
}
