import Joi from 'joi';
import Invoice from '../models/invoice.model';

export const findAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
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
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    Invoice.create(value).then((invoice) => res.status(201).json(invoice));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
