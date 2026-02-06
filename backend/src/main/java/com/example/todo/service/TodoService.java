package com.example.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.todo.domain.Todo;
import com.example.todo.exception.TodoNotFoundException;
import com.example.todo.repository.TodoRepository;

@Service
public class TodoService {

    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    public List<Todo> findAll() {
        return repository.findAll();
    }

    public Todo findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    @Transactional
    public Todo create(String title) {
        return repository.create(title);
    }

    @Transactional
    public Todo update(Long id, String title, Boolean completed) {
        int rows = repository.update(id, title, completed);
        if (rows == 0) {
            throw new TodoNotFoundException(id);
        }
        return repository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }

    @Transactional
    public void delete(Long id) {
        int rows = repository.deleteById(id);
        if (rows == 0) {
            throw new TodoNotFoundException(id);
        }
    }
}
