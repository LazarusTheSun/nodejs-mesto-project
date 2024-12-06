import express from 'express';

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})