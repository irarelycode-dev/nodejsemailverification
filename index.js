import express from "express";
import http from "http";
import { config } from "dotenv";
import mongoose from "mongoose";
import { mainRouter } from "./routers/routers.js";

config();

const app = express();
app.use(express.json());

app.use(mainRouter);

const server = http.createServer(app);

(function(){
    mongoose.connect(process.env.DB_URL).then(()=>console.log("connected to db")).catch(err=>console.log("error",err))
})()

server.listen(process.env.APP_PORT || 3000, () => {
  console.log(`express server served from port: ${process.env.APP_PORT}`);
});
