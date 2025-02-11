package com.effigo.employeeManagementSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.effigo.employeeManagementSystem.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	@Query("SELECT u.email FROM User u WHERE u.role = 'ADMIN'")
	List<String> findEmailsByRole(User.ROLES role);

	@Query("SELECT u FROM User u WHERE u.status = :status")
	List<User> findByStatus(@Param("status") User.STATUS status);

	
	Optional<User> findByEmail(String email);
	
	
	@Query("SELECT u FROM User u WHERE u.role = :role")
	List<User> findUsersByRole(@Param("role") User.ROLES role);


	
	
}
