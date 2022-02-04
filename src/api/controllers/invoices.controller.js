import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import Invoice from '../models/invoice.model';

export const findAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(HttpStatus.OK).json(invoices);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      item: Joi.string().required(),
      quantity: Joi.number().integer().required(),
      amount: Joi.number().required(),
      tax: Joi.number().required(),
      date: Joi.date().required(),
      dueDate: Joi.date().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0].message });
    }

    Invoice.create(value).then((invoice) => res.status(201).json(invoice));
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
