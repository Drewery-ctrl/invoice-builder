import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import Invoice from './invoice.model';

export const findAllInvoices = async (req, res) => {
  try {
    const { page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(perPage, 10)
    };
    const query = {};
    if (filter) {
      query.item = { $regex: filter, $options: 'i' };
    }
    if (sortField && sortDir) {
      options.sort = { [sortField]: sortDir };
    }
    await Invoice.paginate(query, options).then((response) => {
      setTimeout(() => {
        res.status(HttpStatus.OK).json(response);
      }, 500);
    });
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

export const findInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Invoice not found' });
    }
    res.status(HttpStatus.OK).json(invoice);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      item: Joi.string().optional(),
      quantity: Joi.number().integer().optional(),
      amount: Joi.number().optional(),
      tax: Joi.number().optional(),
      date: Joi.date().optional(),
      dueDate: Joi.date().optional(),
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
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndRemove(req.params.id);
    if (!invoice) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Delete error: Invoice not found' });
    }
    res.status(HttpStatus.OK).json(invoice);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
