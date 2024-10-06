import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

dotenv.config({});
const app = express();
// app.use(cors());
app.get("/home",(req,res)=>{
    return res.status(200).json({
        message: "I am coming from backend.",
        success:true
    })
})
// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
//     next(); 
// })
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const corsOptions = {
    origin:'http://localhost:5173',
    credentials : true
}
app.use(cors(corsOptions));


const PORT =process.env.PORT|| 3000;

//API's
app.use("/api/v1/user",userRoute);
// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/logout"
// "http://localhost:8000/api/v1/user/profile/update"
app.use("/api/v1/company",companyRoute);
// "http://localhost:8000/api/v1/company/register"
// "http://localhost:8000/api/v1/company/get"
// "http://localhost:8000/api/v1/company/get/:id"
// "http://localhost:8000/api/v1/company/update/:id"
app.use("/api/v1/job",jobRoute)
// "http://localhost:8000/api/v1/job/post"
// "http://localhost:8000/api/v1/job/get"
// "http://localhost:8000/api/v1/job/getadminjobs"
// "http://localhost:8000/api/v1/job/get/:id"
app.use("/api/v1/application",applicationRoute)
// http://localhost:8000/api/v1/application/apply/id
// http://localhost:8000/api/v1/application/get
// http://localhost:8000/api/v1/application/id/applicants
// http://localhost:8000/api/v1/application/status/id/update



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})