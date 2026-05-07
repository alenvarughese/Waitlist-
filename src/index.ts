import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import waitlistRoutes from './routes/v1/waitlist.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

app.use(express.json());

app.use('/api/waitlist', waitlistRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
