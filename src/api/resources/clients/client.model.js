import mongoose from 'mongoose';

const { Schema } = mongoose;

const clientSchema = new Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   phone: { type: String, required: true },
}, { timestamps: true });


export default mongoose.model('Client', clientSchema);
