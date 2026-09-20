# Blog App

A full-stack Blog Application developed as part of my Full Stack Web Development internship.

## Features

- User registration and login
- Secure password hashing
- JWT-based authentication
- Protected dashboard
- User profile display
- Create and view blogs
- View individual blog details
- Category selection for blogs
- Search and category filtering
- User-specific blog listing
- Logout functionality
- Responsive user interface
- MongoDB database integration

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication & Security
- JSON Web Token (JWT)
- bcryptjs
- dotenv

## Project Structure

```text
blogapp/
├── middleware/
│   └── auth.js
├── models/
│   ├── Blog.js
│   └── User.js
├── blog.html
├── create.html
├── dashboard.html
├── index.html
├── login.html
├── register.html
├── server.js
├── style.css
├── package.json
└── README.md