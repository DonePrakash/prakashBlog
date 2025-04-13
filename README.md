# 📝 Blog Website

A fully functional and visually appealing **Blog Platform** where users can write, read, and explore blog posts with images, categories, and tags. Built using **Node.js**, **Express.js**, **MongoDB**, and a **responsive frontend** using HTML, CSS, and JavaScript. This project demonstrates full-stack web development with REST APIs and image management using **Cloudinary**.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based login and registration)
- ✍️ **Create and Edit Blog Posts**
- 🖼️ **Image Uploads** with Cloudinary
- 🗃️ **Category and Tag Filtering**
- 🔎 **Search Posts** by title or tag
- 👤 **User Profile Display** (avatar and username)
- 📱 **Responsive UI** for all screen sizes

---

## 🛠️ Tech Stack

### 🔧 Backend

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for secure authentication
- **Cloudinary** for image hosting
- **CORS**, **dotenv**, and more for config and security

### 🎨 Frontend

- **HTML5**, **CSS3**, **JavaScript**
- **Fetch API** for interacting with backend
- Responsive design for smooth UX on all devices

---

## 📁 Project Structure
📦 blog-website
├── 📂 backend
│   ├── 📂 public                 # Public assets (if any)
│   ├── 📂 src
│   │   ├── 📂 controllers        # Handles request logic (create, read, update, delete)
│   │   ├── 📂 db                 # Database connection setup
│   │   ├── 📂 middlewares        # Middleware functions (authentication, error handling, etc.)
│   │   ├── 📂 routes             # Route definitions
│   │   ├── 📂 models             # Mongoose schemas/models
│   │   ├── 📂 utils              # Utility/helper functions
│   │   ├── 📜 app.js             # Express app configuration
│   │   ├── 📜 constants.js       # App-wide constants (e.g., status codes, messages)
│   │   └── 📜 index.js           # Entry point of the backend (connects DB & starts server)
│   └── 📜 package.json           # Backend dependencies and scripts
│
├── 📂 frontend
│   ├── 📜 index.html             # Homepage displaying all blog posts
│   ├── 📜 post.html              # Individual blog post preview
│   ├── 📜 view_post.html         # Full blog post view
│   ├── 📜 create_post.html       # Blog post creation form
│   ├── 📜 signIn_signUp.html     # Authentication (Sign-in/Sign-up page)
│   ├── 📂 scripts/               # JavaScript logic
│   └── 📂 styles/                # Styling and layout files
│
├── 📜 README.md                  # Project documentation
