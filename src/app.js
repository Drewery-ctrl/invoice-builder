import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import { router } from './config/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/api/v1', router);
const PORT = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/invoice-builder').then(
  () => {
    console.log('Connected to MongoDB');
  },
  (err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
  }
);

// Global error handler
app.use((err, req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  error.message = 'This resource does not exist';
  next(error);
});

// Custom error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
