package com.kochar.todoapp.service;

import com.kochar.todoapp.model.Todo;
import com.kochar.todoapp.repository.TodoRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    public final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos(){
        return todoRepository.findAll();
    }

    public Todo createTodo(Todo todo){
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id){
        todoRepository.deleteById(id);
    }

    public Todo updateTodo(Todo updatedTodo, Long id){
        return todoRepository.findById(id).map(todo -> {
            todo.setTitle(updatedTodo.getTitle());
            todo.setDiscription(updatedTodo.getDiscription());
            todo.setCompleted(updatedTodo.isCompleted());
            return todoRepository.save(todo);
        }).orElseThrow(()-> new RuntimeException("Todo not found"));
    }

}
