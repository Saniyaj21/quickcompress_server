import express from 'express';
import 'dotenv/config'
import { conntectDB } from './database/connection.js'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';


// routers
import userRouter from './routes/userRoute.js'
import imageRouter from './routes/imageRoute.js'
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';


const server = express();
conntectDB()

// middlewares
server.use(express.json(
    {
        limit: '50mb',
        extended: true,
    }
))
server.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
}))
server.use(bodyParser.json({
    limit: '50mb',
}))

server.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    }
}))

server.use(
    cors({
        origin: process.env.FRONTEND_URL,
        exposedHeaders: ['X-Total-Count'],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



// routes
server.use('/api/user', userRouter)
server.use('/api/image', imageRouter)

server.get('/', (req, res) => {
    res.json({
        success: true,
        messgae: "response from server"
    });
})

server.listen(process.env.PORT, () => {
    console.log("sarver started at 8080 port");
});