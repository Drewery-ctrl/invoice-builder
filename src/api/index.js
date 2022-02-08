import express from 'express';
import { invoiceRouter } from './resources/invoices';
import { clientRouter } from './resources/clients';
import { userRouter } from './resources/users';

const restRouter = express.Router();

restRouter.use('/invoices', invoiceRouter);
restRouter.use('/clients', clientRouter);
restRouter.use('/users', userRouter);

export default restRouter;