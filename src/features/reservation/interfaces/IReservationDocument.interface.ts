import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

// SOLID Interface Segregation
export interface IReservationDocument extends Document {
	_id: string | ObjectId;
	guests: mongoose.Types.ObjectId;
	room: number;
	category: string;
	nights: string;
	beds: string;
	createdAt: Date;
}
