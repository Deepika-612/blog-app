const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://bloguser:blogpassword123@cluster0.qwqleoy.mongodb.net/blogapp?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema & Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Blog Schema & Model
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: 'General' },
    author: { type: String, default: 'Anonymous' },
    createdAt: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

// API Routes for Blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

app.post('/api/blogs', async (req, res) => {
    try {
        const { title, content, category, author } = req.body;
        const newBlog = new Blog({ title, content, category, author });
        await newBlog.save();
        res.json({ success: true, blog: newBlog });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

app.put('/api/blogs/:id', async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content, category },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        res.json({ success: true, blog: updatedBlog });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }

        res.json({ success: true, message: 'Blog deleted successfully!' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
});
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
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});