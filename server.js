// Import express module
const express = require('express');

// Initialize the app (Express application instance)
const app = express();

// Middleware to parse JSON data from incoming requests
app.use(express.json());

// Sample tasks array (in-memory storage for simplicity)
let tasks = [
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Complete homework' },
    { id: 3, text: 'Learn JS' }
];

// Route for the root (home) page
app.get('/', (req, res) => {
    res.send('Hello, Welcome to the To-Do List App!');
});

// POST route to create a new task
app.post('/tasks', (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ message: 'Task text is required' });
    }
    
    const newTask = { id: tasks.length + 1, text };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// GET route to retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks); // Return all tasks as a JSON response
});

// GET route to retrieve a specific task by its ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10); // Get the task ID from the URL

    // Find the task by ID
    const task = tasks.find(t => t.id === taskId);

    // If task is not found, return a 404 error
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Return the task
    res.json(task);
});

// PUT route to update an existing task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10); // Get the task ID from the URL
    const { text } = req.body;

    // Find the task by ID
    const task = tasks.find(t => t.id === taskId);

    // If task is not found, return a 404 error
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task text
    if (text) {
        task.text = text;
    }

    // Return the updated task
    res.json(task);
});

// DELETE route to delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10); // Get the task ID from the URL

    // Find the index of the task
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    // If task is not found, return a 404 error
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task from the array
    tasks.splice(taskIndex, 1);

    // Return a success message
    res.status(200).json({ message: 'Task deleted successfully' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
