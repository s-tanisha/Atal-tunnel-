import mongoose, { Document, Schema } from 'mongoose';

export interface IBookings extends Document {
  id: string;
  user_id: string;
  car_number: string;
  location: string;
  date: string;
}

const bookingsSchema: Schema<IBookings> = new Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  car_number: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true }
});

const Bookings = mongoose.model<IBookings>('Bookings', bookingsSchema);

export default Bookings;
