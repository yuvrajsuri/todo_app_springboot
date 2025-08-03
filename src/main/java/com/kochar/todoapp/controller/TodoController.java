package com.kochar.todoapp.controller;

import com.kochar.todoapp.model.Todo;
import com.kochar.todoapp.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "https://localhost/3000")

public class TodoController {
    public final TodoService todoService;

    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getTodos(){
        return todoService.getAllTodos();
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo){
        return todoService.createTodo(todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo){
        return todoService.updateTodo(todo, id);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
    }

}
