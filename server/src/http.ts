import express, {Request,Response, NextFunction} from 'express';
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import http from "http";
import cors from 'cors';

import './database'

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use((err:Error, request:Request, response:Response, next: NextFunction)=>{
    if(err instanceof Error){
        return response.status(400).json({
            error:err.message
        })
    }
    return response.status(500).json({
        status:'error',
        message:'Internal Server Error'
    }) 
})
const serverHttp = http.createServer(app)

const io = new Server(serverHttp,{
    cors: { origin: ['http://localhost:3000'], credentials: true },
})
export {serverHttp, io}
