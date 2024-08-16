import dotenv from 'dotenv';
import { connectDB } from './db/index';
import app from './app';

dotenv.config({
  path: './.env'
});

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Failed to connect to the database:', err);
  });
