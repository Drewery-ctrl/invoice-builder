import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const { Schema } = mongoose;

const UserSchema = new Schema({
   // email: { type: String, required: true, unique: true, lowercase: true },
   // password: { type: String, required: true },
   local: {
      email: String,
      password: String,
   },
   google: {
      id: String,
      token: String,
      email: String,
      displayName: String,
   },
   twitter: {
      id: String,
      token: String,
      displayName: String,
      username: String,
   },
}, { timestamps: true });

// UserSchema.pre('save', async function ( next ) {
//    if (!this.isModified('password')) return next();
//    const salt = await bcryptjs.genSalt(10);
//    this.password = await bcryptjs.hash(this.password, salt);
//    next();
// });

// must always call method inside model.fineOne.. etc
UserSchema.methods.comparePassword = async function ( candidatePassword ) {
   await bcryptjs.compare(candidatePassword, this.password, function ( err, isMatch ) {
      if (err) return err;
      return isMatch;
   });
}

export default mongoose.model('User', UserSchema);
