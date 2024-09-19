import express from 'express'
import mongoose from './db/dbConn.js';
import bookRouter from './modules/book/book.routes.js';
import authorRouter from './modules/author/author.routes.js';
const app = express()
const port = 3000

app.use(express.json());

app.use('/api/books', bookRouter)
app.use('/api/authors', authorRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))