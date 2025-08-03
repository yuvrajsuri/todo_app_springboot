import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:8080/api/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (title.trim() === '') return;
    await axios.post('http://localhost:8080/api/todos', {
      title,
      completed: false
    });
    setTitle('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8080/api/todos/${id}`);
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await axios.put(`http://localhost:8080/api/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Todo App</h1>
      <div style={styles.inputRow}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>Add</button>
      </div>
      <ul style={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                marginLeft: 8
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', padding: 20, fontFamily: 'Arial' },
  inputRow: { display: 'flex', marginBottom: 20 },
  input: { flex: 1, padding: 10, fontSize: 16 },
  addButton: { padding: '10px 20px', marginLeft: 10 },
  todoList: { listStyle: 'none', padding: 0 },
  todoItem: { display: 'flex', alignItems: 'center', marginBottom: 10 },
  deleteButton: { marginLeft: 'auto', background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }
};

export default App;
