import { Document, ObjectId } from 'mongoose';

export interface IAuthDocument extends Document {
	_id: string | ObjectId;
	name: string;
	lastname: string;
	email: string;
	password?: string;
	phoneNumber: string;
	createdAt: Date;
	comparePassword(password: string): Promise<boolean>;
}
