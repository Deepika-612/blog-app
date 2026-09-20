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

## How to Run Locally

### 1. Clone the repository

git clone https://github.com/Deepika-612/blog-app.git

### 2. Open the project folder

cd blog-app

### 3. Install dependencies

npm install

### 4. Configure environment variables

Create a `.env` file in the project folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000

### 5. Start the server

node server.js

### 6. Open the application

Open the following address in your browser:

http://localhost:3000

## Authentication

The application uses JSON Web Token (JWT) authentication to protect user-specific routes.

Passwords are securely hashed using bcryptjs before being stored in the database.

## Database

MongoDB Atlas is used to store:

- User information
- Blog posts
- Blog authors
- Blog categories

## Future Improvements

- Image upload for blogs
- Edit and delete blog functionality
- Comments and likes
- Improved user profile
- Advanced search
- Cloud deployment

## Author

Deepika P

BE Electrical & Electronics Engineering  
GSSSIETW, Mysuru