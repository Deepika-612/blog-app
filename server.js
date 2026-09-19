require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const User = require('./models/User');
const Blog = require('./models/Blog');
const auth = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use(cors());

// Serve HTML, CSS and other frontend files
app.use(express.static(path.join(__dirname)));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Profile
app.get('/api/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Create Blog
app.post('/api/blogs', auth, async (req, res) => {
    try {
        const { title, content, category } = req.body;

        const newBlog = new Blog({
            title,
            content,
            category: category || 'General',
            author: req.user.id
        });

        const savedBlog = await newBlog.save();

        res.status(201).json({
            success: true,
            blog: savedBlog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get All Blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            blogs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get My Blogs
app.get('/api/my-blogs', auth, async (req, res) => {
    try {
        const blogs = await Blog.find({
            author: req.user.id
        })
        .populate('author', 'username')
        .sort({ createdAt: -1 });

        res.json({
            success: true,
            blogs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get Single Blog
app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username');

        if (!blog) {
            return res.status(404).json({
                success: false,
                error: 'Blog not found'
            });
        }

        res.json({
            success: true,
            blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});