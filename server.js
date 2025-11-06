import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import recipesRouter from './routes/recipes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());

app.use('/api/recipes', recipesRouter);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(env.port, () => console.log(`🚀 Server running on port ${env.port}`));
});
    