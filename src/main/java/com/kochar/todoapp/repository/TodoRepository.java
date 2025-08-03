package com.kochar.todoapp.repository;

import com.kochar.todoapp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
