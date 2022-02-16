import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import * as invoiceService from './invoice.service';
import Invoice from './invoice.model';

export const findAllInvoices = async ( req, res ) => {
   try {
      const { page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
      const options = {
         page: parseInt(page, 10),
         limit: parseInt(perPage, 10),
         populate: 'client',
      };
      const query = {};
      if (filter) {
         query.item = { $regex: filter, $options: 'i' };
      }
      if (sortField && sortDir) {
         options.sort = { [sortField]: sortDir };
      }
      await Invoice.paginate(query, options).then(( response ) => {
         setTimeout(() => {
            res.status(HttpStatus.OK).json(response);
         }, 500);
      });
   }
   catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
};

export const createInvoice = async ( req, res ) => {
   try {
      const schema = Joi.object().keys({
         item: Joi.string().required(),
         quantity: Joi.number().integer().required(),
         amount: Joi.number().required(),
         tax: Joi.number().required(),
         date: Joi.date().required(),
         dueDate: Joi.date().required(),
         client: Joi.string().required(),
      });

      const { error, value } = schema.validate(req.body);

      if (error && error.details) {
         return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0].message });
      }

      Invoice.create(value).then(( invoice ) => res.status(201).json(invoice));
   }
   catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
};

export const findInvoiceById = async ( req, res ) => {
   try {
      const invoice = await Invoice.findById(req.params.id).populate('client');
      if (!invoice) {
         return res.status(HttpStatus.NOT_FOUND).json({ message: 'Invoice not found' });
      }
      res.status(HttpStatus.OK).json(invoice);
   }
   catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
};

export const updateInvoice = async ( req, res ) => {
   try {
      const schema = Joi.object().keys({
         item: Joi.string().optional(),
         quantity: Joi.number().integer().optional(),
         amount: Joi.number().optional(),
         tax: Joi.number().optional(),
         date: Joi.date().optional(),
         dueDate: Joi.date().optional(),
         client: Joi.string().optional(),
      });

      const { error, value } = schema.validate(req.body);

      if (error && error.details) {
         return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0].message });
      }

      const invoice = await Invoice.findByIdAndUpdate(req.params.id, value, { new: true });
      if (!invoice) {
         return res.status(HttpStatus.NOT_FOUND).json({ message: 'Update error: Invoice not found' });
      }
      res.status(HttpStatus.OK).json(invoice);
   }
   catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
};

export const deleteInvoice = async ( req, res ) => {
   try {
      const invoice = await Invoice.findByIdAndRemove(req.params.id);
      if (!invoice) {
         return res.status(HttpStatus.NOT_FOUND).json({ message: 'Delete error: Invoice not found' });
      }
      res.status(HttpStatus.OK).json(invoice);
   }
   catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
};

export const downloadInvoice = async ( req, res ) => {
   try {
      const stream = res.writeHead(HttpStatus.OK, {
         'Content-Type': 'application/pdf',
         'Content-Disposition': 'attachment; filename=invoice.pdf',
      });

      await invoiceService.GeneratePdf(( chunk ) => stream.write(chunk), () => stream.end());
   }
   catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
};

export const download = async ( req, res ) => {
   try {
      const { id } = req.params;
      const invoice = await Invoice.findById(id).populate('client');
      if (!invoice) {
         return res.status(HttpStatus.NOT_FOUND).send({ err: 'could not find any invoice' });
      }
      const { subTotal, total } = invoiceService.getTotal(invoice);
      const templateBody = await invoiceService.getTemplateBody(invoice, subTotal, total);
      const html = await invoiceService.getInvoiceTemplate(templateBody);
      const options = {
         format: 'A4',
         orientation: 'portrait',
         border: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in',
         },
      };
      res.pdfFromHTML({
         filename: `${ invoice.item }.pdf`,
         htmlContent: html,
         options: options
      });
   }
   catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
};