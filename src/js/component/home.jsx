import React, { useState, useEffect } from "react";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/edulopes")
      .then((resp) => resp.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;

    const newTask = {
      label: inputValue,
      done: false,
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/edulopes", {
      method: "PUT",
      body: JSON.stringify([...todos, newTask]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    setTodos([...todos, newTask]);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const deleteTodo = (id) => {
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/edulopes/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const clearTasks = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/edulopes", {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    setTodos([]);
  };

  return (
    <div className="todo-container">
      <h1>ToDo List</h1>
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
