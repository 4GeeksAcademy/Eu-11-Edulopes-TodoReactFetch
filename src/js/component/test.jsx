import React, { useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;

    const newTask = {
      id: Date.now(),
      label: inputValue,
      done: false,
    };

    setTodos([...todos, newTask]);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const clearTasks = () => {
    setTodos([]);
  };

  return (
    <div className="todo-container">
      <h1>To Do List</h1>
      <div className="inputDiv">
        <input
          type="text"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={inputValue}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="todosDiv">
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <span
                  style={{ textDecoration: todo.done ? "line-through" : "none" }}
                >
                  {todo.label}
                </span>
                <i className="fas fa-times" onClick={() => deleteTodo(todo.id)}></i>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks yet.</p>
        )}
      </div>
      {todos.length > 0 && (
        <div className="todosLeft">
          {todos.length} tasks remaining
          <button onClick={clearTasks}>Clear All</button>
        </div>
      )}
    </div>
  );
};

export default Home;
