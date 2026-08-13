const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(__dirname));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Backend server is live and running!');
});

// Registration route
app.post('/api/register', (req, res) => {
    const userData = req.body;
    console.log("Received registration data:", userData);
    res.json({ success: true, message: 'User registered successfully on the backend!' });
});

// Login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log("Received login attempt for:", email);
    res.json({ success: true, message: 'Logged in successfully!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
// Add an array at the top to store blog posts temporarily
let posts = [];

// Route to create a new blog post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: Date.now(), title, content };
    posts.push(newPost);
    console.log("New blog post created:", title);
    res.json({ success: true, message: 'Blog posted successfully!', post: newPost });
});

// Route to get all blog posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});