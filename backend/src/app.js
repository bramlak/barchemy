import express from 'express';
import routes from './routes/index.js';
import { errorHandler } from './core/middlewares/errorHandler.js';
import connectDB from './config/database.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const app = express();
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

connectDB();

export default app;
