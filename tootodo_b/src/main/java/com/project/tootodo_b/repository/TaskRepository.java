package com.project.tootodo_b.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.tootodo_b.model.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {}
