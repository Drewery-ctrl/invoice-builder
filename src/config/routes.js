import express from 'express';
import * as invoicesController from '../api/resources/invoices/invoices.controller';

export const router = express.Router();

router.get('/invoices', invoicesController.findAllInvoices);
router.get('/invoices/:id', invoicesController.findInvoiceById);
router.post('/invoices', invoicesController.createInvoice);
router.put('/invoices/:id', invoicesController.updateInvoice);
router.delete('/invoices/:id', invoicesController.deleteInvoice);