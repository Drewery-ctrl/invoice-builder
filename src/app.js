import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json';
import restRouter from './api/index';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, { explorer: true }));
app.use('/api/v1', restRouter);

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
