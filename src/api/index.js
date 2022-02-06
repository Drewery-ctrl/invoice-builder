import express from 'express';
import { invoiceRouter } from './resources/invoices';
import { clientRouter } from './resources/clients';

const restRouter = express.Router();

restRouter.use('/invoices', invoiceRouter);
restRouter.use('/clients', clientRouter);

export default restRouter;