import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import TaskItem from './components/TaskItem';
import Alert from './components/Alert';
import './App.css';

const BASE_URL = 'http://localhost:8080/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from an API or database
  const fetchTasks = async () => {
    try {
        const response = await axios.get(BASE_URL);
        const sortedTasks = response.data
          .sort((a, b) => b.id - a.id);
        setTasks(sortedTasks);
    } catch (e) {
        console.error("Error fetching tasks: ", e);
        setError('Failed to load tasks. Check your Server.');
    } finally {
        setIsLoading(false);
    }
  };

  // Handler to add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setAlert({
        title: 'Warning!',
        message: 'Title is required.'
      });
      console.warn("Title is required.");
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      is_done: false
    };

    try {
      await axios.post(BASE_URL, newTask)
      .then(() => {
        setTitle('');
        setDescription('');
        fetchTasks();
        console.log("Task added successfully.", newTask);
        setAlert({
          title: 'Success',
          message: 'Task added successfully!'
        });
      });
    } catch (e) {
      console.error("Error adding task: ", e);
      setAlert({
        title: 'Error',
        message: 'Could not add the task. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handler to toggle the 'done' status
  const handleToggleDone = useCallback(async (taskId, status) => {
    try {
      await axios.patch(`${BASE_URL}/${taskId}/toggle`, { is_done: status })
      .then(() => {
        fetchTasks();
        console.log(`Task ${taskId} status updated to ${status}`);
        setAlert({
          title: 'Success',
          message: `Task ${status ? 'Completed Successfully!' : 'marked as Not Completed.'}`
        });
      });
    } catch (e) {
      console.error("Error updating document: ", e);
      setAlert({
        title: 'Error',
        message: 'Could not update the task status. Please try again.'
      });
    }
  }, []);

  // Render error message if any
  if (error) {
    return <div className="p-8 text-center text-red-600 bg-red-100 rounded-lg m-8">Error: {error}</div>;
  }

  const pendingTasks = tasks.filter(task => !task.is_done);

  return (
    <div className="App">

      <div className='title-section mb-8 text-center'>
        <h1 className='text-4xl font-extrabold text-blue-800 mb-2'>TooToDo - To-Do App</h1>
        <p className='text-gray-600'>Your Simple Task Manager</p>
      </div>

      <div className="task-section">
                
        {/* Left Column: Task Input Form */}
        <div className="taskform">
            <h2 className='text-xl font-bold mb-8'>Add a Task</h2>
            
            <form onSubmit={handleAddTask}>
                {/* Title Input */}
                <div className='form-group'>
                    <label htmlFor="title">
                        Title<span className="required text-red-600">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Buy groceries"
                        disabled={isLoading}
                        required
                    />
                </div>

                {/* Description Input */}
                <div className='form-group'>
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className='resize-none'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        placeholder="e.g., Milk, bread, and eggs from the store"
                        disabled={isLoading}
                    />
                </div>

                {/* Add Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`add-task ${isLoading ? 'disabled' : ''}`}
                >
                  {isLoading && (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                  )}
                  {!isLoading && "Add"}
                </button>
            </form>
            
        </div>

        {/* Right Column: Task List */}
        <div className="tasklist">
            
            {isLoading ? (
                <div className="loading text-center text-gray-500">Loading tasks...</div>
            ) : (
                <>
                    {/* Pending Tasks Section */}
                    {pendingTasks.length > 0 && (
                      <AnimatePresence mode="popLayout" className="task-pending mb-8">
                        {pendingTasks.slice(0, 5).map(task => (
                          <TaskItem 
                            key={task.id} 
                            task={task} 
                            onToggleDone={handleToggleDone}
                          />
                        ))}
                      </AnimatePresence>
                    )}

                    {/* Tasks Available Info Section */}
                    {pendingTasks.length === 0 && (
                        <div className="task-info text-center py-20 text-gray-500 mb-8">
                            <p className="text-xl font-semibold mb-2">
                              { tasks.length === 0 ? 'No Tasks Added yet!' : "You're all Caught up!" } 
                            </p>
                            <p>Use the form on the left to add your { tasks.length === 0 ? 'first' : 'new'} task.</p>
                        </div>
                    )}
                </>
            )}
        </div>
      </div>

      <Alert alert={alert}/>

    </div>
  );
}
