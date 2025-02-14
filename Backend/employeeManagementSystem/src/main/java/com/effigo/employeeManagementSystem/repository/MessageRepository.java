

package com.effigo.employeeManagementSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.effigo.employeeManagementSystem.model.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

	@Query("SELECT m FROM Message m WHERE m.sender.id = :userId OR m.receiver.id = :userId ORDER BY m.timestamp ASC")
	List<Message> findMessagesForUser(@Param("userId") Long userId);

	List<Message> findByReceiver_userIdOrderByTimestampDesc(int receiverId);
}
