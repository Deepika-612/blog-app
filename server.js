const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://bloguser:blogpassword123@cluster0.qwqleoy.mongodb.net/?appName=Cluster0')
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema & Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Blog Schema & Model
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Anonymous' },
    createdAt: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

// Register Route
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ success: true, message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ success: false, error: 'Registration failed. Username or email may already exist.' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ success: false, error: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }
        
        res.json({ success: true, message: 'Login successful!' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Get All Blogs Route
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to fetch blogs' });
    }
});

// Get a Single Blog by ID
app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Create a Blog Post Route
app.post('/api/blogs', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newBlog = new Blog({ title, content, author });
        await newBlog.save();
        
        res.status(201).json({ success: true, message: 'Blog created successfully!', blog: newBlog });
    } catch (err) {
        res.status(400).json({ success: false, error: 'Failed to create blog post.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});