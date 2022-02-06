import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const invoiceSchema = new Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  tax: { type: Number, required: true },
  date: { type: Date, required: true },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

invoiceSchema.plugin(mongoosePaginate);
export default mongoose.model('Invoice', invoiceSchema);
