import { useEffect, useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  async function loadTasks() {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error(`server returned ${res.status}`);
      setTasks(await res.json());
      setError('');
    } catch (err) {
      setError(`Could not load tasks: ${err.message}`);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error(`server returned ${res.status}`);
      setTitle('');
      await loadTasks();
    } catch (err) {
      setError(`Could not add task: ${err.message}`);
    }
  }

  async function deleteTask(id) {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`server returned ${res.status}`);
      await loadTasks();
    } catch (err) {
      setError(`Could not delete task: ${err.message}`);
    }
  }

  return (
    <main className="container">
      <h1>ShipIt Tasks</h1>

      <form onSubmit={addTask} className="add-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          maxLength={200}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && !error && <p className="empty">No tasks yet.</p>}
    </main>
  );
}
