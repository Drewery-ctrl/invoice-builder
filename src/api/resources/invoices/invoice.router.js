import express from 'express';
import * as invoicesController from "./invoices.controller";

export const invoiceRouter = express.Router();

invoiceRouter.route('/')
   .get(invoicesController.findAllInvoices)
   .post(invoicesController.createInvoice);

invoiceRouter.route('/:id')
   .get(invoicesController.findInvoiceById)
   .put(invoicesController.updateInvoice)
   .delete(invoicesController.deleteInvoice);
