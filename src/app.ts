import express, { Request, Response, Application } from 'express';


const app: Application = express();

// Middleware and routes setup
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

// You can import and use your routes here
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';

app.use('/users', userRouter);
app.use('/posts', postRouter);

export default app;
