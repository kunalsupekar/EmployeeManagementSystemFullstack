package com.effigo.employeeManagementSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.effigo.employeeManagementSystem.model.LoginHistory;
import com.effigo.employeeManagementSystem.model.User;
import com.effigo.employeeManagementSystem.model.User.ROLES;

@Repository
public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Long> {
	
	@Query("SELECT lh FROM LoginHistory lh WHERE lh.user.role = :role")
	List<LoginHistory> findAllForUsers(@Param("role") ROLES role);

	
	//retreives the latest login for the user
    Optional<LoginHistory> findTopByUserOrderByLoginTimeDesc(User user);

}