import express from 'express';
import { invoiceRouter } from './resources/invoices';
import { clientRouter } from './resources/clients';
import { userRouter } from './resources/users';
import { authRouter } from "./resources/auth";

const restRouter = express.Router();

restRouter.use('/invoices', invoiceRouter);
restRouter.use('/clients', clientRouter);
restRouter.use('/users', userRouter);
restRouter.use('/auth', authRouter);

export default restRouter;