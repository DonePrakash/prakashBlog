import dotenv from "dotenv"
import connectDB from "./db/db.js"
import { app } from "./app.js"

dotenv.config({
    path: '../.env'
})

connectDB()
.then(()=>{
    app.on("error", (error) => {
        console.log("Error: ",error);
        throw error
    })
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MongoDB Connection Failed !!!",err);
})