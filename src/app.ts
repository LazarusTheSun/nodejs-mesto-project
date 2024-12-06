import express from 'express';
import mongoose from 'mongoose'

const { PORT = 3000 } = process.env;

const MONGO_URL = 'mongodb://localhost:27017/mestodb ';
const DB_NAME = 'mestodb';

const app = express();

mongoose.connect(`${MONGO_URL}/${DB_NAME}`);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})