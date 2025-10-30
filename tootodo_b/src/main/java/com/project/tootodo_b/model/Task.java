package com.project.tootodo_b.model;

import java.sql.Timestamp;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 255)
    private String title;

    private String description;
    
    @CreationTimestamp
    @Column(name = "created_time", updatable = false)
    private Timestamp created_time;

    private boolean is_done;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Timestamp getCreated_time() { return created_time; }
    public void setCreated_time(Timestamp created_time) { this.created_time = created_time; }

    public boolean isIs_done() { return is_done; }
    public void setIs_done(boolean is_done) { this.is_done = is_done; }
    
}
