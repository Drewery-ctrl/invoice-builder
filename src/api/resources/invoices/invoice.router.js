import express from 'express';
import * as invoicesController from "./invoices.controller";
import passport from "passport";

export const invoiceRouter = express.Router();

invoiceRouter.route('/')
   .get(passport.authenticate('jwt', { session: false }), invoicesController.findAllInvoices)
   .post(passport.authenticate('jwt', { session: false }), invoicesController.createInvoice);

invoiceRouter.route('/:id')
   .get(passport.authenticate('jwt', { session: false }), invoicesController.findInvoiceById)
   .put(passport.authenticate('jwt', { session: false }), invoicesController.updateInvoice)
   .delete(passport.authenticate('jwt', { session: false }), invoicesController.deleteInvoice);

invoiceRouter.get('/:id/download', invoicesController.download);