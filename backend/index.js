import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const port = 7000;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connect'))
  .catch((err) => console.error('MongoDB connection Error', err));

app.listen(port, () => `Server is running on port ${port}`);
