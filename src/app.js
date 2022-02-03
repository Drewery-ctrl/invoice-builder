import express from 'express';
import mongoose from 'mongoose';
import { router } from './config/routes';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/invoice-builder').then(
  () => {
    console.log('Connected to MongoDB');
  },
  (err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
  }
);

app.use('/api/v1', router);
app.get('/', (req, res) => {
  res.send('Welcome to Invoice Builder Backend!');
});

app.use((req, res, next) => {
  console.log('Time: %d', Date.now());
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
