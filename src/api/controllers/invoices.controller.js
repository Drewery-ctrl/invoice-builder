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
    const {
      item, quantity, amount, tax, date, dueDate
    } = req.body;
    if (!item || !quantity || !amount || !tax || !date || !dueDate) {
      return res.status(400).json({
        message: 'Please provide all required fields - item, quantity, amount, tax, date, dueDate',
      });
    }
    Invoice.create({
      item, quantity, amount, tax, date, dueDate
    }).then((invoice) => res.status(201).json(invoice));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
