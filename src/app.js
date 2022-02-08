import restRouter from "./api";
import express from 'express';
import mongoose from 'mongoose';
import { registerGlobalMiddlewares } from "./api/middlewares/global-middleware";

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/${ process.env.DATABASE }`).then(
   () => {
      console.log('Connected to MongoDB');
   },
   ( err ) => {
      console.log(`Error connecting to MongoDB: ${ err }`);
   }
);

// Register Global Middleware
registerGlobalMiddlewares(app);
app.use('/api/v1', restRouter);

// Global error handler
app.use(( err, req, res, next ) => {
   const error = new Error('Not Found');
   error.status = 404;
   error.message = 'This resource does not exist';
   next(error);
});

// Custom error handler
app.use(( err, req, res, next ) => {
   res.status(err.status || 500);
   res.json({
      error: {
         message: err.message
      }
   });
});

app.listen(PORT, () => {
   console.log(`Server listening on port ${ PORT }`);
});
