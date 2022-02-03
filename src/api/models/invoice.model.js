import mongoose from 'mongoose';

const { Schema } = mongoose;

const invoiceSchema = new Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  tax: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  dueDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Invoice', invoiceSchema);
