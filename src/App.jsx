import React, { useState, useEffect } from "react";
import { FaCheck, FaEdit, FaTrash, FaSun, FaMoon } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks from local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false, priority: "Medium" }]);
      setTask("");
    }
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Filter tasks
  const getFilteredTasks = () => {
    if (filter === "All") return tasks;
    if (filter === "Pending") return tasks.filter((t) => !t.completed);
    if (filter === "Completed") return tasks.filter((t) => t.completed);
    if (filter === "High Priority") return tasks.filter((t) => t.priority === "High");
    if (filter === "Low Priority") return tasks.filter((t) => t.priority === "Low");
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>To-Do Dashboard</h2>
        <ul>
          {["All", "Pending", "Completed", "High Priority", "Low Priority"].map((item) => (
            <li key={item} onClick={() => setFilter(item)} className={filter === item ? "active" : ""}>
              {item}
            </li>
          ))}
        </ul>
        <button className="toggle-mode" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Manage Your Tasks</h1>
        <div className="widgets">
          <div className="widget">Total: {tasks.length}</div>
          <div className="widget">Completed: {tasks.filter((t) => t.completed).length}</div>
          <div className="widget">Pending: {tasks.filter((t) => !t.completed).length}</div>
        </div>

        {/* Add Task */}
        <div className="task-input">
          <input type="text" placeholder="Enter task..." value={task} onChange={(e) => setTask(e.target.value)} />
          <button onClick={addTask}>Add Task</button>
        </div>

        {/* Task List */}
        <div className="task-list">
          {getFilteredTasks().map((t, index) => (
            <div key={index} className={`task-item ${t.completed ? "completed" : ""}`}>
              <span>{t.text}</span>
              <div className="icons">
                <FaCheck className="check" onClick={() => toggleTask(index)} />
                <FaTrash className="delete" onClick={() => deleteTask(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
