// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::: methode nodeJS ::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// import http from 'node:http'
// import 'dotenv/config'
// const server = http.createServer((req, res) => {
//     res.end("hello world !")
// })
// :::::::::::::::::::::::::::::::::::::::::::::::
// import { createServer } from 'node:http'
// import 'dotenv/config'

// const server = createServer((req, res) => {
//     res.end("Hello world!")
// })

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//     console.log(`Adresse server : http://localhost:${PORT}`);
// })

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::: methode express ::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

import 'dotenv/config'
import express from 'express'

const app = express();

const m1 = (req, res, next) => {
    console.log("middleware : m1");
    next();
};


const m2 = (req, res, next) => {
    console.log("middleware : m2");
    next();
};
const m3 = (req, res, next) => {
    console.log("middleware : m3");
};

app.get('/', (req, res, next) => {
    console.log("GET : /");
    res.end("GET : /");
    next();
})
// }, m1, m2);

// app.use(m1);
// app.use(m2);
app.use([m1, m3, m2]);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Adresse server : http://localhost:${PORT}`);
})