import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    text: '',
    startDate: '',
    dueDate: '',
    priority: 'Medium',
    ongoing: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddTask = () => {
    if (formData.text.trim()) {
      const newTask = {
        id: Date.now(),
        ...formData,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setFormData({
        text: '',
        startDate: '',
        dueDate: '',
        priority: 'Medium',
        ongoing: true,
      });
    }
  };

  const handleToggle = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed, ongoing: !task.completed ? false : task.ongoing }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div style={styles.container}>
      <h2>Project To-Do List</h2>

      <div style={styles.form}>
        <input
          type="text"
          name="text"
          placeholder="Task title"
          value={formData.text}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <label style={{ marginBottom: '10px' }}>
          <input
            type="checkbox"
            name="ongoing"
            checked={formData.ongoing}
            onChange={handleChange}
          />{' '}
          Ongoing
        </label>
        <button onClick={handleAddTask} style={styles.button}>
          Add Task
        </button>
      </div>

      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.listItem}>
            <div onClick={() => handleToggle(task.id)} style={{ flex: 1, cursor: 'pointer' }}>
              <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </strong>
              <div>📅 Start: {task.startDate}</div>
              <div>📆 Due: {task.dueDate}</div>
              <div>🔥 Priority: {task.priority}</div>
              <div>
                📌 Status: {task.completed ? 'Completed' : task.ongoing ? 'Ongoing' : 'Not Started'}
              </div>
            </div>
            <button onClick={() => handleDelete(task.id)} style={styles.deleteButton}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
    padding: '15px',
    background: '#f0f0f0',
    borderRadius: '8px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    background: '#f9f9f9',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: 'red',
  },
};

export default App;
