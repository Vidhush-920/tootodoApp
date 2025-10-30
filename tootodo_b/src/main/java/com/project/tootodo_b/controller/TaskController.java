package com.project.tootodo_b.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

import com.project.tootodo_b.model.Task;
import com.project.tootodo_b.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable int id) {
        return taskService.getTaskById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Task> toggleTaskStatus(@PathVariable int id) {
        return taskService.toggleTaskStatus(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
    }
}
