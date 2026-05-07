import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import waitlistRoutesV1 from './routes/v1/waitlist.routes.js';
import waitlistRoutesV2 from './routes/v2/waitlist.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

app.use(express.json());


app.use('/api/v1/waitlist', waitlistRoutesV1);
app.use('/api/v2/waitlist', waitlistRoutesV2);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
