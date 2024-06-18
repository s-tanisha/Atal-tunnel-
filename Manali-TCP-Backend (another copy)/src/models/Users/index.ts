import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  id: string;
  password: string;
  name: string;
  email: string;
}

const userSchema: Schema<IUser> = new Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
