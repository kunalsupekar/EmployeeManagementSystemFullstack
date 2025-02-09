package com.effigo.employeeManagementSystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_files")
@Getter
@Setter
@NoArgsConstructor
public class UserFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int documentId;

    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    @Column(name = "file_url", nullable = false, length = 1024)
    private String fileUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference  
    private User user;

    
    public UserFile(User user, String fileName, String fileUrl) {
        this.user = user;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        
    }

    @Override
    public String toString() {
        return "UserFile [documentId=" + documentId + ", fileName=" + fileName + ", fileUrl=" + fileUrl + "]";
    }
}
