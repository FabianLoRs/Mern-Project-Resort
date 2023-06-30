import { Schema, Model, model } from 'mongoose';
import { IReservationDocument } from '@reservation/interfaces/IReservationDocument.interface';
import mongoose from 'mongoose';

const reservationSchema: Schema = new Schema({
	guests: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth' },
	room: { type: Number, default: '' },
	category: { type: String, default: '' },
	nights: { type: Number, default: '' },
	beds: { type: Number, default: '' }
});

const ReservationSchema: Model<IReservationDocument> = model<IReservationDocument>(
	'Reservation',
	reservationSchema,
	'Reservation'
);
export { ReservationSchema };
