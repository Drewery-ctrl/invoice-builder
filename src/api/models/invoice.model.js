import mongoose from 'mongoose';

const { Schema } = mongoose;

const invoiceSchema = new Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  tax: { type: Number, required: true },
  date: { type: Date, default: Date.now, required: true },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('Invoice', invoiceSchema);
