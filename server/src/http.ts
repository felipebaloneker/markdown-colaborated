import express from "express";
import http from "http";
import { Server } from 'socket.io'
import cors from 'cors';

const app = express();
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}))
const serverHttp = http.createServer(app)

const io = new Server(serverHttp,{
    cors: { origin: ['http://localhost:3000'], credentials: true },
})
export {serverHttp, io}
