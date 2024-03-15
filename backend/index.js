import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/book.Model.js";
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

//middileware for parsing a req body
app.use(express.json());

// middleware for handling cors
//  option 1:Allow all origin with default cors(*)
app.use(cors());

//option 2 : Allow Custom Origins

// app.use(
//     cors({
//         origin: 'http://localhost:5555',
//         method: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (req, res) => {
    res.send("Hello");
})

app.use('/books', booksRoute);


mongoose.connect(mongoURL).then(() => {
    app.listen(PORT, () => {
        console.log("Connected");
        console.log(`App is listening to port ${PORT}`);
    })
}).catch((error) => {
    console.log(error);
})