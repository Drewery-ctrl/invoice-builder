import express from 'express';
import { invoiceRouter } from './resources/invoices';

const restRouter = express.Router();

restRouter.use('/invoices', invoiceRouter);

export default restRouter;