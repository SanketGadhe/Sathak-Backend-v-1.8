const express=require('express')
const app=express()
const userRoutes=require('./routes/userRoutes')
const errorMiddleware = require('./middlewares/errorMiddlewares');
const db=require('./config/db')
const dotenv=require('dotenv');
const path=require('path')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require("multer");
const Course=require('./models/CoursesModel')
dotenv.config()
db();
const adminRoutes=require('./routes/adminRoutes')
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(errorMiddleware);
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))
app.use((req,res,next)=>{
    console.log(req.url)
    next()
})
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

const  protect  = require("./middlewares/authMiddleware");
app.listen(3000,()=>{
    console.log("Server Running: http://localhost:3000/")
})
