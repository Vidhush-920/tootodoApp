package com.project.tootodo_b.service;

import com.project.tootodo_b.model.Task;
import com.project.tootodo_b.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(int id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        if(task.getTitle() == null || task.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Task title cannot be empty");
        } else {
            return taskRepository.save(task);
        }
    }

    public Optional<Task> toggleTaskStatus(int id) {
    return getTaskById(id)
        .map(task -> {
            task.setIs_done(!task.isIs_done());
            return taskRepository.save(task);
        });
    }
    
}
