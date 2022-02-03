const invoices = [
  {
    id: 1, item: 'Invoice 1', date: '01/01/2019', amount: '$100.00', status: 'Paid'
  },
  {
    id: 2, item: 'Invoice 2', date: '01/01/2019', amount: '$200.00', status: 'Pending'
  },
  {
    id: 3, item: 'Invoice 3', date: '01/01/2019', amount: '$300.00', status: 'Paid',
  },
];

export const findAllInvoices = async (req, res) => {
  try {
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
