import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors";
const app = express()

const allowedOrigins = [
    "http://localhost:3000",
    "https://blogsitepls.netlify.app" // ✅ Add your Netlify frontend URL here
];
// Allow Specific Origins
app.use(cors({ 
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true 
}));

app.use(express.json({limit: "16mb"})) // Increase from 16kb to 16mb
app.use(express.urlencoded({extended: true, limit: "16mb"})) 
app.use(express.static("public"))
app.use(cookieParser())


// routes import
import userRouter from './routes/user.routes.js'
import postRouter from "./routes/post.routes.js"; 

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postRouter); // Post routes

// url : http://localhost:8000/api/v1/users/register

// Example URL for post routes:
// http://localhost:8000/api/v1/posts/createPost
// http://localhost:8000/api/v1/posts/allPosts
// http://localhost:8000/api/v1/posts/singlePost/:id
// http://localhost:8000/api/v1/posts/updatePost/:id
// http://localhost:8000/api/v1/posts/deletePost/:id
// http://localhost:8000/api/v1/posts/addComment/:id

export {app}